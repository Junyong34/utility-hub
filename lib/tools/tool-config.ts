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
  lotto: {
    id: 'lotto',
    name: '로또 번호 생성기',
    shortName: '로또',
    description:
      '로또 번호 추천을 빠르게 받아보세요. 랜덤, 통계, 날짜, MBTI, 행운번호, 슬롯 방식으로 1~45 번호를 생성하고 저장/공유할 수 있습니다.',
    keywords: [
      '로또 번호 생성기',
      '로또 추천',
      '로또 번호 추천',
      '로또 번호 자동 생성',
      '로또 번호 랜덤',
      '로또 번호 생성',
      '로또 번호 조합기',
      '로또 번호 추천 AI',
      '로또 번호 추천 사이트',
      '로또 번호 자동 생성기',
      '로또 번호 통계 추천',
      '로또 번호 확률 계산',
      '로또 번호 추천 프로그램',
      '로또 번호 랜덤 추첨기',
      '로또 번호 통계',
      '로또 회차별 번호',
    ],
    category: 'generator',
    ogImage: '/og-images/tool-lotto.png',
    badge: '인기',
    color: 'from-blue-500 to-purple-500',
    icon: 'DicesIcon',
    features: [
      '랜덤/통계/날짜/MBTI/행운번호/슬롯 6가지 추천 방식',
      '여러 게임 동시 생성 (최대 5게임)',
      '회차별 번호 분석 페이지 제공',
      '번호 통계 페이지 제공 (Hot/Cold/빈도)',
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
          '샘플 회차 데이터 기준으로 hot/cold/mix 전략을 선택할 수 있습니다. 운영 단계에서는 공식 데이터 소스로 확장할 예정입니다.',
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
 */
export function getToolConfig(toolId: string): ToolConfig | null {
  return TOOL_CONFIGS[toolId] || null;
}

/**
 * 모든 Tool 설정 가져오기
 */
export function getAllToolConfigs(): ToolConfig[] {
  return Object.values(TOOL_CONFIGS);
}

/**
 * 카테고리별 Tool 가져오기
 */
export function getToolsByCategory(category: string): ToolConfig[] {
  return Object.values(TOOL_CONFIGS).filter(
    (tool) => tool.category === category
  );
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
