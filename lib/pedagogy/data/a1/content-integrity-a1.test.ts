import { describe, expect, it } from "vitest";
import { A1_PARCOURS_STAGES, EXAMS_A1, MODULES_A1, SKILLS_A1 } from "@/lib/pedagogy/data/a1";
import type { Exercise, ExamSection, Question } from "@/lib/pedagogy/types";

/**
 * Garde-fou de contenu pour le parcours A1 — adapté de
 * `lib/pedagogy/data/content-integrity.test.ts` (B1), mais scopé
 * exclusivement aux données A1 (`MODULES_A1`, `EXAMS_A1`, `SKILLS_A1`,
 * `A1_PARCOURS_STAGES`) : ce chantier n'importe jamais les données B1
 * centrales, donc ce test ne doit pas non plus en dépendre.
 *
 * Volontairement absent ici : la vérification "audioSrc existe sur disque"
 * (voir `content-integrity.test.ts` § Pipeline audio humain) — la
 * production des fichiers audio A1 est le périmètre du chantier
 * `a1-audio`, mené en parallèle. On vérifie seulement que `audioSrc` et
 * `transcript` sont renseignés (structure correcte, contenu exploitable dès
 * maintenant pour la lecture du transcript), pas que le fichier existe déjà.
 */

function duplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const skillDomainById = new Map(SKILLS_A1.map((s) => [s.id, s.domain]));

function questionsOf(exercise: Exercise): Question[] {
  if (exercise.type === "comprehension_ecrite" || exercise.type === "comprehension_orale") {
    return exercise.questions;
  }
  if (exercise.type === "qcm") return [exercise.question];
  return [];
}

function checkQuestion(q: Question, ctx: string): string[] {
  const issues: string[] = [];
  if (q.kind === "qcm") {
    const choiceIds = q.choices.map((c) => c.id);
    if (!q.prompt.trim()) issues.push(`${ctx}/${q.id}: prompt vide`);
    if (q.choices.length < 2) issues.push(`${ctx}/${q.id}: moins de 2 choix`);
    if (duplicates(choiceIds).length) issues.push(`${ctx}/${q.id}: choix avec ids dupliqués`);
    const texts = q.choices.map((c) => c.text.trim().toLowerCase());
    if (duplicates(texts).length) issues.push(`${ctx}/${q.id}: choix avec texte dupliqué`);
    if (!choiceIds.includes(q.correctChoiceId)) {
      issues.push(`${ctx}/${q.id}: correctChoiceId "${q.correctChoiceId}" hors limites`);
    }
  } else if (q.kind === "vrai_faux") {
    if (typeof q.correctAnswer !== "boolean") issues.push(`${ctx}/${q.id}: correctAnswer non booléen`);
    if (!q.prompt.trim()) issues.push(`${ctx}/${q.id}: prompt vide`);
  } else if (q.kind === "libre") {
    if (!q.expectedAnswer.trim()) issues.push(`${ctx}/${q.id}: expectedAnswer vide`);
  }
  if (!q.correction.explanation.trim()) issues.push(`${ctx}/${q.id}: correction.explanation vide`);
  return issues;
}

