SPECYFIKACJA WYGLĄDU APLIKACJI – LookApp

1. Ogólny styl aplikacji

Aplikacja LookApp wykorzystuje minimalistyczny, ciemny interfejs (dark mode), który:
- eksponuje zdjęcia ubrań
- ogranicza rozpraszające elementy
- nadaje nowoczesny, modowy charakter

Dominują:
- kontrast czerni i bieli
- proste ikony
- siatkowy układ treści (grid)

2. Kolorystyka

Kolory główne
Czarny (tło główne)
#000000
→ używany jako tło większości ekranów
Biały (tekst / nagłówki)
#FFFFFF
→ kontrastowy tekst
Jasnoszary (sekcje / header)
#F2F2F2
→ np. górny pasek

Kolory pomocnicze
Szary (ikony / nieaktywne elementy)
#A0A0A0
Ciemnoszary (tła elementów UI)
#2A2A2A

3. Typografia

Główna czcionka
Inter
(czytelność + standard w aplikacjach mobilnych)

Hierarchia tekstu
Nagłówki (np. "TWOJA SZAFA", "INSPIRACJE")
- rozmiar: 20–24 px
- grubość: SemiBold / Bold
- kolor: biały
Tekst menu
- rozmiar: 16–18 px
- grubość: Medium
Tekst pomocniczy
- rozmiar: 12–14 px
- kolor: szary

4. Ikony

Styl ikon:
- monochromatyczne (białe / szare)
- proste, liniowe
- spójne wizualnie
Ikony reprezentują:
- szafę
- inspiracje
- ulubione
- ubrania
- wiadomości

5. Układ (Layout)

Siatka (grid)
- układ 2–3 kolumnowy
- zdjęcia w równych proporcjach (kwadraty)
- odstępy: 8–12 px

Ekran „Twoja szafa”
- grid zdjęć ubrań
- brak ramek (czyste zdjęcia)
- przewijanie pionowe

(Ewentualne implementacje)

Ekran „Inspiracje”
- lista kategorii:
  - Prywatne
  - Dla znajomych
  - Publiczne
  - Obserwowani
- układ listy (vertical list)

6. Komponenty UI

Karty (zdjęcia ubrań)
- brak obramowania
- lekko zaokrąglone rogi (np. 8 px)
- cień: brak lub bardzo subtelny

Przyciski
- minimalistyczne
- bez obramowania lub z lekkim tłem
efekt kliknięcia (propozycja):
- zmiana koloru / podświetlenie

Nawigacja
- górny pasek (logo + ustawienia)
- ikony jako główna forma nawigacji

7. Styl wizualny (UX/UI kierunek)

Aplikacja wpisuje się w styl:
- modowy / lifestyle
- inspirowany Instagram / Pinterest
- nacisk na content (zdjęcia > UI)

8. Możliwe implementacje

- dodanie koloru akcentowego (obecnie brak hierarchii interakcji)
- ujednolicenie ikon
- dodanie stanów:
  - hover / active
  - loading
  - większe wyróżnienie aktywnej sekcji

9. Spójność

Całość powinna zachować:
- jeden font
- jedną grubość ikon
- stałe odstępy (spacing system)

Podsumowanie

LookApp to minimalistyczna aplikacja modowa oparta na:
- ciemnym motywie
- gridzie zdjęć
- prostym UI
