import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the today dashboard structure", async () => {
    const page = await HomePage();

    const { container } = render(page);

    expect(screen.getByRole("heading", { name: "Today" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(5);
    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(container.querySelectorAll("section").length).toBeGreaterThanOrEqual(6);
    expect(container.querySelectorAll("dl")).toHaveLength(1);
    expect(container.querySelectorAll("dt")).toHaveLength(4);
    expect(screen.getAllByTitle(/coming soon/i)).toHaveLength(3);
    expect(document.querySelectorAll("[aria-disabled='true']")).toHaveLength(3);
  });

  it("keeps unfinished quick actions visible without rendering dead links", async () => {
    const page = await HomePage();

    const { container } = render(page);

    expect(document.querySelectorAll("[aria-disabled='true']")).toHaveLength(3);
    expect(screen.getAllByTitle(/coming soon/i)).toHaveLength(3);
    expect(container.querySelectorAll("[aria-disabled='true'] a")).toHaveLength(0);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
