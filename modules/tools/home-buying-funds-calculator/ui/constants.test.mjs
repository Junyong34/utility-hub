import assert from 'node:assert/strict';
import test from 'node:test';

import { PRESET_LABELS } from './constants.ts';

test('청소·인테리어 프리셋의 현재 UI 표기값을 유지한다', () => {
  assert.deepEqual(
    {
      cleaningBasic: PRESET_LABELS.cleaningFee.basic,
      interiorBasic: PRESET_LABELS.interiorFee.basic,
      interiorStandard: PRESET_LABELS.interiorFee.standard,
      interiorPremium: PRESET_LABELS.interiorFee.premium,
    },
    {
      cleaningBasic: '기본 (30만원)',
      interiorBasic: '기본 (매매가 3%)',
      interiorStandard: '표준 (매매가 5%)',
      interiorPremium: '프리미엄 (매매가 8%)',
    }
  );
});
