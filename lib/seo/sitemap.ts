import type { SitemapEntry } from '@/types/seo';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';
import {
  getPublishablePlaces,
  getPublishablePlacesByRegion,
} from '@/lib/places/place-content';
import { SITE_CONFIG } from './metadata';
import { getAllToolConfigs } from '@/lib/tools/tool-config';
import { PHASE_A_REGION_SLUGS } from '@/lib/places/region-config';
import { pickLatestDate } from './date-utils';

function getLatestPostDate(): string | undefined {
  return pickLatestDate(getAllPosts().map(post => post.date));
}

function getLatestToolDate(): string | undefined {
  return pickLatestDate(getAllToolConfigs().map(tool => tool.publishedAt));
}

function getLatestPlaceDate(): string | undefined {
  return pickLatestDate(
    getPublishablePlaces().flatMap(place => [place.lastObservedAt, place.verifiedAt])
  );
}

/**
 * 정적 페이지용 사이트맵 엔트리 생성
 * (Next.js 라우트(app/(meta)/sitemap.ts)에서 사용하는 원본 데이터)
 */
export function collectStaticPageEntries(): SitemapEntry[] {
  const latestPostDate = getLatestPostDate();
  const latestToolDate = getLatestToolDate();
  const latestPlaceDate = getLatestPlaceDate();

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: latestPostDate ?? new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/places`,
      lastModified: latestPlaceDate ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/benefits`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_CONFIG.url}/tools`,
      lastModified: latestToolDate ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Note: 개별 Tool 페이지는 collectToolEntries()에서 자동으로 생성됨
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_CONFIG.url}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}

/**
 * 블로그 포스트용 사이트맵 엔트리 생성
 */
export function collectBlogPostEntries(): SitemapEntry[] {
  const posts = getAllPosts();

  return posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.categorySlug}/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

/**
 * 블로그 카테고리 페이지용 사이트맵 엔트리 생성
 */
export function collectBlogCategoryEntries(): SitemapEntry[] {
  const categories = getAllCategories();
  const posts = getAllPosts();

  return categories.map((category) => ({
    url: `${SITE_CONFIG.url}/blog/${category.slug}`,
    lastModified:
      pickLatestDate(
        posts
          .filter(post => post.categorySlug === category.slug)
          .map(post => post.date)
      ) ?? new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));
}

/**
 * 태그 페이지용 사이트맵 엔트리 생성
 * (현재는 /blog/tag 라우트 미구현으로 비활성화)
 */
export function collectBlogTagEntries(): SitemapEntry[] {
  // 현재 /blog/tag 경로가 라우트로 구현되어 있지 않아 비활성화
  return [];
}

/**
 * Tool 페이지 및 서브페이지 사이트맵 엔트리 생성
 * TOOL_CONFIGS에서 자동으로 모든 Tool을 가져와 sitemap에 포함
 */
export function collectToolEntries(): SitemapEntry[] {
  const tools = getAllToolConfigs();
  const toolPages = tools.map((tool) => ({
    url: `${SITE_CONFIG.url}/tools/${tool.id}`,
    lastModified: tool.publishedAt ?? new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const hasLottoTool = tools.some((tool) => tool.id === 'lotto');
  if (!hasLottoTool) {
    return toolPages;
  }

  const lottoSubPages: SitemapEntry[] = [
    {
      url: `${SITE_CONFIG.url}/tools/lotto/stats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  return [
    ...toolPages,
    ...lottoSubPages,
  ];
}

/**
 * 장소 허브 페이지 사이트맵 엔트리 생성
 */
export function collectPlaceEntries(): SitemapEntry[] {
  return PHASE_A_REGION_SLUGS.map(slug => {
    const latestRegionDate = pickLatestDate(
      getPublishablePlacesByRegion(slug).flatMap(place => [
        place.lastObservedAt,
        place.verifiedAt,
      ])
    );

    return {
      url: `${SITE_CONFIG.url}/places/${slug}`,
      lastModified: latestRegionDate ?? new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });
}

/**
 * 전체 사이트맵 엔트리 생성
 */
export function collectSitemapEntries(): SitemapEntry[] {
  return [
    ...collectStaticPageEntries(),
    ...collectPlaceEntries(), // Places 지역 허브
    ...collectBlogCategoryEntries(), // Blog 카테고리
    ...collectBlogPostEntries(), // Blog 포스트
    ...collectBlogTagEntries(), // Blog 태그(구현 전까지 비활성화)
    ...collectToolEntries(), // Tools (자동 추가)
  ];
}

/**
 * 과거 호출 규약 호환성용 별칭
 * (점진적으로 collect* 함수명으로 마이그레이션)
 */
export const getStaticPages = collectStaticPageEntries;
export const getBlogPostPages = collectBlogPostEntries;
export const getBlogCategoryPages = collectBlogCategoryEntries;
export const getTagPages = collectBlogTagEntries;
export const getToolPages = collectToolEntries;
export const getAllSitemapEntries = collectSitemapEntries;

/**
 * XML 사이트맵 생성
 */
export function generateSitemapXml(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map((entry) => {
    const lastmod = entry.lastModified
      ? new Date(entry.lastModified).toISOString()
      : new Date().toISOString();

    return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : ''}
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return xml;
}

/**
 * 이미지 사이트맵 생성 (블로그 포스트 이미지)
 */
export function generateImageSitemapXml(): string {
  const posts = getAllPosts();
  const postsWithImages = posts.filter(() => {
    // 향후 포스트에 featured images 필드 추가 시 사용
    return false; // 현재는 이미지 없음
  });

  if (postsWithImages.length === 0) {
    return '';
  }

  // 이미지 사이트맵 생성 로직
  // 추후 구현
  return '';
}

/**
 * XML 특수문자 이스케이프
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

/**
 * 사이트맵 인덱스 생성 (여러 사이트맵이 있는 경우)
 */
export function generateSitemapIndexXml(sitemaps: string[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map((sitemap) => {
    return `  <sitemap>
    <loc>${escapeXml(sitemap)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
  })
  .join('\n')}
</sitemapindex>`;

  return xml;
}
