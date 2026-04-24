import Link from "next/link";

const navigationItems = [
  { href: "/", label: "Today" },
  { href: "/inbox", label: "Inbox" },
  { href: "/bills", label: "Bills" },
  { href: "/news", label: "News" },
  { href: "/tasks", label: "Tasks" },
  { href: "/settings", label: "Settings" }
] as const;

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <p className="app-sidebar__eyebrow">Personal Admin</p>
        <h1>Household cockpit</h1>
        <p className="app-sidebar__copy">
          A calm overview of today&apos;s obligations, signals, and loose ends.
        </p>
      </div>
      <nav aria-label="Primary" className="app-sidebar__nav">
        {navigationItems.map((item) => (
          <Link key={item.href} className="app-nav-link" href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
