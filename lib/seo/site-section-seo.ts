import {
  resolvePlaceListIndexingPolicy,
  type PlaceListRawSearchParams,
} from '../places/place-pagination.ts';
import { buildBlogPaginationHref } from '../blog/pagination.ts';
import {
  normalizePositiveInteger,
  type PlaceListQueryOptions,
} from '../places/place-list-contract.ts';
import type { RegionSlug } from '../../types/place-source.ts';

export interface MetadataInput {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  ogImage?: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

interface RegionMetadataSource {
  slug: string;
  name: string;
  description: string;
}

type PlaceListMetadataOptions = Partial<PlaceListQueryOptions> & {
  totalPages?: number;
  placeIds?: string[];
  rawSearchParams?: PlaceListRawSearchParams;
};

type PaginationMetadataOptions = {
  page?: string | number | boolean | null | undefined | string[];
  totalPages?: number;
};

type BlogListMetadataOptions = PaginationMetadataOptions;

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

const SECTION_OG_IMAGES = {
  home: '/og-images/home-og-image.webp',
  places: '/og-images/places-og-image.webp',
  tools: '/og-images/tools-og-image.webp',
  benefits: '/og-images/benefits-og-image.webp',
  blog: '/og-images/blog-og-image.webp',
} as const;

export function createHomeMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '아이와 갈 곳, 조건별로 빠르게 찾으세요',
    description:
      '서울·경기·인천에서 아이와 갈 곳을 지역, 연령, 날씨, 예산 기준으로 바로 찾는 실용형 육아 홈입니다. 장소 탐색, 도구, 혜택·지원금을 한 화면에서 정리합니다.',
    canonical: siteUrl,
    keywords: [
      '아이와 갈 곳',
      '아이와 가볼 곳',
      '서울 아이와 갈 곳',
      '경기 아이와 갈 곳',
      '인천 아이와 갈 곳',
      '수도권 육아 나들이',
    ],
    ogImage: SECTION_OG_IMAGES.home,
  };
}

export function createPlacesMetadataInput(
  baseUrl: string,
  options: PlaceListMetadataOptions = {}
): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);
  const { page, policy } = resolvePlaceListMetadata(options);
  const pageSuffix = policy.index && page > 1 ? ` - 페이지 ${page}` : '';

  return {
    title: `아이와 가볼 곳${pageSuffix}`,
    description:
      '서울·경기·인천에서 아이와 가볼 곳을 지역과 조건별로 빠르게 찾을 수 있는 장소 입니다. 출처와 확인 시점을 함께 안내합니다.',
    canonical: `${siteUrl}${policy.canonicalPath}`,
    robots: { index: policy.index, follow: policy.follow },
    keywords: [
      '아이와 가볼 곳',
      '서울 아이와 가볼 곳',
      '경기 아이와 가볼 곳',
      '인천 아이와 가볼 곳',
      '실내 키즈 장소',
      '비 오는 날 아이와 갈 곳',
    ],
    ogImage: SECTION_OG_IMAGES.places,
  };
}

export function createBenefitsMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '육아 혜택·지원금',
    description:
      '부모급여, 아동수당, 지역 육아 혜택과 절약 가이드를 공식 출처 기준으로 정리한 육아 혜택 입니다.',
    canonical: `${siteUrl}/benefits`,
    keywords: [
      '육아 혜택',
      '육아 지원금',
      '부모급여',
      '아동수당',
      '서울 육아 지원',
      '경기 육아 혜택',
    ],
    ogImage: SECTION_OG_IMAGES.benefits,
  };
}

export function createPlaceRegionMetadataInput(
  baseUrl: string,
  region: RegionMetadataSource,
  options: PlaceListMetadataOptions = {}
): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);
  const { page, policy } = resolvePlaceListMetadata(options, region.slug);
  const pageSuffix = policy.index && page > 1 ? ` - 페이지 ${page}` : '';

  return {
    title: `${region.name} 아이와 가볼 곳${pageSuffix}`,
    description: region.description,
    canonical: `${siteUrl}${policy.canonicalPath}`,
    robots: { index: policy.index, follow: policy.follow },
    keywords: [
      `${region.name} 아이와 가볼 곳`,
      `${region.name} 키즈카페`,
      `${region.name} 가족 나들이`,
      `${region.name} 실내 놀거리`,
    ],
  };
}

