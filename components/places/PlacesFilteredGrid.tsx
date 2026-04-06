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
    <div className="space-y-6">
      <PlacesFilterBar totalCount={places.length} filteredCount={filtered.length} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border/50 bg-muted/20 px-6 py-12 text-center">
          <p className="text-muted-foreground text-sm">
            조건에 맞는 장소가 없습니다. 필터를 조정해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
