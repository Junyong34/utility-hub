'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { placesFilterParsers } from './PlacesFilterBar';
import { PlaceCard } from './PlaceCard';
import { PlacesFilterBar } from './PlacesFilterBar';
import {
  buildPlaceListSearchParams,
  normalizePlaceListFilters,
} from '@/lib/places/place-list-contract';
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

  useEffect(() => {
    observerStateRef.current = {
      hasNextPage: Boolean(hasNextPage),
      isFetchingNextPage,
      fetchNextPage,
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const [target] = entries;
        if (!target?.isIntersecting) {
          return;
        }

        const {
          hasNextPage: canLoadMore,
          isFetchingNextPage: isLoadingMore,
          fetchNextPage: fetchNext,
        } = observerStateRef.current;

        if (!canLoadMore || isLoadingMore || !fetchNext) {
          return;
        }

        fetchNext();
      },
      {
        threshold: 0.4,
        rootMargin: '200px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const allLoadedPlaces = data?.pages.flatMap(page => page.places) ?? [];
  const matchedTotalCount = data?.pages[0]?.total ?? initialPage.total;
  const scopeTotalCount = data?.pages[0]?.scopeTotal ?? initialPage.scopeTotal;

  return (
    <div className="space-y-5 sm:space-y-6">
      <PlacesFilterBar
        scopeTotalCount={scopeTotalCount}
        matchedTotalCount={matchedTotalCount}
      />

      {isPending ? (
        <div className="rounded-[28px] border border-[#e7dccf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] px-6 py-12 text-center shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
          <p className="text-sm text-[#6a5d4d]">
            조건에 맞는 장소를 불러오는 중입니다...
          </p>
        </div>
      ) : isError ? (
        <div className="rounded-[28px] border border-[#e7dccf] bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(248,242,232,0.96))] px-6 py-12 text-center shadow-[0_18px_45px_rgba(59,46,31,0.05)]">
          <p
            className="text-lg font-semibold tracking-tight text-[#2f2922]"
            style={{
              fontFamily:
                '"Iowan Old Style", "Apple SD Gothic Neo", "Noto Serif KR", serif',
            }}
          >
            장소 목록을 다시 불러오지 못했습니다
          </p>
          <p className="mt-2 text-sm text-[#6a5d4d]">
            잠시 후 다시 시도하거나 필터를 조정해 보세요.
          </p>
        </div>
      ) : matchedTotalCount > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {allLoadedPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>

          <div
            ref={observerTarget}
            className="flex min-h-16 flex-col items-center justify-center gap-2"
          >
            {isFetchingNextPage ? (
              <div className="flex items-center gap-2 text-sm text-[#6a5d4d]">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#d7c9b4] border-b-[#8b7352]" />
                <span>다음 장소를 불러오는 중입니다...</span>
              </div>
            ) : null}

            {!hasNextPage && allLoadedPlaces.length > 0 ? (
              <p className="text-sm text-[#6a5d4d]">
                조건에 맞는 장소를 모두 불러왔습니다.
              </p>
            ) : null}
          </div>
        </>
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
