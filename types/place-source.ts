/**
 * 장소/시설 데이터 소스 타입 정의
 * Phase A 수도권 중심 육아형 리브랜딩 기준
 * @see docs/superpowers/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md
 */

/** 수도권 지역 슬러그 */
export type RegionSlug = 'seoul' | 'gyeonggi-south' | 'gyeonggi-north' | 'incheon';

/** 시설 카테고리 */
export type PlaceCategory =
  | 'baby-kids-cafe'  // 베이비키즈카페 (영아 전용, 0~36개월 특화)
  | 'kids-cafe'       // 키즈카페
  | 'public-play'     // 공공 놀이시설
  | 'museum'          // 박물관/과학관
  | 'experience'      // 체험관/체험시설
  | 'park'            // 공원/야외시설
  | 'library'         // 도서관/장난감도서관
  | 'culture'         // 문화센터/공연시설
  | 'sports';         // 체육시설/수영장

/** 연령대 구분 */
export type AgeBand =
  | '0-12m'   // 0~12개월
  | '1-3y'    // 1~3세
  | '3-6y'    // 3~6세
  | '6-10y'   // 6~10세
  | 'all';    // 전 연령

/** 실내/외 구분 */
export type IndoorOutdoor = 'indoor' | 'outdoor' | 'both';

/** 가격 유형 */
export type PriceType = 'free' | 'paid' | 'partial-free';

/** 운영 주체 유형 */
export type OperatorType = 'public' | 'commercial' | 'non-profit';

/** 소스 레벨 (신뢰도 수준) */
export type SourceType =
  | 'official'      // Level 1: 공식 1차 소스
  | 'semi-official' // Level 2: 공식/준공식 2차 소스
  | 'discovery';    // Level 3: 민간 발견 소스

/**
 * 검증 상태 enum
 * 발행 가능: official_verified, semi_verified
 * 발행 불가: needs_refresh, discovery_only
 */
export type VerificationStatus =
  | 'official_verified' // 공식 소스로 검증 완료
  | 'semi_verified'     // 준공식 소스로 검증 완료
  | 'needs_refresh'     // 재검수 필요
  | 'discovery_only';   // 발견만 됨, 미검증

/** 발행 가능 상태 집합 */
export const PUBLISHABLE_STATUSES: VerificationStatus[] = [
  'official_verified',
  'semi_verified',
];

/**
 * 장소 카드 최소 필드 (카드 렌더링에 필수)
 */
export interface PlaceCardFields {
  /** 고유 ID (slug 형태, 예: seoul-kids-national-museum) */
  id: string;
  /** 시설 이름 */
  name: string;
  /** 수도권 지역 슬러그 */
  region: RegionSlug;
  /** 세부 지역 (예: 종로구, 수원시) */
  subRegion: string;
  /** 시설 카테고리 */
  category: PlaceCategory;
  /** 권장 연령대 (복수 선택 가능) */
  ageBands: AgeBand[];
  /** 실내/외 구분 */
  indoorOutdoor: IndoorOutdoor;
  /** 가격 유형 */
  priceType: PriceType;
  /** 사전 예약 필요 여부 */
  reservationRequired: boolean;
  /** 주차 가능 여부 */
  parking: boolean;
}

/**
 * 운영/검증 메타 필드 (내부 관리용)
 */
export interface PlaceVerificationMeta {
  /** 소스 신뢰도 레벨 */
  sourceType: SourceType;
  /** 공식 확인 링크 (URL) */
  sourceUrl: string;
  /** 마지막 공식 검증 날짜 (YYYY-MM-DD) */
  verifiedAt: string;
  /** 마지막 관측 날짜 (YYYY-MM-DD) */
  lastObservedAt: string;
  /** 검증 상태 */
  verificationStatus: VerificationStatus;
}

/**
 * 장소 카드 권장 부가 필드
 */
export interface PlaceOptionalFields {
  /** 시설 설명 (1~2문장) */
  description?: string;
  /** 주소 */
  address?: string;
  /** 운영 시간 (예: 10:00-18:00) */
  operatingHours?: string;
  /** 입장료 정보 (예: 성인 5,000원, 아동 3,000원) */
  priceInfo?: string;
  /** 수유실 여부 */
  feedingRoom?: boolean;
  /** 유모차 진입 가능 여부 */
  strollerFriendly?: boolean;
  /** 우천 시 이용 가능 여부 */
  rainFriendly?: boolean;
  /** 평균 체류 시간 (분) */
  stayMinutes?: number;
  /** 운영 주체 유형 */
  operatorType?: OperatorType;
  /** 편집자 메모 */
  editorNote?: string;
  /** 연결된 블로그 포스트 슬러그 목록 */
  linkedPostSlugs?: string[];
  /** 대표 이미지 경로 (public 기준) */
  thumbnailImage?: string;
}

/**
 * 완전한 장소 데이터 타입
 * PlaceCardFields + PlaceVerificationMeta + PlaceOptionalFields
 */
export interface PlaceSource extends PlaceCardFields, PlaceVerificationMeta, PlaceOptionalFields {}

/**
 * 블로그 포스트에서 장소를 참조하는 연결 필드
 * frontmatter에 placeIds 배열로 사용
 */
export interface PlaceReference {
  placeId: string;
  region: RegionSlug;
}
