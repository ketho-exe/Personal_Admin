import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/components/ui/card";

type BadgeTone = "neutral" | "muted" | "accent" | "attention" | "warning" | "success";
type BadgeWeight = "regular" | "strong";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
  weight?: BadgeWeight;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-[rgba(32,25,19,0.08)] text-[var(--foreground)]",
  muted: "bg-[rgba(32,25,19,0.06)] text-[var(--muted)]",
  accent: "bg-[rgba(162,77,47,0.12)] text-[var(--accent-strong)]",
  attention: "bg-[rgba(162,77,47,0.14)] text-[var(--accent-strong)]",
  warning: "bg-[rgba(193,138,44,0.16)] text-[rgb(117,78,14)]",
  success: "bg-[rgba(77,132,79,0.12)] text-[rgb(52,92,54)]"
};

const weightClasses: Record<BadgeWeight, string> = {
  regular: "",
  strong: "font-semibold"
};

export function Badge({
  children,
  className,
  tone = "muted",
  weight = "regular",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.08em]",
        toneClasses[tone],
        weightClasses[weight],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
