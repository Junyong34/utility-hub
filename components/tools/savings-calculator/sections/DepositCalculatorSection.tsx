'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { useDepositCalculator } from '../hooks/useDepositCalculator';
import { DepositInputForm } from '../components/DepositInputForm';
import { DepositResultCard } from '../components/DepositResultCard';
import { ResultsView } from '../components/ResultsView';

export function DepositCalculatorSection() {
  const {
    amount,
    amountDisplay,
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
    handleAmountChange,
    handleCalculate,
    addToAmount,
    addToRate,
    addToPeriod,
  } = useDepositCalculator();

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <section className="space-y-6">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4">
          <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💰 예금(정기예금)이란?
          </h2>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            한 번에 목돈을 예치하고 만기에 원금과 이자를 받는 금융상품입니다. 예치 기간 동안
            자금을 인출하지 않고 고정된 이자율로 이자를 받을 수 있습니다.
          </p>
        </div>

        <DepositInputForm
          amount={amount}
          amountDisplay={amountDisplay}
          rate={rate}
          periodMode={periodMode}
          period={period}
          interestType={interestType}
          taxType={taxType}
          customTaxRate={customTaxRate}
          canCalculate={canCalculate}
          onAmountChange={handleAmountChange}
          onRateChange={setRate}
          onPeriodModeChange={handlePeriodModeChange}
          onPeriodChange={setPeriod}
          onInterestTypeChange={setInterestType}
          onTaxTypeChange={setTaxType}
          onCustomTaxRateChange={setCustomTaxRate}
          onReset={handleReset}
          onCalculate={handleCalculate}
          addToAmount={addToAmount}
          addToRate={addToRate}
          addToPeriod={addToPeriod}
        />

        {hasCalculated && result && (
          <DepositResultCard
            result={result}
            amount={amount}
            rate={rate}
            interestType={interestType}
            taxType={taxType}
          />
        )}

        <BottomSheet
          isOpen={showResults && hasCalculated && !!result}
          onClose={() => setShowResults(false)}
          title="월별 이자 상세"
          maxHeight="90vh"
        >
          {hasCalculated && result && (
            <ResultsView
              result={result}
              title="예금 월별 이자 내역"
              type="deposit"
              amount={amount}
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
