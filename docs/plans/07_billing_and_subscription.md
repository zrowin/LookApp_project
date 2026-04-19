# Billing i subskrypcje (Stripe)

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
	- [08_export_to_social.md](08_export_to_social.md)
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

## Cel
Uruchomić prosty model freemium z integracją Stripe dla płatnych planów.

## Kryteria akceptacji
- Użytkownik może wykupić subskrypcję przez Stripe i widzieć status konta.
- Webhooki Stripe poprawnie obsługują zdarzenia (invoice.paid, customer.subscription.deleted).

## Kroki implementacji
- Backend: integracja Stripe (checkout session, webhooks), endpoint `GET /api/subscription`.
- Frontend: page z planami, checkout flow, panel konta z info o subskrypcji.

## Bezpieczeństwo
- Przechowywanie tylko niezbędnych danych, korzystanie z webhook secret.

## Testy
- Test sandbox Stripe + symulacja webhooków.

## Szacowany czas
- 2–3 dni.