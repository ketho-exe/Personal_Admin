import type {
  AdminItemRecord,
  BillRecord,
  DashboardData,
  InboxItem,
  NewsItem,
  TaskItem
} from "@/lib/types";

export const demoInboxItems: InboxItem[] = [
  {
    id: "inbox-anthem-claim",
    title: "Insurance claim follow-up needed",
    summary: "Anthem needs one receipt uploaded before reimbursement can be approved.",
    category: "health",
    priority: "urgent",
    status: "new",
    source: "email",
    dueDate: "2026-04-25",
    sender: "Anthem Claims",
    receivedAt: "2026-04-24T07:10:00.000Z",
    threadCount: 3,
    requiresResponse: true
  },
  {
    id: "inbox-landlord-renewal",
    title: "Lease renewal draft arrived",
    summary: "Property manager shared next year's renewal terms with a 3.2% increase.",
    category: "housing",
    priority: "high",
    status: "new",
    source: "email",
    dueDate: "2026-04-29",
    sender: "Northline Property Group",
    receivedAt: "2026-04-23T18:42:00.000Z",
    threadCount: 2,
    requiresResponse: true
  },
  {
    id: "inbox-hmrc-confirmation",
    title: "Tax payment confirmation",
    summary: "Quarterly estimated tax payment was received and posted successfully.",
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

export const demoBills: BillRecord[] = [
  {
    id: "bill-energy",
    name: "Electricity",
    vendor: "Octopus Energy",
    amountDue: 118.42,
    dueDate: "2026-04-27",
    autopay: true,
    category: "utility",
    status: "due-soon"
  },
  {
    id: "bill-renters",
    name: "Renters insurance",
    vendor: "Lemonade",
    amountDue: 19.0,
    dueDate: "2026-05-01",
    autopay: true,
    category: "insurance",
    status: "scheduled"
  },
  {
    id: "bill-password-manager",
    name: "Password manager renewal",
    vendor: "1Password",
    amountDue: 64.99,
    dueDate: "2026-05-03",
    autopay: false,
    category: "subscription",
    status: "scheduled"
  }
];

export const demoNewsItems: NewsItem[] = [
  {
    id: "news-bonds",
    title: "Bond yields tick higher as markets reset rate-cut expectations",
    summary: "Higher yields could keep mortgage and savings rates elevated through early summer.",
    sourceName: "Financial Times",
    publishedAt: "2026-04-24T06:30:00.000Z",
    category: "markets",
    priority: "high"
  },
  {
    id: "news-grid",
    title: "UK energy regulator outlines new winter resilience measures",
    summary: "The update may reduce volatility in household energy pricing ahead of colder months.",
    sourceName: "Reuters",
    publishedAt: "2026-04-24T05:15:00.000Z",
    category: "policy",
    priority: "medium"
  },
  {
    id: "news-isa",
    title: "Banks compete on cash ISA offers before deadline rush",
    summary: "Several providers raised promotional rates, making short-term cash parking more attractive.",
    sourceName: "Bloomberg",
    publishedAt: "2026-04-23T20:20:00.000Z",
    category: "personal-finance",
    priority: "medium"
  }
];

export const demoTasks: TaskItem[] = [
  {
    id: "task-submit-receipt",
    title: "Upload physio receipt",
    summary: "Attach the final receipt PDF so the Anthem claim can clear this week.",
    category: "health",
    priority: "urgent",
    status: "todo",
    source: "system",
    dueDate: "2026-04-25",
    linkedRecordId: "inbox-anthem-claim",
    estimateMinutes: 10
  },
  {
    id: "task-review-lease",
    title: "Review lease renewal terms",
    summary: "Check rent increase, parking clause, and the notice period before replying.",
    category: "home",
    priority: "high",
    status: "in_progress",
    source: "system",
    dueDate: "2026-04-28",
    linkedRecordId: "inbox-landlord-renewal",
    estimateMinutes: 25
  },
  {
    id: "task-reconcile-budget",
    title: "Reconcile April discretionary spending",
    summary: "Update the budget sheet before month end and flag overspend categories.",
    category: "finance",
    priority: "medium",
    status: "todo",
    source: "manual",
    dueDate: "2026-04-30",
    estimateMinutes: 30
  }
];

export const demoPriorityItems: AdminItemRecord[] = [
  {
    id: "priority-anthem-claim",
    title: "Finish insurance claim follow-up",
    summary: "One missing receipt is blocking reimbursement and the deadline is tomorrow.",
    category: "health",
    priority: "urgent",
    status: "new",
    source: "email",
    dueDate: "2026-04-25"
  },
  {
    id: "priority-electricity",
    title: "Confirm April electricity autopay",
    summary: "The next bill is larger than usual and worth checking before it drafts.",
    category: "utilities",
    priority: "high",
    status: "new",
    source: "system",
    dueDate: "2026-04-27"
  },
  {
    id: "priority-lease",
    title: "Respond to lease renewal",
    summary: "The landlord sent a renewal draft with a moderate increase and a short response window.",
    category: "housing",
    priority: "high",
    status: "new",
    source: "email",
    dueDate: "2026-04-29"
  }
];

export const demoDashboardData: DashboardData = {
  briefing: {
    title: "Good morning, your admin load looks focused today.",
    summary:
      "Three items deserve attention first: an insurance reimbursement, a higher-than-usual utility bill, and a lease renewal decision before next week.",
    generatedAt: "2026-04-24T07:30:00.000Z"
  },
  priorityItems: demoPriorityItems,
  inboxPreview: demoInboxItems,
  upcomingBills: demoBills,
  newsDigest: demoNewsItems,
  tasks: demoTasks,
  stats: [
    { id: "stat-urgent", label: "Urgent items", value: "1", tone: "attention" },
    { id: "stat-bills", label: "Bills due in 7 days", value: "2", tone: "calm" },
    { id: "stat-tasks", label: "Open tasks", value: "3", tone: "calm" },
    { id: "stat-autopay", label: "Bills on autopay", value: "2 of 3", tone: "good" }
  ],
  quickActions: [
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
  ]
};
