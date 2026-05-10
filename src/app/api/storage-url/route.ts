import supabaseServer from '../../../lib/supabase/server'

export async function POST(req: Request) {
  const { NextResponse } = await import('next/server')
  try {
    const body = await req.json()
    const path: string = body?.path
    if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 })

    try {
      const bucket = 'clothing-images'
      const from = supabaseServer.storage.from(bucket)

      // Prefer signed URL when available
      if (from && typeof from.createSignedUrl === 'function') {
        const expires = 60 * 60 * 24 * 7 // 7 days
        const { data, error } = await from.createSignedUrl(path, expires)
        if (!error && data?.signedUrl) return NextResponse.json({ signedUrl: data.signedUrl })
        console.warn('createSignedUrl failed for', path, error)
      }

      // Fallback to getPublicUrl if supported
      if (from && typeof from.getPublicUrl === 'function') {
        const { data, error } = await from.getPublicUrl(path)
        if (!error && data?.publicUrl) return NextResponse.json({ signedUrl: data.publicUrl })
        console.warn('getPublicUrl failed for', path, error)
      }

      // Final fallback: construct public storage URL (works for public buckets)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
      if (supabaseUrl) {
        const publicUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${path}`
        return NextResponse.json({ signedUrl: publicUrl })
      }

      return NextResponse.json({ error: 'Could not resolve storage URL' }, { status: 500 })
    } catch (e) {
      console.warn('storage-url handler error', e)
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}
