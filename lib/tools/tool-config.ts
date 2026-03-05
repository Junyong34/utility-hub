/**
 * Tool 설정 중앙 관리
 * 모든 Tool의 정보를 이곳에서 관리하여 일관성을 유지
 */

import type { ToolConfig } from '@/types/tools';

/**
 * Tool 설정 레지스트리
 * 새로운 Tool 추가 시 이곳에 설정을 추가하면 자동으로 SEO, Sitemap 등에 반영됨
 */
export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  'loan-calculator': {
    id: 'loan-calculator',
    name: '대출 이자 계산기',
    shortName: '대출 계산기',
    breadcrumbLabel: '대출 계산기',
    description:
      '대출 금액, 연 이자율, 상환 기간을 입력하면 월 상환액과 총 상환금액, 총 이자액을 계산해주는 원리금균등상환 계산기입니다.',
    keywords: [
      '대출 계산기',
      '원리금 계산기',
      '월 상환액 계산',
      '이자 계산',
      '주택담보대출 계산기',
      '신용대출 계산기',
      '대출 상환액 계산',
      '대출 원금 이자 계산',
      '금리 계산기',
      '대출 계획',
      '대출 상환 계획표',
      '재무 계산기',
      '부동산 대출 계산',
      '연 이자율 계산',
      '총 상환금 계산',
      '대출비용 계산',
      '맞춤 상환 계산',
    ],
    category: 'calculator',
    ogImage: '/og-images/tools-default.png',
    badge: 'NEW',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Calculator',
    features: [
      '월 상환액(원리금균등) 실시간 계산',
      '총 이자/총 상환금액 즉시 확인',
      '기간(년), 금리(%) 입력 기반 계산',
      '반올림 처리된 월 상환액 및 비용 정리',
      '모바일 친화 입력 폼',
      '향후 원금균등/중도상환 확장 가능',
    ],
    useCases: [
      '대출 상환 계획 수립',
      '이자 부담 감안 월급부담 계산',
      '주택담보대출 비교 분석',
      '신용대출 부담 예측',
      '가계 지출 계획 수립',
    ],
    faq: [
      {
        question: '원리금균등상환이 뭔가요?',
        answer:
          '매달 이자가 달라지지만, 상환금은 일정하게 유지되는 상환 방식입니다. 매달 원금 비중은 점차 커집니다.',
      },
      {
        question: '이율이 0%일 때도 계산되나요?',
        answer: '네, 연이율이 0%인 경우 월 상환액은 원금 ÷ 상환 개월 수로 계산됩니다.',
      },
      {
        question: '금리 입력값은 소수점도 되나요?',
        answer: '네, 연이율은 소수점 입력이 가능합니다. (예: 3.5)',
      },
      {
        question: '총 상환 금액은 어떤 값을 의미하나요?',
        answer: '총 상환 금액은 상환 기간 동안 납부하는 월 상환액의 합계로, 원금 + 이자입니다.',
      },
      {
        question: '이 계산기는 법적 자문 도구인가요?',
        answer:
          '아니요. 가계 계획을 위한 참고용 계산기입니다. 실제 대출 조건은 금융기관 약관을 확인하세요.',
      },
    ],
    howTo: [
      {
        name: '대출 원금 입력',
        text: '대출 받을 금액(원 단위)을 입력합니다.',
      },
      {
        name: '연 이자율 입력',
        text: '연 이자율(%)을 숫자로 입력합니다. 0부터 입력 가능합니다.',
      },
      {
        name: '상환 기간 입력',
        text: '상환 기간을 년 단위로 입력하고 즉시 계산 결과를 확인합니다.',
      },
      {
        name: '결과 확인',
        text: '월 상환액, 총 이자, 총 상환액을 한눈에 확인하세요.',
      },
    ],
    applicationCategory: 'UtilityApplication',
    estimatedTime: 'PT1M',
    tools: ['웹 브라우저'],
    relatedTools: [],
  },

  lotto: {
    id: 'lotto',
    name: 'AI 추천 번호 생성',
    shortName: '로또',
    breadcrumbLabel: 'AI 추천 번호 생성',
    description:
      'AI 로또 번호 추천과 확률통계 6전략을 무료로 제공하는 로또 번호 생성기입니다. 랜덤, 날짜, MBTI, 슬롯 방식까지 한 번에 비교하고 저장/공유할 수 있습니다.',
    keywords: [
      'AI 로또',
      '로또 번호 생성기',
      '로또 추천',
      '로또 번호 추천',
      '이번주 로또 번호 추천',
      '무료 로또 번호',
      '무료 로또 번호 생성기',
      '로또 번호 자동 생성',
      '로또 번호 랜덤',
      '로또 번호 생성',
      '로또 번호 조합기',
      '로또 번호 추천 AI',
      'AI 로또 번호 생성',
      '인공지능 로또 분석',
      '로또 번호 추천 사이트',
      '로또 번호 자동 생성기',
      '로또 번호 통계 추천',
      '로또 확률통계 추천',
      '로또 핫넘버',
      '로또 콜드넘버',
      '로또 미출현 번호',
      '로또 번호 확률 계산',
      '로또 번호 추천 프로그램',
      '로또 번호 랜덤 추첨기',
      '로또 번호 통계',
      '로또 회차별 번호',
    ],
    category: 'generator',
    ogImage: '/og-images/post/tool-lotto.webp',
    badge: '인기',
    color: 'from-blue-500 to-purple-500',
    icon: 'DicesIcon',
    features: [
      'AI 가중 통계 추천 + 확률통계 6전략(고빈도/저빈도/미출현/균형/핫/콜드)',
      '랜덤/날짜/MBTI/행운번호/슬롯 포함 멀티 추천 방식',
      '여러 게임 동시 생성 (최대 5게임)',
      '회차별 번호 분석 페이지 제공',
      '번호 통계 페이지 제공 (Hot/Cold/빈도)',
      '최신 회차 데이터 기반 번호 생성',
      '생성된 번호 로컬 저장 기능',
      '번호 복사 및 공유 URL 복사 기능',
      '즉시 사용 가능한 간편한 UI',
    ],
    useCases: [
      '로또 구매 전 번호 선택',
      '통계 기반 번호 탐색',
      '회차별 패턴 확인',
      '행운의 번호 찾기',
      '매주 새로운 번호 생성',
    ],
    faq: [
      {
        question: '로또 번호는 어떻게 생성되나요?',
        answer:
          '1부터 45까지 중복되지 않는 6개 숫자를 생성합니다. 랜덤/통계/날짜/MBTI/행운번호/슬롯 추천 방식을 선택해 사용할 수 있습니다.',
      },
      {
        question: '생성된 번호는 저장되나요?',
        answer:
          '네, 생성된 번호는 브라우저의 로컬 스토리지에 저장됩니다. 다음 방문 시에도 저장된 번호를 확인할 수 있습니다.',
      },
      {
        question: '몇 개의 게임을 동시에 생성할 수 있나요?',
        answer: '한 번에 최대 5게임까지 생성할 수 있습니다.',
      },
      {
        question: '통계 추천은 어떤 기준으로 동작하나요?',
        answer:
          'AI 가중 통계 추천(빈도/최근추세/동반출현/균형 보정)과 확률통계 6전략(고빈도/저빈도/미출현/균형/핫/콜드)을 제공합니다.',
      },
      {
        question: '공유 링크 기능은 무엇인가요?',
        answer:
          '현재 추천 방식, 게임 수, 생성된 번호를 URL로 복사해 다른 사람과 공유할 수 있습니다.',
      },
      {
        question: '이 도구는 무료인가요?',
        answer:
          '네, 완전히 무료로 사용하실 수 있습니다. 회원가입이나 로그인도 필요하지 않습니다.',
      },
      {
        question: '생성된 번호로 당첨이 보장되나요?',
        answer:
          '아니요, 이 도구는 엔터테인먼트 목적으로 제공되며 당첨을 보장하지 않습니다. 책임감 있는 구매를 권장합니다.',
      },
    ],
    howTo: [
      {
        name: '추천 방식 선택',
        text: '랜덤, 통계, 날짜, MBTI, 행운번호, 슬롯 중 원하는 추천 방식을 선택하세요.',
      },
      {
        name: '게임 수 선택',
        text: '생성할 추천 개수를 1개부터 5개까지 선택하세요.',
      },
      {
        name: '번호 생성 실행',
        text: '"번호 생성하기" 버튼을 눌러 선택한 방식으로 번호를 생성하세요.',
      },
      {
        name: '결과 저장/공유',
        text: '생성된 번호를 저장하거나 번호/공유 링크를 복사해 활용하세요.',
      },
      {
        name: '통계 및 회차 분석 확인',
        text: '번호 통계 페이지와 회차별 분석 페이지에서 추가 정보를 확인하세요.',
      },
    ],
    applicationCategory: 'UtilityApplication',
    estimatedTime: 'PT1M', // 1분
    tools: ['웹 브라우저'],
    relatedTools: [], // 향후 다른 랜덤 생성기 추가 시 연결
  },

  // 향후 추가될 Tool들
  // example: {
  //   id: 'example',
  //   name: '예시 도구',
  //   description: '...',
  //   keywords: [...],
  //   category: 'converter',
  //   ...
  // },
};

/**
 * Tool ID로 설정 가져오기
 *
 * URL 파라미터(id)에서 직접 가져온 문자열을 레지스트리 조회에 맞춰
 * ToolConfig 형식으로 변환(없으면 null)합니다.
 */
export function getToolConfig(toolId: string): ToolConfig | null {
  return TOOL_CONFIGS[toolId] || null;
}

/**
 * 모든 Tool 설정 가져오기
 * sitemap, FAQ, 메타 생성 시 공용 데이터 소스로 사용됩니다.
 */
export function getAllToolConfigs(): ToolConfig[] {
  return Object.values(TOOL_CONFIGS);
}

/**
 * 카테고리별 Tool 가져오기
 */
export function getToolsByCategory(category: string): ToolConfig[] {
  return Object.values(TOOL_CONFIGS).filter(tool => tool.category === category);
}

/**
 * Tool 존재 여부 확인
 */
export function isValidToolId(toolId: string): boolean {
  return toolId in TOOL_CONFIGS;
}

/**
 * Tool 개수 가져오기
 */
export function getToolCount(): number {
  return Object.keys(TOOL_CONFIGS).length;
}
