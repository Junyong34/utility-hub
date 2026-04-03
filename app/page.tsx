import { HeroSplitSection } from '@/components/home/hero-split-section';
import { DashboardSection } from '@/components/home/dashboard-section';
import { getAllPosts } from '@/lib/blog/posts';
import { getAllToolConfigs } from '@/lib/tools';
import { buildDashboardContent } from '@/lib/home/dashboard-content';

export default function Page() {
  const allPosts = getAllPosts();
  const toolConfigs = getAllToolConfigs();
  const { latestItems, hotItems } = buildDashboardContent(
    allPosts,
    toolConfigs
  );

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* 상단 영역 */}
        <div className="absolute top-5 left-[10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-22 right-[45%] w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-35 left-[60%] w-72 h-72 bg-sky-500/15 rounded-full blur-3xl" />

        {/* 우측 영역 */}
        <div className="absolute top-1/3 right-[5%] w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-[5%] w-80 h-80 bg-fuchsia-500/15 rounded-full blur-3xl" />

        {/* 하단 영역 */}
        <div className="absolute bottom-32 left-[15%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[30%] w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
      </div>

      <HeroSplitSection
        totalBlogPosts={allPosts.length}
        totalTools={toolConfigs.length}
      />
      <DashboardSection latestItems={latestItems} hotItems={hotItems} />
    </main>
  );
}
