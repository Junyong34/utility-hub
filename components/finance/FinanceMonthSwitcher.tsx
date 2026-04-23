'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { FinanceComparisonMode } from '@/lib/finance/types';
import { buildFinanceHref } from '@/lib/finance/url-state';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import { cn } from '@/lib/utils';
import {
  getLocalDraftMonths,
  getLocalDraftSnapshot,
  getServerLocalDraftSnapshot,
  subscribeToLocalDraft,
} from './input/localDraft';

interface FinanceMonthSwitcherProps {
  currentPath: string;
  availableMonths: string[];
  temporaryMonths?: string[];
  month: string | null;
  compare: FinanceComparisonMode;
}

export function FinanceMonthSwitcher({
  currentPath,
  availableMonths,
  temporaryMonths = [],
  month,
  compare,
}: FinanceMonthSwitcherProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const localDraftRaw = useSyncExternalStore(
    subscribeToLocalDraft,
    getLocalDraftSnapshot,
    getServerLocalDraftSnapshot
  );
  const inputLocalMonths = useMemo(
    () =>
      currentPath === '/finance/input'
        ? getLocalDraftMonths(localDraftRaw)
        : [],
    [currentPath, localDraftRaw]
  );
  const requestedMonth = searchParams.get('month');
  const localInputMode =
    currentPath === '/finance/input' && inputLocalMonths.length > 0;
  const effectiveMonth = useMemo(() => {
    if (!localInputMode) {
      return month;
    }

    if (requestedMonth && inputLocalMonths.includes(requestedMonth)) {
      return requestedMonth;
    }

    return inputLocalMonths.at(-1) ?? month;
  }, [inputLocalMonths, localInputMode, month, requestedMonth]);
  const displayMonths = useMemo(() => {
    if (localInputMode) {
      return [...inputLocalMonths];
    }

    return [...new Set([...availableMonths, ...temporaryMonths])].sort();
  }, [availableMonths, inputLocalMonths, localInputMode, temporaryMonths]);
  const localOnlyMonthCount = useMemo(
    () =>
      displayMonths.filter(monthValue => !availableMonths.includes(monthValue))
        .length,
    [availableMonths, displayMonths]
  );
  const preserveLocalDraft =
    currentPath === '/finance/input' && localOnlyMonthCount > 0;
  const availableMonthSet = useMemo(
    () => new Set(displayMonths),
    [displayMonths]
  );
  const availableYears = useMemo(
    () => [...new Set(displayMonths.map(item => item.slice(0, 4)))].sort(),
    [displayMonths]
  );
  const [selectedYearState, setSelectedYearState] = useState(() => ({
    sourceMonth: effectiveMonth,
    year:
      effectiveMonth?.slice(0, 4) ??
      availableYears.at(-1) ??
      String(new Date().getFullYear()),
  }));
  const selectedYear =
    selectedYearState.sourceMonth === effectiveMonth
      ? selectedYearState.year
      : (effectiveMonth?.slice(0, 4) ?? selectedYearState.year);

  if (!effectiveMonth || displayMonths.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        아직 생성된 월 데이터가 없습니다.
      </p>
    );
  }

  const currentIndex = displayMonths.indexOf(effectiveMonth);
  const previousMonth =
    currentIndex > 0 ? displayMonths[currentIndex - 1] : null;
  const nextMonth =
    currentIndex >= 0 && currentIndex < displayMonths.length - 1
      ? displayMonths[currentIndex + 1]
      : null;
  const monthButtons = Array.from({ length: 12 }, (_, index) => {
    const monthValue = String(index + 1).padStart(2, '0');
    const targetMonth = `${selectedYear}-${monthValue}`;

    return {
      label: `${index + 1}월`,
      value: targetMonth,
      available: availableMonthSet.has(targetMonth),
      active: targetMonth === effectiveMonth,
    };
  });

  const buildMonthHref = (targetMonth: string) => {
    const baseHref = buildFinanceHref(currentPath, {
      month: targetMonth,
      compare,
    });

    if (!preserveLocalDraft) {
      return baseHref;
    }

    return `${baseHref}${baseHref.includes('?') ? '&' : '?'}local=1`;
  };

  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-[140px_auto]">
        <label className="sr-only" htmlFor="finance-month-select">
          기준년도 선택
        </label>
        <select
          id="finance-month-select"
          value={selectedYear}
          onChange={event => {
            setSelectedYearState({
              sourceMonth: effectiveMonth,
              year: event.target.value,
            });
          }}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm font-medium text-foreground"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          {previousMonth ? (
            <Link
              href={buildMonthHref(previousMonth)}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
              이전
            </Link>
          ) : (
            <span className="inline-flex h-9 items-center gap-1 rounded-lg border border-border/60 px-2.5 text-sm text-muted-foreground/50">
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
              이전
            </span>
          )}
          {nextMonth ? (
            <Link
              href={buildMonthHref(nextMonth)}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              다음
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span className="inline-flex h-9 items-center gap-1 rounded-lg border border-border/60 px-2.5 text-sm text-muted-foreground/50">
              다음
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 sm:grid-cols-6">
        {monthButtons.map(item => {
          if (!item.available) {
            return (
              <button
                key={item.value}
                type="button"
                disabled
                className="h-8 whitespace-nowrap rounded-lg border border-border/60 px-1 text-xs text-muted-foreground/40"
              >
                {item.label}
              </button>
            );
          }

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                router.push(buildMonthHref(item.value));
              }}
              className={cn(
                'h-8 whitespace-nowrap rounded-lg border px-1 text-xs transition-colors',
                item.active
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        총 {availableMonths.length}개월 저장됨
        {localOnlyMonthCount > 0 ? ` · 임시 ${localOnlyMonthCount}개월` : ''} ·
        현재 {formatFinanceMonthLabel(effectiveMonth)}
      </p>
    </div>
  );
}
