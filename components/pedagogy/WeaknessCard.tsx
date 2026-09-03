import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Skill, SkillProgress } from "@/lib/pedagogy/types";

export default function WeaknessCard({
  skill,
  progress,
  href,
}: {
  skill: Skill;
  progress?: SkillProgress;
  /** Module où s'entraîner sur cette compétence, si un module correspondant existe. */
  href?: string;
}) {
  return (
    <Card className="border-secondary/40">
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">{skill.name}</h3>
        <Badge variant="secondary">À travailler</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{skill.description}</p>
      {progress ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Taux de réussite actuel : {progress.successRate}% sur {progress.completedExercises}{" "}
          exercice{progress.completedExercises > 1 ? "s" : ""}.
        </p>
      ) : null}
      {href ? (
        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          S&apos;entraîner
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      ) : null}
    </Card>
  );
}
