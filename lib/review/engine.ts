import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type { ReviewHistoryEntry, ReviewPriority, ReviewPriorityBand, ReviewRecommendation, ReviewState } from "./types";

/**
 * Moteur de révision espacée — déterministe, sans effet de bord, sans appel
 * réseau ni horloge cachée (`now` est toujours un paramètre explicite).
 *
 * DONNÉES UTILISÉES (voir `ReviewHistoryEntry`, construit par `adapter.ts`
 * à partir de `UserProgress.skillProgress`, jamais recalculées ici) :
 * - `completedExercises` / `totalExercises` -> couverture de la compétence
 *   (combien du stock d'exercices a déjà été tenté) et "nombre de tentatives".
 * - `successRate` -> taux de réussite cumulé depuis toujours.
 * - `recentOutcomes` -> fenêtre bornée (5 derniers résultats) : réussite
 *   récente, erreurs répétées (série en fin de fenêtre), réussite après
 *   erreur (dernier résultat vrai juste après un faux).
 * - `lastPracticedAt` -> temps écoulé depuis la dernière pratique ; absence
 *   prolongée = abandon éventuel quand la compétence n'est pas encore
 *   maîtrisée, ou compétence "oubliée" quand elle l'était.
 * - `difficulty` -> niveau CECRL le plus élevé rencontré pour cette
 *   compétence dans le catalogue ; raccourcit l'intervalle avant décroissance
 *   (une compétence difficile s'oublie plus vite) et pèse légèrement plus
 *   dans le score de priorité.
 *
 * SEUILS (constantes ci-dessous, toutes documentées à leur définition) :
 * `FRAGILE_STREAK`, `FRAGILE_RECENT_RATE_THRESHOLD`, `MASTERY_RATE_THRESHOLD`,
 * `MASTERY_COVERAGE_THRESHOLD`, `STALE_LEARNING_DAYS`, `DECAY_INTERVAL_DAYS`.
 *
 * ÉTATS ET TRANSITIONS (voir `classifySkill`, règles évaluées dans cet ordre,
 * la première qui s'applique gagne) :
 * 1. Aucun exercice fait -> `nouvelle`.
 * 2. Deux échecs consécutifs ou plus en fin de fenêtre récente -> `fragile`
 *    (erreurs répétées).
 * 3. Fenêtre récente d'au moins 3 résultats et taux de réussite récent sous
 *    `FRAGILE_RECENT_RATE_THRESHOLD` -> `fragile` (effondrement du niveau).
 * 4. Taux de réussite cumulé au-dessus de `MASTERY_RATE_THRESHOLD`, couverture
 *    au-dessus de `MASTERY_COVERAGE_THRESHOLD`, et dernier résultat pas un
 *    échec :
 *    - si le temps écoulé depuis la dernière pratique dépasse l'intervalle
 *      de décroissance de son niveau de difficulté -> `a_revoir` (compétence
 *      "oubliée" : redevient à revoir, ne reste jamais `maitrisee` pour
 *      toujours) ;
 *    - sinon -> `maitrisee`.
 * 5. Dernier résultat en échec (mais pas encore une série) -> `a_revoir`
 *    (erreur isolée récente).
 * 6. Absence de plus de `STALE_LEARNING_DAYS` jours alors que la compétence
 *    n'est pas encore couverte à 100 % -> `a_revoir` (abandon éventuel :
 *    laissée de côté avant d'être maîtrisée).
 * 7. Sinon -> `en_apprentissage`.
 *
 * Une compétence redevient `maitrisee` dès qu'elle repasse la règle 4 sans
 * dépasser son intervalle de décroissance (ex. reprise réussie après une
 * période `a_revoir`) ; elle ne le reste que tant que cet intervalle n'est
 * pas dépassé — ce n'est jamais un état figé.
 */

/** Deux échecs d'affilée en fin de fenêtre récente = série d'erreurs, pas un aléa isolé. */
const FRAGILE_STREAK = 2;
/** Sous ce taux de réussite récent (avec au moins 3 résultats), le niveau est jugé effondré. */
const FRAGILE_RECENT_RATE_THRESHOLD = 40;
/** Taux de réussite cumulé minimum pour juger une compétence maîtrisée. */
const MASTERY_RATE_THRESHOLD = 80;
/** Part minimale du stock d'exercices d'une compétence à avoir tenté pour que "maîtrisée" soit fiable. */
const MASTERY_COVERAGE_THRESHOLD = 0.6;
/** Au-delà de ce nombre de jours sans pratique, une compétence pas encore maîtrisée est en risque d'abandon. */
const STALE_LEARNING_DAYS = 10;
/** Idem, mais avant qu'une compétence encore fraîche en apprentissage rejoigne l'affichage "consolidation". */
const CONSOLIDATION_STALE_DAYS = 5;

