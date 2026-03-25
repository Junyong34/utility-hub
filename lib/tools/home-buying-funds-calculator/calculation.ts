/**
 * 주택 매수 필요자금 전체 계산 및 정규화
 */

import type {
  HomeBuyingInput,
  HomeBuyingResult,
  CostBreakdownItem,
  FlowChartNode,
} from './types';
import {
  calculateAcquisitionTax,
  calculateLocalEducationTax,
  calculateRuralSpecialTax,
  calculateRegistrationTax,
  calculateStampTax,
  calculateNationalHousingBond,
  calculateDefenseFundAmount,
} from './taxes';
import {
  calculateBrokerageFee,
  calculateLawyerFee,
  calculateCleaningFee,
  calculateMovingFee,
  calculateInteriorFee,
} from './practical-costs';
import { resolveManagementDepositAmount } from './management-deposit';

/**
 * 전체 필요자금 계산
 */
export function calculateHomeBuyingFunds(
  input: HomeBuyingInput
): HomeBuyingResult {
  const breakdown: CostBreakdownItem[] = [];

  // 계약금
  const downPayment = Math.floor(
    input.salePrice * (input.downPaymentRatio / 100)
  );
  breakdown.push({
    id: 'down-payment',
    stage: 'contract',
    category: 'other',
    label: '계약금',
    amount: downPayment,
    calculationMode: 'auto',
    confidence: 'high',
    formula: `매매가 × ${input.downPaymentRatio}%`,
  });

  // 취득세
  const acquisitionTax =
    input.manualAcquisitionTax ?? calculateAcquisitionTax(input);
  breakdown.push({
    id: 'acquisition-tax',
    stage: 'balance',
    category: 'public',
    label: '취득세',
    amount: acquisitionTax,
    calculationMode: input.manualAcquisitionTax ? 'manual' : 'auto',
    confidence: input.manualAcquisitionTax ? 'high' : 'medium',
    note: input.manualAcquisitionTax
      ? '사용자 직접 입력'
      : '주택 수, 지역, 면적 기준 자동 계산',
  });

  // 지방교육세
  const localEducationTax =
    input.manualLocalEducationTax ?? calculateLocalEducationTax(acquisitionTax);
  breakdown.push({
    id: 'local-education-tax',
    stage: 'balance',
    category: 'public',
    label: '지방교육세',
    amount: localEducationTax,
    calculationMode: input.manualLocalEducationTax ? 'manual' : 'auto',
    confidence: 'high',
    formula: input.manualLocalEducationTax ? undefined : '취득세 × 10%',
  });

  // 농어촌특별세
  const ruralSpecialTax =
    input.manualRuralSpecialTax ??
    calculateRuralSpecialTax(input, acquisitionTax);
  breakdown.push({
    id: 'rural-special-tax',
    stage: 'balance',
    category: 'public',
    label: '농어촌특별세',
    amount: ruralSpecialTax,
    calculationMode: input.manualRuralSpecialTax ? 'manual' : 'auto',
    confidence: 'medium',
    note: ruralSpecialTax === 0 ? '면제 조건 충족' : undefined,
  });

  // 등록면허세
  const registrationTax =
    input.manualRegistrationTax ??
    calculateRegistrationTax(input.standardPrice);
  breakdown.push({
    id: 'registration-tax',
    stage: 'registration',
    category: 'public',
    label: '등록면허세',
    amount: registrationTax,
    calculationMode: input.manualRegistrationTax ? 'manual' : 'auto',
    confidence: 'high',
    formula: input.manualRegistrationTax ? undefined : '시가표준액 × 0.2%',
  });

  // 인지세
  const stampTax = calculateStampTax(input.loanAmount);
  breakdown.push({
    id: 'stamp-tax',
    stage: 'loan',
    category: 'loan-registration',
    label: '인지세',
    amount: stampTax,
    calculationMode: 'auto',
    confidence: 'high',
    note: input.loanAmount === 0 ? '대출 없음' : undefined,
  });

  // 국민주택채권
  const isMetro =
    input.regionalType === 'seoul' ||
    input.regionalType === 'overconcentration' ||
    input.regionalType === 'metro';
  const nationalHousingBond =
    input.manualNationalHousingBond ??
    calculateNationalHousingBond(input.standardPrice, isMetro);
  breakdown.push({
    id: 'national-housing-bond',
    stage: 'registration',
    category: 'loan-registration',
    label: '국민주택채권 실부담액',
    amount: nationalHousingBond,
    calculationMode: input.manualNationalHousingBond ? 'manual' : 'auto',
    confidence: 'medium',
    note: '즉시 매각 시 할인 반영',
  });

  // 방공제는 대출금에서 차감되므로 잔금 계산에만 반영하고 breakdown에는 추가하지 않음
  // (실제 지출이 아니라 대출 승인액과 실제 받는 금액의 차이일 뿐)

  // 중개보수
  const brokerageFee =
    input.manualBrokerageFee ?? calculateBrokerageFee(input.salePrice);
  breakdown.push({
    id: 'brokerage-fee',
    stage: 'contract',
    category: 'practical',
    label: '중개보수(복비)',
    amount: brokerageFee,
    calculationMode: input.manualBrokerageFee ? 'manual' : 'auto',
    confidence: input.manualBrokerageFee ? 'high' : 'medium',
    note: '법정 상한 요율 기준',
  });

  // 법무사 비용
  const lawyerFee =
    input.manualLawyerFee ?? calculateLawyerFee(input.salePrice);
  breakdown.push({
    id: 'lawyer-fee',
    stage: 'registration',
    category: 'practical',
    label: '법무사 비용',
    amount: lawyerFee,
    calculationMode: input.manualLawyerFee ? 'manual' : 'auto',
    confidence: 'low',
    note: '실제 견적은 법무사마다 차이 있음',
  });

  // 관리비예치금
  const managementDeposit = resolveManagementDepositAmount(
    input.manualManagementDeposit
  );
  breakdown.push({
    id: 'management-deposit',
    stage: 'move',
    category: 'practical',
    label: '관리비예치금',
    amount: managementDeposit,
    calculationMode: 'manual',
    confidence: 'low',
    note: '단지마다 다름',
  });

  // 청소 비용
  const cleaningFee =
    input.cleaningFeePreset === 'manual'
      ? (input.manualCleaningFee ?? 0)
      : calculateCleaningFee(input.cleaningFeePreset);
  if (cleaningFee > 0) {
    breakdown.push({
      id: 'cleaning-fee',
      stage: 'move',
      category: 'practical',
      label: '청소 비용',
      amount: cleaningFee,
      calculationMode: input.cleaningFeePreset === 'manual' ? 'manual' : 'auto',
      confidence: 'low',
    });
  }

  // 이사 비용
  const movingFee =
    input.movingFeePreset === 'manual'
      ? (input.manualMovingFee ?? 0)
      : calculateMovingFee(input.movingFeePreset);
  if (movingFee > 0) {
    breakdown.push({
      id: 'moving-fee',
      stage: 'move',
      category: 'practical',
      label: '이사 비용',
      amount: movingFee,
      calculationMode: input.movingFeePreset === 'manual' ? 'manual' : 'auto',
      confidence: 'low',
    });
  }

  // 인테리어 비용
  const interiorFee =
    input.interiorFeePreset === 'manual'
      ? (input.manualInteriorFee ?? 0)
      : calculateInteriorFee(input.salePrice, input.interiorFeePreset);
  if (interiorFee > 0) {
    breakdown.push({
      id: 'interior-fee',
      stage: 'move',
      category: 'practical',
      label: '인테리어 비용',
      amount: interiorFee,
      calculationMode: input.interiorFeePreset === 'manual' ? 'manual' : 'auto',
      confidence: 'low',
    });
  }

  // 예비비 (계약금과 잔금을 제외한 부대비용만 대상)
  const totalBeforeContingency = breakdown
    .filter(item => item.id !== 'down-payment' && item.id !== 'balance')
    .reduce((sum, item) => sum + item.amount, 0);
  const contingency = Math.floor(
    totalBeforeContingency * (input.contingencyRatio / 100)
  );
  if (contingency > 0) {
    breakdown.push({
      id: 'contingency',
      stage: 'balance',
      category: 'other',
      label: '예비비',
      amount: contingency,
      calculationMode: 'auto',
      confidence: 'medium',
      formula: `부대비용 합계 × ${input.contingencyRatio}%`,
    });
  }

  // 실제 받는 대출금 (방공제 차감 후)
  const actualLoanAmount = input.hasDefenseFund
    ? input.loanAmount - (input.manualDefenseFundAmount ?? calculateDefenseFundAmount(input.regionalType))
    : input.loanAmount;

  // 잔금 (매매가 - 계약금 - 실제받는대출금)
  const balance = input.salePrice - downPayment - actualLoanAmount;
  breakdown.push({
    id: 'balance',
    stage: 'balance',
    category: 'other',
    label: '잔금',
    amount: balance,
    calculationMode: 'auto',
    confidence: 'high',
    formula: input.hasDefenseFund
      ? '매매가 - 계약금 - 실제받는대출금 (방공제 차감 후)'
      : '매매가 - 계약금 - 대출금',
  });

  // 총 필요 자기자본 (이미 대출금이 제외된 금액)
  const totalRequiredEquity = breakdown.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // 최소 필요 현금 = 총 필요 자기자본 (대출금은 이미 잔금 계산에서 제외됨)
  const minRequiredCash = totalRequiredEquity;

  // 권장 필요 현금 (예비비는 이미 breakdown에 포함되어 있음)
  const recommendedCash = totalRequiredEquity;

  // 대출 없을 경우 필요 현금 (잔금에 대출금을 더함)
  const cashWithoutLoan = minRequiredCash + input.loanAmount;

  // 실제 보유 현금 (계약금 지불 완료 시 계약금을 더함)
  const actualCash = input.hasDownPaymentPaid
    ? input.currentCash + downPayment
    : input.currentCash;

  // 현재 보유 현금 대비 부족액/여유자금
  const cashGap = actualCash - minRequiredCash;

  return {
    totalRequiredEquity,
    minRequiredCash,
    recommendedCash,
    cashWithoutLoan,
    cashGap,
    breakdown,
  };
}

/**
 * 플로우 차트 노드 생성
 */
export function generateFlowChartNodes(
  breakdown: CostBreakdownItem[]
): FlowChartNode[] {
  const stages: Array<CostBreakdownItem['stage']> = [
    'contract',
    'loan',
    'balance',
    'registration',
    'move',
  ];
  const nodes: FlowChartNode[] = [];

  for (const stage of stages) {
    const stageItems = breakdown.filter(item => item.stage === stage);
    const amount = stageItems.reduce((sum, item) => sum + item.amount, 0);

    if (amount > 0) {
      nodes.push({
        stage,
        label: getStageLabel(stage),
        amount,
        isOptional: stage === 'move',
      });
    }
  }

  return nodes;
}

function getStageLabel(stage: CostBreakdownItem['stage']): string {
  const labels: Record<CostBreakdownItem['stage'], string> = {
    contract: '계약 단계',
    loan: '대출 준비',
    balance: '잔금 단계',
    registration: '등기 단계',
    move: '입주 준비',
  };
  return labels[stage];
}
