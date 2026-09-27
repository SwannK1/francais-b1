import type { Skill } from "@/lib/pedagogy/types";

/**
 * Compétences de production orale — des capacités observables dans la vraie
 * vie (se présenter, expliquer un problème au téléphone...), pas un doublon
 * systématique de chaque compétence écrite `pe-*`.
 *
 * Avant ce fichier, les exercices `production_orale` des modules étaient
 * rattachés à une compétence écrite (ex. `pe-se-presenter`) : un entraînement
 * oral faisait progresser « Se présenter par écrit ». Chaque exercice oral
 * des modules pointe désormais vers l'une de ces compétences (voir
 * `skills-oral.test.ts`, qui garantit qu'aucun exercice oral ne reste
 * rattaché à une compétence d'un autre domaine).
 *
 * Aucune correction automatique n'existe : le résultat enregistré reste
 * l'auto-évaluation guidée de l'apprenant (tous les critères cochés ou non,
 * voir `components/pedagogy/SpokenExercise.tsx`), jamais une note de
 * prononciation.
 */
export const SKILLS_ORAL: Skill[] = [
  {
    id: "po-se-presenter",
    domain: "production_orale",
    name: "Se présenter à l'oral",
    description: "Dire qui on est, d'où on vient et ce qu'on fait, à quelqu'un qu'on rencontre.",
  },
  {
    id: "po-parler-quotidien",
    domain: "production_orale",
    name: "Parler de soi et de son quotidien",
    description: "Décrire sa famille, ses habitudes, ses goûts ou son logement à l'oral.",
  },
  {
    id: "po-demander-information",
    domain: "production_orale",
    name: "Demander ou donner une information pratique",
    description: "Commander, demander son chemin, vérifier une consigne, se renseigner à l'oral.",
  },
  {
    id: "po-prendre-rendez-vous",
    domain: "production_orale",
    name: "Prendre ou déplacer un rendez-vous",
    description: "Proposer, accepter, annuler ou déplacer un rendez-vous au téléphone ou en face à face.",
  },
  {
    id: "po-expliquer-probleme",
    domain: "production_orale",
    name: "Expliquer un problème et demander une solution",
    description: "Décrire clairement un problème (panne, santé, erreur, absence) et dire ce qu'on attend.",
  },
  {
    id: "po-raconter-experience",
    domain: "production_orale",
    name: "Raconter une expérience",
    description: "Raconter un événement passé dans l'ordre, avec les bons temps.",
  },
  {
    id: "po-exprimer-opinion",
    domain: "production_orale",
    name: "Donner et justifier son avis",
    description: "Dire ce qu'on pense d'un sujet, comparer et donner des raisons.",
  },
  {
    id: "po-parler-travail",
    domain: "production_orale",
    name: "Parler de son travail et de ses projets",
    description: "Présenter son poste, son parcours ou un projet, par exemple en entretien.",
  },
];

/**
 * Rattachement explicite de chaque exercice oral des modules à sa compétence
 * orale — par identifiant d'exercice (jamais déduit du titre ou du module),
 * même principe que `Module.stageId`. Appliqué directement dans les fichiers
 * de contenu ; cette table sert de référence aux tests d'intégrité.
 */
export const ORAL_EXERCISE_SKILLS: Record<string, string> = {
  // Se présenter
  "sp-h-oral": "po-se-presenter",
  "m01-h-oral": "po-se-presenter",
  "m03-h-oral": "po-se-presenter",
  "m22-i-oral": "po-se-presenter",
  "sped-h-oral": "po-se-presenter",
  "bilan-h-oral": "po-se-presenter",
  // Parler de soi et de son quotidien
  "rel-h-oral": "po-parler-quotidien",
  "m09-h-oral": "po-parler-quotidien",
  "m16-h-oral": "po-parler-quotidien",
  "m23-h-oral": "po-parler-quotidien",
  "fam-h-oral": "po-parler-quotidien",
  "quot-h-oral": "po-parler-quotidien",
  "gout-h-oral": "po-parler-quotidien",
  "etud-h-oral": "po-parler-quotidien",
  "meteo-h-oral": "po-parler-quotidien",
  // Demander ou donner une information pratique
  "log-h-oral": "po-demander-information",
  "form-h-oral": "po-demander-information",
  "pharma-h-oral": "po-demander-information",
  "chemin-h-oral": "po-demander-information",
  "sort-h-oral": "po-demander-information",
  "m12-h-oral": "po-demander-information",
  "cours-h-oral": "po-demander-information",
  "ville-h-oral": "po-demander-information",
  "a2-voy-h-oral": "po-demander-information",
  // Prendre ou déplacer un rendez-vous
  "depl-h-oral": "po-prendre-rendez-vous",
  "m20-h-oral": "po-prendre-rendez-vous",
  "num-h-oral": "po-prendre-rendez-vous",
  "evt-h-oral": "po-prendre-rendez-vous",
  // Expliquer un problème et demander une solution
  "med-h-oral": "po-expliquer-probleme",
  "rec-h-oral": "po-expliquer-probleme",
  "guich-h-oral": "po-expliquer-probleme",
  "panne-h-oral": "po-expliquer-probleme",
  "absen-h-oral": "po-expliquer-probleme",
  "abs-h-oral": "po-expliquer-probleme",
  "gar-h-oral": "po-expliquer-probleme",
  "echange-h-oral": "po-expliquer-probleme",
  "abonn-h-oral": "po-expliquer-probleme",
  "compte-h-oral": "po-expliquer-probleme",
  "logp-h-oral": "po-expliquer-probleme",
  "sante-h-oral": "po-expliquer-probleme",
  "trans-h-oral": "po-expliquer-probleme",
  // Raconter une expérience
  "exp-h-oral": "po-raconter-experience",
  "recit-h-oral": "po-raconter-experience",
  "imp-h-oral": "po-raconter-experience",
  "wknd-h-oral": "po-raconter-experience",
  "a2-exp-h-oral": "po-raconter-experience",
  // Donner et justifier son avis
  "opinion-h-oral": "po-exprimer-opinion",
  "soc-h-oral": "po-exprimer-opinion",
  "medi-h-oral": "po-exprimer-opinion",
  "a2-log-h-oral": "po-exprimer-opinion",
  "bil-h-oral": "po-exprimer-opinion",
  // Parler de son travail et de ses projets
  "travail-h-oral": "po-parler-travail",
  "emp-h-oral": "po-parler-travail",
  "trav-h-oral": "po-parler-travail",
  "a2-emp-h-oral": "po-parler-travail",
  "proj-h-oral": "po-parler-travail",
};
