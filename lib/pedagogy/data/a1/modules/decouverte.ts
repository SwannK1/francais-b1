import type { A1Module } from "@/lib/pedagogy/data/a1/types";

/**
 * Étape "Découverte" (a1-decouverte) : 4 modules — se présenter, compter et
 * donner son âge, dire sa nationalité, parler de sa famille. Premiers pas :
 * phrases très courtes, lexique transparent, structures répétitives.
 */
export const MODULES_A1_DECOUVERTE: A1Module[] = [
  {
    id: "a1-se-presenter",
    slug: "se-presenter",
    level: "A1",
    title: "Se saluer et se présenter",
    description: "À la fin de ce module, tu peux saluer quelqu'un, dire ton nom et épeler.",
    objectives: [
      "Saluer et prendre congé",
      "Dire son nom et épeler",
      "Demander le nom de quelqu'un",
    ],
    domain: "grammaire",
    stageId: "a1-decouverte",
    estimatedMinutes: 15,
    situation:
      "Premier jour dans un cours de français à Paris. Deux nouveaux étudiants, Ana et Marco, se rencontrent avant le cours.",
    vocabulary: [
      { term: "bonjour", category: "expression" },
      { term: "bonsoir", category: "expression" },
      { term: "salut", category: "expression" },
      { term: "au revoir", category: "expression" },
      { term: "à bientôt", category: "expression" },
      { term: "s'appeler", category: "verbe" },
      { term: "être", category: "verbe" },
      { term: "je m'appelle", category: "expression" },
      { term: "enchanté(e)", category: "expression" },
      { term: "comment ça s'écrit ?", category: "expression" },
      { term: "l'alphabet", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Le verbe être au présent",
        explanation:
          "je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. « Être » sert à dire qui on est : Je suis Ana.",
      },
      {
        title: "Le verbe s'appeler",
        explanation:
          "Pour dire son nom : je m'appelle, tu t'appelles, il/elle s'appelle. Pour demander : Comment tu t'appelles ? / Comment vous appelez-vous ?",
      },
    ],
    examLinks: ["DELF A1 — production orale (entretien dirigé)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "se-presenter-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "se-presenter-comprendre-activite",
            title: "Lire un petit dialogue",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m01-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le dialogue, puis réponds aux questions.",
                text:
                  "— Bonjour ! Je m'appelle Ana. Et toi, comment tu t'appelles ?\n" +
                  "— Salut Ana, moi c'est Marco.\n" +
                  "— Marco, ça s'écrit comment ?\n" +
                  "— M-A-R-C-O.\n" +
                  "— Enchantée, Marco !\n" +
                  "— Enchanté !",
                questions: [
                  {
                    kind: "qcm",
                    id: "m01-e1-q1",
                    prompt: "Comment s'appelle la première personne ?",
                    choices: [
                      { id: "a", text: "Marco" },
                      { id: "b", text: "Ana" },
                      { id: "c", text: "Anna" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Ana",
                      explanation: "Elle dit : « Je m'appelle Ana. »",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "m01-e1-q2",
                    prompt: "Comment Marco épelle son nom ?",
                    choices: [
                      { id: "a", text: "M-A-R-C-O" },
                      { id: "b", text: "M-A-R-K-O" },
                      { id: "c", text: "M-A-R-C-O-T" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "M-A-R-C-O",
                      explanation: "Marco épelle lettre par lettre : M-A-R-C-O.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "m01-e1-q3",
                    prompt: "Vrai ou faux : Ana et Marco se connaissent déjà.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Ils se disent « enchanté(e) », ce qu'on dit quand on rencontre quelqu'un pour la première fois.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "se-presenter-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "se-presenter-entrainement-activite",
            title: "Saluer et se présenter",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m01-g1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Choisis la bonne forme du verbe être.",
                question: {
                  kind: "qcm",
                  id: "m01-g1-q",
                  prompt: "Vous ___ Marco ?",
                  choices: [
                    { id: "a", text: "êtes" },
                    { id: "b", text: "es" },
                    { id: "c", text: "sommes" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "êtes",
                    explanation: "Avec « vous », on utilise « êtes » : vous êtes.",
                  },
                },
              },
              {
                id: "m01-g2",
                type: "texte_a_trous",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Complète avec « suis », « es » ou « sommes ».",
                textWithBlanks:
                  "Bonjour, je {{1}} Ana. Et toi, tu {{2}} étudiant ? Nous {{3}} dans la même classe.",
                blanks: [
                  { id: "1", answer: "suis" },
                  { id: "2", answer: "es" },
                  { id: "3", answer: "sommes" },
                ],
                correction: {
                  correctAnswer: "suis — es — sommes",
                  explanation: "je suis, tu es, nous sommes : les formes du verbe être au présent.",
                },
              },
              {
                id: "m01-g3",
                type: "association",
                skillId: "a1-voc-identite",
                difficulty: "A1",
                instructions: "Associe chaque phrase à sa réponse logique.",
                pairs: [
                  { id: "1", left: "Comment tu t'appelles ?", right: "Je m'appelle Marco." },
                  { id: "2", left: "Comment ça s'écrit ?", right: "M-A-R-C-O." },
                  { id: "3", left: "Au revoir !", right: "À bientôt !" },
                ],
                correction: {
                  correctAnswer: "1 → Marco ; 2 → M-A-R-C-O ; 3 → À bientôt !",
                  explanation: "Chaque question a une réponse habituelle en français.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "se-presenter-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "se-presenter-ecriture-activite",
            title: "Se présenter par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m01-h",
                type: "production_ecrite",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne: "Présente-toi en 2 ou 3 phrases très courtes : ton nom, et « bonjour » ou « enchanté(e) ».",
                minWords: 8,
                maxWords: 30,
                correctionCriteria: [
                  "Le nom est donné clairement (/2)",
                  "Au moins une formule de salutation (/1)",
                  "Phrases très simples et compréhensibles (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "se-presenter-ecriture-activite-orale",
            title: "Se présenter à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m01-h-oral",
                type: "production_orale",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Tu rencontres quelqu'un de nouveau. Dis bonjour et présente-toi (ton nom, épelle-le).",
                context: "Même situation qu'Ana et Marco dans ce module.",
                prepSeconds: 20,
                maxSpeakSeconds: 30,
                selfAssessmentCriteria: [
                  "J'ai dit bonjour.",
                  "J'ai dit mon nom.",
                  "J'ai épelé mon nom.",
                ],
                tips: "Parle lentement, une lettre après l'autre pour épeler.",
              },
            ],
          },
        ],
      },
      {
        id: "se-presenter-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "se-presenter-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m01-i1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "m01-i1-q",
                  prompt: "Je ___ étudiante.",
                  choices: [
                    { id: "a", text: "suis" },
                    { id: "b", text: "es" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "suis",
                    explanation: "Avec « je », on utilise « suis ».",
                  },
                },
              },
              {
                id: "m01-i2",
                type: "reponse_courte",
                skillId: "a1-voc-identite",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Comment dit-on « bye » à l'écrit, de façon simple et familière, en français ?",
                acceptedAnswers: ["salut", "au revoir", "à bientôt"],
                correction: {
                  correctAnswer: "salut / au revoir / à bientôt",
                  explanation: "On peut dire « salut » (familier), « au revoir » ou « à bientôt ».",
                },
              },
              {
                id: "m01-i3",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 3. D'après le dialogue.",
                statement: "Marco épelle son nom parce qu'Ana ne comprend pas comment il s'écrit.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "Ana demande « Marco, ça s'écrit comment ? », donc il épelle.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a1-nombres-et-age",
    slug: "nombres-et-age",
    level: "A1",
    title: "Les nombres et l'âge",
    description: "À la fin de ce module, tu peux compter, donner ton âge et ton numéro de téléphone.",
    objectives: [
      "Utiliser les nombres de 0 à 100",
      "Donner et demander l'âge de quelqu'un",
      "Donner un numéro de téléphone",
    ],
    domain: "vocabulaire",
    stageId: "a1-decouverte",
    estimatedMinutes: 18,
    situation: "À la bibliothèque, l'employée demande quelques informations à Nadia pour créer sa carte de lecteur.",
    vocabulary: [
      { term: "zéro, un, deux, trois...", category: "principal" },
      { term: "dix, vingt, trente...", category: "principal" },
      { term: "cent", category: "principal" },
      { term: "avoir", category: "verbe" },
      { term: "un an / des ans", category: "principal" },
      { term: "quel âge as-tu ?", category: "expression" },
      { term: "j'ai ... ans", category: "expression" },
      { term: "un numéro de téléphone", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Le verbe avoir au présent",
        explanation: "j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. On utilise « avoir » pour l'âge : j'ai 25 ans.",
      },
      {
        title: "Les nombres de 0 à 100",
        explanation:
          "0-16 ont une forme propre (zéro à seize). À partir de 17 : dix-sept, dix-huit, dix-neuf, puis vingt, vingt et un, vingt-deux... jusqu'à cent.",
      },
    ],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "nombres-et-age-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "nombres-et-age-comprendre-activite",
            title: "Lire une fiche d'inscription",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m02-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis la fiche, puis réponds.",
                text: "Prénom : Nadia — Âge : 32 ans — Téléphone : 06 14 22 35 09",
                questions: [
                  {
                    kind: "qcm",
                    id: "m02-e1-q1",
                    prompt: "Quel âge a Nadia ?",
                    choices: [
                      { id: "a", text: "22 ans" },
                      { id: "b", text: "32 ans" },
                      { id: "c", text: "14 ans" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "32 ans",
                      explanation: "La fiche indique « Âge : 32 ans ».",
                    },
                  },
                  {
                    kind: "libre",
                    id: "m02-e1-q2",
                    prompt: "Quel est le numéro de téléphone de Nadia ?",
                    expectedAnswer: "06 14 22 35 09",
                    correction: {
                      correctAnswer: "06 14 22 35 09",
                      explanation: "C'est le numéro écrit après « Téléphone : ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nombres-et-age-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "nombres-et-age-ecoute-activite",
            title: "Écouter un échange à la bibliothèque",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "m02-f1",
                type: "comprehension_orale",
                skillId: "a1-co-dialogues-quotidiens",
                difficulty: "A1",
                instructions: "Écoute l'échange, puis réponds à la question.",
                audioSrc: "/audio/a1/nombres-et-age/m02-f1.mp3",
                transcript: "— Quel âge avez-vous ? — J'ai trente-deux ans. — Et votre numéro de téléphone ? — C'est le zéro six, quatorze, vingt-deux, trente-cinq, zéro neuf.",
                questions: [
                  {
                    kind: "qcm",
                    id: "m02-f1-q1",
                    prompt: "Quel âge a la personne ?",
                    choices: [
                      { id: "a", text: "13 ans" },
                      { id: "b", text: "30 ans" },
                      { id: "c", text: "32 ans" },
                    ],
                    correctChoiceId: "c",
                    correction: {
                      correctAnswer: "32 ans",
                      explanation: "Elle dit « j'ai trente-deux ans ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nombres-et-age-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "nombres-et-age-entrainement-activite",
            title: "Compter et donner son âge",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m02-g1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Choisis la bonne forme du verbe avoir.",
                question: {
                  kind: "qcm",
                  id: "m02-g1-q",
                  prompt: "Elle ___ 20 ans.",
                  choices: [
                    { id: "a", text: "a" },
                    { id: "b", text: "as" },
                    { id: "c", text: "ai" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "a",
                    explanation: "Avec « il/elle », on utilise « a » : elle a 20 ans.",
                  },
                },
              },
              {
                id: "m02-g2",
                type: "remise_en_ordre",
                skillId: "a1-voc-nombres",
                difficulty: "A1",
                instructions: "Remets ces nombres dans l'ordre croissant.",
                items: [
                  { id: "a", text: "quarante" },
                  { id: "b", text: "quinze" },
                  { id: "c", text: "soixante" },
                  { id: "d", text: "trois" },
                ],
                correctOrder: ["d", "b", "a", "c"],
                correction: {
                  correctAnswer: "trois, quinze, quarante, soixante",
                  explanation: "3 < 15 < 40 < 60.",
                },
              },
              {
                id: "m02-g3",
                type: "texte_a_trous",
                skillId: "a1-voc-nombres",
                difficulty: "A1",
                instructions: "Complète avec le nombre en lettres.",
                textWithBlanks: "J'ai {{1}} (25) ans. Mon numéro de téléphone commence par {{2}} (06).",
                blanks: [
                  { id: "1", answer: "vingt-cinq" },
                  { id: "2", answer: "zéro six" },
                ],
                correction: {
                  correctAnswer: "vingt-cinq — zéro six",
                  explanation: "25 = vingt-cinq ; 06 se lit « zéro six » dans un numéro de téléphone.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "nombres-et-age-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "nombres-et-age-ecriture-activite",
            title: "Donner des informations chiffrées",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m02-h",
                type: "production_ecrite",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne: "Écris 2 phrases : ton âge et ton numéro de téléphone (tu peux inventer un numéro).",
                minWords: 8,
                maxWords: 25,
                correctionCriteria: [
                  "L'âge est donné avec « avoir » (/2)",
                  "Un numéro de téléphone est donné (/1)",
                  "Les nombres sont écrits correctement (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "nombres-et-age-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "nombres-et-age-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "m02-i1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "m02-i1-q",
                  prompt: "Tu ___ quel âge ?",
                  choices: [
                    { id: "a", text: "as" },
                    { id: "b", text: "a" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "as",
                    explanation: "Avec « tu », on utilise « as ».",
                  },
                },
              },
              {
                id: "m02-i2",
                type: "reponse_courte",
                skillId: "a1-voc-nombres",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Écris le nombre 17 en lettres.",
                acceptedAnswers: ["dix-sept", "dix sept"],
                correction: {
                  correctAnswer: "dix-sept",
                  explanation: "17 = dix-sept.",
                },
              },
              {
                id: "m02-i3",
                type: "vrai_faux",
                skillId: "a1-co-dialogues-quotidiens",
                difficulty: "A1",
                instructions: "Item 3. D'après l'audio de ce module.",
                statement: "La personne a trente-deux ans.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "Elle dit « j'ai trente-deux ans ».",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a1-nationalites-et-langues",
    slug: "nationalites-et-langues",
    level: "A1",
    title: "Nationalités et langues",
    description: "À la fin de ce module, tu peux dire d'où tu viens, ta nationalité et les langues que tu parles.",
    objectives: [
      "Dire sa nationalité",
      "Dire d'où on vient",
      "Dire quelle(s) langue(s) on parle",
    ],
    domain: "grammaire",
    stageId: "a1-decouverte",
    estimatedMinutes: 18,
    situation: "Dans un café, Yuki et Carlos discutent pour la première fois après leur cours de français.",
    vocabulary: [
      { term: "venir de", category: "verbe" },
      { term: "parler", category: "verbe" },
      { term: "un pays", category: "principal" },
      { term: "français / française", category: "principal" },
      { term: "japonais / japonaise", category: "principal" },
      { term: "espagnol / espagnole", category: "principal" },
      { term: "anglais / anglaise", category: "principal" },
      { term: "une langue", category: "principal" },
      { term: "un peu", category: "expression" },
      { term: "couramment", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Le verbe venir",
        explanation:
          "je viens, tu viens, il/elle vient, nous venons, vous venez, ils/elles viennent. Venir de + pays/ville : Je viens du Japon.",
      },
      {
        title: "L'accord des adjectifs de nationalité",
        explanation:
          "Au féminin, on ajoute souvent un -e : français → française, anglais → anglaise. Espagnol → espagnole. Attention : japonais/japonaise ne change pas à l'oral.",
      },
    ],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "nationalites-et-langues-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "nationalites-et-langues-comprendre-activite",
            title: "Lire un mini-dialogue",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m03-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le dialogue, puis réponds.",
                text:
                  "— Tu viens d'où, Yuki ?\n" +
                  "— Je viens du Japon. Et toi ?\n" +
                  "— Moi, je suis espagnol, je viens de Madrid. Tu parles anglais ?\n" +
                  "— Oui, un peu, et je parle japonais couramment bien sûr !",
                questions: [
                  {
                    kind: "qcm",
                    id: "m03-e1-q1",
                    prompt: "D'où vient Yuki ?",
                    choices: [
                      { id: "a", text: "D'Espagne" },
                      { id: "b", text: "Du Japon" },
                      { id: "c", text: "De Madrid" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Du Japon",
                      explanation: "Elle dit « je viens du Japon ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "m03-e1-q2",
                    prompt: "Vrai ou faux : Carlos parle très bien anglais.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux, ce n'est pas précisé pour lui.",
                      explanation: "C'est Yuki qui dit parler « un peu » anglais ; Carlos ne parle pas de son propre niveau d'anglais.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "m03-e1-q3",
                    prompt: "Quelle langue Yuki parle couramment ?",
                    choices: [
                      { id: "a", text: "L'anglais" },
                      { id: "b", text: "L'espagnol" },
                      { id: "c", text: "Le japonais" },
                    ],
                    correctChoiceId: "c",
                    correction: {
                      correctAnswer: "Le japonais",
                      explanation: "Elle dit « je parle japonais couramment bien sûr ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nationalites-et-langues-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "nationalites-et-langues-entrainement-activite",
            title: "Nationalités et langues",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m03-g1",
                type: "qcm",
                skillId: "a1-gr-verbes-irreguliers",
                difficulty: "A1",
                instructions: "Choisis la bonne forme du verbe venir.",
                question: {
                  kind: "qcm",
                  id: "m03-g1-q",
                  prompt: "Nous ___ de France.",
                  choices: [
                    { id: "a", text: "venons" },
                    { id: "b", text: "viens" },
                    { id: "c", text: "viennent" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "venons",
                    explanation: "Avec « nous », on utilise « venons ».",
                  },
                },
              },
              {
                id: "m03-g2",
                type: "texte_a_trous",
                skillId: "a1-voc-identite",
                difficulty: "A1",
                instructions: "Accorde l'adjectif de nationalité au féminin si besoin.",
                textWithBlanks:
                  "Carlos est {{1}} (espagnol). Yuki est {{2}} (japonais). Sarah est {{3}} (anglais).",
                blanks: [
                  { id: "1", answer: "espagnol" },
                  { id: "2", answer: "japonaise" },
                  { id: "3", answer: "anglaise" },
                ],
                correction: {
                  correctAnswer: "espagnol — japonaise — anglaise",
                  explanation: "Carlos est un homme (pas d'accord au féminin) ; Yuki et Sarah sont des femmes, donc l'adjectif prend un -e.",
                },
              },
              {
                id: "m03-g3",
                type: "association",
                skillId: "a1-voc-identite",
                difficulty: "A1",
                instructions: "Associe le pays à la nationalité.",
                pairs: [
                  { id: "1", left: "le Japon", right: "japonais(e)" },
                  { id: "2", left: "l'Espagne", right: "espagnol(e)" },
                  { id: "3", left: "l'Angleterre", right: "anglais(e)" },
                ],
                correction: {
                  correctAnswer: "1 → japonais(e) ; 2 → espagnol(e) ; 3 → anglais(e)",
                  explanation: "Chaque pays a un adjectif de nationalité qui lui correspond.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "nationalites-et-langues-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "nationalites-et-langues-ecriture-activite",
            title: "Se présenter : pays et langues",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m03-h",
                type: "production_ecrite",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne: "Écris 3 phrases : ta nationalité, d'où tu viens, et une langue que tu parles.",
                minWords: 12,
                maxWords: 35,
                correctionCriteria: [
                  "La nationalité est donnée et accordée correctement (/1)",
                  "L'origine est donnée avec « venir de » (/1)",
                  "Au moins une langue est mentionnée (/1)",
                  "Phrases simples et compréhensibles (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "nationalites-et-langues-ecriture-activite-orale",
            title: "Se présenter à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m03-h-oral",
                type: "production_orale",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Dis d'où tu viens, ta nationalité, et une langue que tu parles.",
                prepSeconds: 25,
                maxSpeakSeconds: 30,
                selfAssessmentCriteria: [
                  "J'ai dit ma nationalité.",
                  "J'ai dit d'où je viens.",
                  "J'ai mentionné une langue.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "nationalites-et-langues-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "nationalites-et-langues-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m03-i1",
                type: "qcm",
                skillId: "a1-gr-verbes-irreguliers",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "m03-i1-q",
                  prompt: "Elle ___ du Japon.",
                  choices: [
                    { id: "a", text: "vient" },
                    { id: "b", text: "viens" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "vient",
                    explanation: "Avec « il/elle », on utilise « vient ».",
                  },
                },
              },
              {
                id: "m03-i2",
                type: "reponse_courte",
                skillId: "a1-voc-identite",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Écris l'adjectif « anglais » au féminin.",
                acceptedAnswers: ["anglaise"],
                correction: {
                  correctAnswer: "anglaise",
                  explanation: "Au féminin, « anglais » devient « anglaise ».",
                },
              },
              {
                id: "m03-i3",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 3. D'après le dialogue de ce module.",
                statement: "Carlos vient de Madrid.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "Il dit « je viens de Madrid ».",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a1-ma-famille",
    slug: "ma-famille",
    level: "A1",
    title: "Ma famille",
    description: "À la fin de ce module, tu peux présenter ta famille et utiliser les possessifs simples.",
    objectives: [
      "Nommer les membres de sa famille",
      "Utiliser les adjectifs possessifs (mon, ma, mes...)",
      "Présenter quelqu'un",
    ],
    domain: "vocabulaire",
    stageId: "a1-decouverte",
    estimatedMinutes: 20,
    situation: "Léo montre une photo de famille à sa nouvelle collègue, Fatou, pendant la pause.",
    vocabulary: [
      { term: "une famille", category: "principal" },
      { term: "un père / une mère", category: "principal" },
      { term: "un frère / une sœur", category: "principal" },
      { term: "un fils / une fille", category: "principal" },
      { term: "un mari / une femme", category: "principal" },
      { term: "un grand-père / une grand-mère", category: "principal" },
      { term: "un enfant / des enfants", category: "principal" },
      { term: "mon, ma, mes", category: "principal" },
      { term: "ton, ta, tes", category: "principal" },
      { term: "son, sa, ses", category: "principal" },
      { term: "voici / voilà", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Les adjectifs possessifs",
        explanation:
          "mon père, ma mère, mes parents ; ton frère, ta sœur, tes frères et sœurs ; son mari, sa femme, ses enfants. On choisit selon le genre et le nombre du nom, pas selon la personne qui parle : ma sœur (féminin singulier), mes sœurs (pluriel).",
      },
      {
        title: "Voici / voilà pour présenter",
        explanation: "Voici et voilà servent à présenter ou montrer quelqu'un ou quelque chose : Voici ma sœur, Léa.",
      },
    ],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "ma-famille-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "ma-famille-comprendre-activite",
            title: "Lire une présentation de famille",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "m04-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le texte, puis réponds.",
                text:
                  "Voici ma famille. Mon père s'appelle Robert et ma mère s'appelle Claire. J'ai une sœur, Léa, " +
                  "et un frère, Tom. Mon mari s'appelle Karim et nous avons deux enfants : un fils, Nino, et " +
                  "une fille, Maya.",
                questions: [
                  {
                    kind: "qcm",
                    id: "m04-e1-q1",
                    prompt: "Comment s'appelle le frère ?",
                    choices: [
                      { id: "a", text: "Nino" },
                      { id: "b", text: "Karim" },
                      { id: "c", text: "Tom" },
                    ],
                    correctChoiceId: "c",
                    correction: {
                      correctAnswer: "Tom",
                      explanation: "Le texte dit « un frère, Tom ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "m04-e1-q2",
                    prompt: "Vrai ou faux : la personne a deux enfants.",
                    correctAnswer: true,
                    correction: {
                      correctAnswer: "Vrai.",
                      explanation: "« nous avons deux enfants ».",
                    },
                  },
                  {
                    kind: "libre",
                    id: "m04-e1-q3",
                    prompt: "Comment s'appelle le mari de la personne ?",
                    expectedAnswer: "Karim",
                    correction: {
                      correctAnswer: "Karim",
                      explanation: "« Mon mari s'appelle Karim. »",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ma-famille-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "ma-famille-ecoute-activite",
            title: "Écouter une présentation de famille",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "m04-f1",
                type: "comprehension_orale",
                skillId: "a1-co-dialogues-quotidiens",
                difficulty: "A1",
                instructions: "Écoute, puis réponds à la question.",
                audioSrc: "/audio/a1/ma-famille/m04-f1.mp3",
                transcript: "Voici ma sœur, elle s'appelle Léa, et voilà mon frère, Tom. Nos parents s'appellent Robert et Claire.",
                questions: [
                  {
                    kind: "qcm",
                    id: "m04-f1-q1",
                    prompt: "Qui est Léa ?",
                    choices: [
                      { id: "a", text: "La mère" },
                      { id: "b", text: "La sœur" },
                      { id: "c", text: "La fille" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "La sœur",
                      explanation: "« Voici ma sœur, elle s'appelle Léa. »",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ma-famille-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "ma-famille-entrainement-activite",
            title: "Les possessifs et la famille",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m04-g1",
                type: "qcm",
                skillId: "a1-gr-possessifs",
                difficulty: "A1",
                instructions: "Choisis le bon possessif.",
                question: {
                  kind: "qcm",
                  id: "m04-g1-q",
                  prompt: "___ sœur s'appelle Léa. (à toi)",
                  choices: [
                    { id: "a", text: "Ma" },
                    { id: "b", text: "Mon" },
                    { id: "c", text: "Mes" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Ma",
                    explanation: "« Sœur » est féminin singulier : ma sœur.",
                  },
                },
              },
              {
                id: "m04-g2",
                type: "texte_a_trous",
                skillId: "a1-gr-possessifs",
                difficulty: "A1",
                instructions: "Complète avec mon, ma, mes, son, sa ou ses.",
                textWithBlanks:
                  "J'ai deux frères : {{1}} frères s'appellent Tom et Nino. Fatou présente {{2}} mari et {{3}} enfants.",
                blanks: [
                  { id: "1", answer: "mes" },
                  { id: "2", answer: "son" },
                  { id: "3", answer: "ses" },
                ],
                correction: {
                  correctAnswer: "mes — son — ses",
                  explanation: "« frères » est au pluriel (mes) ; « mari » est masculin singulier (son) ; « enfants » est au pluriel (ses).",
                },
              },
              {
                id: "m04-g3",
                type: "association",
                skillId: "a1-voc-famille",
                difficulty: "A1",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "un grand-père", right: "le père de mon père ou de ma mère" },
                  { id: "2", left: "une sœur", right: "une fille qui a les mêmes parents que moi" },
                  { id: "3", left: "un fils", right: "un enfant garçon" },
                ],
                correction: {
                  correctAnswer: "1 → le père de mon père/ma mère ; 2 → même parents ; 3 → enfant garçon",
                  explanation: "Chaque mot de famille correspond à un lien précis.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "ma-famille-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "ma-famille-ecriture-activite",
            title: "Présenter sa famille",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "m04-h",
                type: "production_ecrite",
                skillId: "a1-pe-decrire",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne: "Présente ta famille en 3 ou 4 phrases : qui sont les membres, leur nom.",
                minWords: 15,
                maxWords: 40,
                correctionCriteria: [
                  "Au moins 2 membres de la famille nommés (/2)",
                  "Les possessifs sont bien utilisés (/1)",
                  "Phrases simples et compréhensibles (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "ma-famille-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "ma-famille-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "m04-i1",
                type: "qcm",
                skillId: "a1-gr-possessifs",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "m04-i1-q",
                  prompt: "___ parents habitent à Lyon. (à toi, pluriel)",
                  choices: [
                    { id: "a", text: "Mes" },
                    { id: "b", text: "Ma" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Mes",
                    explanation: "« Parents » est pluriel : mes parents.",
                  },
                },
              },
              {
                id: "m04-i2",
                type: "reponse_courte",
                skillId: "a1-voc-famille",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Comment appelle-t-on le père de son père ou de sa mère ?",
                acceptedAnswers: ["un grand-père", "grand-père", "le grand-père"],
                correction: {
                  correctAnswer: "un grand-père",
                  explanation: "Le père du père ou de la mère s'appelle « un grand-père ».",
                },
              },
              {
                id: "m04-i3",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 3. D'après le texte de ce module.",
                statement: "La personne a un fils et une fille.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« un fils, Nino, et une fille, Maya ».",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
