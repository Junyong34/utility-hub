'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import {
  PlacesFilterBar,
  PlacesSelectedFiltersPanel,
  placesFilterParsers,
} from './PlacesFilterBar';
import { PlaceCard } from './PlaceCard';
import { PLACES_MUTED_SURFACE_CLASS } from './place-theme';
import {
  buildPlaceListSearchParams,
  normalizePlaceListFilters,
} from '@/lib/places/place-list-contract';
import { cn } from '@/lib/utils';
import type {
  PlaceListFilters,
  PlaceListPageResponse,
} from '@/lib/places/place-list-contract';
import type { RegionSlug } from '@/types/place-source';

interface PlacesFilteredGridProps {
  initialPage: PlaceListPageResponse;
  regionSlug?: RegionSlug;
}

interface ObserverState {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (() => Promise<unknown>) | null;
}

const PLACE_LIST_PREFETCH_MARGIN_PX = 3600;

export function PlacesFilteredGrid({
  initialPage,
  regionSlug,
}: PlacesFilteredGridProps) {
  const [queryState] = useQueryStates(placesFilterParsers);
  const observerTarget = useRef<HTMLDivElement>(null);
  const observerStateRef = useRef<ObserverState>({
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: null,
  });

  const filters = useMemo(
    () => normalizePlaceListFilters(queryState),
    [queryState]
  );

  const queryKey = useMemo(
    () => ['places', regionSlug ?? 'all', filters] as const,
    [filters, regionSlug]
  );

  const isInitialQuery = useMemo(
    () => areFiltersEqual(filters, initialPage.filters),
    [filters, initialPage.filters]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery<PlaceListPageResponse>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = typeof pageParam === 'number' ? pageParam : 1;
      const searchParams = buildPlaceListSearchParams({
        page: currentPage,
        region: regionSlug ?? null,
        filters,
      });
      const response = await fetch(`/api/places?${searchParams.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }

      return (await response.json()) as PlaceListPageResponse;
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
    initialData: isInitialQuery
      ? {
          pages: [initialPage],
          pageParams: [1],
        }
      : undefined,
  });

  const allLoadedPlaces = data?.pages.flatMap(page => page.places) ?? [];
  const matchedTotalCount = data?.pages[0]?.total ?? initialPage.total;
  const scopeTotalCount = data?.pages[0]?.scopeTotal ?? initialPage.scopeTotal;

  const loadNextPageIfReady = useCallback(() => {
    const {
      hasNextPage: canLoadMore,
      isFetchingNextPage: isLoadingMore,
      fetchNextPage: fetchNext,
    } = observerStateRef.current;

    if (!canLoadMore || isLoadingMore || !fetchNext) {
      return;
    }

    fetchNext();
  }, []);

  useEffect(() => {
    observerStateRef.current = {
      hasNextPage: Boolean(hasNextPage),
      isFetchingNextPage,
      fetchNextPage,
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const element = observerTarget.current;

    if (!element || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const targetTop = element.getBoundingClientRect().top;

    if (targetTop < viewportHeight + PLACE_LIST_PREFETCH_MARGIN_PX) {
      loadNextPageIfReady();
    }
  }, [
    allLoadedPlaces.length,
    hasNextPage,
    isFetchingNextPage,
    loadNextPageIfReady,
  ]);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [target] = entries;
        if (target?.isIntersecting) {
          loadNextPageIfReady();
        }
      },
      {
        threshold: 0.05,
        rootMargin: `${PLACE_LIST_PREFETCH_MARGIN_PX}px 0px`,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadNextPageIfReady]);

  return (
    <div className="space-y-5 sm:space-y-6">
      <PlacesFilterBar
        scopeTotalCount={scopeTotalCount}
        matchedTotalCount={matchedTotalCount}
      />

      <div className="grid min-w-0 gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <PlacesSelectedFiltersPanel />

        <section
          className={cn(
            'min-w-0 rounded-[26px] p-3 sm:p-4',
            PLACES_MUTED_SURFACE_CLASS
          )}
        >
          <div className="mb-4 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                총 {matchedTotalCount}개 장소
              </p>
              <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                공식·준공식 검증 상태인 장소만 보여줍니다.
              </p>
            </div>
            <p className="text-[12px] font-medium text-stone">
              스크롤하면 자동으로 더 불러옵니다.
            </p>
          </div>

          {isPending ? (
            <div className="rounded-[22px] border border-hairline-soft bg-canvas/70 px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground">
                조건에 맞는 장소를 불러오는 중입니다...
              </p>
            </div>
          ) : isError ? (
            <div className="rounded-[22px] border border-hairline-soft bg-canvas/70 px-6 py-12 text-center">
              <p
                className="font-editorial text-lg font-semibold text-foreground"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                장소 목록을 다시 불러오지 못했습니다
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                잠시 후 다시 시도하거나 필터를 조정해 보세요.
              </p>
            </div>
          ) : matchedTotalCount > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {allLoadedPlaces.map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>

              <div
                ref={observerTarget}
                data-testid="places-infinite-scroll-sentinel"
                className="flex min-h-16 flex-col items-center justify-center gap-2"
              >
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-hairline-strong border-b-primary" />
                    <span>다음 장소를 불러오는 중입니다...</span>
                  </div>
                ) : null}

                {!hasNextPage && allLoadedPlaces.length > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    조건에 맞는 장소를 모두 불러왔습니다.
                  </p>
                ) : null}

                {hasNextPage && !isFetchingNextPage ? (
                  <button
                    type="button"
                    onClick={loadNextPageIfReady}
                    className="inline-flex h-10 items-center justify-center rounded-[14px] border border-hairline-strong bg-canvas px-4 text-sm font-semibold text-slate transition-colors hover:border-primary/35 hover:text-foreground"
                  >
                    더 불러오기
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <div className="rounded-[22px] border border-hairline-soft bg-canvas/70 px-6 py-12 text-center">
              <p
                className="font-editorial text-lg font-semibold text-foreground"
                style={{
                  fontFamily: 'var(--font-editorial)',
                }}
              >
                지금 조건에 딱 맞는 장소가 아직 없습니다
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                조건에 맞는 장소가 없습니다. 필터를 조정해보세요.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function areFiltersEqual(
  left: PlaceListFilters,
  right: PlaceListFilters
): boolean {
  return (
    left.search === right.search &&
    left.age === right.age &&
    left.category === right.category &&
    left.indoor === right.indoor &&
    left.outdoor === right.outdoor &&
    left.free === right.free &&
    left.feeding === right.feeding &&
    left.stroller === right.stroller &&
    left.rain === right.rain
  );
}
