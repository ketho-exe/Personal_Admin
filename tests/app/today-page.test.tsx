import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the today dashboard container and named regions", async () => {
    const page = await HomePage();

    render(page);

    expect(screen.getByTestId("today-page")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Today" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /what deserves attention first/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /cash flow at a glance/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /signals worth keeping in view/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /choose the next lane/i })
    ).toBeInTheDocument();
  });

  it("shows linked quick actions inside the actions region", async () => {
    const page = await HomePage();

    render(page);

    const actionsRegion = screen.getByRole("region", { name: /choose the next lane/i });

    expect(actionsRegion.querySelector("[aria-disabled='true']")).toBeNull();
    expect(actionsRegion.querySelectorAll("a")).toHaveLength(3);
  });
});
