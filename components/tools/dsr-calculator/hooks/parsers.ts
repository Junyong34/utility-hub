import {
  createParser,
  parseAsBoolean,
  parseAsInteger,
  parseAsStringLiteral,
} from 'nuqs'
import type {
  DsrLoanInput,
  DsrLoanType,
  DsrPolicyVersion,
  DsrRateType,
  DsrRegionType,
} from '@/lib/tools/dsr'
import type { RepaymentMethod } from '@/lib/tools/loan-calculator'
import { createEmptyLoan } from '../constants'

interface CompactDsrLoan {
  lt: DsrLoanType
  b: number
  ar: number
  tm: number
  rm: RepaymentMethod
  rt: DsrRateType
  rg: DsrRegionType
  ip?: number
}

const POLICY_VERSIONS = ['2025-h2', '2026-h1'] as const
const LOAN_TYPES = ['mortgage', 'credit'] as const
const REPAYMENT_METHODS = [
  'equal-payment',
  'equal-principal',
  'lump-sum',
] as const
const RATE_TYPES = ['fixed', 'variable', 'mixed', 'periodic'] as const
const REGION_TYPES = ['capital', 'local', 'none'] as const

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isStringLiteral<T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] {
  return typeof value === 'string' && allowedValues.includes(value)
}

function normalizeRegionType(
  loanType: DsrLoanType,
  regionType: DsrRegionType
): DsrRegionType {
  if (loanType === 'credit') {
    return 'none'
  }

  return regionType === 'none' ? 'capital' : regionType
}

function normalizeIntroductoryPeriodMonths(
  rateType: DsrRateType,
  termMonths: number,
  introductoryPeriodMonths?: number
): number | undefined {
  if (rateType !== 'mixed' && rateType !== 'periodic') {
    return undefined
  }

  if (
    typeof introductoryPeriodMonths === 'number' &&
    Number.isFinite(introductoryPeriodMonths) &&
    introductoryPeriodMonths > 0
  ) {
    return Math.min(Math.round(introductoryPeriodMonths), termMonths)
  }

  return Math.min(60, termMonths)
}

function isCompactDsrLoan(value: unknown): value is CompactDsrLoan {
  if (!value || typeof value !== 'object') {
    return false
  }

  const loan = value as Partial<CompactDsrLoan>

  return (
    isStringLiteral(loan.lt, LOAN_TYPES) &&
    isFiniteNumber(loan.b) &&
    isFiniteNumber(loan.ar) &&
    isFiniteNumber(loan.tm) &&
    isStringLiteral(loan.rm, REPAYMENT_METHODS) &&
    isStringLiteral(loan.rt, RATE_TYPES) &&
    isStringLiteral(loan.rg, REGION_TYPES) &&
    (typeof loan.ip === 'undefined' || isFiniteNumber(loan.ip))
  )
}

function toCompactDsrLoan(loan: DsrLoanInput): CompactDsrLoan {
  const normalizedLoan = normalizeLoanShape(loan)

  return {
    lt: normalizedLoan.loanType,
    b: normalizedLoan.balance,
    ar: normalizedLoan.annualRate,
    tm: normalizedLoan.termMonths,
    rm: normalizedLoan.repaymentMethod,
    rt: normalizedLoan.rateType,
    rg: normalizedLoan.regionType,
    ...(typeof normalizedLoan.introductoryPeriodMonths === 'number'
      ? { ip: normalizedLoan.introductoryPeriodMonths }
      : {}),
  }
}

function normalizeLoanShape(loan: DsrLoanInput): DsrLoanInput {
  const termMonths = Math.max(0, Math.round(loan.termMonths))

  return {
    ...loan,
    balance: Math.max(0, Math.round(loan.balance)),
    annualRate: Math.max(0, loan.annualRate),
    termMonths,
    regionType: normalizeRegionType(loan.loanType, loan.regionType),
    introductoryPeriodMonths: normalizeIntroductoryPeriodMonths(
      loan.rateType,
      termMonths,
      loan.introductoryPeriodMonths
    ),
  }
}

function hydrateNewLoan(compactLoan: CompactDsrLoan): DsrLoanInput {
  return normalizeLoanShape(
    createEmptyLoan('new-loan', '신규 대출', {
      loanType: compactLoan.lt,
      balance: compactLoan.b,
      annualRate: compactLoan.ar,
      termMonths: compactLoan.tm,
      repaymentMethod: compactLoan.rm,
      rateType: compactLoan.rt,
      regionType: compactLoan.rg,
      introductoryPeriodMonths: compactLoan.ip,
    })
  )
}

