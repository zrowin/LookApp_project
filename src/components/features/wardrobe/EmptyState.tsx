import React from 'react'

type Props = {
  onAdd: () => void
}

export default function EmptyState({ onAdd }: Props) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <button
        onClick={onAdd}
        aria-label="Dodaj pierwszą półkę"
        className="mb-4 flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-transparent text-4xl font-semibold text-white hover:bg-gray-800 transition"
      >
        +
      </button>
      <div className="text-center text-white text-lg">Dodaj pierwszą półkę</div>
    </div>
  )
}
