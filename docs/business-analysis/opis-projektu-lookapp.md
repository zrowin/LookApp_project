# LookApp — opis projektu

## Cel produktu

LookApp to aplikacja web + mobile (SaaS) do zarządzania garderobą i tworzenia outfitów. Umożliwia użytkownikom wgrywanie zdjęć ubrań, organizowanie ich w wirtualnej garderobie, tworzenie stylizacji z realnych zdjęć oraz otrzymywanie wizualnych rekomendacji i inspiracji zakupowych.

## Użytkownik końcowy

- osoby zainteresowane modą
- osoby chcące lepiej wykorzystywać swoją garderobę
- użytkownicy mobile-first
- influencerzy, twórcy, brand lovers

## MVP — kluczowe funkcje

### 1. Rejestracja / logowanie

- e-mail / Google / Apple
- profil użytkownika
- zapis preferencji (styl, okazje, kolory, budżet — opcjonalnie)

### 2. Wirtualna garderoba

- dodawanie zdjęć ubrań (kamera / upload)
- tagowanie: typ, kolor, materiał, styl
- automatyczne usuwanie tła (AI)
- kategoryzacja elementów

### 3. Tworzenie outfitów

- przeciąganie elementów na canvas
- układanie zestawów z własnych zdjęć
- zapisywanie outfitów i oznaczanie okazji

### 4. Dopasowanie wizualne (AI)

- analiza kolorów, stylów, faktur
- ocena dopasowania: „pasuje / średnio / nie pasuje”
- sugerowanie alternatyw z garderoby użytkownika

### 5. Inspiracje i rekomendacje braków

- feed stylizacji
- wskazanie brakujących elementów (np. „brakuje czarnych loafersów”)
- wizualne dopasowanie brakujących elementów i linki do sklepów

### 6. Wyszukiwanie po obrazie

- rozpoznawanie typów ubrań na zdjęciu
- dopasowanie do rzeczy z garderoby
- sugerowanie podobnych produktów online

## Model biznesowy (SaaS)

- Freemium: darmowy limitowany plan (np. do X rzeczy i Y outfitów)
- Premium: nielimitowana garderoba, AI stylist, rekomendacje zakupowe
- Affiliate: prowizje od zakupów z linków partnerskich

## Architektura (high level)

- Frontend: Web (Next.js / React), Mobile (React Native / Expo lub Flutter)
- Backend: Node.js / NestJS (API), Auth: OAuth + JWT
- Baza danych: PostgreSQL (lub Firebase jako alternatywa)
- Storage: AWS S3 / GCP
- AI / CV: modele do rozpoznawania ubrań, usuwania tła, generowania embeddingów, similarity search

## Prywatność i bezpieczeństwo

- przechowywanie zdjęć prywatnie (domyślnie prywatne kolekcje)
- usuwanie danych na żądanie (RODO)
- szyfrowanie tokenów i bezpieczne przechowywanie danych

## Etapy realizacji

1. MVP: logowanie, dodawanie ubrań, tworzenie outfitów, zapisywanie i edycja
2. AI + rekomendacje: background removal, matching, rekomendacje braków
3. Integracje e-commerce i model monetyzacji (affiliate, marketplace)

## Unikalna wartość

- realne zdjęcia użytkownika jako baza stylizacji (nie stocki)
- połączenie managera garderoby z wizualnym stylistą i inspiratorem zakupowym

## Cel długofalowy

LookApp ma stać się osobistym stylistą i planerem stylizacji, pomagając użytkownikom podejmować świadome decyzje zakupowe i lepiej wykorzystywać swoją garderobę.


