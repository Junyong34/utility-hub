import type {
  AgeBand,
  PlaceCategory,
  RegionSlug,
} from '../../types/place-source.ts';

type RawValue = string | number | boolean | null | undefined | string[];

export const DEFAULT_PLACES_PAGE_SIZE = 18;
export const MAX_PLACE_SEARCH_LENGTH = 80;

const VALID_AGE_BANDS = new Set<AgeBand | 'all'>([
  '0-12m',
  '1-3y',
  '3-6y',
  '6-10y',
  'all',
]);

const VALID_CATEGORIES = new Set<PlaceCategory>([
  'baby-kids-cafe',
  'kids-cafe',
  'public-play',
  'museum',
  'experience',
  'park',
  'library',
  'culture',
  'sports',
]);

const VALID_REGIONS = new Set<RegionSlug>([
  'seoul',
  'gyeonggi-south',
  'gyeonggi-north',
  'incheon',
]);

export interface PlaceListFilters {
  search: string | null;
  age: AgeBand | 'all' | null;
  category: PlaceCategory | null;
  indoor: boolean;
  outdoor: boolean;
  free: boolean;
  feeding: boolean;
  stroller: boolean;
  rain: boolean;
}

export interface PlaceListQueryOptions {
  search?: RawValue;
  age?: RawValue;
  category?: RawValue;
  indoor?: RawValue;
  outdoor?: RawValue;
  free?: RawValue;
  feeding?: RawValue;
  stroller?: RawValue;
  rain?: RawValue;
  region?: RawValue;
  page?: RawValue;
  limit?: RawValue;
}

export interface PlaceListPageResponse {
  places: import('../../types/place-source.ts').PlaceSource[];
  hasMore: boolean;
  total: number;
  scopeTotal: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  region: RegionSlug | null;
  filters: PlaceListFilters;
}

export function normalizePlaceListFilters(
  input: Partial<PlaceListQueryOptions> = {}
): PlaceListFilters {
  return {
    search: normalizeSearch(input.search),
    age: normalizeAgeBand(input.age),
    category: normalizeCategory(input.category),
    indoor: normalizeBoolean(input.indoor),
    outdoor: normalizeBoolean(input.outdoor),
    free: normalizeBoolean(input.free),
    feeding: normalizeBoolean(input.feeding),
    stroller: normalizeBoolean(input.stroller),
    rain: normalizeBoolean(input.rain),
  };
}

export function buildPlaceListSearchParams(options: {
  page?: number;
  limit?: number;
  region?: RegionSlug | null;
  filters?: Partial<PlaceListFilters>;
}): URLSearchParams {
  const params = new URLSearchParams();
  const filters = normalizePlaceListFilters(options.filters ?? {});

  if (options.page && options.page > 1) {
    params.set('page', String(options.page));
  }

  if (options.limit && options.limit !== DEFAULT_PLACES_PAGE_SIZE) {
    params.set('limit', String(options.limit));
  }

  if (options.region) {
    params.set('region', options.region);
  }

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.age) {
    params.set('age', filters.age);
  }

  if (filters.category) {
    params.set('category', filters.category);
  }

  setBooleanSearchParam(params, 'indoor', filters.indoor);
  setBooleanSearchParam(params, 'outdoor', filters.outdoor);
  setBooleanSearchParam(params, 'free', filters.free);
  setBooleanSearchParam(params, 'feeding', filters.feeding);
  setBooleanSearchParam(params, 'stroller', filters.stroller);
  setBooleanSearchParam(params, 'rain', filters.rain);

  return params;
}

export function normalizeRegion(value: RawValue): RegionSlug | null {
  const raw = readFirstValue(value);
  if (!raw || !VALID_REGIONS.has(raw as RegionSlug)) {
    return null;
  }

  return raw as RegionSlug;
}

export function normalizePositiveInteger(
  value: RawValue,
  fallback: number
): number {
  const raw = readFirstValue(value);
  if (raw === undefined) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function normalizeBoolean(value: RawValue): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  const raw = readFirstValue(value);
  if (raw === undefined) {
    return false;
  }

  return raw === 'true' || raw === '1';
}

function normalizeSearch(value: RawValue): string | null {
  const raw = readFirstValue(value);
  if (raw === undefined) {
    return null;
  }

  const normalized = raw.trim().slice(0, MAX_PLACE_SEARCH_LENGTH);
  return normalized.length > 0 ? normalized : null;
}

function normalizeAgeBand(value: RawValue): AgeBand | 'all' | null {
  const raw = readFirstValue(value);
  if (!raw || !VALID_AGE_BANDS.has(raw as AgeBand | 'all')) {
    return null;
  }

  return raw as AgeBand | 'all';
}

function normalizeCategory(value: RawValue): PlaceCategory | null {
  const raw = readFirstValue(value);
  if (!raw || !VALID_CATEGORIES.has(raw as PlaceCategory)) {
    return null;
  }

  return raw as PlaceCategory;
}

function setBooleanSearchParam(
  params: URLSearchParams,
  key: keyof Omit<PlaceListFilters, 'search' | 'age' | 'category'>,
  enabled: boolean
) {
  if (enabled) {
    params.set(key, 'true');
  }
}

function readFirstValue(value: RawValue): string | undefined {
  if (Array.isArray(value)) {
    const first = value[0];
    return first === undefined ? undefined : String(first);
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  return undefined;
}
