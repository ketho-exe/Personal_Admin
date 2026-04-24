import { getDemoNewsItems } from "@/lib/demo-data";
import type { NewsItem } from "@/lib/types";

export async function getNewsItems(): Promise<NewsItem[]> {
  return getDemoNewsItems();
}
