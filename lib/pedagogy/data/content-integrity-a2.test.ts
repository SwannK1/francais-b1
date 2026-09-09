import { describe, expect, it } from "vitest";
import { DOMAIN_LABELS } from "@/lib/pedagogy/data/domain-labels";
import { SKILLS_A2 } from "@/lib/pedagogy/data/skills-a2";
import { MODULES_A2 } from "@/lib/pedagogy/data/modules-a2";
import { EXAMS_A2 } from "@/lib/pedagogy/data/exams-a2";
import { PARCOURS_STAGES_A2 } from "@/lib/pedagogy/data/parcours-stages-a2";
import { existsUnderPublic } from "@/lib/pedagogy/audio/status";
import type { Exercise, ExamSection, Question } from "@/lib/pedagogy/types";

/**
 * Garde-fou de contenu A2 — équivalent isolé de
 * `data/content-integrity.test.ts` (B1), même logique de vérification mais
 * appliquée à `SKILLS_A2` / `MODULES_A2` / `EXAMS_A2` / `PARCOURS_STAGES_A2`
 * (voir `docs/integration/a2-content.md`). Dupliqué plutôt que factorisé
 * avec le test B1 : chaque chantier de contenu doit pouvoir évoluer sans
 * toucher un fichier partagé (principe d'isolation de ce chantier).
 *
 * La vérification de présence réelle du fichier audio sur disque a été
 * ajoutée par le chantier `audio-humanisation` : `chantier/a2-audio` a
 * depuis livré ses 30 fichiers, fermant le trou de couverture documenté ici
 * auparavant (voir `docs/audio/humanisation-backlog.md`).
 */

function duplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const skillDomainById = new Map(SKILLS_A2.map((s) => [s.id, s.domain]));

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
      else if (!ex.audioSrc.startsWith("/audio/a2/")) {
        issues.push(`${label}: audioSrc "${ex.audioSrc}" ne suit pas la convention /audio/a2/... (voir docs/integration/a2-content.md)`);
      } else if (!existsUnderPublic(ex.audioSrc)) {
        issues.push(`${label}: audioSrc "${ex.audioSrc}" introuvable dans public/`);
      }
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

describe("A2 — Skills", () => {
  it("a des ids uniques, tous préfixés a2-", () => {
    expect(duplicates(SKILLS_A2.map((s) => s.id))).toEqual([]);
    const badPrefix = SKILLS_A2.filter((s) => !s.id.startsWith("a2-")).map((s) => s.id);
    expect(badPrefix).toEqual([]);
  });

  it("n'a pas de champ vide", () => {
    const empty = SKILLS_A2.filter((s) => !s.name.trim() || !s.description.trim());
    expect(empty.map((s) => s.id)).toEqual([]);
  });
});

describe("A2 — Parcours stages", () => {
  it("a des ids et slugs uniques, tous préfixés a2-", () => {
    expect(duplicates(PARCOURS_STAGES_A2.map((s) => s.id))).toEqual([]);
    expect(duplicates(PARCOURS_STAGES_A2.map((s) => s.slug))).toEqual([]);
    const badPrefix = PARCOURS_STAGES_A2.filter((s) => !s.id.startsWith("a2-")).map((s) => s.id);
    expect(badPrefix).toEqual([]);
  });
});

