'use client';

import Link from 'next/link';
import {
  MapPinIcon,
  WrenchIcon,
  GiftIcon,
  BookOpenIcon,
  ArrowRightIcon,
  SunIcon,
  CloudRainIcon,
  BabyIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const hubCards = [
  {
    icon: MapPinIcon,
    title: '아이와 가볼 곳',
    description: '지역·연령·날씨 기준으로 장소를 빠르게 찾기',
    href: '/places',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    hoverColor: 'hover:border-emerald-500/50',
    badge: '서울·경기',
  },
  {
    icon: WrenchIcon,
    title: '육아 도구',
    description: '나들이 예산·연령 계산기와 금융 도구',
    href: '/tools',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hoverColor: 'hover:border-blue-500/50',
    badge: null,
  },
  {
    icon: GiftIcon,
    title: '혜택·지원금',
    description: '지역별 정부 지원과 절약 정보 정리',
    href: '/benefits',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    hoverColor: 'hover:border-orange-500/50',
    badge: null,
  },
  {
    icon: BookOpenIcon,
    title: '육아 가이드',
    description: '비교표와 체크리스트로 바로 판단하는 글',
    href: '/blog',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    hoverColor: 'hover:border-purple-500/50',
    badge: null,
  },
];

const quickFilters = [
  { label: '실내 놀이', icon: CloudRainIcon, href: '/places?indoor=true' },
  { label: '0~3세', icon: BabyIcon, href: '/places?age=1-3y' },
  { label: '야외 공원', icon: SunIcon, href: '/places?outdoor=true' },
];
// nuqs 파라미터 키: age | indoor | outdoor | free

export function ParentingHeroSection() {
  return (
    <section className="w-full pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── 좌: 메인 메시지 & CTA ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground w-fit">
              <span className="text-emerald-500">✦</span>
              <span>수도권 중심 · 실전 육아 가이드</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="text-foreground">아이와 갈 곳,</span>
                <br />
                <span className="text-emerald-500">조건별로 빠르게</span>
                <br />
                <span className="text-foreground">찾으세요</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              지역, 연령, 날씨, 예산 기준으로
              <br />
              주말 계획을 바로 정리해 드립니다.
            </p>

            {/* Primary CTA — Places */}
            <div className="flex flex-col gap-3">
              <Link href="/places">
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-foreground hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all group cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <MapPinIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">아이와 가볼 곳 찾기</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      서울 · 경기 남부 중심으로 먼저 정리
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/tools">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-foreground hover:border-primary/50 hover:bg-muted/50 transition-all group cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <WrenchIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">나들이 예산 계산기</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      입장료 · 식사 · 교통 비용 한 번에 정리
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {quickFilters.map(filter => {
                const Icon = filter.icon;
                return (
                  <Link key={filter.label} href={filter.href}>
                    <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer">
                      <Icon className="h-3 w-3" />
                      <span>{filter.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── 우: 허브 카드 2×2 ── */}
          <div className="grid grid-cols-2 gap-4">
            {hubCards.map(card => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href}>
                  <Card
                    className={`border-border/50 ${card.hoverColor} transition-all hover:shadow-lg group h-full`}
                  >
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div
                          className={`${card.bgColor} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <Icon className={`h-5 w-5 ${card.color}`} />
                        </div>
                        {card.badge && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            {card.badge}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">{card.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">
                          {card.description}
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
