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
        value={successRate}
        label={completed > 0 ? `${completed}/${total} exercices` : "Pas encore commencé"}
      />
    </Card>
  );
}
