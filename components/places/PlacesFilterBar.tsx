'use client';

import { useEffect, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import {
  parseAsString,
  parseAsStringLiteral,
  parseAsBoolean,
  useQueryStates,
} from 'nuqs';
import { PlacesFilterRail } from './PlacesFilterRail';
import { Input } from '@/components/ui/input';
import { MAX_PLACE_SEARCH_LENGTH } from '@/lib/places/place-list-contract';
import type { AgeBand, PlaceCategory } from '@/types/place-source';
import {
  FILTER_CHIP_STYLES,
  PLACES_MUTED_SURFACE_CLASS,
  TONE_STYLES,
} from './place-theme';
import { cn } from '@/lib/utils';

const AGE_BANDS = ['0-12m', '1-3y', '3-6y', '6-10y'] as const;

export const AGE_BAND_LABELS: Record<string, string> = {
  '0-12m': '0~12개월',
  '1-3y': '1~3세',
  '3-6y': '3~6세',
  '6-10y': '6~10세',
};

const CATEGORIES = [
  'baby-kids-cafe',
  'kids-cafe',
  'public-play',
  'museum',
  'experience',
  'park',
  'library',
  'culture',
  'sports',
] as const;

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  'baby-kids-cafe': '베이비키즈카페',
  'kids-cafe': '키즈카페',
  'public-play': '공공 놀이시설',
  museum: '박물관',
  experience: '체험시설',
  park: '공원',
  library: '도서관',
  culture: '문화시설',
  sports: '체육시설',
};

export const placesFilterParsers = {
  search: parseAsString,
  age: parseAsStringLiteral([...AGE_BANDS, 'all'] as const),
  category: parseAsStringLiteral([...CATEGORIES] as const),
  indoor: parseAsBoolean,
  outdoor: parseAsBoolean,
  free: parseAsBoolean,
  feeding: parseAsBoolean,
  stroller: parseAsBoolean,
  rain: parseAsBoolean,
};

export type PlacesFilter = {
  search: string | null;
  age: AgeBand | 'all' | null;
  category: PlaceCategory | null;
  indoor: boolean | null;
  outdoor: boolean | null;
  free: boolean | null;
  feeding: boolean | null;
  stroller: boolean | null;
  rain: boolean | null;
};

interface PlacesFilterBarProps {
  scopeTotalCount: number;
  matchedTotalCount: number;
}