/**
 * Nombre de jours après la dernière pratique au-delà duquel une compétence
 * `maitrisee` est considérée éventée et repasse `a_revoir` — plus court pour
 * les compétences difficiles (oubliées plus vite), plus long pour les
 * compétences simples.
 */
const DECAY_INTERVAL_DAYS: Record<string, number> = { A1: 21, A2: 18, B1: 15, B2: 12 };

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysSince(iso: string | null, now: Date): number | null {
  if (!iso) return null;
  const diff = now.getTime() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return null;
  return Math.max(0, Math.floor(diff / MS_PER_DAY));
}

function trailingFailureStreak(outcomes: boolean[]): number {
  let streak = 0;
  for (let i = outcomes.length - 1; i >= 0 && outcomes[i] === false; i--) {
    streak++;
  }
  return streak;
}

function recentSuccessRate(outcomes: boolean[]): number | null {
  if (outcomes.length === 0) return null;
  const correct = outcomes.filter(Boolean).length;
  return Math.round((correct / outcomes.length) * 100);
}

function recoveredAfterError(outcomes: boolean[]): boolean {
  const n = outcomes.length;
  return n >= 2 && outcomes[n - 1] === true && outcomes[n - 2] === false;
}

function decayIntervalDays(difficulty: string): number {
  return DECAY_INTERVAL_DAYS[difficulty] ?? DECAY_INTERVAL_DAYS.B1;
}

interface SkillFacts {
  streak: number;
  recentRate: number | null;
  lastOutcome: boolean | null;
  since: number | null;
  coverage: number;
  recovered: boolean;
}

function computeFacts(entry: ReviewHistoryEntry, now: Date): SkillFacts {
  const outcomes = entry.recentOutcomes;
  return {
    streak: trailingFailureStreak(outcomes),
    recentRate: recentSuccessRate(outcomes),
    lastOutcome: outcomes.length > 0 ? outcomes[outcomes.length - 1] : null,
    since: daysSince(entry.lastPracticedAt, now),
    coverage: entry.totalExercises > 0 ? entry.completedExercises / entry.totalExercises : 0,
    recovered: recoveredAfterError(outcomes),
  };
}

/**
 * Quelle règle précise a produit l'état — distinct de `ReviewState` car deux
 * chemins différents peuvent aboutir au même état (ex. `a_revoir` par erreur
 * isolée vs. par maîtrise éventée) mais appellent une raison différente
 * (voir `buildReasons`). Jamais exposé hors de ce fichier : un détail
 * d'implémentation de la classification, pas une forme de donnée du moteur.
 */
type ClassificationTrigger =
  | "never_practiced"
  | "error_streak"
  | "recent_rate_drop"
  | "decayed_mastery"
  | "mastered"
  | "isolated_error"
  | "abandoned"
  | "learning";

const TRIGGER_STATE: Record<ClassificationTrigger, ReviewState> = {
  never_practiced: "nouvelle",
  error_streak: "fragile",
  recent_rate_drop: "fragile",
  decayed_mastery: "a_revoir",
  mastered: "maitrisee",
  isolated_error: "a_revoir",
  abandoned: "a_revoir",
  learning: "en_apprentissage",
};

