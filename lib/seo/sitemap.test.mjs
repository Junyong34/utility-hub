import test from 'node:test';
import assert from 'node:assert/strict';

test('sitemap includes rainy day places category and hub post', async () => {
  const { collectBlogCategoryEntries, collectBlogPostEntries } =
    await import('./sitemap.ts');

  const categoryUrls = collectBlogCategoryEntries().map(entry => entry.url);
  const postUrls = collectBlogPostEntries().map(entry => entry.url);

  assert.equal(
    categoryUrls.some(url => url.endsWith('/blog/places')),
    true
  );
  assert.equal(
    postUrls.some(url =>
      url.endsWith('/blog/places/capital-area-rainy-day-indoor-places')
    ),
    true
  );
});

test('sitemap includes all publishable place detail URLs', async () => {
  const { collectPlaceEntries } = await import('./sitemap.ts');
  const { getPublishablePlaces } = await import('../places/place-content.ts');

  const placeUrls = new Set(collectPlaceEntries().map(entry => entry.url));

  for (const place of getPublishablePlaces()) {
    assert.equal(
      placeUrls.has(`https://www.zento.kr/places/${place.region}/${place.id}`),
      true,
      `${place.id} detail URL missing from place sitemap entries`
    );
  }
});

test('sitemap includes unfiltered global place pagination URLs', async () => {
  const { collectPlaceEntries } = await import('./sitemap.ts');
  const { queryPlaceList } = await import('../places/place-list-query.ts');

  const urls = collectPlaceEntries().map(entry => entry.url);
  const totalPages = queryPlaceList().totalPages;

  assert.equal(urls.includes('https://www.zento.kr/places?page=1'), false);

  for (let page = 2; page <= totalPages; page += 1) {
    assert.equal(
      urls.includes(`https://www.zento.kr/places?page=${page}`),
      true,
      `global places page ${page} missing from sitemap`
    );
  }
});

test('sitemap includes unfiltered region place pagination URLs only when needed', async () => {
  const { collectPlaceEntries } = await import('./sitemap.ts');
  const { queryPlaceList } = await import('../places/place-list-query.ts');
  const { PHASE_A_REGION_SLUGS } = await import('../places/region-config.ts');

  const urls = collectPlaceEntries().map(entry => entry.url);

  for (const region of PHASE_A_REGION_SLUGS) {
    const totalPages = queryPlaceList({ region }).totalPages;

    assert.equal(
      urls.includes(`https://www.zento.kr/places/${region}?page=1`),
      false
    );

    for (let page = 2; page <= totalPages; page += 1) {
      assert.equal(
        urls.includes(`https://www.zento.kr/places/${region}?page=${page}`),
        true,
        `${region} places page ${page} missing from sitemap`
      );
    }
  }
});

test('sitemap place pagination URLs do not include filters', async () => {
  const { collectPlaceEntries } = await import('./sitemap.ts');

  const paginationUrls = collectPlaceEntries()
    .map(entry => entry.url)
    .filter(url => url.includes('/places') && url.includes('?page='));

  assert.equal(paginationUrls.length > 0, true);
  assert.equal(
    paginationUrls.some(url =>
      /[?&](search|age|category|season|indoor|outdoor|free|feeding|stroller|rain)=/.test(
        url
      )
    ),
    false
  );
});
