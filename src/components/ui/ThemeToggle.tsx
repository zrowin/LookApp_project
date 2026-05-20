"use client"

import React from 'react'

type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'lookapp-theme'

export default function ThemeToggle() {
  const [mode, setMode] = React.useState<ThemeMode>('dark')

  React.useEffect(() => {
    const savedMode = window.localStorage.getItem(STORAGE_KEY)
    const nextMode: ThemeMode = savedMode === 'light' ? 'light' : 'dark'

    setMode(nextMode)
    document.documentElement.dataset.theme = nextMode
  }, [])

  function toggleMode() {
    const nextMode: ThemeMode = mode === 'dark' ? 'light' : 'dark'

    setMode(nextMode)
    document.documentElement.dataset.theme = nextMode
    window.localStorage.setItem(STORAGE_KEY, nextMode)
  }

  const isLight = mode === 'light'

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="top-nav-theme-toggle flex appearance-none flex-col items-center gap-1 rounded-md border-0 bg-transparent px-3 py-2 text-gray-600 transition-transform hover:scale-105"
      aria-label={isLight ? 'Włącz dark mode' : 'Włącz light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
    >
      <span className="top-nav-icon flex h-8 w-8 items-center justify-center">
        {isLight ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21 13.2A7.5 7.5 0 1 1 10.8 3a6 6 0 1 0 10.2 10.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2.5v2M12 19.5v2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M2.5 12h2M19.5 12h2M4.5 19.5l1.4-1.4M18.1 5.9l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="text-xs leading-none">Motyw</span>
    </button>
  )
}
