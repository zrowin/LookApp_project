# Implemented Plans

Lista wszystkich planów implementacji projektu LookApp.

| Numer | Nazwa | Status | Data utworzenia | Data zakończenia |
|-------|-------|--------|-----------------|------------------|
| 00 | Bootstrap Next.js Application | 🟢 Zakończony | 2026-03-26 | 2026-03-26 |

## 01 - Dodawanie zdjęć ubrań

- **Cel:** Umożliwić użytkownikom dodawanie zdjęć ubrań do aplikacji, ich przechowywanie oraz podstawową walidację i optymalizację.
- **Opis:** Interfejs pozwala na upload zdjęć (pojedynczo i hurtowo), tworzy miniatury, przechowuje pliki w storage (np. Supabase Storage) i zapisuje metadane w tabeli `clothing_items`.
- **Opis:** Interfejs pozwala na upload zdjęć (pojedynczo i hurtowo), tworzy miniatury, przechowuje pliki w storage (np. Supabase Storage) i zapisuje metadane w lokalnej bazie Dexie.js (IndexedDB) w tabeli `clothing_items`. Aplikacja powinna wspierać opcjonalną synchronizację metadanych z backendem/remote storage.
- **Kroki implementacji:**
	1. Stworzyć UI uploadu w `src/components/features/upload` (drag & drop, podgląd, progres).
	2. Backend: endpoint do przyjmowania plików i zapis w storage; zapisywanie metadanych (owner, nazwa pliku, wymiary, rozmiar, hash, timestamp).
	3. Optymalizacja: generowanie miniatur i wersji webp; limit rozmiaru plików i walidacja typów.
	4. (Opcjonalne) Integracja z serwisem do usuwania tła lub normalizacji (background removal).
- **Wymagania:** uprawnienia zapisu do storage, schemat DB dla `clothing_items`, autoryzacja użytkownika.
- **Wymagania:** uprawnienia zapisu do storage, schemat DB dla `clothing_items` w Dexie.js (IndexedDB), autoryzacja użytkownika oraz mechanizm opcjonalnej synchronizacji z backendem.
- **Testy akceptacyjne:** upload działa, plik jest dostępny w storage, rekord w DB zawiera poprawne metadane.

## 02 - Kategoryzacja ubrań (tagowanie)

- **Cel:** Umożliwić przypisywanie kategorii i tagów do zdjęć ubrań (np. typ: koszula, kolor: czerwony, styl: casual).
- **Opis:** System wspiera ręczne tagowanie przez użytkownika oraz automatyczne etykietowanie (ML/autotagging) jako opcję.
- **Kroki implementacji:**
	1. Zaprojektować model danych: tabele `categories`, `tags`, oraz relacje z `clothing_items` (wiele-do-wielu).
	2. UI do edycji metadanych i przypisywania tagów w widoku pojedynczego elementu oraz w widoku listy (bulk edit).
	3. Implementacja endpointu autotagging: przyjmowanie obrazu, zwracanie proponowanych tagów; integracja z serwisem ML lub lokalnym modelem.
	4. Rozszerzyć wyszukiwanie/filtry o nowe pola (kategoria, tagi, kolor, materiał).
- **Wymagania:** dostęp do modelu/autotaggera (może być zewnętrzny serwis), migracje DB, UI/UX do zarządzania tagami.
- **Wymagania:** dostęp do modelu/autotaggera (może być zewnętrzny serwis), migracje DB/aktualizacja schematu Dexie.js, UI/UX do zarządzania tagami.
- **Testy akceptacyjne:** ręczne tagowanie i autotagging zwracają sensowne tagi; filtry zwracają oczekiwane wyniki.

## 03 - Dobieranie zdjęć — tworzenie stroju (Outfit Builder)

