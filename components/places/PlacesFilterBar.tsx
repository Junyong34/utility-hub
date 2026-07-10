'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BabyIcon,
  CloudRainIcon,
  DropletsIcon,
  HouseIcon,
  RotateCcwIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';
import { PlacesFilterRail } from './PlacesFilterRail';
import { Input } from '@/components/ui/input';
import { MAX_PLACE_SEARCH_LENGTH } from '@/lib/places/place-list-contract';
import type {
  AgeBand,
  PlaceCategory,
  PlaceSeason,
  PlaceTheme,
} from '@/types/place-source';
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

const SEASONS = ['spring', 'summer', 'fall', 'winter', 'all-season'] as const;

export const SEASON_LABELS: Record<PlaceSeason, string> = {
  spring: '봄',
  summer: '여름',
  fall: '가을',
  winter: '겨울',
  'all-season': '4계절',
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

const THEMES = ['animal'] as const;

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

export const THEME_LABELS: Record<PlaceTheme, string> = {
  animal: '동물 체험',
};

export const placesFilterParsers = {
  search: parseAsString,
  age: parseAsStringLiteral([...AGE_BANDS, 'all'] as const),
  category: parseAsStringLiteral([...CATEGORIES] as const),
  theme: parseAsStringLiteral([...THEMES] as const),
  season: parseAsStringLiteral([...SEASONS] as const),
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
  theme: PlaceTheme | null;
  season: PlaceSeason | null;
  indoor: boolean | null;
  outdoor: boolean | null;
  free: boolean | null;
  feeding: boolean | null;
  stroller: boolean | null;
  rain: boolean | null;
};

type BooleanFilterKey =
  | 'indoor'
  | 'outdoor'
  | 'free'
  | 'feeding'
  | 'stroller'
  | 'rain';

type FilterKey = keyof PlacesFilter;

interface ActiveFilterItem {
  key: FilterKey;
  label: string;
  tone: keyof typeof FILTER_CHIP_STYLES.active;
}

interface PlacesFilterBarProps {
  scopeTotalCount: number;
  matchedTotalCount: number;
}

const QUICK_FILTERS: Array<{
  key: BooleanFilterKey;
  label: string;
  icon: typeof HouseIcon;
}> = [
  { key: 'indoor', label: '실내 장소', icon: HouseIcon },
  { key: 'rain', label: '비 오는 날', icon: CloudRainIcon },
  { key: 'feeding', label: '수유실 있음', icon: DropletsIcon },
  { key: 'stroller', label: '유모차 가능', icon: BabyIcon },
  { key: 'free', label: '무료 장소', icon: RotateCcwIcon },
];

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
  const activeItems = useActiveFilterItems(filters);

  useEffect(() => {
    setSearchDraft(appliedSearch);
  }, [appliedSearch]);

  const isActive = activeItems.length > 0;

  function toggleAge(band: (typeof AGE_BANDS)[number]) {
    setFilters(prev => ({ ...prev, age: prev.age === band ? null : band }));
  }

  function toggleCategory(cat: (typeof CATEGORIES)[number]) {
    setFilters(prev => ({
      ...prev,
      category: prev.category === cat ? null : cat,
    }));
  }

  function toggleTheme(theme: (typeof THEMES)[number]) {
    setFilters(prev => ({
      ...prev,
      theme: prev.theme === theme ? null : theme,
    }));
  }

  function toggleSeason(season: (typeof SEASONS)[number]) {
    setFilters(prev => ({
      ...prev,
      season: prev.season === season ? null : season,
    }));
  }

  function toggleBoolean(key: BooleanFilterKey) {
    setFilters(prev => ({ ...prev, [key]: prev[key] ? null : true }));
  }

  function clearFilter(key: FilterKey) {
    if (key === 'search') {
      setSearchDraft('');
    }

    setFilters(prev => ({ ...prev, [key]: null }));
  }

  function clearAll() {
    setSearchDraft('');
    setFilters({
      age: null,
      category: null,
      theme: null,
      season: null,
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
    <div className="min-w-0 space-y-4">
      <div
        className={cn(
          'rounded-[24px] p-3 sm:rounded-[28px] sm:p-4',
          PLACES_MUTED_SURFACE_CLASS
        )}
      >
        <form
          className="flex gap-2"
          role="search"
          onSubmit={event => {
            event.preventDefault();
            applySearch();
          }}
        >
          <div className="relative min-w-0 flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate" />
            <Input
              type="search"
              aria-label="장소명 검색"
              value={searchDraft}
              onChange={event => setSearchDraft(event.target.value)}
              maxLength={MAX_PLACE_SEARCH_LENGTH}
              placeholder="지역명, 장소명, 조건으로 검색"
              className="h-12 rounded-[18px] border-hairline bg-canvas/92 pr-4 pl-12 text-[15px] text-foreground shadow-none placeholder:text-stone focus-visible:border-primary/45 focus-visible:ring-primary/25 sm:h-14"
            />
          </div>
          <button
            type="submit"
            aria-label="장소명 검색 적용"
            className="inline-flex h-12 w-20 shrink-0 items-center justify-center gap-1.5 rounded-[18px] border border-primary bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_-20px_rgba(255,106,0,0.8)] transition-colors hover:bg-primary-deep focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none sm:h-14 sm:w-auto sm:px-7"
          >
            <SearchIcon className="h-4 w-4" aria-hidden="true" />
            <span>검색</span>
          </button>
        </form>

        <div className="mt-3 flex min-h-[22px] flex-wrap items-center justify-between gap-2 text-[13px] text-muted-foreground sm:text-sm">
          <p>
            {isActive ? (
              <>
                전체{' '}
                <span className="font-semibold text-foreground">
                  {scopeTotalCount}곳
                </span>
                에서 조건 일치{' '}
                <span className="font-semibold text-foreground">
                  {matchedTotalCount}곳
                </span>
              </>
            ) : (
              <>
                총{' '}
                <span className="font-semibold text-foreground">
                  {scopeTotalCount}곳
                </span>
                의 장소를 볼 수 있습니다.
              </>
            )}
          </p>
          {isActive ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate underline underline-offset-2 transition-colors hover:text-foreground"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              <span>초기화</span>
            </button>
          ) : null}
        </div>

        {activeItems.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeItems.map(item => (
              <button
                key={`${item.key}-${item.label}`}
                type="button"
                onClick={() => clearFilter(item.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-[12px] border px-3 py-1.5 text-[12px] font-semibold',
                  FILTER_CHIP_STYLES.active[item.tone]
                )}
              >
                <span>{item.label}</span>
                <XIcon className="h-3 w-3" aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid min-w-0 gap-3 lg:grid-cols-[1.1fr_0.85fr]">
        <PlacesFilterRail
          label="종류"
          labelClassName={cn('border', TONE_STYLES.sand.badge)}
          trackTestId="places-filter-track-category"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={filterChipClass(filters.category === cat, 'category')}
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
              type="button"
              onClick={() => toggleAge(band)}
              className={filterChipClass(filters.age === band, 'age')}
            >
              {AGE_BAND_LABELS[band]}
            </button>
          ))}
        </PlacesFilterRail>
      </div>

      <PlacesFilterRail
        label="테마"
        labelClassName={cn('border', TONE_STYLES.mint.badge)}
        trackTestId="places-filter-track-theme"
      >
        {THEMES.map(theme => (
          <button
            key={theme}
            type="button"
            onClick={() => toggleTheme(theme)}
            className={filterChipClass(filters.theme === theme, 'theme')}
          >
            {THEME_LABELS[theme]}
          </button>
        ))}
      </PlacesFilterRail>

      <PlacesFilterRail
        label="계절"
        labelClassName={cn('border', TONE_STYLES.peach.badge)}
        trackTestId="places-filter-track-season"
      >
        {SEASONS.map(season => (
          <button
            key={season}
            type="button"
            onClick={() => toggleSeason(season)}
            className={filterChipClass(filters.season === season, 'season')}
          >
            {SEASON_LABELS[season]}
          </button>
        ))}
      </PlacesFilterRail>

      <PlacesFilterRail
        label="조건"
        labelClassName={cn('border', TONE_STYLES.mint.badge)}
        trackTestId="places-filter-track-condition"
      >
        <button
          type="button"
          onClick={() => toggleBoolean('indoor')}
          className={filterChipClass(Boolean(filters.indoor), 'indoor')}
        >
          실내
        </button>
        <button
          type="button"
          onClick={() => toggleBoolean('outdoor')}
          className={filterChipClass(Boolean(filters.outdoor), 'outdoor')}
        >
          야외
        </button>
        <button
          type="button"
          onClick={() => toggleBoolean('free')}
          className={filterChipClass(Boolean(filters.free), 'free')}
        >
          무료
        </button>
        <button
          type="button"
          onClick={() => toggleBoolean('feeding')}
          className={filterChipClass(Boolean(filters.feeding), 'feeding')}
        >
          수유실
        </button>
        <button
          type="button"
          onClick={() => toggleBoolean('stroller')}
          className={filterChipClass(Boolean(filters.stroller), 'stroller')}
        >
          유모차 가능
        </button>
        <button
          type="button"
          onClick={() => toggleBoolean('rain')}
          className={filterChipClass(Boolean(filters.rain), 'rain')}
        >
          우천 가능
        </button>
      </PlacesFilterRail>
    </div>
  );
}

export function PlacesSelectedFiltersPanel() {
  const [filters, setFilters] = useQueryStates(placesFilterParsers, {
    shallow: true,
    history: 'push',
  });
  const activeItems = useActiveFilterItems(filters);

  function removeFilter(key: FilterKey) {
    setFilters(prev => ({ ...prev, [key]: null }));
  }

  function applyQuickFilter(key: BooleanFilterKey) {
    setFilters(prev => ({ ...prev, [key]: true }));
  }

  function clearAll() {
    setFilters({
      age: null,
      category: null,
      theme: null,
      season: null,
      search: null,
      indoor: null,
      outdoor: null,
      free: null,
      feeding: null,
      stroller: null,
      rain: null,
    });
  }

  return (
    <aside
      className={cn(
        'rounded-[24px] p-4 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto',
        PLACES_MUTED_SURFACE_CLASS
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sunshine-900">
            선택된 조건
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            오늘 고른 조건이 이곳에 모입니다.
          </p>
        </div>
        {activeItems.length > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            aria-label="선택 조건 비우기"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-hairline bg-canvas/78 text-slate transition-colors hover:text-foreground"
          >
            <XIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        {activeItems.length > 0 ? (
          activeItems.map(item => (
            <button
              key={`${item.key}-${item.label}`}
              type="button"
              onClick={() => removeFilter(item.key)}
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded-[14px] border px-3 py-2 text-left text-[12px] font-semibold',
                FILTER_CHIP_STYLES.active[item.tone]
              )}
            >
              <span>{item.label}</span>
              <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))
        ) : (
          <div className="rounded-[16px] border border-dashed border-hairline-strong bg-canvas/58 px-3 py-4 text-sm leading-6 text-muted-foreground">
            검색어나 조건을 선택하면 이곳에 정리됩니다.
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-dashed border-hairline pt-5">
        <p className="mb-3 text-[12px] font-semibold text-foreground">
          빠른 필터
        </p>
        <div className="space-y-2">
          {QUICK_FILTERS.map(item => {
            const Icon = item.icon;
            const isEnabled = Boolean(filters[item.key]);

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => applyQuickFilter(item.key)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-[14px] border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors',
                  isEnabled
                    ? FILTER_CHIP_STYLES.active[item.key]
                    : 'border-hairline bg-canvas/76 text-slate hover:border-primary/30 hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function useActiveFilterItems(filters: Partial<PlacesFilter>) {
  return useMemo<ActiveFilterItem[]>(() => {
    const items: ActiveFilterItem[] = [];

    if (filters.search) {
      items.push({
        key: 'search',
        label: `"${filters.search}"`,
        tone: 'category',
      });
    }

    if (filters.category) {
      items.push({
        key: 'category',
        label: CATEGORY_LABELS[filters.category],
        tone: 'category',
      });
    }

    if (filters.theme) {
      items.push({
        key: 'theme',
        label: THEME_LABELS[filters.theme],
        tone: 'theme',
      });
    }

    if (filters.age) {
      items.push({
        key: 'age',
        label: AGE_BAND_LABELS[filters.age] ?? filters.age,
        tone: 'age',
      });
    }

    if (filters.season) {
      items.push({
        key: 'season',
        label: SEASON_LABELS[filters.season],
        tone: 'season',
      });
    }

    if (filters.indoor) {
      items.push({ key: 'indoor', label: '실내', tone: 'indoor' });
    }

    if (filters.outdoor) {
      items.push({ key: 'outdoor', label: '야외', tone: 'outdoor' });
    }

    if (filters.free) {
      items.push({ key: 'free', label: '무료', tone: 'free' });
    }

    if (filters.feeding) {
      items.push({ key: 'feeding', label: '수유실', tone: 'feeding' });
    }

    if (filters.stroller) {
      items.push({ key: 'stroller', label: '유모차 가능', tone: 'stroller' });
    }

    if (filters.rain) {
      items.push({ key: 'rain', label: '우천 가능', tone: 'rain' });
    }

    return items;
  }, [filters]);
}

function filterChipClass(
  isActive: boolean,
  tone: keyof typeof FILTER_CHIP_STYLES.active
) {
  return cn(
    'shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold leading-none transition-colors sm:px-3.5 sm:py-2 sm:text-xs',
    isActive ? FILTER_CHIP_STYLES.active[tone] : FILTER_CHIP_STYLES.inactive
  );
}
