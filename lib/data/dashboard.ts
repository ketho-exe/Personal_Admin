import { getDemoDashboardData } from "@/lib/demo-data";
import type { DashboardData } from "@/lib/types";

export async function getDashboardData(): Promise<DashboardData> {
  return getDemoDashboardData();
}
