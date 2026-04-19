
# Kill_the_idea — LookApp (Pre‑Mortem)

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
	- [Competitor_audit_LookApp.md](Competitor_audit_LookApp.md)
	- [Files_Structure.md](Files_Structure.md)
	- [GTM_Strategy.md](GTM_Strategy.md)
	- [ICP_Persona_LookApp.md](ICP_Persona_LookApp.md)
	- [Job_To_Be_Done_LookApp.md](Job_To_Be_Done_LookApp.md)
	- [Monetization_Strategy.md](Monetization_Strategy.md)
	- [MVP_Scoping.md](MVP_Scoping.md)
	- [opis-projektu-lookapp.md](opis-projektu-lookapp.md)
	- [Resource_Analysis.md](Resource_Analysis.md)
	- [Tech_Stack_Audit_LookApp.md](Tech_Stack_Audit_LookApp.md)
	- [User_Journey_Map.md](User_Journey_Map.md)

## Postawa agenta
Zakładam domyślnie: „Ten projekt upadnie w ciągu 6 miesięcy”. Szukam dowodów i krytycznych ryzyk.

## Analiza 5 filtrów
- Distribution Hell: brak jasno zdefiniowanego niskokosztowego kanału akwizycji; influencer/organic niezweryfikowane.
- Feature, not a product: ryzyko bycia „funkcją” (photo tagging + background removal) łatwą do skopiowania.
- Support Trap: oczekiwane ręczne poprawki tagów, problemy z jakością zdjęć -> koszty wsparcia.
- Nice‑to‑Have: użytkownicy mogą traktować app jako „fajne”, nie konieczne — wysoki churn.
- Zero‑Moat: brak silnej bariery wejścia (brak unikalnych danych lub lock‑in).

## RED FLAGS (krytyczne)
- Koszt AI i storage może przewyższyć przychody MVP.
- CAC niezweryfikowany; model affiliate ma niską marżę.
- Ryzyko prawne/RODO związane z przechowywaniem zdjęć bez jasnych procedur usuwania.

## YELLOW FLAGS (ostrzegawcze)
- Jakość dopasowań zależna od danych użytkownika.
- Zależność od third‑party API (bg removal, vision).
- Wysokie wymagania UX (mobile-first drag&drop) wydłużają development.

## Death scenario (4 miesiące)
Uruchomienie MVP -> niewielki ruch płatny, CAC >> LTV, koszty AI rosną, churn wysoki ("fajne, ale nie potrzebne"), brak organicznego wzrostu -> zamknięcie.

## Verdict
PIVOT lub PROCEED WITH CAUTION:
- Jeśli brak wczesnej walidacji rynku/kanalów: PIVOT.
- Jeśli masz potwierdzone kanały (butiki, influencerzy) i budżet na AI: PROCEED WITH CAUTION.

## Sugerowany pivot (bezpieczniejsza alternatywa)
Skoncentruj się B2B: narzędzie dla butików/stylistów — digitalizacja katalogu (bg removal + tagowanie + outfit builder) + subskrypcja B2B. Wyższe ARPU, prostsze pozyskanie klientów sprzedażą bezpośrednią.

## Krótkie next steps (walidacja)
1. Landing + preorders (zweryfikuj willing‑to‑pay).  
2. Concierge MVP: ręczne tworzenie stylizacji dla 20–50 użytkowników.  
3. Pilotaż z 3–5 butikami/influencerami (sprawdź CAC i feedback).  
4. Kalkulacja TCO (AI calls + storage + dev) vs projekcja ARPU/LTV.  
5. KPI do monitorowania: CAC, LTV, MRR, churn, cost per processed image.

