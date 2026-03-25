'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { useHomeBuyingFundsCalculator } from './hooks/useHomeBuyingFundsCalculator';
import { HomeBuyingInputSection } from './sections/HomeBuyingInputSection';
import { HomeBuyingResultSection } from './sections/HomeBuyingResultSection';
import { HomeBuyingFundsCalculatorFAQ } from './HomeBuyingFundsCalculatorFAQ';

export function HomeBuyingFundsCalculatorForm() {
  const { input, result, setState, reset } = useHomeBuyingFundsCalculator();

  const handleChange = (updates: Partial<typeof input>) => {
    setState(updates);
  };

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <div className="space-y-8">
        {/* 2열 레이아웃: 데스크톱에서 좌측 입력, 우측 결과 */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* 입력 섹션 */}
          <div className="lg:col-span-5">
            <HomeBuyingInputSection input={input} onChange={handleChange} onReset={reset} />
          </div>

          {/* 결과 섹션 */}
          <div className="lg:col-span-7">
            <HomeBuyingResultSection result={result} currentCash={input.currentCash} input={input} />
          </div>
        </div>

        {/* FAQ */}
        <HomeBuyingFundsCalculatorFAQ />
      </div>
    </TooltipProvider>
  );
}
