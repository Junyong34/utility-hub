'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
});

function getNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function LoanCalculatorForm() {
  const [principal, setPrincipal] = useState('10000000');
  const [annualRate, setAnnualRate] = useState('4.2');
  const [termYears, setTermYears] = useState('20');

  const result = useMemo(() => {
    const principalValue = getNumberInput(principal);
    const rateValue = getNumberInput(annualRate);
    const yearsValue = getNumberInput(termYears);

    if (
      !Number.isFinite(principalValue) ||
      !Number.isFinite(rateValue) ||
      !Number.isFinite(yearsValue)
    ) {
      return null;
    }

    if (principalValue <= 0 || yearsValue <= 0 || rateValue < 0) {
      return null;
    }

    const months = Math.max(1, Math.round(yearsValue * 12));
    const monthlyRate = rateValue / 100 / 12;

    const monthlyPayment =
      monthlyRate === 0
        ? principalValue / months
        : principalValue *
          (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principalValue;

    return {
      monthlyPayment: Math.max(0, monthlyPayment),
      totalPayment: Math.max(0, totalPayment),
      totalInterest: Math.max(0, totalInterest),
      months,
    };
  }, [annualRate, principal, termYears]);

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>입력</CardTitle>
          <CardDescription>필요한 값만 입력하면 즉시 계산합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="loan-principal">대출 원금(원)</Label>
            <Input
              id="loan-principal"
              type="number"
              inputMode="numeric"
              min={1}
              value={principal}
              onChange={(event) => setPrincipal(event.target.value)}
              placeholder="예: 10000000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-rate">연이율(%)</Label>
            <Input
              id="loan-rate"
              type="number"
              inputMode="decimal"
              min={0}
              value={annualRate}
              onChange={(event) => setAnnualRate(event.target.value)}
              placeholder="예: 4.2"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-years">상환 기간(년)</Label>
            <Input
              id="loan-years"
              type="number"
              inputMode="numeric"
              min={1}
              value={termYears}
              onChange={(event) => setTermYears(event.target.value)}
              placeholder="예: 20"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle>예상 계산 결과</CardTitle>
          <CardDescription>현재 입력값 기준, 원리금균등상환 기준입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">월 상환액</span>
            <strong>{result ? currencyFormatter.format(result.monthlyPayment) : '-'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">상환 개월 수</span>
            <strong>{result ? `${result.months.toLocaleString('ko-KR')} 개월` : '-'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총 상환액</span>
            <strong>{result ? currencyFormatter.format(result.totalPayment) : '-'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총 이자</span>
            <strong>{result ? currencyFormatter.format(result.totalInterest) : '-'}</strong>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
