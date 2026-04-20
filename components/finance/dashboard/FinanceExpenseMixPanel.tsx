'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceTrendPoint } from '@/lib/finance/types';
import { formatWon } from './finance-dashboard-formatting';

interface FinanceExpenseMixPanelProps {
  history: FinanceTrendPoint[];
  fixedExpenses: number;
  variableExpenses: number;
  childRelatedExpenses: number;
}

export function FinanceExpenseMixPanel({
  history,
  fixedExpenses,
  variableExpenses,
  childRelatedExpenses,
}: FinanceExpenseMixPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>지출 흐름</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2 text-sm sm:grid-cols-3">
          <p>고정지출 {formatWon(fixedExpenses)}</p>
          <p>변동지출 {formatWon(variableExpenses)}</p>
          <p>자녀지출 {formatWon(childRelatedExpenses)}</p>
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">표시할 지출 흐름이 없습니다.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => `${Math.round(Number(value) / 10000)}만`} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('ko-KR')}원`} />
                <Bar dataKey="fixedExpenses" name="고정지출" fill="#0f766e" />
                <Bar dataKey="variableExpenses" name="변동지출" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
