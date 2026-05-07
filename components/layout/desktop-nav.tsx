'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const DESKTOP_NAV_ITEMS = [
  { name: '홈', href: '/' },
  { name: '아이와 갈 곳', href: '/places' },
  { name: '도구', href: '/tools' },
  { name: '블로그', href: '/blog' },
  { name: '혜택', href: '/benefits' },
] as const;

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 hidden px-4 md:block">
      <div className="mx-auto flex h-16 max-w-[67rem] items-center justify-between rounded-full border border-beige-deep/55 bg-canvas/84 px-8 shadow-[0_18px_42px_-30px_rgba(61,48,39,0.72)] backdrop-blur-xl">
        <Link
          href="/"
          aria-label="Zento 홈"
          className="text-2xl font-extrabold tracking-normal text-primary"
        >
          Zento
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          {DESKTOP_NAV_ITEMS.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex h-16 items-center text-slate transition-colors hover:text-foreground',
                  isActive && 'font-semibold text-foreground'
                )}
              >
                {item.name}
                {isActive ? (
                  <span className="absolute right-0 bottom-3 left-0 h-0.5 rounded-full bg-primary" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <span className="w-[92px]" aria-hidden="true" />
      </div>
    </header>
  );
}
