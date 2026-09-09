import type { Module } from "@/lib/pedagogy/types";

/**
 * Modules A2 — Phase Début (« Se présenter et s'installer »), 8 modules.
 * Catalogue isolé du B1 (`lib/pedagogy/data/modules.ts`), voir
 * `docs/integration/a2-content.md`. Contenu 100% original, aucun sujet
 * DELF/TCF reproduit. Tutoiement systématique (cohérence avec le reste du
 * produit — voir `docs/b1/pedagogical-audit-2026.md` §13).
 */
export const MODULES_A2_PART1: Module[] = [
  {
    id: "a2-se-presenter-en-detail",
    slug: "se-presenter-en-detail",
    level: "A2",
    title: "Se présenter en détail",
    description:
      "À la fin de ce module, tu pourras te présenter en donnant ton origine, ta situation actuelle et depuis combien de temps tu es là où tu es.",
    objectives: [
      "Donner des informations détaillées sur soi (origine, situation, durée)",
      "Utiliser depuis et il y a pour situer une information dans le temps",
      "Comprendre la présentation de quelqu'un d'autre",
    ],
    domain: "grammaire",
    stageId: "a2-debut",
    estimatedMinutes: 22,
    situation:
      "Nadia participe pour la première fois à une rencontre du « Café des langues », une association de " +
      "quartier. Hugo, qui anime la rencontre, l'invite à se présenter au groupe.",
    vocabulary: [
      { term: "un parcours", category: "principal" },
      { term: "être originaire de", category: "expression" },
      { term: "venir de", category: "verbe" },
      { term: "s'installer", category: "verbe" },
      { term: "une association", category: "principal" },
      { term: "un quartier", category: "principal" },
      { term: "actuellement", category: "principal" },
      { term: "un métier", category: "principal" },
      { term: "célibataire", category: "principal" },
      { term: "marié(e)", category: "principal" },
      { term: "depuis", category: "connecteur" },
      { term: "il y a", category: "connecteur" },
      { term: "se sentir bien", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Le présent des verbes fréquents pour se présenter",
        explanation:
          "être, avoir, s'appeler, habiter, venir, aimer : ces verbes reviennent presque à chaque présentation. Attention aux formes irrégulières : je viens, tu viens, il/elle vient, nous venons, vous venez, ils/elles viennent.",
      },
      {
        title: "Depuis / il y a pour situer dans le temps",
        explanation:
          "« Depuis » précise le point de départ d'une situation qui continue : j'habite ici depuis deux ans (= et j'y habite toujours). « Il y a » précise le moment où une action passée a eu lieu : je suis arrivé il y a deux ans.",
      },
    ],
    examLinks: ["DELF A2 — production orale (entretien dirigé)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "sped-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "sped-comprendre-activite",
            title: "Lire un message de présentation",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "sped-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez le message que Nadia poste dans le groupe WhatsApp de l'association, puis répondez.",
                text:
                  "Bonjour à tous ! Je m'appelle Nadia, je suis originaire d'Algérie. Je suis arrivée en France " +
                  "il y a trois ans, pour rejoindre mon mari qui travaillait déjà ici. J'habite dans le quartier " +
                  "depuis six mois seulement, avant j'étais à Marseille. Actuellement, je travaille comme " +
                  "assistante dentaire et je suis des cours de français le soir. Je suis mariée et j'ai une " +
                  "petite fille de 4 ans. J'aime beaucoup la cuisine et je cherche des amis pour pratiquer mon " +
                  "français. À bientôt !",
                questions: [
                  {
                    kind: "qcm",
                    id: "sped-e-q1",
                    prompt: "D'où Nadia est-elle originaire ?",
                    choices: [
                      { id: "a", text: "Du Maroc" },
                      { id: "b", text: "D'Algérie" },
                      { id: "c", text: "De Tunisie" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "D'Algérie",
                      explanation: "Elle le dit directement : « je suis originaire d'Algérie ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "sped-e-q2",
                    prompt: "Vrai ou faux : Nadia habite dans ce quartier depuis trois ans.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation:
                        "Elle est arrivée en France il y a trois ans, mais elle habite ce quartier depuis six mois seulement (avant, elle était à Marseille).",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "sped-e-q3",
                    prompt: "Que fait Nadia actuellement ?",
                    choices: [
                      { id: "a", text: "Elle est étudiante à temps plein." },
                      { id: "b", text: "Elle travaille et suit des cours de français." },
                      { id: "c", text: "Elle cherche un premier emploi." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Elle travaille et suit des cours de français.",
                      explanation: "« je travaille comme assistante dentaire et je suis des cours de français le soir »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "sped-e-q4",
                    prompt: "Pourquoi Nadia est-elle venue en France ?",
                    expectedAnswer: "Pour rejoindre son mari qui y travaillait déjà.",
                    correction: {
                      correctAnswer: "Pour rejoindre son mari.",
                      explanation: "« pour rejoindre mon mari qui travaillait déjà ici »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sped-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "sped-entrainement-activite",
            title: "Se présenter avec depuis et il y a",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "sped-g1",
                type: "qcm",
                skillId: "a2-gr-expressions-temporelles",
                difficulty: "A2",
                instructions: "Choisis le mot correct.",
                question: {
                  kind: "qcm",
                  id: "sped-g1-q",
                  prompt: "« J'habite à Lyon ___ deux ans. » (= et j'y habite toujours)",
                  choices: [
                    { id: "a", text: "depuis" },
                    { id: "b", text: "il y a" },
                    { id: "c", text: "pendant" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "depuis",
                    explanation: "« Depuis » indique le point de départ d'une situation qui continue aujourd'hui.",
                    rappelRegle: "depuis + durée = la situation continue ; il y a + durée = l'action est terminée.",
                  },
                },
              },
              {
                id: "sped-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-present-verbes-frequents",
                difficulty: "A2",
                instructions: "Complète avec le verbe entre parenthèses, conjugué au présent.",
                textWithBlanks:
                  "Je m'appelle Farid. Je {{1}} (venir) du Sénégal. Je {{2}} (habiter) à Toulouse depuis un an. " +
                  "Mon frère et moi, nous {{3}} (avoir) un petit appartement près du centre-ville.",
                blanks: [
                  { id: "1", answer: "viens" },
                  { id: "2", answer: "habite" },
                  { id: "3", answer: "avons" },
                ],
                correction: {
                  correctAnswer: "viens — habite — avons",
                  explanation: "« venir » et « avoir » sont irréguliers au présent : je viens, nous avons.",
                },
              },
              {
                id: "sped-g3",
                type: "association",
                skillId: "a2-voc-identite",
                difficulty: "A2",
                instructions: "Associe chaque question à la réponse logique.",
                pairs: [
                  { id: "1", left: "Tu es originaire d'où ?", right: "Je suis originaire du Portugal." },
                  { id: "2", left: "Depuis quand tu es en France ?", right: "Depuis deux ans." },
                  { id: "3", left: "Tu es marié ou célibataire ?", right: "Je suis célibataire." },
                ],
                correction: {
                  correctAnswer: "1 → Portugal ; 2 → deux ans ; 3 → célibataire.",
                  explanation: "Chaque question porte sur une information différente : l'origine, la durée, la situation familiale.",
                },
              },
              {
                id: "sped-g4",
                type: "vrai_faux",
                skillId: "a2-gr-expressions-temporelles",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Il y a trois ans » et « depuis trois ans » veulent dire exactement la même chose.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation:
                    "« Il y a trois ans » situe un moment précis dans le passé (l'action peut être finie). « Depuis trois ans » dit qu'une situation continue encore aujourd'hui.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "sped-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "sped-ecriture-activite",
            title: "Se présenter par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "sped-h",
                type: "production_ecrite",
                skillId: "a2-pe-se-presenter",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu rejoins un groupe de conversation en français. Présente-toi : ton origine, depuis quand tu es " +
                  "dans ta ville actuelle, ce que tu fais (travail ou études) et un détail sur ta situation personnelle.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Origine mentionnée (/2)",
                  "Une durée exprimée avec depuis ou il y a (/2)",
                  "Activité actuelle mentionnée (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "sped-ecriture-activite-orale",
            title: "Se présenter à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "sped-h-oral",
                type: "production_orale",
                skillId: "a2-pe-se-presenter",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Comme Nadia, présente-toi à voix haute devant un nouveau groupe : ton origine, depuis quand tu es " +
                  "là où tu habites, et ce que tu fais actuellement.",
                context: "Même situation que Nadia au Café des langues, mais c'est toi qui te présentes.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai dit mon origine.",
                  "J'ai utilisé depuis ou il y a pour donner une durée.",
                  "J'ai parlé de mon activité actuelle.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Reprends la structure du message de Nadia : origine, durée, situation actuelle.",
              },
            ],
          },
        ],
      },
      {
        id: "sped-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "sped-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "sped-i1",
                type: "qcm",
                skillId: "a2-gr-expressions-temporelles",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "sped-i1-q",
                  prompt: "« Je suis arrivé ___ deux ans » (moment précis dans le passé) :",
                  choices: [
                    { id: "a", text: "il y a" },
                    { id: "b", text: "depuis" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "il y a",
                    explanation: "« Il y a » situe un moment précis, ici l'arrivée elle-même.",
                  },
                },
              },
              {
                id: "sped-i2",
                type: "reponse_courte",
                skillId: "a2-voc-identite",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel verbe utiliser pour dire d'où on vient : « je ___ du Portugal » ?",
                acceptedAnswers: ["viens", "je viens"],
                correction: {
                  correctAnswer: "viens",
                  explanation: "« Venir de » indique l'origine géographique.",
                },
              },
              {
                id: "sped-i3",
                type: "vrai_faux",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message de Nadia.",
                statement: "Nadia a une fille.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« j'ai une petite fille de 4 ans »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-parler-de-sa-famille",
    slug: "parler-de-sa-famille",
    level: "A2",
    title: "Parler de sa famille et de ses relations",
    description:
      "À la fin de ce module, tu pourras décrire ta famille et parler de tes relations avec quelques détails.",
    objectives: [
      "Présenter les membres de sa famille",
      "Utiliser les adjectifs possessifs",
      "Décrire une relation avec un verbe pronominal",
    ],
    domain: "vocabulaire",
    stageId: "a2-debut",
    estimatedMinutes: 20,
    situation:
      "Léo montre une photo de famille prise pendant les vacances à sa voisine française, Camille, qui lui " +
      "pose des questions curieuses.",
    vocabulary: [
      { term: "un frère / une sœur", category: "principal" },
      { term: "des parents", category: "principal" },
      { term: "un grand-père / une grand-mère", category: "principal" },
      { term: "un(e) cousin(e)", category: "principal" },
      { term: "un neveu / une nièce", category: "principal" },
      { term: "se marier", category: "verbe" },
      { term: "divorcer", category: "verbe" },
      { term: "s'entendre bien (avec)", category: "expression" },
      { term: "se disputer", category: "verbe" },
      { term: "enfant unique", category: "expression" },
      { term: "aîné(e) / cadet(te)", category: "principal" },
      { term: "ressembler à", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Les adjectifs possessifs",
        explanation:
          "mon/ma/mes, ton/ta/tes, son/sa/ses s'accordent avec la chose possédée, pas avec la personne qui possède : mon frère, ma sœur, mes parents. Devant une voyelle, « ma » et « ta » deviennent « mon » et « ton » : mon amie (même si c'est une femme).",
      },
      {
        title: "Les verbes pronominaux pour parler des relations",
        explanation:
          "s'entendre bien, se disputer, se marier se conjuguent avec un pronom réfléchi qui s'accorde avec le sujet : je m'entends bien avec ma sœur, ils se disputent souvent, elle s'est mariée l'année dernière.",
      },
    ],
    examLinks: ["DELF A2 — compréhension des écrits", "DELF A2 — production orale (entretien dirigé)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "fam-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "fam-comprendre-activite",
            title: "Lire un message sur la famille",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "fam-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez le message que Léo envoie à Camille après leur conversation, puis répondez.",
                text:
                  "Salut Camille ! Comme promis, voici une photo de ma famille. Sur la photo, il y a mes " +
                  "parents, ma sœur Inès et mon petit frère Adam. Inès est mon aînée, elle a 30 ans, et Adam " +
                  "est le cadet, il a seulement 12 ans. Moi, je m'entends très bien avec Inès, on se " +
                  "ressemble beaucoup, mais avec Adam, on se dispute parfois parce qu'il touche à mes " +
                  "affaires ! Mes grands-parents n'étaient pas sur la photo, ils habitent encore au Portugal. " +
                  "À bientôt, Léo",
                questions: [
                  {
                    kind: "qcm",
                    id: "fam-e-q1",
                    prompt: "Combien de frères et sœurs Léo a-t-il ?",
                    choices: [
                      { id: "a", text: "Un seul." },
                      { id: "b", text: "Deux." },
                      { id: "c", text: "Trois." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Deux.",
                      explanation: "Il mentionne « ma sœur Inès et mon petit frère Adam » : deux au total.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "fam-e-q2",
                    prompt: "Vrai ou faux : Léo ne s'entend pas bien avec Inès.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Il écrit « je m'entends très bien avec Inès » — c'est avec Adam qu'il se dispute parfois.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "fam-e-q3",
                    prompt: "Où habitent les grands-parents de Léo ?",
                    choices: [
                      { id: "a", text: "En France, avec Léo." },
                      { id: "b", text: "Au Portugal." },
                      { id: "c", text: "On ne sait pas." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Au Portugal.",
                      explanation: "« ils habitent encore au Portugal »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "fam-e-q4",
                    prompt: "Pourquoi Léo et Adam se disputent-ils parfois ?",
                    expectedAnswer: "Parce qu'Adam touche aux affaires de Léo.",
                    correction: {
                      correctAnswer: "Parce qu'Adam touche à ses affaires.",
                      explanation: "« on se dispute parfois parce qu'il touche à mes affaires »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "fam-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "fam-entrainement-activite",
            title: "Possessifs et verbes pronominaux",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "fam-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-possessifs",
                difficulty: "A2",
                instructions: "Complète avec l'adjectif possessif correct.",
                textWithBlanks:
                  "Voici {{1}} (mon/ma) famille : {{2}} (mon/ma) père s'appelle Marc, et {{3}} (mon/mes) " +
                  "parents habitent à Nice.",
                blanks: [
                  { id: "1", answer: "ma" },
                  { id: "2", answer: "mon" },
                  { id: "3", answer: "mes" },
                ],
                correction: {
                  correctAnswer: "ma — mon — mes",
                  explanation: "« famille » est féminin singulier (ma), « père » masculin singulier (mon), « parents » pluriel (mes).",
                },
              },
              {
                id: "fam-g2",
                type: "qcm",
                skillId: "a2-gr-pronominaux",
                difficulty: "A2",
                instructions: "Choisis la forme correcte.",
                question: {
                  kind: "qcm",
                  id: "fam-g2-q",
                  prompt: "« Mes parents ___ très bien depuis 30 ans. »",
                  choices: [
                    { id: "a", text: "s'entendent" },
                    { id: "b", text: "entendent" },
                    { id: "c", text: "s'entend" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "s'entendent",
                    explanation: "« s'entendre bien » est pronominal : le pronom réfléchi « se » s'accorde avec le sujet pluriel « mes parents ».",
                    rappelRegle: "Verbe pronominal = pronom réfléchi (me/te/se/nous/vous/se) + verbe, tous deux accordés au sujet.",
                  },
                },
              },
              {
                id: "fam-g3",
                type: "association",
                skillId: "a2-voc-famille",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "un aîné", right: "le plus âgé des enfants" },
                  { id: "2", left: "un cadet", right: "le plus jeune des enfants" },
                  { id: "3", left: "un enfant unique", right: "qui n'a ni frère ni sœur" },
                ],
                correction: {
                  correctAnswer: "1 → le plus âgé ; 2 → le plus jeune ; 3 → sans frère ni sœur.",
                  explanation: "Ces trois mots décrivent la place d'un enfant dans la fratrie.",
                },
              },
              {
                id: "fam-g4",
                type: "vrai_faux",
                skillId: "a2-gr-possessifs",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "On dit « ma amie » et non « mon amie ».",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Devant une voyelle, « ma » devient « mon » pour faciliter la prononciation : mon amie, mon école.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "fam-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "fam-ecriture-activite",
            title: "Décrire sa famille par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "fam-h",
                type: "production_ecrite",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Décris ta famille à un(e) ami(e) français(e) : combien de frères et sœurs tu as, leur âge, " +
                  "et avec qui tu t'entends particulièrement bien.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Au moins deux membres de la famille présentés (/2)",
                  "Un adjectif possessif utilisé correctement (/1)",
                  "Une relation décrite (s'entendre bien, se disputer...) (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "fam-ecriture-activite-orale",
            title: "Décrire sa famille à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "fam-h-oral",
                type: "production_orale",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Comme Léo, présente ta famille à voix haute : qui sont les membres de ta famille et avec " +
                  "qui tu t'entends bien.",
                context: "Imagine que tu montres une photo de famille à un(e) ami(e), comme Léo avec Camille.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai présenté au moins deux membres de ma famille.",
                  "J'ai utilisé un adjectif possessif correct.",
                  "J'ai décrit une relation (s'entendre bien, se disputer...).",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Pas besoin de parler de toute la famille : deux ou trois personnes bien décrites valent mieux qu'une longue liste.",
              },
            ],
          },
        ],
      },
      {
        id: "fam-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "fam-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "fam-i1",
                type: "qcm",
                skillId: "a2-gr-possessifs",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "fam-i1-q",
                  prompt: "« Voici ___ frère. » (à toi)",
                  choices: [
                    { id: "a", text: "mon" },
                    { id: "b", text: "ma" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "mon",
                    explanation: "« frère » est masculin singulier.",
                  },
                },
              },
              {
                id: "fam-i2",
                type: "reponse_courte",
                skillId: "a2-voc-famille",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Comment appelle-t-on un enfant qui n'a ni frère ni sœur ?",
                acceptedAnswers: ["enfant unique", "un enfant unique"],
                correction: {
                  correctAnswer: "un enfant unique",
                  explanation: "C'est l'expression consacrée en français.",
                },
              },
              {
                id: "fam-i3",
                type: "vrai_faux",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message de Léo.",
                statement: "Adam est plus âgé qu'Inès.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Inès a 30 ans et est l'aînée ; Adam a 12 ans et est le cadet.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-decrire-son-quotidien",
    slug: "decrire-son-quotidien",
    level: "A2",
    title: "Décrire son quotidien",
    description:
      "À la fin de ce module, tu pourras décrire ta routine et l'organisation de ton quotidien.",
    objectives: [
      "Décrire une routine avec des adverbes de fréquence",
      "Utiliser les verbes pronominaux de la routine",
      "Comprendre un dialogue sur l'organisation des tâches",
    ],
    domain: "vocabulaire",
    stageId: "a2-debut",
    estimatedMinutes: 24,
    situation:
      "Fatou et sa colocataire discutent un dimanche soir pour organiser les tâches ménagères de la semaine.",
    vocabulary: [
      { term: "se lever", category: "verbe" },
      { term: "se coucher", category: "verbe" },
      { term: "faire le ménage", category: "expression" },
      { term: "faire la vaisselle", category: "expression" },
      { term: "passer l'aspirateur", category: "expression" },
      { term: "sortir les poubelles", category: "expression" },
      { term: "une tâche", category: "principal" },
      { term: "chacun son tour", category: "expression" },
      { term: "tous les jours", category: "connecteur" },
      { term: "une fois par semaine", category: "connecteur" },
      { term: "jamais", category: "connecteur" },
      { term: "toujours", category: "connecteur" },
      { term: "se reposer", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Les adverbes de fréquence",
        explanation:
          "toujours, souvent, parfois, rarement, jamais se placent en général juste après le verbe conjugué : je fais toujours la vaisselle, elle ne fait jamais le ménage. « Jamais » s'utilise avec « ne » : je ne sors jamais les poubelles.",
      },
      {
        title: "Les verbes pronominaux de la routine",
        explanation:
          "se lever, se coucher, se reposer décrivent des actions qu'on fait sur soi-même. Au présent : je me lève, tu te lèves, il/elle se lève, nous nous levons, vous vous levez, ils/elles se lèvent.",
      },
    ],
    examLinks: ["DELF A2 — compréhension de l'oral"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "quot-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "quot-ecoute-activite",
            title: "Écouter Léa et Nora un matin",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "quot-o",
                type: "comprehension_orale",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Écoutez Léa et Nora parler de leur matinée, puis répondez.",
                audioSrc: "/audio/a2/a2-quotidien-routine-matin.m4a",
                transcript:
                  "Léa : Salut Nora, tu te lèves tôt aujourd'hui !\nNora : Oui, je commence le travail à huit heures et demie. Je prends le bus de huit heures.\nLéa : Ah oui, c'est vrai. Moi, je travaille à dix heures aujourd'hui, alors je reste encore un peu au lit.\nNora : Tu as de la chance ! Bon, je prends mon petit-déjeuner et je pars. À ce soir !\nLéa : À ce soir, bonne journée !",
                questions: [
                  {
                    kind: "qcm",
                    id: "quot-o-q1",
                    prompt: "À quelle heure Nora prend-elle le bus ?",
                    choices: [
                      { id: "a", text: "Sept heures" },
                      { id: "b", text: "Huit heures" },
                      { id: "c", text: "Huit heures et demie" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Huit heures",
                      explanation: "Nora dit : « je prends le bus de huit heures », avant de commencer à huit heures et demie.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "quot-o-q2",
                    prompt: "Léa travaille avant Nora aujourd'hui.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Léa travaille à dix heures, donc après Nora qui commence à huit heures et demie.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "quot-o-q3",
                    prompt: "Pourquoi Léa reste-t-elle encore au lit ?",
                    choices: [
                      { id: "a", text: "Elle est malade." },
                      { id: "b", text: "Elle travaille plus tard." },
                      { id: "c", text: "Elle ne travaille pas aujourd'hui." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Elle travaille plus tard.",
                      explanation: "Elle explique qu'elle travaille à dix heures seulement, donc elle a le temps.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "quot-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "quot-entrainement-activite",
            title: "Fréquence et routine",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "quot-g1",
                type: "qcm",
                skillId: "a2-gr-pronominaux",
                difficulty: "A2",
                instructions: "Choisis la forme correcte.",
                question: {
                  kind: "qcm",
                  id: "quot-g1-q",
                  prompt: "« Le dimanche, nous ___ tard. »",
                  choices: [
                    { id: "a", text: "nous levons" },
                    { id: "b", text: "levons" },
                    { id: "c", text: "vous levez" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "nous levons",
                    explanation: "« se lever » est pronominal : le pronom « nous » (réfléchi) doit accompagner le verbe conjugué avec « nous ».",
                  },
                },
              },
              {
                id: "quot-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-adverbes-frequence",
                difficulty: "A2",
                instructions: "Complète avec l'adverbe de fréquence qui convient : toujours, jamais, une fois par semaine.",
                textWithBlanks:
                  "Je fais {{1}} le ménage le samedi (chaque semaine, sans exception). Je ne sors {{2}} les " +
                  "poubelles le matin (ça n'arrive jamais). Je passe l'aspirateur {{3}}, le dimanche.",
                blanks: [
                  { id: "1", answer: "toujours" },
                  { id: "2", answer: "jamais" },
                  { id: "3", answer: "une fois par semaine" },
                ],
                correction: {
                  correctAnswer: "toujours — jamais — une fois par semaine",
                  explanation: "« toujours » = sans exception, « jamais » = zéro fois, « une fois par semaine » = fréquence précise.",
                },
              },
              {
                id: "quot-g3",
                type: "remise_en_ordre",
                skillId: "a2-voc-quotidien",
                difficulty: "A2",
                instructions: "Remets la journée de Fatou dans l'ordre logique.",
                items: [
                  { id: "1", text: "Elle se lève à 7h." },
                  { id: "2", text: "Elle prend son petit-déjeuner." },
                  { id: "3", text: "Elle fait la vaisselle du soir." },
                  { id: "4", text: "Elle se couche à 23h." },
                ],
                correctOrder: ["1", "2", "3", "4"],
                correction: {
                  correctAnswer: "1 → 2 → 3 → 4",
                  explanation: "Une journée type commence par le lever et se termine par le coucher, avec la vaisselle du soir entre les deux.",
                },
              },
              {
                id: "quot-g4",
                type: "association",
                skillId: "a2-voc-quotidien",
                difficulty: "A2",
                instructions: "Associe chaque tâche à son moment logique.",
                pairs: [
                  { id: "1", left: "sortir les poubelles", right: "une fois par semaine" },
                  { id: "2", left: "faire la vaisselle", right: "tous les jours" },
                  { id: "3", left: "se reposer", right: "le week-end" },
                ],
                correction: {
                  correctAnswer: "1 → une fois par semaine ; 2 → tous les jours ; 3 → le week-end.",
                  explanation: "Chaque tâche a une fréquence réaliste différente dans une routine partagée.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "quot-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "quot-ecriture-activite",
            title: "Décrire sa routine par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "quot-h",
                type: "production_ecrite",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Décris ta routine de la semaine à un(e) ami(e) : à quelle heure tu te lèves et te couches, " +
                  "et comment tu organises les tâches ménagères chez toi.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Heures de lever/coucher mentionnées (/2)",
                  "Au moins deux tâches ménagères mentionnées (/1)",
                  "Un adverbe de fréquence utilisé (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "quot-ecriture-activite-orale",
            title: "Décrire sa routine à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "quot-h-oral",
                type: "production_orale",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Comme Fatou et Léna, explique à voix haute comment tu organises les tâches ménagères chez toi.",
                context: "Imagine que tu discutes avec un(e) colocataire de l'organisation de la semaine.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai mentionné au moins deux tâches ménagères.",
                  "J'ai utilisé un adverbe de fréquence.",
                  "J'ai utilisé un verbe pronominal de la routine.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Reprends la structure du dialogue : qui fait quoi, et à quelle fréquence.",
              },
            ],
          },
        ],
      },
      {
        id: "quot-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "quot-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "quot-i1",
                type: "qcm",
                skillId: "a2-gr-pronominaux",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "quot-i1-q",
                  prompt: "« Elle ___ à 7h tous les jours. »",
                  choices: [
                    { id: "a", text: "se lève" },
                    { id: "b", text: "lève" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "se lève",
                    explanation: "« se lever » est pronominal : le pronom « se » est obligatoire.",
                  },
                },
              },
              {
                id: "quot-i2",
                type: "reponse_courte",
                skillId: "a2-gr-adverbes-frequence",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel adverbe signifie « zéro fois » ?",
                acceptedAnswers: ["jamais", "ne jamais"],
                correction: {
                  correctAnswer: "jamais",
                  explanation: "« Jamais » exprime une fréquence nulle.",
                },
              },
              {
                id: "quot-i3",
                type: "vrai_faux",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Item 3. D'après le dialogue.",
                statement: "Fatou et Léna sortent les poubelles tous les jours.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Elles sortent les poubelles une fois par semaine, le dimanche.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-chercher-un-logement",
    slug: "chercher-un-logement-a2",
    level: "A2",
    title: "Chercher un logement",
    description:
      "À la fin de ce module, tu pourras comprendre une annonce immobilière et comparer deux logements.",
    objectives: [
      "Comprendre une petite annonce immobilière",
      "Comparer deux logements",
      "Décrire le logement que tu recherches",
    ],
    domain: "comprehension_ecrite",
    stageId: "a2-debut",
    estimatedMinutes: 22,
    situation:
      "Amir cherche un studio à louer. Il compare deux annonces trouvées sur un site immobilier avant de " +
      "contacter une agence.",
    vocabulary: [
      { term: "un studio", category: "principal" },
      { term: "un T2 / un T3", category: "principal" },
      { term: "meublé(e)", category: "principal" },
      { term: "lumineux(se)", category: "principal" },
      { term: "calme", category: "principal" },
      { term: "un loyer", category: "principal" },
      { term: "une caution", category: "principal" },
      { term: "un quartier", category: "principal" },
      { term: "proche de", category: "expression" },
      { term: "un balcon", category: "principal" },
      { term: "un ascenseur", category: "principal" },
      { term: "disponible", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Le comparatif",
        explanation:
          "plus/moins/aussi + adjectif + que permet de comparer deux choses : ce studio est plus grand que l'autre, ce quartier est moins calme que le mien. Attention : « bon » devient « meilleur » (plus bon n'existe pas).",
      },
      {
        title: "Les pronoms relatifs qui et que (introduction)",
        explanation:
          "« qui » remplace le sujet : un appartement qui a un balcon. « que » remplace le complément : l'appartement que je cherche. Astuce : si le verbe suit directement, c'est « qui » ; s'il y a un sujet entre les deux, c'est « que ».",
      },
    ],
    examLinks: ["DELF A2 — compréhension des écrits (annonces)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "a2-log-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "a2-log-comprendre-activite",
            title: "Comparer deux annonces",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "a2-log-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-annonces",
                difficulty: "A2",
                instructions: "Lisez les deux annonces, puis répondez.",
                text:
                  "Annonce 1 : Studio meublé, 18 m², 2e étage avec ascenseur, quartier calme, proche du " +
                  "tramway. Loyer 480€ charges comprises. Caution : un mois de loyer.\n\n" +
                  "Annonce 2 : Studio non meublé, 25 m² avec balcon, 4e étage sans ascenseur, quartier animé " +
                  "proche du centre-ville. Loyer 520€ + 40€ de charges. Caution : deux mois de loyer.",
                questions: [
                  {
                    kind: "qcm",
                    id: "a2-log-e-q1",
                    prompt: "Quel studio est le plus grand ?",
                    choices: [
                      { id: "a", text: "L'annonce 1 (18 m²)." },
                      { id: "b", text: "L'annonce 2 (25 m²)." },
                      { id: "c", text: "Ils font la même taille." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "L'annonce 2 (25 m²).",
                      explanation: "25 m² est plus grand que 18 m².",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "a2-log-e-q2",
                    prompt: "Vrai ou faux : l'annonce 1 a un ascenseur.",
                    correctAnswer: true,
                    correction: {
                      correctAnswer: "Vrai.",
                      explanation: "« 2e étage avec ascenseur »." ,
                    },
                  },
                  {
                    kind: "qcm",
                    id: "a2-log-e-q3",
                    prompt: "Quel studio est meublé ?",
                    choices: [
                      { id: "a", text: "L'annonce 1." },
                      { id: "b", text: "L'annonce 2." },
                      { id: "c", text: "Les deux." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "L'annonce 1.",
                      explanation: "L'annonce 1 précise « meublé », l'annonce 2 précise « non meublé »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "a2-log-e-q4",
                    prompt: "Quelle caution est demandée pour l'annonce 2 ?",
                    expectedAnswer: "Deux mois de loyer.",
                    correction: {
                      correctAnswer: "Deux mois de loyer.",
                      explanation: "« Caution : deux mois de loyer »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a2-log-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "a2-log-entrainement-activite",
            title: "Comparer et décrire un logement",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-log-g1",
                type: "qcm",
                skillId: "a2-gr-comparatif",
                difficulty: "A2",
                instructions: "Choisis la comparaison correcte.",
                question: {
                  kind: "qcm",
                  id: "a2-log-g1-q",
                  prompt: "L'annonce 2 (520€) est ___ chère que l'annonce 1 (480€).",
                  choices: [
                    { id: "a", text: "plus" },
                    { id: "b", text: "moins" },
                    { id: "c", text: "aussi" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "plus",
                    explanation: "520€ est supérieur à 480€, donc l'annonce 2 est plus chère.",
                  },
                },
              },
              {
                id: "a2-log-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-relatifs-qui-que",
                difficulty: "A2",
                instructions: "Complète avec qui ou que.",
                textWithBlanks:
                  "Je cherche un appartement {{1}} a un balcon et {{2}} je peux visiter ce week-end. Le " +
                  "studio {{3}} j'ai vu hier était trop petit.",
                blanks: [
                  { id: "1", answer: "qui" },
                  { id: "2", answer: "que" },
                  { id: "3", answer: "que" },
                ],
                correction: {
                  correctAnswer: "qui — que — que",
                  explanation: "« qui » remplace le sujet (l'appartement a un balcon) ; « que » remplace le complément (je visite l'appartement / j'ai vu le studio).",
                },
              },
              {
                id: "a2-log-g3",
                type: "association",
                skillId: "a2-voc-logement",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "une caution", right: "somme versée en garantie au propriétaire" },
                  { id: "2", left: "meublé", right: "avec des meubles déjà installés" },
                  { id: "3", left: "un studio", right: "un logement d'une seule pièce" },
                ],
                correction: {
                  correctAnswer: "1 → garantie ; 2 → avec meubles ; 3 → une pièce.",
                  explanation: "Vocabulaire essentiel pour comprendre une annonce immobilière.",
                },
              },
              {
                id: "a2-log-g4",
                type: "vrai_faux",
                skillId: "a2-gr-comparatif",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "On dit « plus bon » pour dire qu'une chose est meilleure qu'une autre.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Bon » a une forme irrégulière au comparatif : meilleur(e). « Plus bon » n'existe pas.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a2-log-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "a2-log-ecriture-activite",
            title: "Décrire le logement recherché",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-log-h",
                type: "production_ecrite",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Écris un court message à une agence immobilière pour décrire le logement que tu cherches " +
                  "(taille, quartier, budget maximum, équipement souhaité).",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Type de logement précisé (/1)",
                  "Un critère de comparaison ou de préférence exprimé (/2)",
                  "Budget mentionné (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "a2-log-ecriture-activite-orale",
            title: "Comparer deux logements à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-log-h-oral",
                type: "production_orale",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Compare les deux annonces du module à voix haute : quelle annonce tu préfères, et pourquoi.",
                context: "Imagine que tu expliques ton choix à un(e) ami(e) qui t'aide à chercher un logement.",
                prepSeconds: 40,
                maxSpeakSeconds: 60,
                selfAssessmentCriteria: [
                  "J'ai comparé les deux annonces avec un comparatif.",
                  "J'ai donné une préférence claire.",
                  "J'ai justifié mon choix.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Utilise « plus... que » ou « moins... que » pour comparer la taille, le prix ou le quartier.",
              },
            ],
          },
        ],
      },
      {
        id: "a2-log-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "a2-log-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-log-i1",
                type: "qcm",
                skillId: "a2-gr-relatifs-qui-que",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "a2-log-i1-q",
                  prompt: "« L'appartement ___ j'ai visité était trop petit. »",
                  choices: [
                    { id: "a", text: "que" },
                    { id: "b", text: "qui" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "que",
                    explanation: "« que » remplace le complément : j'ai visité l'appartement.",
                  },
                },
              },
              {
                id: "a2-log-i2",
                type: "reponse_courte",
                skillId: "a2-voc-logement",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Comment appelle-t-on la somme versée en garantie au propriétaire ?",
                acceptedAnswers: ["une caution", "caution"],
                correction: {
                  correctAnswer: "une caution",
                  explanation: "C'est le terme précis utilisé dans les annonces immobilières.",
                },
              },
              {
                id: "a2-log-i3",
                type: "vrai_faux",
                skillId: "a2-ce-annonces",
                difficulty: "A2",
                instructions: "Item 3. D'après les annonces du module.",
                statement: "L'annonce 2 a un balcon.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« 25 m² avec balcon »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-decrire-son-logement-et-un-probleme",
    slug: "decrire-son-logement-et-un-probleme",
    level: "A2",
    title: "Décrire son logement et signaler un problème",
    description:
      "À la fin de ce module, tu pourras signaler un problème de logement et en expliquer la cause.",
    objectives: [
      "Décrire un équipement en panne",
      "Expliquer un problème et sa cause",
      "Demander une réparation par téléphone",
    ],
    domain: "comprehension_orale",
    stageId: "a2-debut",
    estimatedMinutes: 24,
    situation:
      "Le chauffage d'Inès tombe en panne un soir d'hiver. Elle appelle le gardien de son immeuble pour " +
      "signaler le problème.",
    vocabulary: [
      { term: "le chauffage", category: "principal" },
      { term: "une panne", category: "principal" },
      { term: "être en panne", category: "expression" },
      { term: "une fuite d'eau", category: "principal" },
      { term: "l'électricité", category: "principal" },
      { term: "réparer", category: "verbe" },
      { term: "prévenir", category: "verbe" },
      { term: "un syndic", category: "principal" },
      { term: "un(e) locataire", category: "principal" },
      { term: "un(e) propriétaire", category: "principal" },
      { term: "urgent(e)", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Le passé composé (auxiliaires, accords essentiels)",
        explanation:
          "La plupart des verbes forment le passé composé avec avoir + participe passé : j'ai appelé, j'ai essayé. Certains verbes de mouvement utilisent être, avec accord du participe : le chauffage est tombé en panne (masculin, pas d'accord visible ici, mais elle est arrivée en retard prendrait un « e »).",
      },
      {
        title: "Cause et conséquence simples",
        explanation:
          "« parce que » et « car » introduisent une cause : j'appelle parce que le chauffage ne marche plus. « donc » et « alors » introduisent une conséquence : il fait très froid, donc j'ai appelé le gardien.",
      },
    ],
    examLinks: ["DELF A2 — compréhension de l'oral"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "logp-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "logp-ecoute-activite",
            title: "Écouter un appel à la plombière",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "logp-o",
                type: "comprehension_orale",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Écoutez l'appel du locataire à la plombière, puis répondez.",
                audioSrc: "/audio/a2/a2-logement-fuite-eau-plombier.m4a",
                transcript:
                  "Locataire : Allô, c'est urgent, j'ai une fuite d'eau dans ma cuisine, sous l'évier. Vous pouvez venir aujourd'hui ?\nPlombière : Bonjour. Alors, aujourd'hui c'est compliqué, je suis déjà prise toute la journée. Est-ce que la fuite est grave ? Il y a beaucoup d'eau ?\nLocataire : Non, ça coule doucement, j'ai mis une bassine en dessous pour l'instant.\nPlombière : D'accord, alors ça peut attendre demain matin, vers neuf heures. Fermez l'arrivée d'eau sous l'évier cette nuit, pour être tranquille.\nLocataire : D'accord, je vais faire ça. Ça va coûter combien, à peu près ?\nPlombière : Difficile à dire avant de voir, mais pour une petite fuite comme ça, comptez entre soixante et cent euros.\nLocataire : D'accord, très bien. Alors à demain neuf heures !",
                questions: [
                  {
                    kind: "vrai_faux",
                    id: "logp-o-q1",
                    prompt: "La plombière vient aujourd'hui.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux",
                      explanation: "Elle est prise toute la journée et propose de venir demain matin.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "logp-o-q2",
                    prompt: "Que doit faire le locataire cette nuit ?",
                    choices: [
                      { id: "a", text: "Rappeler encore" },
                      { id: "b", text: "Fermer l'arrivée d'eau" },
                      { id: "c", text: "Vider la bassine" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Fermer l'arrivée d'eau",
                      explanation: "La plombière conseille : « fermez l'arrivée d'eau sous l'évier cette nuit ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "logp-o-q3",
                    prompt: "Quel est le prix estimé de la réparation ?",
                    choices: [
                      { id: "a", text: "Entre 60 et 100 €" },
                      { id: "b", text: "Plus de 200 €" },
                      { id: "c", text: "Gratuit" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Entre 60 et 100 €",
                      explanation: "La plombière dit : « comptez entre soixante et cent euros ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "logp-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "logp-entrainement-activite",
            title: "Signaler un problème",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "logp-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-passe-compose",
                difficulty: "A2",
                instructions: "Complète au passé composé.",
                textWithBlanks:
                  "J'{{1}} (appeler) le gardien hier soir. Il {{2}} (essayer) de réparer le chauffage, mais " +
                  "il n'{{3}} (réussir) pas.",
                blanks: [
                  { id: "1", answer: "ai appelé" },
                  { id: "2", answer: "a essayé" },
                  { id: "3", answer: "a pas réussi" },
                ],
                correction: {
                  correctAnswer: "ai appelé — a essayé — a pas réussi",
                  explanation: "Ces trois verbes forment leur passé composé avec l'auxiliaire avoir.",
                },
              },
              {
                id: "logp-g2",
                type: "qcm",
                skillId: "a2-gr-cause-simple",
                difficulty: "A2",
                instructions: "Choisis le connecteur de cause correct.",
                question: {
                  kind: "qcm",
                  id: "logp-g2-q",
                  prompt: "« J'appelle le gardien ___ le chauffage ne marche plus. »",
                  choices: [
                    { id: "a", text: "parce que" },
                    { id: "b", text: "donc" },
                    { id: "c", text: "et" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "parce que",
                    explanation: "« parce que » introduit la cause de l'appel.",
                    rappelRegle: "parce que/car = cause (pourquoi) ; donc/alors = conséquence (résultat).",
                  },
                },
              },
              {
                id: "logp-g3",
                type: "qcm",
                skillId: "a2-gr-consequence-simple",
                difficulty: "A2",
                instructions: "Choisis le connecteur de conséquence correct.",
                question: {
                  kind: "qcm",
                  id: "logp-g3-q",
                  prompt: "« Il fait très froid, ___ j'ai mis un pull. »",
                  choices: [
                    { id: "a", text: "donc" },
                    { id: "b", text: "parce que" },
                    { id: "c", text: "que" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "donc",
                    explanation: "« donc » introduit la conséquence du froid.",
                  },
                },
              },
              {
                id: "logp-g4",
                type: "association",
                skillId: "a2-voc-voisinage",
                difficulty: "A2",
                instructions: "Associe chaque problème à la personne à contacter.",
                pairs: [
                  { id: "1", left: "une panne de chauffage collectif", right: "le syndic ou le gardien" },
                  { id: "2", left: "une fuite d'eau chez le voisin du dessus", right: "le voisin puis le syndic" },
                  { id: "3", left: "une question sur le montant du loyer", right: "le propriétaire" },
                ],
                correction: {
                  correctAnswer: "1 → syndic/gardien ; 2 → voisin puis syndic ; 3 → propriétaire.",
                  explanation: "Chaque type de problème a un interlocuteur logique différent.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "logp-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "logp-ecriture-activite",
            title: "Signaler un problème par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "logp-h",
                type: "production_ecrite",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Écris un message au syndic de ton immeuble pour signaler un problème (au choix : fuite " +
                  "d'eau, panne d'électricité, problème d'ascenseur). Explique le problème, sa cause si tu la " +
                  "connais, et demande une intervention rapide.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Problème clairement décrit (/2)",
                  "Un connecteur de cause ou de conséquence utilisé (/2)",
                  "Demande d'intervention formulée (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "logp-ecriture-activite-orale",
            title: "Signaler un problème à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "logp-h-oral",
                type: "production_orale",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Comme Inès, appelle le gardien à voix haute pour signaler un problème dans ton logement.",
                context: "Même situation qu'Inès, mais c'est toi qui appelles pour un problème de ton choix.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai décrit clairement le problème.",
                  "J'ai utilisé un connecteur de cause (parce que/car).",
                  "J'ai demandé une intervention.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Commence par te présenter (nom, étage), comme Inès au début de l'appel.",
              },
            ],
          },
        ],
      },
      {
        id: "logp-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "logp-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "logp-i1",
                type: "qcm",
                skillId: "a2-gr-passe-compose",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "logp-i1-q",
                  prompt: "« Hier, j'___ le gardien. »",
                  choices: [
                    { id: "a", text: "ai appelé" },
                    { id: "b", text: "appelle" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "ai appelé",
                    explanation: "« Hier » indique le passé : il faut le passé composé.",
                  },
                },
              },
              {
                id: "logp-i2",
                type: "reponse_courte",
                skillId: "a2-voc-voisinage",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Comment appelle-t-on la personne qui gère l'entretien d'un immeuble collectif ?",
                acceptedAnswers: ["le syndic", "un syndic", "syndic"],
                correction: {
                  correctAnswer: "le syndic",
                  explanation: "Le syndic gère l'entretien et les problèmes des parties communes.",
                },
              },
              {
                id: "logp-i3",
                type: "vrai_faux",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Item 3. D'après l'appel d'Inès.",
                statement: "Le chauffagiste doit passer le jour même.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Il devrait passer le lendemain matin, pas le jour même.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-faire-les-courses",
    slug: "faire-les-courses-a2",
    level: "A2",
    title: "Faire les courses",
    description:
      "À la fin de ce module, tu pourras comparer des produits, exprimer une quantité et demander conseil au supermarché.",
    objectives: [
      "Comparer deux produits",
      "Exprimer une quantité avec les partitifs",
      "Demander conseil à un vendeur",
    ],
    domain: "vocabulaire",
    stageId: "a2-debut",
    estimatedMinutes: 20,
    situation:
      "Marta hésite entre deux marques de café au supermarché et demande conseil à un vendeur avant de " +
      "faire son choix.",
    vocabulary: [
      { term: "un rayon", category: "principal" },
      { term: "une marque", category: "principal" },
      { term: "un prix", category: "principal" },
      { term: "moins cher / plus cher que", category: "expression" },
      { term: "une promotion", category: "principal" },
      { term: "un paquet", category: "principal" },
      { term: "une bouteille", category: "principal" },
      { term: "un peu de", category: "connecteur" },
      { term: "beaucoup de", category: "connecteur" },
      { term: "plusieurs", category: "principal" },
      { term: "une quantité", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Quantité et articles partitifs",
        explanation:
          "du, de la, des expriment une quantité indéfinie : je voudrais du café, de la confiture. Avec une expression de quantité (un peu de, beaucoup de, un paquet de), l'article partitif disparaît : un paquet de café (pas « un paquet du café »).",
      },
      {
        title: "Le comparatif appliqué aux produits",
        explanation:
          "plus cher/moins cher que, plus léger/plus lourd que permettent de comparer deux produits pour choisir : cette marque est moins chère que l'autre, mais ce paquet est plus léger.",
      },
    ],
    examLinks: ["DELF A2 — production orale (interaction, achats)", "TCF IRN — expression orale"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "cours-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "cours-comprendre-activite",
            title: "Lire une affiche de promotion",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "cours-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-annonces",
                difficulty: "A2",
                instructions: "Lisez l'affiche du rayon café, puis répondez.",
                text:
                  "Rayon café — Cette semaine : Café Marco, le paquet de 250g à 3,50€ au lieu de 4,20€. Café " +
                  "Excelso, le paquet de 250g à 4,80€ (prix habituel, pas de promotion). Pour deux paquets de " +
                  "Café Marco achetés, le troisième est offert !",
                questions: [
                  {
                    kind: "qcm",
                    id: "cours-e-q1",
                    prompt: "Quel café est en promotion cette semaine ?",
                    choices: [
                      { id: "a", text: "Le Café Marco." },
                      { id: "b", text: "Le Café Excelso." },
                      { id: "c", text: "Les deux." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Le Café Marco.",
                      explanation: "Le Café Excelso est au « prix habituel, pas de promotion »." ,
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "cours-e-q2",
                    prompt: "Vrai ou faux : le Café Marco est plus cher que le Café Excelso cette semaine.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "3,50€ (Marco, promotion) est moins cher que 4,80€ (Excelso).",
                    },
                  },
                  {
                    kind: "libre",
                    id: "cours-e-q3",
                    prompt: "Que se passe-t-il si on achète deux paquets de Café Marco ?",
                    expectedAnswer: "Le troisième paquet est offert.",
                    correction: {
                      correctAnswer: "Le troisième paquet est offert.",
                      explanation: "« pour deux paquets achetés, le troisième est offert »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "cours-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "cours-entrainement-activite",
            title: "Comparer et quantifier",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "cours-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-quantite-partitifs",
                difficulty: "A2",
                instructions: "Complète avec du, de la, des ou un paquet de.",
                textWithBlanks:
                  "Je voudrais {{1}} café, {{2}} confiture, et {{3}} pâtes, s'il vous plaît.",
                blanks: [
                  { id: "1", answer: "du" },
                  { id: "2", answer: "de la" },
                  { id: "3", answer: "des" },
                ],
                correction: {
                  correctAnswer: "du — de la — des",
                  explanation: "« café » masculin (du), « confiture » féminin (de la), « pâtes » pluriel (des).",
                },
              },
              {
                id: "cours-g2",
                type: "qcm",
                skillId: "a2-gr-comparatif",
                difficulty: "A2",
                instructions: "Choisis la comparaison correcte.",
                question: {
                  kind: "qcm",
                  id: "cours-g2-q",
                  prompt: "Le Café Marco (3,50€) est ___ cher que le Café Excelso (4,80€).",
                  choices: [
                    { id: "a", text: "moins" },
                    { id: "b", text: "plus" },
                    { id: "c", text: "aussi" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "moins",
                    explanation: "3,50€ est inférieur à 4,80€, donc moins cher.",
                  },
                },
              },
              {
                id: "cours-g3",
                type: "vrai_faux",
                skillId: "a2-gr-quantite-partitifs",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "On dit « un paquet du café ».",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Après une expression de quantité (un paquet de, beaucoup de), l'article partitif disparaît : un paquet de café.",
                },
              },
              {
                id: "cours-g4",
                type: "association",
                skillId: "a2-voc-achats",
                difficulty: "A2",
                instructions: "Associe chaque contenant au produit habituel.",
                pairs: [
                  { id: "1", left: "un paquet de", right: "café ou pâtes" },
                  { id: "2", left: "une bouteille de", right: "eau ou jus de fruit" },
                  { id: "3", left: "une promotion sur", right: "un prix réduit temporairement" },
                ],
                correction: {
                  correctAnswer: "1 → café/pâtes ; 2 → eau/jus ; 3 → prix réduit.",
                  explanation: "Chaque contenant ou expression correspond à un usage courant au supermarché.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "cours-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "cours-ecriture-activite",
            title: "Demander conseil par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "cours-h",
                type: "production_ecrite",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu hésites entre deux produits sur un site de courses en ligne. Écris un message au " +
                  "service client pour comparer les deux produits et demander lequel est le plus adapté à tes " +
                  "besoins.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Les deux produits comparés (/2)",
                  "Un comparatif utilisé correctement (/1)",
                  "Une question claire posée (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "cours-ecriture-activite-orale",
            title: "Demander conseil à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "cours-h-oral",
                type: "production_orale",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi (jeu de rôle).",
                consigne:
                  "Comme Marta, demande conseil à un vendeur pour choisir entre deux produits au supermarché.",
                context: "Imagine un vendeur qui te propose deux produits différents : compare-les à voix haute.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai comparé deux produits.",
                  "J'ai exprimé une quantité (un paquet de, une bouteille de...).",
                  "J'ai fait un choix clair.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Pas besoin d'inventer des prix compliqués : reste sur des chiffres simples, comme dans l'affiche du module.",
              },
            ],
          },
        ],
      },
      {
        id: "cours-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "cours-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "cours-i1",
                type: "qcm",
                skillId: "a2-gr-quantite-partitifs",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "cours-i1-q",
                  prompt: "« Je voudrais ___ eau, s'il vous plaît. »",
                  choices: [
                    { id: "a", text: "de l'" },
                    { id: "b", text: "de la" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "de l'",
                    explanation: "Devant une voyelle, « de la » devient « de l' » : de l'eau.",
                  },
                },
              },
              {
                id: "cours-i2",
                type: "reponse_courte",
                skillId: "a2-voc-achats",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Comment appelle-t-on un prix réduit temporairement ?",
                acceptedAnswers: ["une promotion", "promotion"],
                correction: {
                  correctAnswer: "une promotion",
                  explanation: "C'est le terme utilisé sur les affiches de supermarché.",
                },
              },
              {
                id: "cours-i3",
                type: "vrai_faux",
                skillId: "a2-ce-annonces",
                difficulty: "A2",
                instructions: "Item 3. D'après l'affiche du module.",
                statement: "Le Café Excelso est en promotion cette semaine.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Seul le Café Marco est en promotion ; l'Excelso est au prix habituel.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-se-reperer-en-ville",
    slug: "se-reperer-en-ville",
    level: "A2",
    title: "Se repérer en ville et utiliser les services",
    description:
      "À la fin de ce module, tu pourras demander et comprendre un chemin, et utiliser un service simple comme la poste ou la banque.",
    objectives: [
      "Comprendre des indications pour se repérer en ville",
      "Donner une instruction avec l'impératif",
      "Utiliser un pronom pour éviter une répétition",
    ],
    domain: "comprehension_orale",
    stageId: "a2-debut",
    estimatedMinutes: 24,
    situation:
      "Youssef, arrivé récemment dans son nouveau quartier, demande son chemin à un passant pour aller à " +
      "la poste, puis se rend à la banque pour un renseignement.",
    vocabulary: [
      { term: "la poste", category: "principal" },
      { term: "la banque", category: "principal" },
      { term: "la mairie", category: "principal" },
      { term: "un formulaire", category: "principal" },
      { term: "un guichet", category: "principal" },
      { term: "tout droit", category: "expression" },
      { term: "à gauche / à droite", category: "expression" },
      { term: "traverser", category: "verbe" },
      { term: "au coin de", category: "expression" },
      { term: "un rendez-vous", category: "principal" },
      { term: "un justificatif de domicile", category: "principal" },
    ],
    languagePoints: [
      {
        title: "L'impératif",
        explanation:
          "L'impératif sert à donner une instruction ou une indication : Continuez tout droit, tournez à gauche, traversez la rue. Aux verbes en -er, pas de « s » à la 2e personne du singulier : Tourne à gauche (et non tournes).",
      },
      {
        title: "Les pronoms compléments d'objet direct (le, la, les)",
        explanation:
          "le, la, les remplacent un nom déjà mentionné pour éviter de le répéter : Le formulaire ? Je le remplis tout de suite. La poste ? Je la connais bien. Ils se placent juste avant le verbe.",
      },
    ],
    examLinks: ["DELF A2 — compréhension de l'oral", "TCF IRN — compréhension orale"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "ville-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "ville-ecoute-activite",
            title: "Écouter une demande d'itinéraire en ville",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "ville-o",
                type: "comprehension_orale",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Écoutez le dialogue, puis répondez.",
                audioSrc: "/audio/a2/a2-directions-poste-banque.m4a",
                transcript:
                  "Youssef — Excusez-moi, je cherche la poste, elle est loin d'ici ?\nPassante — Non, pas très loin ! Continuez tout droit, puis tournez à gauche au carrefour.\nYoussef — D'accord, tout droit, puis à gauche...\nPassante — C'est ça. La poste est juste au coin de la rue, à côté de la pharmacie.\nYoussef — Merci beaucoup ! Et la banque, vous savez où elle est aussi ?\nPassante — La banque ? Oui, je la connais bien : c'est juste en face de la poste, vous ne pouvez pas la manquer.\nYoussef — Parfait, merci pour ces indications !",
                questions: [
                  {
                    kind: "qcm",
                    id: "ville-o-q1",
                    prompt: "Comment la passante explique-t-elle d'aller à la poste ?",
                    choices: [
                      { id: "a", text: "Tout droit, puis à gauche" },
                      { id: "b", text: "Tout droit, puis à droite" },
                      { id: "c", text: "À gauche, puis tout droit" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Tout droit, puis à gauche",
                      explanation: "Elle dit : « Continuez tout droit, puis tournez à gauche au carrefour ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "ville-o-q2",
                    prompt: "Où se trouve exactement la poste ?",
                    choices: [
                      { id: "a", text: "Au coin de la rue, à côté de la pharmacie" },
                      { id: "b", text: "En face de la mairie" },
                      { id: "c", text: "Devant la banque" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Au coin de la rue, à côté de la pharmacie",
                      explanation: "La passante précise : « La poste est juste au coin de la rue, à côté de la pharmacie ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "ville-o-q3",
                    prompt: "La banque est loin de la poste.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux",
                      explanation: "La passante dit que la banque est « juste en face de la poste ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ville-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "ville-entrainement-activite",
            title: "Donner des indications et utiliser un pronom",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "ville-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-imperatif",
                difficulty: "A2",
                instructions: "Complète avec le verbe à l'impératif (2e personne du singulier).",
                textWithBlanks:
                  "{{1}} (continuer) tout droit, puis {{2}} (tourner) à droite. {{3}} (traverser) la place.",
                blanks: [
                  { id: "1", answer: "Continue" },
                  { id: "2", answer: "tourne" },
                  { id: "3", answer: "Traverse" },
                ],
                correction: {
                  correctAnswer: "Continue — tourne — Traverse",
                  explanation: "Aux verbes en -er, l'impératif à la 2e personne du singulier ne prend pas de « s ».",
                },
              },
              {
                id: "ville-g2",
                type: "qcm",
                skillId: "a2-gr-pronoms-cod",
                difficulty: "A2",
                instructions: "Choisis le pronom correct.",
                question: {
                  kind: "qcm",
                  id: "ville-g2-q",
                  prompt: "« Le formulaire ? Je ___ remplis tout de suite. »",
                  choices: [
                    { id: "a", text: "le" },
                    { id: "b", text: "la" },
                    { id: "c", text: "les" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "le",
                    explanation: "« le formulaire » est masculin singulier : on le remplace par « le ».",
                  },
                },
              },
              {
                id: "ville-g3",
                type: "association",
                skillId: "a2-voc-ville-services",
                difficulty: "A2",
                instructions: "Associe chaque service au document ou à l'action associée.",
                pairs: [
                  { id: "1", left: "la mairie", right: "un justificatif de domicile" },
                  { id: "2", left: "la banque", right: "ouvrir un compte" },
                  { id: "3", left: "la poste", right: "envoyer un colis" },
                ],
                correction: {
                  correctAnswer: "1 → justificatif de domicile ; 2 → ouvrir un compte ; 3 → envoyer un colis.",
                  explanation: "Chaque service public ou commercial est associé à une démarche typique.",
                },
              },
              {
                id: "ville-g4",
                type: "vrai_faux",
                skillId: "a2-gr-pronoms-cod",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "Le pronom complément se place toujours après le verbe conjugué.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Le pronom complément (le, la, les) se place en général juste avant le verbe conjugué : je le remplis, je la connais.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "ville-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "ville-ecriture-activite",
            title: "Donner des indications par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "ville-h",
                type: "production_ecrite",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Écris un message à un(e) ami(e) qui vient te rendre visite pour la première fois, pour " +
                  "expliquer comment venir de la gare jusqu'à chez toi.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Au moins trois indications données (/2)",
                  "Un verbe à l'impératif utilisé correctement (/2)",
                  "Itinéraire cohérent et compréhensible (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "ville-ecriture-activite-orale",
            title: "Demander son chemin à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "ville-h-oral",
                type: "production_orale",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi (jeu de rôle).",
                consigne:
                  "Comme Youssef, demande ton chemin à voix haute pour aller à un endroit de ton choix (poste, " +
                  "banque, pharmacie...).",
                context: "Imagine qu'un passant te répond avec des indications simples que tu répètes pour confirmer.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai formulé une demande claire et polie.",
                  "J'ai reformulé les indications reçues.",
                  "J'ai utilisé au moins un mot de direction (tout droit, à gauche...).",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Commence par « Excusez-moi », comme Youssef, pour interpeller poliment un inconnu.",
              },
            ],
          },
        ],
      },
      {
        id: "ville-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "ville-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "ville-i1",
                type: "qcm",
                skillId: "a2-gr-imperatif",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "ville-i1-q",
                  prompt: "« ___ tout droit ! » (à un ami, tutoiement)",
                  choices: [
                    { id: "a", text: "Continue" },
                    { id: "b", text: "Continues" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Continue",
                    explanation: "Pas de « s » à l'impératif des verbes en -er à la 2e personne du singulier.",
                  },
                },
              },
              {
                id: "ville-i2",
                type: "reponse_courte",
                skillId: "a2-voc-ville-services",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel document faut-il souvent apporter pour prouver son adresse ?",
                acceptedAnswers: ["un justificatif de domicile", "justificatif de domicile"],
                correction: {
                  correctAnswer: "un justificatif de domicile",
                  explanation: "C'est le document demandé dans la plupart des démarches administratives.",
                },
              },
              {
                id: "ville-i3",
                type: "vrai_faux",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Item 3. D'après le dialogue.",
                statement: "La banque est loin de la poste.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "La banque est juste en face, de l'autre côté de la place.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-parler-de-ses-gouts-et-loisirs",
    slug: "parler-de-ses-gouts-et-loisirs",
    level: "A2",
    title: "Parler de ses goûts et de ses loisirs",
    description:
      "À la fin de ce module, tu pourras parler de tes loisirs préférés et exprimer une préférence claire.",
    objectives: [
      "Parler de ses loisirs préférés",
      "Exprimer un degré maximal avec le superlatif",
      "Comparer deux loisirs avec une fréquence",
    ],
    domain: "vocabulaire",
    stageId: "a2-debut",
    estimatedMinutes: 18,
    situation:
      "À la pause déjeuner, Chloé et Marc, deux collègues, parlent de ce qu'ils aiment faire pendant leur " +
      "temps libre.",
    vocabulary: [
      { term: "le sport", category: "principal" },
      { term: "la lecture", category: "principal" },
      { term: "le cinéma", category: "principal" },
      { term: "la musique", category: "principal" },
      { term: "la randonnée", category: "principal" },
      { term: "préférer", category: "verbe" },
      { term: "adorer", category: "verbe" },
      { term: "détester", category: "verbe" },
      { term: "ce que j'aime le plus / le moins", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Le superlatif simple",
        explanation:
          "le/la plus... et le/la moins... expriment un degré maximal ou minimal : c'est le loisir que je préfère le plus, c'est l'activité que j'aime le moins. Avec un adjectif : c'est le film le plus intéressant de l'année.",
      },
      {
        title: "Les adverbes de fréquence (reprise)",
        explanation:
          "toujours, souvent, parfois, rarement, jamais permettent de préciser à quelle fréquence on pratique un loisir : je fais souvent du sport, mais je vais rarement au cinéma.",
      },
    ],
    examLinks: ["TCF IRN — expression orale, tâche 1"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "gout-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "gout-comprendre-activite",
            title: "Lire un commentaire sur les loisirs",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "gout-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Lisez le commentaire de Chloé sur un forum de loisirs, puis répondez.",
                text:
                  "Ce que j'aime le plus, c'est la lecture : je lis presque tous les soirs avant de dormir. " +
                  "J'adore aussi la randonnée, mais je n'ai pas souvent le temps, alors j'y vais seulement une " +
                  "fois par mois. Par contre, ce que j'aime le moins, c'est le sport en salle : je déteste ça, " +
                  "je trouve ça ennuyeux !",
                questions: [
                  {
                    kind: "qcm",
                    id: "gout-e-q1",
                    prompt: "Quel est le loisir préféré de Chloé ?",
                    choices: [
                      { id: "a", text: "La lecture." },
                      { id: "b", text: "La randonnée." },
                      { id: "c", text: "Le sport en salle." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "La lecture.",
                      explanation: "« ce que j'aime le plus, c'est la lecture »." ,
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "gout-e-q2",
                    prompt: "Vrai ou faux : Chloé fait de la randonnée toutes les semaines.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Elle dit « j'y vais seulement une fois par mois »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "gout-e-q3",
                    prompt: "Qu'est-ce que Chloé aime le moins ?",
                    expectedAnswer: "Le sport en salle.",
                    correction: {
                      correctAnswer: "Le sport en salle.",
                      explanation: "« ce que j'aime le moins, c'est le sport en salle »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "gout-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "gout-entrainement-activite",
            title: "Superlatif et fréquence",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "gout-g1",
                type: "qcm",
                skillId: "a2-gr-superlatif-simple",
                difficulty: "A2",
                instructions: "Choisis la forme correcte.",
                question: {
                  kind: "qcm",
                  id: "gout-g1-q",
                  prompt: "« C'est le loisir que j'aime ___. » (degré maximal)",
                  choices: [
                    { id: "a", text: "le plus" },
                    { id: "b", text: "plus" },
                    { id: "c", text: "le meilleur" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "le plus",
                    explanation: "« le plus » exprime le degré maximal après un verbe comme « aimer ».",
                  },
                },
              },
              {
                id: "gout-g2",
                type: "association",
                skillId: "a2-voc-loisirs-gouts",
                difficulty: "A2",
                instructions: "Associe chaque verbe à son intensité.",
                pairs: [
                  { id: "1", left: "adorer", right: "aimer beaucoup" },
                  { id: "2", left: "détester", right: "ne pas aimer du tout" },
                  { id: "3", left: "préférer", right: "aimer plus qu'autre chose" },
                ],
                correction: {
                  correctAnswer: "1 → aimer beaucoup ; 2 → ne pas aimer du tout ; 3 → aimer plus.",
                  explanation: "Ces trois verbes expriment des degrés différents d'appréciation.",
                },
              },
              {
                id: "gout-g3",
                type: "vrai_faux",
                skillId: "a2-gr-adverbes-frequence",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Rarement » signifie plus souvent que « parfois ».",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'ordre de fréquence est : toujours > souvent > parfois > rarement > jamais.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "gout-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "gout-ecriture-activite",
            title: "Parler de ses loisirs par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "gout-h",
                type: "production_ecrite",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Comme Chloé, écris un court commentaire sur tes loisirs : ce que tu aimes le plus, ce que " +
                  "tu aimes le moins, et à quelle fréquence tu pratiques chaque activité.",
                minWords: 30,
                maxWords: 50,
                correctionCriteria: [
                  "Un loisir préféré et un loisir moins apprécié mentionnés (/2)",
                  "Un superlatif utilisé correctement (/1)",
                  "Un adverbe de fréquence utilisé (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "gout-ecriture-activite-orale",
            title: "Parler de ses loisirs à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "gout-h-oral",
                type: "production_orale",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Comme Chloé et Marc à la pause déjeuner, parle à voix haute de tes loisirs préférés et de " +
                  "ceux que tu aimes moins.",
                context: "Imagine que tu discutes avec un(e) collègue pendant une pause.",
                prepSeconds: 25,
                maxSpeakSeconds: 40,
                selfAssessmentCriteria: [
                  "J'ai mentionné au moins deux loisirs.",
                  "J'ai utilisé un superlatif (le plus / le moins).",
                  "J'ai donné une fréquence.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Reste simple : deux ou trois loisirs bien décrits valent mieux qu'une longue liste.",
              },
            ],
          },
        ],
      },
      {
        id: "gout-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "gout-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "gout-i1",
                type: "qcm",
                skillId: "a2-gr-superlatif-simple",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "gout-i1-q",
                  prompt: "« C'est l'activité que j'aime ___. » (degré minimal)",
                  choices: [
                    { id: "a", text: "le moins" },
                    { id: "b", text: "moins" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "le moins",
                    explanation: "« le moins » exprime le degré minimal, symétrique de « le plus ».",
                  },
                },
              },
              {
                id: "gout-i2",
                type: "reponse_courte",
                skillId: "a2-voc-loisirs-gouts",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel verbe signifie « ne pas aimer du tout » ?",
                acceptedAnswers: ["détester"],
                correction: {
                  correctAnswer: "détester",
                  explanation: "C'est l'opposé d'« adorer ».",
                },
              },
              {
                id: "gout-i3",
                type: "vrai_faux",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le commentaire de Chloé.",
                statement: "Chloé lit presque tous les soirs.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« je lis presque tous les soirs avant de dormir »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
