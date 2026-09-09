"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, FlagIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import ViewTracker from "@/lib/analytics/ViewTracker";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { getReviewItems, type ReviewItem } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";
import {
  getSkillConsolidationSuggestion,
  getSkillReviewRecommendations,
  type ReviewPriorityBand,
  type ReviewRecommendation,
} from "@/lib/review";

/**
 * Sections dérivées du moteur de révision espacée (`lib/review/`), dans
 * l'ordre d'urgence décroissante. Les modules marqués "à revoir" à la main
 * (intention la plus forte, jamais scorée) sont toujours affichés en tête de
 * "Priorité haute" ; les épreuves d'examen sous le seuil de réussite
 * (`lib/pedagogy/logic/review.ts`, inchangé — aussi utilisé par /parcours et
 * /progression) restent une section à part, comme avant ce chantier.
 */
const BAND_LABELS: Record<ReviewPriorityBand, string> = {
  haute: "Priorité haute",
  a_revoir: "À revoir",
  consolidation: "Consolidation",
};

const BAND_BADGE_VARIANT: Record<ReviewPriorityBand, "primary" | "secondary" | "neutral"> = {
  haute: "primary",
  a_revoir: "secondary",
  consolidation: "neutral",
};

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

function SkillRecommendationCard({ recommendation }: { recommendation: ReviewRecommendation }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{DOMAIN_LABELS[recommendation.domain]}</p>
          <h3 className="text-sm font-semibold text-foreground">{recommendation.title}</h3>
        </div>
        <Badge variant={BAND_BADGE_VARIANT[recommendation.priority.band]}>
          {BAND_LABELS[recommendation.priority.band]}
        </Badge>
      </div>
      <ul className="mt-2 space-y-0.5">
        {recommendation.reasons.map((reason) => (
          <li key={reason} className="text-sm text-muted-foreground">
            {reason}
          </li>
        ))}
      </ul>
      <Link
        href={recommendation.href}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        {recommendation.actionLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </Card>
  );
}

export default function ReviserExperience() {
  const { progress, toggleReview } = useProgress();

  const legacyItems = getReviewItems(progress, PUBLIC_MODULES);
  const flaggedModules = legacyItems.filter((item) => item.kind === "module_flagged");
  const examSections = legacyItems.filter((item) => item.kind === "exam_section");

  const skillRecommendations = getSkillReviewRecommendations(progress, PUBLIC_MODULES);
  const bySkillBand = (band: ReviewPriorityBand) =>
    skillRecommendations.filter((r) => r.priority.band === band);

  const hasAnything =
    flaggedModules.length > 0 || skillRecommendations.length > 0 || examSections.length > 0;
  const consolidationSuggestion = hasAnything
    ? null
    : getSkillConsolidationSuggestion(progress, PUBLIC_MODULES);

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
        consolidationSuggestion ? (
          <section aria-labelledby="review-consolidation-title">
            <h2 id="review-consolidation-title" className="mb-3 text-lg font-semibold text-foreground">
              Rien d&apos;urgent — une petite révision légère ?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <SkillRecommendationCard recommendation={consolidationSuggestion} />
            </div>
          </section>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">
              Rien à réviser pour l&apos;instant, tu es à jour. Continue ton parcours, les points à
              retravailler apparaîtront ici automatiquement.
            </p>
            <Link href="/parcours" className={cn(buttonClasses("primary", "md"), "mt-4")}>
              Retour au parcours
            </Link>
          </Card>
        )
      ) : (
        <>
          {flaggedModules.length > 0 || bySkillBand("haute").length > 0 ? (
            <section aria-labelledby="review-haute-title">
              <h2 id="review-haute-title" className="mb-3 text-lg font-semibold text-foreground">
                {BAND_LABELS.haute}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {flaggedModules.map((item) => (
                  <FlaggedModuleCard
                    key={item.key}
                    item={item}
                    onRemove={() => toggleReview(item.moduleId!)}
                  />
                ))}
                {bySkillBand("haute").map((r) => (
                  <SkillRecommendationCard key={r.key} recommendation={r} />
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
                  <SkillRecommendationCard key={r.key} recommendation={r} />
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
                  <SkillRecommendationCard key={r.key} recommendation={r} />
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
        </>
      )}
    </div>
  );
}
