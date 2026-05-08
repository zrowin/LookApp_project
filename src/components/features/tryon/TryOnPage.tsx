"use client"

import React from 'react'
import CanvasArea from './CanvasArea'
import WardrobeSidebar from './WardrobeSidebar'
import SavedIndicator from './SavedIndicator'

export type CanvasItem = {
  id: string
  src: string
  x: number
  y: number
  width?: number
  height?: number
}

export default function TryOnPage() {
  const [items, setItems] = React.useState<CanvasItem[]>([])

  function addItem(newItem: Omit<CanvasItem, 'id'>) {
    setItems((s) => [...s, { id: Date.now().toString(), ...newItem }])
  }

  function updateItem(id: string, patch: Partial<CanvasItem>) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function removeItem(id: string) {
    setItems((s) => s.filter((it) => it.id !== id))
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-black text-white p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Przymierzalnia</h1>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-2 lg:flex-row">
        <div className="relative flex flex-1 items-stretch">
          <CanvasArea items={items} onAdd={addItem} onUpdate={updateItem} onRemove={removeItem} />
          <SavedIndicator />
        </div>

        <div className="w-full shrink-0 lg:w-96 xl:w-[28rem]">
          <WardrobeSidebar />
        </div>
      </div>

    </main>
  )
}
