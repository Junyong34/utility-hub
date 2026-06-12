import test from 'node:test';
import assert from 'node:assert/strict';

import { ALL_PLACES } from './index.ts';
import { isNaverBlogLink } from '../../lib/places/place-external-blog-links.ts';
import { PUBLISHABLE_STATUSES } from '../../types/place-source.ts';

const placesWithExternalLinks = ALL_PLACES.filter(place => {
  return (
    PUBLISHABLE_STATUSES.includes(place.verificationStatus) &&
    Array.isArray(place.externalBlogLinks) &&
    place.externalBlogLinks.length > 0
  );
});

test('publishable place external blog links are capped at three links', () => {
  for (const place of placesWithExternalLinks) {
    assert.equal(
      place.externalBlogLinks.length <= 3,
      true,
      `${place.id} must expose at most 3 external blog links`
    );
  }
});

test('publishable place external blog links point to secure naver blog URLs', () => {
  for (const place of placesWithExternalLinks) {
    for (const link of place.externalBlogLinks) {
      assert.equal(
        isNaverBlogLink(link.href),
        true,
        `${place.id} external blog link must be a secure Naver Blog URL: ${link.href}`
      );
    }
  }
});

test('publishable place external blog links include reader-facing labels', () => {
  for (const place of placesWithExternalLinks) {
    for (const link of place.externalBlogLinks) {
      assert.equal(
        Boolean(link.title?.trim()),
        true,
        `${place.id} link title is required`
      );
      assert.equal(
        Boolean(link.description?.trim()),
        true,
        `${place.id} link description is required`
      );
      assert.equal(
        link.sourceLabel,
        'Naver Blog',
        `${place.id} sourceLabel must be Naver Blog`
      );
    }
  }
});

test('newly curated external blog links use normalized metadata when present', () => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  for (const place of placesWithExternalLinks) {
    for (const link of place.externalBlogLinks) {
      if (link.publishedAt) {
        assert.match(
          link.publishedAt,
          datePattern,
          `${place.id} publishedAt must use YYYY-MM-DD`
        );
      }

      if (link.checkedAt) {
        assert.match(
          link.checkedAt,
          datePattern,
          `${place.id} checkedAt must use YYYY-MM-DD`
        );
      }

      if (link.selectionReasons) {
        assert.equal(
          link.selectionReasons.length > 0,
          true,
          `${place.id} selectionReasons must not be empty`
        );
      }
    }
  }
});
