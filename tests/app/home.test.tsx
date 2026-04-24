import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the dashboard heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /personal admin dashboard/i }),
    ).toBeInTheDocument();
  });
});
