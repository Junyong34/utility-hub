'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import type { HomeBuyingInput } from '@/lib/tools/home-buying-funds-calculator';
import { FIELD_LABELS, FIELD_TOOLTIPS, HOUSE_COUNT_OPTIONS } from '../constants';
import { ARIA_LABELS } from '../accessibility';
import { StandardPriceInfoDialog } from './StandardPriceInfoDialog';

interface TaxRuleCardProps {
  input: HomeBuyingInput;
  onChange: (updates: Partial<HomeBuyingInput>) => void;
}

export function TaxRuleCard({ input, onChange }: TaxRuleCardProps) {
  const handleAmountChange = (field: keyof HomeBuyingInput, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    onChange({ [field]: numericValue === '' ? 0 : parseInt(numericValue, 10) });
  };

  return (
    <Card aria-label={ARIA_LABELS.taxRuleCard}>
      <CardHeader>
        <CardTitle>세금 및 규제 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 조정대상지역 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="isAdjustedArea" className="text-base font-bold">
              {FIELD_LABELS.isAdjustedArea}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.isAdjustedArea} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.isAdjustedArea}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Toggle
              pressed={!input.isAdjustedArea}
              onPressedChange={() => onChange({ isAdjustedArea: false })}
              aria-label="비조정대상지역"
            >
              비조정
            </Toggle>
            <Toggle
              pressed={input.isAdjustedArea}
              onPressedChange={() => onChange({ isAdjustedArea: true })}
              aria-label="조정대상지역"
            >
              조정지역
            </Toggle>
          </div>
        </div>

        {/* 주택 수 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="houseCount" className="text-base font-bold">
              {FIELD_LABELS.houseCount}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.houseCount} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.houseCount}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={input.houseCount.toString()}
            onValueChange={value => onChange({ houseCount: parseInt(value, 10) })}
          >
            <SelectTrigger className="w-full max-w-[200px]" aria-label={ARIA_LABELS.houseCountSelect}>
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {HOUSE_COUNT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 전용면적 85㎡ 초과 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="isOver85m2" className="text-base font-bold">
              {FIELD_LABELS.isOver85m2}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.isOver85m2} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.isOver85m2}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Toggle
              pressed={!input.isOver85m2}
              onPressedChange={() => onChange({ isOver85m2: false })}
              aria-label="85㎡ 이하"
            >
              85㎡ 이하
            </Toggle>
            <Toggle
              pressed={input.isOver85m2}
              onPressedChange={() => onChange({ isOver85m2: true })}
              aria-label="85㎡ 초과"
            >
              85㎡ 초과
            </Toggle>
          </div>
        </div>

        {/* 생애최초 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="isFirstTime" className="text-base font-bold">
              {FIELD_LABELS.isFirstTime}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.isFirstTime} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.isFirstTime}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Toggle
              pressed={!input.isFirstTime}
              onPressedChange={() => onChange({ isFirstTime: false })}
              aria-label="생애최초 아님"
            >
              아니요
            </Toggle>
            <Toggle
              pressed={input.isFirstTime}
              onPressedChange={() => onChange({ isFirstTime: true })}
              aria-label="생애최초"
            >
              생애최초
            </Toggle>
          </div>
        </div>

        {/* 일시적 2주택 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="isTempTwoHouse" className="text-base font-bold">
              {FIELD_LABELS.isTempTwoHouse}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.isTempTwoHouse} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.isTempTwoHouse}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Toggle
              pressed={!input.isTempTwoHouse}
              onPressedChange={() => onChange({ isTempTwoHouse: false })}
              aria-label="일시적 2주택 아님"
            >
              아니요
            </Toggle>
            <Toggle
              pressed={input.isTempTwoHouse}
              onPressedChange={() => onChange({ isTempTwoHouse: true })}
              aria-label="일시적 2주택"
            >
              예
            </Toggle>
          </div>
        </div>

        {/* 시가표준액 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="standardPrice" className="text-base font-bold">
              {FIELD_LABELS.standardPrice}
            </Label>
            <StandardPriceInfoDialog />
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="standardPrice"
              type="text"
              inputMode="numeric"
              value={input.standardPrice.toLocaleString('ko-KR')}
              onChange={e => handleAmountChange('standardPrice', e.target.value)}
              placeholder="350000000"
              className="max-w-full"
              aria-label={ARIA_LABELS.standardPriceInput}
            />
            <span className="text-base font-semibold min-w-fit">원</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
