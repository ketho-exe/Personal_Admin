import Link from "next/link";

export const navigationItems = [
  { href: "/", label: "Today", available: true },
  { href: "/inbox", label: "Inbox", available: false },
  { href: "/bills", label: "Bills", available: false },
  { href: "/news", label: "News", available: false },
  { href: "/tasks", label: "Tasks", available: false },
  { href: "/settings", label: "Settings", available: false }
] as const;

type NavigationItemProps = Readonly<{
  available: boolean;
  className: string;
  href: string;
  label: string;
}>;

export function NavigationItem({
  available,
  className,
  href,
  label
}: NavigationItemProps) {
  if (!available) {
    return (
      <span
        aria-disabled="true"
        className={`${className} ${className}--disabled`}
        title={`${label} coming soon`}
      >
        {label}
      </span>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}
