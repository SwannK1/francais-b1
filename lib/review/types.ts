import type { CEFRLevel, SkillDomain } from "@/lib/pedagogy/types";

/**
 * Types du moteur de révision espacée — voir `lib/review/engine.ts` pour
 * l'algorithme et `lib/review/adapter.ts` pour le pont avec les données de
 * progression existantes (`UserProgress`). Isolé de `lib/pedagogy/` :
 * ce moteur ne définit ni ne stocke de progression lui-même, il ne fait que
 * lire `SkillProgress` et en dériver une recommandation.
 */

/**
 * État pédagogique d'une compétence, tel que décidé par le moteur :
 * - `nouvelle` : jamais pratiquée.
 * - `en_apprentissage` : en cours, pas encore de signal fort (bon ou mauvais).
 * - `fragile` : erreurs répétées ou taux de réussite récent bas.
 * - `a_revoir` : erreur isolée récente, longue absence, ou maîtrise passée
 *   qui s'est éventée (voir seuils de décroissance dans `engine.ts`).
 * - `maitrisee` : bon niveau récent, pratiquée assez pour que ce soit fiable,
 *   pas encore éventée.
 */
export type ReviewState = "nouvelle" | "en_apprentissage" | "fragile" | "a_revoir" | "maitrisee";

/** Section d'affichage dans `/reviser` — dérivée de `ReviewState`, voir `engine.ts`. */
export type ReviewPriorityBand = "haute" | "a_revoir" | "consolidation";

/**
 * Une compétence telle que le moteur a besoin de la voir. Construite par
 * `lib/review/adapter.ts` à partir de `UserProgress`/`PublicModule[]` —
 * jamais une deuxième source de vérité : ces champs sont soit copiés
 * directement depuis `SkillProgress`, soit dérivés du catalogue public
 * existant (difficulté, lien de pratique).
 */
export interface ReviewHistoryEntry {
  skillId: string;
  skillName: string;
  domain: SkillDomain;
  /** Niveau CECRL le plus élevé parmi les exercices de cette compétence dans le catalogue. */
  difficulty: CEFRLevel;
  /** Où reprendre cette compétence (module correspondant, ou `/progression` si aucun). */
  href: string;
  totalExercises: number;
  completedExercises: number;
  correctExercises: number;
  /** Taux de réussite cumulé depuis toujours (identique à `SkillProgress.successRate`). */
  successRate: number;
  /** Fenêtre bornée des derniers résultats, du plus ancien au plus récent (`SkillProgress.recentOutcomes`). */
  recentOutcomes: boolean[];
  lastPracticedAt: string | null;
}

export interface ReviewPriority {
  /** Score déterministe, plus haut = plus urgent. Voir `engine.ts` pour la formule exacte. */
  score: number;
  band: ReviewPriorityBand;
}

/** Une recommandation affichable dans `/reviser` : une compétence, sa priorité, pourquoi, où agir. */
export interface ReviewRecommendation {
  /** Clé stable pour une liste React. */
  key: string;
  skillId: string;
  title: string;
  domain: SkillDomain;
  state: ReviewState;
  priority: ReviewPriority;
  /** Raison principale, courte, affichable telle quelle (ex. "Pas pratiqué depuis 8 jours"). */
  reason: string;
  /** Raisons secondaires éventuelles, même format que `reason`, jamais dupliquées. */
  reasons: string[];
  href: string;
  actionLabel: string;
}
