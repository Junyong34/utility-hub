import type {
  OrganizationSchema,
  WebSiteSchema,
  WebPageSchema,
  ArticleSchema,
  BreadcrumbListSchema,
  BreadcrumbItem,
  FAQPageSchema,
  FAQItem,
  HowToSchema,
  HowToStep,
} from '@/types/seo';
import { SITE_CONFIG } from './metadata';

/**
 * Organization 구조화 데이터 생성
 */
export function createOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/asset/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
  };
}

/**
 * WebSite 구조화 데이터 생성
 */
export function createWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: createOrganizationSchema(),
  };
}

/**
 * WebPage 구조화 데이터 생성
 */
export function createWebPageSchema(page: {
  name: string;
  path: string;
  description?: string;
}): WebPageSchema {
  const url = `${SITE_CONFIG.url}${page.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    url,
    description: page.description,
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

/**
 * Article/BlogPosting 구조화 데이터 생성
 */
export function createArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
  keywords?: string[];
}): ArticleSchema {
  const {
    title,
    description,
    url,
    image,
    datePublished,
    dateModified,
    author,
    authorUrl,
    keywords,
  } = article;

  // 이미지 URL 처리
  const processImage = (img: string | string[] | undefined) => {
    if (!img) return undefined;
    if (Array.isArray(img)) {
      return img.map((i) =>
        i.startsWith('http') ? i : `${SITE_CONFIG.url}${i}`
      );
    }
    return img.startsWith('http') ? img : `${SITE_CONFIG.url}${img}`;
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: processImage(image),
    datePublished: new Date(datePublished).toISOString(),
    dateModified: dateModified
      ? new Date(dateModified).toISOString()
      : new Date(datePublished).toISOString(),
    author: {
      '@type': 'Person',
      name: author,
      url: authorUrl,
    },
    publisher: createOrganizationSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords,
  };
}

/**
 * BreadcrumbList 구조화 데이터 생성
 */
export function createBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url?: string }>
): BreadcrumbListSchema {
  const itemListElement: BreadcrumbItem[] = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url ? `${SITE_CONFIG.url}${crumb.url}` : undefined,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * FAQ 페이지 구조화 데이터 생성
 */
export function createFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  const mainEntity: FAQItem[] = faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * 일반 페이지용 통합 구조화 데이터 생성
 * (WebPage + Breadcrumb)
 */
export function createPageStructuredData(page: {
  name: string;
  path: string;
  description?: string;
  breadcrumbs: Array<{ name: string; url?: string }>;
}) {
  return {
    webPage: createWebPageSchema({
      name: page.name,
      path: page.path,
      description: page.description,
    }),
    breadcrumb: createBreadcrumbSchema(page.breadcrumbs),
  };
}

/**
 * HowTo 구조화 데이터 생성
 */
export function createHowToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  tools?: string[];
  supplies?: string[];
}): HowToSchema {
  const steps: HowToStep[] = howTo.steps.map((step) => ({
    '@type': 'HowToStep',
    name: step.name,
    text: step.text,
    image: step.image,
    url: step.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    step: steps,
    tool: howTo.tools,
    supply: howTo.supplies,
  };
}

/**
 * 블로그 포스트용 통합 구조화 데이터 생성
 */
export function createBlogPostStructuredData(post: {
  title: string;
  excerpt: string;
  slug: string;
  categorySlug: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  updatedAt?: string;
  image?: string;
}) {
  const url = `${SITE_CONFIG.url}/blog/${post.categorySlug}/${post.slug}`;

  return {
    article: createArticleSchema({
      title: post.title,
      description: post.excerpt,
      url,
      image: post.image || SITE_CONFIG.ogImage,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: post.author,
      keywords: post.tags,
    }),
    breadcrumb: createBreadcrumbSchema([
      { name: '홈', url: '/' },
      { name: '블로그', url: '/blog' },
      { name: post.category, url: `/blog/${post.categorySlug}` },
      { name: post.title },
    ]),
  };
}

/**
 * 카테고리/태그 페이지용 구조화 데이터
 */
export function createCategoryStructuredData(category: {
  name: string;
  url: string;
  description?: string;
}) {
  return {
    breadcrumb: createBreadcrumbSchema([
      { name: '홈', url: '/' },
      { name: '블로그', url: '/blog' },
      { name: category.name },
    ]),
  };
}

/**
 * 구조화 데이터를 JSON-LD 스크립트로 변환
 */
export function toJsonLd<T extends Record<string, unknown>>(
  data: T
): string {
  return JSON.stringify(data, null, 2);
}
