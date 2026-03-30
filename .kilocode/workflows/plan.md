# Workflow: Technical Implementation Plan Creator

## Cel

Tworzenie szczegółowego planu wdrożenia technicznego dla pojedynczej funkcjonalności/domeny aplikacji LookApp.

---

## 🚨 WAŻNE: Zasady działania

**NIE WPROWADZAJ ŻADNYCH ZMIAN W KODZIE!**

- Ten workflow służy WYŁĄCZNIE do tworzenia planów implementacji
- Nie pisz żadnego kodu
- Nie modyfikuj istniejących plików
- Twórz wyłącznie dokumentację planu w formacie Markdown

---

## Kroki tworzenia planu

### Faza 0: Sprawdzenie historii (OBOWIĄZKOWE)

**Przed rozpoczęciem tworzenia jakiegokolwiek planu lub wdrożenia, ZAWSZE wykonaj:**

- [ ] **Sprawdź istniejące plany:** [`docs/plans/`](docs/plans/)
  - Lista wszystkich planów: `ls -la docs/plans/`
  - Przeczytaj [`docs/implemented_plans.md`](docs/implemented_plans.md) - historia wszystkich planów

- [ ] **Sprawdź zaimplementowane funkcjonalności:** [`docs/implemented_features.md`](docs/implemented_features.md)
  - Które funkcjonalności są już wdrożone?
  - Czy planowana funkcjonalność nie jest już zaimplementowana?

- [ ] **Walidacja przed rozpoczęciem:**
  - [ ] Czy funkcjonalność nie jest już zaimplementowana?
  - [ ] Czy nie istnieje już plan dla tej funkcjonalności?
  - [ ] Czy istnieją wymagania techniczne dla tej funkcjonalności?

---

### Faza 1: Analiza wymagań

- [ ] **Zidentyfikuj domenę/funkcjonalność** do zaplanowania
  - Nazwa: `________________`
  - Powiązany plik wymagań: `________________`
  - Priorytet: [ ] Krytyczny / [ ] Wysoki / [ ] Średni / [ ] Niski

- [ ] **Przeanalizuj istniejącą dokumentację:**
  - Przeczytaj [`tech_reqs/technical_requirements.md`](tech_reqs/technical_requirements.md) - wymagania techniczne
  - Przeczytaj [`docs/requirements/tech_requirements.md`](docs/requirements/tech_requirements.md) - dodatkowe wymagania
  - Sprawdź istniejące plany w [`docs/plans/`](docs/plans/) - czy nie ma zależności?
  - Przejrzyj strukturę projektu [`src/`](src/)

- [ ] **Zidentyfikuj zależności:**
  - [ ] Czy funkcjonalność zależy od innych modułów? (jeśli tak, które?)
  - [ ] Czy są gotowe komponenty do wykorzystania?
  - [ ] Jakie API/biblioteki zewnętrzne będą potrzebne?

### Faza 2: Projektowanie rozwiązania

- [ ] **Zdefiniuj zakres techniczny:**
  - Endpointy API (jeśli dotyczy):
    - [ ] `________________`
    - [ ] `________________`
  - Komponenty frontendowe:
    - [ ] `________________`
    - [ ] `________________`
  - Modele bazodanowe:
    - [ ] `________________`
    - [ ] `________________`
  - Integracje zewnętrzne:
    - [ ] `________________`

- [ ] **Określ strukturę plików do utworzenia/modyfikacji:**

  ```
  src/
  ├── components/     → ________________
  ├── lib/            → ________________
  ├── api/            → ________________
  └── types/          → ________________
  ```

- [ ] **Zidentyfikuj punkty decyzyjne (do omówienia):**
  - [ ] `________________`
  - [ ] `________________`

### Faza 3: Tworzenie planu implementacji

Stwórz plik planu w [`docs/plans/`](docs/plans/) o nazwie `XX_nazwa_funkcjonalnosci.md`:

````markdown
# [Numer] Nazwa Funkcjonalności

**Status:** 🟡 W trakcie / 🟢 Zakończony / 🔴 Anulowany

## Opis

Krótki opis funkcjonalności...

## Wymagania

- [ ] Wymaganie 1
- [ ] Wymaganie 2

## Architektura

### Endpointy API

| Metoda | Ścieżka  | Opis |
| ------ | -------- | ---- |
| GET    | /api/... | ...  |

