import { demoNewsItems } from "@/lib/demo-data";
import type { NewsItem } from "@/lib/types";

export async function getNewsItems(): Promise<NewsItem[]> {
  return demoNewsItems.map((item) => ({ ...item }));
}
