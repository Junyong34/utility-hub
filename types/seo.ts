/**
 * SEO 관련 타입 정의
 */

/**
 * 구조화 데이터 (JSON-LD) - 기본 타입
 */
export interface JsonLdBase {
  '@context': string;
  '@type': string;
}

/**
 * Organization 스키마
 */
export interface OrganizationSchema extends JsonLdBase {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[]; // 소셜 미디어 링크
}

/**
 * WebSite 스키마
 */
export interface WebSiteSchema extends JsonLdBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: OrganizationSchema;
}

/**
 * WebPage 스키마
 */
export interface WebPageSchema extends JsonLdBase {
  '@type': 'WebPage';
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  isPartOf?: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
}

/**
 * Article/BlogPosting 스키마
 */
export interface ArticleSchema extends JsonLdBase {
  '@type': 'Article' | 'BlogPosting';
  headline: string;
  description: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher?: OrganizationSchema;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  keywords?: string[];
}

/**
 * BreadcrumbList 스키마
 */
export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema extends JsonLdBase {
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

/**
 * FAQ 스키마
 */
export interface FAQItem {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface FAQPageSchema extends JsonLdBase {
  '@type': 'FAQPage';
  mainEntity: FAQItem[];
}

/**
 * HowTo 스키마
 */
export interface HowToStep {
  '@type': 'HowToStep';
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchema extends JsonLdBase {
  '@type': 'HowTo';
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration format (예: PT30M)
  step: HowToStep[];
  tool?: string[];
  supply?: string[];
}

/**
 * 메타데이터 설정
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string; // 카테고리/섹션
  tags?: string[];
}

/**
 * Canonical URL 설정
 */
export interface CanonicalConfig {
  url: string;
  trailingSlash?: boolean; // 기본값: false
  removeQueryParams?: string[]; // 제거할 쿼리 파라미터 목록
}

/**
 * hreflang 설정
 */
export interface AlternateLink {
  hreflang: string; // 예: 'ko', 'en', 'x-default'
  href: string;
}

/**
 * 사이트맵 URL 엔트리
 */
export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number; // 0.0 ~ 1.0
  alternates?: {
    languages?: Record<string, string>; // 언어별 URL
  };
}

/**
 * Robots.txt 정책
 */
export interface RobotRule {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
}

/**
 * Open Graph 이미지 설정
 */
export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

/**
 * 페이지네이션 SEO 설정
 */
export interface PaginationSEO {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  prevUrl?: string;
  nextUrl?: string;
}

/**
 * 이미지 SEO 속성
 */
export interface ImageSEO {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

/**
 * RSS 피드 아이템
 */
export interface RSSFeedItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  author?: string;
  categories?: string[];
  guid?: string;
}

/**
 * ItemList 스키마 (블로그 목록용)
 */
export interface ItemListElement {
  '@type': 'ListItem';
  position: number;
  url: string;
  name?: string;
  image?: string;
}

export interface ItemListSchema extends JsonLdBase {
  '@type': 'ItemList';
  itemListElement: ItemListElement[];
  numberOfItems?: number;
}
