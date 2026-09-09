import { describe, expect, it } from "vitest";
import { DIAGNOSTIC_QUESTIONS } from "@/lib/diagnostic/questions";
import { checkEarlyStop, computeDiagnosticResult } from "@/lib/diagnostic/scoring";
import type { DiagnosticAnswer, DiagnosticQuestion } from "@/lib/diagnostic/types";

const byLevel = (level: "A1" | "A2" | "B1") =>
  DIAGNOSTIC_QUESTIONS.filter((q) => q.level === level);

/** Répond correctement aux `correctCount` premières questions d'une liste, faux ensuite. */
function answerNCorrect(questions: DiagnosticQuestion[], correctCount: number): DiagnosticAnswer[] {
  return questions.map((q, i) => {
    if (i < correctCount) return { questionId: q.id, choiceId: q.correctChoiceId };
    const wrongChoice = q.choices.find((c) => c.id !== q.correctChoiceId)!;
    return { questionId: q.id, choiceId: wrongChoice.id };
  });
}

function answerAllCorrect(questions: DiagnosticQuestion[]): DiagnosticAnswer[] {
  return answerNCorrect(questions, questions.length);
}

describe("checkEarlyStop", () => {
  it("déclenche l'arrêt plancher à 6 questions si 1 seule bonne réponse sur le palier A1", () => {
    const answers = answerNCorrect(byLevel("A1"), 1);
    expect(checkEarlyStop(byLevel("A1"), answers)).toBe("early-floor");
  });

  it("ne déclenche pas l'arrêt plancher si 2 bonnes réponses sur le palier A1", () => {
    const answers = answerNCorrect(byLevel("A1"), 2);
    expect(checkEarlyStop(byLevel("A1"), answers)).toBeNull();
  });

  it("déclenche l'arrêt plafond à 12 questions si 11 bonnes réponses sur A1+A2", () => {
    const administered = [...byLevel("A1"), ...byLevel("A2")];
    const answers = answerNCorrect(administered, 11);
    expect(checkEarlyStop(administered, answers)).toBe("early-ceiling");
  });

  it("ne déclenche pas l'arrêt plafond si seulement 9 bonnes réponses sur A1+A2", () => {
    const administered = [...byLevel("A1"), ...byLevel("A2")];
    const answers = answerNCorrect(administered, 9);
    expect(checkEarlyStop(administered, answers)).toBeNull();
  });

  it("ne se déclenche jamais en cours de palier (nombre de réponses différent des points de contrôle)", () => {
    const partial = byLevel("A1").slice(0, 3);
    expect(checkEarlyStop(partial, answerAllCorrect(partial))).toBeNull();
  });
});

describe("computeDiagnosticResult — scoring A1", () => {
  it("estime A1 en cas d'arrêt plancher (échec quasi total dès les questions les plus faciles)", () => {
    const administered = byLevel("A1");
    const answers = answerNCorrect(administered, 1);
    const result = computeDiagnosticResult(administered, answers, "early-floor");

    expect(result.estimatedLevel).toBe("A1");
    expect(result.stopReason).toBe("early-floor");
    expect(result.questionsTotal).toBe(6);
  });

  it("estime A1 quand le palier A2 est en lacune critique après un A1 acquis", () => {
    const administered = DIAGNOSTIC_QUESTIONS;
    const answers: DiagnosticAnswer[] = [
      ...answerNCorrect(byLevel("A1"), 5), // acquis
      ...answerNCorrect(byLevel("A2"), 0), // lacune
      ...answerNCorrect(byLevel("B1"), 5), // acquis mais plafonné par la lacune A2
    ];
    const result = computeDiagnosticResult(administered, answers, "completed");

    expect(result.estimatedLevel).toBe("A1");
  });
});

describe("computeDiagnosticResult — scoring A2", () => {
  it("estime A2 quand A1 et A2 sont acquis mais B1 est en lacune", () => {
    const administered = DIAGNOSTIC_QUESTIONS;
    const answers: DiagnosticAnswer[] = [
      ...answerNCorrect(byLevel("A1"), 6),
      ...answerNCorrect(byLevel("A2"), 4),
      ...answerNCorrect(byLevel("B1"), 0),
    ];
    const result = computeDiagnosticResult(administered, answers, "completed");

    expect(result.estimatedLevel).toBe("A2");
  });

  it("ne classe pas trop haut sur la base de quelques bonnes réponses faciles isolées", () => {
    // A1 parfait, mais seulement 2/6 sur A2 (sous le seuil d'acquisition) :
    // l'estimation doit rester au palier confirmé (A1), pas monter sur un
    // coup de chance ponctuel au palier suivant.
    const administered = [...byLevel("A1"), ...byLevel("A2")];
    const answers: DiagnosticAnswer[] = [
      ...answerNCorrect(byLevel("A1"), 6),
      ...answerNCorrect(byLevel("A2"), 2),
    ];
    const result = computeDiagnosticResult(administered, answers, "completed");

    expect(result.estimatedLevel).toBe("A1");
  });
});

