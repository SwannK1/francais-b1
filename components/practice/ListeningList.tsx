"use client";

import Link from "next/link";
import LearningStateBadge from "@/components/pedagogy/LearningStateBadge";
import { LockIcon } from "@/components/ui/icons";
import { getModuleCapability } from "@/lib/pedagogy/logic/capability";
import { getModuleLearningState } from "@/lib/pedagogy/logic/learning-states";
import { getEffectiveLevel } from "@/lib/pedagogy/logic/parcours";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import type { PublicModule } from "@/lib/pedagogy/types";

const MAX_ITEMS = 6;

/**
 * Compréhension orale déjà présente dans les modules (leçons « écoute »),
 * au niveau actuel de l'apprenant — mise en valeur par simple lien vers le
 * module, jamais en recopiant l'audio ou ses questions (contenu protégé :
 * la vérification d'accès reste celle de la page module, côté serveur ;
 * `canAccess` ici ne sert qu'à afficher le cadenas).
 */
export default function ListeningList({ publicModules }: { publicModules: PublicModule[] }) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const level = getEffectiveLevel(progress, publicModules);

  const listeningModules = publicModules
    .filter((mod) => mod.level === level && mod.lessons.some((lesson) => lesson.type === "ecoute"))
    .map((mod) => ({ mod, state: getModuleLearningState(progress, mod) }))
    // D'abord ce qui est en cours, puis à découvrir, et l'acquis en dernier.
    .sort((a, b) => rank(a.state) - rank(b.state))
    .slice(0, MAX_ITEMS);

  if (listeningModules.length === 0) {
    return <p className="text-sm text-muted-foreground">Pas encore d&apos;écoute disponible à ton niveau.</p>;
  }

  return (
    <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
      {listeningModules.map(({ mod, state }) => {
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
                  {mod.title} · {mod.level}
                </span>
              </span>
              {locked ? (
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

function rank(state: string): number {
  return state === "en_cours" ? 0 : state === "a_decouvrir" ? 1 : state === "a_consolider" || state === "a_revoir" ? 2 : 3;
}
