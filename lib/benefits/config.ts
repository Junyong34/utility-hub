/**
 * 혜택  카테고리 설정
 * Phase A: 정부지원 / 지역 혜택 / 절약 가이드
 */

export interface BenefitCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}

export const BENEFIT_CATEGORIES: BenefitCategory[] = [
  {
    id: 'government',
    name: '정부 지원',
    description: '부모급여, 아동수당, 보육료 지원 등 국가 지원 정책',
    icon: 'building',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverColor: 'hover:border-blue-500/50',
  },
  {
    id: 'regional',
    name: '지역 혜택',
    description: '서울·경기 지자체별 육아 가족 지원 혜택',
    icon: 'map-pin',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    hoverColor: 'hover:border-emerald-500/50',
  },
  {
    id: 'savings',
    name: '절약 가이드',
    description: '나들이·교육비·생활비 절약 실전 팁',
    icon: 'piggy-bank',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    hoverColor: 'hover:border-orange-500/50',
  },
];

/** 혜택 관련 공식 소스 */
export const OFFICIAL_BENEFIT_SOURCES = [
  { name: '정부24', url: 'https://www.gov.kr/' },
  { name: '복지로', url: 'https://www.bokjiro.go.kr/' },
  { name: '고용노동부', url: 'https://www.moel.go.kr/' },
  { name: '보건복지부', url: 'https://www.mohw.go.kr/' },
];
