import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
