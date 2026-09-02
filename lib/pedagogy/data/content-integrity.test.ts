import { describe, expect, it } from "vitest";
import {
  DOMAIN_LABELS,
  EXAMS,
  LEARNING_GOALS,
  MODULES,
  PARCOURS_STAGES,
  PLACEMENT_QUESTIONS,
  SKILLS,
} from "@/lib/pedagogy/data";
import { AUDIO_TRACKS } from "@/lib/pedagogy/audio/manifest";
import { existsUnderPublic } from "@/lib/pedagogy/audio/status";
import type { Exercise, ExamSection, Question } from "@/lib/pedagogy/types";

/**
 * Garde-fou de contenu : détecte au build/CI les erreurs de données qui, en
 * production, se traduiraient par un exercice sans bonne réponse possible,
 * une page 404 (référence cassée) ou un audio manquant — jamais découvertes
 * à l'usage. Ne teste que ce qui est objectivement déterminable à partir des
 * données ; n'encode aucune préférence éditoriale (ex. équilibre des
 * domaines) qui relèverait d'un jugement pédagogique.
 */

function duplicates(values: string[]): string[] {
  const seen = new Map<string, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  return [...seen.entries()].filter(([, count]) => count > 1).map(([v]) => v);
}

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const skillDomainById = new Map(SKILLS.map((s) => [s.id, s.domain]));

/** Toutes les questions QCM/vrai-faux/libres, quel que soit l'exercice qui les contient. */
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
      else if (ex.audioSrc.startsWith("/") && !existsUnderPublic(ex.audioSrc)) {
        issues.push(`${label}: audioSrc "${ex.audioSrc}" introuvable dans public/`);
      }
      if (!ex.transcript || !ex.transcript.trim()) {
        issues.push(`${label}: transcript manquant (obligatoire pour une compréhension orale — voir pack d'enregistrement)`);
      }
      if (ex.questions.length === 0) issues.push(`${label}: questions vide`);
      break;
    case "reponse_courte":
      if (!ex.question.trim()) issues.push(`${label}: question vide`);
      // acceptedAnswers: [] est une convention volontaire (item auto-évalué,
      // voir WrittenExercise.tsx) — pas une erreur, donc pas vérifié ici.
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

describe("Skills", () => {
  it("a des ids uniques", () => {
    expect(duplicates(SKILLS.map((s) => s.id))).toEqual([]);
  });

  it("n'a pas de champ vide", () => {
    const empty = SKILLS.filter((s) => !s.name.trim() || !s.description.trim());
    expect(empty.map((s) => s.id)).toEqual([]);
  });
});

describe("Parcours stages", () => {
  it("a des ids et slugs uniques", () => {
    expect(duplicates(PARCOURS_STAGES.map((s) => s.id))).toEqual([]);
    expect(duplicates(PARCOURS_STAGES.map((s) => s.slug))).toEqual([]);
  });
});

describe("Learning goals", () => {
  it("a des ids uniques", () => {
    expect(duplicates(LEARNING_GOALS.map((g) => g.id))).toEqual([]);
  });
});

