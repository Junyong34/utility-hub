'use client';

import Link from 'next/link';
import {
  BookOpenIcon,
  WrenchIcon,
  InfoIcon,
  CircleHelpIcon,
  ArrowRightIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useVisitorStats } from '@/hooks/useVisitorStats';

const serviceCards = [
  {
    icon: BookOpenIcon,
    title: 'Blog Posts',
    description: '유용한 정보와 지식을 공유합니다',
    href: '/blog',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverColor: 'hover:border-blue-500/50',
  },
  {
    icon: WrenchIcon,
    title: 'Tools',
    description: '편리한 계산기와 유틸리티 도구',
    href: '/tools',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    hoverColor: 'hover:border-green-500/50',
  },
  {
    icon: InfoIcon,
    title: 'About',
    description: 'Zento 소개와 운영 원칙',
    href: '/about',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    hoverColor: 'hover:border-orange-500/50',
  },
  {
    icon: CircleHelpIcon,
    title: 'FAQ',
    description: '자주 묻는 질문과 빠른 답변',
    href: '/faq',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    hoverColor: 'hover:border-purple-500/50',
  },
];

const numberFormatter = new Intl.NumberFormat('ko-KR');

interface HeroSplitSectionProps {
  totalBlogPosts?: number;
  totalTools?: number;
  toolNames?: string[];
}

export function HeroSplitSection({ totalBlogPosts = 0, totalTools = 0, toolNames = [] }: HeroSplitSectionProps) {
  const { data: visitorResponse, isPending } = useVisitorStats();
  const visitorData = visitorResponse?.data;
  const fallback = isPending ? '—' : '—';

  const statPills = [
    {
      label: '오늘 방문자',
      value: visitorData ? numberFormatter.format(visitorData.todayVisitors) : fallback,
    },
    {
      label: '누적 방문자',
      value: visitorData ? numberFormatter.format(visitorData.totalVisitors) : fallback,
    },
    { label: '글', value: `${totalBlogPosts}편` },
    { label: '도구', value: `${totalTools}개` },
  ];

  return (
    <section className="w-full pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── 좌: 브랜드 메시지 & CTA ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground w-fit">
              <span className="text-primary">✦</span>
              <span>Zen + Info · 정보 허브</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-primary">Zento</span>
                <br />
                <span className="text-foreground">생활의 모든 것</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-sm">
              유용한 정보부터 편리한 도구, 자주 묻는 질문까지
              <br />
              생활에 필요한 모든 것을 한곳에서
            </p>

            {/* CTA Rows */}
            <div className="flex flex-col gap-3">
              {/* Primary CTA — Blog */}
              <Link href="/blog">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-foreground hover:border-primary/50 hover:bg-muted/50 transition-all group cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <BookOpenIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">블로그 읽기</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      최신 글 · 개발 / AI
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Secondary CTA — Tools */}
              <Link href="/tools">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-foreground hover:border-primary/50 hover:bg-muted/50 transition-all group cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <WrenchIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">도구 사용하기</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {toolNames.join(' · ')}
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-2">
              {statPills.map(pill => (
                <div
                  key={pill.label}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                >
                  <span>{pill.label}</span>
                  <span className="font-semibold text-foreground">
                    {pill.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 우: 서비스 카드 2×2 ── */}
          <div className="grid grid-cols-2 gap-4">
            {serviceCards.map(service => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href}>
                  <Card
                    className={`border-border/50 ${service.hoverColor} transition-all hover:shadow-lg group h-full`}
                  >
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div
                        className={`${service.bgColor} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`h-5 w-5 ${service.color}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">
                          {service.title}
                        </div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {service.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-primary mt-auto">
                        <span>바로가기</span>
                        <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
