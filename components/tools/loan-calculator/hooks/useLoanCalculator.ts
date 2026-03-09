import { useMemo, useState } from 'react';
import {
  calculateLoan,
  type RepaymentMethod,
} from '@/lib/tools/loan-calculator';
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from '@/lib/tools/formatting';
import { getNumberInput } from '../utils';

export function useLoanCalculator() {
  const [principal, setPrincipal] = useState('0');
  const [principalDisplay, setPrincipalDisplay] = useState('0');
  const [annualRate, setAnnualRate] = useState('');
  const [termMode, setTermMode] = useState<'year' | 'month' | undefined>();
  const [termValue, setTermValue] = useState('');
  const [method, setMethod] = useState<RepaymentMethod>('equal-payment');
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const principalValue = getNumberInput(principal);
  const rateValue = getNumberInput(annualRate);
  const termNumValue = getNumberInput(termValue);

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

    const currentValue = getNumberInput(termValue);

    if (termMode && Number.isFinite(currentValue) && currentValue > 0) {
      if (newMode === 'month') {
        setTermValue(Math.round(currentValue * 12).toString());
      } else {
        setTermValue(Math.floor(currentValue / 12).toString());
      }
    }

    setTermMode(newMode);
  };

  const handleReset = () => {
    setPrincipal('0');
    setPrincipalDisplay('0');
    setAnnualRate('');
    setTermMode(undefined);
    setTermValue('');
    setMethod('equal-payment');
    setShowResults(false);
    setHasCalculated(false);
  };

  const handlePrincipalChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setPrincipal(numValue.toString());
    setPrincipalDisplay(formatNumberWithCommas(value));
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

  const addToPrincipal = (amount: number) => {
    const current = getNumberInput(principal) || 0;
    const newValue = Math.min(current + amount, 1000000000000);
    setPrincipal(newValue.toString());
    setPrincipalDisplay(formatNumberWithCommas(newValue));
  };

  const addToRate = (amount: number) => {
    const current = getNumberInput(annualRate) || 0;
    const newValue = Math.min(Math.max(current + amount, 0), 100);
    setAnnualRate(newValue.toFixed(2));
  };

  const addToTerm = (amount: number) => {
    if (!termMode) return;

    const current = getNumberInput(termValue) || 0;
    if (termMode === 'year') {
      const newValue = Math.min(Math.max(current + amount, 0), 50);
      setTermValue(newValue.toString());
    } else {
      const newValue = Math.min(Math.max(current + amount, 0), 600);
      setTermValue(newValue.toString());
    }
  };

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
    setAnnualRate,
    setTermValue,
    setMethod,
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
