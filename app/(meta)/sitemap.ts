import { MetadataRoute } from 'next';
import { getAllSitemapEntries } from '@/lib/seo';

/**
 * 동적 sitemap.xml 생성
 * Next.js App Router의 sitemap.ts 파일
 *
 * - 정적 페이지 (홈, 블로그 목록 등)
 * - 블로그 포스트 (SSG로 생성된 모든 포스트)
 * - 태그 페이지 (향후 구현 시)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllSitemapEntries();

  // Next.js MetadataRoute.Sitemap 형식으로 변환
  return entries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified
      ? new Date(entry.lastModified)
      : new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