/** Voir la documentation des règles en tête de fichier. Pure : ne dépend que de `entry` et `now`. */
function classify(entry: ReviewHistoryEntry, now: Date): { trigger: ClassificationTrigger; facts: SkillFacts } {
  const facts = computeFacts(entry, now);

  if (entry.completedExercises === 0) return { trigger: "never_practiced", facts };
  if (facts.streak >= FRAGILE_STREAK) return { trigger: "error_streak", facts };
  if (facts.recentRate !== null && entry.recentOutcomes.length >= 3 && facts.recentRate < FRAGILE_RECENT_RATE_THRESHOLD) {
    return { trigger: "recent_rate_drop", facts };
  }
  if (
    entry.successRate >= MASTERY_RATE_THRESHOLD &&
    facts.coverage >= MASTERY_COVERAGE_THRESHOLD &&
    facts.lastOutcome !== false
  ) {
    const interval = decayIntervalDays(entry.difficulty);
    if (facts.since !== null && facts.since > interval) return { trigger: "decayed_mastery", facts };
    return { trigger: "mastered", facts };
  }
  if (facts.lastOutcome === false) return { trigger: "isolated_error", facts };
  if (facts.since !== null && facts.since > STALE_LEARNING_DAYS && facts.coverage < 1) {
    return { trigger: "abandoned", facts };
  }
  return { trigger: "learning", facts };
}

/** Voir la documentation des règles en tête de fichier. Pure : ne dépend que de `entry` et `now`. */
export function classifySkillState(entry: ReviewHistoryEntry, now: Date = new Date()): ReviewState {
  return TRIGGER_STATE[classify(entry, now).trigger];
}

/**
 * `en_apprentissage` ne mérite une place dans "Consolidation" que si la
 * compétence commence à dater un peu (`CONSOLIDATION_STALE_DAYS`) — une
 * compétence en cours pratiquée hier, avec un bon dernier résultat, n'a
 * simplement rien à faire sur cette page.
 */
function bandForState(state: ReviewState, facts: SkillFacts): ReviewPriorityBand | null {
  if (state === "fragile") return "haute";
  if (state === "a_revoir") return "a_revoir";
  if (state === "en_apprentissage" && facts.since !== null && facts.since >= CONSOLIDATION_STALE_DAYS) {
    return "consolidation";
  }
  return null; // "nouvelle", "maitrisee" (fraîche), ou "en_apprentissage" encore frais : rien à afficher.
}

/**
 * Score déterministe, plus haut = plus urgent :
 * - base fixe par bande (`haute` > `a_revoir` > `consolidation`), pour que
 *   l'ordre entre bandes ne dépende jamais des ajustements fins ;
 * - + jours sans pratique (plafonné à 30, pour qu'une absence de plusieurs
 *   mois ne domine pas indéfiniment tout le reste) ;
 * - + 20 par échec supplémentaire dans la série en cours (répétition = plus
 *   urgent) ;
 * - + niveau de difficulté (A1=1 .. B2=4) x 3, un léger avantage aux
 *   compétences difficiles à couverture égale ;
 * - − 15 si le tout dernier résultat vient de corriger une erreur (reprise
 *   réussie : toujours à consolider, mais un peu moins urgent qu'un échec
 *   qui n'a pas encore été corrigé).
 */
function computePriorityScore(entry: ReviewHistoryEntry, state: ReviewState, facts: SkillFacts): number {
  const bandBase: Record<ReviewState, number> = {
    fragile: 300,
    a_revoir: 200,
    en_apprentissage: 50,
    maitrisee: 0,
    nouvelle: 0,
  };
  const difficultyRank = Math.max(1, CEFR_LEVELS.indexOf(entry.difficulty) + 1);
  let score = bandBase[state];
  score += Math.min(facts.since ?? 0, 30);
  score += facts.streak * 20;
  score += difficultyRank * 3;
  if (facts.recovered) score -= 15;
  return score;
}

/**
 * Une raison par déclencheur (`ClassificationTrigger`), jamais redevinée à
 * partir de l'état seul : deux compétences dans l'état `a_revoir` peuvent y
 * être arrivées pour des raisons entièrement différentes (maîtrise éventée
 * vs. jamais couverte à 60 % et laissée de côté), et la raison affichée doit
 * refléter celle qui s'est réellement produite.
 */
function buildReasons(trigger: ClassificationTrigger, facts: SkillFacts): string[] {
  const since = facts.since;
  const reasons: string[] = [];

  switch (trigger) {
    case "error_streak":
      reasons.push(`Erreurs répétées (${facts.streak} d'affilée)`);
      break;
    case "recent_rate_drop":
      reasons.push(`Taux de réussite récent faible (${facts.recentRate}%)`);
      break;
    case "decayed_mastery":
      reasons.push(since !== null ? `Pas pratiqué depuis ${since} jour${since > 1 ? "s" : ""} (compétence oubliée)` : "Compétence oubliée");
      break;
    case "isolated_error":
      reasons.push("Dernière tentative en échec");
      break;
    case "abandoned":
      reasons.push(since !== null ? `Laissé de côté depuis ${since} jour${since > 1 ? "s" : ""}` : "Laissé de côté");
      break;
    case "learning":
      if (since !== null) reasons.push(`Pas pratiqué depuis ${since} jour${since > 1 ? "s" : ""}`);
      break;
    default:
      break;
  }

  if (facts.recovered) {
    reasons.push("Reprise réussie après une erreur — à consolider");
  }

  return reasons.length > 0 ? reasons : ["À revoir"];
}

