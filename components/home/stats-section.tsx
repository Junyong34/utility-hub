"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  PaletteIcon,
  LayersIcon,
  TypeIcon,
  LayoutIcon,
  BarChartIcon,
  GridIcon,
} from "lucide-react"

const statsData = [
  {
    icon: LayersIcon,
    value: "57",
    label: "UI Styles",
    color: "text-blue-500",
  },
  {
    icon: PaletteIcon,
    value: "95",
    label: "Color Palettes",
    color: "text-purple-500",
  },
  {
    icon: TypeIcon,
    value: "56",
    label: "Font Pairings",
    color: "text-pink-500",
  },
  {
    icon: GridIcon,
    value: "8",
    label: "Tech Stacks",
    color: "text-cyan-500",
  },
  {
    icon: BarChartIcon,
    value: "24",
    label: "Chart Types",
    color: "text-orange-500",
  },
  {
    icon: LayoutIcon,
    value: "29",
    label: "Landing Patterns",
    color: "text-green-500",
  },
]

export function StatsSection() {
  return (
    <section className="w-full py-12 sm:py-16">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statsData.map((stat) => {
            const Icon = stat.icon

            return (
              <Card
                key={stat.label}
                className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                  {/* 아이콘 */}
                  <div className={`${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* 숫자 */}
                  <div className="text-3xl sm:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>

                  {/* 라벨 */}
                  <div className="text-sm text-muted-foreground text-center">
                    {stat.label}
                  </div>
                </CardContent>

                {/* 호버 효과 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
