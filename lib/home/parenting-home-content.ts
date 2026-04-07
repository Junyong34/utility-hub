import { getAllPosts } from '@/lib/blog/posts';
import type { BlogPostSummary } from '@/lib/blog/types';
import { BENEFIT_CATEGORIES } from '@/lib/benefits/config';
import {
  getPlaceCountByRegion,
  getPublishablePlaces,
} from '@/lib/places/place-content';
import { REGION_CONFIGS } from '@/lib/places/region-config';
import { getAllToolConfigs } from '@/lib/tools';
import type { ToolConfig } from '@/lib/tools';
import type {
  AgeBand,
  PlaceCategory,
  PlaceSource,
  RegionSlug,
} from '@/types/place-source';
import type {
  HomeAccentTone,
  HomeFeaturedPlaceCardItem,
  HomeFilterChip,
  HomeGuideCardItem,
  HomeLinkCardItem,
  ParentingHomeContent,
} from '@/types/home';

const FEATURED_PLACE_IDS = [
  'national-children-museum',
  'seoul-national-museum-of-korea',
  'gyeonggi-children-museum',
  'seoul-children-grand-park',
] as const;
const FEATURED_PLACE_ID_SET = new Set<string>(FEATURED_PLACE_IDS);

const HERO_QUICK_FILTERS: HomeFilterChip[] = [
  { id: 'age-1-3', label: '1~3세', href: '/places?age=1-3y' },
  { id: 'free', label: '무료', href: '/places?free=true' },
  { id: 'indoor', label: '실내', href: '/places?indoor=true' },
  { id: 'rain', label: '비 오는 날', href: '/places?rain=true' },
];

const SCENARIO_LINKS: HomeLinkCardItem[] = [
  {
    id: 'scenario-indoor',
    eyebrow: '상황별',
    title: '실내 나들이',
    description: '비 오거나 더운 날에도 바로 갈 수 있는 곳만 먼저 모아봅니다.',
    href: '/places?indoor=true',
    ctaLabel: '실내 장소 보기',
    tone: 'olive',
  },
  {
    id: 'scenario-rain',
    eyebrow: '상황별',
    title: '비 오는 날',
    description: '우천 가능 표시가 있는 장소 위주로 빠르게 고릅니다.',
    href: '/places?rain=true',
    ctaLabel: '우천 가능 장소 보기',
    tone: 'sky',
  },
  {
    id: 'scenario-free',
    eyebrow: '상황별',
    title: '무료 코스',
    description: '입장료 부담이 적은 공공 시설과 무료 공간부터 살펴봅니다.',
    href: '/places?free=true',
    ctaLabel: '무료 장소 보기',
    tone: 'sand',
  },
  {
    id: 'scenario-toddler',
    eyebrow: '상황별',
    title: '1~3세 추천',
    description: '영유아 동선과 체류 시간을 고려한 장소부터 확인합니다.',
    href: '/places?age=1-3y',
    ctaLabel: '1~3세 장소 보기',
    tone: 'brick',
  },
];

const TOOL_SECTION_IDS = [
  'savings-calculator',
  'loan-calculator',
  'home-buying-funds-calculator',
] as const;

const TOOL_SECTION_COPY: Record<
  (typeof TOOL_SECTION_IDS)[number],
  Omit<HomeLinkCardItem, 'id' | 'href'>
> = {
  'savings-calculator': {
    eyebrow: '도구',
    title: '예금·적금 계산',
    description: '주말 지출 뒤 남는 돈과 저축 계획을 같이 점검할 때 씁니다.',
    ctaLabel: '도구 열기',
    tone: 'olive',
  },
  'loan-calculator': {
    eyebrow: '도구',
    title: '대출 부담 계산',
    description:
      '가계 지출 여유를 볼 때 월 상환액과 총 이자를 빠르게 계산합니다.',
    ctaLabel: '도구 열기',
    tone: 'sky',
  },
  'home-buying-funds-calculator': {
    eyebrow: '도구',
    title: '집 살 때 총비용',
    description:
      '주거 계획을 세울 때 필요한 자기자본과 부대비용을 함께 봅니다.',
    ctaLabel: '도구 열기',
    tone: 'sand',
  },
};

