import { getDemoTasks } from "@/lib/demo-data";
import type { TaskItem } from "@/lib/types";

export async function getTasks(): Promise<TaskItem[]> {
  return getDemoTasks();
}
