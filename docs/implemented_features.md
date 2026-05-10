# Implemented Features

Lista wdrozonych funkcjonalnosci projektu LookApp oraz zakresow, ktore nadal sa w toku.

## Mapa dokumentow

- Full navigation: [Mapa dokumentow - NAVIGATION.md](NAVIGATION.md)

## [00] Bootstrap Next.js Application

- **Data wdrozenia:** 2026-03-26
- **Plan:** [00 - Bootstrap Next.js Application](plans/00_nextjs_bootstrap.md)
- **Opis:** Inicjalizacja aplikacji Next.js z App Router, TypeScript, Tailwind CSS, podstawowymi komponentami UI, klientami Supabase i szkieletem routingu.
- **Status:** Completed

### Wdrozone aspekty

- [x] Struktura App Router: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- [x] Podstawowe strony aplikacji: dashboard, upload, wardrobe, try-on, outfits, login, register, favorites
- [x] Komponenty bazowe UI: `Button`, `Input`, `Card`, `TopNav`
- [x] Konfiguracja TypeScript, Tailwind, ESLint i Prettier
- [x] Klient Supabase po stronie przegladarki: `src/lib/supabase/client.ts`
- [x] Szkielet klienta Supabase po stronie serwera/admina: `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`
- [x] Hook uzytkownika i middleware auth: `src/hooks/useUser.ts`, `src/middleware.ts`
- [x] Podstawowe typy domenowe: `src/types/index.ts`, `src/types/db.ts`
- [x] Pipeline CI: `.github/workflows/ci.yml`

---

## [01] Dodawanie zdjec ubran (Upload + Storage + Miniaturki)

- **Data wdrozenia:** 2026-04-20
- **Plan:** [01 - Upload and Background Removal](plans/01_upload_and_bg_removal.md)
- **Opis:** Zaimplementowano upload obrazow, zapis do Supabase Storage, zapis podstawowych metadanych do tabeli `images`, generowanie miniaturek WebP oraz UI z podgladem i walidacja.
- **Status:** In progress - gotowe sa upload, storage i miniaturki; background removal nie jest jeszcze wdrozony.

### Wdrozone aspekty

- [x] UI uploadu z wyborem wielu plikow, drag and drop i lokalnym podgladem: `src/components/features/upload/Upload.tsx`
- [x] Walidacja typu pliku i limitu 10 MB po stronie klienta
- [x] Endpoint `POST /api/upload` przyjmujacy `fileBase64`: `src/app/api/upload/route.ts`
- [x] Zapis oryginalnego pliku do bucketu `clothing-images`
- [x] Generowanie miniaturki WebP przez `sharp`: `src/lib/images/thumbnail.ts`
- [x] Zapis miniaturki do Supabase Storage
- [x] Rozwiazywanie adresow storage przez signed/public URL: `src/app/api/storage-url/route.ts`
- [x] Zapis metadanych obrazu do tabeli `images`: `id`, `owner_id`, `original_url`, `processed_url`, `status`, `created_at`
- [x] Fallback do `data:image/...` dla lokalnego podgladu, gdy storage URL nie jest dostepny
- [x] Test integracyjny uploadu z mockiem Supabase: `tests/upload.integration.test.js`
- [ ] Usuwanie tla przez zewnetrzny serwis lub model lokalny
- [ ] Pelny zapis wymiarow, rozmiaru, hasha i nazwy pliku w metadanych
- [ ] Endpoint pobierania metadanych pojedynczego obrazu, np. `GET /api/images/:id`

---

## [02] Kategoryzacja ubran i reczne tagowanie

- **Data wdrozenia:** 2026-04-21
- **Plan:** [02 - Auto-tagging](plans/02_auto_tagging.md)
- **Opis:** Wdrozone sa podstawowe mechanizmy recznej kategoryzacji podczas uploadu: wybor polki, koloru, stylow oraz opisu. Automatyczne tagowanie ML nie jest jeszcze wdrozone.
- **Status:** In progress - reczne tagowanie dziala, autotagging jest planowany.

### Wdrozone aspekty

