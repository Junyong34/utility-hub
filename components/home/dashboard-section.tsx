"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpenIcon,
  WrenchIcon,
  UtensilsCrossedIcon,
  FlameIcon,
  ArrowRightIcon,
  DicesIcon,
  CalculatorIcon,
  TrendingUpIcon,
  CoinsIcon,
  StarIcon,
} from "lucide-react"

// Hero Cards - 3개 주요 서비스
const heroServices = [
  {
    icon: BookOpenIcon,
    title: "Blog Posts",
    description: "유용한 정보와 지식을 공유합니다",
    href: "/blog",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    hoverColor: "hover:border-blue-500/50",
  },
  {
    icon: WrenchIcon,
    title: "Tools",
    description: "편리한 계산기와 유틸리티 도구",
    href: "/tools",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    hoverColor: "hover:border-green-500/50",
  },
  {
    icon: UtensilsCrossedIcon,
    title: "Meal Kit Reviews",
    description: "실제 구매 후기와 맛있는 레시피",
    href: "/mealkit",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    hoverColor: "hover:border-orange-500/50",
  },
]

// Hot Topics - 핫한 정보
const hotTopics = [
  {
    badge: "NEW",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    title: "2024년 대출 금리 비교 가이드",
    href: "/blog/loan-guide-2024",
  },
  {
    badge: "HOT",
    badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
    title: "이번주 밀키트 베스트 3",
    href: "/mealkit/weekly-best",
  },
  {
    badge: "POPULAR",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    title: "로또 당첨 확률 분석",
    href: "/blog/lotto-analysis",
  },
]

// Quick Access Tools
const quickTools = [
  { icon: DicesIcon, name: "로또", href: "/tools/lotto", color: "text-purple-500" },
  { icon: CalculatorIcon, name: "대출", href: "/tools/loan", color: "text-blue-500" },
  { icon: TrendingUpIcon, name: "이자", href: "/tools/interest", color: "text-green-500" },
  { icon: CoinsIcon, name: "환율", href: "/tools/exchange", color: "text-yellow-500" },
]

// Recent Meal Kit Reviews (더미 데이터)
const recentMealKits = [
  {
    id: 1,
    name: "마라샹궈 밀키트",
    rating: 4.5,
    image: "🌶️",
    href: "/mealkit/1",
  },
  {
    id: 2,
    name: "소고기 미역국",
    rating: 5.0,
    image: "🥘",
    href: "/mealkit/2",
  },
  {
    id: 3,
    name: "치킨까스",
    rating: 4.0,
    image: "🍗",
    href: "/mealkit/3",
  },
]

// Stats Overview
const statsData = [
  { value: "42", label: "Blog Posts", color: "text-blue-500" },
  { value: "15", label: "Tools", color: "text-green-500" },
  { value: "28", label: "Meal Kit Reviews", color: "text-orange-500" },
  { value: "156", label: "Users", color: "text-purple-500" },
]

export function DashboardSection() {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-screen-2xl mx-auto px-4 space-y-12">
        {/* Hero Cards - 3개 주요 서비스 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {heroServices.map((service) => {
            const Icon = service.icon
            return (
              <Link key={service.title} href={service.href}>
                <Card
                  className={`relative overflow-hidden border-border/50 ${service.hoverColor} transition-all hover:shadow-lg group h-full`}
                >
                  <CardHeader>
                    <div className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                      바로가기
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                  {/* 호버 효과 배경 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Hot Topics - 핫한 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FlameIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold">핫한 정보</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotTopics.map((topic, index) => (
              <Link key={index} href={topic.href}>
                <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group h-full">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Badge variant="outline" className={`${topic.badgeColor} font-medium`}>
                        {topic.badge}
                      </Badge>
                      <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        <span>자세히 보기</span>
                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access Tools */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <WrenchIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">자주 찾는 도구</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickTools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.name} href={tool.href}>
                  <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md group">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                      <div className="p-3 rounded-full bg-muted group-hover:scale-110 transition-transform">
                        <Icon className={`h-8 w-8 ${tool.color}`} />
                      </div>
                      <span className="text-sm font-medium">{tool.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Meal Kit Reviews */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <UtensilsCrossedIcon className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">최근 밀키트 리뷰</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentMealKits.map((mealkit) => (
              <Link key={mealkit.id} href={mealkit.href}>
                <Card className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <CardContent className="p-6 space-y-4">
                    {/* 이미지 플레이스홀더 (이모지) */}
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      {mealkit.image}
                    </div>
                    {/* 제품명 */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                        {mealkit.name}
                      </h3>
                      {/* 별점 */}
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">{mealkit.rating}/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUpIcon className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">한눈에 보기</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statsData.map((stat) => (
              <Card
                key={stat.label}
                className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <div className={`text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
