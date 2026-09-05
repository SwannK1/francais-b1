import type { A1Module } from "@/lib/pedagogy/data/a1/types";

/**
 * Étape "Bilan A1" (a1-bilan, kind: bilan) : dernier module du parcours,
 * avant l'évaluation finale (voir `../exams-a1.ts`). Récapitule l'ensemble
 * du niveau A1 dans une situation complète et autonome — "Fin A1" de la
 * consigne du chantier : situation du quotidien complète, compréhension de
 * messages simples, courtes productions, autonomie élémentaire.
 */
export const MODULES_A1_BILAN_FINAL: A1Module[] = [
  {
    id: "a1-bilan-final",
    slug: "bilan-a1",
    level: "A1",
    title: "Bilan A1 : je fais le point",
    description:
      "Dernier module du parcours A1 : une situation complète qui combine identité, quotidien, ville et projets, pour vérifier ton autonomie avant de continuer vers le A2.",
    objectives: [
      "Comprendre un message qui combine plusieurs sujets A1",
      "Réutiliser le vocabulaire et la grammaire de tout le parcours A1",
      "Identifier ce qui est acquis et ce qu'il reste à consolider",
    ],
    domain: "vocabulaire",
    stageId: "a1-bilan",
    estimatedMinutes: 25,
    situation:
      "Amina écrit une longue lettre à son amie restée dans son pays pour raconter sa nouvelle vie en France : elle-même, son logement, sa ville, son quotidien et ses projets.",
    vocabulary: [
      { term: "l'identité", category: "principal" },
      { term: "le quotidien", category: "principal" },
      { term: "la ville", category: "principal" },
      { term: "un projet", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Récapitulatif général A1",
        explanation:
          "être, avoir, les verbes en -er, aller/faire/venir/prendre au présent ; les articles et les possessifs ; il y a / c'est ; la négation ne...pas ; les questions avec est-ce que ; le futur proche : ce sont les outils qui permettent de raconter une situation complète comme celle d'Amina.",
      },
    ],
    examLinks: ["DELF A1 — compréhension de l'écrit", "DELF A1 — production écrite"],
    miniEvaluationThreshold: 4,
    lessons: [
      {
        id: "bilan-final-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "bilan-final-comprendre-activite",
            title: "Lire une lettre complète",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m23-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis la lettre d'Amina, puis réponds.",
                text:
                  "Chère Sofia,\n" +
                  "Je m'appelle toujours Amina, bien sûr, mais ma vie a beaucoup changé ! J'habite maintenant à " +
                  "Nantes, dans un petit appartement avec une chambre et un salon. Il y a un grand parc juste en " +
                  "face, c'est très pratique. Tous les jours, je me lève à 7h, je prends le bus, et je travaille " +
                  "dans une école comme assistante. Le week-end, je fais du sport ou je vais au cinéma avec des " +
                  "amis. La semaine prochaine, je vais commencer un cours de français avancé : j'ai hâte ! " +
                  "Et toi, comment vas-tu ? Écris-moi vite.\n" +
                  "Amina",
                questions: [
                  {
                    kind: "qcm",
                    id: "m23-e1-q1",
                    prompt: "Où habite Amina maintenant ?",
                    choices: [
                      { id: "a", text: "À Nantes" },
                      { id: "b", text: "À Lyon" },
                      { id: "c", text: "Dans son pays d'origine" },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "À Nantes", explanation: "« J'habite maintenant à Nantes. »" },
                  },
                  {
                    kind: "qcm",
                    id: "m23-e1-q2",
                    prompt: "Où travaille Amina ?",
                    choices: [
                      { id: "a", text: "Dans un hôpital" },
                      { id: "b", text: "Dans une école" },
                      { id: "c", text: "Dans un magasin" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Dans une école", explanation: "« Je travaille dans une école comme assistante. »" },
                  },
                  {
                    kind: "vrai_faux",
                    id: "m23-e1-q3",
                    prompt: "Vrai ou faux : Amina n'a pas d'amis à Nantes.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "« Je vais au cinéma avec des amis. »" },
                  },
                  {
                    kind: "libre",
                    id: "m23-e1-q4",
                    prompt: "Qu'est-ce qu'Amina va commencer la semaine prochaine ?",
                    expectedAnswer: "Un cours de français avancé.",
                    correction: { correctAnswer: "Un cours de français avancé.", explanation: "« Je vais commencer un cours de français avancé. »" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-final-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "bilan-final-entrainement-activite",
            title: "Réviser tout le parcours A1",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m23-g1",
                type: "texte_a_trous",
                skillId: "a1-gr-verbes-er",
                difficulty: "A1",
                instructions: "Complète avec le présent du verbe entre parenthèses.",
                textWithBlanks: "Amina {{1}} (habiter) à Nantes. Elle {{2}} (travailler) dans une école et elle {{3}} (aimer) le sport.",
                blanks: [
                  { id: "1", answer: "habite" },
                  { id: "2", answer: "travaille" },
                  { id: "3", answer: "aime" },
                ],
                correction: { correctAnswer: "habite — travaille — aime", explanation: "Verbes réguliers en -er au présent, 3e personne du singulier." },
              },
              {
                id: "m23-g2",
                type: "qcm",
                skillId: "a1-gr-futur-proche",
                difficulty: "A1",
                instructions: "Choisis la bonne forme.",
                question: {
                  kind: "qcm",
                  id: "m23-g2-q",
                  prompt: "La semaine prochaine, elle ___ commencer un nouveau cours.",
                  choices: [
                    { id: "a", text: "va" },
                    { id: "b", text: "vais" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "va", explanation: "Avec « elle », on utilise « va » + infinitif." },
                },
              },
              {
                id: "m23-g3",
                type: "association",
                skillId: "a1-voc-quotidien",
                difficulty: "A1",
                instructions: "Associe chaque information de la lettre à son thème.",
                pairs: [
                  { id: "1", left: "un petit appartement avec un salon", right: "le logement" },
                  { id: "2", left: "je travaille dans une école", right: "le travail" },
                  { id: "3", left: "je fais du sport ou je vais au cinéma", right: "les loisirs" },
                ],
                correction: {
                  correctAnswer: "1 → le logement ; 2 → le travail ; 3 → les loisirs",
                  explanation: "La lettre d'Amina combine plusieurs thèmes du parcours A1.",
                },
              },
              {
                id: "m23-g4",
                type: "vrai_faux",
                skillId: "a1-gr-negation",
                difficulty: "A1",
                instructions: "Vrai ou faux ?",
                statement: "La négation « ne...pas » se place autour du verbe conjugué : je ne travaille pas.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "« Ne » avant le verbe, « pas » après." },
              },
            ],
          },
        ],
      },
      {
        id: "bilan-final-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "bilan-final-ecriture-activite",
            title: "Écrire sa propre lettre",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m23-h",
                type: "production_ecrite",
                skillId: "a1-pe-decrire",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne:
                  "Écris une lettre à un(e) ami(e) (8-10 phrases) : présente-toi, décris ton logement, ton quotidien, tes loisirs et un projet futur.",
                minWords: 45,
                maxWords: 90,
                correctionCriteria: [
                  "Présentation personnelle claire (/2)",
                  "Logement et quotidien décrits (/2)",
                  "Au moins un loisir mentionné (/1)",
                  "Un projet exprimé au futur proche (/1)",
                  "Lettre bien organisée du début à la fin (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "bilan-final-ecriture-activite-orale",
            title: "Se raconter à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m23-h-oral",
                type: "production_orale",
                skillId: "a1-pe-decrire",
                difficulty: "A1",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Raconte à voix haute ta vie actuelle : qui tu es, où tu habites, ton quotidien et un projet.",
                prepSeconds: 40,
                maxSpeakSeconds: 90,
                selfAssessmentCriteria: [
                  "J'ai parlé de mon identité.",
                  "J'ai parlé de mon logement ou de mon quotidien.",
                  "J'ai mentionné un projet au futur proche.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-final-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "bilan-final-evaluation-activite",
            title: "Bilan de fin de parcours A1",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "m23-i1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "m23-i1-q",
                  prompt: "Vous ___ français ?",
                  choices: [
                    { id: "a", text: "êtes" },
                    { id: "b", text: "avez" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "êtes", explanation: "On utilise « être » pour la nationalité." },
                },
              },
              {
                id: "m23-i2",
                type: "reponse_courte",
                skillId: "a1-gr-il-y-a-cest",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Complète : « ___ y a un parc en face de chez moi. »",
                acceptedAnswers: ["il"],
                correction: { correctAnswer: "Il", explanation: "« Il y a » signale une présence." },
              },
              {
                id: "m23-i3",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 3. D'après la lettre de ce module.",
                statement: "Amina travaille dans une école.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "« Je travaille dans une école comme assistante. »" },
              },
              {
                id: "m23-i4",
                type: "qcm",
                skillId: "a1-gr-futur-proche",
                difficulty: "A1",
                instructions: "Item 4.",
                question: {
                  kind: "qcm",
                  id: "m23-i4-q",
                  prompt: "Le futur proche se forme avec :",
                  choices: [
                    { id: "a", text: "aller + infinitif" },
                    { id: "b", text: "avoir + infinitif" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "aller + infinitif", explanation: "je vais, tu vas... + infinitif." },
                },
              },
              {
                id: "m23-i5",
                type: "reponse_courte",
                skillId: "a1-voc-loisirs",
                difficulty: "A1",
                instructions: "Item 5.",
                question: "Cite un loisir mentionné dans la lettre d'Amina.",
                acceptedAnswers: ["le sport", "sport", "le cinéma", "cinéma"],
                correction: { correctAnswer: "le sport / le cinéma", explanation: "« Je fais du sport ou je vais au cinéma. »" },
              },
            ],
          },
        ],
      },
    ],
  },
];
