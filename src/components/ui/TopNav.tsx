'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/wardrobe', label: 'Szafa', icon: 'wardrobe' },
  { href: '/dashboard/upload', label: 'Dodaj', icon: 'add' },
  { href: '/try-on', label: 'Przymierzalnia', icon: 'try-on' },
  { href: '/outfits', label: 'Ulubione', icon: 'favorites' },
  { href: '/settings', label: 'Konto', icon: 'account' },
];

type NavIconName = (typeof NAV_ITEMS)[number]['icon'];

function NavIcon({ name }: { name: NavIconName }) {
  if (name === 'wardrobe') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="3" width="16" height="18" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 12h1.2M13.8 12H15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7 21h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'add') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.4 4.2 3.8 6.5l1.7 3.6 1.7-.9V21h9.6V9.2l1.7.9 1.7-3.6-3.6-2.3-2.1 1.5H9.5L7.4 4.2z"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinejoin="round"
        />
        <path d="M12 10.2v5M9.5 12.7h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'try-on') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M6 4v16" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path d="M18 4v16" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path d="M8 6c1.4 1.7 1.4 3.3 0 5 1.4 1.7 1.4 3.3 0 5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6c-1.4 1.7-1.4 3.3 0 5-1.4 1.7-1.4 3.3 0 5" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5v15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'favorites') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20.4s-6.9-4.35-8.8-8.05C1.55 9.15 3.45 6.2 6.7 6.2c2.05 0 3.45 1.15 4.15 2.25.35.55.95.55 1.3 0 .7-1.1 2.1-2.25 4.15-2.25 3.25 0 5.15 2.95 3.5 6.15C18.9 16.05 12 20.4 12 20.4z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8.4" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.2 20.2c.55-4 3.05-6.2 6.8-6.2s6.25 2.2 6.8 6.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
      className={`top-nav-link flex w-20 shrink-0 flex-col items-center gap-1 rounded-md px-2 py-2 transition-transform hover:scale-105 xl:w-24 ${
        active ? 'is-active' : ''
      } ${
        active ? 'bg-gray-100 text-black shadow-sm' : 'text-gray-600'
      }`}
    >
      <div
        className={`top-nav-icon flex h-8 w-8 items-center justify-center ${active ? 'text-black' : 'text-gray-600'}`}
      >
        {children}
      </div>
      <span className="text-xs leading-none">{label}</span>
    </Link>
  );
}

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const activeItem = NAV_ITEMS.find((item) => pathname?.startsWith(item.href)) ?? NAV_ITEMS[0];

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Hide top navigation on the welcome (root) page
  if (pathname === '/') return null;

  return (
    <nav className="top-nav sticky top-0 z-50 w-full border-b border-gray-200 bg-white text-black">
      <div className="mx-auto flex w-full max-w-[118rem] items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
        <div className="flex items-center gap-4">
          <Link
            href="/wardrobe"
            className="text-3xl font-extrabold lg:text-4xl"
            aria-label="Przejdź do szafy"
          >
            LookApp
          </Link>
        </div>

        <div className="relative min-w-0 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="top-nav-mobile-trigger flex max-w-[58vw] items-center gap-3 border-l border-gray-300 py-1 pl-4 text-left text-black"
            aria-haspopup="menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Wybierz sekcję"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="top-nav-icon flex h-8 w-8 shrink-0 items-center justify-center">
                <NavIcon name={activeItem.icon} />
              </span>
              <span className="truncate text-lg font-medium">{activeItem.label}</span>
            </span>
            <span className="top-nav-mobile-arrow text-current opacity-55" aria-hidden="true">
              ▾
            </span>
          </button>

          {isMobileMenuOpen && (
            <div
              className="top-nav-mobile-menu absolute right-0 z-20 mt-3 w-64 overflow-hidden rounded border border-white/10 bg-[#252425] py-1 shadow-lg"
              role="menu"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`top-nav-mobile-item flex w-full items-center gap-3 px-4 py-3 text-left text-base text-white hover:bg-white/10 ${
                    activeItem.href === item.href ? 'bg-white/10' : ''
                  }`}
                  role="menuitem"
                >
                  <span className="top-nav-icon flex h-8 w-8 shrink-0 items-center justify-center text-white/85">
                    <NavIcon name={item.icon} />
                  </span>
                  {item.label}
                </button>
              ))}
              <div className="my-1 border-t border-white/10" />
              <ThemeToggle menuItem />
            </div>
          )}
        </div>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
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

          <div className="ml-1 border-l border-gray-300 pl-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
