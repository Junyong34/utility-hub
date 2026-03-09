import {
  parseAsInteger,
  parseAsFloat,
  parseAsStringLiteral,
  parseAsIsoDateTime,
} from 'nuqs';
import type { RepaymentMethod } from '@/lib/tools/loan-calculator';

/**
 * 대출 계산기 URL 쿼리 파서
 *
 * @description
 * 대출 원금, 이자율, 상환 기간, 상환 방법 등을 URL에서 파싱합니다.
 *
 * @example
 * /tools/loan-calculator?principal=100000000&rate=3.5&term=30&termMode=year&method=equal-payment
 */
export const LOAN_QUERY_PARSERS = {
  principal: parseAsInteger.withDefault(0),
  rate: parseAsFloat.withDefault(0),
  term: parseAsInteger.withDefault(0),
  termMode: parseAsStringLiteral(['year', 'month'] as const),
  method: parseAsStringLiteral([
    'equal-payment',
    'equal-principal',
    'lump-sum',
  ] as const).withDefault('equal-payment'),
} as const;

/**
 * 중도상환수수료 계산기 URL 쿼리 파서
 *
 * @description
 * 상환 금액, 수수료율, 각종 날짜 등을 URL에서 파싱합니다.
 * Date는 ISO 8601 형식 (YYYY-MM-DD)을 사용합니다.
 *
 * @example
 * /tools/loan-calculator?tab=prepayment-fee&amount=50000000&feeRate=1.5&loanDate=2024-01-01&repaymentDate=2024-06-01&maturityDate=2034-01-01&exemptionYears=3
 */
export const PREPAYMENT_QUERY_PARSERS = {
  amount: parseAsInteger.withDefault(0),
  feeRate: parseAsFloat.withDefault(0),
  loanDate: parseAsIsoDateTime,
  repaymentDate: parseAsIsoDateTime,
  maturityDate: parseAsIsoDateTime,
  exemptionYears: parseAsInteger.withDefault(0),
} as const;

/**
 * 탭 전환 URL 쿼리 파서
 *
 * @description
 * 대출 계산기와 중도상환수수료 계산기 탭 전환을 URL에서 관리합니다.
 */
export const TAB_QUERY_PARSER = {
  tab: parseAsStringLiteral([
    'loan-calculator',
    'prepayment-fee',
  ] as const).withDefault('loan-calculator'),
} as const;

/**
 * 대출 계산기 상태 타입
 */
export type LoanQueryState = {
  principal: number | null;
  rate: number | null;
  term: number | null;
  termMode: 'year' | 'month' | null;
  method: RepaymentMethod;
};

/**
 * 중도상환 계산기 상태 타입
 */
export type PrepaymentQueryState = {
  amount: number | null;
  feeRate: number | null;
  loanDate: Date | null;
  repaymentDate: Date | null;
  maturityDate: Date | null;
  exemptionYears: number | null;
};

/**
 * 탭 상태 타입
 */
export type TabQueryState = {
  tab: 'loan-calculator' | 'prepayment-fee';
};
