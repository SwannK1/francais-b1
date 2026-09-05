import type { A1Module } from "@/lib/pedagogy/data/a1/types";

/**
 * Étape "S'entraîner façon DELF A1" (a1-preparation-examen, kind: practice).
 * Situations originales inspirées des compétences attendues au DELF A1 —
 * jamais un sujet officiel reproduit (voir consigne "Préparation DELF" du
 * chantier). Combine plusieurs compétences déjà travaillées dans un format
 * proche d'une épreuve courte.
 */
export const MODULES_A1_PREPARATION_EXAMEN: A1Module[] = [
  {
    id: "a1-entrainement-comprehension",
    slug: "entrainement-comprehension-delf-a1",
    level: "A1",
    title: "S'entraîner : compréhension façon DELF A1",
    description:
      "À la fin de ce module, tu es capable de traiter des documents courts en compréhension écrite et orale, dans un format proche du DELF A1.",
    objectives: [
      "Comprendre un document écrit court et informatif",
      "Comprendre une annonce orale courte",
      "Repérer rapidement les informations essentielles (qui, quoi, où, quand)",
    ],
    domain: "comprehension_ecrite",
    stageId: "a1-preparation-examen",
    estimatedMinutes: 25,
    situation: "Entraînement libre, sans mise en situation unique : plusieurs documents courts et indépendants, comme dans une épreuve de compréhension.",
    vocabulary: [
      { term: "un document", category: "principal" },
      { term: "une consigne", category: "principal" },
      { term: "une information", category: "principal" },
      { term: "qui, quoi, où, quand", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Repérer les informations clés",
        explanation:
          "Face à un document court, cherche d'abord qui parle, de quoi il s'agit, où et quand cela se passe : ces 4 questions suffisent souvent à répondre aux questions du DELF A1.",
      },
    ],
    examLinks: ["DELF A1 — compréhension de l'écrit", "DELF A1 — compréhension de l'oral"],
    miniEvaluationThreshold: 3,
    lessons: [
      {
        id: "entrainement-comprehension-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "entrainement-comprehension-comprendre-activite-1",
            title: "Document 1 : une petite annonce",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m21-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-panneaux-annonces",
                difficulty: "A1",
                instructions: "Lis l'annonce, puis réponds.",
                text: "Cours de cuisine française. Tous les mardis à 18h30, salle 3. Prix : 10 euros la séance. Inscription à l'accueil.",
                questions: [
                  {
                    kind: "qcm",
                    id: "m21-e1-q1",
                    prompt: "Quel jour a lieu le cours ?",
                    choices: [
                      { id: "a", text: "Le lundi" },
                      { id: "b", text: "Le mardi" },
                      { id: "c", text: "Le mercredi" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Le mardi", explanation: "« Tous les mardis à 18h30. »" },
                  },
                  {
                    kind: "libre",
                    id: "m21-e1-q2",
                    prompt: "Combien coûte une séance ?",
                    expectedAnswer: "10 euros",
                    correction: { correctAnswer: "10 euros", explanation: "« Prix : 10 euros la séance. »" },
                  },
                ],
              },
            ],
          },
          {
            id: "entrainement-comprehension-comprendre-activite-2",
            title: "Document 2 : un message court",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m21-e2",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le message, puis réponds.",
                text: "Salut, je suis en retard, le bus a 10 minutes de retard. J'arrive à 9h10. À tout de suite !",
                questions: [
                  {
                    kind: "vrai_faux",
                    id: "m21-e2-q1",
                    prompt: "Vrai ou faux : la personne prend le train.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Elle dit « le bus a 10 minutes de retard »." },
                  },
                  {
                    kind: "qcm",
                    id: "m21-e2-q2",
                    prompt: "À quelle heure va-t-elle arriver ?",
                    choices: [
                      { id: "a", text: "9h00" },
                      { id: "b", text: "9h10" },
                      { id: "c", text: "10h00" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "9h10", explanation: "« J'arrive à 9h10. »" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "entrainement-comprehension-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "entrainement-comprehension-ecoute-activite",
            title: "Document 3 : une annonce orale",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "m21-f1",
                type: "comprehension_orale",
                skillId: "a1-co-annonces-simples",
                difficulty: "A1",
                instructions: "Écoute l'annonce, puis réponds.",
                audioSrc: "/audio/a1/entrainement-comprehension/m21-f1.mp3",
                transcript: "Le magasin fermera exceptionnellement à 17 heures aujourd'hui, au lieu de 19 heures.",
                questions: [
                  {
                    kind: "qcm",
                    id: "m21-f1-q1",
                    prompt: "À quelle heure ferme le magasin aujourd'hui ?",
                    choices: [
                      { id: "a", text: "17 heures" },
                      { id: "b", text: "19 heures" },
                      { id: "c", text: "18 heures" },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "17 heures", explanation: "« Le magasin fermera exceptionnellement à 17 heures. »" },
                  },
                ],
              },
              {
                id: "m21-f2",
                type: "comprehension_orale",
                skillId: "a1-co-dialogues-quotidiens",
                difficulty: "A1",
                instructions: "Écoute le dialogue, puis réponds.",
                audioSrc: "/audio/a1/entrainement-comprehension/m21-f2.mp3",
                transcript: "— Bonjour, je voudrais un billet pour Lyon. — Aller simple ou aller-retour ? — Aller-retour, s'il vous plaît.",
                questions: [
                  {
                    kind: "vrai_faux",
                    id: "m21-f2-q1",
                    prompt: "Vrai ou faux : le client achète un aller simple.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il répond « Aller-retour, s'il vous plaît. »" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "entrainement-comprehension-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "entrainement-comprehension-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m21-i1",
                type: "qcm",
                skillId: "a1-ce-panneaux-annonces",
                difficulty: "A1",
                instructions: "Item 1. D'après l'annonce du cours de cuisine.",
                question: {
                  kind: "qcm",
                  id: "m21-i1-q",
                  prompt: "Où s'inscrit-on pour le cours de cuisine ?",
                  choices: [
                    { id: "a", text: "À l'accueil" },
                    { id: "b", text: "Par téléphone" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "À l'accueil", explanation: "« Inscription à l'accueil. »" },
                },
              },
              {
                id: "m21-i2",
                type: "reponse_courte",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 2. D'après le message de retard.",
                question: "Quel moyen de transport a du retard ?",
                acceptedAnswers: ["le bus", "bus"],
                correction: { correctAnswer: "le bus", explanation: "« Le bus a 10 minutes de retard. »" },
              },
              {
                id: "m21-i3",
                type: "vrai_faux",
                skillId: "a1-co-annonces-simples",
                difficulty: "A1",
                instructions: "Item 3. D'après l'annonce du magasin.",
                statement: "Le magasin ferme plus tôt que d'habitude aujourd'hui.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "17h au lieu de 19h, donc plus tôt." },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a1-entrainement-production",
    slug: "entrainement-production-delf-a1",
    level: "A1",
    title: "S'entraîner : production façon DELF A1",
    description:
      "À la fin de ce module, tu es capable de rédiger un message court et de te présenter à l'oral, dans un format proche du DELF A1.",
    objectives: [
      "Rédiger un message ou une fiche de présentation courte",
      "Répondre à des questions personnelles à l'oral",
      "Réutiliser le vocabulaire et la grammaire des étapes précédentes",
    ],
    domain: "production_ecrite",
    stageId: "a1-preparation-examen",
    estimatedMinutes: 25,
    situation: "Entraînement libre inspiré des épreuves de production écrite (fiche/message) et de production orale (entretien dirigé) du DELF A1.",
    vocabulary: [
      { term: "se présenter", category: "expression" },
      { term: "un formulaire", category: "principal" },
      { term: "un entretien", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Structurer une présentation à l'oral",
        explanation:
          "Dans un entretien dirigé type DELF A1, on répond à des questions simples : nom, âge, nationalité, famille, logement, loisirs. Réponds par des phrases complètes, pas seulement un mot.",
      },
    ],
    examLinks: ["DELF A1 — production écrite", "DELF A1 — production orale (entretien dirigé)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "entrainement-production-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "entrainement-production-entrainement-activite",
            title: "Réviser avant de produire",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m22-g1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Choisis la bonne forme.",
                question: {
                  kind: "qcm",
                  id: "m22-g1-q",
                  prompt: "Je ___ 28 ans et je ___ étudiante.",
                  choices: [
                    { id: "a", text: "ai / suis" },
                    { id: "b", text: "suis / ai" },
                    { id: "c", text: "as / es" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "ai / suis", explanation: "« Avoir » pour l'âge, « être » pour l'identité." },
                },
              },
              {
                id: "m22-g2",
                type: "association",
                skillId: "a1-voc-identite",
                difficulty: "A1",
                instructions: "Associe la question d'entretien au thème.",
                pairs: [
                  { id: "1", left: "Qu'est-ce que vous aimez faire le week-end ?", right: "les loisirs" },
                  { id: "2", left: "Où habitez-vous ?", right: "le logement" },
                  { id: "3", left: "Avez-vous des frères et sœurs ?", right: "la famille" },
                ],
                correction: {
                  correctAnswer: "1 → les loisirs ; 2 → le logement ; 3 → la famille",
                  explanation: "Ce sont des questions typiques d'un entretien dirigé A1.",
                },
              },
              {
                id: "m22-g3",
                type: "remise_en_ordre",
                skillId: "a1-gr-interrogation",
                difficulty: "A1",
                instructions: "Remets les mots dans l'ordre pour former une question d'entretien.",
                items: [
                  { id: "a", text: "vous" },
                  { id: "b", text: "quel âge" },
                  { id: "c", text: "avez" },
                  { id: "d", text: "?" },
                ],
                correctOrder: ["b", "c", "a", "d"],
                correction: { correctAnswer: "Quel âge avez-vous ?", explanation: "Le mot interrogatif se place en tête." },
              },
            ],
          },
        ],
      },
      {
        id: "entrainement-production-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "entrainement-production-ecriture-activite",
            title: "Rédiger une fiche de présentation",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m22-h",
                type: "production_ecrite",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne:
                  "Remplis une fiche de présentation complète (6-8 phrases) : nom, âge, nationalité, famille, logement, une activité que tu aimes.",
                minWords: 35,
                maxWords: 70,
                correctionCriteria: [
                  "Toutes les informations demandées sont présentes (/3)",
                  "Les verbes être/avoir/aimer sont bien conjugués (/2)",
                  "Le texte est organisé et compréhensible (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "entrainement-production-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "entrainement-production-evaluation-activite",
            title: "Entretien dirigé",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m22-i-oral",
                type: "production_orale",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Répondez à voix haute, en phrases complètes : Comment vous appelez-vous ? Quel âge avez-vous ? Où habitez-vous ? Qu'est-ce que vous aimez faire ?",
                context: "Situation type entretien dirigé du DELF A1 : l'examinateur pose des questions personnelles simples.",
                prepSeconds: 30,
                maxSpeakSeconds: 60,
                selfAssessmentCriteria: [
                  "J'ai répondu à chaque question par une phrase complète.",
                  "J'ai donné mon nom et mon âge correctement.",
                  "J'ai mentionné mon logement et un loisir.",
                ],
                tips: "Pas besoin de réponses longues : une phrase claire par question suffit au niveau A1.",
              },
              {
                id: "m22-i2",
                type: "reponse_courte",
                skillId: "a1-exam-delf-a1",
                difficulty: "A1",
                instructions: "Item écrit.",
                question: "Dans un entretien dirigé A1, à quelle question répond-on avec « j'ai... ans » ?",
                acceptedAnswers: ["quel âge avez-vous ?", "quel âge avez-vous", "quel âge as-tu ?", "quel âge as-tu"],
                correction: { correctAnswer: "Quel âge avez-vous ?", explanation: "« Avoir » sert à donner son âge." },
              },
            ],
          },
        ],
      },
    ],
  },
];
