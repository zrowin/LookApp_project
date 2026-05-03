"use client"

export default function SavedIndicator() {
  return (
    <div className="absolute bottom-4 right-4 z-10">
      <button
        type="button"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#252425] shadow-lg transition-transform hover:scale-105"
        aria-label="Dodaj do ulubionych"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21s-6.716-4.35-9.173-6.692C-0.32 10.886 3.12 6.5 7.5 8.5 9.418 9.41 12 12 12 12s2.582-2.59 4.5-3.5C20.88 6.5 24.32 10.886 21.173 14.308 18.716 16.65 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}
