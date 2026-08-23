import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "primary" | "secondary" | "success" | "neutral";

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/20 text-secondary-foreground",
  success: "bg-success/10 text-success",
  neutral: "bg-muted text-muted-foreground",
};

export default function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
