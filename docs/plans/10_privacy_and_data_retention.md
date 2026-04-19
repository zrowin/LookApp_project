# Prywatność i retention danych (RODO/GDPR)

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
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

## Cel
Zdefiniować politykę przechowywania zdjęć i mechanizmy usuwania na żądanie.

## Kryteria akceptacji
- Użytkownik może usunąć wszystkie swoje dane i zdjęcia.
- Polityka prywatności dostępna w aplikacji.

## Kroki implementacji
- Endpoint `DELETE /api/users/:id/data` wykonujący bezpieczne usunięcie zasobów.
- Mechanizm soft-delete + ostateczne czyszczenie po 30 dniach.
- Logging zgód (consent) na przechowywanie zdjęć.

## Szacowany czas
- 2 dni.

## Notatki
- Sprawdzić lokalne wymogi RODO i opcjonalne anonimizacje.