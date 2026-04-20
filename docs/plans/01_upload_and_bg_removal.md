# Upload zdjęć + Background Removal

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
    - [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
    - [02_auto_tagging.md](02_auto_tagging.md)
    - [03_outfit_builder.md](03_outfit_builder.md)
    - [04_save_and_manage_outfits.md](04_save_and_manage_outfits.md)
    - [05_recommendation_engine.md](05_recommendation_engine.md)
    - [06_auth_registration_onboarding.md](06_auth_registration_onboarding.md)
    - [07_billing_and_subscription.md](07_billing_and_subscription.md)
    - [08_export_to_social.md](08_export_to_social.md)
    - [09_reverse_image_search.md](09_reverse_image_search.md)
    - [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
    - [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

**Status:** 🟡 W trakcie

## Postęp wdrożenia

- **Faza 0: Identyfikacja planu**: [x] Przeczytano plan i sprawdzono status (wykonane)
- **Grupa 1 — Przygotowanie środowiska**:
    - [x] Utworzyć `src/lib/supabase/server.ts` z service role (szkic)
    - [x] Utworzyć pomocniczy skrypt do utworzenia bucket `clothing-images` (`scripts/setup_supabase_storage.js`)
    - [x] Dodać przykładowe RLS SQL i instrukcje (`docs/supabase/images_table_and_rls.sql`)
    - [x] Sprawdzić i utworzyć katalog `src/components/features/upload`
- **Grupa 2 — Frontend UI**:
    - [ ] Szkic komponentu upload (drag & drop, preview)
    - [ ] Walidacja typów i maks. rozmiaru
    - [x] Szkic komponentu upload (drag & drop, preview)
    - [x] Walidacja typów i maks. rozmiaru
- **Grupa 3 — Backend/API**:
    - [x] Endpoint `POST /api/upload` (szkic) — przyjmuje JSON z `fileBase64`, zapisuje do `clothing-images`
    - [x] Zapis plików do storage i generowanie miniatur (szkic implementacji)

**Następny krok (wymaga potwierdzenia):** Rozpocząć *Grupa 1* — przygotowanie środowiska?

## Cel
Umożliwić użytkownikowi dodanie zdjęcia ubrania i automatyczne usunięcie tła, przygotowując obraz do tagowania i użycia w builderze outfitów.

## Wymagania wstępne
- [ ] Skonfigurować Supabase server client (`src/lib/supabase/server.ts`)
- [ ] Utworzyć bucket `clothing-images` w Supabase Storage
- [ ] Skonfigurować Row Level Security (RLS) policies

## Backend - Konfiguracja

### Struktura Katalogów

```
src/
├── app/
│   └── api/                  # API Routes
│       ├── auth/
│       ├── upload/
│       ├── images/
│       ├── outfits/
│       └── webhooks/
└── lib/
    └── supabase/
        └── server.ts        # Server client (with service role)
```

### Konfiguracja Supabase Backend

 - [x] Utwórz `src/lib/supabase/server.ts` z service role key
 - [x] Utwórz `src/lib/supabase/admin.ts` dla operacji administracyjnych
 - [x] Skonfiguruj RLS policies dla tabeli `images` — dodałem przykładowy SQL w `docs/supabase/images_table_and_rls.sql`
 - [x] Utwórz bucket `clothing-images` w Supabase Storage — dodałem `scripts/setup_supabase_storage.js` do uruchomienia lokalnie
 - [x] Skonfiguruj storage policies (upload, read, delete) — helper w `src/lib/supabase/admin.ts` exposes `setBucketPublic` (best-effort)

## Kryteria akceptacji
- Użytkownik może przesłać zdjęcie z urządzenia mobilnego/desktop.
- System zwraca obraz z usuniętym tłem w < 30s (dla MVP ręczna/serwisowa opcja też OK).
- Obsługa formatu JPG/PNG, maks. rozmiar 10MB.

## Kroki implementacji
- Frontend: formularz uploadu, progress indicator, podgląd przetworzonego obrazu.
- Backend: endpoint `POST /api/upload` zapisujący obraz w storage i uruchamiający job przetwarzania.
- Worker/Service: wywołanie modelu BG removal (zewnętrzne API lub lokalny model), zapis wersji „clean”.

## API
- `POST /api/upload` — przyjmuje multipart/form-data, zwraca ID obrazu i URL do przetworzonej wersji.
- `GET /api/images/:id` — zwraca metadane i linki do wersji obrazu.

## Dane / Schemat

### Baza danych
- Table `images`: id, ownerId, originalUrl, processedUrl, status, tags[], createdAt

### Storage
- Bucket `clothing-images`: przechowywanie oryginalnych i przetworzonych obrazów
- Path pattern: `{userId}/{imageId}/{version}.{ext}`

## 3rd-party / narzędzia
- Opcje: remove.bg, Cloudinary background removal, własny model oparty na Segmentacji.

## Bezpieczeństwo / prywatność
- Szyfrowanie przesyłu (HTTPS), możliwa szyfrowana warstwa storage.
- Endpoint do usuwania zdjęć na żądanie użytkownika (RODO).

## Testy
- Upload pliku i symulacja BG removal success/failure.
- Test limitów rozmiaru i nieprawidłowych formatów.

## Szacunkowy czas
- MVP (integracja z zewnętrznym API): 2–3 dni.

## Notatki
- Dla concierge MVP można zrobić manualną obróbkę i wstawić wynik ręcznie.