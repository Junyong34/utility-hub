"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, PlayIcon, SparklesIcon } from "lucide-react"

const techBadges = [
  { name: "Claude Code", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  { name: "Cursor", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { name: "Windsurf", color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
  { name: "Anthropic", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { name: "GitHub Copilot", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
  { name: "v0", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  { name: "Codia", color: "bg-pink-500/10 text-pink-500 border-pink-500/20" },
  { name: "Qodo", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
]

export function IntroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* 상단 로고/제목 (메인 페이지 전용) */}
      <div className="max-w-screen-2xl mx-auto px-4 pt-6">
        <Link href="/" className="flex items-center justify-center space-x-2">
          <SparklesIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">
            <span className="text-primary">유용한</span> 정보 허브
          </span>
        </Link>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 py-20 sm:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* 기술 뱃지들 */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {techBadges.map((badge) => (
              <Badge
                key={badge.name}
                variant="outline"
                className={`${badge.color} px-3 py-1 text-xs font-medium`}
              >
                {badge.name}
              </Badge>
            ))}
          </div>

          {/* 메인 타이틀 */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-primary">유용한 정보 허브</span>
              <br />
              <span className="text-foreground">생활을 더 편리하게</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              일상과 개발에 유용한 팁과 정보를 한곳에.
              당신의 생산성을 높이는 유틸리티 모음.
            </p>
          </div>

          {/* 터미널 코드 스니펫 */}
          <div className="bg-slate-900 text-slate-100 px-6 py-3 rounded-lg font-mono text-sm">
            <span className="text-green-400">$</span> pnpm init --ai antigrav4
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="text-base px-8">
              How it Works
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              <PlayIcon className="mr-2 h-4 w-4" />
              View Demos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