function normalizeMetadataPage(options: PaginationMetadataOptions): number {
  const page = normalizePositiveInteger(options.page, 1);

  if (!options.totalPages) {
    return page;
  }

  return Math.min(page, normalizePositiveInteger(options.totalPages, 1));
}

function resolvePlaceListMetadata(
  options: PlaceListMetadataOptions,
  region?: string
) {
  const page = normalizeMetadataPage(options);
  const rawSearchParams = getPlaceListRawSearchParams(options);
  const placeIds = options.placeIds ?? ['metadata-placeholder'];
  const policy = resolvePlaceListIndexingPolicy({
    page: {
      currentPage: page,
      totalPages: Math.max(
        page,
        normalizePositiveInteger(options.totalPages, page)
      ),
      places: placeIds.map(id => ({ id })),
    },
    rawSearchParams,
    region: region as RegionSlug | undefined,
  });

  return { page, policy };
}

function getPlaceListRawSearchParams(
  options: PlaceListMetadataOptions
): PlaceListRawSearchParams {
  if (options.rawSearchParams) {
    return options.rawSearchParams;
  }

  const {
    totalPages: _,
    placeIds: __,
    rawSearchParams: ___,
    ...query
  } = options;
  return query as PlaceListRawSearchParams;
}

export function createBlogIndexMetadataInput(
  baseUrl: string,
  options: BlogListMetadataOptions = {}
): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);
  const page = normalizeMetadataPage(options);
  const pageSuffix = page > 1 ? ` - 페이지 ${page}` : '';

  return {
    title: `블로그${pageSuffix}`,
    description:
      '생활가이드 및 팁 정보를 모았습니다. 생활 속 선택과 비용 판단에 필요한 내용을 비교표와 체크리스트 중심으로 빠르게 확인할 수 있게 정리합니다.',
    canonical: `${siteUrl}${buildBlogPaginationHref({
      page,
      totalPages: options.totalPages,
    })}`,
    keywords: [
      '생활가이드',
      '생활 팁',
      '생활 정보',
      '생활 판단 체크리스트',
      '비교 정보',
    ],
    ogImage: SECTION_OG_IMAGES.blog,
  };
}

export function createAboutMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: 'Zento 소개',
    description:
      'Zento가 수도권 부모를 위해 아이와 갈 곳, 필요한 도구, 혜택 정보를 어떤 기준으로 정리하는지 설명하는 소개 페이지입니다.',
    canonical: `${siteUrl}/about`,
    keywords: [
      'Zento 소개',
      '육아형 ',
      '아이와 가볼 곳 서비스',
      '육아 도구',
      '육아 혜택 정보',
    ],
  };
}

export function createFaqMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '자주 묻는 질문',
    description:
      '아이와 가볼 곳 탐색, 계산 도구 사용, 육아 혜택 확인 과정에서 자주 묻는 질문과 면책 정보를 한 번에 확인하세요.',
    canonical: `${siteUrl}/faq`,
    keywords: [
      'FAQ',
      '자주 묻는 질문',
      '아이와 가볼 곳 FAQ',
      '육아 혜택 FAQ',
      '계산 도구 사용법',
    ],
  };
}

export function createToolsMainMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '도구 모음',
    description:
      '아이와 나들이 계획, 생활비 판단, 금융 계산에 함께 쓰는 계산·비교 도구 모음입니다. 장소 탐색 다음 단계에서 바로 활용할 수 있게 정리했습니다.',
    canonical: `${siteUrl}/tools`,
    keywords: [
      '도구 모음',
      '육아 도구',
      '나들이 예산 계산',
      '생활비 계산기',
      '대출 계산기',
      'DSR 계산기',
    ],
    ogImage: SECTION_OG_IMAGES.tools,
  };
}
