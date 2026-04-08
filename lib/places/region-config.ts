import type { RegionSlug } from '@/types/place-source';

export interface RegionConfig {
  slug: RegionSlug;
  name: string;
  shortName: string;
  description: string;
  primaryType: 'public' | 'commercial' | 'mixed';
  /** Phase A 구현 범위 여부 */
  isPhaseA: boolean;
}

/** Phase A 수도권 지역 설정 */
export const REGION_CONFIGS: RegionConfig[] = [
  {
    slug: 'seoul',
    name: '서울',
    shortName: '서울',
    description: '국립박물관, 어린이대공원, 공공 체험시설까지 — 서울의 아이와 가볼 곳을 모았습니다.',
    primaryType: 'public',
    isPhaseA: true,
  },
  {
    slug: 'gyeonggi-south',
    name: '경기 남부',
    shortName: '경기남부',
    description: '키즈카페, 어린이박물관, 체험농장까지 — 경기 남부의 아이와 가볼 곳을 모았습니다.',
    primaryType: 'commercial',
    isPhaseA: true,
  },
  {
    slug: 'gyeonggi-north',
    name: '경기 북부',
    shortName: '경기북부',
    description: '자연 속 체험농장, 수목원, 생태공원까지 — 경기 북부의 아이와 가볼 곳을 모았습니다.',
    primaryType: 'mixed',
    isPhaseA: true,
  },
  {
    slug: 'incheon',
    name: '인천',
    shortName: '인천',
    description: '바다·항구·차이나타운까지 — 인천의 아이와 가볼 곳을 모았습니다.',
    primaryType: 'mixed',
    isPhaseA: true,
  },
];

/** Phase A 활성 지역만 반환 */
export function getPhaseARegions(): RegionConfig[] {
  return REGION_CONFIGS.filter(r => r.isPhaseA);
}

/** 슬러그로 지역 설정 조회 */
export function getRegionBySlug(slug: string): RegionConfig | undefined {
  return REGION_CONFIGS.find(r => r.slug === slug);
}

/** 유효한 Phase A 지역 슬러그 집합 */
export const PHASE_A_REGION_SLUGS: RegionSlug[] = REGION_CONFIGS
  .filter(r => r.isPhaseA)
  .map(r => r.slug);
