const path = require('path')

jest.resetModules()

// Mock thumbnail and supabase modules before loading the route so imports are mocked
jest.mock(path.resolve(__dirname, '../src/lib/images/thumbnail.ts'), () => ({ __esModule: true, default: async (buffer, size) => Buffer.from('thumb') }))

jest.mock(path.resolve(__dirname, '../src/lib/supabase/server.ts'), () => ({
  __esModule: true,
  default: {
    storage: {
      from: () => ({
        upload: async (p, data, opts) => ({ error: null }),
        getPublicUrl: (p) => ({ data: { publicUrl: `https://cdn.test/${p}` } }),
      }),
    },
    from: () => ({ insert: async () => ({}) }),
  },
}))

const routeMod = require(path.resolve(__dirname, '../src/app/api/upload/route.ts'))
const { handleUpload } = routeMod

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
