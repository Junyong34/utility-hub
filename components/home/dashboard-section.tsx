import Link from 'next/link';
import { FlameIcon, ArrowRightIcon, CalendarIcon } from 'lucide-react';

import type { DashboardContentItem } from '@/types/home';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const FEATURED_BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  POPULAR: 'bg-green-500/10 text-green-500 border-green-500/20',
  GUIDE: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

const SOURCE_BADGE_STYLES: Record<DashboardContentItem['sourceLabel'], string> =
  {
    BLOG: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    TOOL: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  };

interface DashboardSectionProps {
  latestItems: DashboardContentItem[];
  hotItems: DashboardContentItem[];
}

function getFeaturedBadgeClass(badge?: string): string {
  if (!badge) {
    return 'bg-muted text-muted-foreground border-border';
  }

  return (
    FEATURED_BADGE_STYLES[badge] ??
    'bg-primary/10 text-primary border-primary/20'
  );
}

export function DashboardSection({
  latestItems,
  hotItems,
}: DashboardSectionProps) {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <CalendarIcon className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold">최신 콘텐츠</h2>
            </div>
            <div className="flex flex-col gap-3">
              {latestItems.map(item => (
                <Link key={item.id} href={item.href}>
                  <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={SOURCE_BADGE_STYLES[item.sourceLabel]}
                          >
                            {item.sourceLabel}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.publishedAt}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold leading-relaxed group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-end">
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <span>자세히 보기</span>
                            <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5">
              <FlameIcon className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-bold">핫한 정보</h2>
            </div>
            <div className="flex flex-col gap-3">
              {hotItems.map(item => (
                <Link key={item.id} href={item.href}>
                  <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className={SOURCE_BADGE_STYLES[item.sourceLabel]}
                          >
                            {item.sourceLabel}
                          </Badge>
                          {item.homeFeatured?.badge && (
                            <Badge
                              variant="outline"
                              className={getFeaturedBadgeClass(
                                item.homeFeatured.badge
                              )}
                            >
                              {item.homeFeatured.badge}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {item.publishedAt}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <span>자세히 보기</span>
                            <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
