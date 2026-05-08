export interface ClothingItem {
  id: string
  owner?: string
  fileName?: string
  url?: string
  thumbnailUrl?: string
  width?: number
  height?: number
  size?: number
  hash?: string
  createdAt?: string
  tags?: string[]
  metadata?: Record<string, any>
}

export interface Tag {
  id: string
  name: string
  createdAt?: string
}

export interface Outfit {
  id: string
  name?: string
  description?: string
  owner?: string
  clothingItemIds: string[]
  coverImageId?: string
  thumbnailDataUrl?: string
  createdAt?: string
}
