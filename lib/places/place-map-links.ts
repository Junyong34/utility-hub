import type { PlaceSource } from '../../types/place-source.ts';

type PlaceMapLinkTarget = Pick<PlaceSource, 'address' | 'naverMapUrl'>;

const NAVER_MAP_SEARCH_PREFIX = 'https://map.naver.com/p/search/';
const NAVER_PLACE_ENTRY_URL_PATTERN = /^https:\/\/map\.naver\.com\/p\/entry\/place\/\d+/;

function getNaverAddressSearchUrl(address: string): string {
  return `${NAVER_MAP_SEARCH_PREFIX}${encodeURIComponent(address)}`;
}

export function getPlaceNaverMapUrl(place: PlaceMapLinkTarget): string | undefined {
  if (place.naverMapUrl && NAVER_PLACE_ENTRY_URL_PATTERN.test(place.naverMapUrl)) {
    return place.naverMapUrl;
  }

  if (!place.naverMapUrl) {
    return undefined;
  }

  const address = place.address?.trim();

  if (address) {
    return getNaverAddressSearchUrl(address);
  }

  return place.naverMapUrl;
}
