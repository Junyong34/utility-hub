import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, MailIcon, ShieldAlertIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  generateMetadata as createMetadata,
  createPageStructuredData,
  createFAQSchema,
} from '@/lib/seo'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'
import { getAllToolConfigs } from '@/lib/tools'
import type { ToolConfig, ToolFAQItem } from '@/lib/tools/types'

interface FaqItem {
  question: string
  answer: string
}

type ToolFAQSection = {
  key: string
  title: string
  items: FaqItem[]
}

type ToolFAQGroup = {
  key: string
  title: string
  toolId: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Zento는 어떤 사이트인가요?',
    answer:
      'Zento는 일상과 업무에 바로 도움이 되는 유용한 정보와 꿀팁, 그리고 실용적인 도구를 무료로 제공하는 웹사이트입니다. AI 프롬프트, 주차정보, 로또, 투자 등 다양한 주제의 블로그와 함께 대출, 예금, DSR, 주택 구입 비용 등 금융 계산기를 제공합니다.',
  },
  {
    question: '어떤 계산기 도구를 제공하나요?',
    answer:
      '대출·중도상환수수료 계산기, 예금·적금 계산기, DSR 계산기, 주택 구입 비용 계산기를 제공합니다. 모든 계산기는 회원가입 없이 무료로 사용할 수 있으며, 실시간으로 정확한 결과를 확인할 수 있습니다.',
  },
  {
    question: 'AI 로또 번호 추천은 어떻게 작동하나요?',
    answer:
      'AI 가중 통계 추천과 확률통계 6전략(고빈도/저빈도/미출현/균형/핫/콜드)을 제공합니다. 랜덤, 날짜, MBTI, 행운번호, 슬롯 방식으로 번호를 생성할 수 있으며, 최대 5게임까지 동시 생성 가능합니다. 생성된 번호는 로컬 저장되며 공유 링크로 다른 사람과 공유할 수 있습니다.',
  },
  {
    question: '블로그에는 어떤 카테고리가 있나요?',
    answer:
      '주차, AI(AI 이미지 생성), 개발, 소비자 정보, 투자, 로또 등 다양한 주제의 카테고리로 구성되어 있습니다. 각 카테고리별로 실용적인 정보와 꿀팁을 제공하며, 지속적으로 새로운 콘텐츠를 업데이트하고 있습니다.',
  },
  {
    question: 'DSR 계산기로 무엇을 확인할 수 있나요?',
    answer:
      '연소득 대비 총부채원리금상환비율(DSR)과 스트레스 DSR을 계산하고, 보유 대출과 신규 대출 조건을 반영해 가능한 신규 대출 한도를 확인할 수 있습니다. 주택담보대출과 신용대출 시나리오를 모두 지원하며, 수도권·지방 정책 차이도 반영합니다.',
  },
  {
    question: '주택 구입 비용 계산기는 어떤 비용을 계산하나요?',
    answer:
      '집 살 때 필요한 취득세, 중개보수(복비), 등기비용, 국민주택채권, 법무사 비용 등 모든 부대비용을 자동으로 계산합니다. 대출 금액을 반영한 실제 자기자본과 필요 현금을 확인할 수 있으며, 조정대상지역 및 생애최초 특례도 적용됩니다.',
  },
  {
    question: '도구는 무료로 사용할 수 있나요?',
    answer:
      '네. 모든 도구는 회원가입이나 로그인 없이 완전히 무료로 사용할 수 있습니다. 별도의 사용 제한이나 유료 기능은 없습니다.',
  },
  {
    question: '새 콘텐츠는 얼마나 자주 업데이트되나요?',
    answer:
      '블로그 콘텐츠와 도구 기능을 지속적으로 업데이트하고 있습니다. 실사용 빈도가 높은 주제를 중심으로 새로운 정보와 도구를 추가하며, 기존 콘텐츠도 최신 정보를 반영해 보완합니다.',
  },
  {
    question: '문의나 협력 제안은 어디로 보내면 되나요?',
    answer:
      '페이지 하단의 문의 및 협력 안내를 통해 wnsdyd21@gmail.com으로 이메일을 보내주시면 확인 후 답변드리겠습니다.',
  },
  {
    question: '모바일에서도 사용할 수 있나요?',
    answer:
      '네. Zento는 반응형 UI를 적용해 모바일, 태블릿, 데스크톱 등 모든 기기에서 최적화된 환경으로 사용할 수 있습니다.',
  },
]

