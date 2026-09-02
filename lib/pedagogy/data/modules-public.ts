import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public.generated";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * API stable au-dessus des données générées (`modules-public.generated.ts`,
 * voir `scripts/generate-public-modules.mjs`) — jamais d'import vers
 * `data/modules.ts` ici, c'est ce qui rend ce fichier sûr à importer depuis
 * du code client. Voir `docs/architecture/user-lifecycle.md` §
 * Premium content boundary.
 */
export { PUBLIC_MODULES };

export function getPublicModuleBySlug(slug: string): PublicModule | undefined {
  return PUBLIC_MODULES.find((mod) => mod.slug === slug);
}

export function getPublicModulesByLevel(level: PublicModule["level"]): PublicModule[] {
  return PUBLIC_MODULES.filter((mod) => mod.level === level);
}
