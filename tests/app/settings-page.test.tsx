import { render, screen } from "@testing-library/react";
import SettingsPage from "@/app/settings/page";

describe("SettingsPage", () => {
  it("shows Gmail and RSS connection placeholders", async () => {
    render(await SettingsPage());

    expect(screen.getByText(/gmail connection/i)).toBeInTheDocument();
    expect(screen.getByText(/rss sources/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open login workspace/i })).toHaveAttribute(
      "href",
      "/login"
    );
  });
});
