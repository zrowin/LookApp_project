// Quick integration test runner (no Jest) using ts-node to import TS modules
// Run with: node -r ts-node/register scripts/run-upload-test.js

const path = require('path')

async function main() {
  try {
    const route = require(path.resolve(__dirname, '../src/app/api/upload/route.ts'))
    const supabaseMod = require(path.resolve(__dirname, '../src/lib/supabase/server.ts'))
    const thumbnailMod = require(path.resolve(__dirname, '../src/lib/images/thumbnail.ts'))
    const supabase = supabaseMod && supabaseMod.default ? supabaseMod.default : supabaseMod
    const thumbnail = thumbnailMod && thumbnailMod.default ? thumbnailMod.default : thumbnailMod

    // Mock storage and DB on the exported object
    supabase.storage = {
      from: () => ({
        upload: async (p, data, opts) => ({ error: null }),
        getPublicUrl: (p) => ({ data: { publicUrl: `https://cdn.test/${p}` } }),
      }),
    }
    supabase.from = () => ({ insert: async () => ({}) })

    // Mock thumbnail generator (function default export or named)
    if (typeof thumbnail === 'function') {
      // module exports function directly
      // replace default export by assigning to module's exports? easier: do nothing because route imports the function by default
    } else if (thumbnail && typeof thumbnail.createThumbnail === 'function') {
      thumbnail.createThumbnail = async () => Buffer.from('thumb')
    } else if (thumbnail && typeof thumbnail.default === 'function') {
      thumbnail.default = async () => Buffer.from('thumb')
    }

    // 1x1 PNG base64 (valid image) to allow thumbnail generation
    const sampleBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
    const res = await route.handleUpload({ filename: 'test.jpg', fileBase64: sampleBase64 })
    console.log('Test result:', res)
    if (res && res.url && res.thumbnailUrl) {
      console.log('UPLOAD TEST: OK')
      process.exit(0)
    } else {
      console.error('UPLOAD TEST: FAILED - missing url/thumbnail')
      process.exit(2)
    }
  } catch (e) {
    console.error('UPLOAD TEST: ERROR', e)
    process.exit(1)
  }
}

main()
