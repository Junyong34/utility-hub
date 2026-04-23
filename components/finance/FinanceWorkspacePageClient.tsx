'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  buildFinanceDashboardSummary,
  buildFinanceReportsSummary,
  resolveFinanceMonth,
} from '@/lib/finance';
import type {
  FinanceComparisonMode,
  FinanceMonthlySnapshot,
} from '@/lib/finance/types';
import {
  getLocalDraftSnapshot,
  getServerLocalDraftSnapshot,
  parseStoredLocalDraft,
  subscribeToLocalDraft,
} from './input/localDraft';
import { FinanceShell } from './FinanceShell';
import { AssetsDetailSection } from './detail/AssetsDetailSection';
import { DebtsDetailSection } from './detail/DebtsDetailSection';
import { ExpensesAnalysisSection } from './detail/ExpensesAnalysisSection';
import { InvestmentsDetailSection } from './detail/InvestmentsDetailSection';
import { ProjectionSection } from './detail/ProjectionSection';
import { ReportsSection } from './detail/ReportsSection';
import { FinanceDashboardClient } from './dashboard/FinanceDashboardClient';

type FinanceWorkspaceView =
  | 'dashboard'
  | 'assets'
  | 'debts'
  | 'investments'
  | 'expenses'
  | 'reports'
  | 'projection';

interface FinanceWorkspacePageClientProps {
  view: FinanceWorkspaceView;
  title: string;
  description: string;
  currentPath: string;
  fallbackSnapshots: FinanceMonthlySnapshot[];
  requestedMonth: string | null;
  compare: FinanceComparisonMode;
}

function useFinanceSnapshotsSource(
  fallbackSnapshots: FinanceMonthlySnapshot[]
): FinanceMonthlySnapshot[] {
  const localDraftRaw = useSyncExternalStore(
    subscribeToLocalDraft,
    getLocalDraftSnapshot,
    getServerLocalDraftSnapshot
  );
  const localSnapshots = useMemo(
    () => parseStoredLocalDraft(localDraftRaw),
    [localDraftRaw]
  );

  return localSnapshots.length > 0 ? localSnapshots : fallbackSnapshots;
}

export function FinanceWorkspacePageClient({
  view,
  title,
  description,
  currentPath,
  fallbackSnapshots,
  requestedMonth,
  compare,
}: FinanceWorkspacePageClientProps) {
  const snapshots = useFinanceSnapshotsSource(fallbackSnapshots);
  const dashboard = useMemo(
    () => buildFinanceDashboardSummary(snapshots, requestedMonth, compare),
    [compare, requestedMonth, snapshots]
  );
  const availableMonths = useMemo(
    () =>
      snapshots
        .map(snapshot => snapshot.month)
        .sort((left, right) => left.localeCompare(right)),
    [snapshots]
  );
  const reportsMonth = useMemo(
    () => resolveFinanceMonth(availableMonths, requestedMonth),
    [availableMonths, requestedMonth]
  );
  const reports = useMemo(
    () => buildFinanceReportsSummary(snapshots),
    [snapshots]
  );

  if (view === 'reports') {
    return (
      <FinanceShell
        title={title}
        description={description}
        currentPath={currentPath}
        availableMonths={availableMonths}
        month={reportsMonth}
        compare={compare}
      >
        <ReportsSection reports={reports} />
      </FinanceShell>
    );
  }

  return (
    <FinanceShell
      title={title}
      description={description}
      currentPath={currentPath}
      availableMonths={dashboard.availableMonths}
      month={dashboard.effectiveMonth}
      compare={compare}
    >
      {view === 'dashboard' ? (
        <FinanceDashboardClient dashboard={dashboard} compare={compare} />
      ) : null}
      {view === 'assets' ? (
        <AssetsDetailSection summary={dashboard.current} />
      ) : null}
      {view === 'debts' ? (
        <DebtsDetailSection summary={dashboard.current} />
      ) : null}
      {view === 'investments' ? (
        <InvestmentsDetailSection summary={dashboard.current} />
      ) : null}
      {view === 'expenses' ? (
        <ExpensesAnalysisSection summary={dashboard.current} />
      ) : null}
      {view === 'projection' ? (
        <ProjectionSection
          key={dashboard.current?.month ?? 'empty'}
          summary={dashboard.current}
        />
      ) : null}
    </FinanceShell>
  );
}
