import { useMemo, useState, useEffect } from 'react';
import { useQueryStates } from 'nuqs';
import {
  calculateInstallment,
  type InterestType,
  type TaxType,
} from '@/lib/tools/savings-calculator';
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from '@/lib/tools/formatting';
import { INSTALLMENT_QUERY_PARSERS } from './parsers';

export function useInstallmentCalculator() {
  const [queryState, setQueryState] = useQueryStates(INSTALLMENT_QUERY_PARSERS, {
    shallow: true,
    history: 'push',
  });

  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const monthly = (queryState.monthly ?? 0).toString();
  const monthlyDisplay = useMemo(
    () => formatNumberWithCommas(queryState.monthly ?? 0),
    [queryState.monthly]
  );
  const rate = (queryState.rate ?? 0).toString();
  const periodMode = queryState.periodMode;
  const period = (queryState.period ?? 0).toString();
  const interestType = queryState.interestType;
  const taxType = queryState.taxType;
  const customTaxRate = (queryState.customTaxRate ?? 9.5).toString();

  const monthlyValue = queryState.monthly ?? 0;
  const rateValue = queryState.rate ?? 0;
  const periodValue = queryState.period ?? 0;
  const customTaxRateValue = queryState.customTaxRate ?? 9.5;

  const canCalculate = useMemo(() => {
    if (!periodMode) return false;
    return monthlyValue > 0 && rateValue >= 0 && periodValue > 0;
  }, [monthlyValue, rateValue, periodValue, periodMode]);

  const result = useMemo(() => {
    if (!canCalculate || !periodMode) return null;

    const months =
      periodMode === 'year'
        ? Math.round(periodValue * 12)
        : Math.round(periodValue);

    return calculateInstallment(
      monthlyValue,
      rateValue,
      months,
      interestType,
      taxType,
      true,
      customTaxRateValue
    );
  }, [canCalculate, monthlyValue, rateValue, periodValue, periodMode, interestType, taxType, customTaxRateValue]);

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
      monthly: 0,
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

  const handleMonthlyChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setQueryState({ monthly: numValue });
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  const addToMonthly = (add: number) => {
    const current = monthlyValue || 0;
    const newValue = Math.min(current + add, 100000000);
    setQueryState({ monthly: newValue });
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
    setRate: (value: string) => setQueryState({ rate: Number(value) || 0 }),
    setPeriod: (value: string) => setQueryState({ period: Number(value) || 0 }),
    setInterestType: (value: InterestType) => setQueryState({ interestType: value }),
    setTaxType: (value: TaxType) => setQueryState({ taxType: value }),
    setCustomTaxRate: (value: string) => setQueryState({ customTaxRate: Number(value) || 0 }),
    setShowResults,
    handlePeriodModeChange,
    handleReset,
    handleMonthlyChange,
    handleCalculate,
    addToMonthly,
    addToRate,
    addToPeriod,
  };
}
