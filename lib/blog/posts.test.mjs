import test from 'node:test';
import assert from 'node:assert/strict';

test('places category is labeled for parenting place guides', async () => {
  const { getCategoryName } = await import('./posts.ts');

  assert.equal(getCategoryName('places'), '아이와 갈 곳');
});

test('rainy day hub exposes place metadata through the blog loader', async () => {
  const { getPostBySlug, getAllPosts } = await import('./posts.ts');

  const post = getPostBySlug('capital-area-rainy-day-indoor-places', 'places');

  assert.ok(post);
  assert.deepEqual(post.regions, [
    'seoul',
    'gyeonggi-south',
    'gyeonggi-north',
    'incheon',
  ]);
  assert.deepEqual(post.ageBands, ['1-3y', '3-6y']);
  assert.equal(post.indoorOutdoor, 'indoor');
  assert.equal(post.placeIds.length >= 8, true);
  assert.equal(post.placeIds.includes('national-children-museum'), true);

  const summary = getAllPosts().find(
    item =>
      item.categorySlug === 'places' &&
      item.slug === 'capital-area-rainy-day-indoor-places'
  );

  assert.ok(summary);
  assert.equal(summary.placeIds.includes('national-children-museum'), true);
  assert.deepEqual(summary.regions, [
    'seoul',
    'gyeonggi-south',
    'gyeonggi-north',
    'incheon',
  ]);
});
