# Eksport do social / generowanie grafik

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
	- [09_reverse_image_search.md](09_reverse_image_search.md)
	- [10_privacy_and_data_retention.md](10_privacy_and_data_retention.md)
	- [11_analytics_and_metrics.md](11_analytics_and_metrics.md)

## Cel
Umożliwić użytkownikowi eksport estetycznej grafiki outfitów (rozmiary dla Instagram/Stories) i szybkie dzielenie się.

## Kryteria akceptacji
- Możliwość wygenerowania grafiki w formatach: square (1080x1080) i story (1080x1920).
- Przyciski share (kopiuj link / share intent mobile).

## Kroki implementacji
- Backend: endpoint generujący obraz na podstawie zapisanych itemów/outfit (headless browser lub server-side rendering canvas).
- Frontend: UI exportu, opcje formatu.

## 3rd-party
- Biblioteki: Puppeteer/Playwright (render HTML→PNG) lub node-canvas.

## Szacowany czas
- 2–4 dni.