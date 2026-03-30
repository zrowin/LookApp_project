# Tech Stack Audit — LookApp

Krótka, praktyczna rekomendacja stacku dla LookApp oparta na `WF_Tech_Stack_Audit.md` i opisie projektu. Cel: MVP uruchomiony szybko, z przewidywalnymi kosztami i możliwą późniejszą ewolucją.

## Podsumowanie rekomendacji
- Podejście: monolith web-first (PWA) + łatwa ścieżka do mobilnej hybrydy.
- Zalecany Starter Stack (Solo‑Dev, MVP):
  - Frontend: `Next.js` + `TypeScript` + `Tailwind` (deploy: Vercel)
  - Backend: Next.js API Routes (serverless na Vercel) lub minimalny Node/NestJS jeśli potrzeba więcej kontroli
  - Baza: `Supabase` (Postgres + Auth + Storage)
  - Pliki/obrazy: Supabase Storage lub `Cloudinary` (optymalizacja + transformacje)
  - Background removal / CV: użycie managed API (remove.bg / Cloudinary AI / Replicate) na początek
  - Search/similarity: vector embeddings + `pgvector` (Supabase) lub `Meilisearch` jeśli potrzeba szybkich wyszukiwań
  - Płatności: `Stripe`
  - Email/notifications: `Resend` / `SendGrid`
  - Monitoring: `Sentry`
- Oczekiwany koszt MVP: $0–50/miesiąc (pierwsze tygodnie), rosnący z użyciem AI i storage.

## Ocena wg 4 kryteriów (TTI / OB / CS / DF)
- Next.js + Vercel: 9 / 9 / 8 / 9
- Supabase: 9 / 9 / 8 / 8
- Managed CV APIs: 8 / 9 / 6 / 8 (koszty per-call)
- Cloudinary/S3: 8 / 7 / 6 / 8

## Architektura rekomendowana (szczegóły)
- Monolith Next.js z API Routes: szybkość implementacji, prosty deployment na Vercel.
- Supabase jako główna warstwa danych: auth, Postgres + pgvector, storage do przechowywania obrazów (można zacząć na Supabase Storage; jeśli potrzeba transformacji/CDN -> Cloudinary).
- Background removal i embeddingi: na starcie używać zewnętrznych API by uniknąć kosztu trenowania i infra; cache'ować wyniki i thumbnailować obrazy.
- Asynchroniczne przetwarzanie obrazów: webhooky / background jobs (np. prosty queue) żeby nie blokować requestów i kontrolować koszt.

## Kluczowe trade-offs / ryzyka
- Koszty AI per-image — może szybko rosnąć z użytkownikami i uploadami. Mitigacja: limit darmowy (np. 30 zdjęć), przetwarzanie on-demand, batch processing poza godzinami.
- Prywatność: zdjęcia garderoby = wrażliwe. Domyślnie prywatne, opcja opt-in dla public share; szyfrowanie at-rest i możliwość trwałego usunięcia.
- Vendor lock-in (Supabase/Cloudinary): mieć plan eksportu danych (backup DB + flat export obrazów).
- Latency/UX: background removal asynchroniczny + UX pokazujący progres.

## Migration path (MVP → scale)
1. MVP (0–3 mies.): Next.js + Supabase + managed CV. Focus: upload, background removal (API), drag&drop canvas.
2. Growth (3–9 mies.): przenieść ciężkie przetwarzanie do dedykowanych workerów, wprowadzić pgvector optymalizacje, CDN dla assetów, rate‑limiting.
3. Scale (9+ mies.): wyodrębnienie microservice CV lub edge functions, caching (Redis), koszt‑optimizing modeli (self‑hosted inference jeśli wolumen uzasadnia).

## Red Flags (do natychmiastowego monitoringu)
- Brak limitów na upload → wysoki koszt storage/AI
- Brak backupów bazy i obrazów
- Przetwarzanie synchroniczne obrazów (blokuje UX i skaluje koszty)
- Brak polityki prywatności i narzędzia do usuwania danych (RODO)

## Checklist (przed deployem MVP)
- [ ] Onboarding techniczny: Next.js + Supabase working
- [ ] Upload + Storage + prosty thumbnail pipeline
- [ ] Background removal via managed API + cache wyników
- [ ] pgvector / similarity pipeline prototyp
- [ ] Rate limits, pricing plan (freemium) i quota enforcement
- [ ] Monitoring (Sentry) + backup DB
- [ ] Demo flow < 2 min time-to-first-outfit

## Rekomendowane następne kroki
1. Zbudować prototyp upload → background-removal (concierge/manual dla pierwszych 10 users jeśli chcesz obniżyć koszty).
2. Ustawić quotas (darmowe limity) i metryki kosztów per image.
3. Przetestować performance pgvector na sample dataset (similarity).
4. Przygotować politykę prywatności i mechanizm trwałego usuwania zdjęć.

Pytanie kluczowe: który koszt chcesz kontrolować najpierw — storage obrazu czy koszt przetwarzania AI (per-call)?
