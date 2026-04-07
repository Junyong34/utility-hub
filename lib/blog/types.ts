import type { HomeFeaturedMeta } from '@/types/home'
import type { AgeBand, IndoorOutdoor, RegionSlug } from '@/types/place-source'

export interface BlogPostMetadata {
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  category: string
  categorySlug: string
  ogImage?: string
  homeFeatured?: HomeFeaturedMeta
  /** 연관 장소 seed ID 목록 (content/places/<region>/index.ts의 id 참조) */
  placeIds?: string[]
  /** 연관 수도권 지역 슬러그 */
  regions?: RegionSlug[]
  /** 적합 연령대 */
  ageBands?: AgeBand[]
  /** 실내/야외 구분 */
  indoorOutdoor?: IndoorOutdoor
}

export interface BlogPostSummary extends BlogPostMetadata {
  slug: string
}

export interface BlogPost extends BlogPostSummary {
  content: string
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}

export interface BlogPostOption {
  slug: string
  title: string
}

export interface BlogTocItem {
  id: string
  text: string
  level: number
}

export interface PostsPageResponse {
  posts: BlogPostSummary[]
  hasMore: boolean
  total: number
  currentPage: number
  totalPages: number
}
