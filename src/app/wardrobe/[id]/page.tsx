"use client"

import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getShelves, removeItemFromShelf } from '@/lib/shelves'

export default function ShelfDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = (params as any)?.id
  const [shelf, setShelf] = React.useState<any | null>(null)

  React.useEffect(() => {
    const shelves = getShelves()
    const found = shelves.find((s) => s.id === id)
    setShelf(found ?? null)
  }, [id])

  function removeImage(itemId: string) {
    if (!confirm('Usunąć zdjęcie z półki?')) return
    removeItemFromShelf(id, itemId)
    setShelf((prev: any) => ({ ...prev, thumbnails: prev.thumbnails.filter((t: any) => t.id !== itemId) }))
  }

  if (!shelf) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.push('/wardrobe')} className="mb-4 text-sm text-gray-400">← Powrót</button>
          <h2 className="text-xl">Półka nie znaleziona</h2>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <button onClick={() => router.push('/wardrobe')} className="text-sm text-gray-400">← Powrót</button>
            <h1 className="text-2xl font-semibold mt-2">{shelf.name}</h1>
            <div className="text-sm text-gray-400 mt-1">{shelf.thumbnails.length} items</div>
          </div>
        </div>

        {shelf.thumbnails.length === 0 ? (
          <div className="mt-8 text-center text-gray-400">Brak zdjęć w tej półce.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {shelf.thumbnails.map((t: any, i: number) => (
              <div key={t.id} className="relative rounded overflow-hidden bg-[#3a3a3a] border border-white/5 group">
                <div className="w-full h-64 overflow-hidden">
                  <img src={t.url} alt={`item-${i}`} className="w-full h-full object-cover" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-black/0 group-hover:bg-black/50 transition">
                  <div className="mb-2 text-xs text-white/90">
                    {t.color && <span className="mr-2">Kolor: {t.color}</span>}
                    {t.styles && t.styles.length > 0 && (
                      <span>Styl: {t.styles.join(', ')}</span>
                    )}
                  </div>
                  {t.description && <div className="text-sm text-white/90 mb-2">{t.description}</div>}
                </div>

                <button
                  onClick={() => removeImage(t.id)}
                  className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-xs"
                >
                  Usuń
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
