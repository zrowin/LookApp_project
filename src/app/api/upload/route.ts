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
    console.error('Supabase upload error for', path, uploadError)
    const err: any = new Error('Upload failed')
    err.status = 500
    err.detail = uploadError
    throw err
  }

  // helper to get a usable URL: prefer publicUrl, fall back to signed URL when possible
  async function resolveStorageUrl(path: string) {
    try {
      const from = supabaseServer.storage.from('clothing-images')
      // try public URL first
      let publicUrl: string | null = null
      try {
        const { data: publicData } = from.getPublicUrl(path)
        publicUrl = publicData?.publicUrl ?? null
      } catch (e) {
        // getPublicUrl may throw in some clients; ignore and continue
      }

      if (publicUrl) return publicUrl

      // try signed URL if server client supports it
      if (typeof from.createSignedUrl === 'function') {
        try {
          const { data: signedData, error: signErr } = await from.createSignedUrl(path, 60 * 60)
          if (!signErr && signedData?.signedUrl) return signedData.signedUrl
          if (signErr) console.warn('createSignedUrl error for', path, signErr)
        } catch (e) {
          console.warn('createSignedUrl threw for', path, e)
        }
      }

      return null
    } catch (e) {
      console.warn('resolveStorageUrl error for', path, e)
      return null
    }
  }

  const publicUrl = await resolveStorageUrl(path)

  // Generate thumbnail (webp) and upload
  let thumbUrl: string | null = null
  let thumbDataUrl: string | null = null
  let thumbPath: string | null = null
  try {
    const thumbBuffer = await createThumbnail(buffer, 400)
    // also keep a data: URI for immediate preview if storage URL isn't available
    try {
      thumbDataUrl = `data:image/webp;base64,${thumbBuffer.toString('base64')}`
    } catch (e) {
      console.warn('Could not create thumbnail data URI', e)
    }
    thumbPath = `${ownerId}/${imageId}/thumbnail.webp`
    const { error: thumbErr } = await supabaseServer.storage.from('clothing-images').upload(thumbPath, thumbBuffer, { upsert: false, contentType: 'image/webp' })
    if (!thumbErr) {
      thumbUrl = await resolveStorageUrl(thumbPath)
    } else {
      console.warn('Thumbnail upload error:', thumbErr)
    }
  } catch (e) {
    console.warn('Thumbnail generation failed:', e)
  }

  // Insert metadata into `images` table if it exists; ignore errors but log
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

  const returnedThumb = thumbUrl ?? thumbDataUrl

  // Log final urls for easier local debugging
  console.log('Upload result for', imageId, { url: publicUrl, thumbnailUrl: returnedThumb, thumbnailPath: thumbPath })

  return { id: imageId, url: publicUrl, thumbnailUrl: returnedThumb, originalPath: path, thumbnailPath }
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

