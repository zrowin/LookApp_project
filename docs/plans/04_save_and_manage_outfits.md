# Zapis i zarządzanie outfitami

## Cel
Umożliwić zapisywanie, edycję, usuwanie i przeglądanie wcześniej stworzonych outfitów.

## Kryteria akceptacji
- Użytkownik może zapisać outfit i zobaczyć listę swoich outfitów.
- Możliwość oznaczenia outfitów jako prywatne/publiczne oraz eksportowania miniaturki.

## Kroki implementacji
- Endpointy CRUD (`/api/outfits`).
- UI: lista outfitów, strona szczegółów, przycisk eksportu/share.

## API
- `GET /api/outfits?ownerId=` — lista.
- `PUT /api/outfits/:id` — edycja.
- `DELETE /api/outfits/:id` — usuwanie.

## Dane
- Patrz `Outfit` w pliku `03_outfit_builder.md`.

## Testy
- CRUD oraz uprawnienia dostępu (owner only).

## Szacowany czas
- 1–2 dni.