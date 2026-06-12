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
