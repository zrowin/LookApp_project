# Contributing

Dziękujemy za zainteresowanie wkładem do LookApp. Krótki przewodnik konwencji i procesu PR.

1. Konwencje nazewnictwa
- Katalogi i techniczne pliki: angielski (np. `src`, `docs`, `tests`).
- Pliki dokumentacji i skrypty: preferowane `kebab-case`.

2. Commity i PR
- Commit messages: krótkie podsumowanie + (opcjonalnie) szczegóły w opisie.
- Otwieraj PRy z opisem zmian, wpływem na CI, oraz krokami migracji jeśli zmieniasz strukturę katalogów >1 poziom.

3. Struktura katalogów i pliki README
- Każdy ważniejszy katalog powinien mieć `README.md` z: Purpose, Important files, How to run, Notes.

4. Uruchomienie lokalne
- Windows (PowerShell):
```
npm run install:windows
npm run start:windows
```
- Cross-platform:
```
npm ci
npm run dev
```

5. Testy
- Umieszczaj testy w `tests/` z mirrorową strukturą do `src/`.
- Dane testowe w `tests/fixtures`.

6. Bezpieczeństwo
- Nie dodawaj sekretów do repo. Użyj `.env.example` jako wzorca.

7. CODEOWNERS i właściciele
- Zaktualizuj `CODEOWNERS` aby przypisać właścicieli katalogów.

8. Kontakt
- W przypadku wątpliwości otwórz issue z tagiem `question` lub skontaktuj się z właścicielami repo.
