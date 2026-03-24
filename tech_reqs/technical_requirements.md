**Wymagania Techniczne**

**Projekt:** LookApp

**Cel:**
- **Opis:**: Dostarczyć skalowalną aplikację mobilno-webową umożliwiającą tworzenie, przeglądanie i udostępnianie stylizacji (looków), zarządzanie katalogiem ubrań oraz rekomendacje outfitów.

**Zakres funkcjonalny (MVP):**
- **Rejestracja i logowanie:**: rejestracja e-mail, logowanie, odzyskiwanie hasła; obsługa OAuth (Google/Facebook) jako opcja.
- **Profile użytkowników:**: edycja profilu, zdjęcie, preferencje stylu.
- **Tworzenie looków:**: dodawanie zdjęć, opisów, tagów, przypisywanie elementów garderoby.
- **Galeria / feed:**: listowanie looków (wszystkie / obserwowanych użytkowników), filtrowanie i wyszukiwanie.
- **Szczegóły looku:**: komentarze, polubienia, udostępnianie (link, social).
- **Wyszukiwanie i filtrowanie:**: wg kolorów, tagów, kategorii, marki.
- **Admin / panel zarządzania:**: zatwierdzanie zgłoszeń, zarządzanie użytkownikami, przegląd statystyk.

**Wymagania niefunkcjonalne:**
- **Wydajność:**: 95% zapytań API <200 ms przy nominalnym obciążeniu; strona/feed ładuje się <2s na 4G.
- **Skalowalność:**: horyzontalne skalowanie backendu i serwisu plików (S3), poziome skalowanie bazy danych zgodnie z obciążeniem.
- **Dostępność:**: SLA 99.9% dla krytycznych API; redundancja wielostrefowa zalecana.
- **Bezpieczeństwo:**: HTTPS wszędzie, JWT/OAuth2 do autoryzacji, szyfrowanie danych wrażliwych w bazie, ochrona przed CSRF/XSS, rate limiting, skanowanie zależności.
- **Prywatność:**: zgodność z RODO — przechowywanie danych osobowych, zgody, możliwość usunięcia konta i danych.
- **Składowanie multimediów:**: obiekty w S3 (lub kompatybilnym storage) z CDN (np. CloudFront) do dystrybucji obrazów.

**Architektura rekomendowana:**
- **Frontend:**: 
  - **Mobilne:** React Native (iOS, Android) lub jako MVP - responsywna aplikacja PWA oparta na React.
  - **Web:** React + TypeScript, komponenty UI (np. Material UI / Tailwind).
- **Backend:**: Node.js (Express/NestJS) albo Python (Django/Flask + DRF) z REST API lub GraphQL (opcjonalnie). Microservices nieobowiązkowe na starcie; monolit modularny dopuszczalny w MVP.
- **Baza danych:**: PostgreSQL jako relacyjna baza główna (użytkownicy, looki, relacje, tagi).
- **Cache & sesje:**: Redis (cache zapytań, rate-limiting, kolejki krótkotrwałe).
- **Kolejki tła:**: BullMQ (Redis) lub Celery + RabbitMQ dla przetwarzania obrazów, zadań asynchronicznych (np. generowanie miniatur, rekomendacje).
- **Search:**: ElasticSearch lub Algolia do pełnotekstowego wyszukiwania i filtrowania (szybkie wyszukiwanie po tagach/produktach).
- **Przechowywanie plików:**: S3 (AWS) lub kompatybilny (DigitalOcean Spaces, MinIO na początku) + CDN.
- **CI/CD & Infra:**: Docker + GitHub Actions (pipeline: testy -> budowa obrazu -> deploy), IaC: Terraform lub Pulumi (opcjonalnie na później).

**Integracje zewnętrzne:**
- **Płatności:**: Stripe / PayU (jeśli wymagany płatny plan).
- **Analizy i monitorowanie:**: Google Analytics / Plausible, Sentry (błędy), Prometheus + Grafana (metryki), Logi w ELK / Cloud Logging.
- **Rekomendacje / ML:**: integracja z serwisami zewnętrznymi lub własne modele hostowane jako serwis (np. do dopasowywania ubrań, wykrywania obiektów na zdjęciach).

