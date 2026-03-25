'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { HomeBuyingInput } from '@/lib/tools/home-buying-funds-calculator';
import {
  MANUAL_COST_QUICK_ADD_AMOUNTS,
  applyManualCostIncrement,
} from '@/lib/tools/home-buying-funds-calculator/practical-cost-inputs';
import { FIELD_LABELS, PRESET_LABELS } from '../constants';
import { ARIA_LABELS } from '../accessibility';

interface PracticalCostCardProps {
  input: HomeBuyingInput;
  onChange: (updates: Partial<HomeBuyingInput>) => void;
}

type ManualCostField =
  | 'manualBrokerageFee'
  | 'manualLawyerFee'
  | 'manualCleaningFee'
  | 'manualMovingFee'
  | 'manualInteriorFee'
  | 'manualManagementDeposit';

interface ManualCostInputProps {
  field: ManualCostField;
  id: string;
  onAmountChange: (field: ManualCostField, value: string) => void;
  onQuickAdd: (field: ManualCostField, amount: number) => void;
  value: number | undefined;
}

function ManualCostInput({
  field,
  id,
  onAmountChange,
  onQuickAdd,
  value,
}: ManualCostInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          value={(value ?? 0).toLocaleString('ko-KR')}
          onChange={e => onAmountChange(field, e.target.value)}
          placeholder="0"
          className="max-w-full"
        />
        <span className="text-base font-semibold min-w-fit">원</span>
      </div>
      <div className="-mx-1 overflow-x-auto px-1">
        <div className="flex min-w-max items-center gap-2 whitespace-nowrap pb-1">
          {MANUAL_COST_QUICK_ADD_AMOUNTS.map(amount => (
            <Button
              key={`${field}-${amount}`}
              type="button"
              variant="outline"
              size="xs"
              onClick={() => onQuickAdd(field, amount)}
              className="shrink-0 rounded-full px-3"
            >
              +{(amount / 10_000).toLocaleString('ko-KR')}만
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PracticalCostCard({ input, onChange }: PracticalCostCardProps) {
  const handleAmountChange = (field: ManualCostField, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    onChange({ [field]: numericValue === '' ? 0 : parseInt(numericValue, 10) });
  };

  const handleQuickAdd = (field: ManualCostField, amount: number) => {
    const currentValue = input[field];
    onChange({
      [field]: applyManualCostIncrement(
        typeof currentValue === 'number' ? currentValue : undefined,
        amount,
      ),
    });
  };

  return (
    <Card aria-label={ARIA_LABELS.practicalCostCard}>
      <CardHeader>
        <CardTitle>실무 비용</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 중개보수 */}
        <div className="space-y-2">
          <Label htmlFor="brokerageFeePreset" className="text-base font-bold">
            {FIELD_LABELS.brokerageFee}
          </Label>
          <Select
            value={input.brokerageFeePreset}
            onValueChange={value => {
              const updates: Partial<HomeBuyingInput> = { brokerageFeePreset: value as 'auto' | 'manual' };
              if (value === 'manual' && input.manualBrokerageFee === undefined) {
                updates.manualBrokerageFee = 0;
              }
              onChange(updates);
            }}
          >
            <SelectTrigger className="w-full max-w-[200px]" aria-label={ARIA_LABELS.brokerageFeePresetSelect}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">{PRESET_LABELS.brokerageFee.auto}</SelectItem>
              <SelectItem value="manual">{PRESET_LABELS.brokerageFee.manual}</SelectItem>
            </SelectContent>
          </Select>
          {input.brokerageFeePreset === 'manual' && (
            <ManualCostInput
              field="manualBrokerageFee"
              id="manualBrokerageFee"
              value={input.manualBrokerageFee}
              onAmountChange={handleAmountChange}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </div>

        {/* 법무사 비용 */}
        <div className="space-y-2">
          <Label htmlFor="lawyerFeePreset" className="text-base font-bold">
            {FIELD_LABELS.lawyerFee}
          </Label>
          <Select
            value={input.lawyerFeePreset}
            onValueChange={value => {
              const updates: Partial<HomeBuyingInput> = { lawyerFeePreset: value as 'auto' | 'manual' };
              if (value === 'manual' && input.manualLawyerFee === undefined) {
                updates.manualLawyerFee = 0;
              }
              onChange(updates);
            }}
          >
            <SelectTrigger className="w-full max-w-[200px]" aria-label={ARIA_LABELS.lawyerFeePresetSelect}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">{PRESET_LABELS.lawyerFee.auto}</SelectItem>
              <SelectItem value="manual">{PRESET_LABELS.lawyerFee.manual}</SelectItem>
            </SelectContent>
          </Select>
          {input.lawyerFeePreset === 'manual' && (
            <ManualCostInput
              field="manualLawyerFee"
              id="manualLawyerFee"
              value={input.manualLawyerFee}
              onAmountChange={handleAmountChange}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </div>

        {/* 청소 비용 */}
        <div className="space-y-2">
          <Label htmlFor="cleaningFeePreset" className="text-base font-bold">
            {FIELD_LABELS.cleaningFee}
          </Label>
          <Select
            value={input.cleaningFeePreset}
            onValueChange={value => {
              const updates: Partial<HomeBuyingInput> = { cleaningFeePreset: value as 'none' | 'basic' | 'premium' | 'manual' };
              if (value === 'manual' && input.manualCleaningFee === undefined) {
                updates.manualCleaningFee = 0;
              }
              onChange(updates);
            }}
          >
            <SelectTrigger className="w-full max-w-[200px]" aria-label={ARIA_LABELS.cleaningFeePresetSelect}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{PRESET_LABELS.cleaningFee.none}</SelectItem>
              <SelectItem value="basic">{PRESET_LABELS.cleaningFee.basic}</SelectItem>
              <SelectItem value="premium">{PRESET_LABELS.cleaningFee.premium}</SelectItem>
              <SelectItem value="manual">{PRESET_LABELS.cleaningFee.manual}</SelectItem>
            </SelectContent>
          </Select>
          {input.cleaningFeePreset === 'manual' && (
            <ManualCostInput
              field="manualCleaningFee"
              id="manualCleaningFee"
              value={input.manualCleaningFee}
              onAmountChange={handleAmountChange}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </div>

        {/* 이사 비용 */}
        <div className="space-y-2">
          <Label htmlFor="movingFeePreset" className="text-base font-bold">
            {FIELD_LABELS.movingFee}
          </Label>
          <Select
            value={input.movingFeePreset}
            onValueChange={value => {
              const updates: Partial<HomeBuyingInput> = {
                movingFeePreset: value as 'small' | 'medium' | 'large' | 'manual',
              };
              if (value === 'manual' && input.manualMovingFee === undefined) {
                updates.manualMovingFee = 0;
              }
              onChange(updates);
            }}
          >
            <SelectTrigger className="w-full max-w-[200px]" aria-label={ARIA_LABELS.movingFeePresetSelect}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{PRESET_LABELS.movingFee.small}</SelectItem>
              <SelectItem value="medium">{PRESET_LABELS.movingFee.medium}</SelectItem>
              <SelectItem value="large">{PRESET_LABELS.movingFee.large}</SelectItem>
              <SelectItem value="manual">{PRESET_LABELS.movingFee.manual}</SelectItem>
            </SelectContent>
          </Select>
          {input.movingFeePreset === 'manual' && (
            <ManualCostInput
              field="manualMovingFee"
              id="manualMovingFee"
              value={input.manualMovingFee}
              onAmountChange={handleAmountChange}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </div>

        {/* 인테리어 비용 */}
        <div className="space-y-2">
          <Label htmlFor="interiorFeePreset" className="text-base font-bold">
            {FIELD_LABELS.interiorFee}
          </Label>
          <Select
            value={input.interiorFeePreset}
            onValueChange={value => {
              const updates: Partial<HomeBuyingInput> = { interiorFeePreset: value as 'none' | 'basic' | 'standard' | 'premium' | 'manual' };
              if (value === 'manual' && input.manualInteriorFee === undefined) {
                updates.manualInteriorFee = 0;
              }
              onChange(updates);
            }}
          >
            <SelectTrigger className="w-full max-w-[200px]" aria-label={ARIA_LABELS.interiorFeePresetSelect}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{PRESET_LABELS.interiorFee.none}</SelectItem>
              <SelectItem value="basic">{PRESET_LABELS.interiorFee.basic}</SelectItem>
              <SelectItem value="standard">{PRESET_LABELS.interiorFee.standard}</SelectItem>
              <SelectItem value="premium">{PRESET_LABELS.interiorFee.premium}</SelectItem>
              <SelectItem value="manual">{PRESET_LABELS.interiorFee.manual}</SelectItem>
            </SelectContent>
          </Select>
          {input.interiorFeePreset === 'manual' && (
            <ManualCostInput
              field="manualInteriorFee"
              id="manualInteriorFee"
              value={input.manualInteriorFee}
              onAmountChange={handleAmountChange}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </div>

        {/* 관리비예치금 */}
        <div className="space-y-2">
          <Label htmlFor="manualManagementDeposit" className="text-base font-bold">
            {FIELD_LABELS.managementDeposit}
          </Label>
          <ManualCostInput
            field="manualManagementDeposit"
            id="manualManagementDeposit"
            value={input.manualManagementDeposit}
            onAmountChange={handleAmountChange}
            onQuickAdd={handleQuickAdd}
          />
          <p className="text-xs text-muted-foreground">기본 30만원, 단지마다 다를 수 있습니다</p>
        </div>
      </CardContent>
    </Card>
  );
}
