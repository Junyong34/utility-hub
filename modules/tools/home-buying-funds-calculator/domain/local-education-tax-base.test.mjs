import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateHomeBuyingFunds } from '../public.ts';

// 생애최초 취득세 감면이 지방교육세·농어촌특별세 과세표준에 어떤 영향을 주는지 고정한다.
// 배경: 「지방세특례제한법」 제36조의3에 따른 200만원 공제는 취득세 자체만 줄여주는 감면이고,
// 그로 인해 다른 부가세(지방교육세·농어촌특별세)까지 자동으로 줄어드는지는 각 세목의
// 별도 법령(지방세법 제151조, 농어촌특별세법 제5조)을 확인해야 알 수 있다 — 자세한 조사
// 경위는 taxes.ts의 calculateLocalEducationTaxBase / calculateRuralSpecialTax 주석과
// task-4a-report.md의 "Fix round 1" 절 참고.

function createInput(overrides = {}) {
  return {
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
    contingencyRatio: 5,
    ...overrides,
  };
}

function findAmount(breakdown, id) {
  return breakdown.find(item => item.id === id)?.amount;
}

function findFormula(breakdown, id) {
  return breakdown.find(item => item.id === id)?.formula;
}

test('생애최초 감면을 받아도 지방교육세는 감면 전 표준세율 기준 산출세액으로 계산된다', () => {
  // 8억, 무주택, 생애최초, 85㎡ 초과 (농어촌특별세 면제 조건 밖으로 만들어 두 세목을 함께 관찰)
  //
  // 「지방세법」 제151조제1항제1호 본문 + 제8호 특칙: 지방교육세 = 과세표준 × (제8호
  // 표준세율 × 50%) × 20% = 표준세율 기준 산출세액 × 10%. 「지방세특례제한법」 제36조의3의
  // 200만원 정액 공제는 제151조제1항제1호다목이 말하는 "감면율(%)"이 아니므로 지방교육세
  // 과세표준을 줄이지 않는다.
  //
  // 손으로 유도한 기대값:
  //   표준세율 기준 산출세액(감면 전) = 18,640,000원 (계산은
  //   standard-acquisition-tax-rate.test.mjs의 '8억 주택' 케이스와 동일)
  //   → 지방교육세 = floor(18,640,000 × 0.1) = 1,864,000원
  //   → 실제 납부 취득세(감면 후) = 18,640,000 − 2,000,000 = 16,640,000원 (참고용, 지방교육세
  //     계산에는 쓰이지 않음이 이번 수정의 핵심)
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 800_000_000,
      houseCount: 0,
      isFirstTime: true,
      isOver85m2: true,
    })
  );

  assert.equal(findAmount(result.breakdown, 'acquisition-tax'), 16_640_000);
  assert.equal(findAmount(result.breakdown, 'local-education-tax'), 1_864_000);
  assert.equal(
    findFormula(result.breakdown, 'local-education-tax'),
    '산출세액(감면 전) × 10%'
  );
});

test('지방교육세 formula 라벨은 화면에 보이는 취득세가 아니라 감면 전 산출세액을 가리켜야 정확하다', () => {
  // fix round 2 회귀 방지: formula 문구가 '취득세 × 10%'였을 때는 8억 생애최초 사례에서
  // 화면에 보이는 취득세(16,640,000원)의 10%가 1,664,000원인데 실제 지방교육세는
  // 1,864,000원이라 라벨이 옆에 적힌 숫자를 재현하지 못했다. 지금 라벨('산출세액(감면 전)
  // × 10%')이 가리키는 감면 전 산출세액(18,640,000원, standard-acquisition-tax-rate.test.mjs
  // '8억 주택' 케이스와 동일하게 손으로 유도)의 10%만이 실제 지방교육세와 일치해야 한다.
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 800_000_000,
      houseCount: 0,
      isFirstTime: true,
      isOver85m2: true,
    })
  );

  const displayedAcquisitionTax = findAmount(
    result.breakdown,
    'acquisition-tax'
  );
  const displayedLocalEducationTax = findAmount(
    result.breakdown,
    'local-education-tax'
  );
  const preReliefStandardTax = 18_640_000; // 손으로 유도한 감면 전 표준세율 산출세액

  assert.notEqual(
    Math.floor(displayedAcquisitionTax * 0.1),
    displayedLocalEducationTax,
    '취득세(감면 후) × 10%는 지방교육세와 다르다 — 그래서 옛 라벨이 틀렸다'
  );
  assert.equal(
    Math.floor(preReliefStandardTax * 0.1),
    displayedLocalEducationTax,
    '감면 전 산출세액 × 10%는 실제 지방교육세와 일치해야 한다 — 그래서 새 라벨이 맞다'
  );
});

