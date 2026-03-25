'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import type { HomeBuyingInput } from '@/lib/tools/home-buying-funds-calculator';
import { FIELD_LABELS, FIELD_TOOLTIPS } from '../constants';
import { ARIA_LABELS } from '../accessibility';

interface AdvancedOptionsCardProps {
  input: HomeBuyingInput;
  onChange: (updates: Partial<HomeBuyingInput>) => void;
}

export function AdvancedOptionsCard({ input, onChange }: AdvancedOptionsCardProps) {
  const handlePercentChange = (field: keyof HomeBuyingInput, value: string) => {
    const numericValue = value.replace(/[^\d.]/g, '');
    onChange({ [field]: numericValue === '' ? 0 : parseFloat(numericValue) });
  };

  return (
    <Card aria-label={ARIA_LABELS.advancedOptionsCard}>
      <CardHeader>
        <CardTitle>고급 옵션</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 예비비 비율 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="contingencyRatio" className="text-base font-bold">
              {FIELD_LABELS.contingencyRatio}
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${FIELD_LABELS.contingencyRatio} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{FIELD_TOOLTIPS.contingencyRatio}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="contingencyRatio"
              type="text"
              inputMode="decimal"
              value={input.contingencyRatio.toString()}
              onChange={e => handlePercentChange('contingencyRatio', e.target.value)}
              placeholder="5"
              className="max-w-[200px]"
              aria-label={ARIA_LABELS.contingencyRatioInput}
            />
            <span className="text-base font-semibold">%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            예상치 못한 비용에 대비한 예비비입니다. 3~10% 권장합니다.
            <br />
            * 예비비는 부대비용(세금 + 실비용)을 기준으로 계산되며, 계약금과 잔금은 제외됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
