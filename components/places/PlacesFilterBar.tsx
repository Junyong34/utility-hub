'use client';

import { parseAsStringLiteral, parseAsBoolean, useQueryStates } from 'nuqs';
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
    active: 'border-violet-500 bg-violet-500/10 text-violet-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-violet-500/50 hover:text-foreground',
  },
  category: {
    active: 'border-primary bg-primary/10 text-primary',
    inactive: 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
  },
  indoor: {
    active: 'border-blue-500 bg-blue-500/10 text-blue-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-blue-500/50 hover:text-foreground',
  },
  outdoor: {
    active: 'border-teal-500 bg-teal-500/10 text-teal-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-teal-500/50 hover:text-foreground',
  },
  free: {
    active: 'border-emerald-500 bg-emerald-500/10 text-emerald-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-emerald-500/50 hover:text-foreground',
  },
  feeding: {
    active: 'border-pink-500 bg-pink-500/10 text-pink-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-pink-500/50 hover:text-foreground',
  },
  stroller: {
    active: 'border-amber-500 bg-amber-500/10 text-amber-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-amber-500/50 hover:text-foreground',
  },
  rain: {
    active: 'border-sky-500 bg-sky-500/10 text-sky-600',
    inactive: 'border-border bg-background text-muted-foreground hover:border-sky-500/50 hover:text-foreground',
  },
} as const;

interface PlacesFilterBarProps {
  totalCount: number;
  filteredCount: number;
}

export function PlacesFilterBar({ totalCount, filteredCount }: PlacesFilterBarProps) {
  const [filters, setFilters] = useQueryStates(placesFilterParsers, {
    shallow: false,
  });

  const isActive = filters.age || filters.category || filters.indoor || filters.outdoor || filters.free || filters.feeding || filters.stroller || filters.rain;

  function toggleAge(band: (typeof AGE_BANDS)[number]) {
    setFilters(prev => ({ ...prev, age: prev.age === band ? null : band }));
  }

  function toggleCategory(cat: (typeof CATEGORIES)[number]) {
    setFilters(prev => ({ ...prev, category: prev.category === cat ? null : cat }));
  }

  function toggleBoolean(key: 'indoor' | 'outdoor' | 'free' | 'feeding' | 'stroller' | 'rain') {
    setFilters(prev => ({ ...prev, [key]: prev[key] ? null : true }));
  }

  function clearAll() {
    setFilters({ age: null, category: null, indoor: null, outdoor: null, free: null, feeding: null, stroller: null, rain: null });
  }

  return (
    <div className="space-y-2.5">
      {/* 결과 수 + 초기화 */}
      <div className="flex items-center justify-between min-h-[20px]">
        {isActive ? (
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{totalCount}곳</span> 중{' '}
            <span className="font-semibold text-foreground">{filteredCount}곳</span> 표시
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            총 <span className="font-semibold text-foreground">{totalCount}곳</span>
          </p>
        )}
        {isActive && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
          >
            초기화
          </button>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-muted-foreground shrink-0 w-6">종류</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              filters.category === cat
                ? FILTER_CHIP_STYLES.category.active
                : FILTER_CHIP_STYLES.category.inactive
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* 연령 필터 */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-muted-foreground shrink-0 w-6">연령</span>
        {AGE_BANDS.map(band => (
          <button
            key={band}
            onClick={() => toggleAge(band)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              filters.age === band
                ? FILTER_CHIP_STYLES.age.active
                : FILTER_CHIP_STYLES.age.inactive
            }`}
          >
            {AGE_BAND_LABELS[band]}
          </button>
        ))}
      </div>

      {/* 조건 필터 */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-muted-foreground shrink-0 w-6">조건</span>
        <button
          onClick={() => toggleBoolean('indoor')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            filters.indoor ? FILTER_CHIP_STYLES.indoor.active : FILTER_CHIP_STYLES.indoor.inactive
          }`}
        >
          실내
        </button>
        <button
          onClick={() => toggleBoolean('outdoor')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            filters.outdoor ? FILTER_CHIP_STYLES.outdoor.active : FILTER_CHIP_STYLES.outdoor.inactive
          }`}
        >
          야외
        </button>
        <button
          onClick={() => toggleBoolean('free')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            filters.free ? FILTER_CHIP_STYLES.free.active : FILTER_CHIP_STYLES.free.inactive
          }`}
        >
          무료
        </button>
        <button
          onClick={() => toggleBoolean('feeding')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            filters.feeding ? FILTER_CHIP_STYLES.feeding.active : FILTER_CHIP_STYLES.feeding.inactive
          }`}
        >
          수유실
        </button>
        <button
          onClick={() => toggleBoolean('stroller')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            filters.stroller ? FILTER_CHIP_STYLES.stroller.active : FILTER_CHIP_STYLES.stroller.inactive
          }`}
        >
          유모차 가능
        </button>
        <button
          onClick={() => toggleBoolean('rain')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            filters.rain ? FILTER_CHIP_STYLES.rain.active : FILTER_CHIP_STYLES.rain.inactive
          }`}
        >
          우천 가능
        </button>
      </div>
    </div>
  );
}
