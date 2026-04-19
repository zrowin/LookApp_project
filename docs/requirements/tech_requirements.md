# LookApp — Wymagania Techniczne

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
  - [tech_requirements.md](tech_requirements.md)

**Wersja:** 1.0  
**Data:** 2026-03-26  
**Autor:** Architektura Techniczna  
**Tech Stack:** React.js, Tailwind CSS, Next.js, TypeScript, Supabase (PostgreSQL)

---

## 1. Podsumowanie Projektu

LookApp to aplikacja web + mobile (SaaS) do zarządzania garderobą i tworzenia outfitów. Umożliwia użytkownikom:
- Wgrywanie zdjęć ubrań z automatycznym usuwaniem tła
- Organizowanie wirtualnej garderoby
- Tworzenie stylizacji z realnych zdjęć
- Otrzymywanie wizualnych rekomendacji i inspiracji zakupowych

### 1.1 Cele Techniczne MVP

- **Time-to-first-outfit:** < 2 minuty
- **Czas przetwarzania obrazu (background removal):** < 30 sekund
- **Dostępność:** SLA 99.9%
- **Wydajność:** 95% zapytań API < 200ms

---

## 2. Architektura Systemu

### 2.1 Stack Technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| **Frontend** | React 18 + TypeScript | Typowanie, component reusability |
| **Styling** | Tailwind CSS | Szybki development, mały bundle |
| **Framework** | Next.js 14 (App Router) | SSR/SSG, API Routes, Vercel deployment |
| **Baza Danych** | Supabase (PostgreSQL) | Auth, DB, Storage, Realtime |
| **ORM** | Prisma lub Drizzle | Type-safe queries |
| **Obiekty** | Supabase Storage + Cloudinary | CDN, transformacje |
| **Płatności** | Stripe | Subskrypcje, freemium |
| **AI/CV** | Replicate / remove.bg API | Background removal, embeddings |
| **Wektor DB** | pgvector (Supabase) | Similarity search |
| **Monitoring** | Sentry | Error tracking |
| **Analityka** | Google Analytics 4 / Mixpanel | KPI tracking |

### 2.2 Architektura Wysokopoziomowa

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ Upload  │  │ Canvas  │  │ Wardrobe│  │ Profile │       │
│  │  Page   │  │  Builder │  │  Page   │  │  Page   │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       └────────────┴────────────┴─────────────┘           │
│                           │                                 │
│                    ┌──────▼──────┐                         │
│                    │  Next.js    │                         │
│                    │ API Routes  │                         │
│                    └──────┬──────┘                         │
└───────────────────────────┼─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                     BACKEND (Supabase)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth  │  │ Postgres │  │ Storage  │  │ Realtime │   │
│  └──────────┘  └────┬─────┘  └──────────┘  └──────────┘   │
│                    │                                        │
│  ┌─────────────────▼────────────────────────────────┐       │
│  │              pgvector (Embeddings)               │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    EXTERNAL SERVICES                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Stripe    │  │ Replicate  │  │  remove.bg │            │
│  │  (billing) │  │  (AI/CV)   │  │   (BG)     │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Struktura Projektu Next.js

```
lookapp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/       # Protected routes
│   │   │   ├── wardrobe/
│   │   │   ├── outfit-builder/
│   │   │   ├── outfits/
│   │   │   └── settings/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   ├── upload/
│   │   │   ├── images/
│   │   │   ├── outfits/
│   │   │   ├── recommendations/
│   │   │   └── webhooks/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Landing/Home
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── features/          # Feature-specific
│   │   │   ├── upload/
│   │   │   ├── canvas/
│   │   │   ├── wardrobe/
│   │   │   └── outfits/
│   │   └── layouts/
│   ├── lib/
│   │   ├── supabase/          # Supabase client
│   │   ├── stripe/             # Stripe utilities
│   │   └── utils/
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── constants/
├── public/
├── supabase/                   # Supabase migrations
├── prisma/                     # Prisma schema (optional)
└── docs/
```

---

## 3. Wymagania Funkcjonalne

### 3.1 Moduł: Upload i Background Removal

**Opis:** Umożliwia użytkownikowi dodanie zdjęcia ubrania i automatyczne usunięcie tła.

