"use client"

import React from 'react'
import DraggableItem from './DraggableItem'
import { getShelves } from '../../../lib/shelves'

export default function WardrobeSidebar() {
  const [shelves, setShelves] = React.useState<any[]>([])
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    try {
      const data = getShelves()
      setShelves(data || [])
    } catch (e) {
      setShelves([])
    }
  }, [])

  function toggleShelf(id: string) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <aside className="h-[70vh] overflow-auto rounded-md border border-white/6 bg-[#0b0b0b] p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Twoja szafa</h3>
      </div>

      {shelves.length === 0 && <div className="text-white/40">Brak półek — dodaj w sekcji „Szafa”</div>}

      <div className="flex flex-col gap-3">
        {shelves.map((shelf) => (
          <div key={shelf.id} className="border border-white/6 rounded p-2 bg-white/2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{shelf.name}</div>
              <button
                onClick={() => toggleShelf(shelf.id)}
                className="text-xs text-white/60 px-2 py-1 rounded-md bg-transparent"
                aria-expanded={!!expanded[shelf.id]}
              >
                {expanded[shelf.id] ? 'Ukryj' : 'Pokaż'}
              </button>
            </div>

            {expanded[shelf.id] && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(shelf.thumbnails || []).length === 0 && <div className="text-white/40 col-span-2">Pusta półka</div>}
                {(shelf.thumbnails || []).map((it: any) => (
                  <div key={it.id}>
                    <DraggableItem item={{ id: it.id, src: it.url }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
