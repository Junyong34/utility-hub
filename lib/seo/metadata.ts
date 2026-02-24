import type { Metadata } from 'next';
import type { SEOMetadata, OpenGraphImage } from '@/types/seo';

/**
 * 사이트 기본 설정
 */
export const SITE_CONFIG = {
  name: 'Utility Hub',
  title: 'Utility Hub - 유용한 팁과 도구 모음',
  description:
    '일상과 개발에 유용한 팁, 도구, 정보를 제공하는 웹사이트입니다',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://utility-hub.com',
  ogImage: '/og-image.png',
  locale: 'ko_KR',
  author: 'Utility Hub Team',
  social: {
    github: 'https://github.com/yourusername',
    // twitter: 'https://twitter.com/yourusername',
  },
} as const;

/**
 * Next.js Metadata 생성 헬퍼
 */
export function generateMetadata(seo: SEOMetadata): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = seo;

  // Canonical URL 처리
  const canonicalUrl = canonical || SITE_CONFIG.url;

  // OG 이미지 처리
  const ogImageUrl = ogImage || SITE_CONFIG.ogImage;
  const fullOgImageUrl = ogImageUrl.startsWith('http')
    ? ogImageUrl
    : `${SITE_CONFIG.url}${ogImageUrl}`;

  // 기본 메타데이터
  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: keywords?.join(', '),
    authors: authors?.map((name) => ({ name })),
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,

    // Alternate links (canonical 포함)
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: ogType,
      images: [
        {
          url: fullOgImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(ogType === 'article' && {
        publishedTime,
        modifiedTime,
        section,
        tags,
        authors,
      }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOgImageUrl],
      creator: '@yourusername', // 실제 트위터 핸들로 교체
    },

    // 추가 메타 태그
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification (필요시 설정)
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };

  return metadata;
}

/**
 * 블로그 포스트 메타데이터 생성
 */
export function generateBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
  updatedAt?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : publishedTime;

  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: url,
    ogType: 'article',
    publishedTime,
    modifiedTime,
    authors: [post.author],
    tags: post.tags,
    keywords: post.tags,
  });
}

/**
 * 페이지네이션 메타데이터 생성
 */
export function generatePaginationMetadata(
  baseTitle: string,
  baseDescription: string,
  page: number,
  totalPages: number,
  basePath: string
): Metadata {
  const title = page > 1 ? `${baseTitle} - 페이지 ${page}` : baseTitle;
  const url = page > 1 ? `${SITE_CONFIG.url}${basePath}?page=${page}` : `${SITE_CONFIG.url}${basePath}`;

  const metadata = generateMetadata({
    title,
    description: baseDescription,
    canonical: url,
  });

  // prev/next 링크 추가 (페이지네이션 SEO)
  const paginationAlternates: Record<string, string> = {
    canonical: url,
  };

  if (page > 1) {
    const prevUrl = page === 2
      ? `${SITE_CONFIG.url}${basePath}`
      : `${SITE_CONFIG.url}${basePath}?page=${page - 1}`;
    paginationAlternates.prev = prevUrl;
  }

  if (page < totalPages) {
    const nextUrl = `${SITE_CONFIG.url}${basePath}?page=${page + 1}`;
    paginationAlternates.next = nextUrl;
  }

  return {
    ...metadata,
    alternates: paginationAlternates as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Open Graph 이미지 생성 (동적 OG 이미지용)
 */
export function createOGImage(
  title: string,
  description?: string
): OpenGraphImage {
  // 동적 OG 이미지 생성 API를 사용하는 경우
  const params = new URLSearchParams({
    title,
    ...(description && { description }),
  });

  return {
    url: `${SITE_CONFIG.url}/api/og?${params.toString()}`,
    width: 1200,
    height: 630,
    alt: title,
  };
}
