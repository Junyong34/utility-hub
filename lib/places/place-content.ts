import { ALL_PLACES, PLACES_BY_REGION } from '../../content/places/index.ts';
import type {
  AgeBand,
  PlaceCategory,
  PlaceSource,
  RegionSlug,
} from '../../types/place-source.ts';
import {
  getPlaceByIdFrom,
  getPlaceCountByRegionFrom,
  getPlacesByAgeBandFrom,
  getPublishablePlacesByCategoryFrom,
  getPublishablePlacesByRegionFrom,
  getPublishablePlacesFrom,
} from './place-queries.ts';

/** 모든 지역의 모든 장소 데이터 로드 */
export function getAllPlaces(): PlaceSource[] {
  return ALL_PLACES;
}

/** 발행 가능한 장소만 반환 */
export function getPublishablePlaces(): PlaceSource[] {
  return getPublishablePlacesFrom(ALL_PLACES);
}

/** 지역별 발행 가능 장소 반환 */
export function getPublishablePlacesByRegion(regionSlug: RegionSlug): PlaceSource[] {
  return getPublishablePlacesByRegionFrom(PLACES_BY_REGION, regionSlug);
}

/** 카테고리별 발행 가능 장소 반환 */
export function getPublishablePlacesByCategory(
  category: PlaceCategory
): PlaceSource[] {
  return getPublishablePlacesByCategoryFrom(ALL_PLACES, category);
}

/** ID로 장소 조회 */
export function getPlaceById(id: string): PlaceSource | undefined {
  return getPlaceByIdFrom(ALL_PLACES, id);
}

/** 지역별 장소 수 반환 */
export function getPlaceCountByRegion(): Record<string, number> {
  return getPlaceCountByRegionFrom(ALL_PLACES);
}

/** 연령대에 맞는 장소 반환
 * - `ageBands: ['all']`인 장소는 어떤 연령대 쿼리에도 매칭
 * - `ageBand: 'all'` 쿼리는 모든 장소 반환
 */
export function getPlacesByAgeBand(ageBand: AgeBand): PlaceSource[] {
  return getPlacesByAgeBandFrom(ALL_PLACES, ageBand);
}
