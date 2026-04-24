import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/layout/app-shell";

describe("AppShell", () => {
  it("renders the primary navigation without dead links", () => {
    render(<AppShell>content</AppShell>);

    expect(screen.getAllByRole("link", { name: /today/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/inbox/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/bills/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/news/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/tasks/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/settings/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /inbox/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /bills/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /news/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /tasks/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /settings/i })).not.toBeInTheDocument();
  });

  it("marks unfinished destinations as disabled", () => {
    render(<AppShell>content</AppShell>);

    expect(screen.getAllByText(/inbox/i)[0]).toHaveAttribute("aria-disabled", "true");
    expect(screen.getAllByText(/bills/i)[0]).toHaveAttribute("aria-disabled", "true");
    expect(screen.getAllByText(/news/i)[0]).toHaveAttribute("aria-disabled", "true");
    expect(screen.getAllByText(/tasks/i)[0]).toHaveAttribute("aria-disabled", "true");
    expect(screen.getAllByText(/settings/i)[0]).toHaveAttribute("aria-disabled", "true");
  });
});
