

Wersja: 1.0
Data: 2026-04-19

1. Architektura wysokiego poziomu (High-Level Architecture)

Główne komponenty:
- Frontend web: Next.js 14 + TypeScript (App Router) — SSR/ISR, routing, SEO na landingach.
- Frontend mobile: React Native (Expo) — szybkie prototypowanie, współdzielenie logiki z webem.
- Backend: Supabase (Postgres + Auth + Storage) jako główny BaaS + serverless functions (Vercel/Cloud Functions) do obsługi dłuższych zadań i integracji zewnętrznych (background removal, Stripe webhooks).
- Przetwarzanie obrazów: dedykowane worker'y (serverless / container) wywołujące zewnętrzne API (remove.bg / Replicate) lub uruchamiające modele własne.
- CDN / Storage: Supabase Storage lub AWS S3 + CDN (CloudFront / Supabase CDN) dla obrazów i exportów.
- Monitoring & Logging: Sentry + centralny log (Cloud Logging / Logflare).

Komunikacja:
- Frontend ↔ Backend: HTTPS REST JSON (Next.js API Routes lub Supabase Edge Functions). Autoryzacja JWT (Supabase).
- Backend ↔ External CV/AI: HTTPS (async jobs via queue).
- Storage: pliki zapisywane w Storage + odsyłane jako signed URLs do klienta.

Uzasadnienie: Supabase daje szybkie MVP (Auth, Postgres, Storage) + łatwe skalowanie; dodatkowe serverless functions oddzielają ciężkie zadania (BG removal, webhooki, sync z Stripe).

2. Frontend

Technologia:
- Web: Next.js 14 + React 18 + TypeScript + Tailwind CSS (istniejący stack)
- Mobile: React Native (Expo) + TypeScript — możliwość reuse logiki i API klienta

Struktura aplikacji (web):
- `src/app/` (Next.js App Router)
- `src/components/ui/` (Button, Card, Input, Toast)
- `src/components/features/` (upload, wardrobe, outfits, canvas)
- `src/lib/` (supabase client, api clients, stripe helper)
- `src/hooks/` (useUser, useUpload, useOutfits)
- `src/state/` (Zustand store for UI state)

Zarządzanie stanem:
- Server state: TanStack Query (React Query) — cache, refetch, optimistic updates.
- Local UI state: Zustand (modal state, canvas editing state).

Główne widoki (zgodnie z dokumentacją):
- Landing / Auth (register/login)
- Dashboard
- Upload
- Wardrobe (grid)
- Outfit Builder (canvas)
- Outfits (lista) / Outfit Detail
- Settings / Billing

Komunikacja z backendem:
- REST over HTTPS (JSON). Preferowane: Next.js API / Supabase endpoints for simple CRUD; Edge Functions for heavier integrations.
- Autoryzacja: każdy request do chronionych endpointów wysyła Authorization: Bearer <access_token> (Supabase JWT). TanStack Query dba o odświeżanie tokenów.

3. Backend

Technologie:
- Supabase (Postgres + Auth + Storage + Edge Functions)
- Dla przetwarzania obrazów i długich zadań: serverless functions (Vercel / AWS Lambda / Google Cloud Functions) lub mały kontener (K8s/Cloud Run) uruchamiający workers.
- Opcjonalnie: NestJS (Node.js + TypeScript) jeśli większa część logiki ma być poza Supabase.

Architektura:
- MVP: główny monolityczny BaaS (Supabase) + serverless workers. Uzasadnienie: szybkie dostarczenie MVP, mniejsze koszty operacyjne.
- Długoterminowo: rozdzielenie krytycznych modułów jako mikroserwisy (image-processing service, recommendations service, billing webhook handler).

Struktura kodu (jeśli NestJS / Node.js użyte):
- controllers/ (HTTP handlers)
- services/ (logika biznesowa)
- repos/ (dostęp do DB, Prisma/Drizzle)
- workers/ (image processing, queue processors)
- integrations/ (stripe, replicate, remove.bg)

