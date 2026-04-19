# Rejestracja, logowanie i onboarding

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
	- [01_upload_and_bg_removal.md](01_upload_and_bg_removal.md)
	- [02_auto_tagging.md](02_auto_tagging.md)
	- [03_outfit_builder.md](03_outfit_builder.md)
	- [04_save_and_manage_outfits.md](04_save_and_manage_outfits.md)
	- [05_recommendation_engine.md](05_recommendation_engine.md)
	- [07_billing_and_subscription.md](07_billing_and_subscription.md)
	- [08_export_to_social.md](08_export_to_social.md)
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

## Cel
Zapewnić prostą rejestrację (email + social opcjonalnie) oraz onboarding "dodaj 3 rzeczy → stwórz pierwszy outfit".

## Kryteria akceptacji
- Rejestracja email + reset hasła działa.
- Onboarding prowadzi użytkownika przez dodanie min. 3 elementów i stworzenie pierwszego outfit.

## Kroki implementacji
- Auth: JWT lub sesje; endpointy `/api/auth/register`, `/api/auth/login`, `/api/auth/forgot`.
- Frontend: flow onboarding, progress tracker, CTA do uploadu.

## Bezpieczeństwo
- Hasła haszowane (bcrypt), limity prób logowania, email verification.

## Testy
- E2E: rejestracja → upload 3 zdjęć → zapis outfit.

## Szacowany czas
- 3 dni.