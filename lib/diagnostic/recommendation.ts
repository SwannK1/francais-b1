import { PARCOURS_STAGES } from "@/lib/pedagogy/data/parcours-stages";
import type { DiagnosticLevel, DiagnosticRecommendation, DiagnosticSkill } from "@/lib/diagnostic/types";

/**
 * Traduit un niveau estimé (+ domaines fragiles) en un vrai point d'entrée du
 * parcours — jamais une URL inventée. Seule lecture volontaire du cœur
 * pédagogique dans ce chantier (voir `types.ts`) : uniquement les métadonnées
 * de deux étapes déjà publiques (`slug`, `title`), jamais leur contenu ni
 * leur logique. Si l'une de ces étapes venait à être renommée/supprimée, le
 * lien replie sur `/parcours` plutôt que de pointer vers une page inexistante.
 *
 * La plateforme couvre désormais A1, A2 et B1 (voir
 * `docs/integration/a1-content.md` / `a2-content.md`) : chaque niveau
 * recommandé pointe vers le vrai premier contenu de son propre parcours,
 * jamais vers une étape B1 utilisée comme repli générique.
 */
const FALLBACK_STAGE = { slug: "", title: "Le parcours" };

function findStage(slug: string) {
  const stage = PARCOURS_STAGES.find((s) => s.slug === slug);
  return stage ? { slug: stage.slug, title: stage.title } : FALLBACK_STAGE;
}

function ctaHref(slug: string): string {
  return slug ? `/parcours/${slug}` : "/parcours";
}

export function recommendStage(
  level: DiagnosticLevel,
  weaknesses: DiagnosticSkill[]
): DiagnosticRecommendation {
  if (level === "A1") {
    const stage = findStage("decouverte");
    return {
      stageSlug: ctaHref(stage.slug),
      stageTitle: stage.title,
      message:
        "Tu débutes en français. Le parcours démarre par les bases essentielles du quotidien pour construire des fondations solides avant d'avancer.",
    };
  }

  if (level === "A2") {
    const stage = findStage("a2-poser-les-bases");
    return {
      stageSlug: ctaHref(stage.slug),
      stageTitle: stage.title,
      message:
        "Tu as déjà de bonnes bases, mais certaines notions clés te manquent encore. Cette étape va consolider ce socle avant d'aborder des sujets plus avancés.",
    };
  }

  // level === "B1"
  if (weaknesses.length > 0) {
    const stage = findStage("poser-les-bases");
    return {
      stageSlug: ctaHref(stage.slug),
      stageTitle: stage.title,
      message:
        "Tu maîtrises l'essentiel du niveau B1, mais certains points restent fragiles. Cette étape va d'abord les solidifier avant d'aller plus loin.",
    };
  }

  const stage = findStage("argumenter-et-echanger");
  return {
    stageSlug: ctaHref(stage.slug),
    stageTitle: stage.title,
    message:
      "Bravo, tes réponses montrent une bonne maîtrise du niveau B1 dans tous les domaines testés. Tu peux passer directement à cette étape pour aller plus loin.",
  };
}
