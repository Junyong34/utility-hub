import {
  PUBLISHABLE_STATUSES,
  type AgeBand,
  type PlaceCategory,
  type PlaceSource,
  type RegionSlug,
} from '../../types/place-source.ts';

function isPublishablePlace(place: PlaceSource): boolean {
  return PUBLISHABLE_STATUSES.includes(place.verificationStatus);
}

export function getPublishablePlacesFrom(places: PlaceSource[]): PlaceSource[] {
  return places.filter(isPublishablePlace);
}

export function getPublishablePlacesByRegionFrom(
  placesByRegion: Partial<Record<RegionSlug, PlaceSource[]>>,
  regionSlug: RegionSlug
): PlaceSource[] {
  return getPublishablePlacesFrom(placesByRegion[regionSlug] ?? []);
}

export function getPublishablePlacesByCategoryFrom(
  places: PlaceSource[],
  category: PlaceCategory
): PlaceSource[] {
  return getPublishablePlacesFrom(places).filter(place => place.category === category);
}

export function getPlaceByIdFrom(
  places: PlaceSource[],
  id: string
): PlaceSource | undefined {
  return places.find(place => place.id === id);
}

export function getPlaceCountByRegionFrom(
  places: PlaceSource[]
): Record<string, number> {
  return getPublishablePlacesFrom(places).reduce<Record<string, number>>(
    (acc, place) => {
      acc[place.region] = (acc[place.region] ?? 0) + 1;
      return acc;
    },
    {}
  );
}

export function getPlacesByAgeBandFrom(
  places: PlaceSource[],
  ageBand: AgeBand
): PlaceSource[] {
  const publishablePlaces = getPublishablePlacesFrom(places);

  if (ageBand === 'all') {
    return publishablePlaces;
  }

  return publishablePlaces.filter(
    place => place.ageBands.includes('all') || place.ageBands.includes(ageBand)
  );
}
