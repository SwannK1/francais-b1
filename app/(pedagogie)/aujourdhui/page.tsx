import type { Metadata } from "next";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";
import AujourdhuiExperience from "./AujourdhuiExperience";

/**
 * `noindex` : écran personnel (la séance dépend de la progression de chacun),
 * même raisonnement que `/progression`.
 */
export const metadata: Metadata = {
  title: "Aujourd'hui",
  description: "Ta séance de français du jour : quoi travailler, pourquoi, et combien de temps.",
  robots: { index: false, follow: true },
};

export default function AujourdhuiPage() {
  return <AujourdhuiExperience publicModules={PUBLIC_MODULES} />;
}
