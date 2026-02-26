import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import {
  generateMetadata as createMetadata,
  createPageStructuredData,
} from '@/lib/seo'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'

export const metadata: Metadata = createMetadata({
  title: 'Zento 소개',
  description:
    'Zento는 복잡한 정보를 단순하게 정리해 전달하는 정보/도구 플랫폼입니다.',
  canonical: 'https://www.zento.kr/about',
  keywords: ['Zento', '사이트 소개', '정보 허브', '웹 도구'],
})

export default function AboutPage() {
  const { webPage, breadcrumb } = createPageStructuredData({
    name: 'Zento 소개',
    path: '/about',
    description:
      'Zento는 복잡한 정보를 단순하게 정리해 전달하는 정보/도구 플랫폼입니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '소개' }],
  })

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ name: '소개' }]} className="mb-4" />
            <h1 className="text-3xl font-bold text-foreground">About Zento</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Zento는 일상과 개발에서 자주 마주치는 정보를 쉽고 빠르게
              이해할 수 있도록 정리하고, 바로 활용 가능한 도구와 함께 제공하는
              서비스입니다.
            </p>
          </div>
        </header>

        <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">우리가 제공하는 것</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>1. 핵심만 빠르게 파악할 수 있는 블로그 콘텐츠</li>
              <li>2. 바로 실행 가능한 실용 도구 모음</li>
              <li>3. 검색과 공유에 최적화된 구조화된 정보</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">운영 원칙</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>1. 정확성: 검증 가능한 정보를 우선합니다.</li>
              <li>2. 명확성: 복잡한 개념을 이해하기 쉽게 전달합니다.</li>
              <li>3. 실용성: 바로 써볼 수 있는 형태로 제공합니다.</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">주요 페이지 바로가기</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/blog" className="text-primary hover:underline">
                블로그
              </Link>
              <Link href="/tools" className="text-primary hover:underline">
                도구 모음
              </Link>
              <Link href="/faq" className="text-primary hover:underline">
                FAQ
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </>
  )
}
