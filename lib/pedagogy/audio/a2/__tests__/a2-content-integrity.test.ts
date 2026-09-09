import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { A2_PRACTICE_TRACKS } from "@/lib/pedagogy/audio/a2/tracks";
import { A2_FINAL_EVAL_DOCS } from "@/lib/pedagogy/audio/a2/final-evaluation";
import { AUDIO_TRACKS_A2_ALL, A2_FINAL_EVALUATION } from "@/lib/pedagogy/audio/a2/manifest";
import { existsUnderPublic } from "@/lib/pedagogy/audio/status";
import { duplicates, structuralIssues } from "@/lib/pedagogy/audio/a2/validation";
import type { A2Theme, A2DocType } from "@/lib/pedagogy/audio/a2/types";

/**
 * Garde-fou de contenu pour le chantier audio A2 — même esprit que
 * `lib/pedagogy/data/content-integrity.test.ts` (B1), mais entièrement
 * indépendant : ne lit ni n'écrit `lib/pedagogy/data/*`. Détecte au CI ce qui,
 * en production, se traduirait par un exercice sans bonne réponse possible ou
 * un audio manquant.
 */

const ALL_DEFS = [...A2_PRACTICE_TRACKS, ...A2_FINAL_EVAL_DOCS];

describe("Pistes A2 — structure", () => {
  it("a des ids uniques (pratique + évaluation finale confondues)", () => {
    expect(duplicates(ALL_DEFS.map((d) => d.id))).toEqual([]);
  });

  it("ne soulève aucun problème structurel (slug, tours de parole, questions, voix)", () => {
    const issues = ALL_DEFS.flatMap(structuralIssues);
    expect(issues).toEqual([]);
  });

  it("a au moins 24 pistes de pratique — une vraie bibliothèque, pas un premier lot minimal", () => {
    expect(A2_PRACTICE_TRACKS.length).toBeGreaterThanOrEqual(24);
  });

  it("répartit les pistes de pratique sur les 3 étapes de progression, chacune substantielle", () => {
    const counts = { "a2-debut": 0, "a2-milieu": 0, "a2-fin": 0 };
    for (const d of A2_PRACTICE_TRACKS) counts[d.stage]++;
    for (const stage of Object.keys(counts) as (keyof typeof counts)[]) {
      expect(counts[stage]).toBeGreaterThanOrEqual(6);
    }
  });

  it("couvre les 15 grands domaines d'écoute A2 du brief", () => {
    const requiredThemes: A2Theme[] = [
      "vie_quotidienne", "travail", "famille", "achats", "transports", "voyages",
      "logement", "sante", "meteo", "loisirs", "rendez_vous", "messages",
      "evenements", "projets", "recits",
    ];
    const covered = new Set(A2_PRACTICE_TRACKS.map((d) => d.theme));
    const missing = requiredThemes.filter((t) => !covered.has(t));
    expect(missing).toEqual([]);
  });

  it("couvre les types de documents demandés par le brief (« réservation » via ses variantes concrètes hôtel/restaurant)", () => {
    const requiredDocTypes: A2DocType[] = [
      "dialogue", "message_vocal", "annonce_gare", "repondeur", "appel_telephonique",
      "conversation_travail", "hotel", "restaurant", "medecin_pharmacie",
      "interview_simple", "meteo", "programme", "recit_weekend", "projet_vacances",
      "invitation", "probleme_logement",
    ];
    const covered = new Set(ALL_DEFS.map((d) => d.docType));
    const missing = requiredDocTypes.filter((t) => !covered.has(t));
    expect(missing).toEqual([]);
  });

  it("n'a pas de placeholder / TODO visible dans le contenu", () => {
    const patterns = [/lorem ipsum/i, /\btodo\b/i, /\bfixme\b/i, /placeholder/i, /\btbd\b/i, /à compléter/i];
    const hits: string[] = [];
    for (const def of ALL_DEFS) {
      for (const turn of def.turns) {
        for (const re of patterns) if (re.test(turn.text)) hits.push(`${def.id}: /${re.source}/ dans un tour de parole`);
      }
      for (const q of def.exercise.questions) {
        const text = JSON.stringify(q);
        for (const re of patterns) if (re.test(text)) hits.push(`${def.id}/${q.id}: /${re.source}/`);
      }
    }
    expect(hits).toEqual([]);
  });
});

