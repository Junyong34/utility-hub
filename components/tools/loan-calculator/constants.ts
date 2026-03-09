import type { RepaymentMethod } from '@/lib/tools/loan-calculator';

export const REPAYMENT_METHODS: Array<{
  value: RepaymentMethod;
  label: string;
  description: string;
}> = [
  {
    value: 'equal-payment',
    label: '원리금균등',
    description: '매월 동일 금액',
  },
  {
    value: 'equal-principal',
    label: '원금균등',
    description: '이자 점차 감소',
  },
  {
    value: 'lump-sum',
    label: '만기일시',
    description: '만기에 원금상환',
  },
];

export const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
});
