import type { VerificationStatus, SourceType } from '@/types/place-source';

/**
 * 소스 신뢰도 정책
 * @see docs/superpowers/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md
 */

/** 발행 가능 검증 상태 집합 */
export const PUBLISHABLE_STATUSES: Set<VerificationStatus> = new Set([
  'official_verified',
  'semi_verified',
]);

/** 검증 상태별 한국어 레이블 */
export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  official_verified: '공식 검증',
  semi_verified: '준공식 검증',
  needs_refresh: '재검수 필요',
  discovery_only: '미검증 (발견만)',
};

/** 소스 타입별 한국어 레이블 */
export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  official: '공식 1차 소스',
  'semi-official': '공식/준공식 2차 소스',
  discovery: '민간 발견 소스',
};

/**
 * 장소 데이터가 발행 가능한지 확인
 */
export function isPublishable(status: VerificationStatus): boolean {
  return PUBLISHABLE_STATUSES.has(status);
}

/**
 * 리프레시 주기 정책 (일 단위)
 * - 상업형 가격/운영시간: 30일
 * - 공공 시설: 90일 (분기별)
 * - 혜택/지원금: 30일
 */
export const REFRESH_POLICY_DAYS = {
  commercial_price: 30,
  public_facility: 90,
  benefit: 30,
} as const;

/**
 * 마지막 검증일로부터 리프레시가 필요한지 확인
 */
export function needsRefresh(
  verifiedAt: string,
  refreshDays: number,
  referenceDate: Date = new Date()
): boolean {
  const verified = new Date(verifiedAt);
  const diffMs = referenceDate.getTime() - verified.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > refreshDays;
}
