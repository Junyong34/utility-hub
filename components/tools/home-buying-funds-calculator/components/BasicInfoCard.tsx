'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AmountInputField } from '@/components/ui/AmountInputField';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import type { HomeBuyingInput } from '@/lib/tools/home-buying-funds-calculator';
import { FIELD_LABELS, FIELD_TOOLTIPS, QUICK_ACTIONS } from '../constants';
import { ARIA_LABELS } from '../accessibility';
import { DefenseFundInfoDialog } from './DefenseFundInfoDialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateDefenseFundAmount } from '@/lib/tools/home-buying-funds-calculator/taxes';

interface BasicInfoCardProps {
  input: HomeBuyingInput;
  onChange: (updates: Partial<HomeBuyingInput>) => void;
}

export function BasicInfoCard({ input, onChange }: BasicInfoCardProps) {
  const handleAmountChange = (field: keyof HomeBuyingInput, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    onChange({ [field]: numericValue === '' ? 0 : parseInt(numericValue, 10) });
  };

  const handleManualAmountChange = (field: keyof HomeBuyingInput, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue === '') {
      onChange({ [field]: null });
    } else {
      onChange({ [field]: parseInt(numericValue, 10) });
    }
  };

  const handlePercentChange = (field: keyof HomeBuyingInput, value: string) => {
    const numericValue = value.replace(/[^\d.]/g, '');
    onChange({ [field]: numericValue === '' ? 0 : parseFloat(numericValue) });
  };

  // 방공제 금액 계산
  const defenseFundAmount = input.manualDefenseFundAmount ?? calculateDefenseFundAmount(input.regionalType);

  // 실제 대출 가능 금액
  const actualLoanAmount = input.hasDefenseFund ? input.loanAmount - defenseFundAmount : input.loanAmount;

  // 계약금
  const downPayment = Math.floor(input.salePrice * (input.downPaymentRatio / 100));

  // 실제 현금
  const actualCash = input.hasDownPaymentPaid ? input.currentCash + downPayment : input.currentCash;

  return (
    <Card aria-label={ARIA_LABELS.basicInfoCard}>
      <CardHeader>
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 매매가 */}
        <AmountInputField
          id="salePrice"
          label={FIELD_LABELS.salePrice}
          value={input.salePrice.toLocaleString('ko-KR')}
          onChange={value => handleAmountChange('salePrice', value)}
          placeholder="500000000"
          unitText="원"
          tooltipContent={FIELD_TOOLTIPS.salePrice}
          quickActions={QUICK_ACTIONS.salePrice.map(action => ({
            ...action,
            label: action.label,
            onSelect: () => onChange({ salePrice: input.salePrice + action.amount }),
          }))}
        />

        {/* 대출금 */}
        <div className="space-y-2">
          <AmountInputField
            id="loanAmount"
            label={FIELD_LABELS.loanAmount}
            value={input.loanAmount.toLocaleString('ko-KR')}
            onChange={value => handleAmountChange('loanAmount', value)}
            placeholder="350000000"
            unitText="원"
            tooltipContent={FIELD_TOOLTIPS.loanAmount}
            quickActions={QUICK_ACTIONS.loanAmount.map(action => ({
              ...action,
              label: action.label,
              onSelect: () => onChange({ loanAmount: input.loanAmount + action.amount }),
            }))}
          />
          <p className="text-xs text-muted-foreground">
            * 인지세는 대출금액에 따라 자동 계산됩니다 (1천만원~5천만원: 5만원, 5천만원~1억: 10만원, 1억 초과: 15만원)
          </p>

          {/* 방공제 체크박스 */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id="hasDefenseFund"
                checked={input.hasDefenseFund}
                onCheckedChange={checked => onChange({ hasDefenseFund: !!checked })}
              />
              <Label htmlFor="hasDefenseFund" className="cursor-pointer font-normal">
                {FIELD_LABELS.hasDefenseFund}
              </Label>
              <DefenseFundInfoDialog />
            </div>
            <p className="text-xs text-muted-foreground pl-6">
              방공제는 은행이 소액임차인 보호를 위해 대출금에서 차감하는 금액입니다.
              <br />
              체크 해제 시 방공제 없이 대출금 전액을 받을 수 있습니다.
            </p>
          </div>

          {/* 방공제 적용 시 지역 구분 및 입력 필드 */}
          {input.hasDefenseFund && (
            <>
              {/* 지역 구분 */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <Label className="text-sm font-semibold">{FIELD_LABELS.regionalType}</Label>
                  <span className="text-xs text-muted-foreground">(방공제 금액 기준)</span>
                </div>
                <RadioGroup
                  value={input.regionalType}
                  onValueChange={value => onChange({ regionalType: value as 'seoul' | 'overconcentration' | 'metro' | 'other' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seoul" id="regional-seoul-basic" />
                    <Label htmlFor="regional-seoul-basic" className="cursor-pointer font-normal text-sm">
                      서울 (5,500만원)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="overconcentration" id="regional-overconcentration-basic" />
                    <Label htmlFor="regional-overconcentration-basic" className="cursor-pointer font-normal text-sm">
                      과밀억제권역 (5,000만원)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metro" id="regional-metro-basic" />
                    <Label htmlFor="regional-metro-basic" className="cursor-pointer font-normal text-sm">
                      광역시 (2,800만원)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="regional-other-basic" />
                    <Label htmlFor="regional-other-basic" className="cursor-pointer font-normal text-sm">
                      기타 지방 (2,000만원)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <AmountInputField
                id="defenseFundAmount"
                label="방공제 금액"
                value={
                  input.manualDefenseFundAmount !== undefined
                    ? input.manualDefenseFundAmount.toLocaleString('ko-KR')
                    : ''
                }
                onChange={value => handleManualAmountChange('manualDefenseFundAmount', value)}
                placeholder={`지역 기준: ${defenseFundAmount.toLocaleString('ko-KR')}원`}
                unitText="원"
                quickActions={[]}
              />
              <p className="text-sm text-muted-foreground">
                실제 대출 가능 금액: {actualLoanAmount.toLocaleString('ko-KR')}원
                <br />
                <span className="text-xs">
                  (대출금 {input.loanAmount.toLocaleString('ko-KR')}원 - 방공제 {defenseFundAmount.toLocaleString('ko-KR')}원)
                </span>
              </p>
            </>
          )}
        </div>

        {/* 보유 현금 */}
        <div className="space-y-2">
          <AmountInputField
            id="currentCash"
            label={FIELD_LABELS.currentCash}
            value={input.currentCash.toLocaleString('ko-KR')}
            onChange={value => handleAmountChange('currentCash', value)}
            placeholder="150000000"
            unitText="원"
            tooltipContent={FIELD_TOOLTIPS.currentCash}
            quickActions={QUICK_ACTIONS.currentCash.map(action => ({
              ...action,
              label: action.label,
              onSelect: () => onChange({ currentCash: input.currentCash + action.amount }),
            }))}
          />

          {/* 계약금 지불 완료 체크박스 */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="hasDownPaymentPaid"
              checked={input.hasDownPaymentPaid}
              onCheckedChange={checked => onChange({ hasDownPaymentPaid: !!checked })}
            />
            <Label htmlFor="hasDownPaymentPaid" className="cursor-pointer font-normal">
              {FIELD_LABELS.hasDownPaymentPaid}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.hasDownPaymentPaid} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs whitespace-pre-line">{FIELD_TOOLTIPS.hasDownPaymentPaid}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <p className="text-sm text-muted-foreground">
            실제 현금: {actualCash.toLocaleString('ko-KR')}원
            <br />
            <span className="text-xs">
              {input.hasDownPaymentPaid
                ? `(보유 현금 ${input.currentCash.toLocaleString('ko-KR')}원 + 계약금 ${downPayment.toLocaleString('ko-KR')}원)`
                : `(보유 현금 ${input.currentCash.toLocaleString('ko-KR')}원)`
              }
            </span>
          </p>
        </div>

        {/* 계약금 비율 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="downPaymentRatio" className="text-base font-bold">
              {FIELD_LABELS.downPaymentRatio}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.downPaymentRatio} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.downPaymentRatio}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="downPaymentRatio"
              type="text"
              inputMode="decimal"
              value={input.downPaymentRatio.toString()}
              onChange={e => handlePercentChange('downPaymentRatio', e.target.value)}
              placeholder="10"
              className="max-w-[200px]"
              aria-label={ARIA_LABELS.downPaymentRatioInput}
            />
            <span className="text-base font-semibold">%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            계약금: {Math.floor(input.salePrice * (input.downPaymentRatio / 100)).toLocaleString('ko-KR')}원
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
