
**1. User Stories**

Autoryzacja
- **Jako** anonimowy użytkownik **chcę** zarejestrować konto, **aby** móc zapisywać i synchronizować swoje stylizacje. — **High**
- **Jako** zarejestrowany użytkownik **chcę** się zalogować/wylogować, **aby** uzyskać dostęp do moich danych. — **High**
- **Jako** użytkownik **chcę** odzyskać hasło, **aby** przywrócić dostęp przy utracie danych logowania. — **Medium**

Zarządzanie zdjęciami
- **Jako** użytkownik **chcę** przesłać zdjęcie ubrania, **aby** dodać je do wirtualnej garderoby. — **High**
- **Jako** użytkownik **chcę** automatycznie usunąć tło z przesłanego zdjęcia, **aby** mieć wycięty produkt gotowy do układania w stylizacjach. — **High**
- **Jako** użytkownik **chcę** zobaczyć status przetwarzania zdjęcia, **aby** wiedzieć kiedy zdjęcie jest gotowe. — **Medium**

Wirtualna garderoba
- **Jako** użytkownik **chcę** przeglądać i filtrować moje zdjęcia/ubrania, **aby** szybko znaleźć elementy do stylizacji. — **High**
- **Jako** użytkownik **chcę** edytować metadane ubrania (tagi, kategoria, kolor), **aby** poprawić wyszukiwanie i rekomendacje. — **Medium**

Budowanie stylizacji (Outfit Builder)
- **Jako** użytkownik **chcę** przeciągać ubrania na płótno i układać stylizację, **aby** tworzyć zestawy. — **High**
- **Jako** użytkownik **chcę** zapisać stylizację, **aby** móc ją później przeglądać lub edytować. — **High**
- **Jako** użytkownik **chcę** cofnąć/ponowić zmiany podczas tworzenia stylizacji, **aby** eksperymentować bez ryzyka. — **Medium**

Zarządzanie stylizacjami
- **Jako** użytkownik **chcę** przeglądać listę zapisanych stylizacji, **aby** wybierać i edytować ulubione zestawy. — **High**
- **Jako** użytkownik **chcę** usuwać lub duplikować stylizacje, **aby** utrzymywać porządek. — **Medium**

Rekomendacje i wyszukiwanie
- **Jako** użytkownik **chcę** otrzymywać rekomendacje ubrań/pairing, **aby** szybciej kompletować stylizacje. — **Medium**
- **Jako** użytkownik **chcę** wyszukać ubrania po tagach i kolorach, **aby** znaleźć pasujące elementy. — **Medium**

Płatności i subskrypcje
- **Jako** użytkownik **chcę** wykupić subskrypcję, **aby** uzyskać dostęp do funkcji premium (np. więcej miejsca, zaawansowane narzędzia). — **High**
- **Jako** użytkownik **chcę** zarządzać metodą płatności i planem, **aby** aktualizować subskrypcję. — **Medium**

Eksport / dzielenie się
- **Jako** użytkownik **chcę** eksportować stylizację do obrazu lub udostępnić w social media, **aby** łatwo dzielić się efektami. — **Medium**

Ustawienia i prywatność
- **Jako** użytkownik **chcę** zarządzać ustawieniami prywatności i usuwaniem danych, **aby** kontrolować swoje informacje. — **High**

Analityka (dla produktu)
- **Jako** właściciel produktu **chcę** widzieć zdarzenia użycia (upload, save outfit, subscribe), **aby** mierzyć zaangażowanie. — **Medium**

**2. User Journeys (Scenariusze użytkownika)**

Nazwa scenariusza: Rejestracja i pierwszy login
Cel użytkownika: Utworzyć konto i wejść do aplikacji, aby zacząć dodawać ubrania.
Kroki:
1. Start: Landing page / CTA "Zarejestruj się".
2. Użytkownik wybiera rejestrację (email/hasło lub OAuth) — decyzja: wybór metody.
3. Wprowadza dane, klika "Zarejestruj".
4. System wysyła email potwierdzający (jeśli wymagane) — edge case: email nie dotarł -> przycisk "Wyślij ponownie".
5. Użytkownik potwierdza i zostaje zalogowany, przechodzi do Onboardingu/ Dashboard.
Możliwe błędy: walidacja pól, konto już istnieje, słabe hasło.

