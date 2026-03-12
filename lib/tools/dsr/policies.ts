import type { DsrPolicyPreset, DsrPolicyVersion } from './types';

/**
 * 금융위원회 공식 발표문 기준의 확인 가능한 하한값을 정책 프리셋으로 관리합니다.
 * - 2025-05-20 3단계 스트레스 DSR 시행방안
 * - 2025-10-15 수도권·규제지역 주담대 3.0% 하한
 * - 2025-12-10 2026년 상반기 운영방향
 */
export const DSR_POLICY_PRESETS: Record<DsrPolicyVersion, DsrPolicyPreset> = {
  '2025-h2': {
    version: '2025-h2',
    label: '2025년 하반기 정책',
    regulatoryLimit: 40,
    generalStressRateFloor: 1.5,
    capitalMortgageStressRateFloor: 3,
    creditThreshold: 100_000_000,
    defaultStageFactor: 1,
    localMortgageStageFactor: 0.5,
  },
  '2026-h1': {
    version: '2026-h1',
    label: '2026년 상반기 정책',
    regulatoryLimit: 40,
    generalStressRateFloor: 1.5,
    capitalMortgageStressRateFloor: 3,
    creditThreshold: 100_000_000,
    defaultStageFactor: 1,
    localMortgageStageFactor: 0.5,
  },
};

export function getDsrPolicyPreset(
  version: DsrPolicyVersion
): DsrPolicyPreset {
  return DSR_POLICY_PRESETS[version];
}

export function getDsrPolicyVersions(): DsrPolicyVersion[] {
  return Object.keys(DSR_POLICY_PRESETS) as DsrPolicyVersion[];
}