const GENERAL_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'FAQ 페이지의 답변은 최종 공식 안내서로 볼 수 있나요?',
    answer:
      'FAQ는 사용 가이드 중심의 안내 문서입니다. 금융 상품의 실제 조건, 복권 정책, 제도 변화는 공식 기관·금융기관의 최신 안내가 우선이며, 최종 판단은 해당 공식 채널을 반드시 확인해 주세요.',
  },
  {
    question: '결과값이 화면에서 바뀌지 않으면 어떻게 해야 하나요?',
    answer:
      '입력값(금액/금리/기간/기간 단위)이 유효 범위인지 먼저 확인해 보세요. 일부 툴은 숫자 파싱 실패 시 기존 상태를 유지할 수 있어, 입력란을 한번 비운 뒤 다시 입력하거나 페이지를 새로고침하고 재입력하면 정상 처리되는 경우가 있습니다.',
  },
  {
    question: '툴별 결과를 다시 불러오려면 어떤 기준을 써야 하나요?',
    answer:
      '대부분의 계산기는 입력 상태 기준으로 실시간 재계산되며, 공유 링크 기반으로 이동한 경우 URL의 파라미터가 기준값이 됩니다. 로컬 저장 기능이 있는 기능(예: 로또)은 브라우저 저장소를 통해 복원되므로 동일 기기·브라우저에서 확인이 가장 안정적입니다.',
  },
]

const TROUBLESHOOTING_ITEMS: FaqItem[] = [
  {
    question: '공유 링크를 눌렀는데 복사한 값이 유지되지 않습니다.',
    answer:
      '공유 링크는 현재 입력 상태를 URL 쿼리로 반영해 이동합니다. 긴 링크가 개행으로 깨지거나 중간에 인코딩이 변경되면 파싱이 실패할 수 있어, 링크 전체를 한 번에 복사했는지 확인하고 특수문자가 제거됐는지 점검해 보세요.',
  },
  {
    question: '숫자를 붙여넣으면 소수점이 3자리 이상으로 바뀌어 보여요.',
    answer:
      '표시 형식은 가독성 중심으로 반올림 처리될 수 있으나, 내부 계산은 입력 단위를 기준으로 동작합니다. 계산 의심 시 결과값을 복사해 실제 계산기 조건표와 비교해 주세요.',
  },
  {
    question: '모바일에서 버튼이 눌리지 않거나 폼이 밀립니다.',
    answer:
      '브라우저 확대 배율, 자동완성 폼, 키보드 입력 모드에 따라 인터랙션이 달라집니다. 화면 회전 후 재확인하거나 상단에서 새로고침한 뒤 다시 시도하면 많은 케이스가 해결됩니다.',
  },
  {
    question: '로또 추천 결과가 너무 자주 변합니다.',
    answer:
      '로또는 랜덤/통계 기반 여러 모드를 지원하므로 방식별로 생성 특성이 다릅니다. 동일 방식에서 같은 조건인지 확인하고, 랜덤 모드는 매 실행마다 결과가 변할 수 있다는 점을 참고해 주세요.',
  },
]

const DISCLAIMER_ITEMS: FaqItem[] = [
  {
    question: '금융 계산 결과의 법적 효력은 있나요?',
    answer:
      '아니요. 계산기는 참고용 도구로, 실제 금융 가입·심사 금액은 금융기관 약관, 상품 조건, 정책 변경, 지역별 요건에 따라 다릅니다. 본 사이트 결과는 의사결정의 보조 정보를 위한 값입니다.',
  },
  {
    question: '로또 번호 추천 결과는 당첨을 보장하나요?',
    answer:
      '아니요. 당첨은 완전 무작위 추첨이며, 본 결과는 참고/엔터테인먼트 목적입니다. 과도한 구매나 중독성 이용은 피하고 건전한 소비 습관을 지켜 주세요.',
  },
]

const FINANCE_TOOL_FAQ_GROUPS: ToolFAQGroup[] = [
  {
    key: 'loan-calculator',
    title: '대출 계산기 FAQ',
    toolId: 'loan-calculator',
  },
  {
    key: 'dsr-calculator',
    title: 'DSR 계산기 FAQ',
    toolId: 'dsr-calculator',
  },
  {
    key: 'savings-calculator',
    title: '예금·적금 계산기 FAQ',
    toolId: 'savings-calculator',
  },
  {
    key: 'home-buying-funds-calculator',
    title: '주택 구입 비용 계산기 FAQ',
    toolId: 'home-buying-funds-calculator',
  },
]

