'use client';

import { parseAsStringLiteral, parseAsBoolean, useQueryStates } from 'nuqs';
import { PlacesFilterRail } from './PlacesFilterRail';
import type { AgeBand, PlaceCategory } from '@/types/place-source';

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
  age: AgeBand | 'all' | null;
  category: PlaceCategory | null;
  indoor: boolean | null;
  outdoor: boolean | null;
  free: boolean | null;
  feeding: boolean | null;
  stroller: boolean | null;
  rain: boolean | null;
};

/** 필터 칩 공통 색상 토큰 — PlaceCard 배지와 동일하게 맞춤 */
export const FILTER_CHIP_STYLES = {
  age: {
    active: 'border-[#ddd5eb] bg-[#f1edf7] text-[#63577d]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#c9bddf] hover:text-[#312b24]',
  },
  category: {
    active: 'border-[#d8dece] bg-[#eef3e8] text-[#4f6247]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#b8c7ab] hover:text-[#312b24]',
  },
  indoor: {
    active: 'border-[#d5e0ec] bg-[#e8eef6] text-[#49627d]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#b6cae0] hover:text-[#312b24]',
  },
  outdoor: {
    active: 'border-[#d7e7e1] bg-[#e7f0ed] text-[#45685f]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#b8d3c9] hover:text-[#312b24]',
  },
  free: {
    active: 'border-[#dfe8d5] bg-[#eef3e7] text-[#526049]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#bfd0ad] hover:text-[#312b24]',
  },
  feeding: {
    active: 'border-[#eadad6] bg-[#f6ece8] text-[#835e52]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#d7c2bb] hover:text-[#312b24]',
  },
  stroller: {
    active: 'border-[#eadfcf] bg-[#f7f0e4] text-[#7c6645]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#d7c5a4] hover:text-[#312b24]',
  },
  rain: {
    active: 'border-[#d7e3ef] bg-[#e9f1f8] text-[#4b6882]',
    inactive:
      'border-[#e4ddd3] bg-white/80 text-[#6b5b48] hover:border-[#bfd2e3] hover:text-[#312b24]',
  },
} as const;

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

  const isActive =
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
    setFilters({
      age: null,
      category: null,
      indoor: null,
      outdoor: null,
      free: null,
      feeding: null,
      stroller: null,
      rain: null,
    });
  }

  return (
    <div className="rounded-[28px] border border-[#e7dccf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] p-4 shadow-[0_18px_45px_rgba(59,46,31,0.06)] sm:rounded-[30px] sm:p-5">
      <div className="mb-4 space-y-1.5 sm:mb-5 sm:space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a6445]">
          Filter Board
        </p>
        <h3
          className="text-[1.65rem] font-semibold tracking-tight text-[#2a261f] sm:text-2xl"
          style={{
            fontFamily:
              '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
          }}
        >
          조건으로 더 좁혀보기
        </h3>
        <p className="text-[13px] leading-5 text-[#665949] sm:text-sm sm:leading-6">
          필터를 누르면 URL에 바로 반영됩니다. 지금 필요한 조건만 골라 장소를 더
          구체적으로 좁혀보세요.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* 결과 수 + 초기화 */}
        <div className="flex min-h-[20px] items-center justify-between gap-3 sm:gap-4">
          {isActive ? (
            <p className="text-[13px] text-[#6a5d4d] sm:text-sm">
              <span className="font-semibold text-[#2e2821]">
                전체 {scopeTotalCount}곳
              </span>
              에서{' '}
              <span className="font-semibold text-[#2e2821]">
                조건 일치 {matchedTotalCount}곳
              </span>
            </p>
          ) : (
            <p className="text-[13px] text-[#6a5d4d] sm:text-sm">
              총{' '}
              <span className="font-semibold text-[#2e2821]">
                {scopeTotalCount}곳
              </span>
            </p>
          )}
          {isActive && (
            <button
              onClick={clearAll}
              className="text-[13px] font-medium text-[#7b6853] underline underline-offset-2 transition-colors hover:text-[#3a332b] sm:text-sm"
            >
              초기화
            </button>
          )}
        </div>

        <PlacesFilterRail
          label="종류"
          labelClassName="bg-[#f5ecde] text-[#7b6443]"
          trackTestId="places-filter-track-category"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
                filters.category === cat
                  ? FILTER_CHIP_STYLES.category.active
                  : FILTER_CHIP_STYLES.category.inactive
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </PlacesFilterRail>

        <PlacesFilterRail
          label="연령"
          labelClassName="bg-[#f0edf6] text-[#675b80]"
          trackTestId="places-filter-track-age"
        >
          {AGE_BANDS.map(band => (
            <button
              key={band}
              onClick={() => toggleAge(band)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
                filters.age === band
                  ? FILTER_CHIP_STYLES.age.active
                  : FILTER_CHIP_STYLES.age.inactive
              }`}
            >
              {AGE_BAND_LABELS[band]}
            </button>
          ))}
        </PlacesFilterRail>

        <PlacesFilterRail
          label="조건"
          labelClassName="bg-[#eef3e8] text-[#57684e]"
          trackTestId="places-filter-track-condition"
        >
          <button
            onClick={() => toggleBoolean('indoor')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.indoor
                ? FILTER_CHIP_STYLES.indoor.active
                : FILTER_CHIP_STYLES.indoor.inactive
            }`}
          >
            실내
          </button>
          <button
            onClick={() => toggleBoolean('outdoor')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.outdoor
                ? FILTER_CHIP_STYLES.outdoor.active
                : FILTER_CHIP_STYLES.outdoor.inactive
            }`}
          >
            야외
          </button>
          <button
            onClick={() => toggleBoolean('free')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.free
                ? FILTER_CHIP_STYLES.free.active
                : FILTER_CHIP_STYLES.free.inactive
            }`}
          >
            무료
          </button>
          <button
            onClick={() => toggleBoolean('feeding')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.feeding
                ? FILTER_CHIP_STYLES.feeding.active
                : FILTER_CHIP_STYLES.feeding.inactive
            }`}
          >
            수유실
          </button>
          <button
            onClick={() => toggleBoolean('stroller')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.stroller
                ? FILTER_CHIP_STYLES.stroller.active
                : FILTER_CHIP_STYLES.stroller.inactive
            }`}
          >
            유모차 가능
          </button>
          <button
            onClick={() => toggleBoolean('rain')}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium leading-none transition-colors sm:px-3.5 sm:py-1.5 sm:text-xs ${
              filters.rain
                ? FILTER_CHIP_STYLES.rain.active
                : FILTER_CHIP_STYLES.rain.inactive
            }`}
          >
            우천 가능
          </button>
        </PlacesFilterRail>
      </div>
    </div>
  );
}
