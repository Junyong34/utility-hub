import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import type {
  MonthlyInterestItem,
  DepositCalculationResult,
  InstallmentCalculationResult,
} from '@/lib/tools/savings-calculator';
import { currencyFormatter } from '../constants';
import { DepositResultCard } from './DepositResultCard';
import { InstallmentResultCard } from './InstallmentResultCard';

interface ResultsViewProps {
  result: DepositCalculationResult | InstallmentCalculationResult;
  title: string;
  type: 'deposit' | 'installment';
  amount?: string;
  monthly?: string;
  rate: string;
  interestType: 'simple' | 'compound';
  taxType: 'general' | 'tax-benefit' | 'tax-free';
}

export function ResultsView({
  result,
  title,
  type,
  amount,
  monthly,
  rate,
  interestType,
  taxType,
}: ResultsViewProps) {
  const schedule = useMemo(() => result.schedule || [], [result.schedule]);
  const [yearlyOpen, setYearlyOpen] = useState(false);
  const [monthlyOpen, setMonthlyOpen] = useState(false);

  const yearlyData = useMemo(() => {
    const grouped: Record<number, MonthlyInterestItem[]> = {};
    schedule.forEach((item: MonthlyInterestItem) => {
      if (!grouped[item.year]) {
        grouped[item.year] = [];
      }
      grouped[item.year].push(item);
    });
    return Object.entries(grouped).map(([year, items]) => ({
      year: parseInt(year),
      items,
      yearlyInterest: items.reduce((sum, item) => sum + item.interest, 0),
      yearlyPrincipal: items[items.length - 1]?.principal || 0,
      yearlyBalance: items[items.length - 1]?.balance || 0,
    }));
  }, [schedule]);

  if (!schedule.length) {
    return null;
  }

  return (
    <div className="space-y-6 pb-6">
      {/* 계산 결과 카드 */}
      {type === 'deposit' && amount ? (
        <DepositResultCard
          result={result as DepositCalculationResult}
          amount={amount}
          rate={rate}
          interestType={interestType}
          taxType={taxType}
        />
      ) : type === 'installment' && monthly ? (
        <InstallmentResultCard
          result={result as InstallmentCalculationResult}
          monthly={monthly}
          rate={rate}
          interestType={interestType}
          taxType={taxType}
        />
      ) : null}
      {/* 년도별 적립 현황 */}
      <Collapsible open={yearlyOpen} onOpenChange={setYearlyOpen}>
        <div className="rounded-lg border">
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">년도별 적립 현황</span>
              <span className="text-xs text-muted-foreground">
                ({yearlyData.length}년)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 transition-transform ${yearlyOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 p-4">
              {yearlyData.map(year => (
                <div
                  key={year.year}
                  className="rounded-lg border bg-card p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{year.year}년</p>
                    <p className="text-sm text-muted-foreground">
                      {year.items.length}개월
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">원금</p>
                      <p className="font-semibold">
                        {currencyFormatter.format(year.yearlyPrincipal)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">이자</p>
                      <p className="font-semibold">
                        {currencyFormatter.format(year.yearlyInterest)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">잔액</p>
                      <p className="font-semibold">
                        {currencyFormatter.format(year.yearlyBalance)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* 월별 상세 계획 */}
      <Collapsible open={monthlyOpen} onOpenChange={setMonthlyOpen}>
        <div className="rounded-lg border">
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">월별 적립 계획</span>
              <span className="text-xs text-muted-foreground">
                ({schedule.length}개월)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 transition-transform ${monthlyOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                        월
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        원금
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        이자
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        누적이자
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        잔액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item: MonthlyInterestItem, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2">
                          {item.year}년 {item.month}월
                        </td>
                        <td className="text-right py-2 px-2">
                          {currencyFormatter.format(item.principal)}
                        </td>
                        <td className="text-right py-2 px-2">
                          {currencyFormatter.format(item.interest)}
                        </td>
                        <td className="text-right py-2 px-2">
                          {currencyFormatter.format(item.accumulatedInterest)}
                        </td>
                        <td className="text-right py-2 px-2 font-medium">
                          {currencyFormatter.format(item.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
