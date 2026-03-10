import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AmountInputField } from '@/components/ui/AmountInputField';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import {
  FormSectionGroup,
  FormFieldGroup,
} from '@/components/ui/FormSectionGroup';
import { DollarSign, Percent, Calendar, ChevronRight } from 'lucide-react';
import type { InterestType, TaxType } from '@/lib/tools/savings-calculator';
import { formatCurrencyToKoreanUnits } from '@/lib/tools/formatting';
import { INTEREST_TYPES, TAX_TYPES } from '../constants';
import { getNumberInput } from '../utils';

interface DepositInputFormProps {
  amount: string;
  amountDisplay: string;
  rate: string;
  periodMode?: 'year' | 'month' | null;
  period: string;
  interestType: InterestType;
  taxType: TaxType;
  customTaxRate: string;
  canCalculate: boolean;
  onAmountChange: (value: string) => void;
  onRateChange: (value: string) => void;
  onPeriodModeChange: (value: 'year' | 'month') => void;
  onPeriodChange: (value: string) => void;
  onInterestTypeChange: (value: InterestType) => void;
  onTaxTypeChange: (value: TaxType) => void;
  onCustomTaxRateChange: (value: string) => void;
  onReset: () => void;
  onCalculate: () => void;
  addToAmount: (amount: number) => void;
  addToRate: (amount: number) => void;
  addToPeriod: (amount: number) => void;
}

