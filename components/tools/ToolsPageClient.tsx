'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  SearchIcon,
  ArrowRightIcon,
  WrenchIcon,
  XIcon,
  RotateCcwIcon,
} from 'lucide-react';
import { Breadcrumb } from '@/components/seo';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import type { ToolCategory, ToolListItem } from '@/lib/tools/types';
import { getToolIcon } from '@/lib/tools';
import { cn } from '@/shared/ui/class-names';

type CategoryKey = ToolCategory | 'all';

type ToolVisualStyle = {
  tile: string;
  overlay: string;
};

const FEATURED_TOOL_IDS = [
  'home-buying-funds-calculator',
  'savings-calculator',
  'dsr-calculator',
] as const;

const FEATURED_TOOL_LIMIT = 3;
const FEATURED_TOOL_ID_SET = new Set<string>(FEATURED_TOOL_IDS);

// badge 타입별 색상 스타일
function getBadgeClassName(badge: string): string {
  const lowerBadge = badge.toLowerCase();

  if (lowerBadge === 'new' || lowerBadge === '신규') {
    return 'border-primary/40 bg-primary/10 text-primary';
  }
  if (lowerBadge === 'popular' || lowerBadge === '인기') {
    return 'border-sunshine-700/50 bg-sunshine-700/12 text-sunshine-900 dark:text-sunshine-300';
  }
  if (lowerBadge === 'beta' || lowerBadge === '베타') {
    return 'border-beige-deep bg-cream text-foreground';
  }
  if (lowerBadge === 'updated' || lowerBadge === '업데이트') {
    return 'border-yellow-saturated/70 bg-yellow-saturated/20 text-foreground';
  }

  // 기본 스타일
  return 'border-hairline bg-cream-soft text-foreground';
}

const badgeMicroClassName =
  'h-4 min-h-0 rounded-[4px] px-1.5 py-0 text-[10px] font-semibold leading-none';

const TOOL_VISUAL_STYLES: Record<string, ToolVisualStyle> = {
  'loan-calculator': {
    tile: 'bg-teal-700 text-white ring-1 ring-teal-800/15',
    overlay: 'bg-teal-600',
  },
  'dsr-calculator': {
    tile: 'bg-indigo-700 text-white ring-1 ring-indigo-800/15',
    overlay: 'bg-indigo-600',
  },
  'savings-calculator': {
    tile: 'bg-emerald-700 text-white ring-1 ring-emerald-800/15',
    overlay: 'bg-emerald-600',
  },
  lotto: {
    tile: 'bg-violet-700 text-white ring-1 ring-violet-800/15',
    overlay: 'bg-violet-600',
  },
  'last-digit-game': {
    tile: 'bg-rose-700 text-white ring-1 ring-rose-800/15',
    overlay: 'bg-rose-600',
  },
  pomodoro: {
    tile: 'bg-sky-700 text-white ring-1 ring-sky-800/15',
    overlay: 'bg-sky-600',
  },
  'home-buying-funds-calculator': {
    tile: 'bg-blue-700 text-white ring-1 ring-blue-800/15',
    overlay: 'bg-blue-600',
  },
};

const CATEGORY_VISUAL_STYLES: Record<ToolCategory, ToolVisualStyle> = {
  calculator: {
    tile: 'bg-teal-700 text-white ring-1 ring-teal-800/15',
    overlay: 'bg-teal-600',
  },
  generator: {
    tile: 'bg-violet-700 text-white ring-1 ring-violet-800/15',
    overlay: 'bg-violet-600',
  },
  converter: {
    tile: 'bg-cyan-700 text-white ring-1 ring-cyan-800/15',
    overlay: 'bg-cyan-600',
  },
  utility: {
    tile: 'bg-sky-700 text-white ring-1 ring-sky-800/15',
    overlay: 'bg-sky-600',
  },
  other: {
    tile: 'bg-slate-700 text-white ring-1 ring-slate-800/15',
    overlay: 'bg-slate-600',
  },
};

function getToolVisualStyle(tool: ToolListItem): ToolVisualStyle {
  return (
    TOOL_VISUAL_STYLES[tool.id] ??
    CATEGORY_VISUAL_STYLES[tool.category ?? 'other']
  );
}

function getFeaturedTools(tools: ToolListItem[]): ToolListItem[] {
  const toolById = new Map(tools.map(tool => [tool.id, tool]));
  const curatedTools = FEATURED_TOOL_IDS.flatMap(id => {
    const tool = toolById.get(id);
    return tool ? [tool] : [];
  });
  const fallbackTools = tools.filter(
    tool => tool.badge && !FEATURED_TOOL_ID_SET.has(tool.id)
  );

  return [...curatedTools, ...fallbackTools].slice(0, FEATURED_TOOL_LIMIT);
}

