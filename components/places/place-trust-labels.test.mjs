import test from 'node:test';
import assert from 'node:assert/strict';

const OFFICIAL_PLACE = {
  sourceType: 'official',
  verificationStatus: 'official_verified',
  verifiedAt: '2026-08-02',
};

const SEMI_OFFICIAL_PLACE = {
  sourceType: 'semi-official',
  verificationStatus: 'semi_verified',
  verifiedAt: '2026-08-02',
};

test('official places keep the official source CTA and verification wording', async () => {
  const {
    getPlaceSourceLinkLabel,
    getPlaceVerificationLabel,
    getPlaceVerificationTargetLabel,
  } = await import('./place-trust-labels.ts');

  assert.equal(getPlaceSourceLinkLabel(OFFICIAL_PLACE), '공식 정보 확인');
  assert.equal(
    getPlaceVerificationLabel(OFFICIAL_PLACE),
    '공식 확인 2026.08.02'
  );
  assert.equal(getPlaceVerificationTargetLabel(OFFICIAL_PLACE), '공식 페이지');
});

test('semi-official places identify the seller and avoid official wording', async () => {
  const {
    getPlaceSourceLinkLabel,
    getPlaceVerificationLabel,
    getPlaceVerificationTargetLabel,
  } = await import('./place-trust-labels.ts');

  assert.equal(
    getPlaceSourceLinkLabel(SEMI_OFFICIAL_PLACE),
    '판매·운영 정보 확인'
  );
  assert.equal(
    getPlaceVerificationLabel(SEMI_OFFICIAL_PLACE),
    '준공식 검증 2026.08.02'
  );
  assert.equal(
    getPlaceVerificationTargetLabel(SEMI_OFFICIAL_PLACE),
    '판매처·운영 채널'
  );
  assert.equal(
    getPlaceVerificationLabel(SEMI_OFFICIAL_PLACE).includes('공식 확인'),
    false
  );
});

test('unexpected source and verification combinations remain explicitly qualified', async () => {
  const {
    getPlaceSourceLinkLabel,
    getPlaceVerificationLabel,
    getPlaceVerificationTargetLabel,
  } = await import('./place-trust-labels.ts');

  const discoveryPlace = {
    sourceType: 'discovery',
    verificationStatus: 'discovery_only',
    verifiedAt: '2026-08-02',
  };

  assert.equal(getPlaceSourceLinkLabel(discoveryPlace), '민간 발견 소스 확인');
  assert.equal(
    getPlaceVerificationLabel(discoveryPlace),
    '미검증 (발견만) · 민간 발견 소스 2026.08.02'
  );
  assert.equal(getPlaceVerificationTargetLabel(discoveryPlace), '확인된 출처');
});
