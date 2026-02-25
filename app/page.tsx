import { IntroSection } from "@/components/home/intro-section"
import { StatsSection } from "@/components/home/stats-section"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <IntroSection />
      <StatsSection />
    </main>
  )
}