### Struktura danych

```typescript
// Typ/interface...
```
````

## Plan implementacji (kolejność)

### Krok 1: Przygotowanie środowiska

- [ ] Zadanie 1
- [ ] Zadanie 2

### Krok 2: Backend/API

- [ ] Zadanie 1
- [ ] Zadanie 2

### Krok 3: Frontend

- [ ] Zadanie 1
- [ ] Zadanie 2

### Krok 4: Testy i walidacja

- [ ] Zadanie 1
- [ ] Zadanie 2

## Punkty do dyskusji

- Punkt 1: \_\_\_
- Punkt 2: \_\_\_

## Szacowany czas

- Przygotowanie: \_\_ godzin
- Implementacja: \_\_ godzin
- Testy: \_\_ godzin
- **Razem: \_\_ godzin**

---

## 🔄 Aktualizacja statusu (po zakończeniu implementacji)

Po zakończeniu wdrożenia tej funkcjonalności:

1. **Zaktualizuj status planu w** [`docs/implemented_plans.md`](docs/implemented_plans.md):

   ```markdown
   | XX | Nazwa Funkcjonalności | 🟢 Zakończony | YYYY-MM-DD |
   ```

2. **Dodaj zaimplementowaną funkcjonalność do** [`docs/implemented_features.md`](docs/implemented_features.md):
   ```markdown
   ## [Numer] Nazwa Funkcjonalności

   - **Data wdrożenia:** YYYY-MM-DD
   - **Plan:** [Nazwa planu](docs/plans/XX_nazwa_funkcjonalnosci.md)
   - **Opis:** Krótki opis zaimplementowanej funkcjonalności
   - **Główne komponenty:**
     - `src/components/...`
     - `src/lib/...`
   ```

````

### Faza 4: Walidacja planu

- [ ] Plan zawiera wszystkie wymagane sekcje szablonu
- [ ] Plan zawiera pole **Status** z trzema opcjami
- [ ] Plan zawiera sekcję **Aktualizacja statusu** z instrukcjami
- [ ] Zadania są wystarczająco szczegółowe dla jednej sesji AI
- [ ] Nie ma niejasnych lub zbyt ogólnych zadań
- [ ] Zadania są niezależne (mogą być wykonane w dowolnej kolejności w ramach kroku)
- [ ] Plan nie przekracza ~15-20 checkboxów na funkcjonalność

### Faza 5: Rejestracja planu (OBOWIĄZKOWE)

- [ ] **Dodaj plan do** [`docs/implemented_plans.md`](docs/implemented_plans.md):
  ```markdown
  | Numer | Nazwa | Status | Data utworzenia |
  |-------|-------|--------|-----------------|
  | XX | Nazwa Funkcjonalności | 🟡 W trakcie | YYYY-MM-DD |
````

---

## Wyjście workflow

Po zakończeniu workflow, stwórz plik planu i poinformuj:

```
✅ **Plan implementacji został utworzony:** `docs/plans/XX_nazwa_funkcjonalnosci.md`

📋 **Następny krok:** Udostępnij ten plan Agentowi AI Developer do implementacji.

⚠️ **Pamiętaj:**
- Agent nie powinien modyfikować tego planu - tylko implementować zadania
- Po zakończeniu wdrożenia, zaktualizuj status w implemented_plans.md
- Dodaj funkcjonalność do implemented_features.md
```

---

## Definicje

| Termin                    | Opis                                                                            |
| ------------------------- | ------------------------------------------------------------------------------- |
| **Sesja AI**              | Pojedyncza konwersacja z modelem LLM (około 15-30 min)                          |
| **Domena/Funkcjonalność** | Pojedynczy moduł biznesowy (np. "upload obrazów", "tagowanie")                  |
| **Plan**                  | Dokument opisujący kroki implementacji jednej funkcjonalności                   |
| **Status planu**          | 🟡 W trakcie (w realizacji), 🟢 Zakończony (wdrożony), 🔴 Anulowany (porzucony) |

---

## Format statusów planów

| Status     | Emoji | Znaczenie                                    |
| ---------- | ----- | -------------------------------------------- |
| W trakcie  | 🟡    | Plan jest realizowany                        |
| Zakończony | 🟢    | Implementacja została ukończona              |
| Anulowany  | 🔴    | Plan został porzucony/nie będzie realizowany |
