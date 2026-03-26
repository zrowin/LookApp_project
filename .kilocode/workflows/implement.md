# Workflow: Implementation Executor

## Cel

Wdrażanie funkcjonalności na podstawie planu implementacji w małych, zamkniętych krokach.

---

## 🚨 WAŻNE: Zasady działania

- **NIE pomijaj kroków** - realizuj plan dokładnie
- **Po każdym kroku/grupie kroków pytaj** użytkownika o zgodę na kontynuację
- **Zawsze zaznaczaj checkboxy** jako ukończone po zaimplementowaniu zadania
- **Korzystaj z dedykowanych skills/workflows** dla konkretnych zadań (Frontend, Backend)

---

## Kroki wdrażania

### Faza 0: Identyfikacja planu (OBOWI�ZKOWE)

**Przed rozpoczęciem:**

- [ ] **Jaki plan wdrażamy?**
  - Podaj ścieżkę do pliku planu: `________________`
  - Jeśli nie wiesz - **ZAPYTAJ użytkownika**

- [ ] **Sprawdź status planu:**
  - Otwórz plik planu i sprawdź status
  - Jeśli status to 🟢 Zakończony - poinformuj użytkownika i **NIE kontynuuj**
  - Jeśli status to 🔴 Anulowany - poinformuj użytkownika i **NIE kontynuuj**

- [ ] **Przeczytaj plan implementacji:**
  - Otwórz plan: `docs/plans/XX_nazwa_funkcjonalnosci.md`
  - Zapoznaj się z wszystkimi krokami
  - Zidentyfikuj grupy kroków do realizacji

---

### Faza 1: Przygotowanie do wdrożenia

- [ ] **Przeanalizuj kroki implementacji:**
  - Wylistuj wszystkie kroki z planu
  - Zgrupuj je logicznie (np. Backend razem, Frontend razem)
  - Określ zależności między krokami

- [ ] **Wybierz odpowiednie narzędzia:**
  - [ ] Frontend Developer skill → dla komponentów UI
  - [ ] Backend Developer skill → dla API i logiki
  - [ ] Test Engineer skill → dla testów
  - [ ] Inne: `________________`

- [ ] **Przygotuj strukturę plików:**
  - Sprawdź czy istnieją wymagane katalogi
  - Utwórz brakujące struktury

---

### Faza 2: Realizacja kroków (iteracyjnie)

Dla każdej grupy kroków wykonaj:

**Przed realizacją grupy:**

```
🔄 **Grupa [Numer]: [Nazwa grupy]**

Kroki do wykonania:
- [ ] Krok 1
- [ ] Krok 2
- [ ] Krok 3

Czy mam kontynuować? (tak/tak+dalej/nie)
```

**Podczas realizacji:**

- Realizuj kroki jeden po drugim
- Po każdym kroku **oznacz checkbox jako ukończony** w pliku planu
- Jeśli napotkasz problem - **ZAPYTAJ użytkownika** o rozwiązanie

**Po realizacji grupy:**

- Oznacz wszystkie kroki w planie jako ukończone
- Uruchom testy jeśli dotyczą tej grupy
- **ZAPYTAJ** o kontynuację następnej grupy

---

### Faza 3: Walidacja i testowanie

- [ ] **Uruchom testy:**

  ```bash
  npm test
  # lub
  npm run test
  ```

- [ ] **Zweryfikuj implementację:**
  - [ ] Kod się kompiluje bez błędów
  - [ ] Lint przechodzi
  - [ ] Testy przechodzą
  - [ ] Funkcjonalność działa zgodnie z planem

- [ ] **Dokumentacja:**
  - [ ] Dodaj/administruj komentarze w kodzie
  - [ ] Zaktualizuj README jeśli potrzebne

---

### Faza 4: Finalizacja wdrożenia (OBOWIĄZKOWE)

**Po pomyślnym zakończeniu wszystkich kroków planu:**

#### 4.1. Aktualizacja [`docs/implemented_plans.md`](docs/implemented_plans.md):

```markdown
| Numer | Nazwa                 | Status        | Data utworzenia | Data zakończenia |
| ----- | --------------------- | ------------- | --------------- | ---------------- |
| XX    | Nazwa Funkcjonalności | 🟢 Zakończony | YYYY-MM-DD      | YYYY-MM-DD       |
```

#### 4.2. Dodanie do [`docs/implemented_features.md`](docs/implemented_features.md):

```markdown
## [Numer] Nazwa Funkcjonalności

- **Data wdrożenia:** YYYY-MM-DD
- **Plan:** [Nazwa planu](docs/plans/XX_nazwa_funkcjonalnosci.md)
- **Opis:** Krótki opis zaimplementowanej funkcjonalności
- **Główne komponenty:**
  - `src/components/...`
  - `src/lib/...`
  - `src/api/...`
- **Status:** ✅ Ukończone

---
```

#### 4.3. Oznaczenie wszystkich checkboxów w planie jako ukończonych

---

## Wyjście workflow

Po zakończeniu wdrożenia:

```
✅ **Wdrożenie zakończone pomyślnie!**

📋 **Podsumowanie:**
- Plan: `docs/plans/XX_nazwa_funkcjonalnosci.md`
- Status: 🟢 Zakończony
- Zaktualizowane pliki:
  - ✅ `docs/implemented_plans.md` - status zmieniony na "Zakończony"
  - ✅ `docs/implemented_features.md` - dodano wpis

🎯 **Następny krok:** [wskazówka co dalej lub "Brak - wszystko ukończone"]
```

---

## Obsługa błędów

Jeśli napotkasz problem podczas wdrażania:

1. **Zatrzymaj się** i poinformuj użytkownika
2. **Opisz problem** jasno
3. **Zaproponuj rozwiązania:**
   - Obejście (workaround)
   - Alternatywne podejście
   - Modyfikacja planu
4. **Czekaj na decyzję użytkownika** przed kontynuacją

---

## Definicje

| Termin             | Opis                                                      |
| ------------------ | --------------------------------------------------------- |
| **Grupa kroków**   | Logiczny zbiór 2-5 powiązanych kroków do realizacji naraz |
| **Zamknięty krok** | Krok który można w pełni zrealizować bez dalszych decyzji |
| **Checkbox**       | Pole wyboru `[ ]` oznaczone jako `[x]` po ukończeniu      |
