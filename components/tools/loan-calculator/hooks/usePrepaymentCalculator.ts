import { useMemo, useState } from 'react';
import {
  calculatePrepaymentFee,
  type PrepaymentFeeResult,
} from '@/lib/tools/prepayment-fee-calculator';
import {
  formatNumberWithCommas,
  parseFormattedNumber,
} from '@/lib/tools/formatting';
import { getNumberInput } from '../utils';

export function usePrepaymentCalculator() {
  const [repaymentAmount, setRepaymentAmount] = useState('0');
  const [repaymentAmountDisplay, setRepaymentAmountDisplay] = useState('0');
  const [feeRate, setFeeRate] = useState('');
  const [loanDate, setLoanDate] = useState<Date | undefined>();
  const [repaymentDate, setRepaymentDate] = useState<Date | undefined>();
  const [maturityDate, setMaturityDate] = useState<Date | undefined>();
  const [exemptionYears, setExemptionYears] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const repaymentAmountValue = getNumberInput(repaymentAmount);
  const feeRateValue = getNumberInput(feeRate);
  const exemptionYearsValue = getNumberInput(exemptionYears);

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
    const current = getNumberInput(repaymentAmount) || 0;
    const newValue = Math.min(current + amount, 1000000000000);
    setRepaymentAmount(newValue.toString());
    setRepaymentAmountDisplay(formatNumberWithCommas(newValue));
  };

  const handleRepaymentAmountChange = (value: string) => {
    const numValue = parseFormattedNumber(value);
    setRepaymentAmount(numValue.toString());
    setRepaymentAmountDisplay(formatNumberWithCommas(value));
  };

  const addToFeeRate = (amount: number) => {
    const current = getNumberInput(feeRate) || 0;
    const newValue = Math.min(Math.max(current + amount, 0), 100);
    setFeeRate(newValue.toFixed(2));
  };

  const addToExemptionYears = (years: number) => {
    const current = getNumberInput(exemptionYears) || 0;
    const newValue = Math.min(current + years, 50);
    setExemptionYears(newValue.toString());
  };

  const handleReset = () => {
    setRepaymentAmount('0');
    setRepaymentAmountDisplay('0');
    setFeeRate('');
    setLoanDate(undefined);
    setRepaymentDate(undefined);
    setMaturityDate(undefined);
    setExemptionYears('');
    setShowResults(false);
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    if (canCalculate && result) {
      setHasCalculated(true);
      setShowResults(true);
    }
  };

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
    setFeeRate,
    setLoanDate,
    setRepaymentDate,
    setMaturityDate,
    setExemptionYears,
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
