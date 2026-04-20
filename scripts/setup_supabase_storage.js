/*
  Run with: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/setup_supabase_storage.js
  This script will attempt to create the `clothing-images` bucket (if missing) using the server client.
*/
const path = require('path')
const supabaseServer = require(path.resolve(__dirname, '../src/lib/supabase/server.ts')).default

async function main() {
  const bucket = 'clothing-images'
  console.log('Ensuring bucket exists:', bucket)
  try {
    const { data, error } = await supabaseServer.storage.listBuckets()
    if (error) throw error
    const exists = data && data.find((b) => b.name === bucket)
    if (exists) {
      console.log('Bucket already exists:', bucket)
      return
    }

    console.log('Creating bucket (public = false)')
    const res = await supabaseServer.storage.createBucket(bucket, { public: false })
    if (res.error) {
      console.error('Error creating bucket:', res.error)
      process.exit(1)
    }
    console.log('Bucket created:', bucket)
  } catch (e) {
    console.error('Failed to ensure bucket:', e)
    process.exit(1)
  }
}

main()