describe("Questions de compréhension", () => {
  it("chaque QCM a un correctChoiceId valide, sans doublon de choix", () => {
    const issues: string[] = [];
    for (const def of ALL_DEFS) {
      for (const q of def.exercise.questions) {
        if (q.kind !== "qcm") continue;
        const ids = q.choices.map((c) => c.id);
        if (!ids.includes(q.correctChoiceId)) issues.push(`${def.id}/${q.id}: correctChoiceId hors limites`);
        if (duplicates(ids).length) issues.push(`${def.id}/${q.id}: choix avec ids dupliqués`);
        if (q.choices.length < 2) issues.push(`${def.id}/${q.id}: moins de 2 choix`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("chaque question a une explication de correction non vide", () => {
    const issues: string[] = [];
    for (const def of ALL_DEFS) {
      for (const q of def.exercise.questions) {
        if (!q.correction.explanation.trim()) issues.push(`${def.id}/${q.id}: correction.explanation vide`);
      }
    }
    expect(issues).toEqual([]);
  });

  it("a des ids de question uniques, toutes pistes confondues", () => {
    const allQuestionIds = ALL_DEFS.flatMap((d) => d.exercise.questions.map((q) => q.id));
    expect(duplicates(allQuestionIds)).toEqual([]);
  });
});

describe("Manifest audio A2 (audioSrc/transcript dérivés)", () => {
  it("dérive un audioSrc et un transcript non vides pour chaque piste", () => {
    const issues: string[] = [];
    for (const t of AUDIO_TRACKS_A2_ALL) {
      if (!t.exercise.audioSrc.startsWith("/audio/a2/")) issues.push(`${t.id}: audioSrc hors convention (${t.exercise.audioSrc})`);
      if (!t.exercise.transcript?.trim()) issues.push(`${t.id}: transcript vide`);
    }
    expect(issues).toEqual([]);
  });

  it("chaque audioSrc pointe vers un fichier réellement présent dans public/ (npm run audio:a2:generate doit avoir tourné)", () => {
    const missing = AUDIO_TRACKS_A2_ALL.filter((t) => !existsUnderPublic(t.exercise.audioSrc)).map((t) => t.id);
    expect(missing).toEqual([]);
  });

  it("n'a pas deux pistes qui réutilisent le même fichier audio", () => {
    expect(duplicates(AUDIO_TRACKS_A2_ALL.map((t) => t.exercise.audioSrc))).toEqual([]);
  });
});

describe("Évaluation orale A2 finale", () => {
  it("combine bien 4 documents distincts des pistes de pratique", () => {
    expect(A2_FINAL_EVAL_DOCS.length).toBeGreaterThanOrEqual(4);
    const practiceIds = new Set(A2_PRACTICE_TRACKS.map((d) => d.id));
    for (const doc of A2_FINAL_EVAL_DOCS) expect(practiceIds.has(doc.id)).toBe(false);
  });

  it("a un barème cohérent avec la somme des questions de sa section", () => {
    const section = A2_FINAL_EVALUATION.sections[0];
    const totalQuestions = section.exercises.reduce((sum, ex) => sum + (ex.type === "comprehension_orale" ? ex.questions.length : 0), 0);
    expect(section.maxScore).toBe(totalQuestions);
    expect(A2_FINAL_EVALUATION.maxScore).toBe(totalQuestions);
    expect(A2_FINAL_EVALUATION.passingScore).toBeLessThanOrEqual(A2_FINAL_EVALUATION.maxScore);
  });
});

describe("Frontière premium — pas de fuite de correction/transcript côté client", () => {
  it("aucun composant client (\"use client\") n'importe le manifest A2 (correctAnswer/correction) directement", { timeout: 20000 }, () => {
    const roots = ["app", "components"].filter((r) => {
      try {
        statSync(path.join(process.cwd(), r));
        return true;
      } catch {
        return false;
      }
    });
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === "node_modules" || entry.name === ".next") continue;
          walk(full);
        } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
          const content = readFileSync(full, "utf8");
          if (/^\s*["']use client["'];?/m.test(content) && content.includes("pedagogy/audio/a2/manifest")) {
            offenders.push(full);
          }
        }
      }
    };
    for (const root of roots) walk(path.join(process.cwd(), root));
    expect(offenders).toEqual([]);
  });
});
