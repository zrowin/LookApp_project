# Rejestracja, logowanie i onboarding

## Cel
Zapewnić prostą rejestrację (email + social opcjonalnie) oraz onboarding "dodaj 3 rzeczy → stwórz pierwszy outfit".

## Kryteria akceptacji
- Rejestracja email + reset hasła działa.
- Onboarding prowadzi użytkownika przez dodanie min. 3 elementów i stworzenie pierwszego outfit.

## Kroki implementacji
- Auth: JWT lub sesje; endpointy `/api/auth/register`, `/api/auth/login`, `/api/auth/forgot`.
- Frontend: flow onboarding, progress tracker, CTA do uploadu.

## Bezpieczeństwo
- Hasła haszowane (bcrypt), limity prób logowania, email verification.

## Testy
- E2E: rejestracja → upload 3 zdjęć → zapis outfit.

## Szacowany czas
- 3 dni.