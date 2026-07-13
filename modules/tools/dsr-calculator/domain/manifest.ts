import type { ToolManifest } from '../../../../shared/contracts/tool-manifest.ts';

export const DSR_CALCULATOR_MANIFEST = {
  id: 'dsr-calculator',
  name: 'DSR 계산기',
  shortName: 'DSR 계산기',
  breadcrumbLabel: 'DSR 계산기',
  publishedAt: '2026-03-12',
  description:
    '연소득, 보유 대출, 신규 대출 조건을 바탕으로 현재 DSR과 스트레스 DSR, 가능한 신규 대출 한도를 계산해주는 정책형 자기진단 계산기입니다.',
  keywords: [
    'DSR 계산기',
    '스트레스 DSR 계산기',
    '총부채원리금상환비율',
    '주담대 DSR',
    '신용대출 DSR',
    '보유대출 연원금 상환액',
    '보유대출 연이자 상환액',
    '대출 가능 한도 계산',
    '은행권 40퍼센트',
    '주택담보대출 한도',
    '스트레스 금리',
    '금융 규제 계산기',
    '대출 규제 계산',
    '신규 대출 한도',
    '정책형 대출 계산기',
  ],
  category: 'calculator',
  badge: 'NEW',
  color: 'from-yellow-saturated to-sunshine-700',
  icon: 'Calculator',
  features: [
    '현재 DSR과 스트레스 DSR 동시 계산',
    '보유 대출별 연원금·연이자 자동 계산',
    '주담대·신용대출 신규 시나리오 지원',
    '수도권·지방 스트레스 DSR 분기 반영',
    '가능한 신규 대출 한도 역산',
    '정책 버전 프리셋 구조로 유지보수 용이',
  ],
  useCases: [
    '주택담보대출 사전 한도 점검',
    '신용대출 추가 가능 여부 확인',
    '스트레스 DSR 적용 전후 비교',
    '보유 대출이 DSR에 미치는 영향 확인',
    '은행권 40% 한도 기준 자기진단',
  ],
  faq: [
    {
      question: 'DSR은 무엇인가요?',
      answer:
        'DSR은 총부채원리금상환비율로, 모든 가계대출의 연간 원리금 상환액을 연소득으로 나눈 비율입니다. 값이 높을수록 소득 대비 부채 상환 부담이 큰 것으로 봅니다.',
    },
    {
      question: '스트레스 DSR은 일반 DSR과 무엇이 다른가요?',
      answer:
        '스트레스 DSR은 실제 약정 금리를 바꾸는 제도가 아니라, DSR 심사 시 금리 상승 가능성을 반영한 가산금리를 더해 더 보수적으로 대출 한도를 계산하는 방식입니다.',
    },
    {
      question: '보유 대출 연원금 상환액과 연이자 상환액은 어떻게 계산하나요?',
      answer:
        '각 보유 대출의 잔액, 실제 금리, 남은 만기, 상환 방식을 입력하면 첫 12개월 기준 상환 스케줄을 계산해 연원금 상환액과 연이자 상환액을 자동 합산합니다.',
    },
    {
      question: '신용대출도 스트레스 DSR이 적용되나요?',
      answer:
        '네. 다만 차주의 기존 신용대출과 신규 신용대출 잔액을 합친 금액이 1억원을 초과하는 경우에 적용됩니다. 이 계산기는 해당 기준을 반영합니다.',
    },
    {
      question: '수도권과 지방 주담대는 왜 결과가 다른가요?',
      answer:
        '정책 시점에 따라 수도권·규제지역 주담대는 더 높은 스트레스 금리 하한과 3단계 반영을 적용하고, 지방 주담대는 2단계 수준을 유지하는 등 차등 규제가 적용될 수 있습니다.',
    },
    {
      question: '이 계산 결과가 실제 금융회사 심사와 완전히 같나요?',
      answer:
        '아니요. 이 계산기는 정책형 자기진단 도구입니다. 실제 심사에서는 정책모기지 예외, 자행대환 조건, 업권별 기준, 내부 심사 규정이 추가로 반영될 수 있습니다.',
    },
  ],
  howTo: [
    {
      name: '연소득 입력',
      text: '세전 기준 연소득을 입력합니다. DSR 계산의 분모가 되는 값입니다.',
    },
    {
      name: '보유 대출 추가',
      text: '보유 대출별로 잔액, 금리, 남은 만기, 상환 방식, 금리 구조를 입력합니다.',
    },
    {
      name: '신규 대출 시나리오 입력',
      text: '주담대 또는 신용대출을 선택하고 희망 금액, 금리, 만기, 금리 구조를 입력합니다.',
    },
    {
      name: '정책 버전 선택',
      text: '적용하려는 정책 버전을 선택해 현재 DSR과 스트레스 DSR 계산 기준을 맞춥니다.',
    },
    {
      name: '결과 확인',
      text: '현재 DSR, 스트레스 DSR, 보유 대출 연간 원리금, 가능한 신규 대출 한도를 확인합니다.',
    },
  ],
  applicationCategory: 'FinanceApplication',
  estimatedTime: 'PT2M',
  tools: ['웹 브라우저'],
  relatedTools: ['loan-calculator', 'savings-calculator'],
} satisfies ToolManifest;