export function DepositInputForm({
  amount,
  amountDisplay,
  rate,
  periodMode,
  period,
  interestType,
  taxType,
  customTaxRate,
  canCalculate,
  onAmountChange,
  onRateChange,
  onPeriodModeChange,
  onPeriodChange,
  onInterestTypeChange,
  onTaxTypeChange,
  onCustomTaxRateChange,
  onReset,
  onCalculate,
  addToAmount,
  addToRate,
  addToPeriod,
}: DepositInputFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>예금 정보 입력</CardTitle>
        <CardDescription>
          예치금액, 기간, 이자율을 입력하고 과세 방식을 선택하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 예치금액 */}
        <FormSectionGroup>
          <FormFieldGroup
            label="예치금액"
            icon={<DollarSign className="w-4 h-4" />}
            description="최대 1조원까지 입력 가능합니다"
          >
            <AmountInputField
              id="deposit-amount"
              label=""
              value={amountDisplay}
              onChange={onAmountChange}
              placeholder="예치금액을 입력하세요"
              unitText="원"
              summaryText={
                amount && getNumberInput(amount) > 0
                  ? formatCurrencyToKoreanUnits(getNumberInput(amount))
                  : undefined
              }
              quickActions={[
                {
                  label: '+100만',
                  amount: 1000000,
                  onSelect: () => addToAmount(1000000),
                },
                {
                  label: '+500만',
                  amount: 5000000,
                  onSelect: () => addToAmount(5000000),
                },
                {
                  label: '+1000만',
                  amount: 10000000,
                  onSelect: () => addToAmount(10000000),
                },
                {
                  label: '+1억',
                  amount: 100000000,
                  onSelect: () => addToAmount(100000000),
                },
              ]}
            />
          </FormFieldGroup>
        </FormSectionGroup>

        {/* 연이율 & 예금기간 */}
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
                  id="deposit-rate"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  value={rate}
                  onChange={event => onRateChange(event.target.value)}
                  placeholder="이자율을 입력하세요"
                  step="0.01"
                  className="text-base h-10 max-w-md"
                />
                <span className="text-base font-semibold text-foreground min-w-fit">
                  %
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <QuickActionButton
                  label="+0.1%"
                  onClick={() => addToRate(0.1)}
                />
                <QuickActionButton
                  label="+0.5%"
                  onClick={() => addToRate(0.5)}
                />
                <QuickActionButton label="+1%" onClick={() => addToRate(1)} />
              </div>
            </FormFieldGroup>
          </FormSectionGroup>

          {/* 예금기간 */}
          <FormSectionGroup>
            <FormFieldGroup
              label="예금 기간"
              icon={<Calendar className="w-4 h-4" />}
              description="년 또는 월 단위로 선택"
            >
              <div className="space-y-3">
                <ToggleGroup
                  type="single"
                  value={periodMode ?? undefined}
                  onValueChange={value => {
                    if (value) onPeriodModeChange(value as 'year' | 'month');
                  }}
                  className="justify-start gap-2"
                >
                  <ToggleGroupItem
                    value="year"
                    variant="outline"
                    aria-label="년"
                  >
                    년
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="month"
                    variant="outline"
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
                      max={periodMode === 'year' ? 50 : 600}
                      value={period}
                      onChange={event => onPeriodChange(event.target.value)}
                      placeholder={
                        periodMode
                          ? '예금 기간을 입력하세요'
                          : '년/월 단위를 먼저 선택하세요'
                      }
                      disabled={!periodMode}
                      className="text-base h-10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                  {periodMode ? (
                    <span className="text-base font-semibold text-foreground min-w-fit">
                      {periodMode === 'year' ? '년' : '월'}
                    </span>
                  ) : null}
                </div>
                {periodMode ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {periodMode === 'year' ? (
                      <>
                        <QuickActionButton
                          label="+1년"
                          onClick={() => addToPeriod(1)}
                        />
                        <QuickActionButton
                          label="+3년"
                          onClick={() => addToPeriod(3)}
                        />
                        <QuickActionButton
                          label="+5년"
                          onClick={() => addToPeriod(5)}
                        />
                      </>
                    ) : (
                      <>
                        <QuickActionButton
                          label="+6개월"
                          onClick={() => addToPeriod(6)}
                        />
                        <QuickActionButton
                          label="+12개월"
                          onClick={() => addToPeriod(12)}
                        />
                        <QuickActionButton
                          label="+24개월"
                          onClick={() => addToPeriod(24)}
                        />
                      </>
                    )}
                  </div>
                ) : null}
              </div>
            </FormFieldGroup>
          </FormSectionGroup>
        </div>

        {/* 이자 방식 */}
        <FormSectionGroup>
          <FormFieldGroup
            label="이자 방식"
            description="단리 또는 복리 선택"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTEREST_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() => onInterestTypeChange(type.value)}
                  className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                    interestType === type.value
                      ? 'border-primary bg-primary/8 shadow-sm shadow-primary/20'
                      : 'border-input bg-background hover:border-primary/30 hover:bg-primary/2'
                  }`}
                >
                  <div className="font-semibold text-sm text-foreground">
                    {type.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {type.description}
                  </div>
                  {interestType === type.value && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </FormFieldGroup>
        </FormSectionGroup>

        {/* 과세 방식 */}
        <FormSectionGroup>
          <FormFieldGroup
            label="과세 방식"
            description="일반과세, 세금우대, 비과세 중 선택"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TAX_TYPES.map(tax => (
                <button
                  key={tax.value}
                  onClick={() => onTaxTypeChange(tax.value)}
                  className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                    taxType === tax.value
                      ? 'border-primary bg-primary/8 shadow-sm shadow-primary/20'
                      : 'border-input bg-background hover:border-primary/30 hover:bg-primary/2'
                  }`}
                >
                  <div className="font-semibold text-sm text-foreground">
                    {tax.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tax.description}
                  </div>
                  <div className="text-xs text-primary font-medium mt-1">
                    {tax.rate}
                  </div>
                  {taxType === tax.value && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" />
                  )}
                </button>
              ))}
            </div>

            {/* 세금우대 세율 커스터마이징 */}
            {taxType === 'tax-benefit' && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg border">
                <label
                  htmlFor="custom-tax-rate"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  세금우대 세율
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="custom-tax-rate"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    value={customTaxRate}
                    onChange={event => onCustomTaxRateChange(event.target.value)}
                    placeholder="세율을 입력하세요"
                    step="0.1"
                    className="text-base h-10 max-w-[200px]"
                  />
                  <span className="text-base font-semibold text-foreground min-w-fit">
                    %
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  일반적으로 9.5%가 적용됩니다.
                </p>
              </div>
            )}
          </FormFieldGroup>
        </FormSectionGroup>

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
