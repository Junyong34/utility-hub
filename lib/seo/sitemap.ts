import type { SitemapEntry } from '@/types/seo';
import { getAllPosts, getAllTags } from '@/lib/blog/posts';
import { SITE_CONFIG } from './metadata';

/**
 * 정적 페이지 사이트맵 엔트리 생성
 */
export function getStaticPages(): SitemapEntry[] {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/tools/lotto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
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
 * 블로그 포스트 사이트맵 엔트리 생성
 */
export function getBlogPostPages(): SitemapEntry[] {
  const posts = getAllPosts();

  return posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

/**
 * 태그 페이지 사이트맵 엔트리 생성 (향후 태그 페이지 구현 시)
 */
export function getTagPages(): SitemapEntry[] {
  const tags = getAllTags();

  return tags.map((tag) => ({
    url: `${SITE_CONFIG.url}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
}

/**
 * 전체 사이트맵 엔트리 생성
 */
export function getAllSitemapEntries(): SitemapEntry[] {
  return [
    ...getStaticPages(),
    ...getBlogPostPages(),
    ...getTagPages(), // 태그 페이지 사이트맵 추가
  ];
}

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
