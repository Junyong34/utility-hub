/**
 * nuqs 파서 정의
 */

import { createParser, parseAsFloat, parseAsInteger, parseAsBoolean } from 'nuqs';

// 기본 정보
export const salePriceParser = parseAsInteger.withDefault(0);
export const loanAmountParser = parseAsInteger.withDefault(0);
export const currentCashParser = parseAsInteger.withDefault(0);
export const downPaymentRatioParser = parseAsFloat.withDefault(10);
export const hasDefenseFundParser = parseAsBoolean.withDefault(false);
export const hasDownPaymentPaidParser = parseAsBoolean.withDefault(false);

// 세금/규제 정보
export const isAdjustedAreaParser = parseAsBoolean.withDefault(false);
export const houseCountParser = parseAsInteger.withDefault(0);
export const isOver85m2Parser = parseAsBoolean.withDefault(false);
export const isFirstTimeParser = parseAsBoolean.withDefault(false);
export const isTempTwoHouseParser = parseAsBoolean.withDefault(false);
export const standardPriceParser = parseAsInteger.withDefault(0);
export const regionalTypeParser = createParser({
  parse: (value: string) => {
    if (value === 'seoul' || value === 'overconcentration' || value === 'metro' || value === 'other') return value;
    return 'seoul';
  },
  serialize: String,
}).withDefault('seoul' as 'seoul' | 'overconcentration' | 'metro' | 'other');

// 실무 비용 프리셋
export const brokerageFeePresetParser = createParser({
  parse: (value: string) => {
    if (value === 'auto' || value === 'manual') return value;
    return 'auto';
  },
  serialize: String,
}).withDefault('auto' as 'auto' | 'manual');

export const lawyerFeePresetParser = createParser({
  parse: (value: string) => {
    if (value === 'auto' || value === 'manual') return value;
    return 'auto';
  },
  serialize: String,
}).withDefault('auto' as 'auto' | 'manual');

export const cleaningFeePresetParser = createParser({
  parse: (value: string) => {
    if (['none', 'basic', 'premium', 'manual'].includes(value)) return value;
    return 'none';
  },
  serialize: String,
}).withDefault('none' as 'none' | 'basic' | 'premium' | 'manual');

export const movingFeePresetParser = createParser({
  parse: (value: string) => {
    if (['small', 'medium', 'large', 'manual'].includes(value)) return value;
    return 'small';
  },
  serialize: String,
}).withDefault('small' as 'small' | 'medium' | 'large' | 'manual');

export const interiorFeePresetParser = createParser({
  parse: (value: string) => {
    if (['none', 'basic', 'standard', 'premium', 'manual'].includes(value)) return value;
    return 'none';
  },
  serialize: String,
}).withDefault('none' as 'none' | 'basic' | 'standard' | 'premium' | 'manual');

// 직접 입력값 (nullable)
export const manualAcquisitionTaxParser = parseAsInteger;
export const manualLocalEducationTaxParser = parseAsInteger;
export const manualRuralSpecialTaxParser = parseAsInteger;
export const manualRegistrationTaxParser = parseAsInteger;
export const manualNationalHousingBondParser = parseAsInteger;
export const manualBrokerageFeeParser = parseAsInteger;
export const manualLawyerFeeParser = parseAsInteger;
export const manualManagementDepositParser = parseAsInteger;
export const manualCleaningFeeParser = parseAsInteger;
export const manualMovingFeeParser = parseAsInteger;
export const manualInteriorFeeParser = parseAsInteger;
export const manualDefenseFundAmountParser = parseAsInteger;

// 고급 옵션
export const contingencyRatioParser = parseAsFloat.withDefault(5);
