'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Minus, Plus, Equal, ChevronDown, ChevronUp } from 'lucide-react';
import NumberTicker from '@/components/magicui/number-ticker';
import { Button } from '@/components/ui/button';

interface LoanBreakdownCardProps {
  salePrice: number;
  loanAmount: number;
  hasDefenseFund: boolean;
  defenseFundAmount: number;
  downPayment: number;
  balance: number;
  totalTaxes: number;
  totalPracticalCosts: number;
  totalOtherCosts: number;
}

export function LoanBreakdownCard({
  salePrice,
  loanAmount,
  hasDefenseFund,
  defenseFundAmount,
  downPayment,
  balance,
  totalTaxes,
  totalPracticalCosts,
  totalOtherCosts,
}: LoanBreakdownCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const actualLoanAmount = hasDefenseFund ? loanAmount - defenseFundAmount : loanAmount;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            자금 구성 한눈에 보기
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8 p-0"
            aria-label={isOpen ? '접기' : '펼치기'}
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-6">
        {/* 매매가 구성 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">💰 매매가 구성</h4>
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            {/* 매매가 */}
            <div className="flex items-center justify-between text-base font-bold">
              <span>매매가</span>
              <span className="tabular-nums">
                <NumberTicker value={salePrice} className="font-bold" />원
              </span>
            </div>

            <div className="h-px bg-border" />

            {/* 계약금 */}
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                계약금
              </span>
              <span className="tabular-nums text-muted-foreground">
                <NumberTicker value={downPayment} className="text-muted-foreground" />원
              </span>
            </div>

            {/* 대출금 */}
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                대출금
              </span>
              <span className="tabular-nums text-muted-foreground">
                <NumberTicker value={loanAmount} className="text-muted-foreground" />원
              </span>
            </div>

            <div className="h-px bg-border" />

            {/* 잔금 */}
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="flex items-center gap-1.5">
                <Equal className="h-3.5 w-3.5" />
                잔금 (현금 필요)
              </span>
              <span className="tabular-nums text-primary">
                <NumberTicker value={balance} className="text-primary" />원
              </span>
            </div>
          </div>
        </div>

        {/* 대출금 구성 (방공제가 있을 경우) */}
        {hasDefenseFund && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">🏦 대출금 구성</h4>
            <div className="space-y-2 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center justify-between text-base font-bold">
                <span>대출 승인액</span>
                <span className="tabular-nums">
                  <NumberTicker value={loanAmount} className="font-bold" />원
                </span>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5">
                  <Minus className="h-3.5 w-3.5 text-destructive" />
                  방공제 (은행 차감)
                </span>
                <span className="tabular-nums text-destructive">
                  <NumberTicker value={defenseFundAmount} className="text-destructive" />원
                </span>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-1.5">
                  <Equal className="h-3.5 w-3.5 text-primary" />
                  실제 받는 금액
                </span>
                <span className="tabular-nums text-primary">
                  <NumberTicker value={actualLoanAmount} className="text-primary" />원
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 부대비용 요약 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">📋 부대비용 요약</h4>
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                세금 합계
              </span>
              <span className="tabular-nums">
                <NumberTicker value={totalTaxes} />원
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                실비용 합계
              </span>
              <span className="tabular-nums">
                <NumberTicker value={totalPracticalCosts} />원
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                기타 비용
              </span>
              <span className="tabular-nums">
                <NumberTicker value={totalOtherCosts} />원
              </span>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="flex items-center gap-1.5">
                <Equal className="h-3.5 w-3.5" />
                부대비용 총액
              </span>
              <span className="tabular-nums text-orange-600 dark:text-orange-400">
                <NumberTicker
                  value={totalTaxes + totalPracticalCosts + totalOtherCosts}
                  className="text-orange-600 dark:text-orange-400"
                />
                원
              </span>
            </div>
          </div>
        </div>

        {/* 최종 필요 현금 */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">💵 필요 현금 계산</h4>
          <div className="space-y-2 rounded-lg bg-primary/5 p-4 border-2 border-primary/20">
            <div className="flex items-center justify-between text-sm">
              <span>계약금 + 잔금</span>
              <span className="tabular-nums">
                <NumberTicker value={downPayment + balance} />원
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                부대비용
              </span>
              <span className="tabular-nums">
                <NumberTicker value={totalTaxes + totalPracticalCosts + totalOtherCosts} />원
              </span>
            </div>

            <div className="h-px bg-primary/20" />

            <div className="flex items-center justify-between text-base font-bold">
              <span className="flex items-center gap-1.5">
                <Equal className="h-4 w-4 text-primary" />
                최소 필요 현금
              </span>
              <span className="tabular-nums text-primary">
                <NumberTicker
                  value={downPayment + balance + totalTaxes + totalPracticalCosts + totalOtherCosts}
                  className="text-primary font-bold"
                />
                원
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      )}
    </Card>
  );
}
