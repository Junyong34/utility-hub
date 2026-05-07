'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from './nav-config';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 hidden px-4 md:block">
      <div className="mx-auto flex h-16 max-w-[67rem] items-center justify-between rounded-full border border-beige-deep/50 bg-canvas/82 px-8 shadow-[0_18px_42px_-36px_rgba(61,48,39,0.34)] backdrop-blur-lg">
        <Link
          href="/"
          aria-label="Zento 홈"
          className="text-2xl font-extrabold tracking-normal text-primary"
        >
          Zento
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          {NAV_ITEMS.map(item => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const label = item.href === '/places' ? '아이와 갈 곳' : item.name;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex h-16 items-center text-slate transition-colors hover:text-foreground',
                  isActive && 'font-semibold text-foreground'
                )}
              >
                {label}
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
