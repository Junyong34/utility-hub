import { IntroSection } from "@/components/home/intro-section"
import { DashboardSection } from "@/components/home/dashboard-section"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <IntroSection />
      <DashboardSection />
    </main>
  )
}