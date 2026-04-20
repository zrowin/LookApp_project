import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client using the service role key.
// NOTE: Keep the service role key secret and only use this file on the server.
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

let supabaseServer: any

if (supabaseUrl && supabaseServiceRoleKey) {
  supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      // server client should not persist session in server environment
      persistSession: false,
    },
  })
} else {
  // Lightweight stub for local tests when env vars are not provided.
  // Tests/scripts can override the exported object.
  supabaseServer = {
    storage: {
      from: () => ({
        upload: async () => ({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: null } }),
      }),
    },
    from: () => ({ insert: async () => ({}) }),
    auth: {
      getUser: async () => ({ data: { user: null } }),
    },
  }
}

export type ServerUser = Awaited<ReturnType<typeof supabaseServer.auth.getUser>>['data']['user']

export default supabaseServer
