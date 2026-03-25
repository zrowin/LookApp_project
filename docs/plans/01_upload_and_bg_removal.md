# Upload zdjęć + Background Removal

## Cel
Umożliwić użytkownikowi dodanie zdjęcia ubrania i automatyczne usunięcie tła, przygotowując obraz do tagowania i użycia w builderze outfitów.

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
- Image: id, ownerId, originalUrl, processedUrl, status, tags[], createdAt.

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