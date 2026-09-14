import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import type { ReviewPriorityBand, ReviewRecommendation } from "@/lib/review";

/**
 * Carte d'une recommandation du moteur de révision espacée (`lib/review/`) —
 * partagée entre `/reviser` et `/progression` : les deux pages affichent la
 * même recommandation (mêmes raisons, même action réelle), jamais deux
 * présentations divergentes de la même donnée.
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

export default function SkillReviewCard({ recommendation }: { recommendation: ReviewRecommendation }) {
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
