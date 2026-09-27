"use client";

import Link from "next/link";
import LearningStateBadge from "@/components/pedagogy/LearningStateBadge";
import { LIFE_SITUATIONS } from "@/lib/pedagogy/data/life-situations";
import { summarizeSituation } from "@/lib/pedagogy/logic/situations";
import { useProgress } from "@/lib/pedagogy/useProgress";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Les situations de vie en tuiles compactes — l'entrée « vivante » de
 * Pratiquer. État lisible (« 2 sur 6 acquis »), jamais un pourcentage.
 */
export default function SituationTiles({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress } = useProgress();

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {LIFE_SITUATIONS.map((situation) => {
        const summary = summarizeSituation(situation, progress, publicModules);
        return (
          <li key={situation.id}>
            <Link
              href={`/pratiquer/situations/${situation.id}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="text-base font-semibold text-foreground">{situation.title}</span>
                <LearningStateBadge state={summary.overall} />
              </span>
              <span className="mt-1 text-sm text-muted-foreground">{situation.promise}</span>
              <span className="mt-3 text-xs font-medium text-muted-foreground">
                {summary.acquiredCount > 0
                  ? `${summary.acquiredCount} sur ${summary.modules.length} acquis`
                  : `${summary.modules.length} capacités à découvrir`}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
