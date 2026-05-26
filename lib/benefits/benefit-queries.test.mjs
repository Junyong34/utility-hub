import test from 'node:test';
import assert from 'node:assert/strict';

const BENEFIT_FIXTURES = [
  {
    id: 'seoul-card',
    title: '서울 카드',
    categoryId: 'regional',
    regions: ['seoul'],
    ageBands: ['3-5y'],
    benefitForms: ['discount'],
    verificationStatus: 'official_verified',
    priority: 2,
  },
  {
    id: 'national-voucher',
    title: '전국 바우처',
    categoryId: 'government',
    regions: ['national'],
    ageBands: ['0-23m'],
    benefitForms: ['voucher'],
    verificationStatus: 'semi_verified',
    priority: 4,
  },
  {
    id: 'draft-benefit',
    title: '미검증 혜택',
    categoryId: 'regional',
    regions: ['incheon'],
    ageBands: ['all'],
    benefitForms: ['cash'],
    verificationStatus: 'needs_refresh',
    priority: 10,
  },
];

test('getPublishableBenefitsFrom keeps only verified benefits', async () => {
  const { getPublishableBenefitsFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getPublishableBenefitsFrom(BENEFIT_FIXTURES).map(benefit => benefit.id),
    ['seoul-card', 'national-voucher']
  );
});

test('getBenefitsByRegionFrom includes national benefits for regional queries', async () => {
  const { getBenefitsByRegionFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getBenefitsByRegionFrom(BENEFIT_FIXTURES, 'seoul').map(
      benefit => benefit.id
    ),
    ['seoul-card', 'national-voucher']
  );
});

test('getFeaturedBenefitsFrom sorts publishable benefits by priority descending', async () => {
  const { getFeaturedBenefitsFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getFeaturedBenefitsFrom(BENEFIT_FIXTURES, 2).map(benefit => benefit.id),
    ['national-voucher', 'seoul-card']
  );
});

test('getBenefitsByCategoryFrom returns publishable benefits in a category', async () => {
  const { getBenefitsByCategoryFrom } = await import('./benefit-queries.ts');

  assert.deepEqual(
    getBenefitsByCategoryFrom(BENEFIT_FIXTURES, 'government').map(
      benefit => benefit.id
    ),
    ['national-voucher']
  );
});
