import type { PlaceListFilters } from './place-list-contract.ts';
import {
  buildPlaceListSearchParams,
  normalizePlaceListFilters,
  normalizePositiveInteger,
  normalizeRegion,
  type PlaceListQueryOptions,
} from './place-list-contract.ts';
import type { RegionSlug } from '../../types/place-source.ts';

type PageValue = string | number | null | undefined | string[];

export type PlaceListRawSearchParams = Record<
  string,
  string | string[] | undefined
>;

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

interface PlaceListIndexingPolicyOptions {
  page: {
    currentPage: number;
    totalPages: number;
    places: Array<{ id: string }>;
  };
  rawSearchParams?: PlaceListRawSearchParams;
  region?: RegionSlug | null;
}

export interface PlaceListIndexingPolicy {
  canonicalPath: string;
  index: boolean;
  follow: true;
  includeInSitemap: boolean;
  redirectPath?: string;
}

const PLACE_LIST_QUERY_KEYS = new Set([
  'search',
  'age',
  'category',
  'theme',
  'season',
  'indoor',
  'outdoor',
  'free',
  'feeding',
  'stroller',
  'rain',
  'region',
  'page',
  'limit',
]);

const PLACE_LIST_FILTER_QUERY_KEYS = new Set([
  'search',
  'age',
  'category',
  'theme',
  'season',
  'indoor',
  'outdoor',
  'free',
  'feeding',
  'stroller',
  'rain',
]);

export function buildPlaceListPath(region?: RegionSlug | null): string {
  return region ? `/places/${region}` : '/places';
}

export function buildPlaceListRouteQueryOptions({
  rawSearchParams,
  region,
}: {
  rawSearchParams: PlaceListRawSearchParams;
  region?: RegionSlug | null;
}): PlaceListQueryOptions {
  const queryRegion = normalizeRegion(
    getFirstSearchParam(rawSearchParams, 'region')
  );

  return {
    ...rawSearchParams,
    limit: undefined,
    region: region ?? queryRegion ?? undefined,
  };
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

export function resolvePlaceListIndexingPolicy({
  page,
  rawSearchParams = {},
  region = null,
}: PlaceListIndexingPolicyOptions): PlaceListIndexingPolicy {
  const rawPage = getFirstSearchParam(rawSearchParams, 'page');
  const rawLimit = getFirstSearchParam(rawSearchParams, 'limit');
  const rawRegion = getFirstSearchParam(rawSearchParams, 'region');
  const queryRegion = normalizeRegion(rawRegion);
  const targetRegion = region ?? queryRegion;
  const functionalPath = buildPlacePaginationHref({
    region: targetRegion,
    page: page.currentPage,
    totalPages: page.totalPages,
    filters: rawSearchParams,
    preserveFilters: true,
  });

  if (hasPageNormalizationRedirect(rawPage, page.currentPage)) {
    return redirectTo(functionalPath);
  }

  if (rawLimit !== undefined) {
    return redirectTo(functionalPath);
  }

  if (rawRegion !== undefined && queryRegion !== null) {
    return redirectTo(functionalPath);
  }

  const hasFilterVariation = Object.keys(rawSearchParams).some(key =>
    PLACE_LIST_FILTER_QUERY_KEYS.has(key)
  );
  const hasParameterVariation =
    hasUnknownSearchParams(rawSearchParams) ||
    hasDuplicateSearchParams(rawSearchParams) ||
    rawLimit !== undefined ||
    rawRegion !== undefined;

  if (hasFilterVariation) {
    return {
      canonicalPath: buildPlaceListPath(targetRegion),
      index: false,
      follow: true,
      includeInSitemap: false,
    };
  }

  const canonicalPath = buildPlacePaginationHref({
    region: targetRegion,
    page: page.currentPage,
    totalPages: page.totalPages,
  });
  const hasUniquePlaceCards =
    page.places.length > 0 &&
    new Set(page.places.map(place => place.id)).size === page.places.length;
  const isIndexablePage = page.currentPage === 1 || hasUniquePlaceCards;

  return {
    canonicalPath,
    index: !hasParameterVariation && isIndexablePage,
    follow: true,
    includeInSitemap:
      !hasParameterVariation && page.currentPage > 1 && hasUniquePlaceCards,
  };
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
    normalized.theme !== null ||
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

function redirectTo(redirectPath: string): PlaceListIndexingPolicy {
  return {
    canonicalPath: redirectPath,
    index: true,
    follow: true,
    includeInSitemap: false,
    redirectPath,
  };
}

function hasPageNormalizationRedirect(
  rawPage: string | undefined,
  currentPage: number
): boolean {
  if (rawPage === undefined) {
    return false;
  }

  return (
    !/^[1-9]\d*$/.test(rawPage) ||
    Number(rawPage) !== currentPage ||
    currentPage === 1
  );
}

function getFirstSearchParam(
  searchParams: PlaceListRawSearchParams,
  key: string
): string | undefined {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function hasUnknownSearchParams(
  searchParams: PlaceListRawSearchParams
): boolean {
  return Object.keys(searchParams).some(key => !PLACE_LIST_QUERY_KEYS.has(key));
}

function hasDuplicateSearchParams(
  searchParams: PlaceListRawSearchParams
): boolean {
  return Object.values(searchParams).some(
    value => Array.isArray(value) && value.length > 1
  );
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
