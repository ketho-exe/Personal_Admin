import { Badge } from "@/components/ui/badge";

type StatusTone = "neutral" | "attention" | "warning" | "success" | "accent";

type StatusPillProps = Readonly<{
  children: string;
  className?: string;
  tone?: StatusTone;
}>;

const toneMap = {
  accent: "accent",
  attention: "attention",
  neutral: "neutral",
  success: "success",
  warning: "warning"
} as const;

export function StatusPill({ children, className, tone = "neutral" }: StatusPillProps) {
  return (
    <Badge className={className} tone={toneMap[tone]} weight="strong">
      {children}
    </Badge>
  );
}
