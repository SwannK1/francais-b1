"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import SkillScore from "@/components/pedagogy/SkillScore";
import WeaknessCard from "@/components/pedagogy/WeaknessCard";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import DailySessionCard from "@/components/pedagogy/DailySessionCard";
import { SKILLS, getSkillById } from "@/lib/pedagogy/data/skills";
import { MODULES, getModulesByLevel, findModuleForSkill } from "@/lib/pedagogy/data/modules";
import {
  getModuleCompletionRate,
  isModuleReviewed,
  statusFromCompletionRate,
} from "@/lib/pedagogy/logic/progress";
import { computeDailySession } from "@/lib/pedagogy/logic/recommendation";
import { getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";

export default function ProgressionClient() {
  const { progress, toggleReview } = useProgress();
  const { user } = useAuth();
  const modules = getModulesByLevel(progress.level);
  const dailySession = computeDailySession(progress, MODULES);
  const dailySessionModule = dailySession ? MODULES.find((m) => m.id === dailySession.moduleId) : undefined;
  const dailySessionLocked = dailySessionModule
    ? !canAccess({ kind: "module", slug: dailySessionModule.slug }, user?.premiumUntil)
    : false;
  const summary = getParcoursSummary(progress, MODULES);
  const isReadyForB1 = summary.completedStages === summary.totalStages;
  const startedSkills = SKILLS.filter((skill) =>
    progress.skillProgress.some((sp) => sp.skillId === skill.id && sp.completedExercises > 0)
  );

  const completedModulesCount = MODULES.filter(
    (mod) => statusFromCompletionRate(getModuleCompletionRate(progress, mod)) === "termine"
  ).length;
  const reviewItemsCount = getReviewItems(progress, MODULES).length;

  return (
    <div className="space-y-8">
      <header>
        <LevelBadge level={progress.level} />
        <h1 className="mt-3 text-2xl font-bold text-foreground">Ton bilan</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="primary">
            {completedModulesCount}/{MODULES.length} modules terminés
          </Badge>
          <Badge variant="neutral">
            {summary.completedStages}/{summary.totalStages} étapes terminées
          </Badge>
        </div>
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
            ? "Toutes les étapes du parcours sont terminées : tu es prêt·e à passer un examen blanc B1."
            : `${summary.completedStages}/${summary.totalStages} étapes du parcours terminées.`}
        </p>
        {reviewItemsCount > 0 ? (
          <p className="mt-3 text-sm text-foreground">
            {reviewItemsCount} élément{reviewItemsCount > 1 ? "s" : ""} à réviser —{" "}
            <Link href="/reviser" className="font-semibold text-primary hover:underline">
              voir la révision
            </Link>
          </p>
        ) : null}
      </header>

      {dailySession && dailySessionModule ? (
        <section aria-labelledby="daily-session-title">
          <h2 id="daily-session-title" className="mb-3 text-lg font-semibold text-foreground">
            Séance recommandée
          </h2>
          <DailySessionCard
            session={dailySession}
            href={dailySessionLocked ? "/offre" : `/parcours/module/${dailySessionModule.slug}`}
            locked={dailySessionLocked}
          />
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
              const skillModule = findModuleForSkill(skillId);
              return (
                <WeaknessCard
                  key={skillId}
                  skill={skill}
                  progress={skillProgress}
                  href={skillModule ? `/parcours/module/${skillModule.slug}` : undefined}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="skills-title">
        <h2 id="skills-title" className="mb-3 text-lg font-semibold text-foreground">
          Progression par compétence
        </h2>
        {startedSkills.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {startedSkills.map((skill) => (
              <SkillScore
                key={skill.id}
                skill={skill}
                progress={progress.skillProgress.find((sp) => sp.skillId === skill.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">
              Tes compétences apparaîtront ici au fil de tes exercices. Termine ta première leçon
              pour commencer à suivre ta progression.
            </p>
          </Card>
        )}
      </section>

      <section aria-labelledby="modules-title">
        <h2 id="modules-title" className="mb-3 text-lg font-semibold text-foreground">
          Modules — niveau {progress.level}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod) => {
            const locked = !canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
            const completionRate = getModuleCompletionRate(progress, mod);
            return (
              <ModuleCard
                key={mod.id}
                module={mod}
                completionRate={completionRate}
                href={`/parcours/module/${mod.slug}`}
                locked={locked}
                reviewed={isModuleReviewed(progress, mod.id)}
                onToggleReview={locked ? undefined : () => toggleReview(mod.id)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