const RECREATION_TOOL_FAQ_GROUPS: ToolFAQGroup[] = [
  {
    key: 'lotto',
    title: '로또 번호 추천 FAQ',
    toolId: 'lotto',
  },
  {
    key: 'last-digit-game',
    title: '랜덤 스톱워치 게임 FAQ',
    toolId: 'last-digit-game',
  },
]

export const metadata: Metadata = createMetadata({
  title: '자주 묻는 질문',
  description:
    'Zento FAQ에서 서비스 이용 방법, 금융 계산기 사용법, 공유와 오류 대응, 면책 안내를 한 번에 확인하세요.',
  canonical: 'https://www.zento.kr/faq',
  keywords: [
    'FAQ',
    '자주 묻는 질문',
    'Zento',
    '도구 사용 가이드',
    'AI 프롬프트',
    '주차정보',
    '로또 추첨번호',
    '대출 계산기',
    'DSR 계산기',
    '예금 적금 계산기',
    '주택 구입 비용 계산기',
    '공유 링크',
    '계산기 오류',
    '면책 안내',
  ],
})

function buildToolFAQSections(
  toolConfigs: ToolConfig[],
  groups: ToolFAQGroup[],
): ToolFAQSection[] {
  return groups
    .map((group) => {
      const matched = toolConfigs.find((tool) => tool.id === group.toolId)
      if (!matched?.faq || matched.faq.length === 0) {
        return null
      }

      return {
        key: group.key,
        title: group.title,
        items: matched.faq.map((item: ToolFAQItem) => ({
          question: item.question,
          answer: item.answer,
        })),
      }
    })
    .filter(
      (section): section is ToolFAQSection =>
        section !== null && section.items.length > 0
    )
}

