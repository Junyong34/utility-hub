import type { PlaceExternalBlogLink } from '../../types/place-source.ts';

export const EXTERNAL_BLOG_LINK_REL = 'noopener noreferrer nofollow ugc';

const NAVER_BLOG_HOSTS = new Set(['blog.naver.com', 'm.blog.naver.com']);

export function isNaverBlogLink(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' && NAVER_BLOG_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function isDisplayableExternalBlogLink(
  link: PlaceExternalBlogLink
): boolean {
  return Boolean(link.title.trim() && link.href.trim());
}

export function getExternalBlogSourceLabel(
  link: PlaceExternalBlogLink
): string {
  if (link.sourceLabel?.trim()) {
    return link.sourceLabel;
  }

  try {
    return new URL(link.href).hostname.replace(/^www\./, '');
  } catch {
    return '외부 블로그';
  }
}
