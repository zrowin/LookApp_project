import DataService from '../dataService'
import type { ClothingItem } from '../../types/db'

export async function runExample() {
  if (typeof indexedDB === 'undefined') {
    console.warn('IndexedDB not available in this environment. runExample should be run in a browser.')
    return
  }

  const item: ClothingItem = {
    id: `item-${Date.now()}`,
    fileName: 'demo.jpg',
    url: '/uploads/demo.jpg',
    thumbnailUrl: '/uploads/demo-thumb.jpg',
    createdAt: new Date().toISOString(),
    tags: ['shirt', 'summer'],
  }

  await DataService.saveClothingItem(item)
  const loaded = await DataService.getClothingItem(item.id)
  console.log('Saved item loaded from IndexedDB:', loaded)

  const all = await DataService.listClothingItems()
  console.log('All clothing items:', all)
}

export default runExample
