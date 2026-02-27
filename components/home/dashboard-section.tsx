'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpenIcon,
  WrenchIcon,
  InfoIcon,
  CircleHelpIcon,
  FlameIcon,
  ArrowRightIcon,
  DicesIcon,
  FileTextIcon,
  CalendarIcon,
  BarChart3Icon,
} from 'lucide-react';
import { useVisitorStats } from '@/hooks/useVisitorStats';

// Hero Cards - 주요 페이지
const heroServices = [
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

// Hot Topics - 핫한 정보
const hotTopics = [
  {
    badge: 'NEW',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    title: 'SSG, SSR, CSR: 올바른 렌더링 전략 선택하기',
    href: '/blog/third-post',
  },
  {
    badge: 'POPULAR',
    badgeColor: 'bg-green-500/10 text-green-500 border-green-500/20',
    title: 'Radix UI로 구축하는 접근성 높은 컴포넌트',
    href: '/blog/second-post',
  },
  {
    badge: 'GUIDE',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    title: 'Next.js와 TypeScript로 시작하는 현대적인 웹 개발',
    href: '/blog/first-post',
  },
];

// Quick Access
const quickTools = [
  {
    icon: DicesIcon,
    name: '로또',
    href: '/tools/lotto',
    color: 'text-purple-500',
  },
  { icon: FileTextIcon, name: '블로그', href: '/blog', color: 'text-blue-500' },
  { icon: InfoIcon, name: 'About', href: '/about', color: 'text-orange-500' },
  { icon: CircleHelpIcon, name: 'FAQ', href: '/faq', color: 'text-green-500' },
];

// Recent Posts
const recentPosts = [
  {
    id: 1,
    title: 'SSG, SSR, CSR: 올바른 렌더링 전략 선택하기',
    date: '2024-02-01',
    href: '/blog/third-post',
  },
  {
    id: 2,
    title: 'Radix UI로 구축하는 접근성 높은 컴포넌트',
    date: '2024-01-22',
    href: '/blog/second-post',
  },
  {
    id: 3,
    title: 'Next.js와 TypeScript로 시작하는 현대적인 웹 개발',
    date: '2024-01-15',
    href: '/blog/first-post',
  },
];

interface StatCard {
  value: string;
  label: string;
  color: string;
}

const staticStatsData: StatCard[] = [
  { value: '3', label: 'Blog Posts', color: 'text-blue-500' },
  { value: '1', label: 'Tools', color: 'text-green-500' },
];

const numberFormatter = new Intl.NumberFormat('ko-KR');

function formatUpdatedAt(value: string, timeZone: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleString('ko-KR', {
    timeZone,
    hour12: false,
  });
}

export function DashboardSection() {
  // 1) API 상태 수신: pending이면 대시, 실패면 "데이터 준비 중"으로 폴백
  const { data: visitorResponse, isPending } = useVisitorStats();
  const visitorData = visitorResponse?.data;
  const visitorFallbackValue = isPending ? '—' : '데이터 준비 중';

  // 2) 통계 카드 구성: 동적 2개(오늘/누적) + 기존 정적 2개
  const statsData: StatCard[] = [
    {
      value: visitorData
        ? numberFormatter.format(visitorData.todayVisitors)
        : visitorFallbackValue,
      label: '오늘 방문자',
      color: 'text-cyan-500',
    },
    {
      value: visitorData
        ? numberFormatter.format(visitorData.totalVisitors)
        : visitorFallbackValue,
      label: '누적 방문자',
      color: 'text-orange-500',
    },
    ...staticStatsData,
  ];

  // 3) 업데이트 시각은 데이터가 있을 때만 계산
  const updatedAt = visitorData
    ? formatUpdatedAt(visitorData.lastUpdatedAt, visitorData.timeZone)
    : null;

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 space-y-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3Icon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">한눈에 보기</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statsData.map(stat => (
              <Card
                key={stat.label}
                className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <div
                    className={`${stat.value === '데이터 준비 중' ? 'text-base' : 'text-4xl'} font-bold ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-right text-xs text-muted-foreground">
            {/* 4) 하단 상태 문구: 성공/로딩/실패를 명확히 분기 */}
            {updatedAt
              ? `업데이트: ${updatedAt}${visitorResponse?.stale ? ' (캐시 데이터)' : ''}`
              : isPending
                ? '방문자 데이터를 불러오는 중입니다.'
                : '방문자 데이터 준비 중'}
          </p>
        </div>
        {/* Hero Cards - 주요 서비스 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {heroServices.map(service => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href}>
                <Card
                  className={`relative overflow-hidden border-border/50 ${service.hoverColor} transition-all hover:shadow-lg group h-full`}
                >
                  <CardHeader>
                    <div
                      className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      바로가기
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                  {/* 호버 효과 배경 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Hot Topics - 핫한 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FlameIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold">핫한 정보</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotTopics.map((topic, index) => (
              <Link key={index} href={topic.href}>
                <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group h-full">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Badge
                        variant="outline"
                        className={`${topic.badgeColor} font-medium`}
                      >
                        {topic.badge}
                      </Badge>
                      <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        <span>자세히 보기</span>
                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <WrenchIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">빠른 이동</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickTools.map(tool => {
              const Icon = tool.icon;
              return (
                <Link key={tool.name} href={tool.href}>
                  <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                      <div className="p-3 rounded-full bg-muted group-hover:scale-110 transition-transform">
                        <Icon className={`h-8 w-8 ${tool.color}`} />
                      </div>
                      <span className="text-sm font-medium">{tool.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">최신 글</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <Link key={post.id} href={post.href}>
                <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <CardContent className="p-6 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-base leading-relaxed group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {post.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span>읽어보기</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
      </div>
    </section>
  );
}