function checkExercise(ex: Exercise, ctx: string): string[] {
  const issues: string[] = [];
  const label = `${ctx} > ${ex.id} [${ex.type}]`;
  if (!ex.instructions.trim()) issues.push(`${label}: instructions vides`);
  if (!skillDomainById.has(ex.skillId)) issues.push(`${label}: skillId "${ex.skillId}" inconnu`);

  for (const q of questionsOf(ex)) issues.push(...checkQuestion(q, label));

  switch (ex.type) {
    case "vrai_faux":
      if (typeof ex.correctAnswer !== "boolean") issues.push(`${label}: correctAnswer non booléen`);
      if (!ex.statement.trim()) issues.push(`${label}: statement vide`);
      break;
    case "texte_a_trous": {
      const placeholders = [...ex.textWithBlanks.matchAll(/\{\{(.+?)\}\}/g)].map((m) => m[1]);
      const blankIds = ex.blanks.map((b) => b.id);
      if (duplicates(blankIds).length) issues.push(`${label}: blank ids dupliqués`);
      for (const id of blankIds) {
        if (!placeholders.includes(id)) issues.push(`${label}: blank "${id}" sans placeholder dans le texte`);
      }
      for (const id of placeholders) {
        if (!blankIds.includes(id)) issues.push(`${label}: placeholder "{{${id}}}" sans blank correspondant`);
      }
      for (const b of ex.blanks) {
        if (!b.answer.trim()) issues.push(`${label}: blank "${b.id}" sans réponse`);
      }
      break;
    }
    case "remise_en_ordre": {
      const itemIds = ex.items.map((i) => i.id);
      if (duplicates(itemIds).length) issues.push(`${label}: item ids dupliqués`);
      if (duplicates(ex.correctOrder).length) issues.push(`${label}: correctOrder contient des doublons`);
      if (ex.correctOrder.length !== itemIds.length) {
        issues.push(`${label}: correctOrder n'a pas la même taille que items`);
      }
      for (const id of ex.correctOrder) {
        if (!itemIds.includes(id)) issues.push(`${label}: correctOrder référence un id inconnu "${id}"`);
      }
      break;
    }
    case "association": {
      if (ex.pairs.length === 0) issues.push(`${label}: pairs vide`);
      if (duplicates(ex.pairs.map((p) => p.id)).length) issues.push(`${label}: pair ids dupliqués`);
      for (const p of ex.pairs) {
        if (!p.left.trim() || !p.right.trim()) issues.push(`${label}: pair "${p.id}" avec left/right vide`);
      }
      break;
    }
    case "comprehension_ecrite":
      if (!ex.text.trim()) issues.push(`${label}: text vide`);
      if (ex.questions.length === 0) issues.push(`${label}: questions vide`);
      break;
    case "comprehension_orale":
      if (!ex.audioSrc.trim()) issues.push(`${label}: audioSrc vide`);
      if (!ex.transcript || !ex.transcript.trim()) {
        issues.push(`${label}: transcript manquant (obligatoire pour une compréhension orale)`);
      }
      if (ex.questions.length === 0) issues.push(`${label}: questions vide`);
      break;
    case "reponse_courte":
      if (!ex.question.trim()) issues.push(`${label}: question vide`);
      break;
    case "production_ecrite":
      if (!ex.consigne.trim()) issues.push(`${label}: consigne vide`);
      if (!(ex.minWords > 0)) issues.push(`${label}: minWords invalide (${ex.minWords})`);
      if (ex.maxWords != null && ex.maxWords < ex.minWords) {
        issues.push(`${label}: maxWords (${ex.maxWords}) < minWords (${ex.minWords})`);
      }
      if (ex.correctionCriteria.length === 0) issues.push(`${label}: correctionCriteria vide`);
      break;
    case "production_orale":
      if (!ex.consigne.trim()) issues.push(`${label}: consigne vide`);
      if (!(ex.prepSeconds >= 0)) issues.push(`${label}: prepSeconds invalide`);
      if (ex.maxSpeakSeconds != null && !(ex.maxSpeakSeconds > 0)) {
        issues.push(`${label}: maxSpeakSeconds invalide (${ex.maxSpeakSeconds})`);
      }
      if (ex.selfAssessmentCriteria.length === 0) issues.push(`${label}: selfAssessmentCriteria vide`);
      break;
  }
  return issues;
}

function checkExamSection(section: ExamSection, ctx: string): string[] {
  const issues: string[] = [];
  for (const ex of section.exercises) issues.push(...checkExercise(ex, `${ctx} > ${section.id}`));
  if (section.eliminatoryScore != null && section.eliminatoryScore > section.maxScore) {
    issues.push(`${ctx} > ${section.id}: eliminatoryScore > maxScore`);
  }
  return issues;
}

