'use client';

import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AmountInputField } from '@/components/ui/AmountInputField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  calculateLoan,
  type RepaymentMethod,
  type MonthlyScheduleItem,
} from '@/lib/tools/loan-calculator';
import {
  calculatePrepaymentFee,
  type PrepaymentFeeResult,
} from '@/lib/tools/prepayment-fee-calculator';
import {
  splitMonths,
  formatCurrencyToKoreanUnits,
  formatNumberWithCommas,
  parseFormattedNumber,
  formatDateToKorean,
} from '@/lib/tools/formatting';
import {
  ChevronRight,
  ChevronDown,
  Percent,
  Calendar,
  Info,
} from 'lucide-react';
import { LoanCalculatorFAQ } from '@/components/tools/LoanCalculatorFAQ';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { type CalendarQuickAction } from '@/components/ui/calendar-date-utils';
import {
  FormSectionGroup,
  FormFieldGroup,
} from '@/components/ui/FormSectionGroup';

const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
});

function getNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

const REPAYMENT_METHODS = [
  {
    value: 'equal-payment',
    label: '원리금균등',
    description: '매월 동일 금액',
  },
  {
    value: 'equal-principal',
    label: '원금균등',
    description: '이자 점차 감소',
  },
  {
    value: 'lump-sum',
    label: '만기일시',
    description: '만기에 원금상환',
  },
];

const PREPAYMENT_DATE_QUICK_ACTIONS: CalendarQuickAction[] = [
  {
    label: '+1주일',
    amount: 1,
    unit: 'week',
  },
  {
    label: '+1개월',
    amount: 1,
    unit: 'month',
  },
];

const PREPAYMENT_DATE_PICKER_PROPS = {
  closeOnSelect: true,
  calendarProps: {
    quickActions: PREPAYMENT_DATE_QUICK_ACTIONS,
    quickActionBase: 'today' as const,
  },
};

interface LoanResultSummaryCardProps {
  result: ReturnType<typeof calculateLoan>;
  principal: string;
  annualRate: string;
  method: RepaymentMethod;
}

