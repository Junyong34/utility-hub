import { useMemo, useState, useEffect } from 'react';
import { useQueryStates } from 'nuqs';
import {
  calculatePrepaymentFee,
  type PrepaymentFeeResult,
} from '@/lib/tools/prepayment-fee-calculator';
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from '@/lib/tools/formatting';
import { getNumberInput } from '../utils';
import { PREPAYMENT_QUERY_PARSERS } from './parsers';

export function usePrepaymentCalculator() {
  // URL 쿼리 상태 (공유 가능한 상태)
  const [queryState, setQueryState] = useQueryStates(
    PREPAYMENT_QUERY_PARSERS,
    {
      shallow: true,
      history: 'push',
    }
  );

  // 로컬 UI 상태 (URL에 저장하지 않음)
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // URL 상태에서 파생된 값
  const repaymentAmount = (queryState.amount ?? 0).toString();
  const repaymentAmountDisplay = useMemo(
    () => formatNumberWithCommas(queryState.amount ?? 0),
    [queryState.amount]
  );
  const feeRate = (queryState.feeRate ?? 0).toString();
  const loanDate = queryState.loanDate ?? undefined;
  const repaymentDate = queryState.repaymentDate ?? undefined;
  const maturityDate = queryState.maturityDate ?? undefined;
  const exemptionYears = (queryState.exemptionYears ?? 0).toString();

  const repaymentAmountValue = queryState.amount ?? 0;
  const feeRateValue = queryState.feeRate ?? 0;
  const exemptionYearsValue = queryState.exemptionYears ?? 0;

  const canCalculate = useMemo(() => {
    if (
      !Number.isFinite(repaymentAmountValue) ||
      !Number.isFinite(feeRateValue) ||
      !Number.isFinite(exemptionYearsValue)
    ) {
      return false;
    }

    if (!loanDate || !repaymentDate || !maturityDate) {
      return false;
    }

    return (
      repaymentAmountValue > 0 && feeRateValue >= 0 && exemptionYearsValue >= 0
    );
  }, [
    repaymentAmountValue,
    feeRateValue,
    exemptionYearsValue,
    loanDate,
    repaymentDate,
    maturityDate,
  ]);

  const result = useMemo(() => {
    if (!canCalculate || !loanDate || !repaymentDate || !maturityDate) {
      return null;
    }

    return calculatePrepaymentFee(
      repaymentAmountValue,
      feeRateValue,
      loanDate,
      repaymentDate,
      maturityDate,
      exemptionYearsValue
    );
  }, [
    canCalculate,
    repaymentAmountValue,
    feeRateValue,
    loanDate,
    repaymentDate,
    maturityDate,
    exemptionYearsValue,
  ]);

  const addToRepaymentAmount = (amount: number) => {
    const current = repaymentAmountValue || 0;
    const newValue = Math.min(current + amount, 1000000000000);
    setQueryState({ amount: newValue });
  };

  const handleRepaymentAmountChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setQueryState({ amount: numValue });
  };

  const addToFeeRate = (amount: number) => {
    const current = feeRateValue || 0;
    const newValue = Math.min(Math.max(current + amount, 0), 100);
    setQueryState({ feeRate: Number(newValue.toFixed(2)) });
  };

  const addToExemptionYears = (years: number) => {
    const current = exemptionYearsValue || 0;
    const newValue = Math.min(current + years, 50);
    setQueryState({ exemptionYears: newValue });
  };

  const handleReset = () => {
    setQueryState({
      amount: 0,
      feeRate: 0,
      loanDate: null,
      repaymentDate: null,
      maturityDate: null,
      exemptionYears: 0,
    });
    setShowResults(false);
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  // URL에서 값이 로드되었을 때 자동으로 계산 실행
  useEffect(() => {
    // 첫 렌더링 시에만 실행
    if (!isInitialized) {
      setIsInitialized(true);

      // URL에 유효한 계산 파라미터가 있으면 자동으로 계산
      if (canCalculate && result) {
        setHasCalculated(true);
      }
    }
  }, [canCalculate, result, isInitialized]);

  return {
    // State
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
    // State setters
    setFeeRate: (value: string) =>
      setQueryState({ feeRate: Number(value) || 0 }),
    setLoanDate: (date: Date | undefined) =>
      setQueryState({ loanDate: date ?? null }),
    setRepaymentDate: (date: Date | undefined) =>
      setQueryState({ repaymentDate: date ?? null }),
    setMaturityDate: (date: Date | undefined) =>
      setQueryState({ maturityDate: date ?? null }),
    setExemptionYears: (value: string) =>
      setQueryState({ exemptionYears: Number(value) || 0 }),
    setShowResults,
    // Handlers
    handleRepaymentAmountChange,
    handleReset,
    handleCalculate,
    // Quick actions
    addToRepaymentAmount,
    addToFeeRate,
    addToExemptionYears,
  };
}
