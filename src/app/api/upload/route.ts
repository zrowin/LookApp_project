import supabaseServer from '../../../lib/supabase/server.ts'
import createThumbnail from '../../../lib/images/thumbnail.ts'

const MAX_BYTES = 10 * 1024 * 1024 // 10MB

export async function handleUpload({ filename, fileBase64, removeBg, userId }: { filename: string; fileBase64: string; removeBg?: boolean; userId?: string }) {
  if (!filename || !fileBase64) {
    throw new Error('Missing filename or fileBase64')
  }

  const buffer = Buffer.from(fileBase64, 'base64')
  if (buffer.length > MAX_BYTES) {
    const err: any = new Error('File too large')
    err.status = 413
    throw err
  }

  // default user when not provided (server-side auth to be added later)
  const ownerId = userId ?? 'anon'
  const imageId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const path = `${ownerId}/${imageId}/${filename}`

  const { error: uploadError } = await supabaseServer.storage.from('clothing-images').upload(path, buffer, { upsert: false })

  if (uploadError) {
    throw new Error('Upload failed')
  }

  const { data: publicData } = supabaseServer.storage.from('clothing-images').getPublicUrl(path)
  const publicUrl = publicData?.publicUrl ?? null

  // Generate thumbnail (webp) and upload
  let thumbUrl: string | null = null
  try {
    const thumbBuffer = await createThumbnail(buffer, 400)
    const thumbPath = `${ownerId}/${imageId}/thumbnail.webp`
    const { error: thumbErr } = await supabaseServer.storage.from('clothing-images').upload(thumbPath, thumbBuffer, { upsert: false, contentType: 'image/webp' })
    if (!thumbErr) {
      const { data: thumbData } = supabaseServer.storage.from('clothing-images').getPublicUrl(thumbPath)
      thumbUrl = thumbData?.publicUrl ?? null
    } else {
      console.warn('Thumbnail upload error:', thumbErr)
    }
  } catch (e) {
    console.warn('Thumbnail generation failed:', e)
  }

  // Insert metadata into `images` table if it exists; ignore errors
  try {
    await supabaseServer.from('images').insert([
      {
        id: imageId,
        owner_id: ownerId,
        original_url: publicUrl,
        processed_url: thumbUrl,
        status: removeBg ? 'processing' : 'ready',
        created_at: new Date().toISOString(),
      },
    ])
  } catch (e) {
    console.warn('Could not insert metadata into images table:', e)
  }

  return { id: imageId, url: publicUrl, thumbnailUrl: thumbUrl }
}

export async function POST(req: Request) {
  const { NextResponse } = await import('next/server')
  try {
    const body = await req.json()
    const result = await handleUpload(body)
    return NextResponse.json(result)
  } catch (err: any) {
    const status = err?.status || 500
    return NextResponse.json({ error: err.message || 'Server error' }, { status })
  }
}

