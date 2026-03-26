# Upload zdjęć + Background Removal

**Status:** 🔴 Nie rozpoczęty

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

- [ ] Utwórz `src/lib/supabase/server.ts` z service role key
- [ ] Utwórz `src/lib/supabase/admin.ts` dla operacji administracyjnych
- [ ] Skonfiguruj RLS policies dla tabeli `images`
- [ ] Utwórz bucket `clothing-images` w Supabase Storage
- [ ] Skonfiguruj storage policies (upload, read, delete)

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