const ACTION_LABEL = "Reprendre";

/** Classifie et score une seule compétence. Utilisé par `buildReviewRecommendations` et testable isolément. */
export function evaluateSkill(
  entry: ReviewHistoryEntry,
  now: Date = new Date()
): { state: ReviewState; priority: ReviewPriority; reasons: string[] } | null {
  const { trigger, facts } = classify(entry, now);
  const state = TRIGGER_STATE[trigger];
  const band = bandForState(state, facts);
  if (!band) return null;

  const score = computePriorityScore(entry, state, facts);
  const reasons = buildReasons(trigger, facts);
  return { state, priority: { score, band }, reasons };
}

function toRecommendation(entry: ReviewHistoryEntry, evaluation: NonNullable<ReturnType<typeof evaluateSkill>>): ReviewRecommendation {
  return {
    key: `skill-${entry.skillId}`,
    skillId: entry.skillId,
    title: entry.skillName,
    domain: entry.domain,
    state: evaluation.state,
    priority: evaluation.priority,
    reason: evaluation.reasons[0],
    reasons: evaluation.reasons,
    href: entry.href,
    actionLabel: ACTION_LABEL,
  };
}

/**
 * Construit la liste des recommandations à afficher, triée par urgence
 * décroissante puis par `skillId` (ordre stable, jamais dépendant de
 * l'ordre d'entrée). Les compétences `nouvelle` ou `maitrisee` (fraîche)
 * sont omises : rien à y faire pour l'instant.
 *
 * Garde-fou données anciennes/dupliquées (même principe que
 * `lib/pedagogy/logic/review.ts`) : un `skillId` en double dans `entries`
 * (ne devrait pas arriver via `adapter.ts`, une `SkillProgress` par
 * compétence) ne produit jamais deux recommandations — la dernière entrée
 * rencontrée pour ce `skillId` gagne.
 */
export function buildReviewRecommendations(entries: ReviewHistoryEntry[], now: Date = new Date()): ReviewRecommendation[] {
  const bySkillId = new Map<string, ReviewRecommendation>();

  for (const entry of entries) {
    const evaluation = evaluateSkill(entry, now);
    if (!evaluation) continue;
    bySkillId.set(entry.skillId, toRecommendation(entry, evaluation));
  }

  return Array.from(bySkillId.values()).sort(
    (a, b) => b.priority.score - a.priority.score || a.skillId.localeCompare(b.skillId)
  );
}

/**
 * État vide utile (point 6 du cahier des charges) : quand rien n'est urgent,
 * propose une petite révision légère plutôt qu'une page vide — la compétence
 * `maitrisee` la plus proche de son intervalle de décroissance (celle qui
 * profitera le plus d'une petite piqûre de rappel). `null` si aucune
 * compétence n'a même été pratiquée (rien à consolider, seulement à commencer).
 */
export function getConsolidationSuggestion(entries: ReviewHistoryEntry[], now: Date = new Date()): ReviewRecommendation | null {
  let best: { entry: ReviewHistoryEntry; since: number } | null = null;

  for (const entry of entries) {
    if (classifySkillState(entry, now) !== "maitrisee") continue;
    const since = daysSince(entry.lastPracticedAt, now) ?? 0;
    if (!best || since > best.since) best = { entry, since };
  }

  if (!best) return null;
  return {
    key: `skill-${best.entry.skillId}-consolidation`,
    skillId: best.entry.skillId,
    title: best.entry.skillName,
    domain: best.entry.domain,
    state: "maitrisee",
    priority: { score: 0, band: "consolidation" },
    reason: "Une petite piqûre de rappel ne fait pas de mal",
    reasons: ["Une petite piqûre de rappel ne fait pas de mal"],
    href: best.entry.href,
    actionLabel: ACTION_LABEL,
  };
}
