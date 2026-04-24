import type {
  AdminItemRecord,
  BillRecord,
  DashboardData,
  DashboardQuickAction,
  DashboardStat,
  InboxItem,
  NewsItem,
  TaskItem
} from "@/lib/types";

const inboxItems: InboxItem[] = [
  {
    id: "inbox-bupa-claim",
    title: "Bupa claim needs one final receipt",
    summary: "Bupa can finish the reimbursement as soon as the physio receipt is attached.",
    category: "health",
    priority: "urgent",
    status: "new",
    source: "email",
    dueDate: "2026-04-25",
    sender: "Bupa Member Support",
    receivedAt: "2026-04-24T07:10:00.000Z",
    threadCount: 3,
    requiresResponse: true
  },
  {
    id: "inbox-letting-renewal",
    title: "Tenancy renewal draft arrived",
    summary: "The letting agent shared next year's tenancy terms with a 3.2% rent increase.",
    category: "housing",
    priority: "high",
    status: "new",
    source: "email",
    dueDate: "2026-04-29",
    sender: "Northline Lettings",
    receivedAt: "2026-04-23T18:42:00.000Z",
    threadCount: 2,
    requiresResponse: true
  },
  {
    id: "inbox-hmrc-confirmation",
    title: "HMRC payment confirmation",
    summary: "Your self assessment payment has been received and applied to this quarter.",
    category: "tax",
    priority: "medium",
    status: "read",
    source: "system",
    sender: "HMRC",
    receivedAt: "2026-04-22T12:05:00.000Z",
    threadCount: 1,
    requiresResponse: false
  }
];

const bills: BillRecord[] = [
  {
    id: "bill-energy",
    name: "Electricity",
    vendor: "Octopus Energy",
    amountDue: 118.42,
    dueDate: "2026-04-27",
    autopay: true,
    category: "utilities",
    status: "due-soon"
  },
  {
    id: "bill-council-tax",
    name: "Council tax",
    vendor: "Camden Council",
    amountDue: 164.0,
    dueDate: "2026-05-01",
    autopay: true,
    category: "housing",
    status: "scheduled"
  },
  {
    id: "bill-1password",
    name: "Password manager renewal",
    vendor: "1Password",
    amountDue: 64.99,
    dueDate: "2026-05-03",
    autopay: false,
    category: "subscriptions",
    status: "scheduled"
  }
];

const newsItems: NewsItem[] = [
  {
    id: "news-rates",
    title: "Sterling savings providers raise easy-access rates again",
    summary: "Several high street banks lifted rates ahead of month end, improving short-term cash options.",
    sourceName: "Financial Times",
    publishedAt: "2026-04-24T06:30:00.000Z",
    category: "personal-finance",
    priority: "high"
  },
  {
    id: "news-energy",
    title: "Ofgem outlines updated consumer protections before winter",
    summary: "The regulator said suppliers will face tighter service expectations during periods of market stress.",
    sourceName: "Reuters",
    publishedAt: "2026-04-24T05:15:00.000Z",
    category: "policy",
    priority: "medium"
  },
  {
    id: "news-mortgages",
    title: "Mortgage brokers expect lenders to keep repricing fixed deals",
    summary: "Higher gilt yields are feeding through to household borrowing costs more slowly than last autumn.",
    sourceName: "BBC News",
    publishedAt: "2026-04-23T20:20:00.000Z",
    category: "markets",
    priority: "medium"
  }
];

const tasks: TaskItem[] = [
  {
    id: "task-submit-receipt",
    title: "Upload physio receipt",
    summary: "Attach the final PDF so the Bupa claim can clear before the weekend.",
    category: "health",
    priority: "urgent",
    status: "todo",
    source: "system",
    dueDate: "2026-04-25",
    linkedRecordId: "inbox-bupa-claim",
    estimateMinutes: 10
  },
  {
    id: "task-review-tenancy",
    title: "Review tenancy renewal terms",
    summary: "Check the rent increase, break clause, and notice period before replying to the agent.",
    category: "housing",
    priority: "high",
    status: "in_progress",
    source: "system",
    dueDate: "2026-04-28",
    linkedRecordId: "inbox-letting-renewal",
    estimateMinutes: 25
  },
  {
    id: "task-reconcile-budget",
    title: "Reconcile April discretionary spending",
    summary: "Update the monthly budget and flag any categories that ran over target.",
    category: "finance",
    priority: "medium",
    status: "todo",
    source: "manual",
    dueDate: "2026-04-30",
    estimateMinutes: 30
  }
];

