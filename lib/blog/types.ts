import type { HomeFeaturedMeta } from '@/types/home'

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
