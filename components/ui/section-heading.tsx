import type { ReactNode } from "react";
import { cx } from "@/components/ui/card";

type SectionHeadingProps = Readonly<{
  action?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow: string;
  id: string;
  title: string;
}>;

export function SectionHeading({
  action,
  className,
  description,
  eyebrow,
  id,
  title
}: SectionHeadingProps) {
  return (
    <div className={cx("flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <p className="m-0 font-[Trebuchet_MS,sans-serif] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl" id={id}>
          {title}
        </h2>
      </div>
      {description ? (
        <div className="max-w-md text-sm leading-6 text-[var(--muted-strong)]">
          {description}
        </div>
      ) : null}
      {action}
    </div>
  );
}
