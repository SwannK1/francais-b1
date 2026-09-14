"use client";

import { useEffect, useState } from "react";
import GuidedSessionCard from "@/components/pedagogy/GuidedSessionCard";
import ProgressPreviewCard from "@/components/marketing/ProgressPreviewCard";
import { buildDailySession } from "@/lib/daily/session-engine";
import { getModuleCompletionRate } from "@/lib/pedagogy/logic/progress";
import { useProgress } from "@/lib/pedagogy/useProgress";
import { useAuth } from "@/lib/auth/AuthProvider";
import { canAccess } from "@/lib/commerce/access";
import { fetchPublicModules, getCachedPublicModules } from "@/lib/pedagogy/publicModulesCache";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Remplace l'aperçu générique du hero par la vraie séance du jour de
 * l'apprenant, dès qu'elle est calculable — même moteur
 * (`buildDailySession`) et même carte (`GuidedSessionCard`) que la section
 * "Aujourd'hui" de `/parcours` : jamais une seconde logique de
 * recommandation. Repli sur `ProgressPreviewCard` (aperçu "exemple",
 * inchangé) pour un visiteur sans historique ou tant que les modules ne
 * sont pas encore chargés — jamais d'état vide dans le hero.
 */
export default function HeroSessionPreview({ className }: { className?: string }) {
  const { progress } = useProgress();
  const { user } = useAuth();
  const hasStarted = Boolean(progress.placementCompletedAt) || progress.moduleProgress.length > 0;
  const [modules, setModules] = useState<PublicModule[] | null>(getCachedPublicModules());

  useEffect(() => {
    if (!hasStarted || modules) return;
    let cancelled = false;
    fetchPublicModules().then((mods) => {
      if (!cancelled) setModules(mods);
    });
    return () => {
      cancelled = true;
    };
  }, [hasStarted, modules]);

  if (hasStarted && modules) {
    const isAccessible = (mod: PublicModule) =>
      canAccess({ kind: "module", slug: mod.slug }, user?.premiumUntil);
    const guidedSession = buildDailySession(progress, modules, { isAccessible });
    const rawGuidedSession = guidedSession ? null : buildDailySession(progress, modules);

    if (guidedSession || rawGuidedSession) {
      const sessionModule = guidedSession
        ? modules.find((mod) => mod.id === guidedSession.moduleId)
        : undefined;
      const completionRate = sessionModule
        ? getModuleCompletionRate(progress, sessionModule.id, sessionModule.totalExercises)
        : undefined;

      return (
        <div className={className}>
          <GuidedSessionCard
            plan={guidedSession ?? rawGuidedSession!}
            href={guidedSession ? `/parcours/seance?module=${guidedSession.moduleSlug}` : "/offre"}
            locked={!guidedSession}
            completionRate={completionRate}
          />
        </div>
      );
    }
  }

  return <ProgressPreviewCard variant="compact" className={className} />;
}
