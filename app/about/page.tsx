import type { Metadata } from 'next'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { ArrowRightIcon, BlocksIcon, CpuIcon, FileTextIcon, LightbulbIcon, ShieldCheckIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'
import {
  generateMetadata as createMetadata,
  createPageStructuredData,
} from '@/lib/seo'

interface AboutSection {
  title: string
  description: string
  details: string[]
}

interface FlowStep {
  number: number
  title: string
  description: string
}

interface Highlight {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

const HIGH_LEVEL_SECTIONS: AboutSection[] = [
  {
    title: '무엇을 제공하나요?',
    description: 'Zento는 사기 전, 가기 전, 신청하기 전에 필요한 판단 기준을 빠르게 정리해주는 실전형 사이트입니다.',
    details: [
      '블로그에서는 주차, 소비자 비교, 비용 판단에 도움이 되는 가이드를 비교표와 체크리스트 중심으로 정리합니다.',
      '도구에서는 대출, 저축, DSR, 주택 구입 비용처럼 실제 돈이 걸린 계산을 빠르게 확인할 수 있습니다.',
      '콘텐츠를 읽고 끝나는 것이 아니라, 계산과 비교까지 이어져 바로 의사결정에 쓰이도록 설계합니다.',
    ],
  },
  {
    title: '어떤 상황에 유용한가요?',
    description: '검색 결과를 많이 읽어도 결론이 잘 안 나는 순간, 기준을 한 장으로 정리해 주는 쪽에 초점을 맞췄습니다.',
    details: [
      '공항이나 역 주차를 앞두고 총비용과 이동 동선을 함께 비교하고 싶을 때',
      '소비자원 비교 결과를 실제 구매 판단에 맞게 해석하고 싶을 때',
      '대출, 저축, 집 살 때 필요한 비용을 계산기로 빠르게 가늠하고 싶을 때',
    ],
  },
  {
    title: '어떻게 신뢰를 쌓나요?',
    description: '단순 요약보다 출처, 적용 조건, 예외를 함께 보여줘서 오해를 줄이는 방식으로 운영합니다.',
    details: [
      '공식 기관·공개 자료를 우선 출처로 삼고, 변동 가능성이 있는 정보는 별도로 표시합니다.',
      '계산 결과는 참고용인지 실제 신청 전 검토용인지 성격을 분명히 나눠 설명합니다.',
      '공통 FAQ와 도구별 FAQ를 나눠 사용법과 주의사항을 빠르게 확인할 수 있게 구성합니다.',
    ],
  },
]

const GUIDE_STEPS: FlowStep[] = [
  {
    number: 1,
    title: '상황을 찾는다',
    description: '블로그와 FAQ에서 내 상황에 맞는 기준과 전제 조건을 먼저 확인합니다.',
  },
  {
    number: 2,
    title: '계산하고 비교한다',
    description: '관련 도구를 열어 금액, 조건, 총비용을 빠르게 계산하고 비교합니다.',
  },
  {
    number: 3,
    title: '결정 전에 다시 확인한다',
    description: '공유 링크나 체크리스트로 같은 조건을 다시 보며 실수를 줄입니다.',
  },
]

const STATS_HIGHLIGHTS: Highlight[] = [
  {
    icon: BlocksIcon,
    title: '가이드와 도구의 연결',
    description: '읽고 끝나는 글이 아니라, 바로 계산하고 비교하는 도구로 이어집니다.',
  },
  {
    icon: CpuIcon,
    title: '비용 판단 중심 설계',
    description: '복잡한 조건을 한 번에 정리해 입력 → 계산 → 비교까지 바로 이어지게 구성합니다.',
  },
  {
    icon: LightbulbIcon,
    title: '비교표와 체크리스트',
    description: '숫자와 선택 기준을 함께 보여줘서 결론을 내리기 쉽게 돕습니다.',
  },
  {
    icon: ShieldCheckIcon,
    title: '출처와 한계 표시',
    description: '주의사항과 적용 조건을 함께 적어 오해가 생길 여지를 줄입니다.',
  },
]

export const metadata: Metadata = createMetadata({
  title: 'Zento 소개',
  description:
    'Zento 소개 페이지: 주차, 소비자 비교, 비용 계산 중심의 실전 생활 가이드 사이트가 무엇을 다루고 어떤 기준으로 정보를 정리하는지 설명합니다.',
  canonical: 'https://www.zento.kr/about',
  keywords: [
    'Zento 소개',
    '생활 가이드',
    '비용 비교',
    '주차 비교',
    '소비자 비교',
    '비용 계산',
    '도구 사용법',
    'FAQ',
  ],
})

function AboutCard({ section }: { section: AboutSection }) {
  return (
    <Card className="space-y-3 p-6">
      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
      <p className="text-muted-foreground leading-relaxed">{section.description}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {section.details.map((detail) => (
          <li key={detail} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default function AboutPage() {
  const { webPage, breadcrumb } = createPageStructuredData({
    name: 'Zento 소개',
    path: '/about',
    description: 'Zento는 비용과 선택을 빠르게 정리해주는 실전 생활 가이드 사이트입니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '소개' }],
  })

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />

      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/80">
          <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 sm:px-6 lg:px-8">
            <Badge variant="secondary">Zento Overview</Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Zento에 대해</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              Zento는 생활 속 의사결정에서 가장 자주 부딪히는 문제를 빠르게 정리하는 사이트입니다.
              블로그에서는 비교와 판단 기준을 읽고, 도구에서는 비용과 조건을 계산해 바로 다음 행동으로 이어질 수 있게 설계했습니다.
            </p>
            <Breadcrumb items={[{ name: '소개' }]} />
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STATS_HIGHLIGHTS.map((item) => {
              const Icon = item.icon

              return (
                <Card
                  key={item.title}
                  className="border border-border/70 p-5 transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex items-center gap-2 text-primary">
                    <Icon className="h-4 w-4" />
                    <h2 className="font-semibold">{item.title}</h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              )
            })}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Zento 핵심 소개</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {HIGH_LEVEL_SECTIONS.map((section) => (
                <AboutCard key={section.title} section={section} />
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-[1fr_1fr]">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">일반 이용 흐름</h2>
              <ol className="mt-4 space-y-3">
                {GUIDE_STEPS.map((step) => (
                  <li key={step.number} className="rounded-lg border border-border/70 p-3">
                    <p className="text-sm font-semibold text-foreground">{step.number}. {step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6">
              <h2 className="text-xl font-semibold">한눈에 보는 안내</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                핵심 축은 비용 계산과 비교입니다. 일부 추천·실험형 기능도 함께 운영하지만, 메인 목적은 생활 판단을 빠르게 돕는 것입니다.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">핵심 경로</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">가이드로 기준 확인</span>
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">도구로 계산·비교</span>
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">결정 전 다시 검토</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/tools" className="inline-flex items-center">
                    툴 둘러보기
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/faq" className="inline-flex items-center">
                    FAQ 확인하기
                    <FileTextIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">자주 가는 바로가기</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              원하는 기능으로 이동해 바로 시작하세요.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href="/tools" className="text-primary underline-offset-4 hover:underline">
                전체 도구 보기
              </Link>
              <Link href="/blog" className="text-primary underline-offset-4 hover:underline">
                블로그 보기
              </Link>
              <Link href="/tools/lotto" className="text-primary underline-offset-4 hover:underline">
                로또 번호 추천
              </Link>
              <Link href="/tools/loan-calculator" className="text-primary underline-offset-4 hover:underline">
                대출 계산기
              </Link>
              <Link href="/tools/dsr-calculator" className="text-primary underline-offset-4 hover:underline">
                DSR 계산기
              </Link>
              <Link href="/tools/savings-calculator" className="text-primary underline-offset-4 hover:underline">
                적금/저축 계산기
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </>
  )
}
