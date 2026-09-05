import type { Metadata } from "next";
import ReviserExperience from "./ReviserExperience";

/**
 * `noindex` : comme /progression, cette page est un tableau de bord
 * personnel (progression stockée en localStorage/compte, voir
 * lib/pedagogy/useProgress.ts) — la même URL affiche un contenu différent
 * pour chaque visiteur et n'a aucune valeur de contenu unique pour la
 * recherche.
 */
export const metadata: Metadata = {
  title: "Réviser",
  robots: { index: false, follow: true },
};

export default function ReviserPage() {
  return <ReviserExperience />;
}
