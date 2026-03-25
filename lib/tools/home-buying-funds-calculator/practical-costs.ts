/**
 * 주택 매수 관련 실무 비용 계산 함수
 */

import type { HomeBuyingInput } from './types';
import {
  BROKERAGE_FEE_RATES,
  LAWYER_FEE_PRESETS,
  CLEANING_FEE_PRESETS,
  MOVING_FEE_PRESETS,
  INTERIOR_FEE_PRESETS,
  MANAGEMENT_DEPOSIT_DEFAULT,
} from './presets';

/**
 * 중개보수 계산
 * 매매가 구간별 상한 요율 적용
 */
export function calculateBrokerageFee(salePrice: number): number {
  for (const bracket of BROKERAGE_FEE_RATES) {
    if (salePrice <= bracket.max) {
      const calculated = Math.floor(salePrice * bracket.rate);
      return bracket.limit ? Math.min(calculated, bracket.limit) : calculated;
    }
  }
  return 0;
}

/**
 * 법무사 비용 계산
 * 매매가 구간별 프리셋 적용
 */
export function calculateLawyerFee(salePrice: number): number {
  for (const bracket of LAWYER_FEE_PRESETS) {
    if (salePrice <= bracket.max) {
      return bracket.fee;
    }
  }
  return LAWYER_FEE_PRESETS[LAWYER_FEE_PRESETS.length - 1].fee;
}

/**
 * 청소 비용 계산
 */
export function calculateCleaningFee(
  preset: HomeBuyingInput['cleaningFeePreset'],
): number {
  if (preset === 'none' || preset === 'manual') return 0;
  return CLEANING_FEE_PRESETS[preset];
}

/**
 * 이사 비용 계산
 */
export function calculateMovingFee(preset: HomeBuyingInput['movingFeePreset']): number {
  if (preset === 'manual') return 0;
  return MOVING_FEE_PRESETS[preset];
}

/**
 * 인테리어 비용 계산
 */
export function calculateInteriorFee(
  salePrice: number,
  preset: HomeBuyingInput['interiorFeePreset'],
): number {
  if (preset === 'none' || preset === 'manual') return 0;
  return Math.floor(salePrice * INTERIOR_FEE_PRESETS[preset]);
}

/**
 * 관리비예치금 계산
 */
export function calculateManagementDeposit(): number {
  return MANAGEMENT_DEPOSIT_DEFAULT;
}