export function PlacesFilterBar({
  scopeTotalCount,
  matchedTotalCount,
}: PlacesFilterBarProps) {
  const [filters, setFilters] = useQueryStates(placesFilterParsers, {
    shallow: true,
    history: 'push',
  });
  const appliedSearch = filters.search ?? '';
  const [searchDraft, setSearchDraft] = useState(appliedSearch);

  useEffect(() => {
    setSearchDraft(appliedSearch);
  }, [appliedSearch]);

  const isActive =
    filters.search ||
    filters.age ||
    filters.category ||
    filters.indoor ||
    filters.outdoor ||
    filters.free ||
    filters.feeding ||
    filters.stroller ||
    filters.rain;

  function toggleAge(band: (typeof AGE_BANDS)[number]) {
    setFilters(prev => ({ ...prev, age: prev.age === band ? null : band }));
  }

  function toggleCategory(cat: (typeof CATEGORIES)[number]) {
    setFilters(prev => ({
      ...prev,
      category: prev.category === cat ? null : cat,
    }));
  }

  function toggleBoolean(
    key: 'indoor' | 'outdoor' | 'free' | 'feeding' | 'stroller' | 'rain'
  ) {
    setFilters(prev => ({ ...prev, [key]: prev[key] ? null : true }));
  }

  function clearAll() {
    setSearchDraft('');
    setFilters({
      age: null,
      category: null,
      search: null,
      indoor: null,
      outdoor: null,
      free: null,
      feeding: null,
      stroller: null,
      rain: null,
    });
  }

  function applySearch() {
    const normalized = searchDraft.trim().slice(0, MAX_PLACE_SEARCH_LENGTH);
    setSearchDraft(normalized);
    setFilters(prev => ({ ...prev, search: normalized || null }));
  }

  return (
    <div
      className={cn(
        'rounded-[28px] p-4 sm:rounded-[30px] sm:p-5',
        PLACES_MUTED_SURFACE_CLASS
      )}
    >
      <div className="mb-4 space-y-1.5 sm:mb-5 sm:space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sunshine-900">
          Filter Board
        </p>
        <h3
          className="font-editorial text-[1.65rem] font-normal text-foreground sm:text-2xl"
          style={{
            fontFamily: 'var(--font-editorial)',
          }}
        >
          조건으로 더 좁혀보기
        </h3>
        <p className="text-[13px] leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          필터를 누르면 URL에 바로 반영됩니다. 지금 필요한 조건만 골라 장소를 더
          구체적으로 좁혀보세요.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* 결과 수 + 초기화 */}
        <div className="flex min-h-[20px] items-center justify-between gap-3 sm:gap-4">
          {isActive ? (
            <p className="text-[13px] text-muted-foreground sm:text-sm">
              <span className="font-semibold text-foreground">
                전체 {scopeTotalCount}곳
              </span>
              에서{' '}
              <span className="font-semibold text-foreground">
                조건 일치 {matchedTotalCount}곳
              </span>
            </p>
          ) : (
            <p className="text-[13px] text-muted-foreground sm:text-sm">
              총{' '}
              <span className="font-semibold text-foreground">
                {scopeTotalCount}곳
              </span>
            </p>
          )}
          {isActive && (
            <button
              onClick={clearAll}
              className="text-[13px] font-medium text-slate underline underline-offset-2 transition-colors hover:text-foreground sm:text-sm"
            >
              초기화
            </button>
          )}
        </div>

        <form
          className="flex gap-2"
          role="search"
          onSubmit={event => {
            event.preventDefault();
            applySearch();
          }}
        >
          <div className="relative min-w-0 flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate" />
            <Input
              type="search"
              aria-label="장소명 검색"
              value={searchDraft}
              onChange={event => setSearchDraft(event.target.value)}
              maxLength={MAX_PLACE_SEARCH_LENGTH}
              placeholder="장소명으로 검색"
              className="h-10 rounded-full border-hairline bg-canvas/85 pr-3 pl-9 text-[13px] text-foreground shadow-none placeholder:text-stone focus-visible:border-primary/45 focus-visible:ring-primary/25 sm:h-11 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            aria-label="장소명 검색 적용"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-colors hover:bg-primary-deep focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none sm:h-11 sm:w-11"
          >
            <SearchIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <PlacesFilterRail
          label="종류"
          labelClassName={cn('border', TONE_STYLES.sand.badge)}
          trackTestId="places-filter-track-category"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
                filters.category === cat
                  ? FILTER_CHIP_STYLES.active.category
                  : FILTER_CHIP_STYLES.inactive
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </PlacesFilterRail>

        <PlacesFilterRail
          label="연령"
          labelClassName={cn('border', TONE_STYLES.butter.badge)}
          trackTestId="places-filter-track-age"
        >
          {AGE_BANDS.map(band => (
            <button
              key={band}
              onClick={() => toggleAge(band)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
                filters.age === band
                  ? FILTER_CHIP_STYLES.active.age
                  : FILTER_CHIP_STYLES.inactive
              }`}
            >
              {AGE_BAND_LABELS[band]}
            </button>
          ))}
        </PlacesFilterRail>

        <PlacesFilterRail
          label="조건"
          labelClassName={cn('border', TONE_STYLES.mint.badge)}
          trackTestId="places-filter-track-condition"
        >
          <button
            onClick={() => toggleBoolean('indoor')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.indoor
                ? FILTER_CHIP_STYLES.active.indoor
                : FILTER_CHIP_STYLES.inactive
            }`}
          >
            실내
          </button>
          <button
            onClick={() => toggleBoolean('outdoor')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.outdoor
                ? FILTER_CHIP_STYLES.active.outdoor
                : FILTER_CHIP_STYLES.inactive
            }`}
          >
            야외
          </button>
          <button
            onClick={() => toggleBoolean('free')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.free
                ? FILTER_CHIP_STYLES.active.free
                : FILTER_CHIP_STYLES.inactive
            }`}
          >
            무료
          </button>
          <button
            onClick={() => toggleBoolean('feeding')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.feeding
                ? FILTER_CHIP_STYLES.active.feeding
                : FILTER_CHIP_STYLES.inactive
            }`}
          >
            수유실
          </button>
          <button
            onClick={() => toggleBoolean('stroller')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.stroller
                ? FILTER_CHIP_STYLES.active.stroller
                : FILTER_CHIP_STYLES.inactive
            }`}
          >
            유모차 가능
          </button>
          <button
            onClick={() => toggleBoolean('rain')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.rain
                ? FILTER_CHIP_STYLES.active.rain
                : FILTER_CHIP_STYLES.inactive
            }`}
          >
            우천 가능
          </button>
        </PlacesFilterRail>
      </div>
    </div>
  );
}
