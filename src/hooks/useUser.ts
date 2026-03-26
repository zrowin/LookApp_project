'use client'

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

/**
 * Hook to get the current user
 * Returns null while loading, undefined if not authenticated
 */
export function useUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { user, isLoading }
}

/**
 * Hook to get the current session
 * Returns null while loading, undefined if not authenticated
 */
export function useSession() {
  const [session, setSession] = useState<import('@supabase/supabase-js').Session | null | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setIsLoading(false)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { session, isLoading }
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { user, isLoading } = useUser()

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  }
}
