import type { BlogPostSummary, PostsPageResponse } from './types';

export const BLOG_POSTS_PER_PAGE = 20;

type PageValue = string | number | null | undefined | string[];

interface BlogPostPageOptions {
  page?: PageValue;
  limit?: PageValue;
}

interface BlogPaginationHrefOptions {
  categorySlug?: string | null;
  page?: PageValue;
  totalPages?: number;
}

interface BlogPaginationWindowOptions {
  currentPage: PageValue;
  totalPages: number;
}

export function queryBlogPostsPage(
  posts: BlogPostSummary[],
  options: BlogPostPageOptions = {}
): PostsPageResponse {
  const pageSize = normalizePositiveInteger(options.limit, BLOG_POSTS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = normalizeBlogPaginationPage(options.page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    posts: posts.slice(startIndex, endIndex),
    hasMore: endIndex < posts.length,
    total: posts.length,
    currentPage,
    totalPages,
  };
}

export function buildBlogListPath(categorySlug?: string | null): string {
  return categorySlug ? `/blog/${categorySlug}` : '/blog';
}

export function buildBlogPaginationHref({
  categorySlug = null,
  page,
  totalPages,
}: BlogPaginationHrefOptions = {}): string {
  const currentPage = normalizeBlogPaginationPage(page, totalPages);
  const path = buildBlogListPath(categorySlug);

  return currentPage === 1 ? path : `${path}?page=${currentPage}`;
}

export function buildBlogPaginationPages({
  currentPage,
  totalPages,
}: BlogPaginationWindowOptions): number[] {
  const lastPage = normalizePositiveInteger(totalPages, 1);
  const current = normalizeBlogPaginationPage(currentPage, lastPage);

  if (lastPage <= 7) {
    return range(1, lastPage);
  }

  const pages = new Set<number>([1, lastPage]);
  let start = current - 2;
  let end = current + 2;

  if (current <= 3) {
    start = 2;
    end = 5;
  } else if (current >= lastPage - 2) {
    start = lastPage - 4;
    end = lastPage - 1;
  }

  range(Math.max(2, start), Math.min(lastPage - 1, end)).forEach(page => {
    pages.add(page);
  });

  return [...pages].sort((a, b) => a - b);
}

export function normalizeBlogPaginationPage(
  page: PageValue,
  totalPages?: number
): number {
  const normalizedPage = normalizePositiveInteger(page, 1);

  if (!totalPages) {
    return normalizedPage;
  }

  const normalizedTotalPages = normalizePositiveInteger(totalPages, 1);
  return Math.min(normalizedPage, normalizedTotalPages);
}

function normalizePositiveInteger(value: PageValue, fallback: number): number {
  const raw = Array.isArray(value) ? value[0] : value;

  if (raw === undefined || raw === null) {
    return fallback;
  }

  const parsed = Number.parseInt(String(raw), 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function range(start: number, end: number): number[] {
  if (end < start) {
    return [];
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
