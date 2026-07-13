import { PUBLIC_ENV } from './env/public.ts';

export const SITE_CONFIG = {
  name: 'Zento',
  title: 'Zento - 아이와 갈 곳, 조건별로 빠르게 찾으세요',
  description:
    '서울·경기 중심으로 아이와 가볼 곳을 지역, 연령, 날씨, 예산 기준으로 빠르게 정리합니다. 나들이 예산 계산, 육아 혜택·지원금 정보까지 한 번에.',
  url: PUBLIC_ENV.siteUrl,
  ogImage: '/og-images/home-og-image.webp',
  locale: 'ko_KR',
  author: 'Zento',
  social: {},
} as const;

export const SITE_VERIFICATION_CONFIG = {
  naver: '02fee2c3f11fc3e1adf2520de92918a360a75556',
} as const;

export const WEB_ANALYTICS_CONFIG = {
  googleTagId: 'G-KG82C2B3TH',
} as const;

export const SHARE_COPY_CONFIG = {
  defaultTitle: 'Zento - 비교하고 계산해 결정하는 생활 가이드',
  defaultDescription:
    '주차, 소비자 비교, 대출·저축·주택 비용 계산까지. 비용과 선택을 빠르게 정리해주는 실전 가이드와 도구를 제공합니다.',
  blogDescription:
    '비교표와 체크리스트로 판단하는 실전 생활 가이드를 모았습니다.',
  toolsDescription:
    '비용 계산과 조건 비교에 도움이 되는 실전 도구를 모았습니다.',
} as const;
