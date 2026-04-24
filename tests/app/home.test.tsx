import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the dashboard shell heading", async () => {
    const page = await HomePage();

    render(page);

    expect(
      screen.getByRole("heading", { name: /personal admin dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Today" })).toBeInTheDocument();
  });
});
