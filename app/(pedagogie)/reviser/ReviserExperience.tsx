"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ExerciseCard from "@/components/pedagogy/ExerciseCard";
import ProgressBar from "@/components/pedagogy/ProgressBar";
import SkillReviewCard from "@/components/pedagogy/SkillReviewCard";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, ClockIcon, FlagIcon, TargetIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import ViewTracker from "@/lib/analytics/ViewTracker";
import { trackEvent } from "@/lib/analytics/client";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { findModuleForSkill } from "@/lib/pedagogy/logic/module-structure";
import { getReviewItems, type ReviewItem } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import {
  buildReviewHistory,
  bucketForState,
  classifySkillState,
  getSkillConsolidationSuggestion,
  getSkillReviewRecommendations,
  type MasteryBucket,
  type ReviewPriorityBand,
  type ReviewRecommendation,
} from "@/lib/review";
import type { Exercise, Module } from "@/lib/pedagogy/types";

/**
 * Sections dérivées du moteur de révision espacée (`lib/review/`), dans
 * l'ordre d'urgence décroissante. Les modules marqués "à revoir" à la main
 * (intention la plus forte, jamais scorée) sont toujours affichés en tête de
 * "Priorité haute" ; les épreuves d'examen sous le seuil de réussite
 * (`lib/pedagogy/logic/review.ts`, inchangé — aussi utilisé par /parcours et
 * /progression) restent une section à part.
 */
const BAND_LABELS: Record<ReviewPriorityBand, string> = {
  haute: "Priorité haute",
  a_revoir: "À revoir",
  consolidation: "Consolidation",
};

/**
 * Retour immédiat pendant une séance — même 3 catégories pédagogiques que
 * `/progression` (`bucketForState`, `lib/review/summary.ts`), jamais une
 * deuxième règle. `null` ("nouvelle") n'arrive jamais ici : un élément de
 * séance vient toujours d'être pratiqué au moins une fois avant qu'on lise
 * son état.
 */
const BUCKET_FEEDBACK: Record<MasteryBucket, { title: string; message: string }> = {
  aRevoir: { title: "À revoir", message: "On retravaillera cette notion rapidement." },
  aConsolider: {
    title: "À consolider",
    message: "C'est mieux. Elle reviendra plus tard pour vérifier que tu t'en souviens.",
  },
  acquis: { title: "Maîtrisé", message: "Cette notion semble maintenant bien acquise." },
};

const BUCKET_LABEL_PLURAL: Record<MasteryBucket, string> = {
  aRevoir: "à revoir",
  aConsolider: "à consolider",
  acquis: "maîtrisées",
};

/** Séance volontairement courte — voir chantier "moteur de révision" : 5 à 10 éléments, jamais une liste interminable. */
const MAX_SESSION_SIZE = 8;
/** Estimation simple, pas de pondération par type d'exercice — juste assez pour donner un ordre de grandeur honnête. */
const MINUTES_PER_ITEM = 1.5;

interface SessionItem {
  skillId: string;
  module: Module;
  exercise: Exercise;
}

function FlaggedModuleCard({ item, onRemove }: { item: ReviewItem; onRemove: () => void }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
        <Badge variant="secondary">
          <FlagIcon className="h-3 w-3" />
          À revoir
        </Badge>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Y aller
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={onRemove}
          className={cn(buttonClasses("ghost", "md"), "px-3 text-xs text-muted-foreground")}
        >
          Retirer de « à revoir »
        </button>
      </div>
    </Card>
  );
}

function ExamSectionCard({ item }: { item: ReviewItem }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      <Link
        href={item.href}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Y aller
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </Card>
  );
}