Logika biznesowa:
- Upload flow orchestration (store original -> enqueue background removal -> update DB with processed_url/status)
- Outfit composition (persist ordered list of item instances with transform meta)
- Quotas & billing enforcement (plan limits)

4. API (ważne)

Wybór: RESTful JSON endpoints (proste, czytelne). Krytyczne endpointy (przykłady):

- POST /api/upload
  - opis: upload obrazu (multipart/form-data) lub przyjęcie już uploadowanego pliku (signed URL)
  - request: multipart/form-data { file }
  - response 201:
    {
      "id": "uuid",
      "owner_id": "uuid",
      "original_url": "https://...",
      "status": "processing"
    }

- GET /api/images
  - opis: lista obrazów użytkownika (paginacja)
  - params: ?page=1&limit=24&tag=shirt
  - response 200: { items: [{id, thumbnail_url, status, tags}], meta: {page, total} }

- GET /api/images/:id
  - opis: metadane obrazu
  - response 200: { id, original_url, processed_url, thumbnail_url, status, tags }

- PUT /api/images/:id
  - opis: aktualizacja metadanych (tags, category)
  - body: { tags: ["casual","blue"], category: "shirt" }
  - response 200: zaktualizowany obiekt

- DELETE /api/images/:id
  - opis: usuwa obraz i pliki z storage (soft/hard delete zależnie od polityki)
  - response 204

- POST /api/outfits
  - opis: tworzy outfit
  - body: { title, description, items: [{image_id, x, y, scale, rotation, z_index}], is_public }
  - response 201: { outfitId }

- GET /api/outfits/:id
  - opis: pobiera outfit z pozycjami
  - response: { id, owner_id, title, items: [...] }

- GET /api/recommendations?imageId=...
  - opis: rekomendacje (rule-based + embeddings)
  - response: [{image_id, score, reason}]

- POST /api/subscription/checkout
  - opis: tworzy session Stripe
  - body: { plan }
  - response: { url: "https://checkout.stripe.com/..." }

Uwierzytelnianie: middleware weryfikuje JWT (Supabase). Wrażliwe operacje dodatkowo sprawdzają czy `owner_id === jwt.sub`.

5. Baza danych

Typ: relacyjna (PostgreSQL) — Supabase Postgres

Główne tabele / schematy (skrót):
- `users` (zawarte w Supabase `auth.users`)
- `profiles` (id, username, avatar_url, onboarding_completed, preferences JSONB)
- `images` (id, owner_id, original_url, processed_url, thumbnail_url, status, width, height, file_size, created_at)
- `tags` (id, name, category)
- `image_tags` (image_id, tag_id)
- `outfits` (id, owner_id, title, description, thumbnail_url, is_public, created_at)
- `outfit_items` (id, outfit_id, image_id, x, y, scale, rotation, z_index)
- `subscriptions` (user_id, stripe_customer_id, plan, status, current_period_end)
- `follow_relations` (follower_id, followee_id, created_at)
- `image_embeddings` (image_id, embedding vector) — pgvector

Relacje: standardowe relacje FK; obrazy należą do użytkownika, outfit_items łączą outfit z obrazem.

Przykładowy model `images` (JSON):
{
  "id": "...",
  "owner_id": "...",
  "original_url": "https://...",
  "processed_url": "https://...",
  "thumbnail_url": "https://...",
  "status": "completed",
  "width": 1024,
  "height": 1024
}

6. Autoryzacja i bezpieczeństwo

- Logowanie / tokeny: Supabase Auth (JWT). Access token ważny krótko; refresh token używany do odnowienia.
- Ochrona endpointów: middleware w Next.js API / Edge Function weryfikuje JWT i role.
- Role: `user`, `admin` (opcjonalnie). RBAC realizowane przez polityki RLS w Postgres (Supabase Row Level Security) dla tabel takich jak `images`, `outfits`.
- Signed URLs: publiczne lub czasowe linki do przetworzonych obrazów; dostęp prywatny domyślny.
- Rate limiting: per-IP i per-user throttling (edge / CDN rules) dla endpointów upload i recommendations.
- Data protection: backup DB, retention policy, mechanizm usuwania danych (GDPR).

