'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { AssetsTab } from './AssetsTab';
import { DebtsTab } from './DebtsTab';
import { ExpensesTab } from './ExpensesTab';
import { IncomeTab } from './IncomeTab';
import { InvestmentsTab } from './InvestmentsTab';

interface FinanceInputTabsProps {
  draft: FinanceMonthlySnapshot;
  onChange: (nextDraft: FinanceMonthlySnapshot) => void;
}

export function FinanceInputTabs({ draft, onChange }: FinanceInputTabsProps) {
  return (
    <Tabs defaultValue="income" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
        <TabsTrigger value="income">수입</TabsTrigger>
        <TabsTrigger value="assets">자산</TabsTrigger>
        <TabsTrigger value="debts">부채</TabsTrigger>
        <TabsTrigger value="investments">투자</TabsTrigger>
        <TabsTrigger value="expenses">지출</TabsTrigger>
      </TabsList>

      <TabsContent value="income" className="mt-4">
        <IncomeTab draft={draft} onChange={onChange} />
      </TabsContent>
      <TabsContent value="assets" className="mt-4">
        <AssetsTab draft={draft} onChange={onChange} />
      </TabsContent>
      <TabsContent value="debts" className="mt-4">
        <DebtsTab draft={draft} onChange={onChange} />
      </TabsContent>
      <TabsContent value="investments" className="mt-4">
        <InvestmentsTab draft={draft} onChange={onChange} />
      </TabsContent>
      <TabsContent value="expenses" className="mt-4">
        <ExpensesTab draft={draft} onChange={onChange} />
      </TabsContent>
    </Tabs>
  );
}
