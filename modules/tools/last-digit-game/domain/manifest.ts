import type { ToolManifest } from '../../../../shared/contracts/tool-manifest.ts';

export const LAST_DIGIT_GAME_MANIFEST = {
  id: 'last-digit-game',
  name: '랜덤 스톱워치 게임',
  shortName: '랜덤 스톱워치 게임',
  breadcrumbLabel: '랜덤 스톱워치 게임',
  publishedAt: '2026-03-20',
  description:
    '최대 15명 참가자의 초 끝자리 점수 기반 경쟁형 스톱워치 게임입니다. Start/Stop으로 각 사용자의 1회차와 2회차 시간을 기록해 실시간 랭킹을 확인하세요.',
  keywords: [
    '랜덤 스톱워치 게임',
    '점수 경쟁',
    '초 끝자리',
    '2회 기록',
    '실시간 랭킹',
    '반응속도 게임',
    '멀티플레이 게임',
    '타이머 경쟁',
    '술먹고 내기',
    '술 먹고 내기',
    '랜덤게임 내기',
    '내기 게임',
    '친구 내기 게임',
    '아이스크림 내기',
    '떡볶이 내기',
    '밥 내기 게임',
    '포켓몬 내기',
    '운동 내기 게임',
    '음식 내기',
    '소소한 내기 게임',
    '랜덤 게임',
    '친구들 게임',
  ],
  category: 'other',
  ogImage: '/og-images/post/last-digit-game.webp',
  badge: 'NEW',
  color: 'from-sunshine-800 to-primary-deep',
  icon: 'Timer',
  homeFeatured: {
    hotRank: 2,
  },
  features: [
    '최대 15명 참가자 지원',
    '각 사용자 2회 기록 후 점수 자동 계산',
    '실시간 랭킹 정렬과 완료 순위 반영',
    '중복 클릭 방지와 미완료 모달 차단',
    '결과 모달 자동 오픈과 우승 강조',
  ],
  useCases: [
    '반응속도 게임',
    '팀 단위 짧은 대결',
    '이벤트 타임트래커',
    '브레이크 타임 재미 도구',
  ],
  faq: [
    {
      question: '게임 점수는 어떻게 계산되나요?',
      answer:
        '각 사용자의 1회차/2회차 기록(mm:ss:SS)에서 seconds의 끝자리 숫자 1개씩을 뽑아 곱합니다.',
    },
    {
      question: '동점일 때는 어떻게 순위가 정해지나요?',
      answer: '동점이면 먼저 완료한 사용자를 상위로 표시합니다.',
    },
    {
      question: '실행 중 Start 버튼을 연타하면 어떻게 되나요?',
      answer:
        '게임은 현재 실행 상태를 기반으로 Start/Stop이 토글되며, 동일 단계에서 중복 실행은 방지됩니다.',
    },
    {
      question: '새로고침하면 기록이 유지되나요?',
      answer:
        '페이지 새로고침 시 클라이언트 상태가 초기화되어 게임은 다시 시작됩니다.',
    },
    {
      question: '참가자 수를 바꾸면 기존 진행이 유지되나요?',
      answer:
        '참가자 설정은 초기화 동작으로 작동하므로 진행 중에는 변경이 제한됩니다.',
    },
  ],
  howTo: [
    {
      name: '참가자 등록',
      text: '참가자 수를 1~20명 범위에서 선택하고 참가자 생성을 눌러 대기열을 구성합니다.',
    },
    {
      name: '1회차 시작',
      text: '현재 사용자 타이머를 시작하고 Stop으로 첫 번째 기록을 저장합니다.',
    },
    {
      name: '2회차 시작',
      text: '1회차 완료 후 Start를 눌러 두 번째 기록을 저장하세요.',
    },
    {
      name: '실시간 순위 확인',
      text: '각 사용자 기록과 점수가 갱신될 때마다 랭킹 순위를 실시간으로 확인합니다.',
    },
    {
      name: '결과 확인',
      text: '모든 사용자가 2회 기록을 마치면 결과 모달에서 최종 순위와 점수를 확인합니다.',
    },
  ],
  applicationCategory: 'UtilityApplication',
  estimatedTime: 'PT2M',
  tools: ['웹 브라우저'],
  relatedTools: ['lotto'],
} satisfies ToolManifest;
