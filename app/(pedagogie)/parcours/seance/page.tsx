import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getModuleBySlug } from "@/lib/pedagogy/data/modules";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import SeanceExperience from "./SeanceExperience";

export const metadata: Metadata = {
  title: "Séance du jour",
  description: "Une séance guidée courte pour progresser aujourd'hui, à ton rythme.",
  robots: { index: false, follow: true },
};

/**
 * Page d'exécution de la séance guidée du jour. La progression étant
 * propre au client (`localStorage`, voir `lib/pedagogy/useProgress.ts`), le
 * choix du module ciblé ne peut pas être décidé ici — il est calculé par
 * `/parcours` (`buildDailySession`) et transmis via `?module=<slug>`. Cette
 * page ne fait qu'appliquer, côté serveur, la même vérification d'accès que
 * `/parcours/module/[slug]` avant de livrer le contenu complet du module.
 */
export default async function SeancePage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string | string[] }>;
}) {
  const { module: moduleParam } = await searchParams;
  const slug = Array.isArray(moduleParam) ? moduleParam[0] : moduleParam;

  if (!slug) {
    redirect("/parcours");
  }

  const mod = getModuleBySlug(slug);
  if (!mod) {
    notFound();
  }

  const user = await getCurrentUser();
  const isFree = canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);

  if (!isFree) {
    return (
      <PremiumLock
        title={mod.title}
        description="Cette séance guidée fait partie de l'offre complète."
        objectives={mod.objectives}
        backHref="/parcours"
        backLabel="← Retour au parcours"
      />
    );
  }

  return <SeanceExperience mod={mod} />;
}
