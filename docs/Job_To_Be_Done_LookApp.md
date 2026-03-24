# Job To Be Done — LookApp

Dokument opracowany na podstawie szablonu WF_Job_To_Be_Done.md i opisu projektu LookApp. Krótkie, praktyczne mapowanie zadań użytkownika, oczekiwanych rezultatów, hipotez oraz eksperymentów walidacyjnych.

## Kontekst
Użytkownicy mają zdjęcia swoich ubrań, chaos w szafie lub brak czasu na komponowanie stylizacji. LookApp ma dać szybką wartość: gotowy outfit z rzeczy użytkownika, dopasowany do okazji i preferencji.

## Główny Job (core JTBD)
Kiedy muszę szybko wybrać, co założyć na określoną okazję, chcę otrzymać gotowy, wizualny outfit z mojej garderoby, aby nie tracić czasu i czuć się pewnie.

## Powiązane joby
- Organizacja garderoby: katalogowanie i szybkie wyszukiwanie elementów.
- Inspiracja: przegląd stylizacji i rekomendacje braków.
- Tworzenie treści: estetyczny eksport looków do social.
- Zakup: szybkie uzupełnienie brakujących elementów przez linki afiliacyjne.

## Jobs — funkcjonalne / emocjonalne / społeczne
- Funkcjonalne: dodaj ubranie, zbuduj outfit, zapisz outfit, znajdź podobne przedmioty.
- Emocjonalne: poczucie stylu i pewność siebie.
- Społeczne: możliwość pokazania looka online, wzrost społecznego uznania (influencerzy).

## Pain points (ból użytkownika)
- Chaos i brak uporządkowanej garderoby.
- Zbyt dużo opcji → decyzje trwają długo.
- Brak narzędzia do szybkiego wizualnego komponowania zestawów.
- Obawy o prywatność zdjęć.
- Niedokładne rekomendacje AI (fałszywe dopasowania).

## Desired outcomes (wyniki, które użytkownik uzna za sukces)
- Time-to-outfit < 2 min od wejścia do aplikacji.
- Możliwość zapisania pierwszego outfitu w < 5 min od rejestracji.
- 7-day retention > 20% dla aktywnych early users.
- Średnio ≥ 3 elementy dodane na użytkownika w pierwszym tygodniu.
- % użytkowników konwertujących do premium po 30 dniach (cel 3–5%).

## Obecne alternatywy / obejścia
- Notatki i foldery w telefonie.
- Pinterest / Instagram jako źródło inspiracji (ale nie personalizowane do garderoby).
- Konsultacje stylistów (kosztowne).

## Hipotezy kluczowe (do testowania)
H1: Użytkownicy uznają za wartościowe szybkie, wizualne sugestie outfitów z ich własnych zdjęć → zwiększa retencję.
H2: Prosty builder + background removal daje wystarczającą wartość, by część użytkowników zapłaciła za subskrypcję.
H3: Influencerzy będą promować aplikację jeżeli eksport looków do social będzie estetyczny i łatwy.

## MVP — mapowanie funkcji na JTBD
- Upload zdjęć + background removal → pozwala zbudować garderobę (podstawa job).
- Tagowanie i kategoryzacja → przyspiesza wyszukiwanie i rekomendacje.
- Prosty canvas / drag&drop outfit builder → core JTBD (time-to-outfit).
- AI matching (pasuje/średnio/nie pasuje) → poprawia trafność rekomendacji.
- Eksport społecznościowy → wspiera social job i virality.
- Proste onboarding: dodaj 3 rzeczy → stwórz pierwszy outfit (redukuje time-to-value).

## Proponowane eksperymenty walidacyjne (szybkie, niskokosztowe)
1. Landing + pre-signups: komunikat „zbuduj pierwszy outfit z 3 zdjęć” → test CTR / zapisy.
2. Concierge MVP: ręczna obróbka background removal + manualne sugestie stylisty (Slack / DM) dla 10 użytkowników → zbadać time-to-value i feedback.
3. Prototyp clickable (Figma/HTML) z flow upload → mierzyć time-to-first-outfit w testach z userami.
4. A/B onboarding (dodaj 1 vs 3 elementy) → porównać D1/D7 retencję.
5. Test eksportu do social: zapytaj 20 micro-influencerów, czy użyją looków do postów (mierzyć intent share).

## Metryki do monitorowania
- Time-to-first-outfit
- D1 / D7 / D30 retention
- Liczba dodanych elementów / użytkownik / tydzień
- Liczba zapisanych outfitów / użytkownik
- Conversion rate freemium → premium
- CAC dla kanałów influencer / organic

## Assumptions (najważniejsze założenia)
- Użytkownicy chcą wrzucać prywatne zdjęcia garderoby.
- Usuwanie tła i prosty builder wystarczą do osiągnięcia wartości.
- Istnieje wystarczający wolumen micro-influencerów chętnych do promocji.

## [RISKS]
- Prywatność/nieufność do przechowywania zdjęć → może blokować adopcję.
- Słaba jakość automatycznego background removal / matching → niski retention.
- Wysokie koszty AI/obróbki obrazów (jeśli skalować).
- Niski willingness-to-pay; affiliate może nie wystarczyć na stabilny revenue.
- Duża konkurencja w obszarze fashion apps i discovery.

## Rekomendowane następne kroki (konkretne)
1. Uruchomić landing z pre-signup + value proposition „pierwszy outfit z 3 zdjęć” (1 tydzień).
2. Zrekrutować 10–20 userów do concierge MVP i przeprowadzić zadania i nagrania sesji (2 tygodnie).
3. Zbudować prosty prototyp upload + manual background removal + drag&drop (technologia prostego stacku — no-code lub minimal Next.js) → mierzyć Time-to-first-outfit.
4. Zebrać UX feedback i KPI, decide: iterować AI vs manual proces.

---

Kluczowe pytanie: Które założenie chcesz zweryfikować w pierwszym eksperymencie — że użytkownicy w ogóle wrzucą prywatne zdjęcia (adopcja), czy że szybkie sugestie outfitów wystarczą, by ich zatrzymać (retencja)?