describe("A1 — Skills", () => {
  it("a des ids uniques, tous préfixés a1-", () => {
    expect(duplicates(SKILLS_A1.map((s) => s.id))).toEqual([]);
    const unprefixed = SKILLS_A1.filter((s) => !s.id.startsWith("a1-")).map((s) => s.id);
    expect(unprefixed).toEqual([]);
  });

  it("n'a pas de champ vide", () => {
    const empty = SKILLS_A1.filter((s) => !s.name.trim() || !s.description.trim());
    expect(empty.map((s) => s.id)).toEqual([]);
  });
});

describe("A1 — Parcours stages", () => {
  it("a des ids et slugs uniques, ordonnés sans trou", () => {
    expect(duplicates(A1_PARCOURS_STAGES.map((s) => s.id))).toEqual([]);
    expect(duplicates(A1_PARCOURS_STAGES.map((s) => s.slug))).toEqual([]);
    const orders = [...A1_PARCOURS_STAGES.map((s) => s.order)].sort((a, b) => a - b);
    expect(orders).toEqual(A1_PARCOURS_STAGES.map((_, i) => i + 1));
  });
});

describe("A1 — Modules", () => {
  it("a au moins 20 modules (volume attendu pour un parcours A1 complet)", () => {
    expect(MODULES_A1.length).toBeGreaterThanOrEqual(20);
  });

  it("a des ids et slugs uniques", () => {
    expect(duplicates(MODULES_A1.map((m) => m.id))).toEqual([]);
    expect(duplicates(MODULES_A1.map((m) => m.slug))).toEqual([]);
  });

  it("a des slugs valides (kebab-case)", () => {
    const invalid = MODULES_A1.filter((m) => !SLUG_RE.test(m.slug)).map((m) => m.slug);
    expect(invalid).toEqual([]);
  });

  it("a le niveau A1 partout", () => {
    const wrongLevel = MODULES_A1.filter((m) => m.level !== "A1").map((m) => m.slug);
    expect(wrongLevel).toEqual([]);
  });

  it("référence uniquement des stageId définis dans A1_PARCOURS_STAGES", () => {
    const stageIds = new Set(A1_PARCOURS_STAGES.map((s) => s.id));
    const unknown = MODULES_A1.filter((m) => !stageIds.has(m.stageId)).map((m) => `${m.slug} -> ${m.stageId}`);
    expect(unknown).toEqual([]);
  });

  it("a un titre, une description et des objectifs non vides", () => {
    const issues = MODULES_A1.filter(
      (m) => !m.title.trim() || !m.description.trim() || m.objectives.length === 0
    ).map((m) => m.slug);
    expect(issues).toEqual([]);
  });

  it("a au moins une leçon, et chaque leçon a un titre et au moins une activité", () => {
    const issues: string[] = [];
    for (const m of MODULES_A1) {
      if (m.lessons.length === 0) issues.push(`${m.slug}: 0 leçon`);
      for (const l of m.lessons) {
        if (!l.title.trim()) issues.push(`${m.slug} > ${l.id}: titre vide`);
        if (l.activities.length === 0) issues.push(`${m.slug} > ${l.id}: 0 activité`);
        for (const a of l.activities) {
          if (!a.title.trim()) issues.push(`${m.slug} > ${l.id} > ${a.id}: titre vide`);
          if (a.exercises.length === 0) issues.push(`${m.slug} > ${l.id} > ${a.id}: 0 exercice`);
        }
      }
    }
    expect(issues).toEqual([]);
  });

  it("chaque module se termine par une leçon de type evaluation (mini-bilan)", () => {
    const missing = MODULES_A1.filter((m) => !m.lessons.some((l) => l.type === "evaluation")).map((m) => m.slug);
    expect(missing).toEqual([]);
  });

  it("a des ids uniques (lesson/activity/exercise/sous-question), tous modules confondus, et distincts du B1", () => {
    const lessonIds: string[] = [];
    const activityIds: string[] = [];
    const exerciseIds: string[] = [];
    const subQuestionIds: string[] = [];
    for (const m of MODULES_A1) {
      for (const l of m.lessons) {
        lessonIds.push(l.id);
        for (const a of l.activities) {
          activityIds.push(a.id);
          for (const ex of a.exercises) {
            exerciseIds.push(ex.id);
            for (const q of questionsOf(ex)) subQuestionIds.push(q.id);
          }
        }
      }
    }
    expect(duplicates(lessonIds)).toEqual([]);
    expect(duplicates(activityIds)).toEqual([]);
    expect(duplicates(exerciseIds)).toEqual([]);
    expect(duplicates(subQuestionIds)).toEqual([]);
  });

  it("n'a pas de placeholder / TODO / lorem ipsum visible", () => {
    const patterns = [
      /lorem ipsum/i,
      /\btodo\b/i,
      /\bfixme\b/i,
      /\bxxx\b/,
      /placeholder/i,
      /\btbd\b/i,
      /\btbc\b/i,
      /coming soon/i,
      /à compléter/i,
    ];
    const hits: string[] = [];
    const walk = (value: unknown, ctx: string) => {
      if (typeof value === "string") {
        for (const re of patterns) if (re.test(value)) hits.push(`${ctx}: /${re.source}/`);
      } else if (Array.isArray(value)) {
        value.forEach((v, i) => walk(v, `${ctx}[${i}]`));
      } else if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${ctx}.${k}`);
      }
    };
    for (const m of MODULES_A1) walk(m, m.slug);
    expect(hits).toEqual([]);
  });

  it("tous les exercices sont valides (skillId connu, réponses cohérentes)", () => {
    const issues: string[] = [];
    for (const m of MODULES_A1) {
      for (const l of m.lessons) {
        for (const a of l.activities) {
          for (const ex of a.exercises) {
            issues.push(...checkExercise(ex, `${m.slug} > ${l.id} > ${a.id}`));
          }
        }
      }
    }
    expect(issues).toEqual([]);
  });
});

describe("A1 — Exams", () => {
  it("a des ids et slugs uniques", () => {
    expect(duplicates(EXAMS_A1.map((e) => e.id))).toEqual([]);
    expect(duplicates(EXAMS_A1.map((e) => e.slug))).toEqual([]);
  });

  it("a le niveau A1 partout", () => {
    const wrongLevel = EXAMS_A1.filter((e) => e.level !== "A1").map((e) => e.slug);
    expect(wrongLevel).toEqual([]);
  });

  it("a un barème et une durée cohérents avec la somme de ses épreuves", () => {
    const issues: string[] = [];
    for (const e of EXAMS_A1) {
      const sumMax = e.sections.reduce((s, sec) => s + sec.maxScore, 0);
      const sumDuration = e.sections.reduce((s, sec) => s + sec.durationMinutes, 0);
      if (sumMax !== e.maxScore) issues.push(`${e.slug}: somme des maxScore (${sumMax}) != exam.maxScore (${e.maxScore})`);
      if (sumDuration !== e.durationMinutes) {
        issues.push(`${e.slug}: somme des durées (${sumDuration}) != exam.durationMinutes (${e.durationMinutes})`);
      }
      if (e.passingScore > e.maxScore) issues.push(`${e.slug}: passingScore > maxScore`);
    }
    expect(issues).toEqual([]);
  });

  it("couvre les 4 épreuves DELF (CO, CE, PE, PO)", () => {
    for (const e of EXAMS_A1) {
      const sections = new Set(e.sections.map((s) => s.delfSection));
      expect(sections.has("comprehension_orale")).toBe(true);
      expect(sections.has("comprehension_ecrite")).toBe(true);
      expect(sections.has("production_ecrite")).toBe(true);
      expect(sections.has("production_orale")).toBe(true);
    }
  });

  it("a des exercices valides dans chaque épreuve", () => {
    const issues: string[] = [];
    for (const e of EXAMS_A1) {
      for (const section of e.sections) issues.push(...checkExamSection(section, e.slug));
    }
    expect(issues).toEqual([]);
  });
});

describe("A1 — Isolation vis-à-vis du contenu B1", () => {
  it("n'utilise aucun id de skill B1 (préfixe a1- exclusif)", () => {
    const nonA1 = SKILLS_A1.filter((s) => !s.id.startsWith("a1-"));
    expect(nonA1).toEqual([]);
  });
});