function hydrateExistingLoan(
  compactLoan: CompactDsrLoan,
  index: number
): DsrLoanInput {
  return normalizeLoanShape(
    createEmptyLoan(`existing-${index + 1}`, `보유 대출 ${index + 1}`, {
      loanType: compactLoan.lt,
      balance: compactLoan.b,
      annualRate: compactLoan.ar,
      termMonths: compactLoan.tm,
      repaymentMethod: compactLoan.rm,
      rateType: compactLoan.rt,
      regionType: compactLoan.rg,
      introductoryPeriodMonths: compactLoan.ip,
    })
  )
}

function safeJsonParse<T>(rawValue: string): T | null {
  try {
    return JSON.parse(rawValue) as T
  } catch {
    return null
  }
}

function areLoansEqual(left: DsrLoanInput, right: DsrLoanInput): boolean {
  return serializeNewLoanForQuery(left) === serializeNewLoanForQuery(right)
}

function areLoanListsEqual(
  left: DsrLoanInput[],
  right: DsrLoanInput[]
): boolean {
  return (
    serializeExistingLoansForQuery(left) ===
    serializeExistingLoansForQuery(right)
  )
}

export function createDefaultNewLoan(): DsrLoanInput {
  return createEmptyLoan('new-loan', '신규 대출', {
    balance: 300_000_000,
  })
}

export function createDefaultExistingLoan(index: number): DsrLoanInput {
  return createEmptyLoan(`existing-${index + 1}`, `보유 대출 ${index + 1}`, {
    loanType: 'credit',
    annualRate: 3.8,
    termMonths: 240,
    regionType: 'none',
  })
}

export function reindexExistingLoans(loans: DsrLoanInput[]): DsrLoanInput[] {
  return loans.map((loan, index) =>
    normalizeLoanShape({
      ...loan,
      id: `existing-${index + 1}`,
      name: `보유 대출 ${index + 1}`,
    })
  )
}

export function normalizeNewLoan(loan: DsrLoanInput): DsrLoanInput {
  return {
    ...normalizeLoanShape({
      ...createDefaultNewLoan(),
      ...loan,
    }),
    id: 'new-loan',
    name: '신규 대출',
  }
}

export function serializeNewLoanForQuery(loan: DsrLoanInput): string {
  return JSON.stringify(toCompactDsrLoan(normalizeNewLoan(loan)))
}

export function parseNewLoanFromQuery(rawValue: string): DsrLoanInput | null {
  const parsed = safeJsonParse<CompactDsrLoan>(rawValue)

  if (!isCompactDsrLoan(parsed)) {
    return null
  }

  return hydrateNewLoan(parsed)
}

export function serializeExistingLoansForQuery(loans: DsrLoanInput[]): string {
  return JSON.stringify(reindexExistingLoans(loans).map(toCompactDsrLoan))
}

export function parseExistingLoansFromQuery(
  rawValue: string
): DsrLoanInput[] | null {
  const parsed = safeJsonParse<unknown[]>(rawValue)

  if (!Array.isArray(parsed) || !parsed.every(isCompactDsrLoan)) {
    return null
  }

  return parsed.map((loan, index) => hydrateExistingLoan(loan, index))
}

const newLoanParser = createParser({
  parse: parseNewLoanFromQuery,
  serialize: serializeNewLoanForQuery,
  eq: areLoansEqual,
})

const existingLoansParser = createParser({
  parse: parseExistingLoansFromQuery,
  serialize: serializeExistingLoansForQuery,
  eq: areLoanListsEqual,
})

export const DSR_QUERY_PARSERS = {
  income: parseAsInteger.withDefault(0),
  policy: parseAsStringLiteral(POLICY_VERSIONS).withDefault('2026-h1'),
  calculated: parseAsBoolean.withDefault(false),
  newLoan: newLoanParser.withDefault(createDefaultNewLoan()),
  existingLoans: existingLoansParser.withDefault([]),
} as const

export interface DsrQueryState {
  income: number | null
  policy: DsrPolicyVersion
  calculated: boolean
  newLoan: DsrLoanInput
  existingLoans: DsrLoanInput[]
}
