import { IntroSection } from "@/components/home/intro-section"
import { DashboardSection } from "@/components/home/dashboard-section"
import { getAllPosts } from "@/lib/blog/posts"

export default function Page() {
  const totalBlogPosts = getAllPosts().length;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 상단 영역 */}
        <div className="absolute top-5 left-[10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-22 right-[45%] w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-35 left-[60%] w-72 h-72 bg-sky-500/15 rounded-full blur-3xl" />

        {/* 중앙 영역 */}
        <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-[10%] w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-[10%] w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl" />

        {/* 하단 영역 */}
        <div className="absolute bottom-32 left-[15%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[30%] w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-24 left-[85%] w-72 h-72 bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <IntroSection />
      <DashboardSection totalBlogPosts={totalBlogPosts} />
    </main>
  )
}