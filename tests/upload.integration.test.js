require('ts-node/register/transpile-only')

const path = require('path')
const { handleUpload } = require(path.resolve(__dirname, '../src/app/api/upload/route.ts'))

// Mock supabase server module
const supabase = require(path.resolve(__dirname, '../src/lib/supabase/server.ts'))

// Replace storage and from methods with mocks
supabase.storage = {
  from: () => ({
    upload: async (p, data, opts) => ({ error: null }),
    getPublicUrl: (p) => ({ data: { publicUrl: `https://cdn.test/${p}` } }),
  }),
}

supabase.from = () => ({ insert: async () => ({}) })

// Mock thumbnail generator
const thumbnail = require(path.resolve(__dirname, '../src/lib/images/thumbnail.ts'))
thumbnail.createThumbnail = async (buffer, size) => Buffer.from('thumb')

describe('Upload API integration (mocked Supabase)', () => {
  test('handleUpload stores file and returns urls', async () => {
    const sampleBase64 = Buffer.from('hello').toString('base64')
    const res = await handleUpload({ filename: 'test.jpg', fileBase64: sampleBase64, removeBg: false })

    expect(res).toBeDefined()
    expect(res.id).toBeTruthy()
    expect(res.url).toContain('https://cdn.test')
    expect(res.thumbnailUrl).toContain('https://cdn.test')
  })
})
