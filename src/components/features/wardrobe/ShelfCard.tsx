import React from 'react'

type Props = {
  id: string
  name: string
  thumbnails?: any[]
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onOpen: (id: string) => void
}

export default function ShelfCard({ id, name, thumbnails = [], onRename, onDelete, onOpen }: Props) {
  const [resolved, setResolved] = React.useState<Record<string, string>>({})
  const previewThumbnails = thumbnails.slice(0, 3)

  React.useEffect(() => {
    let active = true
    async function resolveAll() {
      const entries = thumbnails.map((t: any) => (typeof t === 'string' ? t : t.url))
      for (const e of entries) {
        if (!e) continue
        if (e.startsWith('storage://')) {
          const path = e.replace('storage://', '')
          try {
            const res = await fetch('/api/storage-url', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path }),
            })
            const json = await res.json()
            if (!active) return
            if (json?.signedUrl) {
              setResolved((r) => ({ ...r, [e]: json.signedUrl }))
            }
          } catch (err) {
            console.warn('Could not resolve storage URL for', path, err)
          }
        }
      }
    }
    void resolveAll()
    return () => {
      active = false
    }
  }, [thumbnails])
  return (
    <div className="rounded-xl border border-white/6 bg-[#252425] p-3 text-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRename(id)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Edytuj półkę"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M13.5 6 18 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(id)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
            aria-label="Usuń półkę"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 11v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 11v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path
                d="M7 7l1 13h8l1-13M9.5 7V4h5v3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-3 grid cursor-pointer grid-cols-3 gap-3" onClick={() => onOpen(id)}>
        {previewThumbnails.length > 0 ? (
          previewThumbnails.map((t, i) => {
            const raw = typeof t === 'string' ? t : t.url
            const url = raw && raw.startsWith('storage://') ? resolved[raw] ?? '' : raw
            return (
              <div
                key={i}
                className="h-24 w-full overflow-hidden rounded-xl"
                style={{ backgroundColor: '#3a3a3a', border: '1px solid rgba(255,255,255,0.04)' }}
              >
                {url ? <img src={url} alt={`${name}-${i}`} className="h-full w-full object-contain" /> : null}
              </div>
            )
          })
        ) : (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 w-full overflow-hidden rounded-xl"
              style={{ backgroundColor: '#3a3a3a', border: '1px solid rgba(255,255,255,0.04)' }}
            />
          ))
        )}
      </div>

      <div className="text-sm text-gray-400">{thumbnails.length} items</div>
    </div>
  )
}
