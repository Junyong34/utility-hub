import type { InterestType, TaxType } from '@/lib/tools/savings-calculator';

/**
 * 통화 포맷터
 */
export const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

/**
 * 이자 방식 옵션
 */
export const INTEREST_TYPES: Array<{
  value: InterestType;
  label: string;
  description: string;
}> = [
  {
    value: 'simple',
    label: '단리',
    description: '원금에만 이자 적용',
  },
  {
    value: 'compound',
    label: '복리',
    description: '원금과 이자에 이자 적용',
  },
];

/**
 * 과세 방식 옵션
 */
export const TAX_TYPES: Array<{
  value: TaxType;
  label: string;
  description: string;
  rate: string;
}> = [
  {
    value: 'general',
    label: '일반과세',
    description: '일반 금융상품',
    rate: '15.4%',
  },
  {
    value: 'tax-benefit',
    label: '세금우대',
    description: '만 65세 이상 등',
    rate: '9.5%',
  },
  {
    value: 'tax-free',
    label: '비과세',
    description: '비과세 종합저축',
    rate: '0%',
  },
];
