# SPECYFIKACJA FRONTENDU – LookApp

## 1. Założenia ogólne

Aplikacja mobilna/webowa typu **fashion / wardrobe manager** z naciskiem na:
- zarządzanie ubraniami
- tworzenie stylizacji (drag & drop)
- inspiracje wizualne

Styl:
- dark mode (czarne tło)
- minimalistyczny UI
- content-first (zdjęcia są najważniejsze)

---

## 2. Ekran logowania

**Opis:**
- Ekran dostarczany zewnętrznie (nie implementujemy logiki)
- Styl:
  - tło: białe (#FFFFFF)
  - typografia: czarna (#000000)

**Zachowanie:**
- Po poprawnym logowaniu → przekierowanie do ekranu „Szafa”

---

## 3. Globalna nawigacja (górny panel)

Widoczna na wszystkich głównych ekranach.

### Struktura:
5 ikon (od lewej do prawej):

1. Szafa  
2. Dodaj ubranie  
3. Przymierzalnia  
4. Ulubione  
5. Konto  

### Zachowanie:
- aktywna zakładka:
  - wyróżniona kolorem (np. biały / akcent)
- nieaktywne:
  - kolor szary
- kliknięcie → przejście do widoku

---

## 4. Ekran: Szafa (główny ekran po logowaniu)

### Cel:
Zarządzanie kolekcją ubrań w formie „półek” (folderów).

---

### 4.1 Sekcje (półki)
- wygląd:
  - zaokrąglone prostokąty
  - wewnątrz podgląd zdjęć (miniatury)
  - nad sekcją: nazwa folderu

- funkcjonalność:
  - dodawanie nowej sekcji
  - edycja nazwy
  - usuwanie sekcji
  - wejście do sekcji (klik)

---

### 4.2 Stan pusty
Jeśli brak sekcji:
- wyświetl:
  - duży przycisk "+"
  - tekst: „Dodaj pierwszą półkę”

---

### 4.3 Widok wewnątrz sekcji
- grid zdjęć (ubrania)

**Akcje:**
- podgląd zdjęcia
- usunięcie
- edycja / zamiana

---

## 5. Ekran: Dodaj ubranie

### 5.1 Upload zdjęcia
- wybór zdjęcia z urządzenia

---

### 5.2 Podgląd
- wyświetlenie przybliżonego zdjęcia

---

### 5.3 (PRZYSZŁOŚCIOWO) Background removal
- pokazanie obrysu wykrytego ubrania

**Użytkownik:**
- akceptuje lub odrzuca wynik

---

### 5.4 Kategoryzacja (WYMAGANA)

Panel pod zdjęciem:

- Typ ubrania (REQUIRED)
- Kolor
- Styl (multi-select)
- Opis (tekst)

**Warunek:**
- użytkownik nie może przejść dalej bez wyboru typu ubrania

---

### 5.5 Zapis
- dodanie do wybranej sekcji (szafy)

---

## 6. Ekran: Przymierzalnia

### Cel:
Tworzenie stylizacji metodą drag & drop

---

### 6.1 Layout
- centralny obszar roboczy (canvas)
- panel szafy po prawej stronie
- panel podpowiedzi (opcjonalny)

---

### 6.2 Interakcje

#### Drag & Drop:
- użytkownik przeciąga ubrania z panelu
- upuszcza w dowolnym miejscu

#### Elementy:
- można:
  - przesuwać
  - nakładać na siebie
  - dowolnie układać

---

### 6.3 Usuwanie
- każdy element posiada mały "X" w rogu
- kliknięcie → usuwa z canvasu

---

### 6.4 Zapisywanie stylizacji
- lewy dolny róg:
  - ikona serca ❤️

**Kliknięcie:**
- zapisuje aktualny stan canvasu
- przenosi do „Ulubione”

---

### 6.5 Podpowiedzi (opcjonalne)
- sugestie na podstawie:
  - stylu
  - koloru

---

## 7. Ekran: Ulubione

### Cel:
Przechowywanie zapisanych stylizacji

---

### Struktura:
- podobna do „Szafy” (grid)

---

### Elementy:
- zapisane stylizacje jako miniatury

**Akcje:**
- kliknięcie → podgląd
- dodanie opisu
- usunięcie stylizacji

---

## 8. Ekran: Konto

### Struktura:

Lista sekcji:
1. Moje dane
2. Ustawienia konta
3. O nas

---

### 8.1 Moje dane
- możliwość edycji:
  - imię
  - email
  - inne dane użytkownika

---

### 8.2 Ustawienia konta
- ustawienia aplikacji

---

### 8.3 O nas
- statyczne informacje

---

## 9. Zachowania globalne

- aplikacja działa w dark mode
- zdjęcia są głównym elementem UI

**Interakcje:**
- klik
- drag & drop

- wszystkie akcje powinny mieć feedback (np. highlight, animacja)

---

## 10. Stany aplikacji

Należy obsłużyć:
- brak danych (empty state)
- loading
- błąd (np. upload zdjęcia)

---

# Podsumowanie

Frontend aplikacji składa się z 5 głównych modułów:
- Szafa
- Dodawanie ubrań
- Przymierzalnia
- Ulubione
- Konto

Najważniejsze funkcje:
- organizacja ubrań w sekcje
- tworzenie stylizacji
- zapis i przegląd outfitów

Aplikacja opiera się na prostym, intuicyjnym UI i silnej interakcji wizualnej.