import Link from 'next/link';
import type { BreadcrumbLink } from '@/types/navigation';

interface BreadcrumbProps {
  items: BreadcrumbLink[];
  className?: string;
}

/**
 * 빵부스러기 네비게이션 컴포넌트
 * SEO에 유용하며 사용자 경험 개선
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}
    >
      {/* 홈 링크 */}
      <Link href="/" className="hover:text-foreground transition-colors">
        홈
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1.5">
            <span>/</span>

            {item.url && !isLast ? (
              <Link
                href={item.url}
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={isLast ? 'font-medium text-foreground' : undefined}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.name}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * 블로그 포스트용 Breadcrumb
 * lib/blog/breadcrumb.ts의 헬퍼 함수를 사용하여 일관성 유지
 */
export function BlogBreadcrumb({
  categoryName,
  categorySlug
}: {
  categoryName: string;
  categorySlug: string;
}) {
  // 동적 import를 피하기 위해 직접 구현 (클라이언트 컴포넌트에서 사용 가능)
  return (
    <Breadcrumb
      items={[
        { name: '블로그', url: '/blog' },
        { name: categoryName, url: `/blog/${categorySlug}` },
      ]}
    />
  );
}

/**
 * 카테고리/태그용 Breadcrumb
 */
export function CategoryBreadcrumb({
  categoryName,
  categoryUrl,
}: {
  categoryName: string;
  categoryUrl?: string;
}) {
  return (
    <Breadcrumb
      items={[
        { name: '블로그', url: '/blog' },
        { name: categoryName, url: categoryUrl },
      ]}
    />
  );
}
