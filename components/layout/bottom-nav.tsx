"use client"

import * as React from "react"
import Link from "next/link"
import { NAV_ITEMS } from "./nav-config"
import { FloatingShareButton } from "@/components/ui/floating-share-button"

export function BottomNav() {
  const [activeItem, setActiveItem] = React.useState("/")

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4">
      {/* 메인 네비게이션 바 (긴 캡슐) */}
      <div className="flex items-center gap-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/40 rounded-full px-2 py-2 shadow-sm">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon!
          const isActive = activeItem === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.href)}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-6 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "text-primary shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* 배경 애니메이션 */}
              {isActive && (
                <span
                  className="absolute inset-0 bg-primary/10 rounded-full animate-scale-in"
                  style={{
                    animation: 'scaleIn 0.3s ease-out forwards'
                  }}
                />
              )}

              {/* 아이콘 및 텍스트 (relative로 배경 위에 표시) */}
              <Icon className={`h-5 w-5 relative z-10 transition-colors duration-300 ${isActive ? 'stroke-primary stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-medium leading-tight relative z-10">{item.name}</span>
            </Link>
          )
        })}
      </div>

      {/* 공유하기 버튼 (분리된 원형 버튼) - FloatingShareButton 사용 */}
      <FloatingShareButton className="static" />
    </nav>
  )
}
