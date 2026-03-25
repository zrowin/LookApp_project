# Prywatność i retention danych (RODO/GDPR)

## Cel
Zdefiniować politykę przechowywania zdjęć i mechanizmy usuwania na żądanie.

## Kryteria akceptacji
- Użytkownik może usunąć wszystkie swoje dane i zdjęcia.
- Polityka prywatności dostępna w aplikacji.

## Kroki implementacji
- Endpoint `DELETE /api/users/:id/data` wykonujący bezpieczne usunięcie zasobów.
- Mechanizm soft-delete + ostateczne czyszczenie po 30 dniach.
- Logging zgód (consent) na przechowywanie zdjęć.

## Szacowany czas
- 2 dni.

## Notatki
- Sprawdzić lokalne wymogi RODO i opcjonalne anonimizacje.