# Implemented Features

Lista wszystkich zaimplementowanych funkcjonalności projektu LookApp.

## Mapa dokumentów

- Full navigation: [Mapa dokumentów — NAVIGATION.md](NAVIGATION.md)


## [00] Bootstrap Next.js Application

- **Data wdrożenia:** 2026-03-26
- **Plan:** [00 - Bootstrap Next.js Application](docs/plans/00_nextjs_bootstrap.md)
- **Opis:** Inicjalizacja projektu Next.js 14 z App Router, TypeScript i Tailwind CSS. Konfiguracja Supabase client (frontend) i podstawowa struktura katalogów.
- **Główne komponenty:**
  - [`src/app/`](src/app/) - App Router structure (layout, page, globals.css)
  - [`src/components/ui/`](src/components/ui/) - Base UI components (Button, Input, Card)
  - [`src/lib/supabase/client.ts`](src/lib/supabase/client.ts) - Supabase browser client
  - [`src/hooks/useUser.ts`](src/hooks/useUser.ts) - User and session hooks
  - [`src/types/index.ts`](src/types/index.ts) - TypeScript types
  - [`src/middleware.ts`](src/middleware.ts) - Auth middleware
  - [`.github/workflows/ci.yml`](.github/workflows/ci.yml) - CI pipeline
  - [`tailwind.config.ts`](tailwind.config.ts) - Tailwind CSS with design tokens
  - [`.eslintrc.json`](.eslintrc.json) - ESLint configuration
  - [`.prettierrc`](.prettierrc) - Prettier configuration
- **Status:** ✅ Ukończone

---

## [01] Dodawanie zdjęć ubrań (Upload + BG Removal)

- **Data wdrożenia:** 2026-04-20
- **Plan:** [01 - Upload and Background Removal](docs/plans/01_upload_and_bg_removal.md)
- **Opis:** Zaimplementowano podstawowy mechanizm uploadu obrazów z klienta, serwerowy endpoint przyjmujący pliki (base64), zapis do Supabase Storage oraz generowanie miniaturek (WebP). Dodano także szkic komponentu UI z drag&drop, podglądem i walidacją rozmiaru/typu oraz test integracyjny (mock Supabase).
- **Główne komponenty:**
  - `src/components/features/upload/Upload.tsx` — komponent uploadu (drag&drop, preview, walidacja)
  - `src/components/features/upload/index.tsx` — export komponentu
  - `src/lib/supabase/server.ts` — server-side Supabase client (service role scaffold)
  - `src/lib/supabase/admin.ts` — admin helpers (scaffold)
  - `src/app/api/upload/route.ts` — API route `POST /api/upload` i `handleUpload()` (zapis do storage, generowanie miniaturek)
  - `src/lib/images/thumbnail.ts` — helper generujący miniaturki (sharp → webp)
  - `tests/upload.integration.test.js` — integracyjny test uploadu (mock Supabase)
  - `package.json` — dodane zależności `sharp` i `ts-node` dla testów i obróbki obrazów
- **Status:** 🟡 W trakcie


## Lista zadań do wdrożenia (checkboxy)

Poniższa lista zadań powstała na podstawie [docs/implemented_plans.md](docs/implemented_plans.md). Każdy punkt można oznaczyć jako wykonany poprzez zaznaczenie checkboxa.

### 01 - Dodawanie zdjęć ubrań
- [ ] Stworzyć UI uploadu w src/components/features/upload (drag & drop, podgląd, pasek postępu)
- [ ] Backend: endpoint do przyjmowania plików i zapis w storage; zapis metadanych (owner, nazwa pliku, wymiary, rozmiar, hash, timestamp)
- [ ] Implementować generowanie miniatur i wersji webp; ustawić limit rozmiaru i walidację typów
- [ ] Przygotować schemat DB/Dexie.js dla `clothing_items` i mechanizm opcjonalnej synchronizacji z backendem
- [ ] (Opcjonalne) Integracja z serwisem do usuwania tła (background removal)
- [ ] Napisać testy akceptacyjne: upload działa, plik w storage, poprawne metadane

### 02 - Kategoryzacja ubrań (tagowanie)
- [ ] Zaprojektować model danych: `categories`, `tags` oraz relacje wiele-do-wielu z `clothing_items`
- [ ] Dodać UI do edycji metadanych i przypisywania tagów (widok pojedynczy + bulk edit)
- [ ] Implementować endpoint/autotagger zwracający proponowane tagi (integracja z ML lub zewnętrznym serwisem)
- [ ] Rozszerzyć wyszukiwanie i filtry o kategorię, tagi, kolor i materiał
- [ ] Przygotować migracje DB / aktualizację schematu Dexie.js
- [ ] Napisać testy akceptacyjne: ręczne tagowanie i autotagging, filtry działają poprawnie

### 03 - Dobieranie zdjęć — tworzenie stroju (Outfit Builder)
- [ ] Zaprojektować model danych: tabela `outfits` z listą `clothing_item_ids` i metadanymi (nazwa, opis, cover image, owner, timestamp)
- [ ] Zaimplementować UI buildera w `src/components/features/outfits` (canvas/siatka, drag&drop, pozycjonowanie)
- [ ] Wstępny silnik dopasowań: reguły heurystyczne (np. nie łączyć dwóch spodni)
- [ ] Rozszerzyć opcjonalnie o rekomendacje ML (kolor harmony, styl, okazja)
- [ ] Dodać funkcje zapisu wersji, udostępniania linków i eksportu do mediów społecznościowych
- [ ] Napisać testy akceptacyjne: tworzenie, zapis i ponowne ładowanie outfitów

### 04 - Komunikaty i informacje zwrotne (UX feedback)
- [ ] Wybrać lub stworzyć komponent powiadomień (`Toast`) oraz hook `useToast` w `src/components/ui` lub `src/hooks`
- [ ] Zintegrować powiadomienia z kluczowymi akcjami: upload, autotagging, zapis outfitów, synchronizacja
- [ ] Dodać dostępność (role ARIA, czytelność dla czytników ekranowych, opcje timeoutu)
- [ ] Zaimplementować globalny provider/context do wywoływania komunikatów z dowolnego miejsca aplikacji
- [ ] (Opcjonalne) Dodać historię komunikatów lub panel debugowy do szczegółowych logów
- [ ] Napisać testy akceptacyjne: komunikaty pojawiają się i są czytelne dla dostępności

---

Jeśli chcesz, mogę teraz:
- zaktualizować statusy w TODO (oznaczyć krok 1 jako ukończony),
- albo od razu oznaczyć wszystkie kroki w planie jako rozpoczęte/ukończone.

