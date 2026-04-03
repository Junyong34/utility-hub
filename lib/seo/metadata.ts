import type { Metadata } from 'next';
import type { SEOMetadata, OpenGraphImage } from '@/types/seo';
import {
  buildCustomOgImagePath,
} from '@/lib/seo/og';
import { resolveBlogPostOgImage } from '@/lib/seo/og-policy';

/**
 * 사이트 기본 설정
 */
export const SITE_CONFIG = {
  name: 'Zento',
  title: 'Zento - 비교하고 계산해 결정하는 생활 가이드',
  description:
    '주차, 소비자 비교, 대출·저축·주택 비용 계산까지. 사기 전, 가기 전, 신청하기 전에 비용과 선택을 빠르게 정리해주는 실전 가이드와 도구를 제공합니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zento.kr',
  ogImage: '/og-images/main-og-image.png',
  locale: 'ko_KR',
  author: 'Zento',
  social: {
    // github: 'https://github.com/yourusername', // 실제 URL로 교체 후 주석 해제
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
      // creator: '@yourusername', // 실제 계정 생성 후 교체
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
  categorySlug: string;
  ogImage?: string;
  updatedAt?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}/blog/${post.categorySlug}/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : publishedTime;

  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: url,
    ogImage: resolveBlogPostOgImage({
      slug: post.slug,
      categorySlug: post.categorySlug,
      ogImage: post.ogImage,
    }),
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
  return {
    url: `${SITE_CONFIG.url}${buildCustomOgImagePath({
      title,
      description,
    })}`,
    width: 1200,
    height: 630,
    alt: title,
  };
}
