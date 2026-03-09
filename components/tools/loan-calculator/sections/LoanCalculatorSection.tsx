'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { useLoanCalculator } from '../hooks/useLoanCalculator';
import { LoanInputForm } from '../components/LoanInputForm';
import { LoanResultCard } from '../components/LoanResultCard';
import { ResultsView } from '../components/ResultsView';

export function LoanCalculatorSection() {
  const {
    principal,
    principalDisplay,
    annualRate,
    termMode,
    termValue,
    method,
    showResults,
    hasCalculated,
    canCalculate,
    result,
    setAnnualRate,
    setTermValue,
    setMethod,
    setShowResults,
    handleTermModeChange,
    handleReset,
    handlePrincipalChange,
    handleCalculate,
    addToPrincipal,
    addToRate,
    addToTerm,
  } = useLoanCalculator();

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <section className="space-y-6">
        <LoanInputForm
          principal={principal}
          principalDisplay={principalDisplay}
          annualRate={annualRate}
          termMode={termMode}
          termValue={termValue}
          method={method}
          canCalculate={canCalculate}
          onPrincipalChange={handlePrincipalChange}
          onAnnualRateChange={setAnnualRate}
          onTermModeChange={handleTermModeChange}
          onTermValueChange={setTermValue}
          onMethodChange={setMethod}
          onReset={handleReset}
          onCalculate={handleCalculate}
          addToPrincipal={addToPrincipal}
          addToRate={addToRate}
          addToTerm={addToTerm}
        />

        {hasCalculated && result && (
          <LoanResultCard
            result={result}
            principal={principal}
            annualRate={annualRate}
            method={method}
          />
        )}

        <BottomSheet
          isOpen={showResults && hasCalculated && !!result}
          onClose={() => setShowResults(false)}
          title="상환 계획 상세"
          maxHeight="90vh"
        >
          {hasCalculated && result && (
            <ResultsView
              result={result}
              principal={principal}
              annualRate={annualRate}
              method={method}
            />
          )}
        </BottomSheet>
      </section>
    </TooltipProvider>
  );
}
