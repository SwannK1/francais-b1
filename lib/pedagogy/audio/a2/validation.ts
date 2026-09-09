import type { A2TrackDefinition } from "@/lib/pedagogy/audio/a2/types";

/**
 * Règles de validation pures (aucun accès disque) partagées entre
 * `a2-content-integrity.test.ts` (vitest, exécuté par `npm test`) et
 * `scripts/a2-audio-validate.mjs` (rapport humain, `npm run audio:a2:status`)
 * — une seule définition de chaque règle, jamais dupliquée entre les deux.
 */

export function duplicates<T>(values: T[]): T[] {
  const seen = new Map<T, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}

/**
 * Deux locuteurs différents d'un même document ne doivent jamais partager le
 * même profil vocal — sinon l'apprenant ne peut pas distinguer les tours de
 * parole (défaut identifié sur 3 pistes B1, voir
 * `docs/b1/audio-human-recording-plan.md` §1). Un narrateur unique (un seul
 * `speakerRole`) n'est bien sûr pas concerné.
 */
export function duplicateVoiceIssues(def: A2TrackDefinition): string[] {
  const voiceToRoles = new Map<string, Set<string>>();
  for (const turn of def.turns) {
    const roles = voiceToRoles.get(turn.voiceId) ?? new Set<string>();
    roles.add(turn.speakerRole);
    voiceToRoles.set(turn.voiceId, roles);
  }
  const issues: string[] = [];
  for (const [voiceId, roles] of voiceToRoles) {
    if (roles.size > 1) {
      issues.push(`${def.id}: le profil vocal "${voiceId}" est partagé par ${roles.size} locuteurs différents (${[...roles].join(", ")})`);
    }
  }
  return issues;
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function structuralIssues(def: A2TrackDefinition): string[] {
  const issues: string[] = [];
  if (!SLUG_RE.test(def.id)) issues.push(`${def.id}: id non conforme au format kebab-case`);
  if (def.turns.length === 0) issues.push(`${def.id}: aucun tour de parole`);
  for (const turn of def.turns) {
    if (!turn.text.trim()) issues.push(`${def.id}: tour de parole vide (${turn.speakerRole})`);
    if (!turn.speakerRole.trim()) issues.push(`${def.id}: rôle de locuteur vide`);
  }
  if (def.exercise.questions.length === 0) issues.push(`${def.id}: aucune question de compréhension`);
  if (def.exercise.id !== def.id) issues.push(`${def.id}: exercise.id ("${def.exercise.id}") différent de l'id de piste`);
  if (!(def.rateWpm >= 100 && def.rateWpm <= 220)) issues.push(`${def.id}: débit (${def.rateWpm} mots/min) hors plage plausible`);
  if (def.gapSeconds < 0) issues.push(`${def.id}: gapSeconds négatif`);
  issues.push(...duplicateVoiceIssues(def));
  return issues;
}

/**
 * Estimation grossière de durée (mots du script / débit + silences entre
 * tours) — utilisée uniquement comme garde-fou "ordre de grandeur" (le
 * rapport `npm run audio:a2:status` compare à la durée réelle via `afinfo`
 * quand disponible ; ceci reste vrai même hors macOS).
 */
export function estimatedDurationSeconds(def: A2TrackDefinition): number {
  const wordCount = def.turns.reduce((sum, t) => sum + t.text.trim().split(/\s+/).filter(Boolean).length, 0);
  const speechSeconds = (wordCount / def.rateWpm) * 60;
  const gaps = Math.max(0, def.turns.length - 1) * def.gapSeconds;
  return speechSeconds + gaps;
}
