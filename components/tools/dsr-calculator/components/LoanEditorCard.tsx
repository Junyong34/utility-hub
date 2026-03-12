'use client'

import { useState } from 'react'
import {
  Building2,
  CalendarRange,
  ChevronDown,
  ChevronUp,
  Percent,
  Trash2,
} from 'lucide-react'
import { AmountInputField } from '@/components/ui/AmountInputField'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  FormFieldGroup,
  FormSectionGroup,
} from '@/components/ui/FormSectionGroup'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrencyToKoreanUnits, formatNumberWithCommas, parseFormattedNumber } from '@/lib/tools/formatting'
import type { DsrLoanInput, DsrLoanType, DsrRateType, DsrRegionType } from '@/lib/tools/dsr'
import type { RepaymentMethod } from '@/lib/tools/loan-calculator'
import {
  LOAN_TYPE_OPTIONS,
  RATE_TYPE_OPTIONS,
  REGION_TYPE_OPTIONS,
  REPAYMENT_METHOD_OPTIONS,
} from '../constants'

interface LoanEditorCardProps {
  title: string
  description: string
  amountLabel: string
  loan: DsrLoanInput
  onChange: (loan: DsrLoanInput) => void
  onRemove?: () => void
  collapsible?: boolean
  defaultOpen?: boolean
}

