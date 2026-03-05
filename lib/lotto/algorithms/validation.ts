/**
 * 로또 번호 유효성 검증 및 후처리
 * PRD 6.3 명세 - 추천 번호 품질 관리
 */

/**
 * 유효성 검증 결과
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * 번호 세트의 기본 유효성을 검증합니다.
 */
export function validateBasicRules(numbers: number[]): ValidationResult {
  const errors: string[] = [];

  // 1. 정확히 6개의 번호인지 확인
  if (numbers.length !== 6) {
    errors.push(`번호 개수가 ${numbers.length}개입니다. 6개여야 합니다.`);
  }

  // 2. 모든 번호가 1~45 범위 내인지 확인
  const outOfRange = numbers.filter(num => num < 1 || num > 45);
  if (outOfRange.length > 0) {
    errors.push(`범위를 벗어난 번호: ${outOfRange.join(', ')}`);
  }

  // 3. 중복이 없는지 확인
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length) {
    errors.push('중복된 번호가 있습니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 번호 합계 범위를 검증합니다 (100~200 권장).
 */
export function validateSumRange(
  numbers: number[],
  min = 100,
  max = 200
): ValidationResult {
  const sum = numbers.reduce((s, num) => s + num, 0);

  if (sum < min || sum > max) {
    return {
      isValid: false,
      errors: [`합계 ${sum}이(가) 권장 범위(${min}~${max})를 벗어났습니다.`],
    };
  }

  return { isValid: true, errors: [] };
}

/**
 * 홀짝 비율을 검증합니다 (2:4 ~ 4:2 권장).
 */
export function validateOddEvenBalance(numbers: number[]): ValidationResult {
  const oddCount = numbers.filter(num => num % 2 !== 0).length;
  const evenCount = 6 - oddCount;

  // 권장 범위: 홀수 2~4개, 짝수 2~4개
  if (oddCount < 2 || oddCount > 4) {
    return {
      isValid: false,
      errors: [
        `홀짝 비율이 ${oddCount}:${evenCount}입니다. 2:4 ~ 4:2 범위를 권장합니다.`,
      ],
    };
  }

  return { isValid: true, errors: [] };
}

/**
 * 구간 편중을 검증합니다 (단일 구간에 4개 이상 집중 방지).
 */
export function validateRangeDistribution(numbers: number[]): ValidationResult {
  const ranges = [
    { min: 1, max: 10, label: '1-10' },
    { min: 11, max: 20, label: '11-20' },
    { min: 21, max: 30, label: '21-30' },
    { min: 31, max: 40, label: '31-40' },
    { min: 41, max: 45, label: '41-45' },
  ];

  const rangeCounts = ranges.map(range => ({
    label: range.label,
    count: numbers.filter(num => num >= range.min && num <= range.max).length,
  }));

  const overconcentrated = rangeCounts.filter(r => r.count >= 4);

  if (overconcentrated.length > 0) {
    return {
      isValid: false,
      errors: [
        `구간 ${overconcentrated.map(r => r.label).join(', ')}에 4개 이상 집중되었습니다.`,
      ],
    };
  }

  return { isValid: true, errors: [] };
}

/**
 * 연속 번호를 검증합니다 (3개 이상 연속 제한).
 */
export function validateConsecutiveNumbers(
  numbers: number[],
  maxConsecutive = 3
): ValidationResult {
  const sorted = [...numbers].sort((a, b) => a - b);
  let consecutiveCount = 1;
  let maxFound = 1;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i]! === sorted[i - 1]! + 1) {
      consecutiveCount += 1;
      maxFound = Math.max(maxFound, consecutiveCount);
    } else {
      consecutiveCount = 1;
    }
  }

  if (maxFound >= maxConsecutive) {
    return {
      isValid: false,
      errors: [
        `${maxFound}개의 연속 번호가 있습니다. ${maxConsecutive}개 미만을 권장합니다.`,
      ],
    };
  }

  return { isValid: true, errors: [] };
}

/**
 * 종합 유효성 검증을 수행합니다.
 */
export function validateLottoNumbers(
  numbers: number[],
  options: {
    checkSum?: boolean;
    checkOddEven?: boolean;
    checkRange?: boolean;
    checkConsecutive?: boolean;
  } = {}
): ValidationResult {
  const {
    checkSum = true,
    checkOddEven = true,
    checkRange = true,
    checkConsecutive = true,
  } = options;

  const allErrors: string[] = [];

  // 기본 규칙 검증 (필수)
  const basicResult = validateBasicRules(numbers);
  if (!basicResult.isValid) {
    return basicResult;
  }

  // 선택적 검증
  if (checkSum) {
    const sumResult = validateSumRange(numbers);
    if (!sumResult.isValid) {
      allErrors.push(...sumResult.errors);
    }
  }

  if (checkOddEven) {
    const oddEvenResult = validateOddEvenBalance(numbers);
    if (!oddEvenResult.isValid) {
      allErrors.push(...oddEvenResult.errors);
    }
  }

  if (checkRange) {
    const rangeResult = validateRangeDistribution(numbers);
    if (!rangeResult.isValid) {
      allErrors.push(...rangeResult.errors);
    }
  }

  if (checkConsecutive) {
    const consecutiveResult = validateConsecutiveNumbers(numbers);
    if (!consecutiveResult.isValid) {
      allErrors.push(...consecutiveResult.errors);
    }
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
}

/**
 * 번호 세트를 보정하여 유효성을 만족시킵니다.
 * (간단한 재생성 방식 - 실제로는 알고리즘 내부에서 조건부 샘플링 사용 권장)
 */
export function adjustNumbersIfNeeded(
  numbers: number[],
  maxRetries = 10
): number[] {
  const adjusted = [...numbers];
  let retries = 0;

  while (retries < maxRetries) {
    const validation = validateLottoNumbers(adjusted, {
      checkSum: false, // 합계는 너무 제한적이므로 선택적으로만
      checkOddEven: true,
      checkRange: true,
      checkConsecutive: true,
    });

    if (validation.isValid) {
      return adjusted;
    }

    // 간단한 보정: 문제가 있으면 일부 번호를 랜덤으로 교체
    const replaceIndex = Math.floor(Math.random() * adjusted.length);
    let newNumber = Math.floor(Math.random() * 45) + 1;

    while (adjusted.includes(newNumber)) {
      newNumber = Math.floor(Math.random() * 45) + 1;
    }

    adjusted[replaceIndex] = newNumber;
    adjusted.sort((a, b) => a - b);

    retries += 1;
  }

  // 최대 재시도 후에도 실패하면 원본 반환
  return numbers;
}
