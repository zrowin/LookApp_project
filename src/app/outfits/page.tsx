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

  async function handleEdit(outfit: Outfit) {
    const newName = window.prompt('Nowa nazwa', outfit.name ?? 'Nowy outfit')
    if (!newName) return

    const newDescription = window.prompt('Nowy opis', outfit.description ?? '')
    if (newDescription === null) return

    const updatedOutfit = {
      ...outfit,
      name: newName.trim(),
      description: newDescription.trim() || undefined,
    }

    try {
      await DataService.saveOutfit(updatedOutfit)
      setOutfits((prev) => prev.map((o) => (o.id === outfit.id ? updatedOutfit : o)))
    } catch (e) {
      console.error('edit outfit error', e)
      alert('Błąd podczas edycji')
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
            <div key={o.id} className="relative rounded-xl border border-white/6 bg-[#252425] p-3 text-white shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{o.name ?? 'Nowy outfit'}</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(o)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Edytuj outfit"
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
                    onClick={() => handleDelete(o.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                    aria-label="Usuń outfit"
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

              <div className="flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-[#3a3a3a]">
                {o.thumbnailDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={o.thumbnailDataUrl} alt={o.name ?? 'Outfit'} className="block h-auto w-full object-contain" />
                ) : (
                  <div className="flex aspect-[3/2] w-full items-center justify-center text-white/40">Brak miniaturki</div>
                )}
              </div>
              <div className="mt-2">
                <div className="text-sm text-white/60">{o.description ?? ''}</div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
