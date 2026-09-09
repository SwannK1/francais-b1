/**
 * Types du parcours A1 — chantier `chantier/a1-content`.
 *
 * Isolation volontaire vis-à-vis de `lib/pedagogy/types.ts` : `StageId` y est
 * une union fermée qui ne connaît que les étapes B1 (`b1-debut`,
 * `preparation-examen`...). L'étendre pour y ajouter les étapes A1 changerait
 * un fichier central partagé avec les chantiers `a1-audio`, `a2-content` et
 * `a2-audio`, qui touchent probablement la même union en parallèle — source
 * de conflits garantie. `A1StageId` ci-dessous est donc une union séparée,
 * utilisée uniquement par les données de ce dossier.
 *
 * `A1Module` est une copie structurelle de `Module` (voir `../../types.ts`)
 * où seul `stageId` change de type (`A1StageId` au lieu de `StageId`) et où
 * `level` est figé à `"A1"`. Tout le reste (Lesson, Activity, Exercise,
 * VocabularyEntry, LanguagePoint, SkillDomain...) est réutilisé tel quel
 * depuis le module central : ces types ne référencent jamais `StageId`, donc
 * aucune raison de les dupliquer. Voir `docs/integration/a1-content.md` pour
 * la bascule prévue vers `Module`/`StageId` au moment du merge.
 */
import type {
  LanguagePoint,
  Lesson,
  SkillDomain,
  VocabularyEntry,
} from "@/lib/pedagogy/types";

export type A1StageKind = "diagnostic" | "content" | "practice" | "bilan";

/**
 * Étapes du parcours A1. Nomenclature calquée sur `StageId` (B1) : "Stage" en
 * anglais dans le code, "Étape" pour l'apprenant dans l'UI.
 */
export type A1StageId =
  | "a1-decouverte"
  | "a1-vie-quotidienne"
  | "a1-sortir-et-bouger"
  | "a1-quotidien-et-loisirs"
  | "a1-preparation-examen"
  | "a1-bilan";

export interface A1ParcoursStage {
  id: A1StageId;
  slug: string;
  order: number;
  kind: A1StageKind;
  title: string;
  /** Formulation "je peux..." : ce que l'étape permet de savoir faire. */
  objective: string;
  description: string;
}

/** Copie structurelle de `Module` — voir le commentaire de fichier ci-dessus. */
export interface A1Module {
  id: string;
  slug: string;
  level: "A1";
  title: string;
  description: string;
  objectives: string[];
  domain: SkillDomain;
  stageId: A1StageId;
  estimatedMinutes: number;
  lessons: Lesson[];
  situation?: string;
  vocabulary?: VocabularyEntry[];
  languagePoints?: LanguagePoint[];
  examLinks?: string[];
  miniEvaluationThreshold?: number;
}
