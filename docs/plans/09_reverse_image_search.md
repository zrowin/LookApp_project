# Wyszukiwanie po obrazie / podobne przedmioty

## Cel
Pozwoli użytkownikowi znaleźć podobne elementy w jego garderobie lub w katalogu affiliate na podstawie obrazu.

## Kryteria akceptacji
- Dla danego obrazu system zwraca listę podobnych itemów (lokalnie lub z katalogu partnera).

## Kroki implementacji
- Ekstrakcja embeddingu obrazu → indeksowanie w vector DB → zapytanie nearest-neighbors.
- Integracja katalogów zewnętrznych (opcjonalnie) przez mapping tagów i obrazów.

## API
- `GET /api/search/similar?imageId=` — lista podobnych.

## Szacowany czas
- 3–6 dni (zależnie od integracji katalogów).