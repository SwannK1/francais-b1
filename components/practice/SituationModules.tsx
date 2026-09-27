"use client";

import Link from "next/link";
import LearningStateBadge from "@/components/pedagogy/LearningStateBadge";
import { LockIcon } from "@/components/ui/icons";
import { getModuleCapability } from "@/lib/pedagogy/logic/capability";
import { getModuleLearningState } from "@/lib/pedagogy/logic/learning-states";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Liste « je sais faire / à consolider / à découvrir » d'une situation :
 * chaque ligne est une capacité (formulée depuis la description du module)
 * avec son état. Le cadenas n'est qu'un affichage — l'accès réel est vérifié
 * par la page module, côté serveur.
 */
export default function SituationModules({ modules }: { modules: PublicModule[] }) {
  const { progress } = useProgress();
  const { user } = useAuth();

  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
      {modules.map((mod) => {
        const state = getModuleLearningState(progress, mod);
        const locked = !canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
        return (
          <li key={mod.id}>
            <Link
              href={locked ? "/offre" : `/parcours/module/${mod.slug}`}
              className="flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">{getModuleCapability(mod)}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {mod.level} · {mod.title}
                </span>
              </span>
              {locked && state === "a_decouvrir" ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground">
                  <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Accès complet
                </span>
              ) : (
                <LearningStateBadge state={state} />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
