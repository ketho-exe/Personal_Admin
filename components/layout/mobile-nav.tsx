import Link from "next/link";

const navigationItems = [
  { href: "/", label: "Today" },
  { href: "/inbox", label: "Inbox" },
  { href: "/bills", label: "Bills" },
  { href: "/news", label: "News" },
  { href: "/tasks", label: "Tasks" },
  { href: "/settings", label: "Settings" }
] as const;

export function MobileNav() {
  return (
    <nav aria-label="Primary" className="mobile-nav">
      {navigationItems.map((item) => (
        <Link key={item.href} className="mobile-nav__link" href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
