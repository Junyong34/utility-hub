import type {
  DsrLoanInput,
  DsrLoanType,
  DsrPolicyVersion,
  DsrRateType,
  DsrRegionType,
} from '@/lib/tools/dsr'
import type { RepaymentMethod } from '@/lib/tools/loan-calculator'

export const currencyFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
})

export const DSR_POLICY_OPTIONS: Array<{
  value: DsrPolicyVersion
  label: string
  summary: string
  references: Array<{
    label: string
    href: string
  }>
}> = [
  {
    value: '2026-h1',
    label: '2026년 상반기 정책',
    summary:
      '2026년 상반기에는 수도권·규제지역 주담대는 3단계 기준을, 지방 주담대는 일정 기간 2단계 기준을 유지하는 정책 흐름을 반영합니다.',
    references: [
      {
        label: '금융위 2026 상반기 운영방향',
        href: 'https://www.fsc.go.kr/no010101/85824',
      },
    ],
  },
  {
    value: '2025-h2',
    label: '2025년 하반기 정책',
    summary:
      '2025년 하반기에는 7월 1일부터 3단계 스트레스 DSR이 시행되고, 지방 주담대는 일정 기간 2단계 수준을 적용하는 기준을 반영합니다.',
    references: [
      {
        label: '금융위 3단계 시행방안',
        href: 'https://www.fsc.go.kr/edu/news/84634',
      },
    ],
  },
]

export const DSR_DEFINITION_REFERENCE = {
  label: '한국은행 DSR 정의 보기',
  href: 'https://www.bok.or.kr/portal/ecEdu/ecWordDicary/search.do?menuNo=200688&query=%EC%B4%9D%EB%B6%80%EC%B1%84%EC%9B%90%EB%A6%AC%EA%B8%88%EC%83%81%ED%99%98%EB%B9%84%EC%9C%A8%28DSR%29&ecWordSn=570',
} as const

export const LOAN_TYPE_OPTIONS: Array<{
  value: DsrLoanType
  label: string
}> = [
  { value: 'mortgage', label: '주택담보대출' },
  { value: 'credit', label: '신용대출' },
]

export const RATE_TYPE_OPTIONS: Array<{
  value: DsrRateType
  label: string
}> = [
  { value: 'variable', label: '변동형' },
  { value: 'mixed', label: '혼합형' },
  { value: 'periodic', label: '주기형' },
  { value: 'fixed', label: '고정형' },
]

export const REGION_TYPE_OPTIONS: Array<{
  value: Exclude<DsrRegionType, 'none'>
  label: string
}> = [
  { value: 'capital', label: '수도권·규제지역' },
  { value: 'local', label: '지방' },
]

export const REPAYMENT_METHOD_OPTIONS: Array<{
  value: RepaymentMethod
  label: string
}> = [
  { value: 'equal-payment', label: '원리금균등' },
  { value: 'equal-principal', label: '원금균등' },
  { value: 'lump-sum', label: '만기일시' },
]

export function createEmptyLoan(
  id: string,
  name: string,
  overrides: Partial<DsrLoanInput> = {}
): DsrLoanInput {
  return {
    id,
    name,
    loanType: 'mortgage',
    balance: 0,
    annualRate: 4.2,
    termMonths: 360,
    repaymentMethod: 'equal-payment',
    rateType: 'variable',
    regionType: 'capital',
    ...overrides,
  }
}
