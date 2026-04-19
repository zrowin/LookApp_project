# Analityka i metryki (KPI)

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
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)

## Cel
Zaimplementować podstawowe metryki: time-to-first-outfit, retention D1/D7/D30, conversion, uploads per user.

## Kryteria akceptacji
- Eventy kluczowe emitowane (upload, first-outfit, save-outfit, subscribe).
- Dashboard z podstawowymi wykresami (może być w Google Analytics / Mixpanel).

## Kroki implementacji
- Zdefiniować schemat eventów i taxonomy (naming).
- Backend/frontend: wysyłanie eventów do analytics (server-side + client-side).
- Ustawić dashboardy w chosen tool.

## 3rd-party
- Mixpanel, Amplitude, Google Analytics 4.

## Szacowany czas
- 1–2 dni (podstawowa implementacja).