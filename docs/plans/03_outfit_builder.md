# Prosty canvas / Drag&Drop Outfit Builder

## Cel
Pozwoli użytkownikowi skomponować outfit przeciągając swoje elementy na canvas i zapisać gotowe stylizacje.

## Kryteria akceptacji
- Użytkownik może przeciągnąć elementy z biblioteki do canvasu, zmieniać rozmiar/pozycję i zapisać outfit.
- Time-to-first-outfit < 2 min (UX prosty i responsywny).

## Kroki implementacji
- Frontend: canvas z warstwami (HTML5 Canvas / CSS + draggable), panel biblioteki zdjęć, controls (scale/rotate/delete).
- Backend: zapis stanu outfit (lista elementów z pozycjami i transformacjami) w `POST /api/outfits`.

## API
- `POST /api/outfits` — zapisuje outfit: ownerId, items[{imageId, x,y,scale,rotation}], title, tags.
- `GET /api/outfits/:id` — pobiera outfit do edycji/podglądu.

## Dane
- Outfit: id, ownerId, items[], thumbnailUrl, createdAt, public/private.

## Testy
- Zapisywanie/odtwarzanie pozycji elementów, responsywność na mobile.

## Szacowany czas
- MVP (podstawowe drag&drop + zapis): 3–5 dni.