function FaqSection({
  section,
  idPrefix,
}: {
  section: ToolFAQSection
  idPrefix: string
}) {
  if (section.items.length === 0) {
    return null
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">{section.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {section.title} 관련 질문을 정리했습니다.
      </p>

      <Accordion type="single" className="mt-4 space-y-3">
        {section.items.map((item, index) => (
          <AccordionItem
            key={`${idPrefix}-${section.key}-${index}`}
            value={`faq-${section.key}-${index}`}
            className="border-border bg-card overflow-hidden rounded-xl border shadow-sm transition-all data-[state=open]:border-foreground/10 data-[state=open]:bg-muted/30 data-[state=open]:shadow-md"
          >
            <h3>
              <AccordionTrigger className="px-5 py-4">
                <span className="text-base font-semibold">{item.question}</span>
                <AccordionIndicator />
              </AccordionTrigger>
            </h3>

            <AccordionContent className="px-5 pb-5 text-muted-foreground leading-relaxed whitespace-pre-line">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}

export default function FaqPage() {
  const toolConfigs = getAllToolConfigs()
  const financeToolSections = buildToolFAQSections(
    toolConfigs,
    FINANCE_TOOL_FAQ_GROUPS
  )
  const recreationToolSections = buildToolFAQSections(
    toolConfigs,
    RECREATION_TOOL_FAQ_GROUPS
  )

  const { webPage, breadcrumb } = createPageStructuredData({
    name: '자주 묻는 질문',
    path: '/faq',
    description:
      'Zento 이용 전 자주 묻는 질문을 확인하세요. 유용한 정보와 꿀팁, 도구 사용, 문의 및 협력 방법을 제공합니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: 'FAQ' }],
  })

  const coreSections: ToolFAQSection[] = [
    {
      key: 'core',
      title: 'Zento 기본 안내',
      items: FAQ_ITEMS,
    },
    {
      key: 'general',
      title: '서비스 이용 가이드',
      items: GENERAL_FAQ_ITEMS,
    },
    {
      key: 'troubleshooting',
      title: '문제 해결 및 사용 주의',
      items: TROUBLESHOOTING_ITEMS,
    },
  ]

  const disclaimerSection: ToolFAQSection = {
    key: 'disclaimer',
    title: '면책 안내',
    items: DISCLAIMER_ITEMS,
  }

  const faqSchema = createFAQSchema([
    ...FAQ_ITEMS,
    ...GENERAL_FAQ_ITEMS,
    ...TROUBLESHOOTING_ITEMS,
    ...financeToolSections.flatMap((section) => section.items),
    ...recreationToolSections.flatMap((section) => section.items),
    ...disclaimerSection.items,
  ])

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, faqSchema]} />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ name: 'FAQ' }]} className="mb-4" />
            <h1 className="text-3xl font-bold text-foreground">
              자주 묻는 질문 (FAQ)
            </h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Zento의 유용한 정보와 꿀팁, 도구 이용 방법, 문의 및 협력
              안내를 한곳에 모았습니다.
            </p>
          </div>
        </header>

        <main className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold">FAQ 개요</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Zento FAQ는 사이트 이용, 각 계산기 사용, 공유 동작, 오류 대응,
              면책 사항까지 실사용 중심으로 정리했습니다. FAQ는 기능을 빠르게
              확인할 수 있는 가이드 역할입니다.
            </p>
          </Card>

          {coreSections.map((section) => (
            <FaqSection
              key={section.key}
              idPrefix="faq"
              section={section}
            />
          ))}

          <Card className="p-6">
            <h2 className="text-lg font-semibold">
              금융 계산기 FAQ 모음
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              계산기별 핵심 운영 정책과 사용 팁을 우선 정리했습니다.
            </p>
          </Card>

          {financeToolSections.map((section) => (
            <FaqSection
              key={`finance-${section.key}`}
              idPrefix="finance"
              section={section}
            />
          ))}

          <Card className="p-6">
            <h2 className="text-lg font-semibold">재미·추천형 기능 FAQ</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              로또/게임 섹션은 참고·오락 목적의 사용 가이드에 맞춰 확인하세요.
            </p>
          </Card>

          {recreationToolSections.map((section) => (
            <FaqSection
              key={`recreation-${section.key}`}
              idPrefix="game"
              section={section}
            />
          ))}

          <Card className="p-6 border-amber-300/60 bg-amber-50/70 dark:bg-amber-950/20">
            <div className="mb-3 flex items-center gap-2 text-amber-800 dark:text-amber-300">
              <ShieldAlertIcon className="h-4 w-4" />
              <h2 className="font-semibold">{disclaimerSection.title}</h2>
            </div>
            <Accordion type="single" className="space-y-3">
              {disclaimerSection.items.map((item, index) => (
                <AccordionItem
                  key={`disclaimer-${index}`}
                  value={`disclaimer-${index}`}
                  className="rounded-xl border border-amber-200/80 bg-card/70 dark:bg-card/30"
                >
                  <h3>
                    <AccordionTrigger className="px-4 py-3 text-left">
                      <span className="text-sm font-semibold">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                  </h3>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="border-primary/30 from-primary/10 via-card to-card p-0 bg-gradient-to-br">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <span className="bg-primary/15 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                  <MailIcon className="h-3.5 w-3.5" />
                  문의 및 협력
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    제휴/협업/버그 제보를 받고 있습니다
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    콘텐츠 제안, 협력, 기능 개선 제안, 버그 제보는
                    메일로 보내주시면 확인 후 답변드립니다.
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  wnsdyd21@gmail.com
                </p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="mailto:wnsdyd21@gmail.com">
                  메일 보내기
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">빠른 이동</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              자주 쓰는 페이지로 바로 이동하세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/tools" className="text-primary hover:underline">
                도구 모음
              </Link>
              <Link
                href="/tools/loan-calculator"
                className="text-primary hover:underline"
              >
                대출 계산기
              </Link>
              <Link href="/tools/dsr-calculator" className="text-primary hover:underline">
                DSR 계산기
              </Link>
              <Link
                href="/tools/savings-calculator"
                className="text-primary hover:underline"
              >
                예금·적금 계산기
              </Link>
              <Link
                href="/tools/home-buying-funds-calculator"
                className="text-primary hover:underline"
              >
                주택 구입 비용 계산기
              </Link>
              <Link href="/tools/lotto" className="text-primary hover:underline">
                로또 번호 추천
              </Link>
              <Link href="/tools/last-digit-game" className="text-primary hover:underline">
                랜덤 스톱워치 게임
              </Link>
              <Link href="/blog" className="text-primary hover:underline">
                블로그 전체 보기
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </>
  )
}