const priorityItems: AdminItemRecord[] = [
  {
    id: "priority-bupa-claim",
    title: "Finish the Bupa reimbursement",
    summary: "One missing receipt is blocking the claim and the upload deadline is tomorrow.",
    category: "health",
    priority: "urgent",
    status: "new",
    source: "email",
    dueDate: "2026-04-25"
  },
  {
    id: "priority-electricity",
    title: "Check the April electricity charge",
    summary: "This month's Octopus bill is above the recent average and worth reviewing before it drafts.",
    category: "utilities",
    priority: "high",
    status: "new",
    source: "system",
    dueDate: "2026-04-27"
  },
  {
    id: "priority-tenancy",
    title: "Respond to the tenancy renewal",
    summary: "The letting agent sent next year's terms and wants a decision before next week.",
    category: "housing",
    priority: "high",
    status: "new",
    source: "email",
    dueDate: "2026-04-29"
  }
];

const stats: DashboardStat[] = [
  { id: "stat-urgent", label: "Urgent items", value: "1", tone: "attention" },
  { id: "stat-bills", label: "Bills due in 7 days", value: "2", tone: "calm" },
  { id: "stat-tasks", label: "Open tasks", value: "3", tone: "calm" },
  { id: "stat-autopay", label: "Bills on autopay", value: "2 of 3", tone: "good" }
];

const quickActions: DashboardQuickAction[] = [
  {
    id: "action-inbox",
    label: "Triage inbox",
    href: "/inbox",
    description: "Clear high-priority messages and capture next steps."
  },
  {
    id: "action-bills",
    label: "Review bills",
    href: "/bills",
    description: "Double-check upcoming charges and autopay settings."
  },
  {
    id: "action-tasks",
    label: "Plan tasks",
    href: "/tasks",
    description: "Sequence admin work before the weekend gets busy."
  }
];

function cloneAdminItems(items: AdminItemRecord[]): AdminItemRecord[] {
  return items.map((item) => ({ ...item }));
}

function cloneInboxItems(items: InboxItem[]): InboxItem[] {
  return items.map((item) => ({ ...item }));
}

function cloneBills(items: BillRecord[]): BillRecord[] {
  return items.map((item) => ({ ...item }));
}

function cloneNews(items: NewsItem[]): NewsItem[] {
  return items.map((item) => ({ ...item }));
}

function cloneTasks(items: TaskItem[]): TaskItem[] {
  return items.map((item) => ({ ...item }));
}

function cloneStats(items: DashboardStat[]): DashboardStat[] {
  return items.map((item) => ({ ...item }));
}

function cloneQuickActions(items: DashboardQuickAction[]): DashboardQuickAction[] {
  return items.map((item) => ({ ...item }));
}

export function getDemoInboxItems(): InboxItem[] {
  return cloneInboxItems(inboxItems);
}

export function getDemoBills(): BillRecord[] {
  return cloneBills(bills);
}

export function getDemoNewsItems(): NewsItem[] {
  return cloneNews(newsItems);
}

export function getDemoTasks(): TaskItem[] {
  return cloneTasks(tasks);
}

export function getDemoDashboardData(): DashboardData {
  return {
    briefing: {
      title: "Good morning, your admin load looks focused today.",
      summary:
        "Three items deserve attention first: a Bupa reimbursement, a larger electricity charge, and a tenancy renewal that needs an answer before next week.",
      generatedAt: "2026-04-24T07:30:00.000Z"
    },
    priorityItems: cloneAdminItems(priorityItems),
    inboxPreview: getDemoInboxItems(),
    upcomingBills: getDemoBills(),
    newsDigest: getDemoNewsItems(),
    tasks: getDemoTasks(),
    stats: cloneStats(stats),
    quickActions: cloneQuickActions(quickActions)
  };
}
