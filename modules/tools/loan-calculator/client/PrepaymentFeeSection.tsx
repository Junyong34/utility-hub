'use client';

import { TooltipProvider } from '@/shared/ui/tooltip';
import { BottomSheet } from '@/shared/client/bottom-sheet';
import { PrepaymentFeeResultCard, PrepaymentInputForm } from '../ui.ts';
import { ShareButton } from './ShareButton.tsx';
import { usePrepaymentCalculator } from './usePrepaymentCalculator.ts';

export function PrepaymentFeeSection() {
  const {
    repaymentAmount,
    repaymentAmountDisplay,
    feeRate,
    loanDate,
    repaymentDate,
    maturityDate,
    exemptionYears,
    showResults,
    hasCalculated,
    canCalculate,
    result,
    setFeeRate,
    setLoanDate,
    setRepaymentDate,
    setMaturityDate,
    setExemptionYears,
    setShowResults,
    handleRepaymentAmountChange,
    handleReset,
    handleCalculate,
    addToRepaymentAmount,
    addToFeeRate,
    addToExemptionYears,
  } = usePrepaymentCalculator();

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <section className="space-y-6">
        <PrepaymentInputForm
          repaymentAmount={repaymentAmount}
          repaymentAmountDisplay={repaymentAmountDisplay}
          feeRate={feeRate}
          loanDate={loanDate}
          repaymentDate={repaymentDate}
          maturityDate={maturityDate}
          exemptionYears={exemptionYears}
          canCalculate={canCalculate}
          onRepaymentAmountChange={handleRepaymentAmountChange}
          onFeeRateChange={setFeeRate}
          onLoanDateChange={setLoanDate}
          onRepaymentDateChange={setRepaymentDate}
          onMaturityDateChange={setMaturityDate}
          onExemptionYearsChange={setExemptionYears}
          onReset={handleReset}
          onCalculate={handleCalculate}
          addToRepaymentAmount={addToRepaymentAmount}
          addToFeeRate={addToFeeRate}
          addToExemptionYears={addToExemptionYears}
        />

        {hasCalculated && result && (
          <PrepaymentFeeResultCard
            result={result}
            repaymentAmount={repaymentAmount}
            feeRate={feeRate}
            repaymentDate={repaymentDate}
            action={
              <ShareButton variant="outline" size="sm" showLabel={false} />
            }
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
              <PrepaymentFeeResultCard
                result={result}
                repaymentAmount={repaymentAmount}
                feeRate={feeRate}
                repaymentDate={repaymentDate}
                action={
                  <ShareButton variant="outline" size="sm" showLabel={false} />
                }
              />
            </div>
          )}
        </BottomSheet>
      </section>
    </TooltipProvider>
  );
}