Nazwa scenariusza: Upload zdjęcia i usuwanie tła
Cel użytkownika: Dodać ubranie z wyciętym tłem do garderoby.
Kroki:
1. Start: Widok `Wardrobe` lub `Upload` -> kliknij "Prześlij zdjęcie".
2. Wybór pliku z urządzenia lub przeciągnięcie (drag & drop).
3. System zaczyna przetwarzanie i pokazuje status "Przetwarzanie: usuwanie tła".
4. Po zakończeniu obraz pojawia się w garderobie z automatycznym podglądem wycięcia.
5. Użytkownik uzupełnia tagi/kategorię/kolor i zapisuje metadane.
Decyzje: zaakceptować automatyczne wycięcie czy poprosić o ręczną korektę (jeśli dostępne).
Edge cases: plik zbyt duży, nieobsługiwany format, błąd usługi bg-remove -> retry, powiadomienie o błędzie.

Nazwa scenariusza: Tworzenie i zapisywanie stylizacji (Outfit Builder)
Cel użytkownika: Stworzyć stylizację z elementów garderoby i zapisać ją.
Kroki:
1. Start: Dashboard -> otwórz `Outfit Builder`.
2. Użytkownik przeciąga elementy z `Wardrobe` na płótno.
3. Ustawia pozycje, warstwy, skaluje elementy.
4. Może dodawać notatki, tagi, tytuł.
5. Kliknięcie `Zapisz` -> system tworzy nową pozycję w `Outfits`.
Decyzje: anuluj bez zapisu / zapisz i udostępnij.
Edge cases: brak wystarczającej liczby elementów, konflikt w metadanych, błąd zapisu (offline caching?).

Nazwa scenariusza: Subskrypcja / Płatność
Cel użytkownika: Zakupić plan premium, aby uzyskać dodatkowe funkcje.
Kroki:
1. Start: `Settings`/`Billing` -> kliknij "Subskrybuj".
2. Wybór planu — decyzja: wybór poziomu (miesięczny/roczny).
3. Wprowadzenie danych płatniczych (Stripe Checkout lub integracja API).
4. Potwierdzenie płatności -> otrzymanie potwierdzenia i przyznanie uprawnień premium.
Edge cases: karta odrzucona, problem z autoryzacją Stripe, anulowanie checkout.

**3. Widoki (Screens / Views)**

- **Landing / Home**
  - Cel: Przywitanie, prezentacja wartości, CTA do rejestracji/logowania.
  - Główne elementy UI: hero, lista funkcji, CTA `Zarejestruj się`, `Zaloguj się`.
  - Akcje: przejdź do rejestracji, logowania, poznaj funkcje.
  - Przejścia: -> `Register`, `Login`, `Dashboard` (jeśli zalogowany).

- **Register (Rejestracja)**
  - Cel: zebrać dane do założenia konta.
  - Elementy: formularz (email, hasło), przycisk, link do loginu.
  - Akcje: zarejestruj, potwierdź email.
  - Przejścia: -> `Onboarding` / `Dashboard`.

- **Login (Logowanie)**
  - Cel: umożliwić dostęp do konta.
  - Elementy: email, hasło, przycisk logowania, zapomniane hasło.
  - Akcje: loguj, resetuj hasło.
  - Przejścia: -> `Dashboard`, `Forgot Password`.

- **Dashboard**
  - Cel: centrum zarządzania garderobą i stylizacjami.
  - Elementy: skróty: `Upload`, `Wardrobe`, `Outfit Builder`, `Outfits`, `Billing`.
  - Akcje: szybki upload, otwórz builder, przeglądaj ostatnie stylizacje.
  - Przejścia: -> `Upload`, `Wardrobe`, `Outfit Builder`, `Outfits`, `Settings`.

- **Upload / Przesyłanie zdjęć**
  - Cel: dodać nowe zdjęcie ubrań.
  - Elementy: drag&drop area, przycisk wybierz plik, status przetwarzania, miniatury.
  - Akcje: upload, anuluj, uzupełnij metadane.
  - Przejścia: -> `Wardrobe` po zakończeniu.

- **Wardrobe (Garderoba)**
  - Cel: przeglądać i zarządzać dodanymi ubraniami.
  - Elementy: siatka miniatur, filtry (kategoria, kolor, tagi), elementy akcji (edytuj, usuń).
  - Akcje: kliknij element -> `Item Detail`, przeciągnij do `Outfit Builder`.
  - Przejścia: -> `Outfit Builder`, `Item Detail`.

