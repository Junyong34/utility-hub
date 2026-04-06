import Link from 'next/link';
import {
  BuildingIcon,
  MapPinIcon,
  PiggyBankIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BENEFIT_CATEGORIES, OFFICIAL_BENEFIT_SOURCES } from '@/lib/benefits/config';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  building: BuildingIcon,
  'map-pin': MapPinIcon,
  'piggy-bank': PiggyBankIcon,
};

export function BenefitsHub() {
  return (
    <div className="space-y-12">
      {/* 헤더 */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">육아 혜택·지원금</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          혜택 & 지원
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          정부 지원, 지역 혜택, 절약 가이드를 공식 출처 기준으로 정리합니다.
          <br />
          기준 날짜와 출처를 함께 표기합니다.
        </p>
      </div>

      {/* 카테고리 카드 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">주제별 탐색</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BENEFIT_CATEGORIES.map(category => {
            const Icon = CATEGORY_ICONS[category.icon] ?? BuildingIcon;
            return (
              <Link key={category.id} href={`/blog?tag=${category.id}`}>
                <Card
                  className={`border-border/50 ${category.hoverColor} transition-all hover:shadow-lg group h-full`}
                >
                  <CardContent className="p-5 flex flex-col gap-3">
                    <div
                      className={`${category.bgColor} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        {category.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary mt-auto">
                      <span>글 보기</span>
                      <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 공식 소스 안내 */}
      <div className="border border-border/50 rounded-xl p-6 bg-muted/20">
        <h2 className="text-base font-semibold mb-1">정보 출처 안내</h2>
        <p className="text-xs text-muted-foreground mb-4">
          이 사이트의 혜택 정보는 아래 공식 소스를 기준으로 작성되며, 기준 날짜를 함께 표기합니다.
          제도 변경 시 즉시 갱신하고 있습니다.
        </p>
        <div className="flex flex-wrap gap-2">
          {OFFICIAL_BENEFIT_SOURCES.map(source => (
            <Link
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              <span>{source.name}</span>
              <ExternalLinkIcon className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>

      {/* 준비 중 안내 */}
      <div className="rounded-xl border border-border/50 bg-muted/20 px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          혜택 정보를 수집·검증 중입니다. 곧 공개됩니다.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline"
        >
          <span>블로그에서 먼저 확인하기</span>
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
