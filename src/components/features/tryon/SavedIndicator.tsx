"use client"

import React from 'react'

export default function SavedIndicator({ onSave, disabled }: { onSave: () => boolean; disabled?: boolean }) {
  const [saved, setSaved] = React.useState(false)

  function handleSave() {
    const ok = onSave()
    setSaved(!!ok)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="fixed left-6 bottom-6">
      <button
        onClick={handleSave}
        disabled={disabled}
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${disabled ? 'bg-white/10 text-white/40' : 'bg-white text-black'}`}
        aria-label="Zapisz stylizację"
      >
        ❤️
      </button>

      {saved && <div className="mt-2 text-white text-sm text-center">Zapisano</div>}
    </div>
  )
}
