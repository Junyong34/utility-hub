import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AmountInputField } from '@/components/ui/AmountInputField';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { type CalendarQuickAction } from '@/components/ui/calendar-date-utils';
import {
  FormSectionGroup,
  FormFieldGroup,
} from '@/components/ui/FormSectionGroup';
import { Percent, Calendar, ChevronRight } from 'lucide-react';
import { formatCurrencyToKoreanUnits } from '@/lib/tools/formatting';
import { getNumberInput } from '../utils';

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

interface PrepaymentInputFormProps {
  repaymentAmount: string;
  repaymentAmountDisplay: string;
  feeRate: string;
  loanDate?: Date;
  repaymentDate?: Date;
  maturityDate?: Date;
  exemptionYears: string;
  canCalculate: boolean;
  onRepaymentAmountChange: (value: string) => void;
  onFeeRateChange: (value: string) => void;
  onLoanDateChange: (date?: Date) => void;
  onRepaymentDateChange: (date?: Date) => void;
  onMaturityDateChange: (date?: Date) => void;
  onExemptionYearsChange: (value: string) => void;
  onReset: () => void;
  onCalculate: () => void;
  addToRepaymentAmount: (amount: number) => void;
  addToFeeRate: (amount: number) => void;
  addToExemptionYears: (years: number) => void;
}

export function PrepaymentInputForm({
  repaymentAmount,
  repaymentAmountDisplay,
  feeRate,
  loanDate,
  repaymentDate,
  maturityDate,
  exemptionYears,
  canCalculate,
  onRepaymentAmountChange,
  onFeeRateChange,
  onLoanDateChange,
  onRepaymentDateChange,
  onMaturityDateChange,
  onExemptionYearsChange,
  onReset,
  onCalculate,
  addToRepaymentAmount,
  addToFeeRate,
  addToExemptionYears,
}: PrepaymentInputFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>중도상환 정보 입력</CardTitle>
        <CardDescription>
          대출과 상환 관련 정보를 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 중도 상환 금액 */}
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
              onChange={onRepaymentAmountChange}
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

        {/* 수수료율 & 면제기간 */}
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
                    onChange={event => onFeeRateChange(event.target.value)}
                    placeholder="수수료율을 입력하세요"
                    step="0.01"
                    className="text-base h-10"
                  />
                  <span className="text-base font-semibold text-foreground min-w-fit">
                    %
                  </span>
                </div>
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
                    onChange={event => onExemptionYearsChange(event.target.value)}
                    placeholder="면제기간을 입력하세요"
                    className="text-base h-10 max-w-md"
                  />
                  <span className="text-base font-semibold text-foreground min-w-fit">
                    년
                  </span>
                </div>
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

        {/* 날짜 필드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormSectionGroup>
            <FormFieldGroup
              label="대출일자"
              icon={<Calendar className="w-4 h-4" />}
              description="대출 실행 날짜"
            >
              <DatePicker
                date={loanDate}
                onDateChange={onLoanDateChange}
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
                onDateChange={onRepaymentDateChange}
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
                onDateChange={onMaturityDateChange}
                placeholder="만기일자 선택"
                {...PREPAYMENT_DATE_PICKER_PROPS}
              />
            </FormFieldGroup>
          </FormSectionGroup>
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="outline" onClick={onReset} className="h-11">
            초기화
          </Button>
          <Button
            onClick={onCalculate}
            disabled={!canCalculate}
            className="gap-2 h-11"
          >
            계산하기
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
