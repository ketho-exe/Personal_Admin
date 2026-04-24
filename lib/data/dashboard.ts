import { demoDashboardData } from "@/lib/demo-data";
import type { DashboardData } from "@/lib/types";

export async function getDashboardData(): Promise<DashboardData> {
  return {
    ...demoDashboardData,
    briefing: { ...demoDashboardData.briefing },
    priorityItems: demoDashboardData.priorityItems.map((item) => ({ ...item })),
    inboxPreview: demoDashboardData.inboxPreview.map((item) => ({ ...item })),
    upcomingBills: demoDashboardData.upcomingBills.map((bill) => ({ ...bill })),
    newsDigest: demoDashboardData.newsDigest.map((item) => ({ ...item })),
    tasks: demoDashboardData.tasks.map((task) => ({ ...task })),
    stats: demoDashboardData.stats.map((stat) => ({ ...stat })),
    quickActions: demoDashboardData.quickActions.map((action) => ({ ...action }))
  };
}