test('감면이 없는 일반 매수자는 지방교육세가 실제 취득세의 10%와 같다(과세표준 보정이 필요 없는 경우)', () => {
  // 생애최초 보정은 "자동 계산된 감면이 실제로 적용된 경우"에만 개입한다. 감면이 없으면
  // 표준세율 기준 산출세액과 실제 취득세가 같으므로 두 값을 구분할 필요가 없다 — 회귀 방지용.
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 800_000_000,
      houseCount: 0,
      isFirstTime: false,
      isOver85m2: true,
    })
  );

  assert.equal(findAmount(result.breakdown, 'acquisition-tax'), 18_640_000);
  assert.equal(findAmount(result.breakdown, 'local-education-tax'), 1_864_000);
  // 감면이 없으면 산출세액과 취득세가 같은 값(18,640,000원)이므로, formula 라벨이
  // '산출세액(감면 전)'을 가리켜도 '취득세'를 가리켰을 때와 계산 결과는 동일하게 맞는다.
  assert.equal(
    findFormula(result.breakdown, 'local-education-tax'),
    '산출세액(감면 전) × 10%'
  );
});

test('취득세를 직접 입력하면 지방교육세는 표준세율 보정 없이 입력값 기준으로 계산된다', () => {
  // manualAcquisitionTax가 있으면 사용자가 이미 최종 취득세를 통제하는 것으로 보고,
  // calculateLocalEducationTaxBase는 표준세율 재계산을 시도하지 않고 그 값을 그대로 쓴다.
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 800_000_000,
      houseCount: 0,
      isFirstTime: true,
      isOver85m2: true,
      manualAcquisitionTax: 5_000_000,
    })
  );

  assert.equal(findAmount(result.breakdown, 'acquisition-tax'), 5_000_000);
  assert.equal(findAmount(result.breakdown, 'local-education-tax'), 500_000);
});

test('생애최초 감면을 받아도 농어촌특별세는 (미해결 사항으로 남겨둔) 기존 방식대로 감면 후 취득세 기준으로 계산된다', () => {
  // 「농어촌특별세법」 제5조제1항에는 감면세액 기준 항목(제1호, 20%)과 2%-의제 취득세액
  // 기준 항목(제6호, 10%)이 있고 이 사안에 어떻게 적용/중첩되는지 원문만으로 확정하지
  // 못했다(taxes.ts의 calculateRuralSpecialTax 주석 참고). 잘못 추측하는 대신 기존 근사식
  // (실제 취득세 × 10%)을 그대로 유지했음을 이 테스트로 고정해 향후 의도치 않은 변경을
  // 방지한다 — 법령 해석이 확정되면 이 테스트와 함께 구현을 갱신해야 한다.
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 800_000_000,
      houseCount: 0,
      isFirstTime: true,
      isOver85m2: true,
    })
  );

  assert.equal(findAmount(result.breakdown, 'acquisition-tax'), 16_640_000);
  assert.equal(findAmount(result.breakdown, 'rural-special-tax'), 1_664_000);
});