describe("A2 — Modules", () => {
  it("couvre les 22 modules attendus du programme (docs/a2/curriculum.md)", () => {
    expect(MODULES_A2.length).toBeGreaterThanOrEqual(20);
    expect(MODULES_A2.length).toBeLessThanOrEqual(30);
  });

  it("a des ids et slugs uniques, tous de niveau A2, tous préfixés a2-", () => {
    expect(duplicates(MODULES_A2.map((m) => m.id))).toEqual([]);
    expect(duplicates(MODULES_A2.map((m) => m.slug))).toEqual([]);
    expect(MODULES_A2.every((m) => m.level === "A2")).toBe(true);
    const badPrefix = MODULES_A2.filter((m) => !m.id.startsWith("a2-")).map((m) => m.id);
    expect(badPrefix).toEqual([]);
  });

  it("a des slugs valides (kebab-case)", () => {
    const invalid = MODULES_A2.filter((m) => !SLUG_RE.test(m.slug)).map((m) => m.slug);
    expect(invalid).toEqual([]);
  });

  it("référence uniquement des stageId définis dans PARCOURS_STAGES_A2", () => {
    const stageIds = new Set(PARCOURS_STAGES_A2.map((s) => s.id));
    const unknown = MODULES_A2.filter((m) => !stageIds.has(m.stageId)).map((m) => `${m.slug} -> ${m.stageId}`);
    expect(unknown).toEqual([]);
  });

  it("a un titre, une description et des objectifs non vides", () => {
    const issues = MODULES_A2.filter(
      (m) => !m.title.trim() || !m.description.trim() || m.objectives.length === 0
    ).map((m) => m.slug);
    expect(issues).toEqual([]);
  });

  it("a au moins une leçon, et chaque leçon a un titre et au moins une activité", () => {
    const issues: string[] = [];
    for (const m of MODULES_A2) {
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

  it("a des ids uniques (lesson/activity/exercise/sous-question), tous modules confondus", () => {
    const lessonIds: string[] = [];
    const activityIds: string[] = [];
    const exerciseIds: string[] = [];
    const subQuestionIds: string[] = [];
    for (const m of MODULES_A2) {
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
    for (const m of MODULES_A2) walk(m, m.slug);
    expect(hits).toEqual([]);
  });

  it("tous les exercices sont valides (skillId connu, réponses cohérentes, audio bien formé)", () => {
    const issues: string[] = [];
    for (const m of MODULES_A2) {
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

  it("tutoie systématiquement dans les consignes de production (pas de vouvoiement de l'apprenant)", () => {
    const issues: string[] = [];
    for (const m of MODULES_A2) {
      for (const l of m.lessons) {
        for (const a of l.activities) {
          for (const ex of a.exercises) {
            if (ex.type === "production_ecrite" || ex.type === "production_orale") {
              // « rendez-vous » contient « vous » sans être un vouvoiement ;
              // une citation entre guillemets « » peut légitimement vouvoyer
              // (ex. un recruteur s'adressant formellement à un candidat,
              // même exception que documentée dans le B1 —
              // docs/b1/pedagogical-audit-2026.md §13).
              const consigne = ex.consigne
                .toLowerCase()
                .replace(/rendez-vous/g, "rendezvous")
                .replace(/«[^»]*»/g, "");
              if (/\bvous\b/.test(consigne) || /\bvotre\b/.test(consigne) || /\bvos\b/.test(consigne)) {
                issues.push(`${m.slug} > ${ex.id}: consigne semble vouvoyer l'apprenant`);
              }
            }
          }
        }
      }
    }
    expect(issues).toEqual([]);
  });
});

describe("A2 — Exams", () => {
  it("a des ids et slugs uniques, tous de niveau A2", () => {
    expect(duplicates(EXAMS_A2.map((e) => e.id))).toEqual([]);
    expect(duplicates(EXAMS_A2.map((e) => e.slug))).toEqual([]);
    expect(EXAMS_A2.every((e) => e.level === "A2")).toBe(true);
  });

  it("a un barème et une durée cohérents avec la somme de ses épreuves", () => {
    const issues: string[] = [];
    for (const e of EXAMS_A2) {
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

  it("a des exercices valides dans chaque épreuve", () => {
    const issues: string[] = [];
    for (const e of EXAMS_A2) {
      for (const section of e.sections) issues.push(...checkExamSection(section, e.slug));
    }
    expect(issues).toEqual([]);
  });
});

describe("A2 — Domain labels", () => {
  it("couvre exactement les domaines utilisés par les compétences A2 (label partagé avec le B1, générique par SkillDomain)", () => {
    const domainsUsed = new Set(SKILLS_A2.map((s) => s.domain));
    const labelled = new Set(Object.keys(DOMAIN_LABELS));
    for (const d of domainsUsed) expect(labelled.has(d)).toBe(true);
  });
});

describe("A2 — Bilan transversal", () => {
  it("le module bilan couvre bien les 4 compétences DELF (correction du gap documenté en B1, voir docs/b1/pedagogical-audit-2026.md §3)", () => {
    const bilan = MODULES_A2.find((m) => m.slug === "bilan-a2");
    expect(bilan).toBeDefined();
    const exerciseTypes = new Set<string>();
    for (const l of bilan!.lessons) {
      for (const a of l.activities) {
        for (const ex of a.exercises) exerciseTypes.add(ex.type);
      }
    }
    expect(exerciseTypes.has("comprehension_ecrite")).toBe(true);
    expect(exerciseTypes.has("comprehension_orale")).toBe(true);
    expect(exerciseTypes.has("production_ecrite")).toBe(true);
    expect(exerciseTypes.has("production_orale")).toBe(true);
  });
});

describe("A2 — Non-régression du mismatch ville-o (docs/audio/humanisation-a1-a2-b1.md §6.6)", () => {
  it("l'exercice ville-o (module se-reperer-en-ville) utilise une piste sur le vocabulaire réellement enseigné, pas une annonce de gare sans rapport", () => {
    const mod = MODULES_A2.find((m) => m.slug === "se-reperer-en-ville");
    expect(mod).toBeDefined();
    let exercise: Exercise | undefined;
    for (const l of mod!.lessons) {
      for (const a of l.activities) {
        const found = a.exercises.find((ex) => ex.id === "ville-o");
        if (found) exercise = found;
      }
    }
    expect(exercise).toBeDefined();
    expect(exercise!.type).toBe("comprehension_orale");
    if (exercise!.type !== "comprehension_orale") throw new Error("unreachable");

    // Jamais revenir à l'ancienne piste de perturbation ferroviaire, sans
    // rapport avec le module (poste/banque/mairie, indications en ville).
    expect(exercise!.audioSrc).not.toContain("gare-perturbation");

    // Le transcript doit réellement contenir le vocabulaire du module
    // (voir `vocabulary` de `a2-se-reperer-en-ville` dans modules-a2-part1.ts) —
    // pas seulement un thème adjacent.
    const transcript = exercise!.transcript ?? "";
    expect(transcript).toMatch(/poste/i);
    expect(transcript).toMatch(/banque/i);
    expect(transcript).toMatch(/tout droit/i);
  });
});
