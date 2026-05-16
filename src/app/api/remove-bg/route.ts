import { NextResponse } from 'next/server'

const MAX_BYTES = 10 * 1024 * 1024

export async function POST(req: Request) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Brak konfiguracji REMOVE_BG_API_KEY na serwerze.' },
        { status: 501 },
      )
    }

    const body = await req.json()
    const filename = body?.filename || 'image.png'
    const mimeType = body?.mimeType || 'image/png'
    const fileBase64 = body?.fileBase64

    if (!fileBase64) {
      return NextResponse.json({ error: 'Brak pliku do przetworzenia.' }, { status: 400 })
    }

    const buffer = Buffer.from(fileBase64, 'base64')
    if (buffer.length > MAX_BYTES) {
      return NextResponse.json({ error: 'Plik przekracza maks. rozmiar 10 MB.' }, { status: 413 })
    }

    const form = new FormData()
    const blob = new Blob([new Uint8Array(buffer)], { type: mimeType })
    form.append('image_file', blob, filename)
    form.append('size', 'auto')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: form,
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      return NextResponse.json(
        { error: 'Nie udało się usunąć tła.', detail },
        { status: response.status },
      )
    }

    const result = Buffer.from(await response.arrayBuffer())
    return NextResponse.json({
      dataUrl: `data:image/png;base64,${result.toString('base64')}`,
      mimeType: 'image/png',
      filename: filename.replace(/\.[^.]+$/, '') + '-no-bg.png',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Błąd przetwarzania obrazu.' }, { status: 500 })
  }
}
