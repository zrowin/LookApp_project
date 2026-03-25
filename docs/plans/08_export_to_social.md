# Eksport do social / generowanie grafik

## Cel
Umożliwić użytkownikowi eksport estetycznej grafiki outfitów (rozmiary dla Instagram/Stories) i szybkie dzielenie się.

## Kryteria akceptacji
- Możliwość wygenerowania grafiki w formatach: square (1080x1080) i story (1080x1920).
- Przyciski share (kopiuj link / share intent mobile).

## Kroki implementacji
- Backend: endpoint generujący obraz na podstawie zapisanych itemów/outfit (headless browser lub server-side rendering canvas).
- Frontend: UI exportu, opcje formatu.

## 3rd-party
- Biblioteki: Puppeteer/Playwright (render HTML→PNG) lub node-canvas.

## Szacowany czas
- 2–4 dni.