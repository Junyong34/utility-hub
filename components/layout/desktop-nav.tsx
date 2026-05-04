'use client';

import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NAV_ITEMS } from './nav-config';
import { Logo } from './logo';

export function DesktopNav() {
  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 w-full border-b border-hairline-soft bg-canvas/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-8">
        {/* 로고 */}
        <Link href="/">
          <Logo size={32} />
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 우측 정보 영역 */}
        <div className="flex items-center space-x-2">
          {/* 모바일 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {NAV_ITEMS.map(item => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
