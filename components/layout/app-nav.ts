/**
 * Navigation principale de l'espace d'apprentissage — source unique pour
 * l'en-tête (`AppHeader`) et la barre d'onglets mobile (`AppTabBar`).
 * L'offre n'y figure plus : elle est accessible depuis le compte, le
 * paywall et les pages commerciales (voir `docs/product/coach-quotidien.md`).
 */
export interface AppNavItem {
  href: string;
  label: string;
  /** Libellé court pour la barre d'onglets mobile (5 colonnes dès 320 px). */
  shortLabel?: string;
  /** Préfixes de chemin qui rendent l'onglet « actif » (en plus de `href`). */
  matches: string[];
}

export const APP_NAV_ITEMS: AppNavItem[] = [
  { href: "/aujourdhui", label: "Aujourd'hui", matches: ["/aujourdhui", "/parcours/seance"] },
  { href: "/parcours", label: "Parcours", matches: ["/parcours"] },
  { href: "/pratiquer", label: "Pratiquer", matches: ["/pratiquer", "/oral"] },
  { href: "/reviser", label: "Réviser", matches: ["/reviser"] },
  { href: "/progression", label: "Progression", shortLabel: "Progrès", matches: ["/progression", "/diagnostic"] },
];

/**
 * Onglet actif pour un chemin donné — le préfixe le plus long gagne, pour
 * que `/parcours/seance` active « Aujourd'hui » et non « Parcours ».
 */
export function getActiveNavHref(pathname: string | null): string | null {
  if (!pathname) return null;
  let best: { href: string; length: number } | null = null;
  for (const item of APP_NAV_ITEMS) {
    for (const prefix of item.matches) {
      if ((pathname === prefix || pathname.startsWith(`${prefix}/`)) && (!best || prefix.length > best.length)) {
        best = { href: item.href, length: prefix.length };
      }
    }
  }
  return best?.href ?? null;
}
