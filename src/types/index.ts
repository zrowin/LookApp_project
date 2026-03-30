/**
 * Type definitions for LookApp
 */

/**
 * Clothing categories
 */
export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories'
  | 'other'

/**
 * Clothing colors
 */
export type ClothingColor =
  | 'black'
  | 'white'
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'beige'
  | 'multi'

/**
 * Clothing seasons
 */
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all'

/**
 * Clothing item interface
 */
export interface ClothingItem {
  id: string
  userId: string
  name: string
  category: ClothingCategory
  color: ClothingColor
  season: Season[]
  imageUrl: string
  thumbnailUrl?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

/**
 * Outfit interface
 */
export interface Outfit {
  id: string
  userId: string
  name: string
  description?: string
  items: string[] // Array of ClothingItem IDs
  thumbnailUrl?: string
  tags: string[]
  occasion?: string
  createdAt: string
  updatedAt: string
}

/**
 * User profile interface
 */
export interface UserProfile {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
  subscriptionTier?: 'free' | 'premium'
  subscriptionStatus?: 'active' | 'cancelled' | 'past_due'
  createdAt: string
  updatedAt: string
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number
  limit?: number
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Upload progress callback
 */
export type UploadProgressCallback = (progress: number) => void

/**
 * Image processing options
 */
export interface ImageProcessingOptions {
  removeBackground?: boolean
  maxWidth?: number
  maxHeight?: number
  quality?: number
}
