/**
 * 주택 매수 필요자금 계산기 UI 상수
 */

// 필드 레이블
export const FIELD_LABELS = {
  // 기본 정보
  salePrice: '매매가',
  loanAmount: '대출금',
  currentCash: '보유 현금',
  downPaymentRatio: '계약금 비율',
  hasDefenseFund: '방공제 적용',
  hasDownPaymentPaid: '계약금 지불 완료',

  // 세금/규제 정보
  isAdjustedArea: '조정대상지역',
  houseCount: '주택 수',
  isOver85m2: '전용면적 85㎡ 초과',
  isFirstTime: '생애최초',
  isTempTwoHouse: '일시적 2주택',
  standardPrice: '시가표준액',
  regionalType: '지역 구분',

  // 실무 비용
  brokerageFee: '중개보수',
  lawyerFee: '법무사 비용',
  cleaningFee: '청소 비용',
  movingFee: '이사 비용',
  interiorFee: '인테리어 비용',
  managementDeposit: '관리비예치금',
  defenseFund: '방위세공제 (방공제)',

  // 고급 옵션
  contingencyRatio: '예비비 비율',
} as const;

// 툴팁 설명
export const FIELD_TOOLTIPS = {
  salePrice: '주택의 실제 매매 계약 금액입니다.',
  loanAmount: '금융기관에서 대출받을 예정 금액입니다. 0원이면 현금 매수입니다.',
  currentCash: '현재 보유하고 계신 현금 및 즉시 사용 가능한 자금입니다.',
  downPaymentRatio: '계약 시 지불할 계약금 비율입니다. 보통 10% 정도입니다.',
  hasDefenseFund: '방공제는 은행이 소액임차인 보호를 위해 대출금에서 차감하는 금액입니다.\n\n체크 해제 시 방공제 없이 대출금 전액을 받을 수 있습니다.\n\n※ 대부분의 경우 방공제가 적용됩니다.',
  hasDownPaymentPaid: '이미 계약금을 지불했다면 체크하세요.\n\n체크 시: 보유 현금 + 계약금 = 실제 현금\n체크 해제 시: 보유 현금 = 실제 현금',
  isAdjustedArea:
    '조정대상지역 여부에 따라 취득세율이 달라집니다.\n\n[영향 항목: 취득세]\n• 2주택: 비조정 1% → 조정 8%\n• 3주택: 비조정 3% → 조정 12%\n\n(예: 5억 주택 기준)\n• 2주택 조정지역: 4,000만원 (3,500만원 증가)\n• 3주택 조정지역: 6,000만원 (4,500만원 증가)',
  houseCount:
    '현재 보유 주택 수에 따라 취득세율이 달라집니다.\n\n[영향 항목: 취득세]\n• 1주택: 누진세율 (6~40만원)\n• 2주택(비조정): 1%\n• 2주택(조정): 8%\n• 3주택(비조정): 3%\n• 3주택(조정): 12%\n\n(예: 5억 주택 기준)\n• 1주택: 632만원\n• 2주택 조정지역: 4,000만원\n• 3주택 조정지역: 6,000만원',
  isOver85m2:
    '전용면적 85㎡ 초과 여부에 따라 농어촌특별세 면제가 달라집니다.\n\n[영향 항목: 농어촌특별세]\n• 85㎡ 이하 + 1주택 + 6억 이하: 면제\n• 85㎡ 초과: 취득세의 10% 부과\n\n(예: 5억 주택, 1주택 기준)\n• 85㎡ 이하: 0원 (면제)\n• 85㎡ 초과: 63만원 (취득세 632만원의 10%)',
  isFirstTime:
    '생애최초 주택 구입 시 취득세 감면이 적용됩니다.\n\n[영향 항목: 취득세]\n[조건] 6억 이하, 85㎡ 이하, 1주택\n• 일반 세율에서 0.5%p 감면\n• 6천만원 이하: 0.5%\n• 6천만원~6억: 30만원 + 초과분 0.8%\n\n(예: 5억 주택 기준)\n• 일반 1주택: 632만원\n• 생애최초 특례: 382만원 (250만원 절감)',
  isTempTwoHouse:
    '일시적 2주택 특례가 적용되면 취득세 중과가 면제됩니다.\n\n[영향 항목: 취득세]\n[조건] 종전 주택을 일정 기간 내 매도 예정\n• 조정지역 2주택: 8% → 1%\n\n(예: 5억 주택, 조정지역 기준)\n• 일반 2주택: 4,000만원\n• 일시적 2주택: 500만원 (3,500만원 절감)',
  standardPrice:
    '등록면허세 및 국민주택채권 계산에 사용됩니다.\n\n[영향 항목: 등록면허세, 국민주택채권]\n• 등록면허세 = 시가표준액 × 0.2%\n• 국민주택채권 = 시가표준액 × 1~1.5%\n\n(예시)\n• 시가표준액 3.5억: 등록면허세 70만원\n• 시가표준액 5억: 등록면허세 100만원\n\n※ 보통 매매가의 70~90% 수준입니다.',
  regionalType:
    '지역에 따라 방공제 금액과 국민주택채권 의무매입률이 달라집니다.\n\n[방공제 (소액임차보증금 보호)]\n• 서울: 5,500만원\n• 과밀억제권역: 4,800만원\n• 광역시: 2,800만원\n• 기타: 2,000만원\n\n[국민주택채권]\n• 서울/과밀억제권역/광역시: 높은 의무매입률\n• 기타: 낮은 의무매입률\n\n※ 방공제는 은행이 대출금에서 차감하므로 더 많은 현금이 필요합니다.',
  defenseFund:
    '은행이 소액임차인 보호를 위해 대출금에서 미리 차감하는 금액입니다.\n\n[지역별 기준]\n• 서울: 5,500만원\n• 과밀억제권역: 4,800만원\n• 광역시: 2,800만원\n• 기타: 2,000만원\n\n[실제 영향]\n예: 서울, LTV 70%, 5억 주택\n• 이론상 대출: 3.5억\n• 실제 대출: 2.95억 (방공제 5,500만원 차감)\n\n→ 5,500만원 더 많은 현금 필요!',
  contingencyRatio: '예상치 못한 비용에 대비한 예비비 비율입니다. 3~10% 권장합니다.',
} as const;

