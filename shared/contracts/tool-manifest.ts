export type ToolCategory =
  | 'generator'
  | 'converter'
  | 'calculator'
  | 'utility'
  | 'other';

export interface ToolFAQItem {
  question: string;
  answer: string;
}

export interface ToolHowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface ToolHomeFeaturedMeta {
  hotRank: number;
  badge?: string;
}

/**
 * A tool-owned, environment-neutral catalog record.
 *
 * Tool modules own these values. The aggregate catalog only registers them.
 */
export interface ToolManifest {
  id: string;
  name: string;
  shortName?: string;
  breadcrumbLabel?: string;
  description: string;
  publishedAt: string;
  /** 세법·요율 등 기준 데이터의 최종 확인일 (ISO YYYY-MM-DD) */
  updatedAt?: string;
  keywords: string[];
  category: ToolCategory;
  ogImage?: string;
  badge?: string;
  homeFeatured?: ToolHomeFeaturedMeta;
  color?: string;
  icon?: string;
  features?: string[];
  useCases?: string[];
  faq?: ToolFAQItem[];
  howTo?: ToolHowToStep[];
  applicationCategory?: string;
  estimatedTime?: string;
  tools?: string[];
  relatedTools?: string[];
}

/** Compatibility name used by legacy consumers during migration. */
export type ToolConfig = ToolManifest;

export interface ToolListItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  href: string;
  badge?: string;
  color: string;
  category?: ToolCategory;
}

/**
 * Deliberately small client-facing projection. SEO content stays server-side.
 */
export interface ToolNavigationItem {
  id: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  href: string;
}
