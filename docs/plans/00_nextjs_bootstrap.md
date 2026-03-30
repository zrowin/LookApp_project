# 00 Bootstrap Next.js Application

**Status:** 🟢 Zakończony

## Opis

Inicjalizacja i konfiguracja projektu Next.js 14 z App Router, TypeScript i Tailwind CSS dla aplikacji LookApp. Obejmuje ustawienie struktury katalogów frontendowych, konfigurację klienta Supabase (tylko przeglądarkowy), oraz podstawową konfigurację CI/CD.

## Wymagania

- [x] Zainicjalizować projekt Next.js 14 z App Router
- [x] Skonfigurować TypeScript z strict mode
- [x] Skonfigurować Tailwind CSS z design tokens
- [x] Skonfigurować ESLint i Prettier
- [x] Skonfigurować Supabase client (tylko klient przeglądarkowy)
- [x] Utworzyć strukturę katalogów zgodnie z architekturą (frontend)
- [x] Utworzyć plik .env z wszystkimi wymaganymi zmiennymi
- [x] Skonfigurować GitHub Actions CI pipeline
- [x] Utworzyć README z instrukcjami uruchomienia

## Architektura

### Struktura Katalogów (Frontend)

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Protected routes
│   │   ├── wardrobe/
│   │   ├── outfit-builder/
│   │   ├── outfits/
│   │   └── settings/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing/Home
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Base UI components (Button, Input, Card, etc.)
│   ├── features/            # Feature-specific components
│   │   ├── upload/
│   │   ├── canvas/
│   │   ├── wardrobe/
│   │   └── outfits/
│   └── layouts/             # Layout components
├── lib/
│   ├── supabase/            # Supabase client setup
│   │   ├── client.ts        # Browser client
│   │   └── middleware.ts   # Auth middleware
│   ├── stripe/              # Stripe utilities (tylko client-side)
│   ├── utils/               # Utility functions
│   └── constants/           # App constants
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript types
└── middleware.ts             # Next.js middleware for auth
```

> **Uwaga:** Katalog `api/` oraz `server.ts` z konfiguracją backendu znajdują się w planie [01 - Upload i Background Removal](docs/plans/01_upload_and_bg_removal.md).

### Zmienne Środowiskowe (.env.example)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Background Removal (opcjonalnie na start)
REMOVE_BG_API_KEY=
REPLICATE_API_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=LookApp
```

## Plan Implementacji (kolejność)

### Krok 1: Inicjalizacja Next.js

- [x] Zainstaluj Next.js 14 z App Router:
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```
- [x] Usuń domyślne pliki (page.tsx, globals.css) i zastąp je szkieletem
- [x] Skonfiguruj `tsconfig.json` z strict mode i paths aliases

### Krok 2: Konfiguracja Stylów

- [x] Skonfiguruj Tailwind CSS z custom design tokens (kolory brandowe, spacing, fonty)
- [x] Utwórz `src/app/globals.css` z base styles
- [x] Utwórz komponent `src/lib/utils.ts` z helperami (cn, format date, etc.)
- [x] Skonfiguruj CSS variables dla theming

### Krok 3: Struktura Katalogów

- [x] Utwórz strukturę `src/components/ui/` z base components
- [x] Utwórz strukturę `src/components/features/` (pusta na razie)
- [x] Utwórz strukturę `src/hooks/`
- [x] Utwórz strukturę `src/types/`

### Krok 4: Konfiguracja Supabase (Frontend)

- [x] Zainstaluj `@supabase/supabase-js`
- [x] Utwórz `src/lib/supabase/client.ts` - przeglądarkowy klient
- [x] Utwórz `src/middleware.ts` dla obsługi sesji
- [x] Utwórz helper hooks `useUser()`, `useSession()` dla components

> **Uwaga:** Konfiguracja backendu (server.ts z service role, API routes) znajduje się w planie [01 - Upload i Background Removal](docs/plans/01_upload_and_bg_removal.md).

### Krok 5: Root Layout i Strona Główna

- [x] Utwórz `src/app/layout.tsx` z Providers (SessionProvider, ThemeProvider)
- [x] Utwórz `src/app/page.tsx` jako landing page (tymczasowy)
- [x] Dodaj favicon i meta tagi

### Krok 6: Konfiguracja ESLint i Prettier

- [x] Skonfiguruj `.eslintrc.json` z React, TypeScript, Next.js rules
- [x] Skonfiguruj `.prettierrc` z formatowaniem
- [x] Dodaj npm scripts: `lint`, `lint:fix`, `format`

### Krok 7: CI/CD Pipeline

- [x] Utwórz `.github/workflows/ci.yml` z pipeline:
  - lint
  - type-check
  - test
  - build
- [x] Skonfiguruj Vercel deployment (opcjonalnie)

### Krok 8: Dokumentacja

- [x] Utwórz `.env.example` z wszystkimi wymaganymi zmiennymi
- [x] Zaktualizuj `README.md` z:
  - Screenshootem projektu
  - Opisem tech stacka
  - Instrukcjami instalacji (npm install)
  - Instrukcjami uruchomienia (npm run dev)
  - Listą dostępnych komend
  - Informacją o wymaganych zmiennych środowiskowych

### Krok 9: Walidacja

- [x] Zweryfikuj że `npm run dev` uruchamia się bez błędów
- [x] Zweryfikuj że `npm run build` buduje projekt poprawnie
- [x] Zweryfikuj że `npm run lint` nie zwraca błędów
- [x] Sprawdź czy strona główna renderuje się poprawnie

## Punkty do dyskusji

1. **Czy używać CSS Modules czy styled-components?** - Tailwind + CSS Modules jest rekomendowane
2. **Czy od razu tworzyć mockupy wszystkich stron?** - lub skupić się na MVP flow

## Szacowany czas

- Przygotowanie: 0.5 godziny
- Inicjalizacja Next.js: 0.5 godziny
- Konfiguracja Supabase (frontend): 0.5 godziny
- CI/CD i dokumentacja: 1 godzina
- **Razem: ~2.5 godziny**

---

## 🔄 Aktualizacja statusu (po zakończeniu implementacji)

Po zakończeniu wdrożenia tej funkcjonalności:

1. **Zaktualizuj status planu w** [`docs/implemented_plans.md`](docs/implemented_plans.md):

   ```markdown
   | 00 | Bootstrap Next.js Application | 🟢 Zakończony | YYYY-MM-DD |
   ```

2. **Dodaj zaimplementowaną funkcjonalność do** [`docs/implemented_features.md`](docs/implemented_features.md):

   ```markdown
   ## [00] Bootstrap Next.js Application

   - **Data wdrożenia:** YYYY-MM-DD
   - **Plan:** [Nazwa planu](docs/plans/00_nextjs_bootstrap.md)
   - **Opis:** Inicjalizacja projektu Next.js 14 z App Router, TypeScript i Tailwind CSS. Konfiguracja Supabase client (frontend) i podstawowa struktura katalogów.
   - **Główne komponenty:**
     - `src/app/` - App Router structure
     - `src/components/ui/` - Base UI components
     - `src/lib/supabase/client.ts` - Supabase browser client
     - `.github/workflows/ci.yml` - CI pipeline
   ```
