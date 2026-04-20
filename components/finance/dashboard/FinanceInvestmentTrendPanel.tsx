'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinanceTrendPoint } from '@/lib/finance/types';
import { formatWon } from './finance-dashboard-formatting';

interface FinanceInvestmentTrendPanelProps {
  history: FinanceTrendPoint[];
  investmentValuation: number;
}

export function FinanceInvestmentTrendPanel({
  history,
  investmentValuation,
}: FinanceInvestmentTrendPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>투자 흐름</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          현재 평가금액 {formatWon(investmentValuation)}
        </p>
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">표시할 투자 흐름이 없습니다.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => `${Math.round(Number(value) / 10000)}만`} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('ko-KR')}원`} />
                <Line type="monotone" dataKey="totalInvestmentValuation" name="투자 평가금액" stroke="#7c3aed" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
