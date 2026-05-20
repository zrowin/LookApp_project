'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getShelves, removeItemFromShelf } from '@/lib/shelves';

export default function ShelfDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any)?.id;
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [shelf, setShelf] = React.useState<any | null>(null);
  const [resolved, setResolved] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const shelves = getShelves();
    const found = shelves.find((s) => s.id === id);
    setShelf(found ?? null);
  }, [id]);

  React.useEffect(() => {
    let active = true;

    async function resolveStorageUrls() {
      const entries: string[] = (shelf?.thumbnails || [])
        .map((t: any) => (typeof t === 'string' ? t : t.url))
        .filter((url: string | undefined): url is string => Boolean(url?.startsWith('storage://')));

      for (const entry of Array.from(new Set(entries))) {
        const path = entry.replace('storage://', '');
        try {
          const res = await fetch('/api/storage-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path }),
          });
          const json = await res.json();
          if (!active) return;
          if (json?.signedUrl) {
            setResolved((current) => ({ ...current, [entry]: json.signedUrl }));
          }
        } catch (err) {
          console.warn('Could not resolve storage URL for', path, err);
        }
      }
    }

    void resolveStorageUrls();
    return () => {
      active = false;
    };
  }, [shelf]);

  function removeImage(itemId: string) {
    if (!confirm('Usunąć zdjęcie z półki?')) return;
    removeItemFromShelf(id, itemId);
    setShelf((prev: any) => ({
      ...prev,
      thumbnails: prev.thumbnails.filter((t: any) => t.id !== itemId),
    }));
  }

  function resolveImageUrl(item: any) {
    const rawUrl = typeof item === 'string' ? item : item.url;
    return rawUrl?.startsWith('storage://') ? resolved[rawUrl] : rawUrl;
  }

  function openShelfUpload() {
    fileInputRef.current?.click();
  }

  function handleShelfUploadFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.currentTarget.value = '';
    if (files.length === 0) return;

    if (typeof window !== 'undefined') {
      (window as any).__lookappUploadQueue = {
        shelfId: id,
        files,
      };
    }

    router.push('/dashboard/upload');
  }

  if (!shelf) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="app-shell">
          <button onClick={() => router.push('/wardrobe')} className="mb-4 text-sm text-gray-400">
            ← Powrót
          </button>
          <h2 className="text-xl">Półka nie znaleziona</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="app-shell">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleShelfUploadFiles}
          className="hidden"
        />

        <div className="app-page-header">
          <div>
            <button onClick={() => router.push('/wardrobe')} className="text-sm text-gray-400">
              ← Powrót
            </button>
            <h1 className="mt-2 text-2xl font-semibold">{shelf.name}</h1>
            <div className="mt-1 text-sm text-gray-400">{shelf.thumbnails.length} items</div>
          </div>
        </div>

        {shelf.thumbnails.length === 0 ? (
          <div className="mt-8 text-center text-gray-400">Brak ubrań na półce.</div>
        ) : (
          <div className="masonry-gallery masonry-gallery--shelf-detail mt-6">
            {shelf.thumbnails.map((t: any, i: number) => (
              <div
                key={t.id}
                className="masonry-item group relative overflow-hidden rounded-2xl border border-white/5 bg-[#3a3a3a]"
              >
                <div className="flex max-h-64 min-h-32 w-full items-center justify-center overflow-hidden">
                  {resolveImageUrl(t) ? (
                    <img
                      src={resolveImageUrl(t)}
                      alt={`item-${i}`}
                      className="max-h-64 max-w-full object-contain"
                    />
                  ) : null}
                </div>

                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-black/0 p-3 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:bg-black/50 group-hover:opacity-100">
                  <div className="mb-2 text-xs text-white/95">
                    {t.color && <span className="mr-2">Kolor: {t.color}</span>}
                    {t.styles && t.styles.length > 0 && <span>Styl: {t.styles.join(', ')}</span>}
                  </div>
                  {t.description && (
                    <div className="mb-2 text-sm text-white/95">{t.description}</div>
                  )}
                </div>

                <button
                  onClick={() => removeImage(t.id)}
                  className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-xs"
                >
                  Usuń
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={openShelfUpload}
        aria-label={`Dodaj zdjęcie do półki ${shelf.name}`}
        className="fixed bottom-8 left-1/2 z-40 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-3xl bg-white text-5xl leading-none font-light text-black shadow-2xl shadow-black/40 transition-transform hover:scale-105 focus:ring-2 focus:ring-white/50 focus:outline-none"
      >
        +
      </button>
    </main>
  );
}
