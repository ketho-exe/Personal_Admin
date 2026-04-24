import type { ReactNode } from "react";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

type AppShellProps = Readonly<{
  children: ReactNode;
}>;

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__body">
        <MobileNav />
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  );
}
