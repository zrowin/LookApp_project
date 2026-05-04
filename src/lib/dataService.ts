import {
  STORE_CLOTHING,
  STORE_TAGS,
  STORE_OUTFITS,
  get,
  getAll,
  put,
  bulkPut,
  deleteById,
} from './db/indexedDB'
import type { ClothingItem, Tag, Outfit } from '../types/db'
import { supabase } from './supabase/client'
import { getShelves, addShelf as addShelfUtil, addItemToShelf } from './shelves'

export const DataService = {
  // Clothing items
  saveClothingItem: async (item: ClothingItem) => {
    await put(STORE_CLOTHING, item)
  },
  getClothingItem: async (id: string) => {
    return get<ClothingItem>(STORE_CLOTHING, id)
  },
  listClothingItems: async () => {
    return getAll<ClothingItem>(STORE_CLOTHING)
  },
  deleteClothingItem: async (id: string) => {
    await deleteById(STORE_CLOTHING, id)
  },

  // Tags
  saveTag: async (tag: Tag) => {
    await put(STORE_TAGS, tag)
  },
  listTags: async () => {
    return getAll<Tag>(STORE_TAGS)
  },

  // Outfits
  saveOutfit: async (outfit: Outfit) => {
    await put(STORE_OUTFITS, outfit)
  },
  listOutfits: async () => {
    return getAll<Outfit>(STORE_OUTFITS)
  },
  getOutfit: async (id: string) => {
    return get<Outfit>(STORE_OUTFITS, id)
  },
  deleteOutfit: async (id: string) => {
    await deleteById(STORE_OUTFITS, id)
  },

  // Bulk helpers
  bulkSaveClothingItems: async (items: ClothingItem[]) => {
    await bulkPut(STORE_CLOTHING, items)
  },

  // Placeholder for sync with remote backend - implement as needed
  syncToServer: async (opts?: { push?: boolean; pull?: boolean }) => {
    const pull = opts?.pull ?? true
    if (!pull) return { ok: true }

    try {
      const { data, error } = await supabase.from('images').select('id,owner_id,original_url,processed_url,created_at').order('created_at', { ascending: false })
      if (error) {
        console.warn('syncToServer: supabase error', error)
        return { ok: false, error }
      }

      if (!data || data.length === 0) return { ok: true, imported: 0 }

      // Ensure there is an "Imported" shelf to store server images
      let shelves = getShelves()
      let importedShelf = shelves.find((s) => s.name === 'Imported')
      if (!importedShelf) {
        importedShelf = addShelfUtil('Imported')
        shelves = getShelves()
      }

      let imported = 0
      for (const img of data) {
        const url = (img as any).processed_url || (img as any).original_url
        if (!url) continue
        // Add to shelf if not already present (by URL)
        const existing = shelves.find((s) => s.id === importedShelf!.id)!
        const already = existing.thumbnails.some((t: any) => t.url === url)
        if (already) continue

        addItemToShelf(importedShelf!.id, url, {})
        imported++
      }

      return { ok: true, imported }
    } catch (e) {
      console.warn('syncToServer error', e)
      return { ok: false, error: e }
    }
  },
}

export default DataService
