"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import ShelfCard from '@/components/features/wardrobe/ShelfCard'
import EmptyState from '@/components/features/wardrobe/EmptyState'
import AddShelfButton from '@/components/features/wardrobe/AddShelfButton'
import { getShelves, saveShelves, addShelf as addShelfUtil, updateShelfName, deleteShelf as deleteShelfUtil } from '@/lib/shelves'

export default function WardrobePage() {
  const router = useRouter()
  const [shelves, setShelves] = React.useState(() => {
    // initial empty until loaded on client
    return [] as any
  })

  React.useEffect(() => {
    const saved = getShelves()
    if (saved && saved.length > 0) {
      setShelves(saved)
    } else {
      // seed defaults
      const defaults = [
        { id: '1', name: 'Koszulki', thumbnails: [] },
        { id: '2', name: 'Spodnie', thumbnails: [] },
        { id: '3', name: 'Buty', thumbnails: [] },
      ]
      setShelves(defaults)
      saveShelves(defaults)
    }
  }, [])

  function addShelf(name?: string) {
    const title = name ?? (typeof window !== 'undefined' ? window.prompt('Nazwa półki') ?? 'Nowa półka' : 'Nowa półka')
    const s = addShelfUtil(title)
    setShelves((prev: any) => [...prev, s])
  }

  function renameShelf(id: string) {
    const current = shelves.find((s: any) => s.id === id)
    const newName = typeof window !== 'undefined' ? window.prompt('Nowa nazwa', current?.name ?? '') : ''
    if (newName) {
      updateShelfName(id, newName)
      setShelves((s: any) => s.map((x: any) => (x.id === id ? { ...x, name: newName } : x)))
    }
  }

  function deleteShelf(id: string) {
    if (!window.confirm('Usunąć półkę?')) return
    deleteShelfUtil(id)
    setShelves((s: any) => s.filter((x: any) => x.id !== id))
  }

  function openShelf(id: string) {
    // TODO: replace with real shelf view route
    router.push(`/wardrobe/${id}`)
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Twoja szafa</h1>
        <div>
          <AddShelfButton onAdd={() => addShelf()} />
        </div>
      </header>

      {shelves.length === 0 ? (
        <EmptyState onAdd={() => addShelf()} />
      ) : (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {shelves.map((s: any) => (
            <div key={s.id} className="p-1">
              <ShelfCard
                id={s.id}
                name={s.name}
                thumbnails={s.thumbnails}
                onRename={renameShelf}
                onDelete={deleteShelf}
                onOpen={openShelf}
              />
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
