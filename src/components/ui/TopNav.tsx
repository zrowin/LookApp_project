'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function NavButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname?.startsWith(href);
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`flex flex-col items-center gap-1 rounded-md px-3 py-2 transition-transform hover:scale-105 ${
        active ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-600'
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center ${active ? 'text-black' : 'text-gray-600'}`}
        style={{ color: '#252425' }}
      >
        {children}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function TopNav() {
  const pathname = usePathname();

  // Hide top navigation on the welcome (root) page
  if (pathname === '/') return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white text-black">
      <div className="mx-auto flex w-full max-w-[118rem] items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <Link
            href="/wardrobe"
            className="text-3xl font-extrabold sm:text-4xl"
            aria-label="Przejdź do szafy"
          >
            LookApp
          </Link>
        </div>

        <div className="hidden items-center gap-6 sm:flex lg:gap-10 xl:gap-14">
          <NavButton href="/wardrobe" label="Szafa">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="1.8"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path d="M12 3v18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path
                d="M9 12h1.2M13.8 12H15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path d="M7 21h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </NavButton>

          <NavButton href="/dashboard/upload" label="Dodaj">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.4 4.2 3.8 6.5l1.7 3.6 1.7-.9V21h9.6V9.2l1.7.9 1.7-3.6-3.6-2.3-2.1 1.5H9.5L7.4 4.2z"
                stroke="currentColor"
                strokeWidth="1.55"
                strokeLinejoin="round"
              />
              <path
                d="M12 10.2v5M9.5 12.7h5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </NavButton>

          <NavButton href="/try-on" label="Przymierzalnia">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M6 4v16" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
              <path d="M18 4v16" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
              <path
                d="M8 6c1.4 1.7 1.4 3.3 0 5 1.4 1.7 1.4 3.3 0 5"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 6c-1.4 1.7-1.4 3.3 0 5-1.4 1.7-1.4 3.3 0 5"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 5v15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </NavButton>

          <NavButton href="/outfits" label="Ulubione">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 20.4s-6.9-4.35-8.8-8.05C1.55 9.15 3.45 6.2 6.7 6.2c2.05 0 3.45 1.15 4.15 2.25.35.55.95.55 1.3 0 .7-1.1 2.1-2.25 4.15-2.25 3.25 0 5.15 2.95 3.5 6.15C18.9 16.05 12 20.4 12 20.4z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavButton>

          <NavButton href="/settings" label="Konto">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8.4" r="3.2" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M5.2 20.2c.55-4 3.05-6.2 6.8-6.2s6.25 2.2 6.8 6.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavButton>
        </div>
      </div>
    </nav>
  );
}
