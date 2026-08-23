import Badge from "@/components/ui/Badge";
import type { CEFRLevel } from "@/lib/pedagogy/types";

const LEVEL_LABELS: Record<CEFRLevel, string> = {
  A1: "A1 · Découverte",
  A2: "A2 · Intermédiaire",
  B1: "B1 · Autonome",
  B2: "B2 · Avancé",
};

export default function LevelBadge({
  level,
  className,
}: {
  level: CEFRLevel;
  className?: string;
}) {
  return (
    <Badge variant="primary" className={className}>
      {LEVEL_LABELS[level]}
    </Badge>
  );
}
