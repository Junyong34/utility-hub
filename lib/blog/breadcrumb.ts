/**
 * Blog Breadcrumb 헬퍼 함수
 * Breadcrumb 항목을 중앙에서 관리하여 일관성 유지
 */
import type { BreadcrumbLink } from '@/types/navigation';

/**
 * Blog 메인 라벨 상수
 * 이 값을 변경하면 모든 Blog 페이지의 Breadcrumb이 자동으로 업데이트됩니다
 */
export const BLOG_MAIN_LABEL = '블로그';
export const BLOG_MAIN_URL = '/blog';

/**
 * Blog 메인 페이지 Breadcrumb 항목 생성
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * <Breadcrumb items={getBlogMainBreadcrumbItems()} />
 * // 결과: [{ name: '블로그' }]
 * ```
 */
export function getBlogMainBreadcrumbItems(): BreadcrumbLink[] {
  return [{ name: BLOG_MAIN_LABEL }];
}

/**
 * Blog 카테고리 페이지 Breadcrumb 항목 생성
 * @param categoryName - 카테고리 한글 이름
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * <Breadcrumb items={getBlogCategoryBreadcrumbItems('개발')} />
 * // 결과: [{ name: '블로그', url: '/blog' }, { name: '개발' }]
 * ```
 */
export function getBlogCategoryBreadcrumbItems(categoryName: string): BreadcrumbLink[] {
  return [
    { name: BLOG_MAIN_LABEL, url: BLOG_MAIN_URL },
    { name: categoryName },
  ];
}

/**
 * Blog 포스트 상세 페이지 Breadcrumb 항목 생성
 * @param categoryName - 카테고리 한글 이름
 * @param categorySlug - 카테고리 slug
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * <Breadcrumb items={getBlogPostBreadcrumbItems('개발', 'development')} />
 * // 결과: [{ name: '블로그', url: '/blog' }, { name: '개발', url: '/blog/development' }]
 * ```
 */
export function getBlogPostBreadcrumbItems(
  categoryName: string,
  categorySlug: string
): BreadcrumbLink[] {
  return [
    { name: BLOG_MAIN_LABEL, url: BLOG_MAIN_URL },
    { name: categoryName, url: `${BLOG_MAIN_URL}/${categorySlug}` },
  ];
}

/**
 * JSON-LD용 Breadcrumb 항목 생성 (홈 포함)
 * @param categoryName - 카테고리 한글 이름 (선택)
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * const breadcrumbs = getBlogStructuredDataBreadcrumbs();
 * // 결과: [{ name: '홈', url: '/' }, { name: '블로그' }]
 *
 * const breadcrumbs = getBlogStructuredDataBreadcrumbs('개발');
 * // 결과: [{ name: '홈', url: '/' }, { name: '블로그', url: '/blog' }, { name: '개발' }]
 * ```
 */
export function getBlogStructuredDataBreadcrumbs(
  categoryName?: string
): BreadcrumbLink[] {
  const items: BreadcrumbLink[] = [
    { name: '홈', url: '/' },
    { name: BLOG_MAIN_LABEL, url: categoryName ? BLOG_MAIN_URL : undefined },
  ];

  if (categoryName) {
    items.push({ name: categoryName });
  }

  return items;
}
