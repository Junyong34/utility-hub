/**
 * 접근성 레이블 및 헬퍼 함수
 */

// ARIA 레이블
export const ARIA_LABELS = {
  // 입력 필드
  salePriceInput: '매매가 입력',
  loanAmountInput: '대출금 입력',
  currentCashInput: '보유 현금 입력',
  downPaymentRatioInput: '계약금 비율 입력',
  standardPriceInput: '시가표준액 입력',
  contingencyRatioInput: '예비비 비율 입력',

  // 체크박스/토글
  isAdjustedAreaToggle: '조정대상지역 여부 선택',
  isOver85m2Toggle: '전용면적 85㎡ 초과 여부 선택',
  isFirstTimeToggle: '생애최초 여부 선택',
  isTempTwoHouseToggle: '일시적 2주택 여부 선택',

  // 셀렉트
  houseCountSelect: '주택 수 선택',
  brokerageFeePresetSelect: '중개보수 계산 방식 선택',
  lawyerFeePresetSelect: '법무사 비용 계산 방식 선택',
  cleaningFeePresetSelect: '청소 비용 프리셋 선택',
  movingFeePresetSelect: '이사 비용 프리셋 선택',
  interiorFeePresetSelect: '인테리어 비용 프리셋 선택',

  // 버튼
  calculateButton: '필요자금 계산하기',
  resetButton: '초기화',
  shareButton: 'URL 복사하여 공유',

  // 카드
  basicInfoCard: '기본 정보 입력',
  taxRuleCard: '세금 및 규제 정보 입력',
  practicalCostCard: '실무 비용 설정',
  advancedOptionsCard: '고급 옵션',
  resultSummaryCard: '계산 결과 요약',
  cashGapCard: '현금 부족/여유 현황',
  costBreakdownTable: '비용 항목별 상세',
  spendingFlowChart: '지출 흐름도',
} as const;

// 스크린 리더용 설명
export const SR_DESCRIPTIONS = {
  currencyUnit: '원',
  percentUnit: '퍼센트',
  requiredField: '필수 입력 항목',
  optionalField: '선택 입력 항목',
  autoCalculated: '자동 계산됨',
  manualInput: '직접 입력',
} as const;

/**
 * 금액을 접근성 친화적인 텍스트로 변환
 */
export function formatAmountForScreenReader(amount: number): string {
  if (amount === 0) return '0원';

  const billions = Math.floor(amount / 100_000_000);
  const tenThousands = Math.floor((amount % 100_000_000) / 10_000);
  const rest = amount % 10_000;

  const parts: string[] = [];

  if (billions > 0) parts.push(`${billions}억`);
  if (tenThousands > 0) parts.push(`${tenThousands}만`);
  if (rest > 0) parts.push(`${rest}`);

  return parts.length > 0 ? `${parts.join(' ')}원` : '0원';
}

/**
 * 백분율을 접근성 친화적인 텍스트로 변환
 */
export function formatPercentForScreenReader(percent: number): string {
  return `${percent}퍼센트`;
}

/**
 * 신뢰도를 접근성 친화적인 텍스트로 변환
 */
export function formatConfidenceForScreenReader(confidence: 'high' | 'medium' | 'low'): string {
  const labels = {
    high: '높은 신뢰도',
    medium: '중간 신뢰도',
    low: '낮은 신뢰도',
  };
  return labels[confidence];
}
