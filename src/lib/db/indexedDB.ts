/* Lightweight IndexedDB wrapper for LookApp
   - Creates stores: clothing_items, tags, outfits, metadata
   - Exposes promise-based helpers: get, getAll, put, bulkPut, deleteById, clear
*/
const DB_NAME = 'lookapp_db'
const DB_VERSION = 1

export const STORE_CLOTHING = 'clothing_items'
export const STORE_TAGS = 'tags'
export const STORE_OUTFITS = 'outfits'
export const STORE_METADATA = 'metadata'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_CLOTHING)) {
        const store = db.createObjectStore(STORE_CLOTHING, { keyPath: 'id' })
        store.createIndex('owner', 'owner', { unique: false })
      }
      if (!db.objectStoreNames.contains(STORE_TAGS)) {
        db.createObjectStore(STORE_TAGS, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(STORE_OUTFITS)) {
        db.createObjectStore(STORE_OUTFITS, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(STORE_METADATA)) {
        db.createObjectStore(STORE_METADATA, { keyPath: 'key' })
      }
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function transaction(storeName: string, mode: IDBTransactionMode = 'readonly') {
  return openDB().then((db) => db.transaction(storeName, mode).objectStore(storeName))
}

export async function get<T = any>(storeName: string, key: IDBValidKey | IDBKeyRange) {
  const store = await transaction(storeName, 'readonly')
  return new Promise<T | undefined>((resolve, reject) => {
    const req = store.get(key)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function getAll<T = any>(storeName: string) {
  const store = await transaction(storeName, 'readonly')
  return new Promise<T[]>((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result as T[])
    req.onerror = () => reject(req.error)
  })
}

export async function put<T = any>(storeName: string, value: T) {
  const store = await transaction(storeName, 'readwrite')
  return new Promise<void>((resolve, reject) => {
    const req = store.put(value)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function bulkPut<T = any>(storeName: string, values: T[]) {
  const store = await transaction(storeName, 'readwrite')
  return new Promise<void>((resolve, reject) => {
    let i = 0
    function next() {
      if (i >= values.length) return resolve()
      const req = store.put(values[i++])
      req.onsuccess = () => next()
      req.onerror = () => reject(req.error)
    }
    next()
  })
}

export async function deleteById(storeName: string, key: IDBValidKey) {
  const store = await transaction(storeName, 'readwrite')
  return new Promise<void>((resolve, reject) => {
    const req = store.delete(key)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function clearStore(storeName: string) {
  const store = await transaction(storeName, 'readwrite')
  return new Promise<void>((resolve, reject) => {
    const req = store.clear()
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export default {
  openDB,
  get,
  getAll,
  put,
  bulkPut,
  deleteById,
  clearStore,
}