function LoanResultSummaryCard({
  result,
  principal,
  annualRate,
  method,
}: LoanResultSummaryCardProps) {
  const { years, months } = splitMonths(result.months);
  const repaymentMethodLabel = REPAYMENT_METHODS.find(
    repaymentMethod => repaymentMethod.value === method
  )?.label;

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/12 via-primary/8 to-transparent shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">📊 계산 결과</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            <span className="font-medium">
              {formatCurrencyToKoreanUnits(getNumberInput(principal))}
            </span>
            을 <span className="font-medium">{years}년</span>
            {months > 0 && <span className="font-medium"> {months}개월</span>}
            동안
            <br />
            <span className="font-medium">{annualRate}%</span>{' '}
            <span className="font-medium text-primary">
              {repaymentMethodLabel}
            </span>
            으로 대출 받았을 때
          </p>
          <p className="text-base font-medium text-foreground">
            매월{' '}
            <span className="text-primary">
              {formatCurrencyToKoreanUnits(result.monthlyPayment)}
            </span>
            을 갚아야합니다.
          </p>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">대출원금</span>
            <span className="font-medium">
              {currencyFormatter.format(getNumberInput(principal))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총대출이자</span>
            <span className="font-medium">
              {currencyFormatter.format(result.totalInterest)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">총상환금액</span>
            <span className="font-medium">
              {currencyFormatter.format(result.totalPayment)}
            </span>
          </div>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="text-center space-y-2 py-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            매월 상환금액
          </p>
          <p className="text-4xl font-bold text-primary">
            {currencyFormatter.format(result.monthlyPayment)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrencyToKoreanUnits(result.monthlyPayment)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface PrepaymentFeeResultSummaryCardProps {
  result: PrepaymentFeeResult;
  repaymentAmount: string;
  feeRate: string;
  repaymentDate?: Date;
}

interface ResultSummaryLabelProps {
  label: string;
  tooltipContent?: string;
}

function ResultSummaryLabel({
  label,
  tooltipContent,
}: ResultSummaryLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{label}</span>
      {tooltipContent ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`${label} 도움말`}
              className="inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-primary/8 text-primary/70 shadow-sm shadow-primary/5 transition-all hover:border-primary/25 hover:bg-primary/12 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              <Info className="h-3 w-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={10}
            className="max-w-[220px] rounded-2xl border-primary/15 bg-gradient-to-br from-background/95 via-background to-primary/10 px-3.5 py-3 text-[12px] text-foreground shadow-xl shadow-primary/10 backdrop-blur-md"
          >
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/70">
                계산 기준
              </p>
              <p className="leading-relaxed text-foreground/90">
                {tooltipContent}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}

function PrepaymentFeeResultSummaryCard({
  result,
  repaymentAmount,
  feeRate,
  repaymentDate,
}: PrepaymentFeeResultSummaryCardProps) {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/12 via-primary/8 to-transparent shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">📊 계산 결과</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            {repaymentDate && (
              <>
                <span className="font-medium">
                  {formatDateToKorean(repaymentDate)}
                </span>
                ,{' '}
              </>
            )}
            <span className="font-medium">
              {formatCurrencyToKoreanUnits(getNumberInput(repaymentAmount))}
            </span>
            을 상환할 경우
          </p>
          <p className="text-base font-medium text-foreground">
            예상되는 중도상환수수료는
            <br />약{' '}
            <span className="text-primary">
              {formatCurrencyToKoreanUnits(result.prepaymentFee)}
            </span>
            입니다
          </p>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">상환금액</span>
            <span className="font-medium">
              {currencyFormatter.format(getNumberInput(repaymentAmount))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">중도상환수수료율</span>
            <span className="font-medium">{feeRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <ResultSummaryLabel
              label="잔존기간"
              tooltipContent="면제시작까지기간-상환기일까지 기간"
            />
            <span className="font-medium">{result.remainingDays}일</span>
          </div>
          <div className="flex justify-between items-center">
            <ResultSummaryLabel
              label="대출기간"
              tooltipContent="면제시작까지기간"
            />
            <span className="font-medium">{result.totalDays}일</span>
          </div>
        </div>

        <div className="border-t border-dashed"></div>

        <div className="text-center space-y-2 py-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            예상 중도상환수수료
          </p>
          <p className="text-4xl font-bold text-primary">
            {currencyFormatter.format(result.prepaymentFee)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatCurrencyToKoreanUnits(result.prepaymentFee)}
          </p>
          <p className="text-xs text-muted-foreground pt-2">
            (상환금액 × 중도상환수수료율 × (잔존기간 / 대출기간))
          </p>
        </div>

        {result.isExempted && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-3 border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              ✓ 면제 기간이 경과하여 수수료가 면제됩니다.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * 대출 계산기 섹션
 */
function LoanCalculatorSection() {
  const [principal, setPrincipal] = useState('0');
  const [principalDisplay, setPrincipalDisplay] = useState('0');
  const [annualRate, setAnnualRate] = useState('');
  const [termMode, setTermMode] = useState<'year' | 'month' | undefined>();
  const [termValue, setTermValue] = useState('');
  const [method, setMethod] = useState<RepaymentMethod>('equal-payment');
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const principalValue = getNumberInput(principal);
  const rateValue = getNumberInput(annualRate);
  const termNumValue = getNumberInput(termValue);

  const canCalculate = useMemo(() => {
    if (!termMode) {
      return false;
    }

    if (
      !Number.isFinite(principalValue) ||
      !Number.isFinite(rateValue) ||
      !Number.isFinite(termNumValue)
    ) {
      return false;
    }

    return principalValue > 0 && rateValue >= 0 && termNumValue > 0;
  }, [principalValue, rateValue, termNumValue, termMode]);

  const result = useMemo(() => {
    if (!canCalculate || !termMode) {
      return null;
    }

    const months =
      termMode === 'year'
        ? Math.round(termNumValue * 12)
        : Math.round(termNumValue);

    return calculateLoan(principalValue, rateValue, months, method, true);
  }, [canCalculate, principalValue, rateValue, termNumValue, termMode, method]);

  const handleTermModeChange = (newMode: 'year' | 'month') => {
    if (newMode === termMode) return;

    const currentValue = getNumberInput(termValue);

    if (termMode && Number.isFinite(currentValue) && currentValue > 0) {
      // 모드 변경 시 자동으로 변환
      if (newMode === 'month') {
        // year to month
        setTermValue(Math.round(currentValue * 12).toString());
      } else {
        // month to year - 버림 처리
        setTermValue(Math.floor(currentValue / 12).toString());
      }
    }

    setTermMode(newMode);
  };

  const handleReset = () => {
    setPrincipal('0');
    setPrincipalDisplay('0');
    setAnnualRate('');
    setTermMode(undefined);
    setTermValue('');
    setMethod('equal-payment');
    setShowResults(false);
    setHasCalculated(false);
  };

  const handlePrincipalChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setPrincipal(numValue.toString());
    setPrincipalDisplay(formatNumberWithCommas(value));
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  // 빠른 입력 헬퍼 함수
  const addToPrincipal = (amount: number) => {
    const current = getNumberInput(principal) || 0;
    const newValue = Math.min(current + amount, 1000000000000);
    setPrincipal(newValue.toString());
    setPrincipalDisplay(formatNumberWithCommas(newValue));
  };

  const addToRate = (amount: number) => {
    const current = getNumberInput(annualRate) || 0;
    const newValue = Math.min(Math.max(current + amount, 0), 100);
    setAnnualRate(newValue.toFixed(2));
  };

  const addToTerm = (amount: number) => {
    if (!termMode) return;

    const current = getNumberInput(termValue) || 0;
    if (termMode === 'year') {
      const newValue = Math.min(Math.max(current + amount, 0), 50);
      setTermValue(newValue.toString());
    } else {
      const newValue = Math.min(Math.max(current + amount, 0), 600);
      setTermValue(newValue.toString());
    }
  };

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <section className="space-y-6">
        {/* 입력 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>대출 정보 입력</CardTitle>
            <CardDescription>
              대출 조건을 입력하면 상환액을 계산해드립니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 대출 원금 - 섹션 그룹화 */}
            <FormSectionGroup>
              <FormFieldGroup
                label="대출 원금"
                icon={<span className="flex w-4 h-4 items-center justify-center text-sm font-bold">₩</span>}
                description="최대 1조원까지 입력 가능합니다"
              >
                <AmountInputField
                  id="loan-principal"
                  label=""
                  value={principalDisplay}
                  onChange={handlePrincipalChange}
                  placeholder="대출 원금을 입력하세요"
                  unitText="원"
                  summaryText={
                    principal && getNumberInput(principal) > 0
                      ? formatCurrencyToKoreanUnits(getNumberInput(principal))
                      : undefined
                  }
                  quickActions={[
                    {
                      label: '+100만',
                      amount: 1000000,
                      onSelect: () => addToPrincipal(1000000),
                    },
                    {
                      label: '+500만',
                      amount: 5000000,
                      onSelect: () => addToPrincipal(5000000),
                    },
                    {
                      label: '+1000만',
                      amount: 10000000,
                      onSelect: () => addToPrincipal(10000000),
                    },
                    {
                      label: '+1억',
                      amount: 100000000,
                      onSelect: () => addToPrincipal(100000000),
                    },
                  ]}
                />
              </FormFieldGroup>
            </FormSectionGroup>

            {/* 연이율 & 상환 기간 - 반응형 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 연이율 */}
              <FormSectionGroup>
                <FormFieldGroup
                  label="연 이자율"
                  icon={<Percent className="w-4 h-4" />}
                  description="0% ~ 100% 범위"
                >
                  <div className="flex gap-2 items-center">
                    <Input
                      id="loan-rate"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      value={annualRate}
                      onChange={event => setAnnualRate(event.target.value)}
                      placeholder="이자율을 입력하세요"
                      step="0.01"
                      className="text-base h-10 max-w-md"
                    />
                    <span className="text-base font-semibold text-foreground min-w-fit">
                      %
                    </span>
                  </div>
                  {/* 빠른 입력 버튼 */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <QuickActionButton
                      label="+0.01%"
                      onClick={() => addToRate(0.01)}
                    />
                    <QuickActionButton
                      label="+0.1%"
                      onClick={() => addToRate(0.1)}
                    />
                    <QuickActionButton
                      label="+1%"
                      onClick={() => addToRate(1)}
                    />
                  </div>
                </FormFieldGroup>
              </FormSectionGroup>

              {/* 상환 기간 (year/month toggle) */}
              <FormSectionGroup>
                <FormFieldGroup
                  label="상환 기간"
                  icon={<Calendar className="w-4 h-4" />}
                  description="년 또는 월 단위로 선택"
                >
                  <div className="space-y-3">
                    <ToggleGroup
                      type="single"
                      value={termMode}
                      onValueChange={value => {
                        if (value)
                          handleTermModeChange(value as 'year' | 'month');
                      }}
                      className="justify-start gap-2"
                    >
                      <ToggleGroupItem
                        value="year"
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                        aria-label="년"
                      >
                        년
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="month"
                        className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                        aria-label="월"
                      >
                        월
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={termMode === 'year' ? 50 : 600}
                          value={termValue}
                          onChange={event => setTermValue(event.target.value)}
                          placeholder={
                            termMode
                              ? '상환 기간을 입력하세요'
                              : '년/월 단위를 먼저 선택하세요'
                          }
                          disabled={!termMode}
                          className="text-base h-10 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                      </div>
                      {termMode ? (
                        <span className="text-base font-semibold text-foreground min-w-fit">
                          {termMode === 'year' ? '년' : '월'}
                        </span>
                      ) : null}
                    </div>
                    {/* 빠른 입력 버튼 - 동적 변경 */}
                    {termMode ? (
                      <>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {termMode === 'year' ? (
                            <>
                              <QuickActionButton
                                label="+1년"
                                onClick={() => addToTerm(1)}
                              />
                              <QuickActionButton
                                label="+5년"
                                onClick={() => addToTerm(5)}
                              />
                              <QuickActionButton
                                label="+10년"
                                onClick={() => addToTerm(10)}
                              />
                            </>
                          ) : (
                            <>
                              <QuickActionButton
                                label="+1개월"
                                onClick={() => addToTerm(1)}
                              />
                              <QuickActionButton
                                label="+6개월"
                                onClick={() => addToTerm(6)}
                              />
                              <QuickActionButton
                                label="+12개월"
                                onClick={() => addToTerm(12)}
                              />
                            </>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground pt-1">
                          {termMode === 'year'
                            ? '⚠️ 월 단위에서 년 변환 시 11개월 이하는 버려집니다'
                            : '💡 년 단위 입력 시 자동으로 월 단위로 변환됩니다'}
                        </div>
                      </>
                    ) : null}
                  </div>
                </FormFieldGroup>
              </FormSectionGroup>
            </div>

            {/* 상환 방법 - 카드 형식 */}
            <FormSectionGroup className="mt-2">
              <FormFieldGroup
                label="상환 방법"
                description="원리금균등, 원금균등, 만기일시 중 선택"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {REPAYMENT_METHODS.map(m => (
                    <button
                      key={m.value}
                      onClick={() => setMethod(m.value as RepaymentMethod)}
                      className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                        method === m.value
                          ? 'border-primary bg-primary/8 shadow-sm shadow-primary/20'
                          : 'border-input bg-background hover:border-primary/30 hover:bg-primary/2'
                      }`}
                    >
                      <div className="font-semibold text-sm text-foreground">
                        {m.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {m.description}
                      </div>
                      {method === m.value && (
                        <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </FormFieldGroup>
            </FormSectionGroup>

            {/* 액션 버튼 */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" onClick={handleReset} className="h-11">
                초기화
              </Button>
              <Button
                onClick={handleCalculate}
                disabled={!canCalculate}
                className="gap-2 h-11"
              >
                계산하기
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 빠른 결과 미리보기 */}
        {hasCalculated && result && (
          <LoanResultSummaryCard
            result={result}
            principal={principal}
            annualRate={annualRate}
            method={method}
          />
        )}

        {/* 결과 Bottom Sheet */}
        <BottomSheet
          isOpen={showResults && hasCalculated && !!result}
          onClose={() => setShowResults(false)}
          title="상환 계획 상세"
          maxHeight="90vh"
        >
          {hasCalculated && result && (
            <ResultsView
              result={result}
              principal={principal}
              annualRate={annualRate}
              method={method}
            />
          )}
        </BottomSheet>
      </section>
    </TooltipProvider>
  );
}

/**
 * 계산 결과 상세 뷰 (Bottom Sheet에서 표시)
 */
function ResultsView({
  result,
  principal,
  annualRate,
  method,
}: {
  result: ReturnType<typeof calculateLoan>;
  principal: string;
  annualRate: string;
  method: RepaymentMethod;
}) {
  const schedule = useMemo(() => result.schedule || [], [result.schedule]);
  const [yearlyOpen, setYearlyOpen] = useState(false);
  const [monthlyOpen, setMonthlyOpen] = useState(false);

  // 년도별 그룹화
  const yearlyData = useMemo(() => {
    const grouped: Record<number, MonthlyScheduleItem[]> = {};
    schedule.forEach((item: MonthlyScheduleItem) => {
      if (!grouped[item.year]) {
        grouped[item.year] = [];
      }
      grouped[item.year].push(item);
    });
    return Object.entries(grouped).map(([year, items]) => ({
      year: parseInt(year),
      items,
      yearlyPayment: items.reduce((sum, item) => sum + item.monthlyPayment, 0),
      yearlyPrincipal: items.reduce((sum, item) => sum + item.principal, 0),
      yearlyInterest: items.reduce((sum, item) => sum + item.interest, 0),
    }));
  }, [schedule]);

  return (
    <div className="space-y-6 pb-6">
      <LoanResultSummaryCard
        result={result}
        principal={principal}
        annualRate={annualRate}
        method={method}
      />

      {/* 년도별 상환 현황 - Collapsible */}
      <Collapsible open={yearlyOpen} onOpenChange={setYearlyOpen}>
        <div className="rounded-lg border">
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">년도별 상환 현황</span>
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
                      <p className="text-muted-foreground">납부액</p>
                      <p className="font-semibold">
                        {currencyFormatter.format(year.yearlyPayment)}
                      </p>
                    </div>
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
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* 월별 상세 계획 - Collapsible */}
      <Collapsible open={monthlyOpen} onOpenChange={setMonthlyOpen}>
        <div className="rounded-lg border">
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">월별 상환 계획</span>
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
                        상환액
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        원금
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        이자
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-muted-foreground">
                        잔액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item: MonthlyScheduleItem, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2">
                          {item.year}년 {item.month}월
                        </td>
                        <td className="text-right py-2 px-2">
                          {currencyFormatter.format(item.monthlyPayment)}
                        </td>
                        <td className="text-right py-2 px-2">
                          {currencyFormatter.format(item.principal)}
                        </td>
                        <td className="text-right py-2 px-2">
                          {currencyFormatter.format(item.interest)}
                        </td>
                        <td className="text-right py-2 px-2 font-medium">
                          {currencyFormatter.format(item.remainingBalance)}
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

/**
 * 중도상환수수료 계산기 섹션
 */
function PrepaymentFeeCalculatorSection() {
  const [repaymentAmount, setRepaymentAmount] = useState('0');
  const [repaymentAmountDisplay, setRepaymentAmountDisplay] = useState('0');
  const [feeRate, setFeeRate] = useState('');
  const [loanDate, setLoanDate] = useState<Date | undefined>();
  const [repaymentDate, setRepaymentDate] = useState<Date | undefined>();
  const [maturityDate, setMaturityDate] = useState<Date | undefined>();
  const [exemptionYears, setExemptionYears] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const repaymentAmountValue = getNumberInput(repaymentAmount);
  const feeRateValue = getNumberInput(feeRate);
  const exemptionYearsValue = getNumberInput(exemptionYears);

  const canCalculate = useMemo(() => {
    if (
      !Number.isFinite(repaymentAmountValue) ||
      !Number.isFinite(feeRateValue) ||
      !Number.isFinite(exemptionYearsValue)
    ) {
      return false;
    }

    if (!loanDate || !repaymentDate || !maturityDate) {
      return false;
    }

    return (
      repaymentAmountValue > 0 && feeRateValue >= 0 && exemptionYearsValue >= 0
    );
  }, [
    repaymentAmountValue,
    feeRateValue,
    exemptionYearsValue,
    loanDate,
    repaymentDate,
    maturityDate,
  ]);

  // 빠른 입력 헬퍼 함수
  const addToRepaymentAmount = (amount: number) => {
    const current = getNumberInput(repaymentAmount) || 0;
    const newValue = Math.min(current + amount, 1000000000000);
    setRepaymentAmount(newValue.toString());
    setRepaymentAmountDisplay(formatNumberWithCommas(newValue));
  };

  const handleRepaymentAmountChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setRepaymentAmount(numValue.toString());
    setRepaymentAmountDisplay(formatNumberWithCommas(value));
  };

  const addToFeeRate = (amount: number) => {
    const current = getNumberInput(feeRate) || 0;
    const newValue = Math.min(Math.max(current + amount, 0), 100);
    setFeeRate(newValue.toFixed(2));
  };

  const addToExemptionYears = (years: number) => {
    const current = getNumberInput(exemptionYears) || 0;
    const newValue = Math.min(current + years, 50);
    setExemptionYears(newValue.toString());
  };

  const result = useMemo(() => {
    if (!canCalculate || !loanDate || !repaymentDate || !maturityDate) {
      return null;
    }

    return calculatePrepaymentFee(
      repaymentAmountValue,
      feeRateValue,
      loanDate,
      repaymentDate,
      maturityDate,
      exemptionYearsValue
    );
  }, [
    canCalculate,
    repaymentAmountValue,
    feeRateValue,
    loanDate,
    repaymentDate,
    maturityDate,
    exemptionYearsValue,
  ]);

  const handleReset = () => {
    setRepaymentAmount('0');
    setRepaymentAmountDisplay('0');
    setFeeRate('');
    setLoanDate(undefined);
    setRepaymentDate(undefined);
    setMaturityDate(undefined);
    setExemptionYears('');
    setShowResults(false);
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>중도상환 정보 입력</CardTitle>
            <CardDescription>
              대출과 상환 관련 정보를 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 중도 상환 금액 - 섹션 그룹화 */}
            <FormSectionGroup>
              <FormFieldGroup
                label="중도 상환 금액"
                icon={<span className="flex w-4 h-4 items-center justify-center text-sm font-bold">₩</span>}
                description="최대 1조원까지 입력 가능합니다"
              >
                <AmountInputField
                  id="repayment-amount"
                  label=""
                  value={repaymentAmountDisplay}
                  onChange={handleRepaymentAmountChange}
                  placeholder="상환 금액을 입력하세요"
                  unitText="원"
                  summaryText={
                    repaymentAmount && getNumberInput(repaymentAmount) > 0
                      ? formatCurrencyToKoreanUnits(
                          getNumberInput(repaymentAmount)
                        )
                      : undefined
                  }
                  quickActions={[
                    {
                      label: '+100만',
                      amount: 1000000,
                      onSelect: () => addToRepaymentAmount(1000000),
                    },
                    {
                      label: '+500만',
                      amount: 5000000,
                      onSelect: () => addToRepaymentAmount(5000000),
                    },
                    {
                      label: '+1000만',
                      amount: 10000000,
                      onSelect: () => addToRepaymentAmount(10000000),
                    },
                  ]}
                />
              </FormFieldGroup>
            </FormSectionGroup>

            {/* 수수료율 & 면제기간 - 반응형 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 수수료율 */}
              <FormSectionGroup>
                <FormFieldGroup
                  label="수수료율"
                  icon={<Percent className="w-4 h-4" />}
                  description="대출계약서에 명시된 비율"
                >
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                      <Input
                        id="fee-rate"
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={100}
                        value={feeRate}
                        onChange={event => setFeeRate(event.target.value)}
                        placeholder="수수료율을 입력하세요"
                        step="0.01"
                        className="text-base h-10"
                      />
                      <span className="text-base font-semibold text-foreground min-w-fit">
                        %
                      </span>
                    </div>
                    {/* 빠른 입력 버튼 */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <QuickActionButton
                        label="+0.1%"
                        onClick={() => addToFeeRate(0.1)}
                      />
                      <QuickActionButton
                        label="+0.5%"
                        onClick={() => addToFeeRate(0.5)}
                      />
                      <QuickActionButton
                        label="+1%"
                        onClick={() => addToFeeRate(1)}
                      />
                    </div>
                  </div>
                </FormFieldGroup>
              </FormSectionGroup>

              {/* 면제기간 */}
              <FormSectionGroup>
                <FormFieldGroup
                  label="면제기간"
                  icon={<Calendar className="w-4 h-4" />}
                  description="이 기간 후 수수료 자동 면제"
                >
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                      <Input
                        id="exemption-years"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={50}
                        value={exemptionYears}
                        onChange={event =>
                          setExemptionYears(event.target.value)
                        }
                        placeholder="면제기간을 입력하세요"
                        className="text-base h-10 max-w-md"
                      />
                      <span className="text-base font-semibold text-foreground min-w-fit">
                        년
                      </span>
                    </div>
                    {/* 빠른 입력 버튼 */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <QuickActionButton
                        label="+1년"
                        onClick={() => addToExemptionYears(1)}
                      />
                      <QuickActionButton
                        label="+3년"
                        onClick={() => addToExemptionYears(3)}
                      />
                      <QuickActionButton
                        label="+5년"
                        onClick={() => addToExemptionYears(5)}
                      />
                    </div>
                  </div>
                </FormFieldGroup>
              </FormSectionGroup>
            </div>

            {/* 날짜 필드 - 반응형 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FormSectionGroup>
                <FormFieldGroup
                  label="대출일자"
                  icon={<Calendar className="w-4 h-4" />}
                  description="대출 실행 날짜"
                >
                  <DatePicker
                    date={loanDate}
                    onDateChange={setLoanDate}
                    placeholder="대출일자 선택"
                    {...PREPAYMENT_DATE_PICKER_PROPS}
                  />
                </FormFieldGroup>
              </FormSectionGroup>

              <FormSectionGroup>
                <FormFieldGroup
                  label="상환일자"
                  icon={<Calendar className="w-4 h-4" />}
                  description="중도상환 예정 날짜"
                >
                  <DatePicker
                    date={repaymentDate}
                    onDateChange={setRepaymentDate}
                    placeholder="상환일자 선택"
                    {...PREPAYMENT_DATE_PICKER_PROPS}
                  />
                </FormFieldGroup>
              </FormSectionGroup>

              <FormSectionGroup>
                <FormFieldGroup
                  label="만기일자"
                  icon={<Calendar className="w-4 h-4" />}
                  description="대출 계약서 만기일"
                >
                  <DatePicker
                    date={maturityDate}
                    onDateChange={setMaturityDate}
                    placeholder="만기일자 선택"
                    {...PREPAYMENT_DATE_PICKER_PROPS}
                  />
                </FormFieldGroup>
              </FormSectionGroup>
            </div>

            {/* 액션 버튼 */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" onClick={handleReset} className="h-11">
                초기화
              </Button>
              <Button
                onClick={handleCalculate}
                disabled={!canCalculate}
                className="gap-2 h-11"
              >
                계산하기
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {hasCalculated && result && (
          <PrepaymentFeeResultSummaryCard
            result={result}
            repaymentAmount={repaymentAmount}
            feeRate={feeRate}
            repaymentDate={repaymentDate}
          />
        )}

        <BottomSheet
          isOpen={showResults && hasCalculated && !!result}
          onClose={() => setShowResults(false)}
          title="중도상환 수수료 결과"
          maxHeight="80vh"
        >
          {hasCalculated && result && (
            <div className="space-y-6 pb-6">
              <PrepaymentFeeResultSummaryCard
                result={result}
                repaymentAmount={repaymentAmount}
                feeRate={feeRate}
                repaymentDate={repaymentDate}
              />
            </div>
          )}
        </BottomSheet>
      </section>
    </TooltipProvider>
  );
}

/**
 * 대출 계산기 폼 - 메인 컴포넌트
 */
export function LoanCalculatorForm() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="loan-calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="loan-calculator">대출 계산기</TabsTrigger>
          <TabsTrigger value="prepayment-fee">중도상환 수수료</TabsTrigger>
        </TabsList>

        <TabsContent value="loan-calculator" className="space-y-6">
          <LoanCalculatorSection />
        </TabsContent>

        <TabsContent value="prepayment-fee" className="space-y-6">
          <PrepaymentFeeCalculatorSection />
        </TabsContent>
      </Tabs>

      {/* FAQ 섹션 */}
      <LoanCalculatorFAQ />
    </div>
  );
}
