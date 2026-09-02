import type { Metadata } from "next";
import ProgressionClient from "./ProgressionClient";

/**
 * `noindex` : cette page est un tableau de bord personnel (progression
 * stockée en localStorage/compte, voir lib/pedagogy/useProgress.ts) — la
 * même URL affiche un contenu différent pour chaque visiteur et n'a aucune
 * valeur de contenu unique pour la recherche, contrairement à /parcours ou
 * aux pages de module.
 */
export const metadata: Metadata = {
  title: "Ton bilan",
  robots: { index: false, follow: true },
};

export default function ProgressionPage() {
  return <ProgressionClient />;
}