describe("Modules", () => {
  it("a des ids et slugs uniques", () => {
    expect(duplicates(MODULES.map((m) => m.id))).toEqual([]);
    expect(duplicates(MODULES.map((m) => m.slug))).toEqual([]);
  });

  it("a des slugs valides (kebab-case)", () => {
    const invalid = MODULES.filter((m) => !SLUG_RE.test(m.slug)).map((m) => m.slug);
    expect(invalid).toEqual([]);
  });

  it("référence uniquement des stageId définis dans PARCOURS_STAGES", () => {
    const stageIds = new Set(PARCOURS_STAGES.map((s) => s.id));
    const unknown = MODULES.filter((m) => !stageIds.has(m.stageId)).map((m) => `${m.slug} -> ${m.stageId}`);
    expect(unknown).toEqual([]);
  });

  it("a un titre, une description et des objectifs non vides", () => {
    const issues = MODULES.filter(
      (m) => !m.title.trim() || !m.description.trim() || m.objectives.length === 0
    ).map((m) => m.slug);
    expect(issues).toEqual([]);
  });

  it("a au moins une leçon, et chaque leçon a un titre et au moins une activité", () => {
    const issues: string[] = [];
    for (const m of MODULES) {
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
    for (const m of MODULES) {
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
    for (const m of MODULES) walk(m, m.slug);
    expect(hits).toEqual([]);
  });

  it("tous les exercices sont valides (skillId connu, réponses cohérentes)", () => {
    const issues: string[] = [];
    for (const m of MODULES) {
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

  it("chaque audioSrc de compréhension orale pointe vers un fichier réellement présent dans public/", () => {
    const issues: string[] = [];
    for (const m of MODULES) {
      for (const l of m.lessons) {
        for (const a of l.activities) {
          for (const ex of a.exercises) {
            if (ex.type === "comprehension_orale" && ex.audioSrc.startsWith("/")) {
              if (!existsUnderPublic(ex.audioSrc)) {
                issues.push(`${m.slug} > ${ex.id}: ${ex.audioSrc} introuvable`);
              }
            }
          }
        }
      }
    }
    expect(issues).toEqual([]);
  });
});

describe("Placement questions", () => {
  it("a des ids uniques et des correctChoiceId valides", () => {
    expect(duplicates(PLACEMENT_QUESTIONS.map((q) => q.id))).toEqual([]);
    const issues: string[] = [];
    for (const q of PLACEMENT_QUESTIONS) {
      const choiceIds = q.choices.map((c) => c.id);
      if (!choiceIds.includes(q.correctChoiceId)) issues.push(`${q.id}: correctChoiceId hors limites`);
      if (duplicates(choiceIds).length) issues.push(`${q.id}: choix dupliqués`);
      if (!q.prompt.trim()) issues.push(`${q.id}: prompt vide`);
    }
    expect(issues).toEqual([]);
  });
});

describe("Exams", () => {
  it("a des ids et slugs uniques", () => {
    expect(duplicates(EXAMS.map((e) => e.id))).toEqual([]);
    expect(duplicates(EXAMS.map((e) => e.slug))).toEqual([]);
  });

  it("a un barème et une durée cohérents avec la somme de ses épreuves", () => {
    const issues: string[] = [];
    for (const e of EXAMS) {
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
    for (const e of EXAMS) {
      for (const section of e.sections) issues.push(...checkExamSection(section, e.slug));
    }
    expect(issues).toEqual([]);
  });
});

describe("Domain labels", () => {
  it("couvre exactement les domaines utilisés par les compétences (SKILLS)", () => {
    const domainsUsed = new Set(SKILLS.map((s) => s.domain));
    const labelled = new Set(Object.keys(DOMAIN_LABELS));
    for (const d of domainsUsed) expect(labelled.has(d)).toBe(true);
  });
});

/**
 * Pipeline audio humain — voir `docs/b1/audio-human-recording-plan.md`.
 * Le manifest (`lib/pedagogy/audio/manifest.ts`) est dérivé des exercices
 * `comprehension_orale` de MODULES/EXAMS : ces tests vérifient que rien n'y
 * échappe silencieusement (piste sans métadonnées de production, chemin
 * humain mal formé) et que le fichier synthétique actuel — le filet tant
 * qu'aucun humain n'est livré — reste bien présent.
 */
describe("Pipeline audio humain", () => {
  it("a une piste de manifest pour chaque exercice comprehension_orale, sans doublon ni orphelin", () => {
    const realIds: string[] = [];
    for (const m of MODULES) {
      for (const l of m.lessons) {
        for (const a of l.activities) {
          for (const ex of a.exercises) if (ex.type === "comprehension_orale") realIds.push(ex.id);
        }
      }
    }
    for (const e of EXAMS) {
      for (const section of e.sections) {
        for (const ex of section.exercises) if (ex.type === "comprehension_orale") realIds.push(ex.id);
      }
    }

    expect(duplicates(realIds)).toEqual([]);
    expect(duplicates(AUDIO_TRACKS.map((t) => t.id))).toEqual([]);
    expect(new Set(AUDIO_TRACKS.map((t) => t.id))).toEqual(new Set(realIds));
  });

  it("a un chemin humain conventionnel valide et distinct du chemin synthétique", () => {
    const issues: string[] = [];
    for (const t of AUDIO_TRACKS) {
      if (t.humanSrc === t.syntheticSrc) issues.push(`${t.id}: humanSrc identique à syntheticSrc`);
      const expectedSuffix = t.syntheticSrc.split("/").pop();
      if (!t.humanSrc.includes("/human/") || !t.humanSrc.endsWith(`/human/${expectedSuffix}`)) {
        issues.push(`${t.id}: humanSrc "${t.humanSrc}" ne suit pas la convention <dossier>/human/<même nom de fichier>`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("a un transcript, au moins un locuteur documenté et une locale pour chaque piste", () => {
    const issues: string[] = [];
    for (const t of AUDIO_TRACKS) {
      if (!t.transcript.trim()) issues.push(`${t.id}: transcript vide`);
      if (t.production.speakers.length === 0) {
        issues.push(`${t.id}: aucun locuteur documenté dans AUDIO_PRODUCTION_META (manifest.ts) — plan d'enregistrement incomplet`);
      }
      if (!t.locale) issues.push(`${t.id}: locale manquante`);
    }
    expect(issues).toEqual([]);
  });

  it("n'a pas deux pistes différentes qui réutilisent le même fichier synthétique", () => {
    expect(duplicates(AUDIO_TRACKS.map((t) => t.syntheticSrc))).toEqual([]);
  });

  it("a un fichier synthétique réellement présent sur disque pour chaque piste (filet de secours actif)", () => {
    const missing = AUDIO_TRACKS.filter((t) => !existsUnderPublic(t.syntheticSrc)).map((t) => t.id);
    expect(missing).toEqual([]);
  });
});
