
# Resource Analysis — LookApp

## 1‑liner / Stage / Horyzont
- 1‑liner: Aplikacja do zarządzania garderobą i tworzenia outfitów z realnych zdjęć (web + mobile).
- Stage: MVP (mobile‑first, web PWA) — horyzont planowania: 90 dni.

---

## Cele audytu
- Oszacować minimalne zasoby (czas, budżet, integracje) potrzebne do uruchomienia MVP.
- Zidentyfikować krytyczne integracje i punkty ryzyka oraz zaproponować mitigacje/manual workarounds.

---

## Audyt czasu (osobo‑dni) — minimalny MVP
Zakres: rejestracja, upload zdjęć, background removal przez API, prosty canvas outfit, zapis outfitów, podstawowe rekomendacje heurystyczne, storage, Stripe Checkout, prosty landing/onboarding.

- Core development (backend + API): 25–35 osobo‑dni
- Frontend (web PWA, responsive): 20–30 osobo‑dni
- Integracje (remove-bg API, S3, Stripe): 5–8 osobo‑dni
- DevOps / Infra (CI/CD, hosting, certyfikaty, monitoring): 4–6 osobo‑dni
- Design & UX (prototyp, sample images, onboarding): 4–6 osobo‑dni
- QA (manual + smoke tests): 3–5 osobo‑dni
- Growth & Landing (copy, basic SEO, pre-order): 2–3 osobo‑dni
- Buffer (20–30%): 12–20 osobo‑dni

Minimalny total: ~75–110 osobo‑dni (solo‑dev przy wsparciu 1–2 kontraktorów na krótkie taski).

---

## Audyt budżetu (estymaty, PLN / EUR / USD zależnie od preferencji)
Założenie: Solo‑Dev + kilka płatnych API. Podane wartości orientacyjne (USD / mies.).

- Jednorazowe koszty:
  - Prototyp / design tools (Figma licencja lub szablon): $0–$12
  - Prawne / TOS + Privacy (szablon): $0–$300

- Miesięczne koszty (MVP):
  - Hosting (Vercel/Railway) + DB (Postgres managed): $20–$60
  - Storage (S3) — zależy od zdjęć: $5–$50
  - Background removal API (np. remove.bg / remove.ai): $0.02–$0.10 / obraz → przy 1k obrazów: $20–$100
  - AI inference / embeddings (jeśli używane): $50–$300 (optymistycznie: heurystyki minimalizują koszty)
  - Stripe fees: ~2.9% + $0.30/transakcja
  - Email (SendGrid): $0–$15

Estimated burn (miesiąc 0–3): $100–$600 + koszty deweloperskie (jeśli outsourcowane).

Break‑even przykładowo przy: 50 płatnych użytkowników × $29/mo ≈ $1,450 MRR (pokrywa koszty i wynagrodzenie solo‑deva przy niskim burnie).

---

## Krytyczne integracje (krytyczność / trudność / mitigacja)
- Background removal API — Krytyczne / Łatwe: użyj zewnętrznego API (remove.bg) jako MVP. Mitigacja: oferuj manualną obróbkę (outsourcing) dla pierwszych userów.
- Storage (S3 lub managed) — Krytyczne / Łatwe: konieczne do przechowywania zdjęć.
- Stripe Checkout — Krytyczne / Łatwe: do walidacji willingness‑to‑pay.
- Authentication (Email + Password) — Krytyczne / Łatwe: prosty JWT lub NextAuth minimal.
- AI matching / embeddings — Opcjonalne / Średnie‑trudne: MVP: heurystyki kolor/type; plugin ML jako Post‑MVP.
- Affiliate links / e‑commerce API (opcjonalne) — Opcjonalne / Średnie: pilot z linkami, mierzyć CTR i konwersję.

---

## Zasoby ludzkie — minimalny zespół MVP
- Solo‑Dev (fullstack) — 1 FTE (główny wykonawca): 75–110 osobo‑dni
- Designer (kontrakt, 0.1–0.2 FTE) — prototypy, onboarding: 4–6 dni
- QA / tester kontraktowy (ad hoc): 2–4 dni
- Opcjonalnie: freelance na integrację background removal (1–3 dni)

---

## Macierz priorytetów (MVP vs Post‑MVP)
- MVP (Krytyczne): Upload zdjęć, background removal (API), prosty canvas outfit (save), basic matching heuristics, storage, Stripe Checkout, onboarding flow.
- Post‑MVP (Should‑Have): Auto tagowanie AI, mobile native app, zaawansowane rekomendacje, Zapier integrations.

---

## Ryzyka i mitigacje
- Ryzyko: Słabe zdjęcia → brak Aha Moment. Mitigacja: instrukcje, sample images, manual retouching service pierwszych userów.
- Ryzyko: Koszty API (background removal) rosną wraz z użyciem. Mitigacja: caching, batch processing, quota dla darmowego tieru.
- Ryzyko: Opóźnienia w integracji płatności. Mitigacja: uruchom Stripe Checkout jako pierwszy krok (prosty link checkout).

---

## Plan 90‑dniowy (przykład rozpiski)
- Tydzień 0–2: Design prototypu, landing + pre-order, Stripe setup
- Tydzień 2–6: Backend + upload/storage + background removal API + basic auth
- Tydzień 6–10: Frontend canvas + save/load outfit + basic matching
- Tydzień 10–12: QA, monitoring, launch soft + pierwsza kampania akwizycji

---

## Deliverables (co dostarczam)
- Arkusz z osobo‑dniami i budżetem (CSV/Google Sheet) — do wygenerowania na życzenie
- Lista integracji z estymacjami czasu/kosztów
- Krótka macierz priorytetów i 90‑dniowy plan działania


