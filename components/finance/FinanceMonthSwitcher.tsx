'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { FinanceComparisonMode } from '@/lib/finance/types';
import { buildFinanceHref } from '@/lib/finance/url-state';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import { cn } from '@/lib/utils';

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
  const displayMonths = useMemo(
    () => [...new Set([...availableMonths, ...temporaryMonths])].sort(),
    [availableMonths, temporaryMonths]
  );
  const availableMonthSet = useMemo(
    () => new Set(displayMonths),
    [displayMonths]
  );
  const availableYears = useMemo(
    () => [...new Set(displayMonths.map(item => item.slice(0, 4)))].sort(),
    [displayMonths]
  );
  const [selectedYearState, setSelectedYearState] = useState(() => ({
    sourceMonth: month,
    year:
      month?.slice(0, 4) ??
      availableYears.at(-1) ??
      String(new Date().getFullYear()),
  }));
  const selectedYear =
    selectedYearState.sourceMonth === month
      ? selectedYearState.year
      : (month?.slice(0, 4) ?? selectedYearState.year);

  if (!month || displayMonths.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        아직 생성된 월 데이터가 없습니다.
      </p>
    );
  }

  const currentIndex = displayMonths.indexOf(month);
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
      active: targetMonth === month,
    };
  });

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
              sourceMonth: month,
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
              href={buildFinanceHref(currentPath, {
                month: previousMonth,
                compare,
              })}
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
              href={buildFinanceHref(currentPath, {
                month: nextMonth,
                compare,
              })}
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
                router.push(
                  buildFinanceHref(currentPath, {
                    month: item.value,
                    compare,
                  })
                );
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
        {temporaryMonths.length > 0
          ? ` · 임시 ${temporaryMonths.length}개월`
          : ''}{' '}
        · 현재 {formatFinanceMonthLabel(month)}
      </p>
    </div>
  );
}