export default function ReviserExperience() {
  const { progress, toggleReview, recordResult } = useProgress();
  const { user } = useAuth();

  const [sessionItems, setSessionItems] = useState<SessionItem[] | null>(null);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionAnswered, setSessionAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState<MasteryBucket[]>([]);
  const [sessionRecap, setSessionRecap] = useState<MasteryBucket[] | null>(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  const legacyItems = getReviewItems(progress, PUBLIC_MODULES);
  const flaggedModules = legacyItems.filter((item) => item.kind === "module_flagged");
  const examSections = legacyItems.filter((item) => item.kind === "exam_section");

  const skillRecommendations = getSkillReviewRecommendations(progress, PUBLIC_MODULES);
  const bySkillBand = (band: ReviewPriorityBand) =>
    skillRecommendations.filter((r) => r.priority.band === band);

  // Rien d'urgent depuis le moteur de compétences : une petite piqûre de
  // rappel plutôt qu'une page qui semble vide — voir `getConsolidationSuggestion`.
  const consolidationSuggestion =
    skillRecommendations.length === 0 ? getSkillConsolidationSuggestion(progress, PUBLIC_MODULES) : null;
  const sessionCandidates: ReviewRecommendation[] =
    skillRecommendations.length > 0 ? skillRecommendations : consolidationSuggestion ? [consolidationSuggestion] : [];

  // Le contenu réel des exercices vit dans le catalogue privé, jamais
  // exposé au client (voir docs/architecture/user-lifecycle.md § Premium
  // content boundary) : on ne peut proposer d'embarquer dans la séance que
  // les compétences dont le module est déjà accessible à ce compte — même
  // vérification que partout ailleurs (`canAccess`), jamais un mur payant
  // au milieu d'une séance commencée.
  const sessionPool = sessionCandidates
    .filter((r) => {
      const mod = findModuleForSkill(PUBLIC_MODULES, r.skillId);
      return mod ? canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil) : false;
    })
    .slice(0, MAX_SESSION_SIZE);

  // Basé sur ce qui va réellement s'afficher plus bas (`sessionPool`,
  // `skillRecommendations`), pas sur `sessionCandidates` brut : une
  // suggestion de consolidation unique dont le module n'est pas accessible
  // à ce compte disparaît au filtrage `canAccess` ci-dessus sans qu'aucune
  // autre section n'ait de contenu — sans ce garde-fou la page se
  // retrouvait vide (ni séance, ni « Tu es à jour ») au lieu de retomber
  // sur l'état "à jour".
  const hasAnything =
    flaggedModules.length > 0 ||
    sessionPool.length > 0 ||
    skillRecommendations.length > 0 ||
    examSections.length > 0;

  const currentItem = sessionItems?.[sessionIndex] ?? null;
  const currentEntry = currentItem
    ? buildReviewHistory(progress, PUBLIC_MODULES).find((entry) => entry.skillId === currentItem.skillId)
    : undefined;
  const currentBucket = currentEntry ? bucketForState(classifySkillState(currentEntry)) : null;
  const isLastItem = sessionItems ? sessionIndex + 1 >= sessionItems.length : false;

  async function startSession() {
    setSessionLoading(true);
    setSessionError(false);
    try {
      const response = await fetch("/api/review/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillIds: sessionPool.map((r) => r.skillId) }),
      });
      if (!response.ok) throw new Error("bad status");
      const data: { items?: SessionItem[] } = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      if (items.length === 0) {
        setSessionError(true);
        return;
      }
      trackEvent("review_session_started", { itemCount: items.length });
      setSessionItems(items);
      setSessionIndex(0);
      setSessionAnswered(false);
      setSessionResults([]);
    } catch {
      setSessionError(true);
    } finally {
      setSessionLoading(false);
    }
  }

  function handleExerciseCompleted(correct: boolean) {
    if (!currentItem) return;
    recordResult(currentItem.module, currentItem.exercise, correct);
    setSessionAnswered(true);
  }

  function handleNext() {
    if (!sessionItems || !currentBucket) return;
    const results = [...sessionResults, currentBucket];
    if (isLastItem) {
      trackEvent("review_session_completed", { itemCount: sessionItems.length });
      setSessionItems(null);
      setSessionIndex(0);
      setSessionAnswered(false);
      setSessionResults([]);
      setSessionRecap(results);
    } else {
      setSessionResults(results);
      setSessionIndex((index) => index + 1);
      setSessionAnswered(false);
    }
  }

  function quitSession() {
    setSessionItems(null);
    setSessionIndex(0);
    setSessionAnswered(false);
    setSessionResults([]);
  }

  // --- Bilan de fin de séance ---
  if (sessionRecap) {
    const counts: Record<MasteryBucket, number> = { aRevoir: 0, aConsolider: 0, acquis: 0 };
    for (const bucket of sessionRecap) counts[bucket]++;

    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-foreground">Révision terminée</h1>
        </header>
        <Card>
          <p className="text-sm text-foreground">
            {sessionRecap.length} notion{sessionRecap.length > 1 ? "s" : ""} travaillée
            {sessionRecap.length > 1 ? "s" : ""}
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {(["acquis", "aConsolider", "aRevoir"] as MasteryBucket[])
              .filter((bucket) => counts[bucket] > 0)
              .map((bucket) => (
                <li key={bucket}>
                  {counts[bucket]} {BUCKET_LABEL_PLURAL[bucket]}
                </li>
              ))}
          </ul>
          <Link href="/parcours" className={cn(buttonClasses("primary", "md"), "mt-4")}>
            Continuer mon parcours
          </Link>
        </Card>
      </div>
    );
  }

  // --- Séance en cours ---
  if (sessionItems && currentItem) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-foreground">Révision du jour</h1>
        </header>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Élément {sessionIndex + 1} sur {sessionItems.length}
          </p>
          <button
            type="button"
            onClick={quitSession}
            className="text-xs font-medium text-muted-foreground underline hover:text-foreground"
          >
            Quitter la révision
          </button>
        </div>
        <ProgressBar value={(sessionIndex / sessionItems.length) * 100} className="max-w-sm" />

        <ExerciseCard
          key={currentItem.exercise.id}
          exercise={currentItem.exercise}
          onCompleted={handleExerciseCompleted}
        />

        {sessionAnswered && currentBucket ? (
          <Card>
            <p className="text-sm font-semibold text-foreground">{BUCKET_FEEDBACK[currentBucket].title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{BUCKET_FEEDBACK[currentBucket].message}</p>
            <button type="button" onClick={handleNext} className={cn(buttonClasses("primary", "md"), "mt-3")}>
              {isLastItem ? "Voir le bilan" : "Continuer"}
            </button>
          </Card>
        ) : null}
      </div>
    );
  }

  // --- Écran d'accueil de /reviser ---
  const estimatedMinutes = Math.max(1, Math.round(sessionPool.length * MINUTES_PER_ITEM));

  return (
    <div className="space-y-8">
      <ViewTracker event="review_page_viewed" />
      <header>
        <h1 className="text-2xl font-bold text-foreground">Réviser</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Ce qui mérite d&apos;être revu maintenant, classé par urgence — erreurs répétées, temps
          écoulé depuis la dernière pratique, et ce que tu as marqué à revoir toi-même.
        </p>
      </header>

      {!hasAnything ? (
        <Card>
          <p className="text-sm font-semibold text-foreground">Tu es à jour</p>
          <p className="mt-1 text-sm text-muted-foreground">Aucune révision importante pour le moment.</p>
          <Link href="/parcours" className={cn(buttonClasses("primary", "md"), "mt-4")}>
            Continuer ma séance
          </Link>
        </Card>
      ) : sessionPool.length > 0 ? (
        <section aria-labelledby="session-title">
          <Card className="border-primary/30 bg-primary/[0.03]">
            <div className="mb-2 flex items-center gap-2">
              <TargetIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Révision du jour
              </p>
            </div>
            <h2 id="session-title" className="text-lg font-semibold text-foreground">
              {sessionPool.length} élément{sessionPool.length > 1 ? "s" : ""} à travailler
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <ClockIcon className="h-4 w-4" aria-hidden="true" />
              ≈ {estimatedMinutes} min
            </p>
            {sessionError ? (
              <p className="mt-3 text-sm text-red-600">
                La révision n&apos;a pas pu démarrer. Réessaie dans un instant.
              </p>
            ) : null}
            <button
              type="button"
              onClick={startSession}
              disabled={sessionLoading}
              className={cn(buttonClasses("primary", "md"), "mt-4 disabled:opacity-60")}
            >
              {sessionLoading ? "Préparation..." : "Commencer ma révision"}
            </button>
          </Card>
        </section>
      ) : skillRecommendations.length > 0 ? (
        <>
          {bySkillBand("haute").length > 0 ? (
            <section aria-labelledby="review-haute-title">
              <h2 id="review-haute-title" className="mb-3 text-lg font-semibold text-foreground">
                {BAND_LABELS.haute}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {bySkillBand("haute").map((r) => (
                  <SkillReviewCard key={r.key} recommendation={r} />
                ))}
              </div>
            </section>
          ) : null}
          {bySkillBand("a_revoir").length > 0 ? (
            <section aria-labelledby="review-a-revoir-title">
              <h2 id="review-a-revoir-title" className="mb-3 text-lg font-semibold text-foreground">
                {BAND_LABELS.a_revoir}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {bySkillBand("a_revoir").map((r) => (
                  <SkillReviewCard key={r.key} recommendation={r} />
                ))}
              </div>
            </section>
          ) : null}
          {bySkillBand("consolidation").length > 0 ? (
            <section aria-labelledby="review-consolidation-title">
              <h2 id="review-consolidation-title" className="mb-3 text-lg font-semibold text-foreground">
                {BAND_LABELS.consolidation}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {bySkillBand("consolidation").map((r) => (
                  <SkillReviewCard key={r.key} recommendation={r} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      {flaggedModules.length > 0 ? (
        <section aria-labelledby="review-flagged-title">
          <h2 id="review-flagged-title" className="mb-3 text-lg font-semibold text-foreground">
            Modules marqués à revoir
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {flaggedModules.map((item) => (
              <FlaggedModuleCard key={item.key} item={item} onRemove={() => toggleReview(item.moduleId!)} />
            ))}
          </div>
        </section>
      ) : null}

      {examSections.length > 0 ? (
        <section aria-labelledby="review-exam-title">
          <h2 id="review-exam-title" className="mb-3 text-lg font-semibold text-foreground">
            Épreuves à retravailler
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {examSections.map((item) => (
              <ExamSectionCard key={item.key} item={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
