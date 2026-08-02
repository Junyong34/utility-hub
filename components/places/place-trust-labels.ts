import {
  SOURCE_TYPE_LABELS,
  VERIFICATION_STATUS_LABELS,
} from '../../lib/places/source-policy.ts';
import type {
  PlaceSource,
  SourceType,
  VerificationStatus,
} from '../../types/place-source.ts';

type PlaceTrustSource = Pick<
  PlaceSource,
  'sourceType' | 'verificationStatus' | 'verifiedAt'
>;

export function getPlaceSourceLinkLabel({
  sourceType,
  verificationStatus,
}: Pick<PlaceTrustSource, 'sourceType' | 'verificationStatus'>): string {
  if (sourceType === 'official' && verificationStatus === 'official_verified') {
    return '공식 정보 확인';
  }

  if (
    sourceType === 'semi-official' &&
    verificationStatus === 'semi_verified'
  ) {
    return '판매·운영 정보 확인';
  }

  return `${SOURCE_TYPE_LABELS[sourceType]} 확인`;
}

export function getPlaceVerificationLabel({
  sourceType,
  verificationStatus,
  verifiedAt,
}: PlaceTrustSource): string {
  const date = formatShortDate(verifiedAt);

  if (sourceType === 'official' && verificationStatus === 'official_verified') {
    return `공식 확인 ${date}`;
  }

  if (
    sourceType === 'semi-official' &&
    verificationStatus === 'semi_verified'
  ) {
    return `준공식 검증 ${date}`;
  }

  return `${VERIFICATION_STATUS_LABELS[verificationStatus]} · ${SOURCE_TYPE_LABELS[sourceType]} ${date}`;
}

export function getPlaceVerificationTargetLabel({
  sourceType,
  verificationStatus,
}: Pick<PlaceTrustSource, 'sourceType' | 'verificationStatus'>): string {
  if (sourceType === 'official' && verificationStatus === 'official_verified') {
    return '공식 페이지';
  }

  if (
    sourceType === 'semi-official' &&
    verificationStatus === 'semi_verified'
  ) {
    return '판매처·운영 채널';
  }

  return '확인된 출처';
}

function formatShortDate(date: string): string {
  return date.replaceAll('-', '.');
}

export type { SourceType, VerificationStatus };
