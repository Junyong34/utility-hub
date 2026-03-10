import {
  parseAsInteger,
  parseAsFloat,
  parseAsStringLiteral,
} from 'nuqs';
import type { InterestType, TaxType } from '@/lib/tools/savings-calculator';

/**
 * 예금 계산기 URL 쿼리 파서
 */
export const DEPOSIT_QUERY_PARSERS = {
  amount: parseAsInteger.withDefault(0),
  period: parseAsInteger.withDefault(0),
  periodMode: parseAsStringLiteral(['year', 'month'] as const),
  rate: parseAsFloat.withDefault(0),
  interestType: parseAsStringLiteral(['simple', 'compound'] as const).withDefault('simple'),
  taxType: parseAsStringLiteral([
    'general',
    'tax-benefit',
    'tax-free',
  ] as const).withDefault('general'),
  customTaxRate: parseAsFloat.withDefault(9.5),
} as const;

/**
 * 적금 계산기 URL 쿼리 파서
 */
export const INSTALLMENT_QUERY_PARSERS = {
  monthly: parseAsInteger.withDefault(0),
  period: parseAsInteger.withDefault(0),
  periodMode: parseAsStringLiteral(['year', 'month'] as const),
  rate: parseAsFloat.withDefault(0),
  interestType: parseAsStringLiteral(['simple', 'compound'] as const).withDefault('simple'),
  taxType: parseAsStringLiteral([
    'general',
    'tax-benefit',
    'tax-free',
  ] as const).withDefault('general'),
  customTaxRate: parseAsFloat.withDefault(9.5),
} as const;

/**
 * 예금 계산기 상태 타입
 */
export type DepositQueryState = {
  amount: number | null;
  period: number | null;
  periodMode?: 'year' | 'month';
  rate: number | null;
  interestType: InterestType;
  taxType: TaxType;
  customTaxRate: number | null;
};

/**
 * 적금 계산기 상태 타입
 */
export type InstallmentQueryState = {
  monthly: number | null;
  period: number | null;
  periodMode?: 'year' | 'month';
  rate: number | null;
  interestType: InterestType;
  taxType: TaxType;
  customTaxRate: number | null;
};
