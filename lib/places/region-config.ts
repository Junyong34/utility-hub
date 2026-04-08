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
    description: '공공 놀이시설과 박물관 중심의 서울 아이 가볼 곳',
    primaryType: 'public',
    isPhaseA: true,
  },
  {
    slug: 'gyeonggi-south',
    name: '경기 남부',
    shortName: '경기남부',
    description: '키즈카페와 체험시설이 많은 경기 남부 나들이 명소',
    primaryType: 'commercial',
    isPhaseA: true,
  },
  {
    slug: 'gyeonggi-north',
    name: '경기 북부',
    shortName: '경기북부',
    description: '자연과 함께하는 경기 북부 가족 여행지',
    primaryType: 'mixed',
    isPhaseA: true,
  },
  {
    slug: 'incheon',
    name: '인천',
    shortName: '인천',
    description: '바다와 항구가 있는 인천 아이와 가볼 곳',
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
