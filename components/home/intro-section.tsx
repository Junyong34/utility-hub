"use client"

import * as React from "react"
import Link from "next/link"
import { Logo } from "@/components/layout/logo"

export function IntroSection() {
  return (
    <section className="w-full">
      {/* 상단 로고/제목 (메인 페이지 전용) */}
      <div className="max-w-screen-2xl mx-auto px-4 pt-6">
        <Link href="/" className="flex items-center justify-center">
          <Logo size={48} className="text-xl" />
        </Link>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-20">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* 메인 타이틀 */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Zento</span>
              <br />
              <span className="text-foreground">일상에 유용한 정보 허브</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              유용한 정보부터 편리한 도구, 맛있는 밀키트 리뷰까지
              <br />
              생활에 필요한 모든 것을 한곳에서
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
