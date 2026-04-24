import { demoInboxItems } from "@/lib/demo-data";
import type { InboxItem } from "@/lib/types";

export async function getInboxItems(): Promise<InboxItem[]> {
  return demoInboxItems.map((item) => ({ ...item }));
}
