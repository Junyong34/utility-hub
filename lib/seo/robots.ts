import type { RobotRule } from '@/types/seo';
import { SITE_CONFIG } from './metadata';

/**
 * robots.txt 규칙 정의
 */
export const ROBOT_RULES: RobotRule[] = [
  // 모든 크롤러 기본 규칙
  {
    userAgent: '*',
    allow: '/',
    disallow: [
      '/api/', // API 경로 차단
      '/_next/', // Next.js 내부 파일
      '/admin/', // 관리자 페이지 (있는 경우)
      '/private/', // 비공개 경로
    ],
  },

  // Google 크롤러 특별 규칙
  {
    userAgent: 'Googlebot',
    allow: '/',
  },

  // 이미지 크롤러
  {
    userAgent: 'Googlebot-Image',
    allow: '/',
  },

  // GEO 대상 AI 봇 허용
  {
    userAgent: [
      'Bingbot',
      'GPTBot',
      'ChatGPT-User',
      'PerplexityBot',
      'ClaudeBot',
      'anthropic-ai',
    ],
    allow: '/',
  },
];

/**
 * robots.txt 텍스트 생성
 */
export function generateRobotsTxt(rules: RobotRule[]): string {
  let robotsTxt = '';

  rules.forEach((rule) => {
    const userAgents = Array.isArray(rule.userAgent)
      ? rule.userAgent
      : [rule.userAgent];

    userAgents.forEach((agent) => {
      robotsTxt += `User-agent: ${agent}\n`;

      // Allow 규칙
      if (rule.allow) {
        const allows = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
        allows.forEach((path) => {
          robotsTxt += `Allow: ${path}\n`;
        });
      }

      // Disallow 규칙
      if (rule.disallow) {
        const disallows = Array.isArray(rule.disallow)
          ? rule.disallow
          : [rule.disallow];
        disallows.forEach((path) => {
          robotsTxt += `Disallow: ${path}\n`;
        });
      }

      // Crawl-delay
      if (rule.crawlDelay) {
        robotsTxt += `Crawl-delay: ${rule.crawlDelay}\n`;
      }

      robotsTxt += '\n';
    });
  });

  // 사이트맵 추가
  robotsTxt += `# Sitemaps\n`;
  robotsTxt += `Sitemap: ${SITE_CONFIG.url}/sitemap.xml\n`;

  return robotsTxt;
}

/**
 * 기본 robots.txt 생성
 */
export function getDefaultRobotsTxt(): string {
  return generateRobotsTxt(ROBOT_RULES);
}

/**
 * 특정 경로를 차단하는 robots.txt 규칙 추가
 */
export function addDisallowPath(path: string): RobotRule {
  return {
    userAgent: '*',
    disallow: path,
  };
}

/**
 * 개발/프로덕션 환경별 robots.txt 생성
 */
export function generateEnvironmentRobotsTxt(
  env: 'development' | 'production'
): string {
  if (env === 'development') {
    // 개발 환경에서는 모든 크롤링 차단
    return `User-agent: *
Disallow: /
`;
  }

  return getDefaultRobotsTxt();
}

/**
 * 크롤링 정책 검증
 */
export function validateCrawlPath(path: string): {
  allowed: boolean;
  reason?: string;
} {
  // 차단된 경로 패턴
  const disallowedPatterns = ROBOT_RULES.flatMap((rule) =>
    Array.isArray(rule.disallow) ? rule.disallow : rule.disallow ? [rule.disallow] : []
  );

  for (const pattern of disallowedPatterns) {
    if (path.startsWith(pattern.replace('*', ''))) {
      return {
        allowed: false,
        reason: `Path matches disallowed pattern: ${pattern}`,
      };
    }
  }

  return { allowed: true };
}
