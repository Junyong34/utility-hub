'use client';

import type { HomeBuyingInput } from '@/lib/tools/home-buying-funds-calculator';
import { BasicInfoCard } from '../components/BasicInfoCard';
import { TaxRuleCard } from '../components/TaxRuleCard';
import { PracticalCostCard } from '../components/PracticalCostCard';
import { AdvancedOptionsCard } from '../components/AdvancedOptionsCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface HomeBuyingInputSectionProps {
  input: HomeBuyingInput;
  onChange: (updates: Partial<HomeBuyingInput>) => void;
}

export function HomeBuyingInputSection({ input, onChange }: HomeBuyingInputSectionProps) {
  const [isPracticalOpen, setIsPracticalOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* 기본 정보 - 항상 표시 */}
      <BasicInfoCard input={input} onChange={onChange} />

      {/* 세금/규제 정보 - 항상 표시 */}
      <TaxRuleCard input={input} onChange={onChange} />

      {/* 실무 비용 - 접을 수 있음 */}
      <Collapsible open={isPracticalOpen} onOpenChange={setIsPracticalOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            type="button"
          >
            <span className="font-semibold">실무 비용 (선택사항)</span>
            {isPracticalOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <PracticalCostCard input={input} onChange={onChange} />
        </CollapsibleContent>
      </Collapsible>

      {/* 고급 옵션 - 접을 수 있음 */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            type="button"
          >
            <span className="font-semibold">고급 옵션</span>
            {isAdvancedOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <AdvancedOptionsCard input={input} onChange={onChange} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
