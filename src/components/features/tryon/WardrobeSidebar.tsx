'use client';

import React from 'react';
import DraggableItem from './DraggableItem';
import { getShelves } from '../../../lib/shelves';
import type { Shelf, ShelfItem } from '../../../lib/shelves';

type ShelfFilter = {
  color: string;
  style: string;
};

function splitIntoColumns<T>(items: T[], columnCount: number) {
  return items.reduce<T[][]>(
    (columns, item, index) => {
      columns[index % columnCount].push(item);
      return columns;
    },
    Array.from({ length: columnCount }, () => [])
  );
}

export default function WardrobeSidebar() {
  const [shelves, setShelves] = React.useState<Shelf[]>([]);
  const [resolved, setResolved] = React.useState<Record<string, string>>({});
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [filters, setFilters] = React.useState<Record<string, ShelfFilter>>({});

  React.useEffect(() => {
    try {
      const data = getShelves();
      setShelves(data || []);
    } catch (e) {
      setShelves([]);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    async function resolveAll() {
      const entries = shelves
        .flatMap((s) => s.thumbnails || [])
        .map((t: any) => (typeof t === 'string' ? t : t.url))
        .filter(Boolean);
      const unique = Array.from(new Set(entries)).filter((e) => e.startsWith('storage://'));
      for (const e of unique) {
        const path = e.replace('storage://', '');
        try {
          const res = await fetch('/api/storage-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path }),
          });
          const json = await res.json();
          if (!active) return;
          if (json?.signedUrl) {
            setResolved((r) => ({ ...r, [e]: json.signedUrl }));
          }
        } catch (err) {
          console.warn('Could not resolve storage URL for', path, err);
        }
      }
    }
    void resolveAll();
    return () => {
      active = false;
    };
  }, [shelves]);

  function toggleShelf(id: string) {
    setExpanded((s) => ({ ...s, [id]: !s[id] }));
  }

  function updateShelfFilter(id: string, patch: Partial<ShelfFilter>) {
    setFilters((current) => ({
      ...current,
      [id]: {
        color: current[id]?.color ?? '',
        style: current[id]?.style ?? '',
        ...patch,
      },
    }));
  }

  return (
    <aside className="tryon-wardrobe-sidebar h-[70vh] overflow-auto rounded-md border border-white/6 bg-[#252425] p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Twoja szafa</h3>
      </div>

      {shelves.length === 0 && (
        <div className="text-white/40">Brak półek — dodaj w sekcji „Szafa”</div>
      )}

      <div className="flex flex-col gap-3">
        {shelves.map((shelf) => {
          const shelfItems = shelf.thumbnails || [];
          const filter = filters[shelf.id] ?? { color: '', style: '' };
          const colorOptions = Array.from(
            new Set(
              shelfItems
                .map((item: ShelfItem) => item.color)
                .filter((color): color is string => Boolean(color))
            )
          );
          const styleOptions = Array.from(
            new Set(shelfItems.flatMap((item: ShelfItem) => item.styles || []))
          );
          const filteredItems = shelfItems.filter((item: ShelfItem) => {
            const matchesColor = !filter.color || item.color === filter.color;
            const matchesStyle = !filter.style || (item.styles || []).includes(filter.style);
            return matchesColor && matchesStyle;
          });
          const itemColumns = splitIntoColumns(filteredItems, 2);

          return (
            <div
              key={shelf.id}
              className="tryon-shelf-panel cursor-pointer rounded border border-white/6 bg-white/2 p-2 transition-colors hover:bg-white/5 focus:ring-2 focus:ring-white/20 focus:outline-none"
              onClick={() => toggleShelf(shelf.id)}
              onKeyDown={(event) => {
                if (event.currentTarget !== event.target) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleShelf(shelf.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{shelf.name}</div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleShelf(shelf.id);
                  }}
                  className="tryon-shelf-toggle rounded-md bg-transparent px-2 py-1 text-xs text-white/60"
                  aria-expanded={!!expanded[shelf.id]}
                >
                  {expanded[shelf.id] ? 'Ukryj' : 'Pokaż'}
                </button>
              </div>

              {expanded[shelf.id] && (
                <div onClick={(event) => event.stopPropagation()}>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <label className="tryon-filter-label flex flex-col gap-1 text-xs text-white/50">
                      Kolor
                      <select
                        value={filter.color}
                        onChange={(e) => updateShelfFilter(shelf.id, { color: e.target.value })}
                        className="tryon-filter-select rounded border border-white/10 bg-black/30 px-2 py-1 text-xs text-white"
                      >
                        <option value="">Wszystkie</option>
                        {colorOptions.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="tryon-filter-label flex flex-col gap-1 text-xs text-white/50">
                      Styl
                      <select
                        value={filter.style}
                        onChange={(e) => updateShelfFilter(shelf.id, { style: e.target.value })}
                        className="tryon-filter-select rounded border border-white/10 bg-black/30 px-2 py-1 text-xs text-white"
                      >
                        <option value="">Wszystkie</option>
                        {styleOptions.map((style) => (
                          <option key={style} value={style}>
                            {style}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-2">
                    {shelfItems.length === 0 && <div className="text-white/40">Pusta półka</div>}
                    {shelfItems.length > 0 && filteredItems.length === 0 && (
                      <div className="text-white/40">Brak ubrań dla filtrów.</div>
                    )}
                    {filteredItems.length > 0 && (
                      <div className="flex items-start gap-2">
                        {itemColumns.map((column, columnIndex) => (
                          <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-2">
                            {column.map((it: ShelfItem) => {
                              const raw = it.url;
                              const src =
                                raw && raw.startsWith('storage://') ? (resolved[raw] ?? '') : raw;
                              return <DraggableItem key={it.id} item={{ id: it.id, src }} />;
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
