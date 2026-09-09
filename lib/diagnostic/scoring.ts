import { DIAGNOSTIC_LEVELS, DIAGNOSTIC_SKILLS } from "@/lib/diagnostic/types";
import type {
  DiagnosticAnswer,
  DiagnosticLevel,
  DiagnosticLevelScore,
  DiagnosticLevelStatus,
  DiagnosticQuestion,
  DiagnosticResult,
  DiagnosticSkill,
  DiagnosticSkillResult,
  DiagnosticStopReason,
} from "@/lib/diagnostic/types";
import { recommendStage } from "@/lib/diagnostic/recommendation";

/**
 * Logique de scoring du diagnostic — voir `docs/diagnostic-scoring.md` pour
 * la documentation complète destinée à un relecteur non technique. Résumé :
 *
 * 1. Chaque palier de niveau (A1/A2/B1) compte 6 questions. Un palier est
 *    "acquired" à partir de 4/6 bonnes réponses (~67%), "gap" à 1/6 ou moins
 *    (~17%), "partial" entre les deux. Le seuil à 4/6 (pas 6/6) évite qu'une
 *    seule erreur difficile fasse chuter le niveau ; le seuil à 1/6 (pas 0)
 *    évite qu'une bonne réponse isolée (chance) fasse remonter un palier par
 *    ailleurs raté.
 * 2. Le niveau estimé part de A1 et monte à chaque palier "acquired"
 *    rencontré dans l'ordre. Un palier "partial" est ignoré (ni bloquant, ni
 *    validant). Un palier "gap" plafonne l'estimation : les paliers suivants,
 *    même "acquired", ne sont plus pris en compte — une vraie lacune de base
 *    rend un score supérieur peu fiable.
 * 3. Par domaine (compréhension écrite, vocabulaire, grammaire), un domaine
 *    est jugé "irrégulier" si un palier plus difficile obtient un score
 *    nettement meilleur (+50 points ou plus) qu'un palier plus facile pour ce
 *    même domaine — signe de réponses incohérentes (hasard, clic hâtif) plutôt
 *    que de compétence réelle. Un domaine irrégulier n'est jamais compté
 *    comme point fort, même si sa moyenne brute est haute.
 */

const LEVEL_ACQUIRED_MIN_CORRECT = 4; // sur 6
const LEVEL_GAP_MAX_CORRECT = 1; // sur 6

const STRENGTH_THRESHOLD = 70;
const WEAKNESS_THRESHOLD = 45;

/** Écart de score (points de %) au-delà duquel un domaine est jugé irrégulier. */
const IRREGULARITY_GAP = 50;

/** Nombre de questions administrées avant de pouvoir déclencher l'arrêt "plafond". */
export const CEILING_CHECK_QUESTION_COUNT = 12;
/** Nombre de bonnes réponses minimum sur ces 12 premières questions pour l'arrêt "plafond". */
const CEILING_MIN_CORRECT = 11;

/** Nombre de questions du palier A1 avant de pouvoir déclencher l'arrêt "plancher". */
export const FLOOR_CHECK_QUESTION_COUNT = 6;

