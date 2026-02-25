"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon, MoonIcon, SunIcon, SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NAV_ITEMS } from "./nav-config"
import { Logo } from "./logo"

export function Header() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="hidden md:block fixed top-4 left-0 right-0 z-50 w-full px-4">
      <div className="mx-auto max-w-4xl flex h-14 items-center justify-between px-6 rounded-full border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        {/* 로고 */}
        <Link href="/">
          <Logo size={32} />
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 우측 정보 영역 */}
        <div className="flex items-center space-x-2">
          {/* 다크모드 토글 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
          >
            {theme === "light" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* 포인트 */}
          <div className="hidden sm:flex items-center space-x-1 rounded-full bg-muted px-3 py-1.5">
            <SparklesIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">33 tS</span>
          </div>

          {/* Premium 버튼 */}
          <Button className="hidden sm:inline-flex">
            Premium
          </Button>

          {/* 모바일 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {NAV_ITEMS.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
