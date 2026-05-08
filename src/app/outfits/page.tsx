"use client"

import * as React from 'react'
import { DataService } from '@/lib/dataService'
import type { Outfit } from '@/types/db'

export default function OutfitsPage() {
  const [outfits, setOutfits] = React.useState<Outfit[]>([])

  React.useEffect(() => {
    let mounted = true
    DataService.listOutfits().then((list) => {
      if (!mounted) return
      setOutfits(list || [])
    })
    return () => {
      mounted = false
    }
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Usunąć tę stylizację?')) return
    try {
      await DataService.deleteOutfit(id)
      setOutfits((prev) => prev.filter((o) => o.id !== id))
    } catch (e) {
      console.error('delete outfit error', e)
      alert('Błąd podczas usuwania')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ulubione</h1>
      </header>

      {outfits.length === 0 ? (
        <div className="text-white/60">Brak zapisanych stylizacji. Zapisz stylizację w przymierzalni, klikając serce.</div>
      ) : (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {outfits.map((o) => (
            <div key={o.id} className="relative rounded-md bg-neutral-900 p-2">
              <button
                onClick={() => handleDelete(o.id)}
                className="absolute -top-2 -right-2 bg-white text-black rounded-full w-7 h-7 flex items-center justify-center text-xs shadow"
                aria-label="Usuń outfit"
              >
                ×
              </button>

              <div className="h-48 w-full bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                {o.thumbnailDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={o.thumbnailDataUrl} alt={o.name ?? 'Outfit'} className="h-full w-full object-cover" />
                ) : (
                  <div className="text-white/40">Brak miniaturki</div>
                )}
              </div>
              <div className="mt-2">
                <div className="font-medium">{o.name ?? 'Nowy outfit'}</div>
                <div className="text-sm text-white/60">{o.description ?? ''}</div>
                <div className="text-xs text-white/40 mt-1">{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}</div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
