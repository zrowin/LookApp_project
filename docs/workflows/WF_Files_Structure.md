# Zasady opisu struktury folderów w projekcie

## Nawigacja
- Pełna mapa: [Mapa dokumentów — NAVIGATION.md](../NAVIGATION.md)
- Inne w tym folderze:
  - [WF_Competitor_Audit.md](WF_Competitor_Audit.md)
  - [WF_Idea_Generation.md](WF_Idea_Generation.md)
  - [WF_ICP_Persona.md](WF_ICP_Persona.md)
  - [WF_ICE_Ranking.md](WF_ICE_Ranking.md)
  - [WF_GTM_Strategy.md](WF_GTM_Strategy.md)
  - [WF_Kill_The_Idea.md](WF_Kill_The_Idea.md)
  - [WF_Job_To_Be_Done.md](WF_Job_To_Be_Done.md)
  - [WF_Monetization_Strategy.md](WF_Monetization_Strategy.md)
  - [WF_MVP_Scoping.md](WF_MVP_Scoping.md)
  - [WF_Resource_Analysis.md](WF_Resource_Analysis.md)
  - [WF_Tech_Stack_Audit.md](WF_Tech_Stack_Audit.md)

Cel: dostarczyć jednolite wytyczne do opisywania i dokumentowania struktury katalogów projektu, tak aby nowi współpracownicy szybko rozumieli organizację kodu, zasobów i konfiguracji.

1. Zakres
- Dokument odnosi się do wszystkich repozytoriów i modułów projektu.

2. Generalne zasady nazewnictwa
- Używamy nazw w języku angielskim dla katalogów kodu i technicznych zasobów (np. `src`, `tests`, `docs`).
- Nazwy powinny być krótkie, rzeczowe i w formie liczby mnogiej tam, gdzie to zasadne (np. `components`, `services`).

3. Struktura najwyższego poziomu
- Każde repozytorium powinno mieć na najwyższym poziomie (przykład):
  - `src/` — źródła aplikacji
  - `docs/` — dokumentacja projektowa i procesowa
  - `tests/` — testy jednostkowe/integracyjne
  - `scripts/` — skrypty pomocnicze (build, deploy, maintenance)
  - `configs/` lub `config/` — konfiguracje (jeśli są liczne)
  - `assets/` — obrazy, ikony, fonty niezwiązane bezpośrednio z kodem
  - `bin/` — pliki wykonywalne lub entrypointy

4. README w katalogu
- Każdy ważniejszy katalog (co najmniej `src`, `docs`, `tests`, `config`) powinien zawierać krótki `README.md` wyjaśniający:
  - cel katalogu
  - ważne pliki/ podkatalogi
  - jak uruchomić/testować zawartość

5. Opis struktury projektu (plik główny)
- W repozytorium głównym w `docs/` lub w głównym `README.md` umieszczamy sekcję "Project Structure" z:
  - krótkim drzewa katalogów (2–4 poziomy)
  - opisem najważniejszych katalogów i konwencji
  - przykładowymi komendami do uruchomienia/developowania

6. Konwencje nazewnictwa plików
- Używamy kebab-case lub snake_case zgodnie z konwencją technologii; wybór dokumentujemy w `CONTRIBUTING.md`.
- Pliki konfiguracyjne (np. `.env.example`, `config.default.json`) powinny mieć sufiksy `example` lub `default` gdy zawierają wzorzec.

7. Zasoby binarne i duże pliki
- Duże pliki i binaria nie powinny znajdować się w repo (używaj LFS lub zewnętrznych storage). W `docs/` opisz miejsce i sposób pozyskiwania tych zasobów.

8. Pliki konfiguracyjne i sekrety
- Nigdy nie przechowujemy sekretów w repo. Umieszczamy przykładowe pliki `.env.example` i dokumentację jak skonfigurować środowisko.

9. Testy i dane testowe
- `tests/` powinien zawierać strukturę odzwierciedlającą `src/` (łatwiejsze mapowanie). Dane testowe trzymamy w `tests/fixtures` lub zewnętrznym magazynie.

10. Dokumentacja i diagramy
- Umieszczamy dokumenty projektowe w `docs/` i linkujemy je z głównego `README.md`.
- Diagramy i mapy podróży użytkownika powinny mieć opis wersji i autora.

