import fs from 'fs';
import path from 'path';
import type { PlaceSource, RegionSlug, PlaceCategory, AgeBand } from '@/types/place-source';
import { PUBLISHABLE_STATUSES } from './source-policy';

const PLACES_DIR = path.join(process.cwd(), 'content/places');

/** 단일 JSON 파일에서 장소 데이터 로드 */
function loadPlaceFile(filePath: string): PlaceSource | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as PlaceSource;
  } catch {
    return null;
  }
}

/** 지역 디렉토리에서 모든 장소 데이터 로드 */
function loadPlacesByRegion(regionSlug: RegionSlug): PlaceSource[] {
  const regionDir = path.join(PLACES_DIR, regionSlug);
  if (!fs.existsSync(regionDir)) return [];

  return fs
    .readdirSync(regionDir)
    .filter(f => f.endsWith('.json'))
    .map(f => loadPlaceFile(path.join(regionDir, f)))
    .filter((p): p is PlaceSource => p !== null);
}

/** 모든 지역의 모든 장소 데이터 로드 */
export function getAllPlaces(): PlaceSource[] {
  if (!fs.existsSync(PLACES_DIR)) return [];

  return fs
    .readdirSync(PLACES_DIR)
    .filter(entry => {
      const full = path.join(PLACES_DIR, entry);
      return fs.statSync(full).isDirectory();
    })
    .flatMap(region => loadPlacesByRegion(region as RegionSlug));
}

/** 발행 가능한 장소만 반환 */
export function getPublishablePlaces(): PlaceSource[] {
  return getAllPlaces().filter(p => PUBLISHABLE_STATUSES.has(p.verificationStatus));
}

/** 지역별 발행 가능 장소 반환 */
export function getPublishablePlacesByRegion(regionSlug: RegionSlug): PlaceSource[] {
  return loadPlacesByRegion(regionSlug).filter(p =>
    PUBLISHABLE_STATUSES.has(p.verificationStatus)
  );
}

/** 카테고리별 발행 가능 장소 반환 */
export function getPublishablePlacesByCategory(category: PlaceCategory): PlaceSource[] {
  return getPublishablePlaces().filter(p => p.category === category);
}

/** ID로 장소 조회 */
export function getPlaceById(id: string): PlaceSource | undefined {
  return getAllPlaces().find(p => p.id === id);
}

/** 지역별 장소 수 반환 */
export function getPlaceCountByRegion(): Record<string, number> {
  const places = getPublishablePlaces();
  return places.reduce<Record<string, number>>((acc, p) => {
    acc[p.region] = (acc[p.region] ?? 0) + 1;
    return acc;
  }, {});
}

/** 연령대에 맞는 장소 반환
 * - `ageBands: ['all']`인 장소는 어떤 연령대 쿼리에도 매칭
 * - `ageBand: 'all'` 쿼리는 모든 장소 반환
 */
export function getPlacesByAgeBand(ageBand: AgeBand): PlaceSource[] {
  if (ageBand === 'all') return getPublishablePlaces();
  return getPublishablePlaces().filter(
    p => p.ageBands.includes('all') || p.ageBands.includes(ageBand)
  );
}