const CATEGORY_CONFIG: { value: CategoryKey; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'calculator', label: '계산기' },
  { value: 'generator', label: '생성기' },
  { value: 'converter', label: '변환기' },
  { value: 'utility', label: '유틸리티' },
  { value: 'other', label: '기타' },
];

interface ToolsPageClientProps {
  tools: ToolListItem[];
}

export function ToolsPageClient({ tools }: ToolsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const trimmedSearchQuery = searchQuery.trim();

  // ── 카테고리별 도구 수 계산 ──
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    tools.forEach(tool => {
      const cat = tool.category ?? 'other';
      counts[cat] = (counts[cat] ?? 0) + 1;
    });
    return counts;
  }, [tools]);

  // 도구가 1개 이상인 카테고리만 표시 (전체 포함)
  const visibleCategories = CATEGORY_CONFIG.filter(
    cat => cat.value === 'all' || (categoryCounts[cat.value] ?? 0) > 0
  );

  // 장소 탐색 이후 이어질 가능성이 높은 계산 도구를 먼저 노출한다.
  const featuredTools = useMemo(() => getFeaturedTools(tools), [tools]);

  // 검색 + 카테고리 필터 적용
  const filteredTools = useMemo(() => {
    let result = [...tools];
    if (activeCategory !== 'all') {
      result = result.filter(t => (t.category ?? 'other') === activeCategory);
    }
    if (trimmedSearchQuery) {
      const q = trimmedSearchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [tools, activeCategory, trimmedSearchQuery]);

  const isFiltered = activeCategory !== 'all' || trimmedSearchQuery !== '';
  const showFeatured = !isFiltered && featuredTools.length > 0;
  const activeCategoryLabel =
    CATEGORY_CONFIG.find(category => category.value === activeCategory)
      ?.label ?? '전체';
  const resultTitle = isFiltered ? '검색 결과' : '모든 도구';
  const resultSummary = isFiltered
    ? [
        trimmedSearchQuery ? `"${trimmedSearchQuery}"` : null,
        activeCategory !== 'all' ? activeCategoryLabel : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : '전체 도구를 한눈에 비교해보세요';
  const distinctCategoryCount = CATEGORY_CONFIG.filter(
    c => c.value !== 'all' && (categoryCounts[c.value] ?? 0) > 0
  ).length;
  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* ── Hero Search ── */}
      <section className="pb-5 pt-0">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: '도구' }]} className="mb-4" />

        {/* Hero Box */}
        <div className="rounded-lg border border-hairline-soft bg-cream-soft px-6 py-8 text-left backdrop-blur-sm sm:text-center">
          {/* Eyebrow */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-beige-deep bg-cream px-3 py-1 text-xs text-slate">
            <WrenchIcon className="h-3 w-3 text-primary" />
            Zento Tools · 장소 탐색 다음 단계에서 쓰는 계산·비교 도구
          </span>

          {/* Title */}
          <h1 className="font-editorial mb-2 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            필요한 계산과 비교를{' '}
            <span className="text-primary">찾아보세요</span>
          </h1>
          <p className="mx-auto mb-6 w-full max-w-[38rem] text-sm leading-relaxed text-muted-foreground">
            아이와 나들이 예산부터 생활비·금융 판단까지, 다음 행동에 바로
            연결되는 계산을 빠르게 정리합니다. 추천·실험형 도구도 한곳에서
            확인할 수 있습니다.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-4 w-full max-w-[32rem]">
            <label htmlFor="tools-search" className="sr-only">
              도구 검색
            </label>
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="tools-search"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="도구 검색... (예: 예산, 대출, DSR, 주택, 로또)"
                className="h-10 bg-background pl-8 pr-10"
              />
              {searchQuery ? (
                <button
                  type="button"
                  aria-label="검색어 지우기"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-cream-soft hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Stat row */}
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-xs text-muted-foreground sm:justify-center">
            <span>
              전체 <strong className="text-foreground">{tools.length}개</strong>{' '}
              도구
            </span>
            <span>·</span>
            <span>
              카테고리{' '}
              <strong className="text-foreground">
                {distinctCategoryCount}개
              </strong>
            </span>
            <span>·</span>
            <span>장소 탐색 뒤 바로 쓰는 도구를 계속 보강 중</span>
          </div>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="pb-6">
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map(cat => (
            <button
              key={cat.value}
              type="button"
              aria-pressed={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-md border px-3.5 py-1.5 text-sm font-medium transition-all',
                activeCategory === cat.value
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {cat.label}
              <span
                className={cn(
                  'rounded-sm border px-1.5 text-xs font-semibold leading-5',
                  activeCategory === cat.value
                    ? 'border-primary-foreground/70 bg-primary-foreground text-primary'
                    : 'border-primary/15 bg-primary/10 text-primary-deep'
                )}
              >
                {categoryCounts[cat.value] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 주요 도구 (필터 없을 때만 표시) ── */}
      {showFeatured && (
        <section className="pb-20 sm:pb-6" aria-label="주요 도구 바로가기">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">바로 쓰는 도구</h2>
              <Badge
                variant="outline"
                className={cn(
                  badgeMicroClassName,
                  'border-primary/20 bg-primary/10 text-primary-deep'
                )}
              >
                추천 {featuredTools.length}개
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              예산과 조건 판단 위주로 먼저 묶었습니다.
            </p>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {featuredTools.map(tool => {
              const Icon = getToolIcon(tool.iconName);
              const visual = getToolVisualStyle(tool);
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  aria-label={`${tool.name} 바로가기`}
                  className="group flex min-h-20 min-w-[17.5rem] items-center gap-3 rounded-lg border border-hairline-soft bg-card px-3 py-3 text-sm transition-all duration-200 hover:border-primary/30 hover:bg-cream-soft/60 hover:shadow-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 sm:min-w-0"
                >
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-md',
                      visual.tile
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 flex min-w-0 items-center gap-1.5">
                      <span className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                        {tool.name}
                      </span>
                      {tool.badge && (
                        <Badge
                          variant="outline"
                          className={cn(
                            badgeMicroClassName,
                            'shrink-0',
                            getBadgeClassName(tool.badge)
                          )}
                        >
                          {tool.badge}
                        </Badge>
                      )}
                    </span>
                    <span className="line-clamp-1 text-xs leading-relaxed text-muted-foreground">
                      {tool.description}
                    </span>
                  </span>
                  <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 전체 도구 그리드 ── */}
      <section
        className="pb-8"
        aria-label={isFiltered ? '도구 검색 결과' : '모든 도구'}
      >
        <div
          className={cn(
            'flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-end sm:justify-between',
            isFiltered ? 'mb-36' : 'mb-4'
          )}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{resultTitle}</h2>
              <Badge
                variant="outline"
                className="h-5 rounded-[4px] border-primary/15 bg-primary/8 px-2 text-xs text-primary-deep"
              >
                {filteredTools.length}개
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {resultSummary}
            </p>
          </div>
          {isFiltered ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-fit gap-1.5"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              필터 초기화
            </Button>
          ) : null}
        </div>

        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <SearchIcon className="mb-4 h-10 w-10 opacity-25" />
            <p className="mb-1 text-base font-medium">검색 결과가 없습니다</p>
            <p className="text-sm">다른 검색어나 카테고리를 시도해 보세요.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="mt-5 gap-1.5"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              전체 도구 보기
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map(tool => {
              const Icon = getToolIcon(tool.iconName);
              const visual = getToolVisualStyle(tool);
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  <Card className="relative h-full cursor-pointer overflow-hidden py-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    {/* hover 그라데이션 오버레이 */}
                    <div
                      className={cn(
                        'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]',
                        visual.overlay
                      )}
                    />
                    <CardContent className="flex h-full flex-col p-5">
                      {/* 아이콘 + 배지 */}
                      <div className="mb-3 flex items-start justify-between">
                        <div
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
                            visual.tile
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {tool.badge && (
                          <Badge
                            variant="outline"
                            className={cn(
                              badgeMicroClassName,
                              'shrink-0',
                              getBadgeClassName(tool.badge)
                            )}
                          >
                            {tool.badge}
                          </Badge>
                        )}
                      </div>

                      <h3 className="mb-1.5 text-base font-bold transition-colors group-hover:text-primary">
                        {tool.name}
                      </h3>
                      <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                        {tool.description}
                      </p>

                      <div className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                        사용하기
                        <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── CTA Card ── */}
      <section className="pb-10">
        <Card className="relative w-full overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-sunshine-500/10 py-0">
          <CardContent className="w-full p-8 text-center md:p-10">
            <h2 className="mb-2 whitespace-nowrap text-xl font-bold md:text-2xl">
              원하는 도구가 없나요?
            </h2>
            <p className="mx-auto mb-6 w-full max-w-[28rem] break-keep text-center text-sm leading-relaxed text-muted-foreground">
              도구 제안 방법과 이용 기준은 FAQ에서 확인할 수 있습니다.
            </p>
            <Button size="lg" asChild>
              <Link href="/faq">
                FAQ에서 확인하기
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
