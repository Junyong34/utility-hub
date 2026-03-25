/**
 * 주택 매수 필요자금 계산기 타입 정의
 */

export type CalculationStage = 'contract' | 'loan' | 'balance' | 'registration' | 'move';

export type CostCategory = 'public' | 'loan-registration' | 'practical' | 'other';

export type CalculationMode = 'auto' | 'auto-adjusted' | 'manual';

export type Confidence = 'high' | 'medium' | 'low';

export interface CostBreakdownItem {
  id: string;
  stage: CalculationStage;
  category: CostCategory;
  label: string;
  amount: number;
  calculationMode: CalculationMode;
  confidence: Confidence;
  note?: string;
  formula?: string;
}

export interface HomeBuyingInput {
  // 기본 정보
  salePrice: number;
  loanAmount: number;
  currentCash: number;
  downPaymentRatio: number;
  hasDefenseFund: boolean; // 방공제 적용 여부
  hasDownPaymentPaid: boolean; // 계약금 지불 여부

  // 세금/규제 정보
  isAdjustedArea: boolean;
  houseCount: number;
  isOver85m2: boolean;
  isFirstTime: boolean;
  isTempTwoHouse: boolean;
  standardPrice: number;
  regionalType: 'seoul' | 'overconcentration' | 'metro' | 'other'; // 지역 구분 (방공제 및 국민주택채권 계산용)

  // 실무 비용 프리셋
  brokerageFeePreset: 'auto' | 'manual';
  lawyerFeePreset: 'auto' | 'manual';
  cleaningFeePreset: 'none' | 'basic' | 'premium' | 'manual';
  movingFeePreset: 'small' | 'medium' | 'large' | 'manual';
  interiorFeePreset: 'none' | 'basic' | 'standard' | 'premium' | 'manual';

  // 직접 입력값
  manualAcquisitionTax?: number;
  manualLocalEducationTax?: number;
  manualRuralSpecialTax?: number;
  manualRegistrationTax?: number;
  manualNationalHousingBond?: number;
  manualBrokerageFee?: number;
  manualLawyerFee?: number;
  manualManagementDeposit?: number;
  manualCleaningFee?: number;
  manualMovingFee?: number;
  manualInteriorFee?: number;
  manualDefenseFundAmount?: number; // 방공제 금액 (소액임차보증금 우선변제 기준)

  // 고급 옵션
  contingencyRatio: number;
}

export interface HomeBuyingResult {
  totalRequiredEquity: number;
  minRequiredCash: number;
  recommendedCash: number;
  cashWithoutLoan: number;
  cashGap: number;
  breakdown: CostBreakdownItem[];
}

export interface FlowChartNode {
  stage: CalculationStage;
  label: string;
  amount: number;
  isOptional: boolean;
}
