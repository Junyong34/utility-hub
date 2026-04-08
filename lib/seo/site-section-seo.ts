export interface MetadataInput {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
}

interface RegionMetadataSource {
  slug: string;
  name: string;
  description: string;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function createPlacesMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '아이와 가볼 곳',
    description:
      '서울·경기·인천 중심으로 아이와 가볼 곳을 지역, 연령, 날씨, 예산 기준으로 빠르게 정리했습니다. 공식 소스로 검증한 장소 허브입니다.',
    canonical: `${siteUrl}/places`,
    keywords: [
      '아이와 가볼 곳',
      '서울 아이와 가볼 곳',
      '경기 아이와 가볼 곳',
      '인천 아이와 가볼 곳',
      '실내 키즈 장소',
      '비 오는 날 아이와 갈 곳',
    ],
  };
}

export function createBenefitsMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '육아 혜택·지원금',
    description:
      '부모급여, 아동수당, 지역 육아 혜택과 절약 가이드를 공식 출처 기준으로 정리한 육아 혜택 허브입니다.',
    canonical: `${siteUrl}/benefits`,
    keywords: [
      '육아 혜택',
      '육아 지원금',
      '부모급여',
      '아동수당',
      '서울 육아 지원',
      '경기 육아 혜택',
    ],
  };
}

export function createPlaceRegionMetadataInput(
  baseUrl: string,
  region: RegionMetadataSource
): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: `${region.name} 아이와 가볼 곳`,
    description: region.description,
    canonical: `${siteUrl}/places/${region.slug}`,
    keywords: [
      `${region.name} 아이와 가볼 곳`,
      `${region.name} 키즈카페`,
      `${region.name} 가족 나들이`,
      `${region.name} 실내 놀거리`,
    ],
  };
}

export function createBlogIndexMetadataInput(baseUrl: string): MetadataInput {
  const siteUrl = normalizeBaseUrl(baseUrl);

  return {
    title: '블로그',
    description:
      '아이와 가볼 곳, 육아 혜택, 생활 판단에 바로 쓰는 실전 가이드를 모았습니다. 비교표와 체크리스트 중심으로 빠르게 확인할 수 있게 정리합니다.',
    canonical: `${siteUrl}/blog`,
    keywords: [
      '육아 가이드',
      '아이와 가볼 곳 가이드',
      '육아 혜택 정리',
      '생활 판단 체크리스트',
      '비교 가이드',
    ],
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
      '육아형 허브',
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
  };
}
