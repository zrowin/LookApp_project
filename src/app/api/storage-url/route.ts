import supabaseServer from '../../../lib/supabase/server'

export async function POST(req: Request) {
  const { NextResponse } = await import('next/server')
  try {
    const body = await req.json()
    const path: string = body?.path
    if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 })

    try {
      const from = supabaseServer.storage.from('clothing-images')
      if (typeof from.createSignedUrl === 'function') {
        const expires = 60 * 60 * 24 * 7 // 7 days
        const { data, error } = await from.createSignedUrl(path, expires)
        if (error || !data?.signedUrl) {
          console.warn('createSignedUrl failed for', path, error)
          return NextResponse.json({ error: 'Could not create signed URL' }, { status: 500 })
        }
        return NextResponse.json({ signedUrl: data.signedUrl })
      }
      return NextResponse.json({ error: 'Storage client does not support createSignedUrl' }, { status: 500 })
    } catch (e) {
      console.warn('storage-url handler error', e)
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
}
