import { getDemoBills } from "@/lib/demo-data";
import type { BillRecord } from "@/lib/types";

export async function getBills(): Promise<BillRecord[]> {
  return getDemoBills();
}
