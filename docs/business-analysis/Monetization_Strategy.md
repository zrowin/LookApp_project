
# Monetization Strategy — LookApp

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [Competitor_audit_LookApp.md](Competitor_audit_LookApp.md)
	- [Files_Structure.md](Files_Structure.md)
	- [GTM_Strategy.md](GTM_Strategy.md)
	- [ICP_Persona_LookApp.md](ICP_Persona_LookApp.md)
	- [Job_To_Be_Done_LookApp.md](Job_To_Be_Done_LookApp.md)
	- [Kill_the_idea-lookapp.md](Kill_the_idea-lookapp.md)
	- [MVP_Scoping.md](MVP_Scoping.md)
	- [opis-projektu-lookapp.md](opis-projektu-lookapp.md)
	- [Resource_Analysis.md](Resource_Analysis.md)
	- [Tech_Stack_Audit_LookApp.md](Tech_Stack_Audit_LookApp.md)
	- [User_Journey_Map.md](User_Journey_Map.md)

## 💰 Cel
- Szybko przetestować model subskrypcyjny dla użytkowników indywidualnych (mobile-first), z dodatkowymi revenue streams: affiliate (zakupy) i upsell do nielimitowanej garderoby + AI-stylista.

## Rekomendowana jednostka wartości
- Primary unit: **Per Feature / Tiered** — proste tiery: Free / Starter ($29/mo) / Pro ($99/mo). Dla Solo-Dev to najmniej operacyjny i najszybszy do uruchomienia model.

## Proponowana struktura tiery
- FREE: 10 itemów w garderobie, brak AI-stylisty, podstawowy export (cel: akwizycja)
- STARTER ($29/mo): 100 itemów, podstawowe rekomendacje AI (heurystyki + remove-bg API), eksport, podstawowe integracje (linki afiliacyjne)
- PRO ($99/mo): nielimitowana garderoba, zaawansowane rekomendacje, priorytetowy support, integracje e‑commerce

## Dodatkowe źródła przychodu
- Affiliate / referral: linki do sklepów w rekomendacjach (commission-based)
- One-time paid features: np. „professional background removal pack” lub „style pack”
- Paid pre-orders / early access: landing + Stripe Checkout pre-order dla power-userów

## Paywall & Konwersja
- Zasada: pokaż wartość ZANIM zablokujesz. Free powinien umożliwić utworzenie pierwszego outfit'u.
- Upsell moments: przy osiągnięciu limitu itemów, przy próbie użycia zaawansowanej funkcji (np. AI-embedding), oraz 7 dni po rejestracji (promocja).

## Experymenty szybkiej walidacji (week 0–4)
1. Landing z CTA „Pre-order Premium” + Stripe Checkout (sprawdź willingness-to-pay)
2. Freemium z limitem 10 itemów + in-app modal przy 9/10 (A/B test komunikatów)
3. Affiliate pilot: w rekomendacjach pokaż 3 linki produktowe i mierz CTR→conversion

## KPI (targets)
- Landing → Sign-up: >5%
- Sign-up → First Output: >70%
- Free → Paid conversion: 2–5% (pierwszy rok)
- ARPU Starter ≈ $29; ARPU Pro ≈ $99

## Operacyjne wymagania (minimalne)
- Stripe Checkout (obsługa VAT jeśli EU) — integracja podstawowa
- Terms + Privacy + Refund policy (14 dni)
- MRR dashboard + prosty retry failed payment (Stripe)

## Red Flags / Ryzyka
- Targetowanie enterprise na starcie (za duży koszt obsługi)
- Zbyt dużo tiery/discountów (komplikuje support)
- Brak jasnego „momentu zapłaty” — jeśli Aha Moment nie wymaga kolejnej opcji, konwersja spadnie

## Szybkie rekomendacje działania
1. Uruchom Free + Starter + Pro z wyraźnymi limitami i jednym upsell momentem.
2. Wdróż Stripe Checkout + prosty pricing page przed publicznym launch.
3. Przetestuj affiliate links w feedzie rekomendacji i mierz przychód od razu.



