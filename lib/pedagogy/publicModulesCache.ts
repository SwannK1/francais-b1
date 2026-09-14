import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Cache client partagé pour `/api/modules/public` — une seule requête par
 * onglet même si plusieurs composants montés en même temps (header, hero,
 * CTA mobile...) en ont besoin. Extrait de `components/marketing/PrimaryCta.tsx`
 * pour que `HeroSessionPreview` réutilise exactement la même requête/cache
 * plutôt que de la dupliquer.
 */
let cachedModules: PublicModule[] | null = null;
let pendingFetch: Promise<PublicModule[]> | null = null;

export function fetchPublicModules(): Promise<PublicModule[]> {
  if (cachedModules) return Promise.resolve(cachedModules);
  if (!pendingFetch) {
    pendingFetch = fetch("/api/modules/public")
      .then((res) => (res.ok ? res.json() : { modules: [] }))
      .then((data: { modules?: PublicModule[] }) => {
        cachedModules = data.modules ?? [];
        return cachedModules;
      })
      .catch(() => {
        cachedModules = [];
        return cachedModules;
      });
  }
  return pendingFetch;
}

/** Snapshot synchrone du cache — `null` tant qu'aucun fetch n'a résolu. */
export function getCachedPublicModules(): PublicModule[] | null {
  return cachedModules;
}
