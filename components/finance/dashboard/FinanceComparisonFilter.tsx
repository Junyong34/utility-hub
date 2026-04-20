'use client';

import Link from 'next/link';
import type { FinanceComparisonMode } from '@/lib/finance/types';
import { buildFinanceHref } from '@/lib/finance/url-state';
import { cn } from '@/lib/utils';

interface FinanceComparisonFilterProps {
  month: string | null;
  compare: FinanceComparisonMode;
}

const OPTIONS: Array<{ value: FinanceComparisonMode; label: string }> = [
  { value: 'half', label: '반기' },
  { value: 'year', label: '연도' },
  { value: 'all', label: '전체 통계' },
];

export function FinanceComparisonFilter({
  month,
  compare,
}: FinanceComparisonFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((option) => {
        const active = option.value === compare;

        return (
          <Link
            key={option.value}
            href={buildFinanceHref('/finance', {
              month,
              compare: option.value,
            })}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm transition-colors',
              active
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