**Kryteria akceptacji:**
- Upload z urządzenia mobilnego/desktop (drag & drop lub file picker)
- Obsługa JPG/PNG, max rozmiar 10MB
- Background removal < 30s (MVP: ręczna opcja OK)
- Progress indicator podczas przetwarzania

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/upload` | Upload obrazu, inicjuje background removal |
| GET | `/api/images/:id` | Pobiera metadane obrazu |
| GET | `/api/images` | Lista obrazów użytkownika |
| DELETE | `/api/images/:id` | Usuwa obraz |

**Schemat danych (Supabase/PostgreSQL):**

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL,
  processed_url TEXT,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Integracje zewnętrzne:**
- **remove.bg API** — podstawowy provider do background removal
- **Cloudinary** — opcjonalnie jako fallback / transformacje
- **Replicate** — alternatywa dla cięższych modeli

### 3.2 Moduł: Auto-tagging

**Opis:** Automatyczne rozpoznanie typu ubrania, kolorów i cech.

**Kryteria akceptacji:**
- Przypisanie typu (np. koszula, spodnie, buty)
- Kolor główny (primary color extraction)
- 1-2 cechy (np. wzór, długość)
- Dokładność > 70% (MVP)
- Interfejs do ręcznej korekty tagów

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/images/:id/tags` | Uruchamia auto-tagging lub aktualizuje ręcznie |
| GET | `/api/tags/suggestions?imageId=` | Pobiera propozycje tagów |

