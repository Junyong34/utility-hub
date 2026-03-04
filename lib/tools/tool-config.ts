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
      '행운의 로또 번호를 자동으로 생성해보세요. 1~45 사이의 중복되지 않는 랜덤 번호 6개를 생성하고 저장할 수 있습니다.',
    keywords: [
      '로또 번호 생성기',
      '로또 추천',
      '랜덤 번호',
      '로또 도구',
      '번호 생성',
      '행운의 번호',
      '로또645',
      '무료 로또 생성기',
    ],
    category: 'generator',
    ogImage: '/og-images/tool-lotto.png',
    badge: '인기',
    color: 'from-blue-500 to-purple-500',
    icon: 'DicesIcon',
    features: [
      '1~45 범위의 랜덤 번호 6개 생성',
      '여러 게임 동시 생성 (최대 10게임)',
      '생성된 번호 로컬 저장 기능',
      '번호 복사 기능',
      '즉시 사용 가능한 간편한 UI',
    ],
    useCases: [
      '로또 구매 전 번호 선택',
      '행운의 번호 찾기',
      '매주 새로운 번호 생성',
    ],
    faq: [
      {
        question: '로또 번호는 어떻게 생성되나요?',
        answer:
          '1부터 45까지의 숫자 중에서 중복되지 않는 6개의 숫자를 무작위로 선택합니다. 완전한 랜덤 알고리즘을 사용하여 공정하게 생성됩니다.',
      },
      {
        question: '생성된 번호는 저장되나요?',
        answer:
          '네, 생성된 번호는 브라우저의 로컬 스토리지에 저장됩니다. 다음 방문 시에도 저장된 번호를 확인할 수 있습니다.',
      },
      {
        question: '몇 개의 게임을 동시에 생성할 수 있나요?',
        answer: '한 번에 최대 10게임까지 생성할 수 있습니다.',
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
        name: '게임 수 선택',
        text: '생성하고 싶은 로또 게임 수를 선택하세요. 1개부터 10개까지 선택 가능합니다.',
      },
      {
        name: '번호 생성 버튼 클릭',
        text: '"번호 생성" 버튼을 클릭하면 선택한 게임 수만큼 랜덤 번호가 생성됩니다.',
      },
      {
        name: '생성된 번호 확인',
        text: '각 게임의 6개 번호가 오름차순으로 정렬되어 표시됩니다.',
      },
      {
        name: '번호 저장 또는 복사',
        text: '마음에 드는 번호는 저장하거나 복사하여 사용할 수 있습니다.',
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
