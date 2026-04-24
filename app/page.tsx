import { BillSummary } from "@/components/dashboard/bill-summary";
import { BriefingHero } from "@/components/dashboard/briefing-hero";
import { NewsSummary } from "@/components/dashboard/news-summary";
import { PriorityList } from "@/components/dashboard/priority-list";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { getDashboardData } from "@/lib/data/dashboard";

export default async function HomePage() {
  const data = await getDashboardData();

  return (
    <div className="px-5 py-5 md:px-8 md:py-8 xl:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <BriefingHero
          briefing={data.briefing}
          inboxPreview={data.inboxPreview}
          stats={data.stats}
          tasks={data.tasks}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.9fr)]">
          <PriorityList items={data.priorityItems} tasks={data.tasks} />
          <QuickActions actions={data.quickActions} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.65fr)]">
          <BillSummary bills={data.upcomingBills} />
          <NewsSummary items={data.newsDigest} />
        </div>
      </div>
    </div>
  );
}
