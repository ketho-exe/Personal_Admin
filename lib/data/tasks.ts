import { demoTasks } from "@/lib/demo-data";
import type { TaskItem } from "@/lib/types";

export async function getTasks(): Promise<TaskItem[]> {
  return demoTasks.map((task) => ({ ...task }));
}
