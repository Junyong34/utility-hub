import { useMemo, useState, useEffect } from 'react';
import { useQueryStates } from 'nuqs';
import {
  calculateDeposit,
  type InterestType,
  type TaxType,
} from '@/lib/tools/savings-calculator';
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from '@/lib/tools/formatting';
import { DEPOSIT_QUERY_PARSERS } from './parsers';

export function useDepositCalculator() {
  const [queryState, setQueryState] = useQueryStates(DEPOSIT_QUERY_PARSERS, {
    shallow: true,
    history: 'push',
  });

  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const amount = (queryState.amount ?? 0).toString();
  const amountDisplay = useMemo(
    () => formatNumberWithCommas(queryState.amount ?? 0),
    [queryState.amount]
  );
  const rate = (queryState.rate ?? 0).toString();
  const periodMode = queryState.periodMode;
  const period = (queryState.period ?? 0).toString();
  const interestType = queryState.interestType;
  const taxType = queryState.taxType;
  const customTaxRate = (queryState.customTaxRate ?? 9.5).toString();

  const amountValue = queryState.amount ?? 0;
  const rateValue = queryState.rate ?? 0;
  const periodValue = queryState.period ?? 0;
  const customTaxRateValue = queryState.customTaxRate ?? 9.5;

  const canCalculate = useMemo(() => {
    if (!periodMode) return false;
    return amountValue > 0 && rateValue >= 0 && periodValue > 0;
  }, [amountValue, rateValue, periodValue, periodMode]);

  const result = useMemo(() => {
    if (!canCalculate || !periodMode) return null;

    const months =
      periodMode === 'year'
        ? Math.round(periodValue * 12)
        : Math.round(periodValue);

    return calculateDeposit(
      amountValue,
      rateValue,
      months,
      interestType,
      taxType,
      true,
      customTaxRateValue
    );
  }, [canCalculate, amountValue, rateValue, periodValue, periodMode, interestType, taxType, customTaxRateValue]);

  const handlePeriodModeChange = (newMode: 'year' | 'month') => {
    if (newMode === periodMode) return;

    if (periodMode && periodValue > 0) {
      if (newMode === 'month') {
        setQueryState({
          periodMode: newMode,
          period: Math.round(periodValue * 12),
        });
      } else {
        setQueryState({
          periodMode: newMode,
          period: Math.floor(periodValue / 12),
        });
      }
    } else {
      setQueryState({ periodMode: newMode });
    }
  };

  const handleReset = () => {
    setQueryState({
      amount: 0,
      rate: 0,
      period: 0,
      periodMode: undefined,
      interestType: 'simple',
      taxType: 'general',
      customTaxRate: 9.5,
    });
    setShowResults(false);
    setHasCalculated(false);
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setQueryState({ amount: numValue });
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  const addToAmount = (add: number) => {
    const current = amountValue || 0;
    const newValue = Math.min(current + add, 1000000000000);
    setQueryState({ amount: newValue });
  };

  const addToRate = (add: number) => {
    const current = rateValue || 0;
    const newValue = Math.min(Math.max(current + add, 0), 100);
    setQueryState({ rate: Number(newValue.toFixed(2)) });
  };

  const addToPeriod = (add: number) => {
    if (!periodMode) return;

    const current = periodValue || 0;
    if (periodMode === 'year') {
      const newValue = Math.min(Math.max(current + add, 0), 50);
      setQueryState({ period: newValue });
    } else {
      const newValue = Math.min(Math.max(current + add, 0), 600);
      setQueryState({ period: newValue });
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      if (canCalculate && result) {
        setHasCalculated(true);
      }
    }
  }, [canCalculate, result, isInitialized]);

  return {
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
    setRate: (value: string) => setQueryState({ rate: Number(value) || 0 }),
    setPeriod: (value: string) => setQueryState({ period: Number(value) || 0 }),
    setInterestType: (value: InterestType) => setQueryState({ interestType: value }),
    setTaxType: (value: TaxType) => setQueryState({ taxType: value }),
    setCustomTaxRate: (value: string) => setQueryState({ customTaxRate: Number(value) || 0 }),
    setShowResults,
    handlePeriodModeChange,
    handleReset,
    handleAmountChange,
    handleCalculate,
    addToAmount,
    addToRate,
    addToPeriod,
  };
}