export function LoanEditorCard({
  title,
  description,
  amountLabel,
  loan,
  onChange,
  onRemove,
  collapsible = false,
  defaultOpen = true,
}: LoanEditorCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const amountDisplay = formatNumberWithCommas(loan.balance)
  const loanTypeLabel =
    LOAN_TYPE_OPTIONS.find((option) => option.value === loan.loanType)?.label ??
    '대출'
  const regionLabel =
    loan.loanType === 'mortgage'
      ? REGION_TYPE_OPTIONS.find((option) => option.value === loan.regionType)
          ?.label ?? '수도권·규제지역'
      : '지역 무관'
  const summaryText = [
    loanTypeLabel,
    loan.balance > 0 ? formatCurrencyToKoreanUnits(loan.balance) : '잔액 미입력',
    `${loan.annualRate}%`,
    `${loan.termMonths}개월`,
    regionLabel,
  ].join(' · ')

  const handleLoanTypeChange = (value: DsrLoanType) => {
    onChange({
      ...loan,
      loanType: value,
      regionType:
        value === 'credit'
          ? 'none'
          : loan.regionType === 'none'
            ? 'capital'
            : loan.regionType,
    })
  }

  const handleRateTypeChange = (value: DsrRateType) => {
    onChange({
      ...loan,
      rateType: value,
      introductoryPeriodMonths:
        value === 'mixed' || value === 'periodic'
          ? loan.introductoryPeriodMonths ?? 60
          : undefined,
    })
  }

  const formContent = (
    <CardContent className="space-y-5 pt-4">
      <FormSectionGroup>
        <AmountInputField
          id={`${loan.id}-balance`}
          label={amountLabel}
          value={amountDisplay}
          onChange={(value) =>
            onChange({
              ...loan,
              balance: parseFormattedNumber(value),
            })
          }
          placeholder="금액을 입력하세요"
          unitText="원"
          summaryText={
            loan.balance > 0
              ? formatCurrencyToKoreanUnits(loan.balance)
              : undefined
          }
          quickActions={[
            {
              label: '+1천만',
              amount: 10_000_000,
              onSelect: () =>
                onChange({ ...loan, balance: loan.balance + 10_000_000 }),
            },
            {
              label: '+5천만',
              amount: 50_000_000,
              onSelect: () =>
                onChange({ ...loan, balance: loan.balance + 50_000_000 }),
            },
            {
              label: '+1억',
              amount: 100_000_000,
              onSelect: () =>
                onChange({ ...loan, balance: loan.balance + 100_000_000 }),
            },
          ]}
        />
      </FormSectionGroup>

      <div className="grid gap-4 md:grid-cols-2">
        <FormFieldGroup label="대출 유형" icon={<Building2 className="h-4 w-4" />}>
          <Select
            value={loan.loanType}
            onValueChange={(value) => handleLoanTypeChange(value as DsrLoanType)}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="대출 유형 선택" />
            </SelectTrigger>
            <SelectContent>
              {LOAN_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldGroup>

        <FormFieldGroup label="상환 방식" icon={<CalendarRange className="h-4 w-4" />}>
          <Select
            value={loan.repaymentMethod}
            onValueChange={(value) =>
              onChange({ ...loan, repaymentMethod: value as RepaymentMethod })
            }
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="상환 방식 선택" />
            </SelectTrigger>
            <SelectContent>
              {REPAYMENT_METHOD_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormFieldGroup label="실제 금리" icon={<Percent className="h-4 w-4" />}>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step="0.01"
              value={loan.annualRate}
              onChange={(event) =>
                onChange({
                  ...loan,
                  annualRate: Number(event.target.value) || 0,
                })
              }
              className="h-10"
            />
            <span className="text-sm font-semibold">%</span>
          </div>
        </FormFieldGroup>

        <FormFieldGroup
          label="남은 만기"
          icon={<CalendarRange className="h-4 w-4" />}
          description="개월 기준으로 입력합니다."
        >
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              min={1}
              max={600}
              value={loan.termMonths}
              onChange={(event) =>
                onChange({
                  ...loan,
                  termMonths: Number(event.target.value) || 0,
                })
              }
              className="h-10 min-w-0"
            />
            <span className="min-w-10 shrink-0 whitespace-nowrap text-sm font-semibold">
              개월
            </span>
          </div>
        </FormFieldGroup>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormFieldGroup label="금리 구조">
          <Select
            value={loan.rateType}
            onValueChange={(value) => handleRateTypeChange(value as DsrRateType)}
          >
            <SelectTrigger className="h-10 w-full">
              <SelectValue placeholder="금리 구조 선택" />
            </SelectTrigger>
            <SelectContent>
              {RATE_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldGroup>

        {loan.loanType === 'mortgage' ? (
          <FormFieldGroup
            label="담보 지역"
            description="수도권·규제지역은 더 보수적인 스트레스 금리를, 지방은 일정 기간 2단계 기준을 적용할 수 있습니다."
          >
            <Select
              value={loan.regionType === 'none' ? 'capital' : loan.regionType}
              onValueChange={(value) =>
                onChange({
                  ...loan,
                  regionType: value as DsrRegionType,
                })
              }
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="담보 지역 선택" />
              </SelectTrigger>
              <SelectContent>
                {REGION_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldGroup>
        ) : (
          <div className="rounded-lg border border-dashed px-3 py-3 text-sm text-muted-foreground">
            신용대출은 지역 구분 없이 신용대출 합산 잔액 기준으로 스트레스 DSR을 판단합니다.
          </div>
        )}
      </div>

      {loan.rateType === 'mixed' || loan.rateType === 'periodic' ? (
        <div className="space-y-2">
          <Label htmlFor={`${loan.id}-introductory-period`} className="text-sm font-semibold">
            {loan.rateType === 'mixed' ? '고정금리 적용기간' : '금리 변동주기'}
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id={`${loan.id}-introductory-period`}
              type="number"
              inputMode="numeric"
              min={1}
              max={loan.termMonths || 600}
              value={loan.introductoryPeriodMonths ?? 60}
              onChange={(event) =>
                onChange({
                  ...loan,
                  introductoryPeriodMonths: Number(event.target.value) || 0,
                })
              }
              className="h-10 min-w-0"
            />
            <span className="min-w-10 shrink-0 whitespace-nowrap text-sm font-semibold">
              개월
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            금리유형별 스트레스 DSR 비율은 이 기간이 전체 만기에서 차지하는 비중으로 계산합니다.
          </p>
        </div>
      ) : null}
    </CardContent>
  )

  if (!collapsible) {
    return (
      <Card size="sm">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            {onRemove ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onRemove}
                aria-label={`${title} 삭제`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </CardHeader>
        {formContent}
      </Card>
    )
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card size="sm">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-3">
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex min-w-0 flex-1 items-start justify-between gap-3 text-left"
              >
                <div className="min-w-0">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {summaryText}
                  </p>
                </div>
                <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground">
                  {open ? '접기' : '펼치기'}
                  {open ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </span>
              </button>
            </CollapsibleTrigger>
            {onRemove ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onRemove}
                aria-label={`${title} 삭제`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CollapsibleContent>{formContent}</CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
