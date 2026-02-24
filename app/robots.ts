import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

/**
 * 동적 robots.txt 생성
 * Next.js App Router의 robots.ts 파일
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      // AI 크롤러 차단 (선택사항)
      {
        userAgent: ['GPTBot', 'CCBot', 'anthropic-ai'],
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
