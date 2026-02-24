import type { CanonicalConfig } from '@/types/seo';

/**
 * Canonical URL 생성
 */
export function createCanonicalUrl(config: CanonicalConfig): string {
  let url = config.url;

  // 쿼리 파라미터 제거
  if (config.removeQueryParams && config.removeQueryParams.length > 0) {
    const urlObj = new URL(url);
    config.removeQueryParams.forEach((param) => {
      urlObj.searchParams.delete(param);
    });
    url = urlObj.toString();
  }

  // Trailing slash 처리
  if (config.trailingSlash !== undefined) {
    const hasTrailingSlash = url.endsWith('/');
    const isRoot = url.split('://')[1]?.split('/').length === 1;

    if (config.trailingSlash && !hasTrailingSlash && !isRoot) {
      url = `${url}/`;
    } else if (!config.trailingSlash && hasTrailingSlash && !isRoot) {
      url = url.slice(0, -1);
    }
  }

  return url;
}

/**
 * 제거할 쿼리 파라미터 목록 (기본값)
 * UTM 파라미터, 추적 파라미터 등
 */
export const DEFAULT_REMOVE_QUERY_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
  'mc_cid',
  'mc_eid',
  '_ga',
  'ref',
  'source',
];

/**
 * URL 정규화 (Canonical URL 생성 헬퍼)
 */
export function normalizeUrl(
  url: string,
  options?: {
    trailingSlash?: boolean;
    removeQueryParams?: string[];
    removeAllQueryParams?: boolean;
    removeFragment?: boolean;
  }
): string {
  const {
    trailingSlash = false,
    removeQueryParams = DEFAULT_REMOVE_QUERY_PARAMS,
    removeAllQueryParams = false,
    removeFragment = true,
  } = options || {};

  let urlObj: URL;

  try {
    urlObj = new URL(url);
  } catch {
    // 상대 경로인 경우 절대 경로로 변환
    urlObj = new URL(url, 'http://placeholder.com');
  }

  // 쿼리 파라미터 제거
  if (removeAllQueryParams) {
    urlObj.search = '';
  } else if (removeQueryParams.length > 0) {
    removeQueryParams.forEach((param) => {
      urlObj.searchParams.delete(param);
    });
  }

  // Fragment 제거
  if (removeFragment) {
    urlObj.hash = '';
  }

  let normalizedUrl = urlObj.toString();

  // Trailing slash 처리
  const hasTrailingSlash = normalizedUrl.endsWith('/');
  const isRoot =
    normalizedUrl.split('://')[1]?.split('?')[0]?.split('/').length === 1;

  if (trailingSlash && !hasTrailingSlash && !isRoot) {
    normalizedUrl = normalizedUrl.split('?')[0] + '/' + (urlObj.search || '');
  } else if (!trailingSlash && hasTrailingSlash && !isRoot) {
    const parts = normalizedUrl.split('?');
    parts[0] = parts[0].slice(0, -1);
    normalizedUrl = parts.join('?');
  }

  return normalizedUrl;
}

/**
 * 상대 경로를 절대 경로로 변환
 */
export function toAbsoluteUrl(path: string, baseUrl: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // baseUrl에서 trailing slash 제거
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // path에서 leading slash 확인
  const relativePath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${relativePath}`;
}

/**
 * 페이지네이션 URL 생성
 */
export function createPaginationUrls(
  basePath: string,
  currentPage: number,
  totalPages: number,
  baseUrl: string
): {
  canonical: string;
  prev?: string;
  next?: string;
} {
  const base = toAbsoluteUrl(basePath, baseUrl);

  const result: {
    canonical: string;
    prev?: string;
    next?: string;
  } = {
    canonical: currentPage === 1 ? base : `${base}?page=${currentPage}`,
  };

  if (currentPage > 1) {
    result.prev = currentPage === 2 ? base : `${base}?page=${currentPage - 1}`;
  }

  if (currentPage < totalPages) {
    result.next = `${base}?page=${currentPage + 1}`;
  }

  return result;
}
