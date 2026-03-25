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
    description: 'Zento는 정보 탐색, 실행, 정리, 공유까지 이어지는 실무형 사용 플로우를 한 곳에서 경험할 수 있게 만든 웹 플랫폼입니다.',
    details: [
      '블로그에서는 개념/팁/실전 가이드를 제공하고, 툴에서 바로 입출력을 처리해 즉시 확인할 수 있습니다.',
      '도구별 URL 상태 관리로 결과 공유가 쉬워, 링크 복사 한 번으로 동일한 입력값을 재현할 수 있습니다.',
      '구조화 데이터와 내부 링크로 검색/탐색에 유리한 페이지 설계를 유지합니다.',
    ],
  },
  {
    title: '어떤 상황에 유용한가요?',
    description: '일회성 계산보다 반복 작업이 있는 상황에서 시간을 줄이고 오해를 막는 데 초점을 맞췄습니다.',
    details: [
      '금리·대출 조건 비교 전에 빠르게 금액 감각을 잡고 싶을 때',
      '로또 번호 추출 규칙을 테스트하거나 시뮬레이션 기반으로 기록할 때',
      '공유 받은 링크의 동일 조건 재확인을 빠르게 할 때',
    ],
  },
  {
    title: '신뢰성 운영 방식',
    description: '콘텐츠와 계산 결과의 오해를 줄이기 위해 설명·경고·FAQ를 한 번에 확인할 수 있게 구성합니다.',
    details: [
      '결과 수치의 성격(참고용/의사결정 보조)을 명확히 구분해 제공합니다.',
      '정책, 금리, 게임성 성격 등 민감 주제는 주의 문구를 고정 탭으로 노출합니다.',
      '공통 FAQ와 툴별 FAQ를 분리해 문제 해결과 사용법 학습이 각각 바로 이어지도록 설계합니다.',
    ],
  },
]

const GUIDE_STEPS: FlowStep[] = [
  {
    number: 1,
    title: '주제를 찾는다',
    description: '블로그/FAQ에서 배경지식을 먼저 확인해 용어와 전제 조건을 맞춥니다.',
  },
  {
    number: 2,
    title: '툴을 실행한다',
    description: '원하는 도구를 활용하여 유용한 정보 및 팁을 얻어가세요.',
  },
  {
    number: 3,
    title: '링크로 공유한다',
    description: '입력값이 반영된 결과 URL을 보내 같은 조건을 팀/가족/동료와 즉시 공유합니다.',
  },
]

const STATS_HIGHLIGHTS: Highlight[] = [
  {
    icon: BlocksIcon,
    title: '정보와 도구의 연결',
    description: '콘텐츠만 읽는 단계에서 끝나지 않고 바로 실행 가능한 도구로 이어집니다.',
  },
  {
    icon: CpuIcon,
    title: '실행 중심 설계',
    description: '복잡한 기준을 한 번에 정리해 입력 → 출력 → 확인까지 바로 체감되는 동선을 제공합니다.',
  },
  {
    icon: LightbulbIcon,
    title: '문제 해결 중심 UX',
    description: '공통/도구별 FAQ를 통해 흔한 오류를 먼저 해결하고, 다음 행동으로 연결됩니다.',
  },
  {
    icon: ShieldCheckIcon,
    title: '안전한 안내',
    description: '면책, 주의사항, 사용 한계를 명시해 오해가 생길 여지를 줄입니다.',
  },
]

export const metadata: Metadata = createMetadata({
  title: 'Zento 소개',
  description:
    'Zento 소개 페이지: 블로그, 금융 계산기, 로또/재미형 도구를 한 곳에 묶은 실용형 정보 허브의 목적, 구성, 이용 방식, 신뢰 가이드를 설명합니다.',
  canonical: 'https://www.zento.kr/about',
  keywords: [
    'Zento 소개',
    '정보 허브',
    '유틸리티 웹사이트',
    '금융 계산기',
    '로또 번호 생성기',
    'FAQ',
    '블로그',
    '도구 사용법',
    'URL 공유',
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
    description: 'Zento는 정보 탐색 후 즉시 실행 가능한 툴 사용까지 이어지는 실무형 웹 플랫폼입니다.',
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
              Zento는 정보 탐색의 마지막까지를 아우르는 구조를 갖춘 사이트입니다. 블로그에서 배경을 이해하고,
              도구에서 실행 결과를 확인한 뒤, 필요하면 링크를 통해 결과를 바로 공유해 빠르게 협업할 수 있도록 설계했습니다.
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
                금융 계산기와 로또 기능은 물론, 여러 유틸리티를 같은 방식으로 사용할 수 있어 학습→실행→검증 흐름을 빠르게 반복할 수 있습니다.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">핵심 경로</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">블로그/FAQ로 배경 이해</span>
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">도구로 실행/확인</span>
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">결과 확인·공유</span>
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
