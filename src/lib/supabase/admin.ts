import supabaseServer from './server'

export const admin = {
  // List existing buckets
  async listBuckets() {
    const { data, error } = await supabaseServer.storage.listBuckets()
    if (error) throw error
    return data
  },

  // Ensure a storage bucket exists; create if missing. setPublic determines bucket visibility.
  async ensureBucket(bucketName: string, setPublic = false) {
    try {
      const existing = await supabaseServer.storage.listBuckets()
      const found = existing.data?.find((b: any) => b.name === bucketName)
      if (found) return found

      const { data, error } = await supabaseServer.storage.createBucket(bucketName, { public: setPublic })
      if (error) throw error
      return data
    } catch (e) {
      throw e
    }
  },

  // Helper to set bucket public/private (best-effort; depends on Supabase API availability)
  async setBucketPublic(bucketName: string, makePublic: boolean) {
    try {
      // Supabase JS v2 does not expose a direct setPublic method; recreate with public flag
      // This is a best-effort helper; prefer using Supabase UI or CLI for production.
      if (makePublic) {
        await supabaseServer.storage.updateBucket(bucketName, { public: true })
      } else {
        await supabaseServer.storage.updateBucket(bucketName, { public: false })
      }
      return true
    } catch (e) {
      console.warn('setBucketPublic failed:', e)
      return false
    }
  },
}

export default admin