**API — wymagania:**
- **Autoryzacja:**: JWT (access + refresh tokens) lub OAuth2; tokeny przechowywane bezpiecznie po stronie klienta.
- **Zasoby REST:**: `/auth/*`, `/users/*`, `/looks/*`, `/items/*`, `/search/*`, `/admin/*` — dokumentacja OpenAPI (Swagger) obowiązkowa.
- **Limitowanie:**: globalne i per-endpoint rate limiting (np. 100 req/min dla anonimowych użytkowników).

**Przetwarzanie obrazów:**
- **Minatury / optymalizacja:**: generowanie kilku rozmiarów (thumbnail, medium, large) po stronie backendu lub w workerach; WebP oraz lazy-loading po stronie klienta.
- **Bezpieczeństwo uploadu:**: skanowanie plików, ograniczenie typów MIME, limity rozmiaru (np. 10 MB), presigned uploads do S3 dla skalowalności.

**Testowanie:**
- **Jednostkowe:**: >80% krytycznej logiki biznesowej.
- **Integracyjne:**: testy API (postman / pytest / jest + supertest).
- **E2E:**: Cypress / Playwright na najważniejszych ścieżkach (rejestracja, publikacja looku, wyszukiwanie).

**Backup & Disaster Recovery:**
- **Baza:**: codzienne backupy bazy z retencją (min. 30 dni) i możliwość szybkiego przywrócenia.
- **Pliki:**: wersjonowane kopie obiektów S3 (lub lifecycle policy), replikacja między regionami opcjonalna.

**Deployment / środowiska:**
- **Środowiska:**: `dev`, `staging`, `production`.
- **Konteneryzacja:**: Dockerfile dla backendu i jobów; obrazy przechowywane w registry (Docker Hub / GHCR).
- **Orkiestracja:**: Kubernetes (EKS/GKE/AKS) lub prostsze rozwiązanie (AWS ECS / DigitalOcean App Platform) w zależności od budżetu.

**Monitoring & Observability:**
- **Logi:**: scentralizowane logowanie (ELK / Loki), strukturyzowane logi JSON.
- **Błędy:**: Sentry dla błędów aplikacji i frontendu.
- **Mierniki:**: Prometheus + Grafana do alertów (np. wysokie 5xx, spadek throughputu, wzrost latency).

**Wymagania bezpieczeństwa i prywatności:**
- **Transport:**: TLS 1.2+ (HTTPS) na wszystkich punktach końcowych.
- **Dane wrażliwe:**: PII szyfrowane w spoczynku; dostęp ograniczony rolami.
- **Audyt i logi:**: rejestrowanie akcji administracyjnych, dostępów i operacji modyfikujących dane użytkowników.

**Akceptacja MVP — kryteria:**
- Rejestracja i logowanie działają poprawnie.
- Użytkownik może utworzyć, edytować i usunąć look.
- Feed i wyszukiwanie zwracają poprawne wyniki.
- Upload obrazów zminiaturkowany i dostępny przez CDN.
- Dokumentacja API (OpenAPI) dostępna dla programistów.

**Dostarczone artefakty:**
- `README.md` z instrukcją uruchomienia lokalnego.
- Swagger/OpenAPI spec dla publicznego API (`/docs`).
- Dockerfile + `docker-compose.yml` dla środowiska deweloperskiego.
- Skrypty migracji DB (Flyway / Alembic / TypeORM migrations).

**Szacunkowy plan wdrożenia (orientacyjnie):**
- **Sprint 1 (2 tyg):**: auth, profile, podstawowy model danych, lokalny upload obrazów.
- **Sprint 2 (2 tyg):**: tworzenie looków, feed, podstawowe wyszukiwanie.
- **Sprint 3 (2 tyg):**: optymalizacja obrazów, CDN, admin panel, testy E2E, CI/CD.

---

Jeżeli chcesz, mogę teraz:
- wygenerować `docker-compose.yml` + przykładowy `Dockerfile` dla backendu,
- dodać prosty szkielet projektu (backend + frontend),
- wygenerować OpenAPI skeleton dla API.

Wskaż, którą z tych opcji chcesz, a przygotuję pliki.
