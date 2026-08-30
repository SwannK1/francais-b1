import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { ChatIcon, HeadphonesIcon, PenIcon, TargetIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const todayItems = [
  { icon: ChatIcon, label: "Leçon : donner son opinion" },
  { icon: TargetIcon, label: "8 exercices" },
  { icon: HeadphonesIcon, label: "Compréhension orale" },
  { icon: PenIcon, label: "Petite production écrite" },
];

export default function ProgressPreviewCard({
  variant = "full",
  className,
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const compact = variant === "compact";
  const items = compact ? todayItems.slice(0, 2) : todayItems;

  return (
    <Card className={cn("w-full", className)}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Aperçu — exemple de tableau de bord
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="neutral">Niveau actuel : A2</Badge>
        <span className="text-muted-foreground" aria-hidden="true">
          →
        </span>
        <Badge variant="primary">Objectif : B1</Badge>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium text-foreground">Progression B1</span>
          <span className="font-semibold text-success">42 %</span>
        </div>
        <div
          className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={42}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression vers le niveau B1"
        >
          <div className="h-full rounded-full bg-success" style={{ width: "42%" }} />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">A1 terminé · A2 terminé ✓</p>
      </div>

      <div className={cn("mt-6", !compact && "border-t border-border pt-5")}>
        <p className="text-sm font-medium text-foreground">Séance du jour</p>
        <ul className="mt-3 space-y-3">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-sm text-foreground">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-4 w-4" />
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
