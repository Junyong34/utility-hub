'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { useInstallmentCalculator } from '../hooks/useInstallmentCalculator';
import { InstallmentInputForm } from '../components/InstallmentInputForm';
import { InstallmentResultCard } from '../components/InstallmentResultCard';
import { ResultsView } from '../components/ResultsView';

export function InstallmentCalculatorSection() {
  const {
    monthly,
    monthlyDisplay,
    rate,
    periodMode,
    period,
    interestType,
    taxType,
    customTaxRate,
    showResults,
    hasCalculated,
    canCalculate,
    result,
    setRate,
    setPeriod,
    setInterestType,
    setTaxType,
    setCustomTaxRate,
    setShowResults,
    handlePeriodModeChange,
    handleReset,
    handleMonthlyChange,
    handleCalculate,
    addToMonthly,
    addToRate,
    addToPeriod,
  } = useInstallmentCalculator();

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <section className="space-y-6">
        <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 p-4">
          <h2 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
            🏦 적금(정기적금)이란?
          </h2>
          <p className="text-sm text-indigo-800 dark:text-indigo-200">
            매월 일정 금액을 납입하여 만기에 모은 원금과 이자를 받는 금융상품입니다. 목돈
            마련을 위해 계획적으로 저축할 수 있으며, 각 납입금에 대해 이자가 계산됩니다.
          </p>
        </div>

        <InstallmentInputForm
          monthly={monthly}
          monthlyDisplay={monthlyDisplay}
          rate={rate}
          periodMode={periodMode}
          period={period}
          interestType={interestType}
          taxType={taxType}
          customTaxRate={customTaxRate}
          canCalculate={canCalculate}
          onMonthlyChange={handleMonthlyChange}
          onRateChange={setRate}
          onPeriodModeChange={handlePeriodModeChange}
          onPeriodChange={setPeriod}
          onInterestTypeChange={setInterestType}
          onTaxTypeChange={setTaxType}
          onCustomTaxRateChange={setCustomTaxRate}
          onReset={handleReset}
          onCalculate={handleCalculate}
          addToMonthly={addToMonthly}
          addToRate={addToRate}
          addToPeriod={addToPeriod}
        />

        {hasCalculated && result && (
          <InstallmentResultCard
            result={result}
            monthly={monthly}
            rate={rate}
            interestType={interestType}
            taxType={taxType}
          />
        )}

        <BottomSheet
          isOpen={showResults && hasCalculated && !!result}
          onClose={() => setShowResults(false)}
          title="월별 적립 상세"
          maxHeight="90vh"
        >
          {hasCalculated && result && (
            <ResultsView
              result={result}
              title="적금 월별 적립 내역"
              type="installment"
              monthly={monthly}
              rate={rate}
              interestType={interestType}
              taxType={taxType}
            />
          )}
        </BottomSheet>
      </section>
    </TooltipProvider>
  );
}
