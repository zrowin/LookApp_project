# Auto-tagging (typ, kolor, cechy)

## Cel
Automatyczne rozpoznanie typu ubrania, kolorów i podstawowych cech aby umożliwić wyszukiwanie i dopasowania.

## Kryteria akceptacji
- System przypisuje typ (np. koszula, spodnie), kolor główny i 1–2 cechy (np. wzór) z akceptowalną dokładnością (>70% dla MVP).

## Kroki implementacji
- Przetworzenie obrazu → wywołanie modelu klasifikacji / ekstrakcji kolorów.
- Zapis tagów w metadanych obrazu.
- Dashboard/edytor umożliwiający korektę tagów przez użytkownika.

## API
- `POST /api/images/:id/tags` — uruchamia tagowanie lub aktualizuje ręcznie.
- `GET /api/tags/suggestions?imageId=` — zwraca propozycje tagów.

## Dane
- Tag: name, confidence, source (auto/manual).

## 3rd-party
- Można użyć usług CV (Custom Vision, Google Vision) lub open-source modeli.

## Testy
- Porównanie wyników modelu z etykietami ręcznymi (zestaw testowy 100 zdjęć).

## Szacowany czas
- Integracja z zewnętrznym API + UI korekty: 2–4 dni.