**Schemat danych:**

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('type', 'color', 'pattern', 'style', 'occasion')),
  confidence REAL,
  source TEXT DEFAULT 'auto' CHECK (source IN ('auto', 'manual')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE image_tags (
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (image_id, tag_id)
);
```

### 3.3 Moduł: Outfit Builder (Canvas)

**Opis:** Drag & drop canvas do tworzenia outfitów.

**Kryteria akceptacji:**
- Przeciąganie elementów z biblioteki do canvas
- Transformacje: scale, rotate, position
- Zapis stanu outfit
- Time-to-first-outfit < 2 min

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/outfits` | Tworzy nowy outfit |
| GET | `/api/outfits/:id` | Pobiera outfit do edycji |
| PUT | `/api/outfits/:id` | Aktualizuje outfit |
| DELETE | `/api/outfits/:id` | Usuwa outfit |
| GET | `/api/outfits?ownerId=` | Lista outfitów |

**Schemat danych:**

```sql
CREATE TABLE outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE outfit_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outfit_id UUID REFERENCES outfits(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  position_x REAL NOT NULL DEFAULT 0,
  position_y REAL NOT NULL DEFAULT 0,
  scale REAL NOT NULL DEFAULT 1,
  rotation REAL NOT NULL DEFAULT 0,
  z_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.4 Moduł: Zarządzanie Outfitami

**Opis:** CRUD operacje na outfitach, zarządzanie widocznością.

**Kryteria akceptacji:**
- Lista własnych outfitów z filtrami
- Edycja tytułów, opisów
- Toggle: public/private
- Eksport miniaturek

### 3.5 Moduł: Silnik Rekomendacji

**Opis:** Suggestie outfitów / dopasowań elementów.

**Kryteria akceptacji:**
- Min. 3 propozycje dla przesłanego elementu
- Oparte na: rule-based + embedding similarity

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/recommendations?imageId=` | Lista rekomendacji |

**Schemat danych (embeddings):**

```sql
CREATE TABLE image_embeddings (
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  embedding vector(768), -- or vector(1536) depending on model
  model TEXT NOT NULL DEFAULT 'clip',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (image_id)
);

-- Index for similarity search
CREATE INDEX image_embeddings_cosine_idx ON image_embeddings 
USING ivfflat (embedding vector_cosine_ops);
```

### 3.6 Moduł: Autentykacja i Onboarding

**Opis:** Rejestracja, logowanie, onboarding.

**Kryteria akceptacji:**
- Rejestracja email + hasło
- Logowanie
- Reset hasła przez email
- Onboarding: dodaj 3 rzeczy → stwórz pierwszy outfit
- OAuth (Google) — opcjonalnie

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/auth/register` | Rejestracja |
| POST | `/api/auth/login` | Logowanie |
| POST | `/api/auth/logout` | Wylogowanie |
| POST | `/api/auth/forgot-password` | Reset hasła |
| GET | `/api/auth/me` | Aktualny użytkownik |

**Schemat danych (użytkownicy):**

```sql
-- Używamy auth.users z Supabase
-- Dodatkowy profil rozszerzony:

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  style_preferences JSONB DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.7 Moduł: Billing i Subskrypcje

**Opis:** Freemium model z Stripe.

**Kryteria akceptacji:**
- Plany: Free, Premium (np. $4.99/mies)
- Checkout przez Stripe
- Webhooki: invoice.paid, customer.subscription.deleted

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/subscription` | Status subskrypcji |
| POST | `/api/subscription/checkout` | Tworzy Stripe checkout session |
| POST | `/api/webhooks/stripe` | Obsługa webhooków |

**Schemat danych:**

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  plan TEXT CHECK (plan IN ('free', 'premium')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Limity dla planów
CREATE TABLE plan_limits (
  plan TEXT PRIMARY KEY,
  max_images INTEGER DEFAULT 50,
  max_outfits INTEGER DEFAULT 20,
  background_removal_monthly INTEGER DEFAULT 10,
  export_formats TEXT[] DEFAULT ARRAY['square']
);
```

### 3.8 Moduł: Eksport do Social Media

**Opis:** Generowanie grafik outfitów do Instagrama/Stories.

**Kryteria akceptacji:**
- Formaty: square (1080x1080), story (1080x1920)
- Share buttons (copy link, mobile share intent)

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/api/export` | Generuje obraz outfitu |

### 3.9 Moduł: Wyszukiwanie Obrazem (Reverse Image Search)

**Opis:** Znajdowanie podobnych elementów w garderobie.

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/search/similar?imageId=` | Lista podobnych |
| POST | `/api/search` | Upload obrazu do wyszukiwania |

### 3.10 Moduł: Prywatność i Retention (RODO)

**Opis:** Zarządzanie danymi użytkownika.

**Kryteria akceptacji:**
- Usunięcie wszystkich danych na żądanie
- Polityka prywatności w aplikacji
- Soft delete + hard delete po 30 dniach

**API Endpoints:**

| Metoda | Endpoint | Opis |
|--------|----------|------|
| DELETE | `/api/users/:id/data` | Usuwa wszystkie dane |
| GET | `/api/privacy` | Polityka prywatności |

```sql
-- Soft delete pattern
ALTER TABLE images ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE outfits ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN deleted_at TIMESTAMPTZ;
```

### 3.11 Moduł: Analityka i Metryki

**Opis:** KPI i śledzenie zachowań.

**Metryki:**
- Time-to-first-outfit
- Retention D1/D7/D30
- Conversion rate
- Uploads per user

**Implementacja:**
- Eventy wysyłane do GA4 / Mixpanel
- Schema eventów walidowana

```typescript
// Event schema example
interface AnalyticsEvent {
  event: string;
  userId: string;
  timestamp: string;
  properties: Record<string, any>;
}

// Key events:
- 'upload_started'
- 'upload_completed'
- 'background_removed'
- 'first_outfit_created'
- 'outfit_saved'
- 'subscription_started'
- 'export_created'
```

---

## 4. Wymagania Niefunkcjonalne

### 4.1 Wydajność

| Metryka | Wartość docelowa |
|---------|------------------|
| TTFB (Time to First Byte) | < 200ms |
| LCP (Largest Contentful Paint) | < 2.5s |
| API response time (p95) | < 200ms |
| Background removal | < 30s |

### 4.2 Skalowalność

- **Frontend:** Vercel automatic scaling
- **Backend:** Supabase auto-scaling
- **Storage:** Supabase Storage + CDN
- **Wektory:** pgvector z indexem IVFFlat

### 4.3 Bezpieczeństwo

- **HTTPS:** Wszędzie (TLS 1.2+)
- **Auth:** JWT przez Supabase Auth
- **Rate limiting:** 100 req/min (anonimowi), 1000 req/min (zalogowani)
- **Upload:** 
  - Walidacja MIME types (image/jpeg, image/png, image/webp)
  - Max rozmiar: 10MB
  - Skanowanie plików (opcjonalnie)
- **XSS/CSRF:** Content Security Policy, SameSite cookies
- **Prywatność:** Dane domyślnie prywatne, RODO compliance

### 4.4 Dostępność (a11y)

- WCAG 2.1 AA
- Obsługa keyboard navigation
- Screen reader compatible (ARIA labels)
- Kontrast kolorów ≥ 4.5:1

### 4.5 Browser Support

| Browser | Wersja |
|---------|--------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 5. Integracje Zewnętrzne

### 5.1 Supabase

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Zmienne środowiskowe:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 5.2 Stripe

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})
```

**Zmienne środowiskowe:**
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 5.3 Background Removal API

```typescript
// lib/services/background-removal.ts
// Options:
// 1. remove.bg API
// 2. Replicate API (z modelem rembg)
// 3. Cloudinary AI

