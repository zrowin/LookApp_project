# Zapis i zarządzanie outfitami

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
	- [01_upload_and_bg_removal.md](01_upload_and_bg_removal.md)
	- [02_auto_tagging.md](02_auto_tagging.md)
	- [03_outfit_builder.md](03_outfit_builder.md)
	- [05_recommendation_engine.md](05_recommendation_engine.md)
	- [06_auth_registration_onboarding.md](06_auth_registration_onboarding.md)
	- [07_billing_and_subscription.md](07_billing_and_subscription.md)
	- [08_export_to_social.md](08_export_to_social.md)
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

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