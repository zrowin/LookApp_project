'use client';

import React from 'react';

export default function SavedIndicator({ onOpen }: { onOpen?: () => void }) {
  function handleClick() {
    if (!onOpen) return;
    onOpen();
  }

  return (
    <div className="absolute right-4 bottom-4 z-10">
      <button
        type="button"
        onClick={handleClick}
        className="saved-indicator-button flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#252425] shadow-lg transition-transform hover:scale-105"
        aria-label="Dodaj do ulubionych"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 20.4s-6.9-4.35-8.8-8.05C1.55 9.15 3.45 6.2 6.7 6.2c2.05 0 3.45 1.15 4.15 2.25.35.55.95.55 1.3 0 .7-1.1 2.1-2.25 4.15-2.25 3.25 0 5.15 2.95 3.5 6.15C18.9 16.05 12 20.4 12 20.4z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
