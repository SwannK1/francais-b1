import { CEFR_LEVELS } from "@/lib/pedagogy/types";
import type {
  CEFRLevel,
  PlacementAnswer,
  PlacementDomainScore,
  PlacementLevelScore,
  PlacementLevelStatus,
  PlacementQuestion,
  PlacementResult,
  SkillDomain,
} from "@/lib/pedagogy/types";

/** Un niveau est considéré acquis à partir de ce taux de réussite. */
const LEVEL_PASS_THRESHOLD = 60;
/**
 * En dessous de ce taux, un niveau révèle une lacune critique (quasi-échec
 * total, pas juste "quelques questions ratées"). Volontairement bas : avec
 * peu de questions par niveau, un score de 30-40% reste un aléa statistique
 * normal et ne doit pas, à lui seul, plafonner l'estimation.
 */
const LEVEL_GAP_THRESHOLD = 20;

const STRENGTH_THRESHOLD = 70;
const WEAKNESS_THRESHOLD = 50;

function rate(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

function levelStatus(successRate: number): PlacementLevelStatus {
  if (successRate >= LEVEL_PASS_THRESHOLD) return "acquired";
  if (successRate < LEVEL_GAP_THRESHOLD) return "gap";
  return "partial";
}

/**
 * Calcule un niveau CECRL estimé, jamais une certification officielle.
 *
 * Logique volontairement simple, en deux passes (pas de statistique
 * complexe, pas de `break` séquentiel sur le premier échec) :
 *
 * 1. Score de chaque niveau (A1→B2) qui contient au moins une question,
 *    classé "acquired" / "partial" / "gap" selon deux seuils.
 * 2. L'estimation part de A1 et monte à chaque niveau "acquired" rencontré.
 *    Un niveau "partial" (quelques erreurs) est simplement ignoré : il ne
 *    fait pas progresser l'estimation mais ne la bloque pas non plus. Seul
 *    un niveau "gap" (lacune critique) plafonne l'estimation : les niveaux
 *    au-dessus ne sont plus pris en compte, même s'ils sont "acquired",
 *    car une vraie lacune de base rend un score plus élevé peu fiable.
 *
 * Exemple : A1 acquis, A2 partiel (quelques erreurs, pas une lacune), B1
 * acquis → estimation B1 (le passage par A2 ne bloque pas). A1 acquis, A2 en
 * lacune critique, B1 acquis → estimation plafonnée à A1 (la lacune sur les
 * bases prime sur la réussite au niveau supérieur).
 */
export function computePlacementResult(
  questions: PlacementQuestion[],
  answers: PlacementAnswer[]
): PlacementResult {
  const answerByQuestionId = new Map(answers.map((answer) => [answer.questionId, answer]));

  function isCorrect(question: PlacementQuestion): boolean {
    return answerByQuestionId.get(question.id)?.choiceId === question.correctChoiceId;
  }

  // --- Score par niveau ---
  const levelScores: PlacementLevelScore[] = CEFR_LEVELS.map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const correct = levelQuestions.filter(isCorrect).length;
    const successRate = rate(correct, levelQuestions.length);
    return {
      level,
      correct,
      total: levelQuestions.length,
      successRate,
      status: levelQuestions.length > 0 ? levelStatus(successRate) : "partial",
    };
  }).filter((score) => score.total > 0);

  let estimatedLevel: CEFRLevel = "A1";
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

  // --- Score par domaine ---
  const domains = Array.from(new Set(questions.map((question) => question.domain)));
  const domainScores: PlacementDomainScore[] = domains.map((domain) => {
    const domainQuestions = questions.filter((question) => question.domain === domain);
    const correct = domainQuestions.filter(isCorrect).length;

    return {
      domain,
      correct,
      total: domainQuestions.length,
      successRate: rate(correct, domainQuestions.length),
    };
  });

  const strengths: SkillDomain[] = domainScores
    .filter((score) => score.successRate >= STRENGTH_THRESHOLD)
    .map((score) => score.domain);

  const weaknesses: SkillDomain[] = domainScores
    .filter((score) => score.successRate < WEAKNESS_THRESHOLD)
    .map((score) => score.domain);

  const totalCorrect = questions.filter(isCorrect).length;

  return {
    estimatedLevel,
    globalScore: rate(totalCorrect, questions.length),
    levelScores,
    domainScores,
    strengths,
    weaknesses,
  };
}
