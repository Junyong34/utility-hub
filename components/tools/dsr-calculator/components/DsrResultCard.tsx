'use client'

import { AlertTriangle, CheckCircle2, MinusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrencyToKoreanUnits } from '@/lib/tools/formatting'
import type { DsrCalculationResult } from '@/lib/tools/dsr'
import { currencyFormatter } from '../constants'
import { ShareButton } from './ShareButton'

interface DsrResultCardProps {
  result: DsrCalculationResult
}

function getStatusBadge(result: DsrCalculationResult) {
  if (result.stressedDsr < result.regulatoryLimit) {
    return {
      label: '규제 한도 이내',
      icon: CheckCircle2,
      variant: 'default' as const,
    }
  }

  if (result.stressedDsr === result.regulatoryLimit) {
    return {
      label: '규제 한도 근접',
      icon: MinusCircle,
      variant: 'secondary' as const,
    }
  }

  return {
    label: '규제 한도 초과',
    icon: AlertTriangle,
    variant: 'destructive' as const,
  }
}

export function DsrResultCard({ result }: DsrResultCardProps) {
  const status = getStatusBadge(result)
  const StatusIcon = status.icon

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/12 via-primary/8 to-transparent shadow-lg shadow-primary/10">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>DSR 계산 결과</CardTitle>
            <CardDescription>
              현재 금리 기준 DSR과 스트레스 DSR, 가능한 신규 대출 한도를 함께 보여줍니다.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton variant="outline" size="sm" showLabel={false} />
            <Badge variant={status.variant} className="gap-1">
              <StatusIcon className="h-3.5 w-3.5" />
              {status.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-card px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">현재 DSR</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{result.currentDsr}%</p>
          </div>
          <div className="rounded-xl border bg-card px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">스트레스 DSR</p>
            <p className="mt-2 text-3xl font-bold text-primary">{result.stressedDsr}%</p>
          </div>
          <div className="rounded-xl border bg-card px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">은행권 규제 한도</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{result.regulatoryLimit}%</p>
          </div>
          <div className="rounded-xl border bg-card px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">가능한 신규 대출 한도</p>
            <p className="mt-2 text-xl font-bold text-foreground">
              {currencyFormatter.format(result.maxLoanEstimate.maxLoanAmount)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatCurrencyToKoreanUnits(result.maxLoanEstimate.maxLoanAmount)}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3 rounded-xl border bg-card p-4">
            <div>
              <p className="text-sm font-semibold">보유 대출 연간 상환액</p>
              <p className="text-xs text-muted-foreground">
                보유 대출의 연원금 상환액과 연이자 상환액을 자동 계산했습니다.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              {result.existingLoanDebtServices.length === 0 ? (
                <p className="text-muted-foreground">보유 대출이 없으면 0원으로 계산됩니다.</p>
              ) : (
                result.existingLoanDebtServices.map((loan) => (
                  <div key={loan.loanId} className="rounded-lg border border-dashed px-3 py-3">
                    <p className="font-medium text-foreground">{loan.name}</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-muted-foreground">연원금 상환액</p>
                        <p className="font-semibold">{currencyFormatter.format(loan.annualPrincipal)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">연이자 상환액</p>
                        <p className="font-semibold">{currencyFormatter.format(loan.annualInterest)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">연간 원리금 합계</p>
                        <p className="font-semibold">{currencyFormatter.format(loan.totalAnnualDebtService)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-3 rounded-xl border bg-card p-4">
            <div>
              <p className="text-sm font-semibold">신규 대출 시나리오</p>
              <p className="text-xs text-muted-foreground">
                실제 금리 기준과 스트레스 금리 기준의 연간 원리금 차이를 비교합니다.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-dashed px-3 py-3">
                <p className="text-xs text-muted-foreground">현재 금리 기준 연원금 상환액</p>
                <p className="mt-1 font-semibold">
                  {currencyFormatter.format(result.currentNewLoanDebtService.annualPrincipal)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">현재 금리 기준 연이자 상환액</p>
                <p className="mt-1 font-semibold">
                  {currencyFormatter.format(result.currentNewLoanDebtService.annualInterest)}
                </p>
              </div>
              <div className="rounded-lg border border-dashed px-3 py-3">
                <p className="text-xs text-muted-foreground">스트레스 금리 기준 연원금 상환액</p>
                <p className="mt-1 font-semibold">
                  {currencyFormatter.format(result.stressedNewLoanDebtService.annualPrincipal)}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">스트레스 금리 기준 연이자 상환액</p>
                <p className="mt-1 font-semibold">
                  {currencyFormatter.format(result.stressedNewLoanDebtService.annualInterest)}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">적용 스트레스 금리</span>
                <span className="font-semibold">+{result.policy.appliedStressRate}%p</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">적용 사유</span>
                <span className="font-semibold text-right">{result.policy.stressRateReason}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">연간 원리금 여유</span>
                <span className={`font-semibold ${result.remainingCapacity >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {currencyFormatter.format(result.remainingCapacity)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm font-semibold">적용 정책 요약</p>
          <div className="mt-3 grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">정책 버전</span>
              <span className="font-semibold">{result.policy.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">기준 스트레스 금리</span>
              <span className="font-semibold">{result.policy.baseStressRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">단계 반영 비율</span>
              <span className="font-semibold">{Math.round(result.policy.stageFactor * 100)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">금리유형 반영 비율</span>
              <span className="font-semibold">{Math.round(result.policy.rateTypeFactor * 100)}%</span>
            </div>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            {result.policy.notes.map((note) => (
              <li key={note}>- {note}</li>
            ))}
            <li>- 실제 금융회사 심사에서는 상품 약관, 정책모기지 예외, 자행대환 조건 등에 따라 결과가 달라질 수 있습니다.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
