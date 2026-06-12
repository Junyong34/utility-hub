import test from 'node:test';
import assert from 'node:assert/strict';

test('places category is labeled for parenting place guides', async () => {
  const { getCategoryName } = await import('./posts.ts');

  assert.equal(getCategoryName('places'), '아이와 갈 곳');
});
