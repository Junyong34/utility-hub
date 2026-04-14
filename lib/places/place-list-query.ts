import { ALL_PLACES } from '../../content/places/index.ts';
import type { PlaceSource } from '../../types/place-source.ts';
import {
  DEFAULT_PLACES_PAGE_SIZE,
  normalizePlaceListFilters,
  normalizePositiveInteger,
  normalizeRegion,
  type PlaceListPageResponse,
  type PlaceListQueryOptions,
  type PlaceListFilters,
} from './place-list-contract.ts';
import { getPublishablePlacesFrom } from './place-queries.ts';

export function queryPlaceList(
  options: PlaceListQueryOptions = {}
): PlaceListPageResponse {
  return queryPlaceListFrom(ALL_PLACES, options);
}

export function queryPlaceListFrom(
  places: PlaceSource[],
  options: PlaceListQueryOptions = {}
): PlaceListPageResponse {
  const filters = normalizePlaceListFilters(options);
  const region = normalizeRegion(options.region);
  const pageSize = normalizePositiveInteger(
    options.limit,
    DEFAULT_PLACES_PAGE_SIZE
  );

  const publishablePlaces = getPublishablePlacesFrom(places);
  const scopedPlaces = region
    ? publishablePlaces.filter(place => place.region === region)
    : publishablePlaces;

  const filteredPlaces = applyPlaceListFilters(scopedPlaces, filters);
  const scopeTotal = scopedPlaces.length;
  const total = filteredPlaces.length;
  const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize);
  const requestedPage = normalizePositiveInteger(options.page, 1);
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    places: filteredPlaces.slice(startIndex, endIndex),
    hasMore: endIndex < total,
    total,
    scopeTotal,
    currentPage,
    totalPages,
    pageSize,
    region,
    filters,
  };
}

function applyPlaceListFilters(
  places: PlaceSource[],
  filters: PlaceListFilters
): PlaceSource[] {
  return places.filter(place => {
    if (filters.category && place.category !== filters.category) {
      return false;
    }

    if (filters.age && filters.age !== 'all') {
      const matchesAge =
        place.ageBands.includes('all') || place.ageBands.includes(filters.age);
      if (!matchesAge) {
        return false;
      }
    }

    if (filters.indoor) {
      if (place.indoorOutdoor !== 'indoor' && place.indoorOutdoor !== 'both') {
        return false;
      }
    }

    if (filters.outdoor) {
      if (place.indoorOutdoor !== 'outdoor' && place.indoorOutdoor !== 'both') {
        return false;
      }
    }

    if (filters.free && place.priceType !== 'free') {
      return false;
    }

    if (filters.feeding && !place.feedingRoom) {
      return false;
    }

    if (filters.stroller && !place.strollerFriendly) {
      return false;
    }

    if (filters.rain && !place.rainFriendly) {
      return false;
    }

    return true;
  });
}
