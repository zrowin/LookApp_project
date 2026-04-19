# Wyszukiwanie po obrazie / podobne przedmioty

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
	- [01_upload_and_bg_removal.md](01_upload_and_bg_removal.md)
	- [02_auto_tagging.md](02_auto_tagging.md)
	- [03_outfit_builder.md](03_outfit_builder.md)
	- [04_save_and_manage_outfits.md](04_save_and_manage_outfits.md)
	- [05_recommendation_engine.md](05_recommendation_engine.md)
	- [06_auth_registration_onboarding.md](06_auth_registration_onboarding.md)
	- [07_billing_and_subscription.md](07_billing_and_subscription.md)
	- [08_export_to_social.md](08_export_to_social.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

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