11. Własność i odpowiedzialność
- Każdy katalog może mieć przypisanego właściciela w `CODEOWNERS` lub w `docs/` — opisujemy kto odpowiada za zawartość i review.

12. Zmiany w strukturze
- Zmiany struktury katalogów powyżej 1 poziomu wymagają zgłoszenia w PR z opisem migracji i listą wpływów (build, CI, skrypty deploy).

13. Przykładowy szablon opisu katalogu (README)
```
Purpose: Krótki opis celu katalogu
Important files: lista najważniejszych plików
How to run: komendy do lokalnego uruchomienia/testów
Notes: uwagi dotyczące konwencji i zależności
```

14. Wyjątki i specyfika technologii
- Jeżeli technologia wymaga innej konwencji, dokumentujemy ją wyraźnie i dodajemy mapę mentalną (dlaczego odstąpiono od standardu).

15. Weryfikacja
- Przy code review sprawdzamy, czy struktura i opis są spójne. Brak dokumentacji katalogu — prośba o dopisanie do PR.

16. Zasady dla agenta przygotowującego opis struktury dokumentów
- Cel: dostarczyć jednolitą, powtarzalną procedurę, której agent będzie przestrzegać przy generowaniu opisów struktury repozytorium i katalogów.
- Krok 1 — Skan repozytorium: zbierz listę plików i katalogów na najwyższym poziomie oraz sprawdź zawartość `docs/`, `scripts/`, `tech_reqs/` i innych istotnych katalogów.
- Krok 2 — Kluczowe pliki: zidentyfikuj i opisz pliki startowe (np. `README.md`, `package.json`, `index.js`, `Dockerfile`, `docker-compose.yml`, skrypty w `scripts/`).
- Krok 3 — Drzewo katalogów: wygeneruj czytelne drzewo (maksymalnie 3 poziomy) z krótkimi opisami celu każdego katalogu.
- Krok 4 — Konwencje: wypisz przyjęte konwencje (nazewnictwo, format plików, lokalizacje konfiguracji, sposób przechowywania sekretów) i wskaż miejsce dokumentujące wybór (np. `CONTRIBUTING.md`).
- Krok 5 — Uruchamianie i skrypty: podaj istotne polecenia do lokalnego uruchomienia (z `package.json` i `scripts/`) oraz krótkie instrukcje dla Windows i cross-platform.
- Krok 6 — Testy i fixtures: wskaż lokalizację testów i danych testowych (np. `tests/`, `tests/fixtures`).
- Krok 7 — Zasoby i binaria: zidentyfikuj duże pliki/binaria i opisz, gdzie je pozyskać (LFS / zewnętrzne storage).
- Krok 8 — Bezpieczeństwo: sprawdź, czy w repo nie ma plików zawierających sekrety; jeśli występują, zgłoś je i wskaż `.env.example` jako wzorzec.
- Krok 9 — Właściciele i review: jeśli brakuje `CODEOWNERS`, zaproponuj jego utworzenie lub wpis w `docs/` wskazujący właścicieli katalogów.
- Krok 10 — Zmiany struktury: jeśli proponujesz zmiany przekraczające 1 poziom katalogów, dołącz listę wpływów na CI/build i proponowaną procedurę migracji.
- Dodatkowe zasady redakcyjne dla agenta:
  - używaj prostego, zwięzłego języka; preferuj listy punktowane i krótkie przykłady komend;
  - zamieszczaj odnośniki do istniejącej dokumentacji (`docs/`, `tech_reqs/`);
  - generuj przykładowy szablon `README` dla nowych katalogów (Purpose, Important files, How to run, Notes);
  - przy wątpliwościach zadawaj 2–3 konkretne pytania użytkownikowi zamiast zgadywać;
  - nie modyfikuj istniejących plików bez wyraźnej zgody — jedynie proponuj zmiany i pliki pomocnicze (np. `CODEOWNERS`, `CONTRIBUTING.md`).

-----------------
Plik ten powinien być utrzymywany krótki i praktyczny. Celem jest szybkie onboardowanie i konsekwencja między repozytoriami.
