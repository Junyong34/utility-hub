/**
 * 주택 매수 필요자금 계산기 상태 관리 훅
 */

'use client';

import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import type { HomeBuyingInput, HomeBuyingResult } from '@/lib/tools/home-buying-funds-calculator';
import { calculateHomeBuyingFunds } from '@/lib/tools/home-buying-funds-calculator';
import {
  salePriceParser,
  loanAmountParser,
  currentCashParser,
  downPaymentRatioParser,
  hasDefenseFundParser,
  hasDownPaymentPaidParser,
  isAdjustedAreaParser,
  houseCountParser,
  isOver85m2Parser,
  isFirstTimeParser,
  isTempTwoHouseParser,
  standardPriceParser,
  regionalTypeParser,
  brokerageFeePresetParser,
  lawyerFeePresetParser,
  cleaningFeePresetParser,
  movingFeePresetParser,
  interiorFeePresetParser,
  manualAcquisitionTaxParser,
  manualLocalEducationTaxParser,
  manualRuralSpecialTaxParser,
  manualRegistrationTaxParser,
  manualNationalHousingBondParser,
  manualBrokerageFeeParser,
  manualLawyerFeeParser,
  manualManagementDepositParser,
  manualCleaningFeeParser,
  manualMovingFeeParser,
  manualInteriorFeeParser,
  manualDefenseFundAmountParser,
  contingencyRatioParser,
} from './parsers';

export function useHomeBuyingFundsCalculator() {
  const [state, setState] = useQueryStates(
    {
      salePrice: salePriceParser,
      loanAmount: loanAmountParser,
      currentCash: currentCashParser,
      downPaymentRatio: downPaymentRatioParser,
      hasDefenseFund: hasDefenseFundParser,
      hasDownPaymentPaid: hasDownPaymentPaidParser,
      isAdjustedArea: isAdjustedAreaParser,
      houseCount: houseCountParser,
      isOver85m2: isOver85m2Parser,
      isFirstTime: isFirstTimeParser,
      isTempTwoHouse: isTempTwoHouseParser,
      standardPrice: standardPriceParser,
      regionalType: regionalTypeParser,
      brokerageFeePreset: brokerageFeePresetParser,
      lawyerFeePreset: lawyerFeePresetParser,
      cleaningFeePreset: cleaningFeePresetParser,
      movingFeePreset: movingFeePresetParser,
      interiorFeePreset: interiorFeePresetParser,
      manualAcquisitionTax: manualAcquisitionTaxParser,
      manualLocalEducationTax: manualLocalEducationTaxParser,
      manualRuralSpecialTax: manualRuralSpecialTaxParser,
      manualRegistrationTax: manualRegistrationTaxParser,
      manualNationalHousingBond: manualNationalHousingBondParser,
      manualBrokerageFee: manualBrokerageFeeParser,
      manualLawyerFee: manualLawyerFeeParser,
      manualManagementDeposit: manualManagementDepositParser,
      manualCleaningFee: manualCleaningFeeParser,
      manualMovingFee: manualMovingFeeParser,
      manualInteriorFee: manualInteriorFeeParser,
      manualDefenseFundAmount: manualDefenseFundAmountParser,
      contingencyRatio: contingencyRatioParser,
    },
    {
      history: 'replace',
      shallow: false,
    },
  );

  const input: HomeBuyingInput = useMemo(
    () => ({
      salePrice: state.salePrice,
      loanAmount: state.loanAmount,
      currentCash: state.currentCash,
      downPaymentRatio: state.downPaymentRatio,
      hasDefenseFund: state.hasDefenseFund,
      hasDownPaymentPaid: state.hasDownPaymentPaid,
      isAdjustedArea: state.isAdjustedArea,
      houseCount: state.houseCount,
      isOver85m2: state.isOver85m2,
      isFirstTime: state.isFirstTime,
      isTempTwoHouse: state.isTempTwoHouse,
      standardPrice: state.standardPrice,
      regionalType: state.regionalType as 'seoul' | 'overconcentration' | 'metro' | 'other',
      brokerageFeePreset: state.brokerageFeePreset as 'auto' | 'manual',
      lawyerFeePreset: state.lawyerFeePreset as 'auto' | 'manual',
      cleaningFeePreset: state.cleaningFeePreset as 'none' | 'basic' | 'premium' | 'manual',
      movingFeePreset: state.movingFeePreset as 'small' | 'medium' | 'large' | 'manual',
      interiorFeePreset: state.interiorFeePreset as
        | 'none'
        | 'basic'
        | 'standard'
        | 'premium'
        | 'manual',
      manualAcquisitionTax: state.manualAcquisitionTax ?? undefined,
      manualLocalEducationTax: state.manualLocalEducationTax ?? undefined,
      manualRuralSpecialTax: state.manualRuralSpecialTax ?? undefined,
      manualRegistrationTax: state.manualRegistrationTax ?? undefined,
      manualNationalHousingBond: state.manualNationalHousingBond ?? undefined,
      manualBrokerageFee: state.manualBrokerageFee ?? undefined,
      manualLawyerFee: state.manualLawyerFee ?? undefined,
      manualManagementDeposit: state.manualManagementDeposit ?? undefined,
      manualCleaningFee: state.manualCleaningFee ?? undefined,
      manualMovingFee: state.manualMovingFee ?? undefined,
      manualInteriorFee: state.manualInteriorFee ?? undefined,
      manualDefenseFundAmount: state.manualDefenseFundAmount ?? undefined,
      contingencyRatio: state.contingencyRatio,
    }),
    [state],
  );

  const result: HomeBuyingResult = useMemo(() => calculateHomeBuyingFunds(input), [input]);

  const reset = () => {
    setState({
      salePrice: 0,
      loanAmount: 0,
      currentCash: 0,
      downPaymentRatio: 10,
      hasDefenseFund: false,
      hasDownPaymentPaid: false,
      isAdjustedArea: false,
      houseCount: 0,
      isOver85m2: false,
      isFirstTime: false,
      isTempTwoHouse: false,
      standardPrice: 0,
      regionalType: 'seoul',
      brokerageFeePreset: 'auto',
      lawyerFeePreset: 'auto',
      cleaningFeePreset: 'none',
      movingFeePreset: 'small',
      interiorFeePreset: 'none',
      manualAcquisitionTax: null,
      manualLocalEducationTax: null,
      manualRuralSpecialTax: null,
      manualRegistrationTax: null,
      manualNationalHousingBond: null,
      manualBrokerageFee: null,
      manualLawyerFee: null,
      manualManagementDeposit: null,
      manualCleaningFee: null,
      manualMovingFee: null,
      manualInteriorFee: null,
      manualDefenseFundAmount: null,
      contingencyRatio: 5,
    });
  };

  return {
    input,
    result,
    state,
    setState,
    reset,
  };
}