interface RemoveBackgroundResult {
  processedUrl: string;
  confidence: number;
}
```

---

## 6. Bezpieczeństwo i Prywatność

### 6.1 Polityka Danych

- **Domyślna widoczność:** Prywatna (tylko właściciel)
- **Share opcjonalny:** Tylko z explicit consent
- **Retention:** 
  - Aktywne konto: dane przechowywane
  - Usunięcie konta: 30-dniowy grace period
  - Po 30 dniach: hard delete wszystkich danych

### 6.2 RODO Compliance

- [ ] Polityka prywatności dostępna w aplikacji
- [ ] Mechanizm exportu danych użytkownika (Data Portability)
- [ ] Mechanizm usunięcia danych (Right to Erasure)
- [ ] Logowanie zgód (consent logging)

---

## 7. CI/CD i Deployment

### 7.1 Środowiska

| Środowisko | URL | Cel |
|------------|-----|-----|
| Development | localhost:3000 | Lokalny development |
| Staging | lookapp-staging.vercel.app | Pre-production testing |
| Production | lookapp.app | Live app |

### 7.2 Pipeline CI/CD

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: amondnet/vercel-action@v25
```

### 7.3 Docker (opcjonalnie)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 8. Testowanie

### 8.1 Strategia Testów

| Poziom | Narzędzie | Pokrycie |
|--------|-----------|----------|
| Unit | Jest / Vitest | > 80% |
| Component | React Testing Library | Critical paths |
| E2E | Playwright | Happy paths |
| Integration | Supertest | API endpoints |

### 8.2 Kluczowe Scenariusze Testowe

- [ ] Rejestracja i logowanie
- [ ] Upload obrazu + background removal
- [ ] Auto-tagging + korekta ręczna
- [ ] Tworzenie outfitu (drag & drop)
- [ ] Zapis i edycja outfitu
- [ ] Generowanie rekomendacji
- [ ] Export do social media
- [ ] Subscription flow (Stripe)
- [ ] Usuwanie danych (RODO)
- [ ] Responsive design (mobile/desktop)

---

## 9. Monitoring i Observability

### 9.1 Narzędzia

| Kategoria | Narzędzie |
|-----------|-----------|
| Error tracking | Sentry |
| Analytics | Google Analytics 4 / Mixpanel |
| Uptime | Vercel Analytics / Pingdom |
| Logs | Vercel + Sentry |

### 9.2 Alerty

- Error rate > 1% → Alert
- API latency p95 > 500ms → Alert
- Failed payments → Alert
- Storage quota > 80% → Alert

---

## 10. Estymacja Czasu (MVP)

| Moduł | Estymacja |
|-------|-----------|
| Auth + Onboarding | 3 dni |
| Upload + Background Removal | 2-3 dni |
| Auto-tagging | 2-4 dni |
| Outfit Builder (Canvas) | 3-5 dni |
| Save & Manage Outfits | 1-2 dni |
| Recommendation Engine | 4-7 dni |
| Billing + Stripe | 2-3 dni |
| Export to Social | 2-4 dni |
| Reverse Image Search | 3-6 dni |
| Privacy + Data Retention | 2 dni |
| Analytics + Metrics | 1-2 dni |
| **Razem MVP** | **~25-37 dni** |

---

## 11. Priorytety MVP

### Faza 1 (Krytyczne)
1. Auth + Onboarding
2. Upload + Background Removal
3. Outfit Builder (Canvas)
4. Save Outfits

### Faza 2 (Ważne)
5. Auto-tagging
6. Recommendation Engine
7. Export to Social

### Faza 3 (Rozszerzenie)
8. Billing + Subscriptions
9. Reverse Image Search
10. Analytics

### Faza 4 (Compliance)
11. Privacy + Data Retention

---

## 12. Następne Kroki

1. **Setup projektu:**
   - `npx create-next-app@latest lookapp --typescript --tailwind --eslint`
   - Skonfiguruj Supabase projekt
   - Uruchom locally

2. **Infrastruktura:**
   - Skonfiguruj Supabase Auth
   - Uruchom migrations
   - Skonfiguruj Stripe (test mode)

3. **MVP Implementation:**
   - Zacznij od Fazy 1 (Auth → Upload → Canvas → Save)

---

## 13. Załączniki

### 13.1 Zmienne Środowiskowe

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Background Removal
REMOVE_BG_API_KEY=
REPLICATE_API_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

### 13.2 Referencje

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [pgvector](https://github.com/pgvector/pgvector)

---

*Document created based on:*
- *README.md*
- *docs/plans/01-11/**
- *tech_reqs/technical_requirements.md*
- *docs/Tech_Stack_Audit_LookApp.md*
