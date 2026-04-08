'use client';

import { useQueryStates } from 'nuqs';
import { placesFilterParsers } from './PlacesFilterBar';
import { PlaceCard } from './PlaceCard';
import { PlacesFilterBar } from './PlacesFilterBar';
import type { PlaceSource } from '@/types/place-source';

interface PlacesFilteredGridProps {
  places: PlaceSource[];
}

export function PlacesFilteredGrid({ places }: PlacesFilteredGridProps) {
  const [filters] = useQueryStates(placesFilterParsers);

  const filtered = places.filter(p => {
    // 카테고리 필터
    if (filters.category) {
      if (p.category !== filters.category) return false;
    }
    // 연령 필터
    if (filters.age && filters.age !== 'all') {
      const matches = p.ageBands.includes('all') || p.ageBands.includes(filters.age);
      if (!matches) return false;
    }
    // 실내 필터
    if (filters.indoor) {
      if (p.indoorOutdoor !== 'indoor' && p.indoorOutdoor !== 'both') return false;
    }
    // 야외 필터
    if (filters.outdoor) {
      if (p.indoorOutdoor !== 'outdoor' && p.indoorOutdoor !== 'both') return false;
    }
    // 무료 필터
    if (filters.free) {
      if (p.priceType !== 'free') return false;
    }
    // 수유실 필터
    if (filters.feeding) {
      if (!p.feedingRoom) return false;
    }
    // 유모차 필터
    if (filters.stroller) {
      if (!p.strollerFriendly) return false;
    }
    // 우천 필터
    if (filters.rain) {
      if (!p.rainFriendly) return false;
    }
    return true;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      <PlacesFilterBar totalCount={places.length} filteredCount={filtered.length} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filtered.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-[#e7dccf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] px-6 py-12 text-center shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
          <p
            className="text-lg font-semibold tracking-tight text-[#2f2922]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            지금 조건에 딱 맞는 장소가 아직 없습니다
          </p>
          <p className="mt-2 text-sm text-[#6a5d4d]">
            조건에 맞는 장소가 없습니다. 필터를 조정해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
