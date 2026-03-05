import { MetadataRoute } from 'next';
import { collectSitemapEntries } from '@/lib/seo';

/**
 * 동적 sitemap.xml 생성
 * Next.js App Router 엔트리포인트(sitemap.xml)
 * 실제 URL 목록은 lib/seo/sitemap.ts에서 수집한 뒤 변환해 반환
 *
 * - 정적 페이지 (홈, 블로그 목록 등)
 * - 블로그 포스트 (SSG로 생성된 모든 포스트)
 * - 태그 페이지 (향후 구현 시)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries = collectSitemapEntries();

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
