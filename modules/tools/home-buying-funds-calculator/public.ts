export { HOME_BUYING_FUNDS_CALCULATOR_MANIFEST } from './domain/manifest.ts';
export {
  BROKERAGE_FEE_RATES,
  CLEANING_FEE_PRESETS,
  DEFAULT_CONTINGENCY_RATIO,
  DEFAULT_DOWN_PAYMENT_RATIO,
  DEFAULT_STANDARD_PRICE_RATIO,
  INTERIOR_FEE_PRESETS,
  LAWYER_FEE_PRESETS,
  MANAGEMENT_DEPOSIT_DEFAULT,
  MOVING_FEE_PRESETS,
  NATIONAL_HOUSING_BOND_DISCOUNT_RATE,
  NATIONAL_HOUSING_BOND_RATES,
  STAMP_TAX_RATES,
} from './domain/presets.ts';
export {
  calculateAcquisitionTax,
  calculateDefenseFundAmount,
  calculateLocalEducationTax,
  calculateNationalHousingBond,
  calculateRegistrationTax,
  calculateRuralSpecialTax,
  calculateStampTax,
} from './domain/taxes.ts';
export {
  calculateBrokerageFee,
  calculateCleaningFee,
  calculateInteriorFee,
  calculateLawyerFee,
  calculateManagementDeposit,
  calculateMovingFee,
} from './domain/practical-costs.ts';
export {
  calculateHomeBuyingFunds,
  generateFlowChartNodes,
} from './domain/calculation.ts';
export type {
  CalculationMode,
  CalculationStage,
  Confidence,
  CostBreakdownItem,
  CostCategory,
  FlowChartNode,
  HomeBuyingInput,
  HomeBuyingResult,
} from './domain/types.ts';
