import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/layout/app-shell";

describe("AppShell", () => {
  it("renders the primary navigation with reachable workspace links", () => {
    render(<AppShell>content</AppShell>);

    expect(screen.getAllByRole("link", { name: /today/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /inbox/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /bills/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /news/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /tasks/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /settings/i }).length).toBeGreaterThan(0);
  });

  it("does not mark shipped workspace destinations as disabled", () => {
    render(<AppShell>content</AppShell>);

    expect(screen.queryByText(/inbox/i, { selector: "[aria-disabled='true']" })).toBeNull();
    expect(screen.queryByText(/bills/i, { selector: "[aria-disabled='true']" })).toBeNull();
    expect(screen.queryByText(/news/i, { selector: "[aria-disabled='true']" })).toBeNull();
    expect(screen.queryByText(/tasks/i, { selector: "[aria-disabled='true']" })).toBeNull();
    expect(screen.queryByText(/settings/i, { selector: "[aria-disabled='true']" })).toBeNull();
  });
});
