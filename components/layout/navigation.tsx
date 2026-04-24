import Link from "next/link";
import type { ReactNode } from "react";

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
  children?: ReactNode;
  className: string;
  disabledClassName?: string;
  href: string;
  label: string;
}>;

export function NavigationItem({
  available,
  children,
  className,
  disabledClassName,
  href,
  label
}: NavigationItemProps) {
  const content = children ?? label;

  if (!available) {
    return (
      <span
        aria-disabled="true"
        className={disabledClassName ?? `${className}--disabled`}
        title={`${label} coming soon`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}
