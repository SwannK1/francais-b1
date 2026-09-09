import Card from "@/components/ui/Card";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import type { Skill, SkillProgress } from "@/lib/pedagogy/types";

export default function SkillScore({
  skill,
  progress,
  className,
}: {
  skill: Skill;
  progress?: SkillProgress;
  className?: string;
}) {
  const successRate = progress?.successRate ?? 0;
  const completed = progress?.completedExercises ?? 0;
  const total = progress?.totalExercises ?? 0;
  const coverageRate = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card className={className}>
      <div className="mb-1 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {DOMAIN_LABELS[skill.domain]}
          </p>
          <h3 className="text-base font-semibold text-foreground">{skill.name}</h3>
        </div>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{skill.description}</p>
      <ProgressBar
        value={coverageRate}
        label={completed > 0 ? `${completed}/${total} exercices pratiqués` : "Pas encore commencé"}
      />
      {completed > 0 ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Réussite sur les exercices tentés : <span className="font-semibold text-foreground">{successRate}%</span>
        </p>
      ) : null}
    </Card>
  );
}