describe("computeDiagnosticResult — scoring B1", () => {
  it("estime B1 quand les trois paliers sont acquis", () => {
    const administered = DIAGNOSTIC_QUESTIONS;
    const answers = answerAllCorrect(administered);
    const result = computeDiagnosticResult(administered, answers, "completed");

    expect(result.estimatedLevel).toBe("B1");
    expect(result.globalScore).toBe(100);
  });

  it("estime B1 directement en cas d'arrêt plafond, sans avoir vu le palier B1", () => {
    const administered = [...byLevel("A1"), ...byLevel("A2")];
    const answers = answerNCorrect(administered, 11);
    const result = computeDiagnosticResult(administered, answers, "early-ceiling");

    expect(result.estimatedLevel).toBe("B1");
    expect(result.questionsTotal).toBe(12);
  });

  it("une seule erreur sur une question difficile ne fait pas chuter artificiellement le niveau", () => {
    const administered = DIAGNOSTIC_QUESTIONS;
    const answers: DiagnosticAnswer[] = [
      ...answerNCorrect(byLevel("A1"), 6),
      ...answerNCorrect(byLevel("A2"), 6),
      ...answerNCorrect(byLevel("B1"), 5), // 1 erreur sur B1
    ];
    const result = computeDiagnosticResult(administered, answers, "completed");

    expect(result.estimatedLevel).toBe("B1");
  });
});

describe("computeDiagnosticResult — cas limite : utilisateur irrégulier", () => {
  it("ne compte pas un domaine comme point fort si ses réponses sont incohérentes d'un palier à l'autre", () => {
    const administered = DIAGNOSTIC_QUESTIONS;
    const vocabA1 = byLevel("A1").filter((q) => q.skill === "vocabulaire");
    const vocabA2 = byLevel("A2").filter((q) => q.skill === "vocabulaire");
    const vocabB1 = byLevel("B1").filter((q) => q.skill === "vocabulaire");
    const others = administered.filter((q) => q.skill !== "vocabulaire");

    const answers: DiagnosticAnswer[] = [
      ...answerAllCorrect(others),
      ...answerNCorrect(vocabA1, 1), // 1/2 = 50% sur le palier le plus facile
      ...answerAllCorrect(vocabA2), // 2/2 = 100%
      ...answerAllCorrect(vocabB1), // 2/2 = 100%
    ];
    const result = computeDiagnosticResult(administered, answers, "completed");

    const vocabResult = result.skillResults.find((s) => s.skill === "vocabulaire")!;
    expect(vocabResult.successRate).toBeGreaterThanOrEqual(70); // qualifierait pour un point fort...
    expect(vocabResult.irregular).toBe(true); // ...mais est signalé incohérent...
    expect(result.strengths).not.toContain("vocabulaire"); // ...donc jamais listé comme point fort.
    expect(result.strengths).toContain("grammaire");
    expect(result.strengths).toContain("comprehension_ecrite");
  });
});

describe("computeDiagnosticResult — résultat toujours exploitable", () => {
  it("reste valide sans aucune réponse (diagnostic interrompu immédiatement)", () => {
    const result = computeDiagnosticResult([], [], "completed");

    expect(result.estimatedLevel).toBe("A1");
    expect(result.globalScore).toBe(0);
    expect(result.questionsAnswered).toBe(0);
    expect(result.questionsTotal).toBe(0);
    expect(result.strengths).toEqual([]);
    expect(result.weaknesses).toEqual([]);
    expect(result.recommendation.message.length).toBeGreaterThan(0);
    expect(result.recommendation.stageSlug.length).toBeGreaterThan(0);
  });

  it("reste valide avec des réponses partielles (questions administrées sans réponse)", () => {
    const administered = byLevel("A1");
    const answers = answerNCorrect(administered, 3).slice(0, 2); // 2 réponses sur 6 questions
    const result = computeDiagnosticResult(administered, answers, "completed");

    expect(result.questionsAnswered).toBe(2);
    expect(result.questionsTotal).toBe(6);
    expect(() => result.recommendation.message).not.toThrow();
  });
});
