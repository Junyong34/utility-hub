import type { PlaceSource } from '../../types/place-source.ts';

type PlaceMapLinkTarget = Pick<PlaceSource, 'name' | 'address' | 'naverMapUrl'>;

export function getPlaceNaverMapUrl(place: PlaceMapLinkTarget): string | undefined {
  return place.naverMapUrl;
}
