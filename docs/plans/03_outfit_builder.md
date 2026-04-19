# Prosty canvas / Drag&Drop Outfit Builder

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [00_nextjs_bootstrap.md](00_nextjs_bootstrap.md)
	- [01_upload_and_bg_removal.md](01_upload_and_bg_removal.md)
	- [02_auto_tagging.md](02_auto_tagging.md)
	- [04_save_and_manage_outfits.md](04_save_and_manage_outfits.md)
	- [05_recommendation_engine.md](05_recommendation_engine.md)
	- [06_auth_registration_onboarding.md](06_auth_registration_onboarding.md)
	- [07_billing_and_subscription.md](07_billing_and_subscription.md)
	- [08_export_to_social.md](08_export_to_social.md)
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

## Cel
Pozwoli użytkownikowi skomponować outfit przeciągając swoje elementy na canvas i zapisać gotowe stylizacje.

## Kryteria akceptacji
- Użytkownik może przeciągnąć elementy z biblioteki do canvasu, zmieniać rozmiar/pozycję i zapisać outfit.
- Time-to-first-outfit < 2 min (UX prosty i responsywny).

## Kroki implementacji
- Frontend: canvas z warstwami (HTML5 Canvas / CSS + draggable), panel biblioteki zdjęć, controls (scale/rotate/delete).
- Backend: zapis stanu outfit (lista elementów z pozycjami i transformacjami) w `POST /api/outfits`.

## API
- `POST /api/outfits` — zapisuje outfit: ownerId, items[{imageId, x,y,scale,rotation}], title, tags.
- `GET /api/outfits/:id` — pobiera outfit do edycji/podglądu.

## Dane
- Outfit: id, ownerId, items[], thumbnailUrl, createdAt, public/private.

## Testy
- Zapisywanie/odtwarzanie pozycji elementów, responsywność na mobile.

## Szacowany czas
- MVP (podstawowe drag&drop + zapis): 3–5 dni.