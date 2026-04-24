export type Priority = "low" | "medium" | "high" | "urgent";

export type AdminItemStatus = "new" | "read" | "dismissed" | "archived";

export type AdminItemSource = "email" | "news" | "manual" | "system";

export interface AdminItemRecord {
  id: string;
  title: string;
  summary: string;
  category: string;
  priority: Priority;
  status: AdminItemStatus;
  source: AdminItemSource;
  dueDate?: string;
}

export interface InboxItem extends AdminItemRecord {
  sender: string;
  receivedAt: string;
  threadCount: number;
  requiresResponse: boolean;
}

export type BillStatus = "due-soon" | "scheduled" | "paid";

export interface BillRecord {
  id: string;
  name: string;
  vendor: string;
  amountDue: number;
  dueDate: string;
  autopay: boolean;
  category: "utility" | "insurance" | "subscription" | "housing" | "tax";
  status: BillStatus;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  publishedAt: string;
  category: "markets" | "policy" | "technology" | "personal-finance";
  priority: Priority;
}

export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";

export interface TaskItem {
  id: string;
  title: string;
  summary: string;
  category: "admin" | "finance" | "home" | "health";
  priority: Priority;
  status: TaskStatus;
  source: "manual" | "system";
  dueDate?: string;
  linkedRecordId?: string;
  estimateMinutes: number;
}

export interface DashboardBriefing {
  title: string;
  summary: string;
  generatedAt: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  tone: "calm" | "attention" | "good";
}

export interface DashboardQuickAction {
  id: string;
  label: string;
  href: string;
  description: string;
}

export interface DashboardData {
  briefing: DashboardBriefing;
  priorityItems: AdminItemRecord[];
  inboxPreview: InboxItem[];
  upcomingBills: BillRecord[];
  newsDigest: NewsItem[];
  tasks: TaskItem[];
  stats: DashboardStat[];
  quickActions: DashboardQuickAction[];
}
