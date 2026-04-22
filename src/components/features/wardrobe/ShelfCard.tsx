import React from 'react'

type Props = {
  id: string
  name: string
  thumbnails?: string[]
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onOpen: (id: string) => void
}

export default function ShelfCard({ id, name, thumbnails = [], onRename, onDelete, onOpen }: Props) {
  return (
    <div className="rounded-lg bg-gray-900 p-4 text-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-3">
          <button onClick={() => onRename(id)} className="text-sm text-gray-300 hover:text-white">Edytuj</button>
          <button onClick={() => onDelete(id)} className="text-sm text-red-400 hover:text-red-600">Usuń</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3 cursor-pointer" onClick={() => onOpen(id)}>
        {thumbnails.length > 0 ? (
          thumbnails.map((t, i) => (
            <div key={i} className="h-24 w-full overflow-hidden rounded bg-gray-800">
              <img src={t} alt={`${name}-${i}`} className="h-full w-full object-cover" />
            </div>
          ))
        ) : (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 w-full overflow-hidden rounded bg-gray-800" />
          ))
        )}
      </div>

      <div className="text-sm text-gray-400">{thumbnails.length} items</div>
    </div>
  )
}
