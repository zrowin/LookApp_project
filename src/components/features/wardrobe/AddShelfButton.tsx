import React from 'react'

type Props = {
  onAdd: (name?: string) => void
}

export default function AddShelfButton({ onAdd }: Props) {
  return (
    <button
      onClick={() => onAdd()}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-sm text-white hover:bg-gray-800 transition"
    >
      + Dodaj półkę
    </button>
  )
}