function rate(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

function isCorrect(question: DiagnosticQuestion, answerByQuestionId: Map<string, DiagnosticAnswer>): boolean {
  return answerByQuestionId.get(question.id)?.choiceId === question.correctChoiceId;
}

function levelStatus(correct: number, total: number): DiagnosticLevelStatus {
  if (total === 0) return "partial";
  if (correct >= LEVEL_ACQUIRED_MIN_CORRECT) return "acquired";
  if (correct <= LEVEL_GAP_MAX_CORRECT) return "gap";
  return "partial";
}

/**
 * Vérifie si le diagnostic peut s'arrêter avant sa fin naturelle. Appelée par
 * le client après chaque question — ne se déclenche qu'aux deux points prévus
 * (fin de palier A1, fin de palier A2), jamais en cours de palier, pour ne
 * jamais couper une question à moitié.
 *
 * Volontairement restrictif ("uniquement si cela reste fiable") : seulement
 * deux cas, tous deux à un point où administrer la suite n'apporterait plus
 * d'information utile pour un résultat borné à A1/A2/B1.
 */
export function checkEarlyStop(
  administeredQuestions: DiagnosticQuestion[],
  answers: DiagnosticAnswer[]
): DiagnosticStopReason | null {
  const answerByQuestionId = new Map(answers.map((a) => [a.questionId, a]));
  const answeredCount = administeredQuestions.filter((q) => answerByQuestionId.has(q.id)).length;

  if (answeredCount === FLOOR_CHECK_QUESTION_COUNT) {
    const a1Questions = administeredQuestions.filter((q) => q.level === "A1");
    const correct = a1Questions.filter((q) => isCorrect(q, answerByQuestionId)).length;
    if (correct <= LEVEL_GAP_MAX_CORRECT) return "early-floor";
  }

  if (answeredCount === CEILING_CHECK_QUESTION_COUNT) {
    const a1a2Questions = administeredQuestions.filter((q) => q.level === "A1" || q.level === "A2");
    const correct = a1a2Questions.filter((q) => isCorrect(q, answerByQuestionId)).length;
    if (correct >= CEILING_MIN_CORRECT) return "early-ceiling";
  }

  return null;
}

/**
 * Calcule le résultat du diagnostic à partir des questions réellement
 * administrées (18 en cas de parcours complet, 6 ou 12 en cas d'arrêt
 * anticipé) et des réponses données. Fonction pure, jamais appelée avec
 * `DIAGNOSTIC_QUESTIONS` en dur : c'est l'appelant (le client React) qui sait
 * quel sous-ensemble a réellement été vu, notamment en cas d'arrêt anticipé.
 *
 * Toujours exploitable : avec 0 réponse (`answers` vide), retourne un
 * résultat valide (niveau A1 par défaut, score à 0), jamais une exception —
 * un apprenant qui interrompt le diagnostic ne doit jamais faire planter la
 * page de résultat.
 */
export function computeDiagnosticResult(
  administeredQuestions: DiagnosticQuestion[],
  answers: DiagnosticAnswer[],
  stopReason: DiagnosticStopReason
): DiagnosticResult {
  const answerByQuestionId = new Map(answers.map((a) => [a.questionId, a]));

  // --- Score par palier ---
  const levelScores: DiagnosticLevelScore[] = DIAGNOSTIC_LEVELS.map((level) => {
    const levelQuestions = administeredQuestions.filter((q) => q.level === level);
    const correct = levelQuestions.filter((q) => isCorrect(q, answerByQuestionId)).length;
    return {
      level,
      correct,
      total: levelQuestions.length,
      successRate: rate(correct, levelQuestions.length),
      status: levelStatus(correct, levelQuestions.length),
    };
  }).filter((score) => score.total > 0);

  let estimatedLevel: DiagnosticLevel = "A1";
  if (stopReason === "early-ceiling") {
    // Arrêt "plafond" : par construction, le palier B1 n'a pas été
    // administré (le test s'est arrêté après A1+A2). B1 étant le niveau le
    // plus haut restitué par ce diagnostic, l'estimation est directement B1
    // — pas de recalcul palier par palier, qui sous-estimerait sinon un
    // résultat quasi parfait faute de données sur B1.
    estimatedLevel = "B1";
  } else {
    let foundationGapReached = false;
    for (const score of levelScores) {
      if (score.status === "gap") {
        foundationGapReached = true;
        continue;
      }
      if (score.status === "acquired" && !foundationGapReached) {
        estimatedLevel = score.level;
      }
    }
  }

  // --- Score par domaine ---
  const skillResults: DiagnosticSkillResult[] = DIAGNOSTIC_SKILLS.map((skill) => {
    const skillQuestions = administeredQuestions.filter((q) => q.skill === skill);
    const correct = skillQuestions.filter((q) => isCorrect(q, answerByQuestionId)).length;

    // Détection d'irrégularité : compare le taux de réussite de ce domaine
    // palier par palier (paliers réellement administrés uniquement).
    const byLevel = DIAGNOSTIC_LEVELS.map((level) => {
      const qs = skillQuestions.filter((q) => q.level === level);
      if (qs.length === 0) return null;
      const c = qs.filter((q) => isCorrect(q, answerByQuestionId)).length;
      return rate(c, qs.length);
    }).filter((v): v is number => v !== null);

    let irregular = false;
    for (let i = 0; i < byLevel.length; i++) {
      for (let j = i + 1; j < byLevel.length; j++) {
        if (byLevel[j] - byLevel[i] >= IRREGULARITY_GAP) irregular = true;
      }
    }

    return {
      skill,
      correct,
      total: skillQuestions.length,
      successRate: rate(correct, skillQuestions.length),
      irregular,
    };
  });

  const strengths: DiagnosticSkill[] = skillResults
    .filter((s) => s.total > 0 && s.successRate >= STRENGTH_THRESHOLD && !s.irregular)
    .map((s) => s.skill);

  const weaknesses: DiagnosticSkill[] = skillResults
    .filter((s) => s.total > 0 && s.successRate < WEAKNESS_THRESHOLD)
    .map((s) => s.skill);

  const totalCorrect = administeredQuestions.filter((q) => isCorrect(q, answerByQuestionId)).length;
  const questionsAnswered = administeredQuestions.filter((q) => answerByQuestionId.has(q.id)).length;

  return {
    estimatedLevel,
    globalScore: rate(totalCorrect, administeredQuestions.length),
    questionsAnswered,
    questionsTotal: administeredQuestions.length,
    stopReason,
    levelScores,
    skillResults,
    strengths,
    weaknesses,
    recommendation: recommendStage(estimatedLevel, weaknesses),
  };
}
