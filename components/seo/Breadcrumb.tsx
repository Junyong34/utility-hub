import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
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
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      {/* 홈 아이콘 */}
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="홈"
      >
        <Home size={16} />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight size={16} className="text-gray-400" />

            {item.url && !isLast ? (
              <Link
                href={item.url}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className={isLast ? 'text-gray-900 font-medium' : 'text-gray-500'}
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
 */
export function BlogBreadcrumb({ postTitle }: { postTitle: string }) {
  return (
    <Breadcrumb
      items={[
        { name: '블로그', url: '/blog' },
        { name: postTitle },
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
