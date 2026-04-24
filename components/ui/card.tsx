import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type CardTone = "panel" | "glass" | "subtle" | "warm" | "dark";
type CardPadding = "md" | "lg";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
  tone?: CardTone;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const toneClasses: Record<CardTone, string> = {
  panel:
    "border border-[var(--panel-border)] bg-[var(--panel)] text-[var(--foreground)] shadow-[0_20px_60px_var(--panel-shadow)]",
  glass: "border border-[var(--panel-border)] bg-[rgba(255,255,255,0.88)] text-[var(--foreground)]",
  subtle: "border border-[var(--panel-border)] bg-[rgba(255,255,255,0.82)] text-[var(--foreground)]",
  warm: "border border-[var(--panel-border)] bg-[rgba(255,244,234,0.96)] text-[var(--foreground)]",
  dark: "border border-[var(--panel-border)] bg-[rgba(32,25,19,0.9)] text-[var(--background)] shadow-[0_18px_48px_rgba(32,25,19,0.22)]"
};

const paddingClasses: Record<CardPadding, string> = {
  md: "p-5",
  lg: "p-6"
};

export function Card<T extends ElementType = "div">({
  as,
  children,
  className,
  padding = "md",
  tone = "glass",
  ...props
}: CardProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cx("rounded-[1.5rem]", toneClasses[tone], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
