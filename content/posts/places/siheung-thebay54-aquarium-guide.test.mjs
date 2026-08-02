import test from 'node:test';
import assert from 'node:assert/strict';
import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';

const POST_SLUG = 'siheung-thebay54-aquarium-guide';
const PLACE_ID = 'gyeonggi-south-siheung-thebay54-aquarium';

test('더베이54 가이드는 장소와 연결된 이미지 없는 방문 정보 글로 발행된다', async () => {
  const [{ getPostBySlug }, { ALL_PLACES }] = await Promise.all([
    import('../../../lib/blog/posts.ts'),
    import('../../../content/places/index.ts'),
  ]);
  const post = getPostBySlug(POST_SLUG, 'places');
  const place = ALL_PLACES.find(candidate => candidate.id === PLACE_ID);

  assert.ok(post);
  assert.ok(place);
  assert.deepEqual(post.placeIds, [PLACE_ID]);
  assert.deepEqual(post.regions, ['gyeonggi-south']);
  assert.deepEqual(post.ageBands, ['3-6y', '6-10y']);
  assert.equal(post.indoorOutdoor, 'indoor');
  assert.match(
    post.content,
    /\/places\/gyeonggi-south\/gyeonggi-south-siheung-thebay54-aquarium/
  );
  assert.match(post.content, /판매처 표기 기준/);
  assert.match(post.content, /방문자 관찰/);
  assert.match(post.content, /경기도 시흥시 거북섬북로 54/);
  assert.match(post.content, /17,000원/);
  assert.match(post.content, /11,900원/);
  assert.match(post.content, /2026년 8월 31일까지/);
  assert.match(post.content, /종료 후 최신 가격 확인/);
  assert.equal((post.content.match(/11,900원/g) ?? []).length >= 2, true);
  assert.doesNotMatch(post.content, /!\[[^\]]*\]\([^)]*\)/);
  assert.doesNotMatch(post.content, /예약/);

  const faqContent = post.content.split('## FAQ')[1] ?? '';
  assert.equal((faqContent.match(/^### /gm) ?? []).length, 6);
  assert.deepEqual(place.linkedPostSlugs, [POST_SLUG]);
  assert.equal(place.thumbnailImage, undefined);

  const markdownTree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(post.content);
  const deleteNodes = [];
  const collectDeleteNodes = node => {
    if (node.type === 'delete') deleteNodes.push(node);
    for (const child of node.children ?? []) collectDeleteNodes(child);
  };
  collectDeleteNodes(markdownTree);

  assert.deepEqual(deleteNodes, []);
});
