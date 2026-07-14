'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/ui/class-names';
import { NAV_ITEMS } from './nav-config';

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky inset-x-0 top-0 z-50 px-4 pt-3 md:fixed md:top-4 md:pt-0">
      <div className="mr-auto flex h-14 w-fit max-w-[67rem] items-center justify-start rounded-full border border-beige-deep/50 bg-canvas/82 px-5 shadow-[0_18px_42px_-36px_rgba(61,48,39,0.34)] backdrop-blur-lg md:mx-auto md:h-16 md:w-auto md:justify-between md:px-8">
        <Link
          href="/"
          aria-label="Zento 홈"
          className="text-xl font-extrabold tracking-normal text-primary md:text-2xl"
        >
          Zento
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
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

        <span className="hidden w-[92px] md:block" aria-hidden="true" />
      </div>
    </header>
  );
}
