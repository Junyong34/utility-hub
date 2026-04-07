import type { PlaceSource, RegionSlug } from '../../types/place-source.ts';
import { GYEONGGI_NORTH_PLACES } from './gyeonggi-north/index.ts';
import { GYEONGGI_SOUTH_PLACES } from './gyeonggi-south/index.ts';
import { INCHEON_PLACES } from './incheon/index.ts';
import { SEOUL_PLACES } from './seoul/index.ts';

export function assertUniquePlaceIds<T extends { id: string }>(places: T[]): void {
  const seenIds = new Set<string>();

  for (const place of places) {
    if (seenIds.has(place.id)) {
      throw new Error(`Duplicate place id: ${place.id}`);
    }

    seenIds.add(place.id);
  }
}

export const PLACES_BY_REGION: Record<RegionSlug, PlaceSource[]> = {
  seoul: SEOUL_PLACES,
  'gyeonggi-south': GYEONGGI_SOUTH_PLACES,
  'gyeonggi-north': GYEONGGI_NORTH_PLACES,
  incheon: INCHEON_PLACES,
};

export const ALL_PLACES = Object.values(PLACES_BY_REGION).flat();

assertUniquePlaceIds(ALL_PLACES);

export {
  GYEONGGI_NORTH_PLACES,
  GYEONGGI_SOUTH_PLACES,
  INCHEON_PLACES,
  SEOUL_PLACES,
};
