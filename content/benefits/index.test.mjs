import test from 'node:test';
import assert from 'node:assert/strict';

test('benefits index exposes phase a seed data', async () => {
  const { ALL_BENEFITS } = await import('./index.ts');

  assert.equal(ALL_BENEFITS.length >= 8, true);
});

test('benefits index rejects duplicate ids', async () => {
  const { assertUniqueBenefitIds } = await import('./index.ts');

  assert.throws(
    () =>
      assertUniqueBenefitIds([
        { id: 'duplicate-benefit', title: 'A' },
        { id: 'duplicate-benefit', title: 'B' },
      ]),
    /Duplicate benefit id: duplicate-benefit/
  );
});

test('every benefit has an official https source and verification date', async () => {
  const { ALL_BENEFITS } = await import('./index.ts');

  for (const benefit of ALL_BENEFITS) {
    assert.match(benefit.officialSourceUrl, /^https:\/\//, benefit.id);
    assert.match(benefit.verifiedAt, /^\d{4}-\d{2}-\d{2}$/, benefit.id);
    assert.match(benefit.lastObservedAt, /^\d{4}-\d{2}-\d{2}$/, benefit.id);
    assert.equal(
      ['official_verified', 'semi_verified'].includes(
        benefit.verificationStatus
      ),
      true,
      benefit.id
    );
  }
});
