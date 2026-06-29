'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import {
  buildBlogPaginationHref,
  buildBlogPaginationPages,
} from '@/lib/blog/pagination';
import { cn } from '@/lib/utils';

interface BlogPaginationNavProps {
  currentPage: number;
  totalPages: number;
  categorySlug?: string | null;
}

export function BlogPaginationNav({
  currentPage,
  totalPages,
  categorySlug,
}: BlogPaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildBlogPaginationPages({ currentPage, totalPages });
  const pageHref = (page: number) =>
    buildBlogPaginationHref({ categorySlug, page, totalPages });
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      aria-label="블로그 글 목록 페이지 이동"
      data-testid="blog-pagination-nav"
      className="mt-8 rounded-lg border bg-card px-3 py-3"
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <PaginationLink
          href={pageHref(previousPage)}
          label="이전 페이지"
          disabled={currentPage <= 1}
          className="w-auto px-3"
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
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
                  className="inline-flex h-9 w-8 items-center justify-center text-muted-foreground"
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
          label="다음 페이지"
          disabled={currentPage >= totalPages}
          className="w-auto px-3"
        >
          <span>다음</span>
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
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
    'inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-md border px-2 text-sm font-semibold transition-colors',
    current
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground',
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
