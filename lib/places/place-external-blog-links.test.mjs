import test from 'node:test';
import assert from 'node:assert/strict';

import {
  EXTERNAL_BLOG_LINK_REL,
  getExternalBlogSourceLabel,
  isDisplayableExternalBlogLink,
  isNaverBlogLink,
} from './place-external-blog-links.ts';

test('isNaverBlogLink accepts secure desktop and mobile naver blog URLs', () => {
  assert.equal(isNaverBlogLink('https://blog.naver.com/example/123'), true);
  assert.equal(isNaverBlogLink('https://m.blog.naver.com/example/123'), true);
});

test('isNaverBlogLink rejects insecure or non-naver URLs', () => {
  assert.equal(isNaverBlogLink('http://blog.naver.com/example/123'), false);
  assert.equal(isNaverBlogLink('https://example.com/post'), false);
  assert.equal(isNaverBlogLink('/blog/places/example'), false);
});

test('isDisplayableExternalBlogLink requires title and href', () => {
  assert.equal(
    isDisplayableExternalBlogLink({
      title: '아이와 방문 후기',
      href: 'https://blog.naver.com/example/123',
      sourceLabel: 'Naver Blog',
    }),
    true
  );

  assert.equal(
    isDisplayableExternalBlogLink({
      title: '',
      href: 'https://blog.naver.com/example/123',
    }),
    false
  );
});

test('getExternalBlogSourceLabel prefers sourceLabel and falls back to hostname', () => {
  assert.equal(
    getExternalBlogSourceLabel({
      title: '아이와 방문 후기',
      href: 'https://blog.naver.com/example/123',
      sourceLabel: 'Naver Blog',
    }),
    'Naver Blog'
  );

  assert.equal(
    getExternalBlogSourceLabel({
      title: '아이와 방문 후기',
      href: 'https://blog.naver.com/example/123',
    }),
    'blog.naver.com'
  );
});

test('external blog links use nofollow ugc rel', () => {
  assert.equal(EXTERNAL_BLOG_LINK_REL, 'noopener noreferrer nofollow ugc');
});