const BENEFIT_TONE_BY_ID: Record<string, HomeAccentTone> = {
  government: 'sky',
  regional: 'olive',
  savings: 'brick',
};

const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  'baby-kids-cafe': '베이비키즈카페',
  'kids-cafe': '키즈카페',
  'public-play': '공공 놀이시설',
  museum: '박물관',
  experience: '체험시설',
  park: '공원',
  library: '도서관',
  culture: '문화시설',
  sports: '체육시설',
};

const AGE_BAND_LABELS: Record<AgeBand, string> = {
  '0-12m': '0~12개월',
  '1-3y': '1~3세',
  '3-6y': '3~6세',
  '6-10y': '6~10세',
  all: '전 연령',
};

const REGION_TONES: Record<RegionSlug, HomeAccentTone> = {
  seoul: 'olive',
  'gyeonggi-south': 'sand',
  'gyeonggi-north': 'sky',
  incheon: 'brick',
};

function getRegionMeta(placeCount: number): string {
  return placeCount > 0 ? `현재 ${placeCount}곳 정리` : '장소 데이터 준비 중';
}

function getRegionCountLabel(placeCount: number): string {
  return placeCount > 0 ? `${placeCount}곳` : '준비 중';
}

function summarizeAgeBands(ageBands: AgeBand[]): string {
  if (ageBands.includes('all')) {
    return AGE_BAND_LABELS.all;
  }

  const labels = ageBands.map(ageBand => AGE_BAND_LABELS[ageBand]);
  return labels.length > 1 ? `${labels[0]} 포함` : (labels[0] ?? '연령 정보');
}

function getPlaceConditions(place: PlaceSource): string[] {
  const conditions: string[] = [];

  if (place.indoorOutdoor === 'indoor') {
    conditions.push('실내');
  } else if (place.indoorOutdoor === 'outdoor') {
    conditions.push('야외');
  } else {
    conditions.push('실내·야외');
  }

  if (place.priceType === 'free') {
    conditions.push('무료');
  } else if (place.priceType === 'partial-free') {
    conditions.push('부분 무료');
  } else {
    conditions.push('유료');
  }

  if (place.rainFriendly) {
    conditions.push('우천 가능');
  }

  if (place.strollerFriendly) {
    conditions.push('유모차 가능');
  }

  return conditions.slice(0, 3);
}

