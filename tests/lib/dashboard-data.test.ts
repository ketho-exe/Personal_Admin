import { getDashboardData } from "@/lib/data/dashboard";

describe("getDashboardData", () => {
  it("returns a morning briefing and priority items", async () => {
    const data = await getDashboardData();

    expect(data.briefing.title).toMatch(/good/i);
    expect(data.priorityItems.length).toBeGreaterThan(0);
  });
});
