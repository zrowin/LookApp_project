# Zasady opisu struktury folderów w projekcie

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

-----------------
Plik ten powinien być utrzymywany krótki i praktyczny. Celem jest szybkie onboardowanie i konsekwencja między repozytoriami.
