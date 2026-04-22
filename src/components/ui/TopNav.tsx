"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function NavButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname?.startsWith(href)
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-transform hover:scale-105 ${
        active ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-600'
      }`}
    >
      <div
        className={`h-8 w-8 flex items-center justify-center ${active ? 'text-black' : 'text-gray-600'}`}
        style={{ color: '#252425' }}
      >
        {children}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  )
}

export default function TopNav() {
  const pathname = usePathname()

  // Hide top navigation on the welcome (root) page
  if (pathname === '/') return null

  return (
    <nav className="w-full bg-white border-b border-gray-200 text-black">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="text-3xl sm:text-4xl font-extrabold">LookApp</div>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <NavButton href="/wardrobe" label="Szafa">
            {/* wardrobe icon */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>
          </NavButton>

          <NavButton href="/dashboard/upload" label="Dodaj">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </NavButton>

          <NavButton href="/try-on" label="Przymierzalnia">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </NavButton>

          <NavButton href="/outfits" label="Ulubione">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6.716-4.35-9.173-6.692C-0.32 10.886 3.12 6.5 7.5 8.5 9.418 9.41 12 12 12 12s2.582-2.59 4.5-3.5C20.88 6.5 24.32 10.886 21.173 14.308 18.716 16.65 12 21 12 21z" stroke="currentColor" strokeWidth="0.8" fill="currentColor"/></svg>
          </NavButton>

          <NavButton href="/settings" label="Konto">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </NavButton>
        </div>
      </div>
    </nav>
  )
}
