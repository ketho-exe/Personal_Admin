import { getDashboardData } from "@/lib/data/dashboard";

describe("getDashboardData", () => {
  it("returns a morning briefing and priority items", async () => {
    const data = await getDashboardData();

    expect(data.briefing.title).toMatch(/good/i);
    expect(data.priorityItems.length).toBeGreaterThan(0);
    expect(data.inboxPreview.length).toBeGreaterThan(0);
    expect(data.upcomingBills.length).toBeGreaterThan(0);
  });

  it("returns isolated copies and consistent linked records", async () => {
    const first = await getDashboardData();
    const originalTitle = first.priorityItems[0]?.title;

    first.priorityItems[0]!.title = "Changed locally";
    first.inboxPreview[0]!.sender = "Changed sender";

    const second = await getDashboardData();
    const linkedInboxIds = new Set(second.inboxPreview.map((item) => item.id));
    const linkedTaskIds = second.tasks
      .map((task) => task.linkedRecordId)
      .filter((value): value is string => Boolean(value));

    expect(second.priorityItems[0]?.title).toBe(originalTitle);
    expect(second.inboxPreview[0]?.sender).toBe("Bupa Member Support");
    expect(linkedTaskIds.every((id) => linkedInboxIds.has(id))).toBe(true);
    expect(new Set(second.priorityItems.map((item) => item.category))).toEqual(
      new Set(["health", "housing", "utilities"])
    );
    expect(new Set(second.upcomingBills.map((bill) => bill.category))).toEqual(
      new Set(["housing", "subscriptions", "utilities"])
    );
  });
});