// 빠른 입력 프리셋
export const QUICK_ACTIONS = {
  salePrice: [
    { label: '3억', amount: 300_000_000 },
    { label: '5억', amount: 500_000_000 },
    { label: '7억', amount: 700_000_000 },
    { label: '10억', amount: 1_000_000_000 },
  ],
  loanAmount: [
    { label: '1억', amount: 100_000_000 },
    { label: '2억', amount: 200_000_000 },
    { label: '3억', amount: 300_000_000 },
    { label: '5억', amount: 500_000_000 },
  ],
  currentCash: [
    { label: '5천만', amount: 50_000_000 },
    { label: '1억', amount: 100_000_000 },
    { label: '1.5억', amount: 150_000_000 },
    { label: '2억', amount: 200_000_000 },
  ],
} as const;

// 프리셋 옵션 레이블
export const PRESET_LABELS = {
  brokerageFee: {
    auto: '자동 계산',
    manual: '직접 입력',
  },
  lawyerFee: {
    auto: '자동 계산',
    manual: '직접 입력',
  },
  cleaningFee: {
    none: '없음',
    basic: '기본 (30만원)',
    premium: '프리미엄 (50만원)',
    manual: '직접 입력',
  },
  movingFee: {
    small: '100만원',
    medium: '150만원',
    large: '200만원',
    manual: '직접 입력',
  },
  interiorFee: {
    none: '없음',
    basic: '기본 (매매가 3%)',
    standard: '표준 (매매가 5%)',
    premium: '프리미엄 (매매가 8%)',
    manual: '직접 입력',
  },
} as const;

// 단계 레이블
export const STAGE_LABELS = {
  contract: '계약 단계',
  loan: '대출 준비',
  balance: '잔금 단계',
  registration: '등기 단계',
  move: '입주 준비',
} as const;

// 카테고리 레이블
export const CATEGORY_LABELS = {
  public: '공적 비용',
  'loan-registration': '대출/등기 비용',
  practical: '실무 비용',
  other: '기타',
} as const;

// 주택 수 옵션
export const HOUSE_COUNT_OPTIONS = [
  { value: 0, label: '무주택' },
  { value: 1, label: '1주택' },
  { value: 2, label: '2주택' },
  { value: 3, label: '3주택 이상' },
] as const;
