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

interface FinanceAssetTrendPanelProps {
  history: FinanceTrendPoint[];
}

export function FinanceAssetTrendPanel({ history }: FinanceAssetTrendPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>자산 흐름</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">표시할 자산 흐름이 없습니다.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => `${Math.round(Number(value) / 10000)}만`} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString('ko-KR')}원`} />
                <Line type="monotone" dataKey="totalAssets" name="총자산" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="netWorth" name="순자산" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
