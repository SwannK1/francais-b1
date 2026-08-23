import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { Skill, SkillProgress } from "@/lib/pedagogy/types";

export default function WeaknessCard({
  skill,
  progress,
}: {
  skill: Skill;
  progress?: SkillProgress;
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
    </Card>
  );
}