- **Outfit Builder (Płótno)**
  - Cel: tworzyć zestawy ubrań poprzez przeciąganie i układanie elementów.
  - Elementy: płótno, panel `Wardrobe` po lewej/prawej, narzędzia warstw, cofania, zapisu.
  - Akcje: przeciągnij, ustaw warstwy, zapisz, eksportuj.
  - Przejścia: -> `Outfits` (po zapisie), -> `Share` / `Export`.

- **Outfits (Lista stylizacji)**
  - Cel: przeglądać zapisane stylizacje.
  - Elementy: lista/siatka stylizacji, przycisk `Nowa stylizacja`, akcje (edytuj, usuń, udostępnij).
  - Akcje: otwórz szczegóły, edytuj, usuń, eksportuj.
  - Przejścia: -> `Outfit Builder`, `Outfit Detail`.

- **Outfit Detail**
  - Cel: szczegóły zapisanej stylizacji.
  - Elementy: obraz stylizacji, meta (tytuł, tagi), przyciski: edytuj, udostępnij, kup (linki do sklepów jeśli dostępne).
  - Akcje: edytuj, usuń, udostępnij.
  - Przejścia: -> `Outfit Builder`, `Share`.

- **Settings / Profile / Billing**
  - Cel: zarządzać kontem, subskrypcjami i preferencjami.
  - Elementy: dane konta, plan, metoda płatności, przycisk anuluj subskrypcję.
  - Akcje: edytuj profil, zmień plan, zarządzaj stronami płatności.
  - Przejścia: -> `Billing` provider (Stripe Checkout), -> `Dashboard`.

**4. User Flows (Przepływy między widokami)**

- Flow A: Rejestracja
  Landing -> Register -> Email confirmation -> Onboarding -> Dashboard
  (Alternatywa: Register -> immediate Dashboard jeśli email confirmation optional)

- Flow B: Dodanie ubrania i użycie w stylizacji
  Dashboard -> Upload -> Processing -> Wardrobe -> Outfit Builder -> Save -> Outfits
  (Błędy: Upload fail -> pokaz komunikatu, retry; Processing timeout -> retry lub zgłoś błąd)

- Flow C: Zakup subskrypcji
  Dashboard/Settings -> Billing -> Choose Plan -> Stripe Checkout -> Confirmation -> Feature Unlock
  (Alternatywa: karta odrzucona -> powiadomienie, ponów próbę)

- Flow D: Udostępnienie stylizacji
  Outfits -> Outfit Detail -> Share/Export -> wybierz format (image/social) -> potwierdź
  (Edge: eksport nieudany -> retry, lokalne pobranie jako fallback)

**5. Diagram (pseudodiagram)**

Landing
  ↓
Register/Login ---> Dashboard
                     ↓
            Upload -> Processing -> Wardrobe
                     ↓                 ↓
                 Outfit Builder <--- Outfits
                     ↓
                  Save
                     ↓
                  Outfits -> Share/Export

**6. Braki w specyfikacji / Założenia**

- Braki (należy dostarczyć):
  - Szczegółowe makiety ekranów (pixel-perfect) – brak pełnych ekranów UI.
  - Definicje planów subskrypcji i limitów (przestrzeń, liczba stylizacji).
  - Dokładne API dla usuwania tła (response shape, timeouty, retry policy).
  - Schemat bazy danych (tabele: users, items, outfits, tags) i pola.
  - Mapowanie zdarzeń analitycznych (które akcje są śledzone i z jakimi właściwościami).
  - Polityka retencji danych i export/privacy endpoints.

- Założenia (przyjęte dla specyfikacji):
  - Autoryzacja: użyty Supabase Auth (email/password + OAuth).
  - Przetwarzanie obrazów: istnieje usługa background removal (asynchroniczna).
  - Płatności: integracja przez Stripe (Checkout lub API).
  - Aplikacja działa responsywnie (desktop i mobile), ale detale layoutu dla mobile wymagają makiet.

Zalecenia krótkoterminowe (do wdrożenia dla MVP):
- Dostarczyć minimalne makiety kluczowych ekranów: Upload, Wardrobe, Outfit Builder, Billing.
- Zdefiniować API dla upload/processing z jasnymi kodami błędów i timeoutami.
- Przygotować listę zdarzeń analitycznych (upload, processed, save_outfit, subscribe).
- Określić plany subskrypcji i ograniczenia dla kont darmowych vs premium.


