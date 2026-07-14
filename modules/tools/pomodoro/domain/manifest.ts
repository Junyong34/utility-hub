import type { ToolManifest } from '../../../../shared/contracts/tool-manifest.ts';

export const POMODORO_MANIFEST = {
  id: 'pomodoro',
  name: '뽀모도로 타이머',
  shortName: '뽀모도로 타이머',
  breadcrumbLabel: '뽀모도로 타이머',
  publishedAt: '2026-04-01',
  description:
    'Quick Start와 Task Mode를 한 화면에서 제공하는 웹 기반 뽀모도로 타이머입니다. 즉시 시작, 세션 복구, 작업 단위 집중 관리, 완료 애니메이션까지 브라우저에서 바로 사용할 수 있습니다.',
  keywords: [
    '뽀모도로 타이머',
    'pomodoro timer',
    '집중 타이머',
    '작업 관리 타이머',
    '공부 타이머',
    '생산성 타이머',
    '브라우저 타이머',
    '웹 뽀모도로',
    '세션 타이머',
    '집중 시간 관리',
    'task timer',
    'pomodoro task mode',
    '즉시 시작 타이머',
    '세션 복구 타이머',
    '무료 뽀모도로',
  ],
  category: 'utility',
  ogImage: '/og-images/post/tool-pomodoro.webp',
  badge: 'NEW',
  color: 'from-primary to-sunshine-800',
  icon: 'AlarmClock',
  features: [
    'Quick Start 기본 25분 세션 즉시 시작',
    'Task Mode 작업 생성, 선택, 완료 체크',
    '브라우저 새로고침 후 active session 복구',
    '완료 애니메이션과 선택형 사운드 알림',
    'fullscreen 전환과 최근 기록 수정 지원',
  ],
  useCases: [
    '공부 시작 전 빠른 집중 세션 실행',
    '업무 Task별 집중 시간 관리',
    '브라우저에서 별도 앱 없이 뽀모도로 사용',
    '짧은 집중 사이클 반복',
  ],
  faq: [
    {
      question: '새로고침해도 타이머가 유지되나요?',
      answer:
        '진행 중이거나 일시정지된 세션은 로컬 저장소에 저장되어 새로고침 뒤에도 복구됩니다. 다만 브라우저 저장소가 비활성화된 경우는 예외입니다.',
    },
    {
      question: '백그라운드 탭에서도 시간이 정확한가요?',
      answer:
        '이 도구는 tick 누적이 아니라 실제 시각 기준으로 남은 시간을 계산합니다. 탭을 다시 열면 현재 시각으로 재계산합니다.',
    },
    {
      question: 'Task Mode는 어떻게 쓰나요?',
      answer:
        '작업 제목과 시간을 추가한 뒤 작업을 선택해 세션을 시작하면 됩니다. 완료 시 기록과 작업 체크 상태가 함께 갱신됩니다.',
    },
    {
      question: '완료 사운드가 안 들릴 수도 있나요?',
      answer:
        '브라우저 autoplay 정책으로 차단될 수 있습니다. 이 경우 시각적 완료 효과와 상태 메시지만 표시됩니다.',
    },
  ],
  howTo: [
    {
      name: 'Quick Start로 바로 시작',
      text: '첫 화면에서 기본 25분 세션을 확인하고 Start 버튼으로 바로 집중을 시작합니다.',
    },
    {
      name: '필요할 때만 설정 변경',
      text: '제목과 시간을 조정하거나 사운드, 전체화면 옵션을 선택합니다.',
    },
    {
      name: 'Task Mode 작업 생성',
      text: 'Task Mode에서 작업 제목과 시간을 입력해 여러 작업을 관리합니다.',
    },
    {
      name: '세션 완료 후 기록 확인',
      text: '집중이 끝나면 완료 애니메이션을 확인하고 최근 기록 목록에서 제목을 수정할 수 있습니다.',
    },
  ],
  applicationCategory: 'ProductivityApplication',
  estimatedTime: 'PT1M',
  tools: ['웹 브라우저'],
  relatedTools: ['last-digit-game'],
} satisfies ToolManifest;
