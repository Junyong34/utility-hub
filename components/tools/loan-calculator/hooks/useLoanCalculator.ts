import { useMemo, useState, useEffect } from 'react';
import { useQueryStates } from 'nuqs';
import {
  calculateLoan,
  type RepaymentMethod,
} from '@/lib/tools/loan-calculator';
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from '@/lib/tools/formatting';
import { getNumberInput } from '../utils';
import { LOAN_QUERY_PARSERS } from './parsers';

export function useLoanCalculator() {
  // URL 쿼리 상태 (공유 가능한 상태)
  const [queryState, setQueryState] = useQueryStates(LOAN_QUERY_PARSERS, {
    shallow: true,
    history: 'push',
  });

  // 로컬 UI 상태 (URL에 저장하지 않음)
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // URL 상태에서 파생된 값
  const principal = (queryState.principal ?? 0).toString();
  const principalDisplay = useMemo(
    () => formatNumberWithCommas(queryState.principal ?? 0),
    [queryState.principal]
  );
  const annualRate = (queryState.rate ?? 0).toString();
  const termMode = queryState.termMode;
  const termValue = (queryState.term ?? 0).toString();
  const method = queryState.method;

  const principalValue = queryState.principal ?? 0;
  const rateValue = queryState.rate ?? 0;
  const termNumValue = queryState.term ?? 0;

  const canCalculate = useMemo(() => {
    if (!termMode) {
      return false;
    }

    if (
      !Number.isFinite(principalValue) ||
      !Number.isFinite(rateValue) ||
      !Number.isFinite(termNumValue)
    ) {
      return false;
    }

    return principalValue > 0 && rateValue >= 0 && termNumValue > 0;
  }, [principalValue, rateValue, termNumValue, termMode]);

  const result = useMemo(() => {
    if (!canCalculate || !termMode) {
      return null;
    }

    const months =
      termMode === 'year'
        ? Math.round(termNumValue * 12)
        : Math.round(termNumValue);

    return calculateLoan(principalValue, rateValue, months, method, true);
  }, [canCalculate, principalValue, rateValue, termNumValue, termMode, method]);

  const handleTermModeChange = (newMode: 'year' | 'month') => {
    if (newMode === termMode) return;

    const currentValue = termNumValue;

    if (termMode && Number.isFinite(currentValue) && currentValue > 0) {
      if (newMode === 'month') {
        setQueryState({
          termMode: newMode,
          term: Math.round(currentValue * 12),
        });
      } else {
        setQueryState({
          termMode: newMode,
          term: Math.floor(currentValue / 12),
        });
      }
    } else {
      setQueryState({ termMode: newMode });
    }
  };

  const handleReset = () => {
    setQueryState({
      principal: 0,
      rate: 0,
      term: 0,
      termMode: null,
      method: 'equal-payment',
    });
    setShowResults(false);
    setHasCalculated(false);
  };

  const handlePrincipalChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setQueryState({ principal: numValue });
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  const addToPrincipal = (amount: number) => {
    const current = principalValue || 0;
    const newValue = Math.min(current + amount, 1000000000000);
    setQueryState({ principal: newValue });
  };

  const addToRate = (amount: number) => {
    const current = rateValue || 0;
    const newValue = Math.min(Math.max(current + amount, 0), 100);
    setQueryState({ rate: Number(newValue.toFixed(2)) });
  };

  const addToTerm = (amount: number) => {
    if (!termMode) return;

    const current = termNumValue || 0;
    if (termMode === 'year') {
      const newValue = Math.min(Math.max(current + amount, 0), 50);
      setQueryState({ term: newValue });
    } else {
      const newValue = Math.min(Math.max(current + amount, 0), 600);
      setQueryState({ term: newValue });
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
    // State setters
    setAnnualRate: (value: string) =>
      setQueryState({ rate: Number(value) || 0 }),
    setTermValue: (value: string) =>
      setQueryState({ term: Number(value) || 0 }),
    setMethod: (value: RepaymentMethod) => setQueryState({ method: value }),
    setShowResults,
    // Handlers
    handleTermModeChange,
    handleReset,
    handlePrincipalChange,
    handleCalculate,
    // Quick actions
    addToPrincipal,
    addToRate,
    addToTerm,
  };
}
