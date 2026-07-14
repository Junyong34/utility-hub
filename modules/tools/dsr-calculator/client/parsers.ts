import {
  createParser,
  parseAsBoolean,
  parseAsInteger,
  parseAsStringLiteral,
} from 'nuqs';
import type { DsrLoanInput, DsrPolicyVersion } from '../public.ts';
import {
  areLoanListsEqual,
  areLoansEqual,
  createDefaultExistingLoan,
  createDefaultNewLoan,
  normalizeNewLoan,
  parseExistingLoansFromQuery,
  parseNewLoanFromQuery,
  reindexExistingLoans,
  serializeExistingLoansForQuery,
  serializeNewLoanForQuery,
} from '../domain/url-state.ts';

const POLICY_VERSIONS = ['2025-h2', '2026-h1'] as const;

const newLoanParser = createParser({
  parse: parseNewLoanFromQuery,
  serialize: serializeNewLoanForQuery,
  eq: areLoansEqual,
});

const existingLoansParser = createParser({
  parse: parseExistingLoansFromQuery,
  serialize: serializeExistingLoansForQuery,
  eq: areLoanListsEqual,
});

export const DSR_QUERY_PARSERS = {
  income: parseAsInteger.withDefault(0),
  policy: parseAsStringLiteral(POLICY_VERSIONS).withDefault('2026-h1'),
  calculated: parseAsBoolean.withDefault(false),
  newLoan: newLoanParser.withDefault(createDefaultNewLoan()),
  existingLoans: existingLoansParser.withDefault([]),
} as const;

export interface DsrQueryState {
  income: number | null;
  policy: DsrPolicyVersion;
  calculated: boolean;
  newLoan: DsrLoanInput;
  existingLoans: DsrLoanInput[];
}

export {
  createDefaultExistingLoan,
  createDefaultNewLoan,
  normalizeNewLoan,
  parseExistingLoansFromQuery,
  parseNewLoanFromQuery,
  reindexExistingLoans,
  serializeExistingLoansForQuery,
  serializeNewLoanForQuery,
};