function sortPostsByLatest(posts: BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function buildRegionLinks(
  placeCountByRegion: Record<string, number>
): HomeLinkCardItem[] {
  return REGION_CONFIGS.map(region => {
    const placeCount = placeCountByRegion[region.slug] ?? 0;

    return {
      id: `region-${region.slug}`,
      eyebrow: '지역별',
      title: region.name,
      description: region.description,
      href: `/places/${region.slug}`,
      ctaLabel: '지역 보기',
      tone: REGION_TONES[region.slug],
      meta: getRegionMeta(placeCount),
      countLabel: getRegionCountLabel(placeCount),
    };
  });
}

function buildFeaturedPlaces(
  places: PlaceSource[]
): HomeFeaturedPlaceCardItem[] {
  const placeById = new Map(places.map(place => [place.id, place]));
  const curated = FEATURED_PLACE_IDS.map(placeId =>
    placeById.get(placeId)
  ).filter((place): place is PlaceSource => Boolean(place));

  const fallback = places
    .filter(place => !FEATURED_PLACE_ID_SET.has(place.id))
    .sort((a, b) => {
      const thumbnailScore =
        Number(Boolean(b.thumbnailImage)) - Number(Boolean(a.thumbnailImage));
      if (thumbnailScore !== 0) {
        return thumbnailScore;
      }

      const rainScore =
        Number(Boolean(b.rainFriendly)) - Number(Boolean(a.rainFriendly));
      if (rainScore !== 0) {
        return rainScore;
      }

      return (b.stayMinutes ?? 0) - (a.stayMinutes ?? 0);
    });

  return [...curated, ...fallback].slice(0, 4).map(place => ({
    id: place.id,
    title: place.name,
    description: place.description ?? `${place.subRegion} 아이와 가볼 곳`,
    href: `/places/${place.region}`,
    tone: REGION_TONES[place.region],
    regionLabel:
      REGION_CONFIGS.find(region => region.slug === place.region)?.name ??
      place.region,
    subRegion: place.subRegion,
    categoryLabel: CATEGORY_LABELS[place.category],
    ageLabel: summarizeAgeBands(place.ageBands),
    conditions: getPlaceConditions(place),
    thumbnailImage: place.thumbnailImage,
    sourceUrl: place.sourceUrl,
  }));
}

function buildToolLinks(tools: ToolConfig[]): HomeLinkCardItem[] {
  const toolById = new Map(tools.map(tool => [tool.id, tool]));

  return TOOL_SECTION_IDS.reduce<HomeLinkCardItem[]>((items, toolId) => {
    const tool = toolById.get(toolId);
    const copy = TOOL_SECTION_COPY[toolId];

    if (!tool) {
      return items;
    }

    items.push({
      id: `tool-${tool.id}`,
      href: `/tools/${tool.id}`,
      title: copy.title,
      description: copy.description,
      eyebrow: copy.eyebrow,
      ctaLabel: copy.ctaLabel,
      tone: copy.tone,
      ...(tool.shortName ? { meta: tool.shortName } : {}),
    });

    return items;
  }, []);
}

function buildBenefitLinks(): HomeLinkCardItem[] {
  return BENEFIT_CATEGORIES.map(category => ({
    id: `benefit-${category.id}`,
    eyebrow: '혜택·지원금',
    title: category.name,
    description: category.description,
    href: `/blog?tag=${category.id}`,
    ctaLabel: '관련 글 보기',
    tone: BENEFIT_TONE_BY_ID[category.id] ?? 'sand',
    meta: '공식 출처 기준',
  }));
}

function getGuideTone(categorySlug: string): HomeAccentTone {
  if (categorySlug === 'consumer') {
    return 'brick';
  }

  if (categorySlug === 'investment') {
    return 'olive';
  }

  if (categorySlug === 'parking') {
    return 'sand';
  }

  return 'sky';
}

function buildLatestGuides(posts: BlogPostSummary[]): HomeGuideCardItem[] {
  return sortPostsByLatest(posts)
    .slice(0, 3)
    .map(post => ({
      id: `guide-${post.categorySlug}-${post.slug}`,
      eyebrow: '최신 가이드',
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.categorySlug}/${post.slug}`,
      ctaLabel: '가이드 읽기',
      tone: getGuideTone(post.categorySlug),
      meta: `${post.category} · ${post.date}`,
      publishedAt: post.date,
    }));
}

export function buildParentingHomeContent(
  posts: BlogPostSummary[],
  tools: ToolConfig[],
  places: PlaceSource[],
  placeCountByRegion: Record<string, number>
): ParentingHomeContent {
  return {
    heroQuickFilters: HERO_QUICK_FILTERS,
    regionLinks: buildRegionLinks(placeCountByRegion),
    scenarioLinks: SCENARIO_LINKS,
    toolLinks: buildToolLinks(tools),
    benefitLinks: buildBenefitLinks(),
    latestGuides: buildLatestGuides(posts),
    featuredPlaces: buildFeaturedPlaces(places),
  };
}

export function getParentingHomeContent(): ParentingHomeContent {
  return buildParentingHomeContent(
    getAllPosts(),
    getAllToolConfigs(),
    getPublishablePlaces(),
    getPlaceCountByRegion()
  );
}
