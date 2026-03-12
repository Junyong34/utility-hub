import { useMemo } from 'react'
import { useQueryStates } from 'nuqs'
import {
  calculateDsrSummary,
  type DsrCalculationResult,
  type DsrLoanInput,
} from '@/lib/tools/dsr'
import {
  createDefaultExistingLoan,
  createDefaultNewLoan,
  DSR_QUERY_PARSERS,
  normalizeNewLoan,
  reindexExistingLoans,
} from './parsers'

export function useDsrCalculator() {
  const [queryState, setQueryState] = useQueryStates(DSR_QUERY_PARSERS, {
    shallow: true,
    history: 'replace',
  })
  const annualIncome = queryState.income ?? 0
  const policyVersion = queryState.policy
  const existingLoans = queryState.existingLoans
  const newLoan = queryState.newLoan
  const hasCalculated = queryState.calculated

  const canCalculate =
    annualIncome > 0 &&
    newLoan.termMonths > 0 &&
    newLoan.annualRate >= 0 &&
    newLoan.balance >= 0

  const summary = useMemo<DsrCalculationResult | null>(() => {
    if (!canCalculate) {
      return null
    }

    return calculateDsrSummary({
      annualIncome,
      policyContext: {
        policyVersion,
        lenderGroup: 'bank',
        existingLoans,
        newLoan,
      },
      existingLoans,
      newLoan,
    })
  }, [annualIncome, canCalculate, existingLoans, newLoan, policyVersion])

  const addExistingLoan = () => {
    setQueryState({
      existingLoans: reindexExistingLoans([
        ...existingLoans,
        createDefaultExistingLoan(existingLoans.length),
      ]),
    })
  }

  const updateExistingLoan = (loanId: string, nextLoan: DsrLoanInput) => {
    setQueryState({
      existingLoans: reindexExistingLoans(
        existingLoans.map((loan) => (loan.id === loanId ? nextLoan : loan))
      ),
    })
  }

  const removeExistingLoan = (loanId: string) => {
    setQueryState({
      existingLoans: reindexExistingLoans(
        existingLoans.filter((loan) => loan.id !== loanId)
      ),
    })
  }

  const reset = () => {
    setQueryState({
      income: 0,
      policy: '2026-h1',
      calculated: false,
      newLoan: createDefaultNewLoan(),
      existingLoans: [],
    })
  }

  return {
    annualIncome,
    policyVersion,
    existingLoans,
    newLoan,
    hasCalculated,
    canCalculate,
    summary,
    setAnnualIncome: (value: number) =>
      setQueryState({ income: value }),
    setPolicyVersion: (value: typeof policyVersion) =>
      setQueryState({ policy: value }),
    setNewLoan: (value: DsrLoanInput) =>
      setQueryState({ newLoan: normalizeNewLoan(value) }),
    setHasCalculated: (value: boolean) =>
      setQueryState({ calculated: value }),
    addExistingLoan,
    updateExistingLoan,
    removeExistingLoan,
    reset,
  }
}