7. Przechowywanie zdjęć

- Gdzie: Supabase Storage (zalecane dla spójności) lub AWS S3 z CDN.
- Jak: plik zapisywany w storage, DB przechowuje `original_url` i `processed_url`/`thumbnail_url`.
- Dostęp: signed URLs przy pobieraniu; pre-signed upload URL dla bezpośredniego uploadu z klienta.

8. Przepływ danych (Data Flow) — przykłady

Dodanie ubrania (upload)
1. Klient wysyła plik do `/api/upload` lub pobiera signed upload URL i uploaduje bezpośrednio do Storage.
2. Backend (API) tworzy wpis w `images` z status `processing` i enqueue job do kolejki.
3. Worker pobiera plik ze Storage, wywołuje remove.bg/Replicate do background removal.
4. Po otrzymaniu przetworzonego pliku worker zapisuje `processed_url`, generuje thumbnail, aktualizuje status na `completed`.
5. Frontend odświeża listę obrazów (notifications / websocket / realtime) i umożliwia tagowanie.

Przeglądanie inspiracji (feed)
1. Frontend żąda `/api/inspirations?page=1`.
2. Backend agreguje publiczne outfit'y, rankuje (popularity, follow relations) i zwraca paginowany wynik.

9. Diagram (ASCII)

Client (Next.js / RN)
  ↓ HTTPS
API Layer (Next.js API / Edge Functions)
  ↓ DB queries / Storage API
Supabase Postgres (pgvector) ----- Storage (Supabase/AWS)
       ↓
   Workers (image-processing) -> External CV APIs (remove.bg / Replicate)
       ↓
     CDN (serving processed images)

10. Skalowalność i rozwój

Strategia skalowania:
- Statyczne zasoby i exporty: CDN (cache) — najtańsza i najszybsza skala.
- API: skalowalne serverless (Vercel) lub autoscaling containers (Cloud Run). Utrzymywać bezstanowe API.
- Image processing: workers skalowane horyzontalnie; użyć kolejki (Redis Streams / Cloud Tasks) do kontrolowania przepustowości i retry.
- DB: pionowe skalowanie + read replicas; pgvector indexing (IVF) dla similarity search.

Potencjalne bottlenecks:
- Przetwarzanie obrazów — CPU / GPU bound; koszt i throughput.
- Przechowywanie i transfer obrazów — koszty CDN/Storage.
- Search / recommendations przy dużej liczbie embeddingów — wymaga indeksowania i ewentualnego dedykowanego silnika (Milvus, Pinecone).

Rekomendacje techniczne:
- Użyć Supabase jako core (Auth, Postgres, Storage) dla MVP.
- Wdrażać image-processing jako oddzielny komponent serverless z autoskalowaniem i ograniczeniem concurreny.
- Trzymać heavy ML ops (jeśli rośnie) poza Supabase — dedykowany serwis/k8s z GPU.
- Dodać Redis dla caching i rate-limiting; ewentualnie użyć managed Redis.

11. Braki / Założenia

- Założenia:
  - Supabase będzie użyty jako główne BaaS (zgodnie z README).
  - Background removal realizowany przez zewnętrzne API lub własny model (asynchronicznie).
  - Płatności: Stripe.

- Braki (należy doprecyzować):
  - SLA dla zewnętrznych usług (remove.bg/Replicate) i fallback strategy.
  - Dokładne limity planów subskrypcyjnych (quota per plan).
  - Polityka retencji i backupu obrazów (wersje, soft delete).
  - Wymagania mobilne offline sync (jeśli wymagane).

