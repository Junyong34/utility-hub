'use client'

import { Calculator, ExternalLink, Info, Plus } from 'lucide-react'
import { AmountInputField } from '@/components/ui/AmountInputField'
import { Button } from '@/components/ui/button'
import { CalculatorCategoryLinks } from '@/components/tools/CalculatorCategoryLinks'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FormFieldGroup,
  FormSectionGroup,
} from '@/components/ui/FormSectionGroup'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TooltipProvider } from '@/components/ui/tooltip'
import { formatCurrencyToKoreanUnits, formatNumberWithCommas, parseFormattedNumber } from '@/lib/tools/formatting'
import { DSR_DEFINITION_REFERENCE, DSR_POLICY_OPTIONS } from './constants'
import { DsrCalculatorFAQ } from './DsrCalculatorFAQ'
import { LoanEditorCard } from './components/LoanEditorCard'
import { DsrResultCard } from './components/DsrResultCard'
import { useDsrCalculator } from './hooks/useDsrCalculator'

export function DsrCalculatorForm() {
  const {
    annualIncome,
    policyVersion,
    existingLoans,
    newLoan,
    hasCalculated,
    canCalculate,
    summary,
    setAnnualIncome,
    setPolicyVersion,
    setNewLoan,
    setHasCalculated,
    addExistingLoan,
    updateExistingLoan,
    removeExistingLoan,
    reset,
  } = useDsrCalculator()
  const selectedPolicy = DSR_POLICY_OPTIONS.find(
    (option) => option.value === policyVersion
  ) ?? DSR_POLICY_OPTIONS[0]

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <div className="space-y-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              DSR이란?
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-foreground/80">
              DSR은 연소득 대비 1년 동안 갚아야 하는 모든 대출 원리금의 비율입니다.
              비율이 높을수록 추가 대출 한도는 더 보수적으로 계산됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              처음 보는 분이라면 공식 정의를 먼저 확인한 뒤 계산기를 사용해 보세요.
            </p>
            <a
              href={DSR_DEFINITION_REFERENCE.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {DSR_DEFINITION_REFERENCE.label}
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>차주 정보 입력</CardTitle>
            <CardDescription>
              연소득과 정책 버전을 정하면 현재 금리 기준 DSR과 스트레스 DSR을 함께 계산합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <FormSectionGroup>
              <AmountInputField
                id="annual-income"
                label="연소득"
                value={formatNumberWithCommas(annualIncome)}
                onChange={(value) => setAnnualIncome(parseFormattedNumber(value))}
                placeholder="연소득을 입력하세요"
                unitText="원"
                summaryText={
                  annualIncome > 0
                    ? formatCurrencyToKoreanUnits(annualIncome)
                    : undefined
                }
                tooltipContent="DSR 계산의 분모가 되는 세전 연소득입니다."
                quickActions={[
                  {
                    label: '+500만',
                    amount: 5_000_000,
                    onSelect: () => setAnnualIncome(annualIncome + 5_000_000),
                  },
                  {
                    label: '+1천만',
                    amount: 10_000_000,
                    onSelect: () => setAnnualIncome(annualIncome + 10_000_000),
                  },
                  {
                    label: '+5천만',
                    amount: 50_000_000,
                    onSelect: () => setAnnualIncome(annualIncome + 50_000_000),
                  },
                ]}
              />
            </FormSectionGroup>

            <div className="grid gap-4 md:grid-cols-2">
              <FormFieldGroup
                label="정책 버전"
                icon={<Calculator className="h-4 w-4" />}
                description="선택한 정책 기준의 요약과 공식 자료를 함께 확인할 수 있습니다."
              >
                <Select
                  value={policyVersion}
                  onValueChange={(value) => setPolicyVersion(value as typeof policyVersion)}
                >
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="정책 버전 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {DSR_POLICY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormFieldGroup>

              <div className="rounded-lg border border-dashed px-4 py-4">
                <p className="text-sm font-semibold text-foreground">
                  {selectedPolicy.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {selectedPolicy.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {selectedPolicy.references.map((reference) => (
                    <a
                      key={reference.href}
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {reference.label}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  실제 심사에서는 금융회사 내부 규정, 정책모기지 예외, 업권별 DSR 방식이 추가로 반영될 수 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">보유 대출</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                대출별 잔액, 금리, 남은 만기, 금리 구조를 입력하면 보유 대출 연원금과 연이자를 자동 계산합니다.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={addExistingLoan}>
              <Plus className="h-4 w-4" />
              보유 대출 추가
            </Button>
          </div>

          {existingLoans.length === 0 ? (
            <div className="rounded-xl border border-dashed px-5 py-6 text-sm text-muted-foreground">
              아직 보유 대출을 추가하지 않았습니다. 대출이 없다면 이 상태로 계산해도 됩니다.
            </div>
          ) : (
            <div className="space-y-4">
              {existingLoans.map((loan, index) => (
                <LoanEditorCard
                  key={loan.id}
                  title={`보유 대출 ${index + 1}`}
                  description="보유 대출의 연원금 상환액과 연이자 상환액을 DSR 기준으로 반영합니다."
                  amountLabel="현재 잔액"
                  loan={loan}
                  onChange={(nextLoan) => updateExistingLoan(loan.id, nextLoan)}
                  onRemove={() => removeExistingLoan(loan.id)}
                  collapsible
                  defaultOpen={index === existingLoans.length - 1}
                />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">신규 대출 시나리오</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              희망 대출 금액을 입력하면 현재 금리 기준 DSR과 스트레스 DSR을 비교하고, 가능한 최대 신규 대출 한도도 함께 계산합니다.
            </p>
          </div>

          <LoanEditorCard
            title="신규 대출"
            description="주담대와 신용대출을 지원합니다. 희망 금액을 0원으로 두면 최대 가능 한도만 참고할 수 있습니다."
            amountLabel="희망 대출 금액"
            loan={newLoan}
            onChange={setNewLoan}
          />
        </section>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            size="lg"
            onClick={() => setHasCalculated(true)}
            disabled={!canCalculate}
          >
            DSR 계산하기
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={reset}>
            입력 초기화
          </Button>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
          입력한 조건을 기준으로 계산한 예상값입니다. 실제 대출 가능 금액과 적용 금리,
          최종 심사 결과는 금융회사 기준에 따라 달라질 수 있으니 최종 한도는 금융사에서
          확인하세요.
        </div>

        {hasCalculated && summary ? <DsrResultCard result={summary} /> : null}

        <CalculatorCategoryLinks currentToolId="dsr-calculator" />

        <DsrCalculatorFAQ />
      </div>
    </TooltipProvider>
  )
}
