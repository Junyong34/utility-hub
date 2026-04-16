'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MovingBudgetAssetId, MovingBudgetAssets } from '@/lib/tools/moving-budget-checklist';
import {
  MOVING_BUDGET_ASSET_FIELDS,
  formatAmountInputValue,
  parseAmountInput,
} from '../constants';

interface AssetsSectionCardProps {
  assets: MovingBudgetAssets;
  onChange: (assetId: MovingBudgetAssetId, value: number) => void;
}

export function AssetsSectionCard({ assets, onChange }: AssetsSectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>내 자산</CardTitle>
        <CardDescription>이사에 투입할 총자금을 입력합니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOVING_BUDGET_ASSET_FIELDS.map((field) => (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor={field.id}>{field.label}</Label>
              <span className="text-xs text-muted-foreground">{field.description}</span>
            </div>
            <Input
              id={field.id}
              aria-label={field.label}
              inputMode="numeric"
              value={formatAmountInputValue(assets[field.id])}
              onChange={(event) => onChange(field.id, parseAmountInput(event.target.value))}
              placeholder="0"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
