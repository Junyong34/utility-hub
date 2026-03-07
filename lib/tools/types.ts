import type { HomeFeaturedMeta } from '@/types/home'

/**
 * Tool 카테고리
 */
export type ToolCategory =
  | 'generator'
  | 'converter'
  | 'calculator'
  | 'utility'
  | 'other'

/**
 * FAQ 아이템
 */
export interface ToolFAQItem {
  question: string
  answer: string
}

/**
 * HowTo 스텝
 */
export interface ToolHowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

/**
 * 각 Tool의 메타데이터와 SEO 정보를 중앙 관리합니다.
 */
export interface ToolConfig {
  id: string
  name: string
  shortName?: string
  breadcrumbLabel?: string
  description: string
  publishedAt: string
  keywords: string[]
  category: ToolCategory
  ogImage?: string
  badge?: string
  homeFeatured?: HomeFeaturedMeta
  color?: string
  icon?: string
  features?: string[]
  useCases?: string[]
  faq?: ToolFAQItem[]
  howTo?: ToolHowToStep[]
  applicationCategory?: string
  estimatedTime?: string
  tools?: string[]
  relatedTools?: string[]
}

/**
 * Server → Client로 직렬화 가능한 Tool 목록 아이템입니다.
 */
export interface ToolListItem {
  id: string
  name: string
  description: string
  iconName: string
  href: string
  badge?: string
  color: string
  category?: ToolCategory
}
