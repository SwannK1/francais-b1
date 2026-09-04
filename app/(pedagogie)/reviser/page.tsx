"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRightIcon, FlagIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import { getReviewItems, type ReviewItem, type ReviewItemKind } from "@/lib/pedagogy/logic/review";
import { useProgress } from "@/lib/pedagogy/useProgress";

const SECTION_TITLES: Record<ReviewItemKind, string> = {
  module_flagged: "Modules que tu as marqués à revoir",
  weak_skill: "Compétences à travailler",
  module_in_progress: "Modules commencés, pas encore terminés",
  exam_section: "Épreuves à retravailler",
};

const SECTION_ORDER: ReviewItemKind[] = [
  "module_flagged",
  "weak_skill",
  "module_in_progress",
  "exam_section",
];

function ReviewItemCard({
  item,
  onRemove,
}: {
  item: ReviewItem;
  /** Uniquement pour `module_flagged` : les autres catégories sont dérivées, jamais retirées à la main. */
  onRemove?: () => void;
}) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
        {item.kind === "module_flagged" ? (
          <Badge variant="secondary">
            <FlagIcon className="h-3 w-3" />
            À revoir
          </Badge>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Y aller
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className={cn(buttonClasses("ghost", "md"), "px-3 text-xs text-muted-foreground")}
          >
            Retirer de « à revoir »
          </button>
        ) : null}
      </div>
    </Card>
  );
}

export default function ReviserPage() {
  const { progress, toggleReview } = useProgress();
  const items = getReviewItems(progress, PUBLIC_MODULES);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Réviser</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Ce que tu as marqué à revoir, tes points faibles, les modules laissés en cours, et les
          épreuves à retravailler — dans cet ordre, sans classement caché.
        </p>
      </header>

      {items.length === 0 ? (
        <Card>
          <p className="text-sm text-muted-foreground">
            Rien à réviser pour l&apos;instant. Continue ton parcours, les points à retravailler
            apparaîtront ici automatiquement.
          </p>
          <Link href="/parcours" className={cn(buttonClasses("primary", "md"), "mt-4")}>
            Retour au parcours
          </Link>
        </Card>
      ) : (
        SECTION_ORDER.map((kind) => {
          const kindItems = items.filter((item) => item.kind === kind);
          if (kindItems.length === 0) return null;
          return (
            <section key={kind} aria-labelledby={`review-${kind}-title`}>
              <h2 id={`review-${kind}-title`} className="mb-3 text-lg font-semibold text-foreground">
                {SECTION_TITLES[kind]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {kindItems.map((item) => (
                  <ReviewItemCard
                    key={item.key}
                    item={item}
                    onRemove={item.moduleId ? () => toggleReview(item.moduleId!) : undefined}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
