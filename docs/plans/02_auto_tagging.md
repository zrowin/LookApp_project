# Auto-tagging (typ, kolor, cechy)

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
	- [01_upload_and_bg_removal.md](01_upload_and_bg_removal.md)
	- [03_outfit_builder.md](03_outfit_builder.md)
	- [04_save_and_manage_outfits.md](04_save_and_manage_outfits.md)
	- [05_recommendation_engine.md](05_recommendation_engine.md)
	- [06_auth_registration_onboarding.md](06_auth_registration_onboarding.md)
	- [07_billing_and_subscription.md](07_billing_and_subscription.md)
	- [08_export_to_social.md](08_export_to_social.md)
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

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