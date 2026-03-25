# Billing i subskrypcje (Stripe)

## Cel
Uruchomić prosty model freemium z integracją Stripe dla płatnych planów.

## Kryteria akceptacji
- Użytkownik może wykupić subskrypcję przez Stripe i widzieć status konta.
- Webhooki Stripe poprawnie obsługują zdarzenia (invoice.paid, customer.subscription.deleted).

## Kroki implementacji
- Backend: integracja Stripe (checkout session, webhooks), endpoint `GET /api/subscription`.
- Frontend: page z planami, checkout flow, panel konta z info o subskrypcji.

## Bezpieczeństwo
- Przechowywanie tylko niezbędnych danych, korzystanie z webhook secret.

## Testy
- Test sandbox Stripe + symulacja webhooków.

## Szacowany czas
- 2–3 dni.