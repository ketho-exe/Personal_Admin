import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the today dashboard briefing and sections", async () => {
    const page = await HomePage();

    render(page);

    expect(screen.getByRole("heading", { name: "Today" })).toBeInTheDocument();
    expect(
      screen.getByText(/good morning, your admin load looks focused today/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /what deserves attention first/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /cash flow at a glance/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /signals worth keeping in view/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /choose the next lane/i })).toBeInTheDocument();
  });

  it("keeps unfinished quick actions visible without rendering dead links", async () => {
    const page = await HomePage();

    render(page);

    expect(screen.getByText(/triage inbox/i).closest("[aria-disabled='true']")).not.toBeNull();
    expect(screen.getByText(/review bills/i).closest("[aria-disabled='true']")).not.toBeNull();
    expect(screen.getByText(/plan tasks/i).closest("[aria-disabled='true']")).not.toBeNull();
    expect(screen.queryByRole("link", { name: /triage inbox/i })).not.toBeInTheDocument();
  });
});
