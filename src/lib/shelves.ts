export type ShelfItem = {
  id: string
  url: string
  color?: string
  styles?: string[]
  description?: string
}

export type Shelf = {
  id: string
  name: string
  thumbnails: ShelfItem[]
}

const KEY = 'lookapp_shelves_v1'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function getShelves(): Shelf[] {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as Shelf[]
  } catch (e) {
    console.error('getShelves parse error', e)
    return []
  }
}

export function saveShelves(shelves: Shelf[]) {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(shelves))
  } catch (e) {
    console.error('saveShelves error', e)
  }
}

export function addShelf(name: string): Shelf {
  const shelves = getShelves()
  const s: Shelf = { id: String(Date.now()), name, thumbnails: [] }
  shelves.push(s)
  saveShelves(shelves)
  return s
}

export function updateShelfName(id: string, name: string) {
  const shelves = getShelves()
  const idx = shelves.findIndex((s) => s.id === id)
  if (idx === -1) return
  shelves[idx].name = name
  saveShelves(shelves)
}

export function deleteShelf(id: string) {
  const shelves = getShelves().filter((s) => s.id !== id)
  saveShelves(shelves)
}

export function addItemToShelf(id: string, previewUrl: string, meta?: { color?: string; styles?: string[]; description?: string }) {
  const shelves = getShelves()
  const idx = shelves.findIndex((s) => s.id === id)
  if (idx === -1) return
  const item: ShelfItem = {
    id: String(Date.now()) + '-' + Math.random().toString(36).slice(2, 9),
    url: previewUrl,
    color: meta?.color,
    styles: meta?.styles,
    description: meta?.description,
  }
  shelves[idx].thumbnails = [...shelves[idx].thumbnails, item]
  saveShelves(shelves)
}

export function removeItemFromShelf(id: string, itemId: string) {
  const shelves = getShelves()
  const idx = shelves.findIndex((s) => s.id === id)
  if (idx === -1) return
  shelves[idx].thumbnails = shelves[idx].thumbnails.filter((t) => t.id !== itemId)
  saveShelves(shelves)
}
