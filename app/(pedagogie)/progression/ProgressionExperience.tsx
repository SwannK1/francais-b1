"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import LevelBadge from "@/components/pedagogy/LevelBadge";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import SkillReviewCard from "@/components/pedagogy/SkillReviewCard";
import ModuleCard from "@/components/pedagogy/ModuleCard";
import GuidedSessionCard from "@/components/pedagogy/GuidedSessionCard";
import { CheckIcon } from "@/components/ui/icons";
import {
  getModuleCompletionRate,
  isModuleReviewed,
  statusFromCompletionRate,
} from "@/lib/pedagogy/logic/progress";
import { buildDailySession } from "@/lib/daily/session-engine";
import { getEffectiveLevel, getParcoursSummary } from "@/lib/pedagogy/logic/parcours";
import { getReviewItems } from "@/lib/pedagogy/logic/review";
import {
  buildReviewHistory,
  buildReviewRecommendations,
  classifySkillState,
  getConsolidationSuggestion,
  summarizeMastery,
} from "@/lib/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { useSpeakingPractice } from "@/lib/speaking/useSpeakingPractice";
import { getSpeakingExerciseById } from "@/lib/speaking/logic/exercises";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Reçoit `publicModules` (métadonnées de navigation, jamais le contenu
 * détaillé des exercices) depuis le Server Component `page.tsx` — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 */
export default function ProgressionExperience({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress, toggleReview } = useProgress();
  const { user } = useAuth();
  const { log: speakingLog } = useSpeakingPractice();
  // Seul signal fiable de "cet apprenant a déjà fait quelque chose" — posé
  // uniquement par `recordExerciseResult` (voir lib/pedagogy/logic/progress.ts),
  // jamais par un simple affichage de page. Sert à masquer les statistiques
  // (0 module, 0%...) pour un compte tout neuf plutôt que d'afficher des
  // jauges vides — voir chantier "progression globale".
  const hasProgress = Boolean(progress.lastActivityAt);
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

  // Une seule dérivation de `progress.skillProgress` par le moteur de
  // révision espacée (`lib/review/`, déjà utilisé par `/reviser` et par le
  // CTA d'accueil) : jamais une deuxième règle de "maîtrise" — voir chantier
  // "maîtrise et révisions ciblées". `nouvelle` (jamais pratiquée) reste
  // exclue des trois catégories, il n'y a encore rien à y classer.
  const reviewHistory = buildReviewHistory(progress, publicModules);
  const mastery = summarizeMastery(reviewHistory);
  const skillRecommendations = buildReviewRecommendations(reviewHistory);
  const toReview = skillRecommendations.filter(
    (r) => r.priority.band === "haute" || r.priority.band === "a_revoir"
  );
  const toConsolidate = skillRecommendations.filter((r) => r.priority.band === "consolidation");
  const consolidationSuggestion =
    toReview.length === 0 && toConsolidate.length === 0 ? getConsolidationSuggestion(reviewHistory) : null;
  const acquisNames = reviewHistory
    .filter((entry) => classifySkillState(entry) === "maitrisee")
    .map((entry) => entry.skillName);

  const completedModulesCount = publicModules.filter(
    (mod) =>
      statusFromCompletionRate(getModuleCompletionRate(progress, mod.id, mod.totalExercises)) === "termine"
  ).length;
  const reviewItemsCount = getReviewItems(progress, publicModules).length;

  const practicedOralIds = Object.keys(speakingLog);
  const practicedOralCount = practicedOralIds.length;
  const lastOralEntryId = practicedOralIds.sort((a, b) =>
    speakingLog[b].lastPracticedAt.localeCompare(speakingLog[a].lastPracticedAt)
  )[0];
  const lastOralExercise = lastOralEntryId ? getSpeakingExerciseById(lastOralEntryId) : undefined;

  return (
    <div className="space-y-8">
      <header>
        <LevelBadge level={effectiveLevel} />
        <h1 className="mt-3 text-2xl font-bold text-foreground">Ton bilan</h1>
        {hasProgress ? (
          <>
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
              Dernière activité : {new Date(progress.lastActivityAt!).toLocaleDateString("fr-FR")}
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
          </>
        ) : (
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Ta progression apparaîtra ici au fil de tes séances. Commence par la séance recommandée
            ci-dessous.
          </p>
        )}
        {practicedOralCount > 0 ? (
          <p className="mt-3 text-sm text-foreground">
            {practicedOralCount} exercice{practicedOralCount > 1 ? "s" : ""}{" "}
            {practicedOralCount > 1 ? "oraux" : "oral"} pratiqué{practicedOralCount > 1 ? "s" : ""}
            {lastOralExercise ? ` — dernier : « ${lastOralExercise.title} »` : ""} —{" "}
            <Link href="/oral" className="font-semibold text-primary hover:underline">
              voir l&apos;entraînement oral
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

      {mastery.total > 0 ? (
        <section aria-labelledby="mastery-title">
          <h2 id="mastery-title" className="text-lg font-semibold text-foreground">
            Votre progression
          </h2>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            {mastery.acquis} acquis · {mastery.aConsolider} à consolider · {mastery.aRevoir} à revoir
          </p>

          {toReview.length > 0 ? (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                À revoir
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {toReview.map((r) => (
                  <SkillReviewCard key={r.key} recommendation={r} />
                ))}
              </div>
            </div>
          ) : null}

          {toConsolidate.length > 0 ? (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                À consolider
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {toConsolidate.map((r) => (
                  <SkillReviewCard key={r.key} recommendation={r} />
                ))}
              </div>
            </div>
          ) : null}

          {toReview.length === 0 && toConsolidate.length === 0 ? (
            <Card className="mb-6">
              <p className="text-sm text-foreground">
                Tout est à jour. Continuez votre parcours pour découvrir de nouvelles notions.
              </p>
              {consolidationSuggestion ? (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Ou faites une petite révision légère :
                  </p>
                  <SkillReviewCard recommendation={consolidationSuggestion} />
                </div>
              ) : null}
            </Card>
          ) : null}

          {acquisNames.length > 0 ? (
            <div>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Acquis
              </h3>
              <div className="flex flex-wrap gap-2">
                {acquisNames.map((name) => (
                  <Badge key={name} variant="success">
                    <CheckIcon className="h-3 w-3" />
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

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
