import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FlameIcon,
  ArrowRightIcon,
  CalendarIcon,
} from 'lucide-react';

const HOT_BADGES = [
  { badge: 'NEW',     badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { badge: 'POPULAR', badgeColor: 'bg-green-500/10 text-green-500 border-green-500/20' },
  { badge: 'GUIDE',   badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
];

interface RecentPost {
  slug: string;
  title: string;
  date: string;
  categorySlug: string;
}

interface DashboardSectionProps {
  recentPosts: RecentPost[];
}

export function DashboardSection({ recentPosts }: DashboardSectionProps) {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 최신 글 */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <CalendarIcon className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold">최신 글</h2>
            </div>
            <div className="flex flex-col gap-3">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.categorySlug}/${post.slug}`}>
                  <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold leading-relaxed group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <span>읽어보기</span>
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

          {/* 핫한 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <FlameIcon className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-bold">핫한 정보</h2>
            </div>
            <div className="flex flex-col gap-3">
              {recentPosts.map((post, index) => {
                const { badge, badgeColor } = HOT_BADGES[index] ?? HOT_BADGES[0];
                return (
                  <Link key={post.slug} href={`/blog/${post.categorySlug}/${post.slug}`}>
                    <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <Badge
                            variant="outline"
                            className={`${badgeColor} font-medium text-xs`}
                          >
                            {badge}
                          </Badge>
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                            <span>자세히 보기</span>
                            <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
