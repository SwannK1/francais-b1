"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LockIcon } from "@/components/ui/icons";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { trackEvent } from "@/lib/analytics/client";

/**
 * Pourquoi ce contenu est verrouillé — chaque situation a son propre message
 * plutôt qu'un texte générique unique (voir `docs/product/coach-quotidien.md`
 * § paywall). `context` est aussi envoyé en `source` de `paywall_viewed` et
 * `premium_cta_clicked`, pour lire le funnel par point de blocage.
 */
export type PremiumLockContext = "module" | "seance" | "exam" | "speaking" | "assessment";

const CONTEXT_MESSAGES: Record<PremiumLockContext, { kicker: string; body: string }> = {
  module: {
    kicker: "Ce module fait partie de l'accès complet.",
    body: "Avec l'accès complet, tu suis tout ton parcours, séance après séance, avec les révisions et la pratique orale.",
  },
  seance: {
    kicker: "Cette séance fait partie de l'accès complet.",
    body: "Continue ton parcours pour accéder aux prochaines séances, aux révisions et aux situations correspondant à ton niveau.",
  },
  exam: {
    kicker: "Cet examen fait partie de l'accès complet.",
    body: "Les examens blancs te mettent en conditions réelles, avec un résultat détaillé par épreuve.",
  },
  speaking: {
    kicker: "Cette pratique orale fait partie de l'accès complet.",
    body: "L'accès complet ouvre toutes les situations orales, avec écoute d'un modèle et auto-évaluation guidée.",
  },
  assessment: {
    kicker: "Cette évaluation fait partie de l'accès complet.",
    body: "Les évaluations de passage vérifient que tu es prêt·e pour le niveau suivant, compétence par compétence.",
  },
};

export default function PremiumLock({
  title,
  description,
  objectives,
  backHref,
  backLabel,
  context = "module",
}: {
  title: string;
  /** Description publique du module/examen (déjà envoyée en métadonnées de page même verrouillé) — jamais de contenu protégé ici. */
  description?: string;
  /** Objectifs publics (`PublicModule.objectives`) — un aperçu cohérent avec ce que `ModuleCard`/`ExamCard` montrent déjà pour ce même contenu verrouillé. */
  objectives?: string[];
  backHref: string;
  backLabel: string;
  context?: PremiumLockContext;
}) {
  const message = CONTEXT_MESSAGES[context];
  const viewTracked = useRef(false);
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;
    trackEvent("paywall_viewed", { source: context });
    // Une vue par montage : `context` ne change pas pendant la vie du composant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <Link href={backHref} className="text-sm font-medium text-primary hover:underline">
        {backLabel}
      </Link>

      <Card className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LockIcon className="h-5 w-5" />
        </span>
        <p className="mt-4 text-sm font-semibold text-primary">{message.kicker}</p>
        <h1 className="mt-1 text-xl font-bold text-foreground">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}

        {objectives && objectives.length > 0 ? (
          <ul className="mx-auto mt-4 max-w-sm space-y-1.5 text-left text-sm text-foreground">
            {objectives.slice(0, 3).map((objective) => (
              <li key={objective} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                {objective}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-4 text-sm text-muted-foreground">{message.body}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Offre « {MAIN_PLAN.name} » : {MAIN_PLAN.priceLabel} par {MAIN_PLAN.interval}, sans engagement. La
          découverte gratuite comprend le test de niveau et une vraie séance à ton niveau.
        </p>
        <Button
          href="/offre"
          size="lg"
          className="mt-6"
          onClick={() => trackEvent("premium_cta_clicked", { source: `premium_lock_${context}` })}
        >
          Voir l&apos;offre complète
        </Button>
      </Card>
    </div>
  );
}
