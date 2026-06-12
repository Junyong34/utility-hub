'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import {
  buildPlacePaginationHref,
  buildPlacePaginationPages,
  hasActivePlaceListFilters,
} from '@/lib/places/place-pagination';
import { cn } from '@/lib/utils';
import type { PlaceListFilters } from '@/lib/places/place-list-contract';
import type { RegionSlug } from '@/types/place-source';

interface PlacesPaginationNavProps {
  currentPage: number;
  totalPages: number;
  filters: PlaceListFilters;
  regionSlug?: RegionSlug;
}

export function PlacesPaginationNav({
  currentPage,
  totalPages,
  filters,
  regionSlug,
}: PlacesPaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const activeFilters = hasActivePlaceListFilters(filters);
  const pages = buildPlacePaginationPages({ currentPage, totalPages });
  const pageHref = (page: number) =>
    buildPlacePaginationHref({
      region: regionSlug,
      page,
      totalPages,
      filters,
      preserveFilters: activeFilters,
    });
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      aria-label="장소 목록 페이지 이동"
      data-testid="places-pagination-nav"
      className="mt-3 rounded-[18px] border border-hairline-soft bg-canvas/70 px-3 py-3"
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <PaginationLink
          href={pageHref(previousPage)}
          label="이전"
          disabled={currentPage <= 1}
          className="w-auto px-2.5"
        >
          <ChevronLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span>이전</span>
        </PaginationLink>

        {pages.map((page, index) => {
          const previous = pages[index - 1];
          const showGap = previous !== undefined && page - previous > 1;

          return (
            <span key={page} className="inline-flex items-center gap-1.5">
              {showGap ? (
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-8 items-center justify-center text-stone"
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                </span>
              ) : null}
              <PaginationLink
                href={pageHref(page)}
                label={`${page}페이지`}
                current={page === currentPage}
              >
                {page}
              </PaginationLink>
            </span>
          );
        })}

        <PaginationLink
          href={pageHref(nextPage)}
          label="다음"
          disabled={currentPage >= totalPages}
          className="w-auto px-2.5"
        >
          <span>다음</span>
          <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </PaginationLink>
      </div>
    </nav>
  );
}

interface PaginationLinkProps {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  current?: boolean;
  disabled?: boolean;
}

function PaginationLink({
  href,
  label,
  children,
  className,
  current = false,
  disabled = false,
}: PaginationLinkProps) {
  const baseClassName = cn(
    'inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-[12px] border px-2 text-sm font-semibold transition-colors',
    current
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-hairline bg-canvas text-slate hover:border-primary/40 hover:text-foreground',
    disabled && 'pointer-events-none opacity-45',
    className
  );

  if (current || disabled) {
    return (
      <span
        aria-current={current ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        aria-label={label}
        className={baseClassName}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      className={baseClassName}
    >
      {children}
    </Link>
  );
}