- [x] Model polki i elementu garderoby w localStorage: `src/lib/shelves.ts`
- [x] Typy `ClothingItem` i `Tag` w `src/types/db.ts`
- [x] Schemat IndexedDB dla `clothing_items`, `tags`, `outfits`, `metadata`: `src/lib/db/indexedDB.ts`
- [x] Reczne przypisanie zdjecia do polki/kategorii w uploadzie
- [x] Reczny wybor koloru z palety w uploadzie
- [x] Reczny wybor wielu stylow oraz dodawanie wlasnego stylu
- [x] Reczny opis elementu garderoby
- [x] Wyswietlanie koloru, stylow i opisu w szczegolach polki
- [x] Filtrowanie elementow w przymierzalni po kolorze i stylu: `src/components/features/tryon/WardrobeSidebar.tsx`
- [x] Podstawowy import obrazow z tabeli `images` do polki `Imported`: `DataService.syncToServer`
- [ ] Endpoint autotaggingu zwracajacy propozycje tagow
- [ ] Integracja z modelem ML lub zewnetrznym serwisem rozpoznawania obrazu
- [ ] Wyszukiwanie po kategorii, tagach, kolorze i materiale w widoku szafy
- [ ] Migracje DB dla docelowych tabel `categories`, `tags` i relacji wiele-do-wiele
- [ ] Testy akceptacyjne dla recznego tagowania, autotaggingu i filtrowania

---

## [03] Przymierzalnia / Outfit Builder

- **Data wdrozenia:** 2026-05-10
- **Plan:** [03 - Outfit Builder](plans/03_outfit_builder.md)
- **Opis:** Zaimplementowano klientowy builder stylizacji z biblioteka ubran, drag and drop na canvas, przesuwaniem, zmiana rozmiaru, warstwami oraz zapisem miniaturki outfitu lokalnie.
- **Status:** In progress - builder MVP dziala lokalnie; brakuje backendowego API i rekomendacji.

### Wdrozone aspekty

- [x] Strona przymierzalni: `src/app/try-on/page.tsx`
- [x] Komponent glowny buildera: `src/components/features/tryon/TryOnPage.tsx`
- [x] Canvas do komponowania stylizacji: `src/components/features/tryon/CanvasArea.tsx`
- [x] Panel biblioteki ubran z polkami: `src/components/features/tryon/WardrobeSidebar.tsx`
- [x] Drag and drop ubran z biblioteki na canvas
- [x] Przesuwanie elementow po canvasie
- [x] Zmiana rozmiaru elementow na canvasie
- [x] Usuwanie elementow z canvasu
- [x] Zmiana kolejnosci warstw: na wierzch / pod spod
- [x] Generowanie miniaturki stylizacji z canvasu
- [x] Modal zapisu z nazwa i opisem stylizacji
- [x] Zapis outfitu do IndexedDB przez `DataService.saveOutfit`
- [ ] Rotacja elementow na canvasie
- [ ] Zapis pozycji i transformacji elementow w docelowym modelu outfitu
- [ ] Backendowe endpointy `POST /api/outfits` i `GET /api/outfits/:id`
- [ ] Silnik heurystycznych dopasowan lub rekomendacji
- [ ] Udostepnianie linkow i eksport do social media
- [ ] Testy akceptacyjne buildera

---

## [04] Zapis i zarzadzanie outfitami

- **Data wdrozenia:** 2026-05-10
- **Plan:** [04 - Save and Manage Outfits](plans/04_save_and_manage_outfits.md)
- **Opis:** Dodano lokalny zapis outfitow, liste zapisanych stylizacji, edycje nazwy/opisu oraz usuwanie. Brakuje jeszcze backendowego CRUD, uprawnien i trybu public/private.
- **Status:** In progress - lokalne zarzadzanie dziala, backend jest planowany.

### Wdrozone aspekty

- [x] Model `Outfit` w `src/types/db.ts`
- [x] Store `outfits` w IndexedDB
- [x] Metody `saveOutfit`, `listOutfits`, `getOutfit`, `deleteOutfit` w `DataService`
- [x] Zapis stylizacji z przymierzalni
- [x] Lista zapisanych stylizacji: `src/app/outfits/page.tsx`
- [x] Redirect `/saved-outfits` do `/outfits`
- [x] Podglad miniaturki outfitu na liscie
- [x] Edycja nazwy i opisu outfitu
- [x] Usuwanie outfitu
- [ ] Backendowe endpointy CRUD `/api/outfits`
- [ ] Strona szczegolow pojedynczego outfitu
- [ ] Tryb public/private
- [ ] Eksport/share miniaturki
- [ ] Testy CRUD i uprawnien

---

## [05] Komunikaty i informacje zwrotne

- **Opis:** Aktualnie aplikacja uzywa prostych komunikatow `alert`, `confirm` i `prompt`. Dedykowany system toastow nie zostal jeszcze wdrozony.
- **Status:** Planned

### Wdrozone aspekty

- [x] Podstawowe komunikaty natywne przegladarki dla zapisu, bledow, usuwania i edycji
- [ ] Komponent `Toast`
- [ ] Hook `useToast`
- [ ] Globalny provider powiadomien
- [ ] Integracja toastow z uploadem, zapisem outfitow i synchronizacja
- [ ] Testy dostepnosci komunikatow

