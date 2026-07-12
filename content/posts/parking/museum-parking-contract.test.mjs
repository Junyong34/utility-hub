import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';

import { ALL_PLACES } from '../../places/index.ts';
import { extractFaqItems } from '../../../lib/blog/markdown.ts';

const PARKING_POSTS_DIRECTORY = fileURLToPath(new URL('.', import.meta.url));

test('every museum publishes one reciprocal parking guide', () => {
  const museums = ALL_PLACES.filter(place => place.category === 'museum');

  assert.equal(museums.length, 40);

  for (const place of museums) {
    const slug = `${place.id}-parking`;
    const filePath = `${PARKING_POSTS_DIRECTORY}${slug}.md`;

    assert.equal(existsSync(filePath), true, `${slug}.md should exist`);

    const { data } = matter(readFileSync(filePath, 'utf8'));

    assert.equal(data.categorySlug, 'parking', `${slug} category mismatch`);
    assert.deepEqual(data.placeIds, [place.id], `${slug} placeIds mismatch`);
    assert.deepEqual(data.regions, [place.region], `${slug} region mismatch`);
    assert.deepEqual(data.ageBands, place.ageBands, `${slug} age mismatch`);
    assert.equal(
      data.indoorOutdoor,
      place.indoorOutdoor,
      `${slug} indoor/outdoor mismatch`
    );
    assert.match(
      data.updatedAt ?? '',
      /^2026-\d{2}-\d{2}$/,
      `${slug} should expose a 2026 update date`
    );
    assert.deepEqual(
      place.linkedPostSlugs,
      [slug],
      `${place.id} should link back to its parking guide`
    );
  }
});

test('museum parking guides separate verified facts from recent visit tips', () => {
  const museums = ALL_PLACES.filter(place => place.category === 'museum');
  const requiredSections = [
    'TL;DR',
    '주차장 이용방법',
    '공식 주차 정보 표',
    '아이 동반 주차 팁',
    '만차·대체 동선',
    '방문 전 체크포인트',
    'FAQ',
    '출처',
    '결론',
  ];

  for (const place of museums) {
    const slug = `${place.id}-parking`;
    const filePath = `${PARKING_POSTS_DIRECTORY}${slug}.md`;
    const { content } = matter(readFileSync(filePath, 'utf8'));
    let previousSectionIndex = -1;

    for (const section of requiredSections) {
      const sectionIndex = content.indexOf(`## ${section}`);

      assert.equal(
        sectionIndex > previousSectionIndex,
        true,
        `${slug} should include ordered section: ${section}`
      );
      previousSectionIndex = sectionIndex;
    }

    assert.match(
      content,
      /\|\s*공식\s*\|[\s\S]*?https:\/\//,
      `${slug} needs an official source`
    );
    assert.equal(
      /\|\s*(?:2026\s*)?(?:방문\s*)?후기\s*\|[\s\S]*?\|\s*2026-\d{2}-\d{2}\s*\|/.test(
        content
      ) || content.includes('2026년 방문 후기 미확보'),
      true,
      `${slug} needs dated 2026 visit evidence or the official-only marker`
    );
    assert.equal(
      /!\[[^\]]*\]\(https?:\/\//.test(content),
      false,
      `${slug} must not hotlink external images`
    );
    assert.equal(
      /<script\b/i.test(content),
      false,
      `${slug} must rely on the app JSON-LD renderer`
    );
    assert.equal(
      extractFaqItems(content).length >= 3,
      true,
      `${slug} needs at least three observable FAQ answers`
    );
  }
});
