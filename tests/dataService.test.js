const path = require('path')
const requireTs = require(path.resolve(__dirname, './helpers/requireTs.js'))

// Monkey-patch the IndexedDB wrapper with an in-memory mock
const db = requireTs(path.resolve(__dirname, '../src/lib/db/indexedDB.ts'))

const stores = {
  [db.STORE_CLOTHING]: new Map(),
  [db.STORE_TAGS]: new Map(),
  [db.STORE_OUTFITS]: new Map(),
}

db.get = async (storeName, key) => stores[storeName].get(key)
db.getAll = async (storeName) => Array.from(stores[storeName].values())
db.put = async (storeName, value) => { stores[storeName].set(value.id || value.key, value); }
db.bulkPut = async (storeName, values) => { values.forEach(v => stores[storeName].set(v.id || v.key, v)) }
db.deleteById = async (storeName, key) => { stores[storeName].delete(key) }

const svcModule = requireTs(path.resolve(__dirname, '../src/lib/dataService.ts'))
const DataService = svcModule.DataService || svcModule.default

describe('DataService (mocked IndexedDB)', () => {
  test('save, list and delete clothing item', async () => {
    const item = { id: 'test-1', fileName: 'a.jpg' }
    await DataService.saveClothingItem(item)

    const read = await DataService.getClothingItem('test-1')
    expect(read).toBeDefined()
    expect(read.id).toBe('test-1')

    const list = await DataService.listClothingItems()
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toBe(1)

    await DataService.deleteClothingItem('test-1')
    const after = await DataService.listClothingItems()
    expect(after.length).toBe(0)
  })

  test('bulk save clothing items', async () => {
    const items = [
      { id: 'b1', fileName: 'b1.jpg' },
      { id: 'b2', fileName: 'b2.jpg' },
    ]
    await DataService.bulkSaveClothingItems(items)
    const list = await DataService.listClothingItems()
    expect(list.length).toBe(2)
  })
})
