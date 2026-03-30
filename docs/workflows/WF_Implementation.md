## WF_Implementation — Workflow: Implementacja

### Cel
Opisać zasady, role i kroki niezbędne do bezpiecznej, przewidywalnej i powtarzalnej implementacji funkcji w projekcie.

### Zakres
Dotyczy wszystkich prac programistycznych: nowych funkcji, poprawek, migracji i konfiguracji infrastruktury związanej z kodem aplikacji.

### Zasady
- Kod: czytelny, zgodny z ustalonym stylem (linters, formatowanie), ma sensowne testy jednostkowe.
- Branching: feature branches od `main`/`develop` według ustalonego schematu: `feature/`, `bugfix/`, `hotfix/`.
- Pull Request: krótki opis, powiązane issue, checklist testów, wymagani co najmniej 1 reviewer.
- Code Review: sprawdzać bezpieczeństwo, czytelność, architekturę, testy i zgodność z ADR (Architecture Decision Records).
- Commity: małe, atomowe, z czytelnymi opisami; używać konwencji commit message (np. Conventional Commits).
- Testy: każde new change powinno mieć jednostkowe i tam, gdzie to wymagane, integracyjne testy.
- CI/CD: pipeline uruchamia lint, testy, security scans i buduje artefakt; nie mergować gdy pipeline nie przechodzi.
- Bezpieczeństwo: skany zależności, walidacja wejść, przechowywanie sekretów poza repozytorium.
- Dokumentacja: aktualizować dokumentację techniczną i użytkową przy wprowadzaniu zmian.

### Kroki implementacji
1. Przygotowanie
   - Zebranie wymagań i kryteriów akceptacji (acceptance criteria).
   - Oszacowanie i podział pracy na zadania/issue.
2. Architektura i decyzje techniczne
   - Określić rozwiązanie architektoniczne, alternatywy i decyzję w ADR.
   - Weryfikacja wpływu na istniejące komponenty (performance, bezpieczeństwo, prywatność).
3. Przygotowanie środowiska
   - Stworzyć feature branch zgodnie z konwencją.
   - Skonfigurować lokalne środowisko developerskie i kontenery jeśli wymagane.
   - Upewnić się, że CI ma wymagane joby (lint, testy, build, skany).
4. Implementacja
   - Implementować w małych krokach, commitować atomowo.
   - Dodawać i uruchamiać testy jednostkowe dla nowych modułów.
   - Unikać hardcodowanych sekretów i danych testowych w repozytorium.
5. Wstępne testy lokalne i integracja
   - Uruchomić testy lokalnie i naprawić błędy.
   - Zaktualizować fixtures / mocki jeśli potrzeba.
6. Pull Request i code review
   - Otworzyć PR z opisem, linkiem do issue i checklistą.
   - Poprosić o review odpowiednie osoby (co najmniej jeden reviewer).
   - Zastosować poprawki po review i upewnić się, że CI przechodzi.
7. Testy końcowe i przygotowanie do release
   - Uruchomić testy integracyjne/e2e oraz skany bezpieczeństwa.
   - Przygotować changelog i notatki wydania jeśli dotyczy.
8. Deployment
   - Wykonać wdrożenie przez pipeline (staging → smoke tests → production) zgodnie z procedurą.
   - Mieć plan rollback i kroki awaryjne.
9. Weryfikacja po wdrożeniu
   - Sprawdzić metryki, logi, alerty i manualne testy krytycznych ścieżek.
   - Potwierdzenie zaakceptowania przez właściciela produktu.
10. Retrospektywa i dokumentacja
   - Krótka retro dotycząca problemów i usprawnień.
   - Zaktualizować dokumentację techniczną i instrukcje operacyjne.

### Role i odpowiedzialności
- Developer: implementacja, testy jednostkowe, poprawki po review.
- Reviewer: ocena jakości kodu, bezpieczeństwa i wpływu na architekturę.
- Tech Lead: zatwierdzenie istotnych zmian architektonicznych i krytycznych PR.
- QA: testy integracyjne/e2e, regresja, potwierdzenie kryteriów akceptacji.
- DevOps/Platform: utrzymanie pipeline, deployment, monitoring.
- Product Owner / PM: akceptacja funkcjonalna i priorytetyzacja.

### Definicja ukończenia (Definition of Done)
- Kod zmergowany do docelowej gałęzi.
- Wszystkie testy przechodzą w CI.
- Linter i formatowanie bez błędów.
- Code review zakończone i uwagi zaadresowane.
- Dokumentacja zaktualizowana (README, changelog, instrukcje deploy).
- Zmiany wdrożone na środowisku docelowym i zweryfikowane.
- Monitorowanie i alerty skonfigurowane dla krytycznych problemów.

### Checklist (szybka lista)
- [ ] Issue zdefiniowane i zaakceptowane
- [ ] Branch utworzony
- [ ] Implementacja z commitami
- [ ] Testy jednostkowe dodane i zielone
- [ ] PR otwarty z opisem i checklistą
- [ ] Review i poprawki
- [ ] CI zielone
- [ ] Release notes / changelog
- [ ] Deployment i weryfikacja
- [ ] Dokumentacja zaktualizowana

### Szablony i odwołania
- ADR: prowadzić decyzje architektoniczne w dedykowanym pliku.
- Zobacz: [docs/Tech_Stack_Audit_LookApp.md](docs/Tech_Stack_Audit_LookApp.md) — odniesienia technologiczne projektu.
- Inne workflowy: przegląd dostępnych workflowów w [docs/workflows](docs/workflows).

---
Plik ma charakter opisowy — nie wykonuje działań automatycznych. Służy jako odniesienie dla zespołu przy wdrażaniu zmian.
