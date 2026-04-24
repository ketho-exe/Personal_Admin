import { render, screen } from "@testing-library/react";
import BillsPage from "@/app/bills/page";
import InboxPage from "@/app/inbox/page";
import NewsPage from "@/app/news/page";
import SettingsPage from "@/app/settings/page";
import TasksPage from "@/app/tasks/page";

describe("secondary pages", () => {
  it("renders the inbox workspace and filters", async () => {
    render(await InboxPage());

    expect(screen.getByTestId("inbox-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Inbox" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /queue at a glance/i })).toBeInTheDocument();
  });

  it("renders the bills workspace overview", async () => {
    render(await BillsPage());

    expect(screen.getByTestId("bills-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bills" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /upcoming payments/i })).toBeInTheDocument();
  });

  it("renders the news, tasks, and settings workspaces", async () => {
    const newsPage = await NewsPage();
    const tasksPage = await TasksPage();
    const settingsPage = await SettingsPage();

    const { rerender } = render(newsPage);
    expect(screen.getByTestId("news-page")).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /signals worth keeping in view/i })
    ).toBeInTheDocument();

    rerender(tasksPage);
    expect(screen.getByTestId("tasks-page")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /open tasks/i })).toBeInTheDocument();

    rerender(settingsPage);
    expect(screen.getByTestId("settings-page")).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /preferences and integrations/i })
    ).toBeInTheDocument();
  });
});