- **Cel:** Pozwolić użytkownikom łączyć pojedyncze zdjęcia ubrań w kompletne stylizacje (outfity), zapisywać je i dzielić się nimi.
- **Opis:** Interfejs typu canvas pozwalający przeciągać elementy ubrań, składać outfit ręcznie oraz proponować automatyczne dopasowania na podstawie reguł (typy odzieży, kolory, kontekst).
- **Kroki implementacji:**
	1. Model danych: tabela `outfits` z listą powiązanych `clothing_item_ids`, metadanymi (nazwa, opis, cover image, owner, timestamp).
	2. UI: `src/components/features/outfits` — builder z widokiem siatki/kanwy, możliwość wyboru i pozycjonowania elementów, zapisu i podglądu.
	3. Silnik dopasowań: najpierw reguły heurystyczne (np. nie łączyć dwóch spodni), następnie rozszerzenie o rekomendacje ML (kolor harmony, styl, okazja).
	4. Funkcje dodatkowe: zapisywanie wersji, udostępnianie linków, eksport obrazów/siatki do mediów społecznościowych.
- **Wymagania:** relacje między elementami a outfitami w DB, interfejs drag&drop, ewentualny serwis rekomendacyjny.
- **Wymagania:** relacje między elementami a outfitami w schemacie Dexie.js (IndexedDB), interfejs drag&drop, ewentualny serwis rekomendacyjny.
- **Testy akceptacyjne:** użytkownik może stworzyć outfit z wybranych ubrań, zapisać go i ponownie załadować; automatyczne sugestie są sensowne.

## 04 - Komunikaty i informacje zwrotne (UX feedback)

- **Cel:** Zapewnić użytkownikom jasne informacje zwrotne przy kluczowych akcjach (np. upload zdjęcia, zapis outfitu, zastosowanie tagów), aby potwierdzić powodzenie lub pokazać błąd.
- **Opis:** System wyświetla krótkie, kontekstowe komunikaty (toasty/alerts) po zakończeniu akcji: sukces, ostrzeżenie, błąd. Komunikaty mają być lokalizowalne, dostępne dla czytników ekranowych i nie blokujące przepływu użytkownika.
- **Kroki implementacji:**
	1. Wybrać bibliotekę lub napisać prosty system powiadomień (np. komponent `Toast` w `src/components/ui` lub dedykowany hook `useToast`).
	2. Zintegrować powiadomienia z miejscami akcji: upload (sukces/błąd), autotagging (wynik/timeout), zapis outfitów (sukces/błąd), synchronizacja (status offline/online, konflikty).
	3. Dodać obsługę dostępności: role ARIA, fokus opcjonalny, wyłączenie automatycznego timeoutu przy błędach krytycznych.
	4. Zapewnić mechanizm globalny (provider/context) do wywoływania komunikatów z dowolnego miejsca aplikacji.
	5. (Opcjonalne) Dodać historię komunikatów lub możliwość wyświetlania bardziej szczegółowych logów w panelu debugowym użytkownika.
- **Wymagania:** komponent `Toast`/hook `useToast`, integracja z `src/components/features/upload`, `src/components/features/outfits`, obsługa lokalizacji i dostępności.
- **Testy akceptacyjne:** po dodaniu zdjęcia pojawia się komunikat sukcesu; przy błędzie uploadu pojawia się komunikat błędu z sugestią działania; komunikaty są czytelne dla czytników ekranowych.

---

**Priorytety i oszacowanie:**
- Krótkoterminowe (MVP): `01 Dodawanie zdjęć ubrań` (wysoki priorytet, 1–2 sprinty).
- Średni termin: `02 Kategoryzacja` (po dodaniu uploadu; 1–2 sprinty + integracja autotaggingu).
- Dłuższy termin: `03 Dobieranie zdjęć — Outfit Builder` (zależne od modelu rekomendacji; 2–4 sprinty).

Powiązane pliki i komponenty: `src/components/features/upload`, `src/components/features/outfits`, `src/lib/utils.ts`, inicjalizacja schematu Dexie.js (np. `src/lib/db.ts`) dla tabel `clothing_items`, `tags`, `outfits` oraz opcjonalny mechanizm synchronizacji z backendem/remote storage.
