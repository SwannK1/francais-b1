"use client";

import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import SkillScore from "@/components/pedagogy/SkillScore";
import WeaknessCard from "@/components/pedagogy/WeaknessCard";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import DailySessionCard from "@/components/pedagogy/DailySessionCard";
import { SKILLS, getSkillById } from "@/lib/pedagogy/data/skills";
import { MODULES, getModulesByLevel } from "@/lib/pedagogy/data/modules";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { computeDailySession } from "@/lib/pedagogy/logic/recommendation";
import { getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { useProgress } from "@/lib/pedagogy/useProgress";

export default function ProgressionPage() {
  const { progress } = useProgress();
  const modules = getModulesByLevel(progress.level);
  const dailySession = computeDailySession(progress, MODULES);
  const dailySessionModule = dailySession ? MODULES.find((m) => m.id === dailySession.moduleId) : undefined;
  const summary = getParcoursSummary(progress, MODULES);
  const isReadyForB1 = summary.completedStages === summary.totalStages;

  return (
    <div className="space-y-8">
      <header>
        <LevelBadge level={progress.level} />
        <h1 className="mt-3 text-2xl font-bold text-foreground">Votre bilan</h1>
        <ProgressBar
          value={progress.globalSuccessRate}
          label="Taux de réussite global"
          className="mt-3 max-w-sm"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {progress.lastActivityAt
            ? `Dernière activité : ${new Date(progress.lastActivityAt).toLocaleDateString("fr-FR")}`
            : "Aucune activité récente."}
        </p>
        <p className="mt-3 text-sm text-foreground">
          {isReadyForB1
            ? "Toutes les étapes du parcours sont terminées : vous êtes prêt·e à passer un examen blanc B1."
            : `${summary.completedStages}/${summary.totalStages} étapes du parcours terminées.`}
        </p>
      </header>

      {dailySession && dailySessionModule ? (
        <section aria-labelledby="daily-session-title">
          <h2 id="daily-session-title" className="mb-3 text-lg font-semibold text-foreground">
            Séance recommandée
          </h2>
          <DailySessionCard session={dailySession} href={`/parcours/module/${dailySessionModule.slug}`} />
        </section>
      ) : null}

      {progress.weakSkillIds.length > 0 ? (
        <section aria-labelledby="weaknesses-title">
          <h2 id="weaknesses-title" className="mb-3 text-lg font-semibold text-foreground">
            Points à travailler
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {progress.weakSkillIds.map((skillId) => {
              const skill = getSkillById(skillId);
              if (!skill) return null;
              const skillProgress = progress.skillProgress.find((sp) => sp.skillId === skillId);
              return <WeaknessCard key={skillId} skill={skill} progress={skillProgress} />;
            })}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="skills-title">
        <h2 id="skills-title" className="mb-3 text-lg font-semibold text-foreground">
          Progression par compétence
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <SkillScore
              key={skill.id}
              skill={skill}
              progress={progress.skillProgress.find((sp) => sp.skillId === skill.id)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="modules-title">
        <h2 id="modules-title" className="mb-3 text-lg font-semibold text-foreground">
          Modules — niveau {progress.level}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              completionRate={getModuleCompletionRate(progress, mod)}
              href={`/parcours/module/${mod.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
