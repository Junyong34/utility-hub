import type { PlaceListFilters } from './place-list-contract.ts';
import {
  buildPlaceListSearchParams,
  normalizePlaceListFilters,
  normalizePositiveInteger,
  type PlaceListQueryOptions,
} from './place-list-contract.ts';
import type { RegionSlug } from '../../types/place-source.ts';

type PageValue = string | number | null | undefined | string[];

interface PlacePaginationHrefOptions {
  region?: RegionSlug | null;
  page?: PageValue;
  totalPages?: number;
  filters?: Partial<PlaceListFilters> | Partial<PlaceListQueryOptions>;
  preserveFilters?: boolean;
}

interface PlacePaginationWindowOptions {
  currentPage: PageValue;
  totalPages: number;
}

export function buildPlaceListPath(region?: RegionSlug | null): string {
  return region ? `/places/${region}` : '/places';
}

export function buildPlacePaginationHref({
  region = null,
  page,
  totalPages,
  filters,
  preserveFilters = false,
}: PlacePaginationHrefOptions = {}): string {
  const currentPage = normalizePaginationPage(page, totalPages);
  const params = buildPlaceListSearchParams({
    page: currentPage,
    filters: preserveFilters ? filters : undefined,
  });
  const queryString = params.toString();

  return `${buildPlaceListPath(region)}${queryString ? `?${queryString}` : ''}`;
}

export function buildPlaceCanonicalPath({
  region = null,
  page,
  totalPages,
  filters,
}: PlacePaginationHrefOptions = {}): string {
  if (hasActivePlaceListFilters(filters)) {
    return buildPlaceListPath(region);
  }

  return buildPlacePaginationHref({ region, page, totalPages });
}

export function buildAbsolutePlaceCanonicalUrl(
  baseUrl: string,
  options: PlacePaginationHrefOptions = {}
): string {
  return `${normalizeBaseUrl(baseUrl)}${buildPlaceCanonicalPath(options)}`;
}

export function buildPlacePaginationPages({
  currentPage,
  totalPages,
}: PlacePaginationWindowOptions): number[] {
  const lastPage = normalizePositiveInteger(totalPages, 1);
  const current = normalizePaginationPage(currentPage, lastPage);

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

export function hasActivePlaceListFilters(
  filters:
    | Partial<PlaceListFilters>
    | Partial<PlaceListQueryOptions>
    | undefined
): boolean {
  const normalized = normalizePlaceListFilters(filters ?? {});

  return (
    normalized.search !== null ||
    normalized.age !== null ||
    normalized.category !== null ||
    normalized.season !== null ||
    normalized.indoor ||
    normalized.outdoor ||
    normalized.free ||
    normalized.feeding ||
    normalized.stroller ||
    normalized.rain
  );
}

function normalizePaginationPage(page: PageValue, totalPages?: number): number {
  const normalizedPage = normalizePositiveInteger(page, 1);

  if (!totalPages) {
    return normalizedPage;
  }

  const normalizedTotalPages = normalizePositiveInteger(totalPages, 1);
  return Math.min(normalizedPage, normalizedTotalPages);
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

function range(start: number, end: number): number[] {
  if (end < start) {
    return [];
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
