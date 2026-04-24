import { render, screen } from "@testing-library/react";
import { StatusPill } from "@/components/ui/status-pill";

describe("StatusPill", () => {
  it("renders its label text", () => {
    render(<StatusPill tone="warning">In progress</StatusPill>);

    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("applies semantic tone styling", () => {
    render(<StatusPill tone="success">Done</StatusPill>);

    expect(screen.getByText("Done")).toHaveClass("bg-[rgba(77,132,79,0.12)]");
    expect(screen.getByText("Done")).toHaveClass("text-[rgb(52,92,54)]");
  });
});
