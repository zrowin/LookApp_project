import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'anon-key-placeholder'

/**
 * Supabase client for browser-side usage
 * This client uses the anon key and is safe for client-side operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'lookapp-auth',
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

/**
 * Type for the authenticated user from Supabase
 */
export type User = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user']
