"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'
import ShelfCard from '@/components/features/wardrobe/ShelfCard'
import EmptyState from '@/components/features/wardrobe/EmptyState'
import AddShelfButton from '@/components/features/wardrobe/AddShelfButton'

type Shelf = {
  id: string
  name: string
  thumbnails: string[]
}

export default function WardrobePage() {
  const router = useRouter()
  const [shelves, setShelves] = React.useState<Shelf[]>(() => [
    { id: '1', name: 'Koszulki', thumbnails: [] },
    { id: '2', name: 'Spodnie', thumbnails: [] },
    { id: '3', name: 'Buty', thumbnails: [] },
  ])

  function addShelf(name?: string) {
    const title = name ?? window.prompt('Nazwa półki') ?? 'Nowa półka'
    setShelves((s) => [...s, { id: String(Date.now()), name: title, thumbnails: [] }])
  }

  function renameShelf(id: string) {
    const current = shelves.find((s) => s.id === id)
    const newName = window.prompt('Nowa nazwa', current?.name ?? '')
    if (newName) setShelves((s) => s.map((x) => (x.id === id ? { ...x, name: newName } : x)))
  }

  function deleteShelf(id: string) {
    if (!window.confirm('Usunąć półkę?')) return
    setShelves((s) => s.filter((x) => x.id !== id))
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
          {shelves.map((s) => (
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
