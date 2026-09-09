"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import SkillScore from "@/components/pedagogy/SkillScore";
import WeaknessCard from "@/components/pedagogy/WeaknessCard";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import GuidedSessionCard from "@/components/pedagogy/GuidedSessionCard";
import { SKILLS, getSkillById } from "@/lib/pedagogy/data/skills";
import {
  getModuleCompletionRate,
  isModuleReviewed,
  statusFromCompletionRate,
} from "@/lib/pedagogy/logic/progress";
import { findModuleForSkill } from "@/lib/pedagogy/logic/module-structure";
import { buildDailySession } from "@/lib/daily/session-engine";
import { getEffectiveLevel, getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Reçoit `publicModules` (métadonnées de navigation, jamais le contenu
 * détaillé des exercices) depuis le Server Component `page.tsx` — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */
export default function ProgressionExperience({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress, toggleReview } = useProgress();
  const { user } = useAuth();
  // Niveau effectif ("où en suis-je maintenant"), pas le seul résultat brut
  // du dernier test de positionnement — voir `getEffectiveLevel`. Sans ça,
  // un apprenant qui avance naturellement au niveau suivant via `/parcours`
  // voyait son propre bilan rester bloqué sur son ancien niveau, masquant sa
  // vraie progression la plus récente.
  const effectiveLevel = getEffectiveLevel(progress, publicModules);
  const modules = publicModules.filter((mod) => mod.level === effectiveLevel);
  const isAccessible = (mod: PublicModule) =>
    canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
  // Même moteur que `/parcours` (`lib/daily/`, voir `ParcoursExperience.tsx`)
  // — jamais un second moteur de séance concurrent (l'ancien
  // `computeDailySession`/`DailySessionCard` a été retiré).
  const guidedSession = buildDailySession(progress, publicModules, { isAccessible });
  const rawGuidedSession = guidedSession ? null : buildDailySession(progress, publicModules);
  const summary = getParcoursSummary(progress, publicModules);
  const isReadyForB1 = summary.readyForB1;
  const startedSkills = SKILLS.filter((skill) =>
    progress.skillProgress.some((sp) => sp.skillId === skill.id && sp.completedExercises > 0)
  );

  const completedModulesCount = publicModules.filter(
    (mod) =>
      statusFromCompletionRate(getModuleCompletionRate(progress, mod.id, mod.totalExercises)) === "termine"
  ).length;
  const reviewItemsCount = getReviewItems(progress, publicModules).length;

  return (
    <div className="space-y-8">
      <header>
        <LevelBadge level={effectiveLevel} />
        <h1 className="mt-3 text-2xl font-bold text-foreground">Ton bilan</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="primary">
            {completedModulesCount}/{publicModules.length} modules terminés
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
          {summary.currentStage === null
            ? "Tu as parcouru tout le contenu A1, A2 et B1 : tu es prêt·e à passer un examen blanc B1."
            : isReadyForB1
              ? "A1 et A2 terminés : tu es prêt·e pour le B1."
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

      {guidedSession || rawGuidedSession ? (
        <section aria-labelledby="daily-session-title">
          <h2 id="daily-session-title" className="mb-3 text-lg font-semibold text-foreground">
            Séance recommandée
          </h2>
          <GuidedSessionCard
            plan={guidedSession ?? rawGuidedSession!}
            href={guidedSession ? `/parcours/seance?module=${guidedSession.moduleSlug}` : "/offre"}
            locked={!guidedSession}
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
              const skillModule = findModuleForSkill(publicModules, skillId);
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
          Modules — niveau {effectiveLevel}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod) => {
            const locked = !canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
            const completionRate = getModuleCompletionRate(progress, mod.id, mod.totalExercises);
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
