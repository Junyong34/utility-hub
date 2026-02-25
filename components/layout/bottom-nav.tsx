"use client"

import * as React from "react"
import Link from "next/link"
import { Share2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS } from "./nav-config"

export function BottomNav() {
  const [activeItem, setActiveItem] = React.useState("/")

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "유용한 정보 허브",
          text: "일상과 개발에 유용한 팁과 정보 모음",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Share failed:", error)
      }
    } else {
      // Fallback: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 복사되었습니다!")
    }
  }

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
              className={`flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-full transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium leading-tight">{item.name}</span>
            </Link>
          )
        })}
      </div>

      {/* 공유하기 버튼 (분리된 원형 버튼) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        className="rounded-full h-14 w-14 bg-background/95 hover:bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border/40 shadow-sm shrink-0"
      >
        <Share2Icon className="h-5 w-5 text-foreground" />
        <span className="sr-only">Share</span>
      </Button>
    </nav>
  )
}
