'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';
import {
  BarChart3Icon,
  FileTextIcon,
  LayoutDashboardIcon,
  PencilLineIcon,
  PieChartIcon,
  TrendingUpIcon,
  ReceiptTextIcon,
  WalletCardsIcon,
  type LucideIcon,
} from 'lucide-react';
import type { FinanceComparisonMode } from '@/lib/finance';
import { cn } from '@/lib/utils';
import { buildFinanceHref } from '@/lib/finance';
import {
  getLocalDraftMonths,
  getLocalDraftSnapshot,
  getServerLocalDraftSnapshot,
  subscribeToLocalDraft,
} from './input/localDraft';

interface FinanceSectionNavProps {
  currentPath: string;
  month: string | null;
  compare: FinanceComparisonMode;
}

const SECTION_ITEMS: Array<{
  href: string;
  label: string;
  icon: LucideIcon;
}> = [
  { href: '/finance', label: '대시보드', icon: LayoutDashboardIcon },
  { href: '/finance/input', label: '입력', icon: PencilLineIcon },
  { href: '/finance/assets', label: '자산', icon: WalletCardsIcon },
  { href: '/finance/debts', label: '부채', icon: ReceiptTextIcon },
  { href: '/finance/investments', label: '투자', icon: BarChart3Icon },
  { href: '/finance/expenses', label: '지출', icon: PieChartIcon },
  { href: '/finance/reports', label: '리포트', icon: FileTextIcon },
  { href: '/finance/projection', label: '미래 자산', icon: TrendingUpIcon },
];

export function FinanceSectionNav({
  currentPath,
  month,
  compare,
}: FinanceSectionNavProps) {
  const localDraftRaw = useSyncExternalStore(
    subscribeToLocalDraft,
    getLocalDraftSnapshot,
    getServerLocalDraftSnapshot
  );
  const hasLocalDraft = useMemo(
    () => getLocalDraftMonths(localDraftRaw).length > 0,
    [localDraftRaw]
  );

  const buildSectionHref = (pathname: string) => {
    const baseHref = buildFinanceHref(pathname, { month, compare });

    if (!hasLocalDraft) {
      return baseHref;
    }

    return `${baseHref}${baseHref.includes('?') ? '&' : '?'}local=1`;
  };

  return (
    <nav className="flex flex-wrap gap-x-1 gap-y-1 border-b">
      {SECTION_ITEMS.map(item => {
        const isActive = item.href === currentPath;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={buildSectionHref(item.href)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm transition-colors',
              isActive
                ? 'font-medium text-foreground after:absolute after:inset-x-2 after:bottom-[-1px] after:h-0.5 after:bg-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
