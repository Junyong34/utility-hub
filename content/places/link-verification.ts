import {
  PUBLISHABLE_STATUSES,
  type PlaceSource,
} from '../../types/place-source.ts';

export const SOURCE_PAGE_ERROR_TEXT_PATTERNS = [
  'forbidden',
  'access denied',
  'not found',
  '서비스를 이용할 수 없습니다',
  '페이지를 찾을 수 없습니다',
  '존재하지 않는',
  '잘못된 접근',
  '접근이 제한',
  '이 사이트에 연결할 수 없음',
  'dns_probe_finished_nxdomain',
] as const;

export const NAVER_MAP_ERROR_TEXT_PATTERNS = [
  ...SOURCE_PAGE_ERROR_TEXT_PATTERNS,
  '서비스 이용이 제한되었습니다',
  '과도한 접근 요청으로 서비스 이용이 제한되었습니다',
  '잠시 후 다시 시도해주세요',
  '검색결과',
  '장소를 찾을 수 없습니다',
  '검색어를 입력',
  '일치하는 장소가 없습니다',
] as const;

export const NAVER_MAP_BLOCK_TEXT_PATTERNS = [
  '서비스 이용이 제한되었습니다',
  '과도한 접근 요청으로 서비스 이용이 제한되었습니다',
  '잠시 후 다시 시도해주세요',
] as const;

type LinkExpectation = {
  sourceMatchAny?: string[];
  sourceRejectAny?: string[];
  naverMatchAny?: string[];
  naverRejectAny?: string[];
};

const PLACE_LINK_EXPECTATIONS: Partial<Record<string, LinkExpectation>> = {
  'national-children-museum': {
    sourceMatchAny: ['국립어린이박물관', '어린이박물관'],
  },
  everland: {
    sourceMatchAny: ['에버랜드', 'everland'],
    naverRejectAny: ['롯데월드'],
  },
  'incheon-aisarang-dream-center-seo-gu-4': {
    naverMatchAny: ['청라호수공원한신더휴', '호수공원한신더휴'],
    naverRejectAny: ['더벤티'],
  },
  'goyang-ilovemom-cafe-hwajeong': {
    naverMatchAny: ['고양특례시육아종합지원센터', '고양시육아종합지원센터'],
  },
  'paju-ilovemom-cafe': {
    sourceMatchAny: ['파주시육아종합지원센터', '아이러브맘카페'],
    naverMatchAny: ['파주시육아종합지원센터', '아이러브맘카페'],
  },
  'seongnam-isarang-playground-sunae': {
    sourceMatchAny: [
      '수내아이사랑놀이터',
      '수내 아이사랑놀이터',
      '수내',
      '아이사랑놀이터',
    ],
  },
  'seoul-public-kids-cafe-yangjae1': {
    sourceMatchAny: ['서리풀노리학교', '양재1동점'],
    naverMatchAny: ['서리풀노리학교', '양재1동점', '양재공영주차빌딩'],
  },
};

function uniqueTerms(terms: Array<string | undefined>): string[] {
  return [
    ...new Set(
      terms
        .map(term => term?.trim())
        .filter((term): term is string => Boolean(term))
    ),
  ];
}

export function normalizeMatchText(input: string): string {
  return input.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
}

export function matchesAnyNormalizedText(
  text: string,
  candidates: readonly string[]
): boolean {
  return candidates.some(candidate =>
    text.includes(normalizeMatchText(candidate))
  );
}

export function stripHtmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getSourceUrlTestPlaces(places: PlaceSource[]): PlaceSource[] {
  return places.filter(
    place =>
      PUBLISHABLE_STATUSES.includes(place.verificationStatus) &&
      place.sourceUrl.length > 0
  );
}

export function getNaverMapTestPlaces(places: PlaceSource[]): PlaceSource[] {
  return places.filter(
    place =>
      PUBLISHABLE_STATUSES.includes(place.verificationStatus) &&
      Boolean(place.naverMapUrl)
  );
}

export function getSourceLinkExpectation(place: PlaceSource): {
  matchAny: string[];
  rejectAny: string[];
} {
  const explicit = PLACE_LINK_EXPECTATIONS[place.id];

  return {
    matchAny: uniqueTerms([
      ...(explicit?.sourceMatchAny ?? []),
      place.name,
      place.name.replace(/\s+/g, ''),
      place.subRegion,
    ]),
    rejectAny: uniqueTerms(explicit?.sourceRejectAny ?? []),
  };
}

export function getNaverMapLinkExpectation(place: PlaceSource): {
  matchAny: string[];
  rejectAny: string[];
} {
  const explicit = PLACE_LINK_EXPECTATIONS[place.id];

  return {
    matchAny: uniqueTerms([
      ...(explicit?.naverMatchAny ?? []),
      place.name,
      place.name.replace(/\s+/g, ''),
      place.subRegion,
    ]),
    rejectAny: uniqueTerms(explicit?.naverRejectAny ?? []),
  };
}
