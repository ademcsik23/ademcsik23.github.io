import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return a dummy client or handle missing env vars gracefully for build/mock purposes
    return {
      from: () => ({
        select: () => ({
          eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
          limit: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
          order: () => Promise.resolve({ data: [], error: null }),
        })
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null })
      }
    } as any
  }
  return createBrowserClient(url, key)
}
