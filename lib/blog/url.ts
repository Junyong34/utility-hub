export interface BlogPostRouteInfo {
  categorySlug: string;
  slug: string;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function buildBlogPostPath({
  categorySlug,
  slug,
}: BlogPostRouteInfo): string {
  return `/blog/${categorySlug}/${slug}`;
}

export function buildBlogPostUrl(
  baseUrl: string,
  routeInfo: BlogPostRouteInfo
): string {
  return `${normalizeBaseUrl(baseUrl)}${buildBlogPostPath(routeInfo)}`;
}
