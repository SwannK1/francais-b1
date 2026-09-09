import { A2_PRACTICE_TRACKS } from "@/lib/pedagogy/audio/a2/tracks";
import { A2_FINAL_EVAL_DOCS, A2_FINAL_EVAL_META } from "@/lib/pedagogy/audio/a2/final-evaluation";
import { voiceProfile } from "@/lib/pedagogy/audio/a2/voices";
import type { A2TrackDefinition } from "@/lib/pedagogy/audio/a2/types";
import type { ComprehensionOraleExercise, Exam } from "@/lib/pedagogy/types";

/**
 * Manifest audio A2 — équivalent du `lib/pedagogy/audio/manifest.ts` du B1,
 * mais totalement autonome : dérivé de `tracks/` (données propres à ce
 * chantier), jamais de `lib/pedagogy/data/modules.ts`/`exams.ts` (fichiers
 * centraux du chantier "A2 contenu" parallèle, non touchés). Voir
 * `docs/integration/a2-audio.md` pour la procédure de raccordement une fois
 * ce module fusionné.
 *
 * Une seule source de vérité par piste : `A2TrackDefinition.turns` porte le
 * texte, à la fois pour la génération audio (`scripts/a2-audio-generate.mjs`)
 * et pour le `transcript` construit ici — jamais retapé à la main.
 */

export interface A2Track {
  id: string;
  exercise: ComprehensionOraleExercise;
  definition: A2TrackDefinition;
}

/** Chemin conventionnel — même convention que le B1 : `/audio/a2/<id>.m4a`. */
export function audioSrcFor(id: string): string {
  return `/audio/a2/${id}.m4a`;
}

/**
 * Transcription lisible : un seul locuteur -> texte brut ; plusieurs
 * locuteurs -> une ligne par tour, préfixée du rôle (même convention de
 * lecture qu'un script de doublage, jamais de reformulation du texte source).
 */
export function transcriptFor(def: A2TrackDefinition): string {
  const distinctRoles = new Set(def.turns.map((t) => t.speakerRole));
  if (distinctRoles.size <= 1) return def.turns.map((t) => t.text).join(" ");
  return def.turns.map((t) => `${t.speakerRole} : ${t.text}`).join("\n");
}

function buildExercise(def: A2TrackDefinition): ComprehensionOraleExercise {
  return {
    ...def.exercise,
    type: "comprehension_orale",
    audioSrc: audioSrcFor(def.id),
    transcript: transcriptFor(def),
  };
}

function buildTrack(def: A2TrackDefinition): A2Track {
  return { id: def.id, exercise: buildExercise(def), definition: def };
}

/** Les 26 pistes de la bibliothèque de pratique (audio + exercice complet). */
export const AUDIO_TRACKS_A2: A2Track[] = A2_PRACTICE_TRACKS.map(buildTrack);

/** Les 4 documents de l'évaluation finale (audio + exercice complet). */
export const AUDIO_TRACKS_A2_FINAL_EVAL: A2Track[] = A2_FINAL_EVAL_DOCS.map(buildTrack);

/** Toutes les pistes A2 (pratique + évaluation finale), pour la validation/génération. */
export const AUDIO_TRACKS_A2_ALL: A2Track[] = [...AUDIO_TRACKS_A2, ...AUDIO_TRACKS_A2_FINAL_EVAL];

/**
 * Évaluation orale A2 finale assemblée en `Exam` — même forme que les
 * examens B1 (`lib/pedagogy/data/exams.ts`), pour une reprise directe une
 * fois le catalogue d'examens A2 créé (voir `docs/integration/a2-audio.md`).
 * Non ajoutée à `EXAMS` (fichier central) : exportée ici, à intégrer par le
 * chantier "A2 contenu"/examens le moment venu.
 */
export const A2_FINAL_EVALUATION: Exam = {
  id: A2_FINAL_EVAL_META.id,
  slug: A2_FINAL_EVAL_META.slug,
  title: A2_FINAL_EVAL_META.title,
  type: "interne",
  level: "A2",
  description: A2_FINAL_EVAL_META.description,
  durationMinutes: A2_FINAL_EVAL_META.durationMinutes,
  maxScore: AUDIO_TRACKS_A2_FINAL_EVAL.reduce((sum, t) => sum + t.exercise.questions.length, 0),
  passingScore: A2_FINAL_EVAL_META.passingScore,
  isBlanc: true,
  sections: [
    {
      id: "bilan-a2-co",
      title: "Compréhension orale",
      delfSection: "comprehension_orale",
      durationMinutes: A2_FINAL_EVAL_META.durationMinutes,
      maxScore: AUDIO_TRACKS_A2_FINAL_EVAL.reduce((sum, t) => sum + t.exercise.questions.length, 0),
      exercises: AUDIO_TRACKS_A2_FINAL_EVAL.map((t) => t.exercise),
    },
  ],
};

/** Profils vocaux effectivement utilisés par une piste, dans l'ordre d'apparition. */
export function voiceIdsUsed(def: A2TrackDefinition): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const turn of def.turns) {
    if (!seen.has(turn.voiceId)) {
      seen.add(turn.voiceId);
      order.push(turn.voiceId);
    }
  }
  return order;
}

/** Table locuteur -> profil vocal (rôle -> label "Voix A"/"Voix B"...), pour la doc/QA. */
export function speakerVoiceTable(def: A2TrackDefinition): { speakerRole: string; voiceLabel: string; gender: "H" | "F" }[] {
  const seen = new Map<string, { voiceLabel: string; gender: "H" | "F" }>();
  for (const turn of def.turns) {
    if (seen.has(turn.speakerRole)) continue;
    const profile = voiceProfile(turn.voiceId);
    seen.set(turn.speakerRole, { voiceLabel: profile.label, gender: profile.gender });
  }
  return [...seen.entries()].map(([speakerRole, v]) => ({ speakerRole, ...v }));
}
