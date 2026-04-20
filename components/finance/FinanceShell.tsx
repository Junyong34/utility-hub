import { ReactNode } from 'react';
import type { FinanceComparisonMode } from '@/lib/finance';
import { FinanceMonthSwitcher } from './FinanceMonthSwitcher';
import { FinanceSectionNav } from './FinanceSectionNav';

interface FinanceShellProps {
  title: string;
  description: string;
  currentPath: string;
  availableMonths: string[];
  month: string | null;
  compare?: FinanceComparisonMode;
  children: ReactNode;
}

export function FinanceShell({
  title,
  description,
  currentPath,
  availableMonths,
  month,
  compare = 'half',
  children,
}: FinanceShellProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          개인용 비공개 재무 워크스페이스
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
      </section>

      <section className="grid gap-4 rounded-lg border bg-card p-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            화면
          </p>
          <FinanceSectionNav
            currentPath={currentPath}
            month={month}
            compare={compare}
          />
        </div>
        <div className="space-y-2 lg:border-l lg:pl-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            기준월
          </p>
          <FinanceMonthSwitcher
            currentPath={currentPath}
            availableMonths={availableMonths}
            month={month}
            compare={compare}
          />
        </div>
      </section>

      {children}
    </main>
  );
}
