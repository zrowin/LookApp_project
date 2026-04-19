
# User Journey Map — LookApp

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [Competitor_audit_LookApp.md](Competitor_audit_LookApp.md)
	- [Files_Structure.md](Files_Structure.md)
	- [GTM_Strategy.md](GTM_Strategy.md)
	- [ICP_Persona_LookApp.md](ICP_Persona_LookApp.md)
	- [Job_To_Be_Done_LookApp.md](Job_To_Be_Done_LookApp.md)
	- [Kill_the_idea-lookapp.md](Kill_the_idea-lookapp.md)
	- [Monetization_Strategy.md](Monetization_Strategy.md)
	- [MVP_Scoping.md](MVP_Scoping.md)
	- [opis-projektu-lookapp.md](opis-projektu-lookapp.md)
	- [Resource_Analysis.md](Resource_Analysis.md)
	- [Tech_Stack_Audit_LookApp.md](Tech_Stack_Audit_LookApp.md)

## 🎯 Success Metric
- Użytkownik dodaje ubranie i tworzy pierwszy outfit z rekomendacją w <5 minut, uznając wynik za użyteczny (Aha Moment).
- Cel biznesowy: 10–20 użytkowników zapłaci za plan Premium (nielimitowana garderoba + AI-stylista).

---

## Stage 1: Landing (0–30s)
What they see:
- Headline: "Zarządzaj swoją szafą i twórz stylizacje z realnych zdjęć"
- Value prop: "Upload zdjęcia → stwórz outfit → otrzymaj dopasowania i inspiracje"

Friction Points:
- Zbyt ogólny opis AI („AI stylist”) → rozwiązać jasnym przykładem wartości
- Brak CTA prowadzącego bezpośrednio do uploadu zdjęcia

Aha Moment:
- "Mogę w 2 minuty stworzyć stylizację z moich ubrań"

CTA: "Wypróbuj za darmo — dodaj pierwsze ubranie"

---

## Stage 2: Sign-Up (1–3 min)
Flow:
1. Email + Password (opcja Google post-MVP)
2. Instant email link (nie kod)
3. Quick start: "Dodaj pierwsze ubranie" (skip profil)

Friction Points:
- Zbyt wiele pól profilowych przed pierwszym użyciem

Aha Moment:
- Użytkownik trafia bezpośrednio do ekranu uploadu zdjęcia

Follow-up (5 min): email z przyciskiem "Dodaj swoje pierwsze ubranie"

---

## Stage 3: First Data Input (5–15 min)
Input type: Foto upload / kamera

Required fields / UX:
- Instrukcja: "Zrób zdjęcie bez tła, najlepiej na jasnym tle"
- Przykładowe zdjęcie pre-filled lub sample gallery
- Fallback: upload CSV/URL dla produktów

Friction Points:
- Długi proces tagowania ręcznego → sugerować minimalne tagi

Aha Moment:
- Zdjęcie zostaje przetworzone, element pojawia się w garderobie

---

## Stage 4: Processing (15–20s)
UX:
- Progress bar: "Usuwamy tło i tagujemy — zajmie ~10s"
- Jeśli dłużej: pokaz mini-preview lub placeholder outfit

Error handling:
- Jasne komunikaty: "Zdjęcie za małe / złe światło — spróbuj ponownie"

---

## Stage 5: First Output / Aha Moment (20–60s)
Output:
- Nowy element w wirtualnej garderobie + prosty canvas do przeciągania
- Propozycja szybkiego outfitu: "Ten top pasuje do tych spodni" (heurystyka kolorów/typów)
- Opcja zapisu i eksportu (screenshot / link)

Friction Points:
- Output bez kontekstu („brakuje instrukcji co dalej”) → pokaż CTA: "Zapisz outfit / Poproś o rekomendacje"

Aha Moment:
- "Mogę od razu używać tego w realnych stylizacjach — to działa"

⏱ TOTAL TIME TARGET: <5 minut

---

## Stage 6: Second Action (1–3 dni)
Triggers:
- Email 24h: "Stwórz drugi outfit — zobacz rekomendacje na podstawie twojej garderoby"
- In-app: widget "Spróbuj automatycznych dopasowań"

Goal:
- Użytkownik tworzy kolejny outfit bez pomocy (target Day1 Return >40%)

Quick wins:
- Szablony outfitów, copy-to-clone

---

## Stage 7: Conversion to Paid (7–30 dni)
Trigger:
- Limit darmowego planu (np. 10 itemów) lub precyzyjne „unlock” dla AI-stylisty

Messaging:
- "Nielimitowana garderoba i zaawansowane rekomendacje — od $X/mies." + 1-click upgrade

Friction Points:
- Zbyt agresywne gated features przed pokazaniem realnej wartości

Aha Moment for Conversion:
- Użytkownik widzi wyraźną stratę funkcji przy przekroczeniu limitu i uznaje wartość AI-stylisty

---

## Summary Metrics (proponowane KPI)
- Landing → Sign-up: target >5%
- Sign-up → First Output: target >70%
- First Output → Day1 Return: target >40%
- Trial → Paid: target ≥5%

Biggest Friction Point (the ONE):
- Upload zdjęcia i quality errors (słabe zdjęcia -> brak Aha). Rozwiązanie: instrukcje + fallback manualnej obróbki dla pierwszych użytkowników.

Quick Wins (do wdrożenia <4h)
1. Bezpośredni CTA z landingu do uploadu zdjęcia
2. Pre-filled sample images i "Try sample" button
3. Progress bar z komunikatem i est. czasu

