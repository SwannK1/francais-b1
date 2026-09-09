import type { Module } from "@/lib/pedagogy/types";

/**
 * Modules A2 — Phase Consolidation (« Raconter et se projeter »), 6 modules
 * (17 à 22, dont le bilan A2). Catalogue isolé du B1
 * (`lib/pedagogy/data/modules.ts`), voir `docs/integration/a2-content.md`.
 * Contenu 100% original, aucun sujet DELF/TCF reproduit. Tutoiement
 * systématique (cohérence avec le reste du produit — voir
 * `docs/b1/pedagogical-audit-2026.md` §13).
 */
export const MODULES_A2_PART3: Module[] = [
  {
    id: "a2-parler-de-la-meteo",
    slug: "parler-de-la-meteo",
    level: "A2",
    title: "Parler de la météo",
    description:
      "À la fin de ce module, tu pourras comprendre un bulletin météo simple et proposer une activité selon le temps qu'il fera.",
    objectives: [
      "Comprendre un bulletin météo simple",
      "Comparer le temps qu'il fait selon les saisons",
      "Proposer une activité adaptée à la météo prévue",
    ],
    domain: "comprehension_orale",
    stageId: "a2-consolidation",
    estimatedMinutes: 20,
    situation:
      "Léna et son ami Rachid écoutent le bulletin météo à la radio avant de décider ce qu'ils vont faire ce week-end.",
    vocabulary: [
      { term: "il pleut", category: "expression" },
      { term: "il fait beau", category: "expression" },
      { term: "il fait chaud", category: "expression" },
      { term: "il fait froid", category: "expression" },
      { term: "un orage", category: "principal" },
      { term: "le soleil", category: "principal" },
      { term: "la neige", category: "principal" },
      { term: "une saison", category: "principal" },
      { term: "prévoir", category: "verbe" },
      { term: "le printemps", category: "principal" },
      { term: "l'automne", category: "principal" },
      { term: "un nuage", category: "principal" },
      { term: "souffler (le vent)", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Le futur simple pour les prévisions",
        explanation:
          "On utilise le futur simple pour annoncer ce qu'il va se passer : demain, il fera beau ; le vent soufflera fort dans l'après-midi. Formation régulière : infinitif + terminaisons -ai, -as, -a, -ons, -ez, -ont (attention aux verbes irréguliers comme faire → il fera, pouvoir → on pourra).",
      },
      {
        title: "Comparer avec le comparatif",
        explanation:
          "Pour comparer deux saisons ou deux journées : il fait plus chaud en été qu'en hiver ; il pleut moins souvent en juillet qu'en novembre. On retrouve la structure plus/moins/aussi... que déjà vue pour comparer des objets ou des lieux.",
      },
    ],
    examLinks: ["DELF A2 — compréhension de l'oral"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "meteo-comprendre",
        type: "comprendre",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "meteo-comprendre-activite",
            title: "Écouter le bulletin météo",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "meteo-e",
                type: "comprehension_orale",
                skillId: "a2-co-annonces-publiques",
                difficulty: "A2",
                instructions: "Écoutez le bulletin météo à la radio, puis répondez.",
                audioSrc: "/audio/a2/a2-meteo-bulletin-court.m4a",
                transcript:
                  "Et voici la météo pour demain. Le matin, il y aura du soleil sur toute la région, avec des températures autour de douze degrés. L'après-midi, quelques nuages arriveront, mais il ne pleuvra pas. Le soir, il fera plus frais, environ six degrés. Bonne journée à tous !",
                questions: [
                  {
                    kind: "qcm",
                    id: "meteo-e-q1",
                    prompt: "Quel temps fait-il le matin ?",
                    choices: [
                      { id: "a", text: "Il pleut" },
                      { id: "b", text: "Il y a du soleil" },
                      { id: "c", text: "Il neige" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Il y a du soleil",
                      explanation: "Le bulletin annonce : « le matin, il y aura du soleil ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "meteo-e-q2",
                    prompt: "Il va pleuvoir l'après-midi.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux",
                      explanation: "Le bulletin précise : « quelques nuages arriveront, mais il ne pleuvra pas ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "meteo-e-q3",
                    prompt: "Quelle température fait-il le soir ?",
                    choices: [
                      { id: "a", text: "12°" },
                      { id: "b", text: "6°" },
                      { id: "c", text: "20°" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "6°",
                      explanation: "Le bulletin dit : « le soir, il fera plus frais, environ six degrés ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "meteo-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "meteo-entrainement-activite",
            title: "Prévoir et comparer le temps",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "meteo-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Complète avec le verbe entre parenthèses, conjugué au futur simple.",
                textWithBlanks:
                  "Demain, il {{1}} (faire) beau le matin, mais il {{2}} (pleuvoir) l'après-midi. Nous {{3}} " +
                  "(pouvoir) quand même sortir avant midi.",
                blanks: [
                  { id: "1", answer: "fera" },
                  { id: "2", answer: "pleuvra" },
                  { id: "3", answer: "pourrons" },
                ],
                correction: {
                  correctAnswer: "fera — pleuvra — pourrons",
                  explanation: "« faire », « pleuvoir » et « pouvoir » sont irréguliers au futur simple : il fera, il pleuvra, nous pourrons.",
                  rappelRegle: "Le futur simple d'un verbe irrégulier ne se devine pas depuis son infinitif : il faut le connaître par cœur.",
                },
              },
              {
                id: "meteo-g2",
                type: "qcm",
                skillId: "a2-gr-comparatif",
                difficulty: "A2",
                instructions: "Choisis la comparaison correcte.",
                question: {
                  kind: "qcm",
                  id: "meteo-g2-q",
                  prompt: "En général, dans le sud de la France, il fait ___ dans le nord.",
                  choices: [
                    { id: "a", text: "plus chaud que" },
                    { id: "b", text: "plus chaud comme" },
                    { id: "c", text: "aussi froid que" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "plus chaud que",
                    explanation: "Le comparatif de supériorité se construit avec « plus... que », jamais « plus... comme ».",
                  },
                },
              },
              {
                id: "meteo-g3",
                type: "association",
                skillId: "a2-voc-meteo",
                difficulty: "A2",
                instructions: "Associe chaque saison à une phrase logique.",
                pairs: [
                  { id: "1", left: "L'hiver", right: "Il fait froid et il neige parfois." },
                  { id: "2", left: "L'été", right: "Il fait chaud et le soleil brille souvent." },
                  { id: "3", left: "L'automne", right: "Il y a du vent et les feuilles tombent." },
                ],
                correction: {
                  correctAnswer: "1 → froid/neige ; 2 → chaud/soleil ; 3 → vent/feuilles.",
                  explanation: "Chaque saison a un temps et un paysage typiques en France métropolitaine.",
                },
              },
              {
                id: "meteo-g4",
                type: "vrai_faux",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Il va pleuvoir » et « il pleuvra » ont exactement le même sens.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation:
                    "Le futur proche (aller + infinitif) et le futur simple annoncent tous les deux une action à venir ; à l'oral, le futur proche est simplement plus fréquent.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "meteo-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "meteo-ecriture-activite",
            title: "Décrire le temps par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "meteo-h",
                type: "production_ecrite",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Décris le temps qu'il fait dans ta région en ce moment, et compare-le avec une autre saison de " +
                  "l'année (plus chaud, plus froid, plus de pluie...).",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Description claire du temps actuel (/2)",
                  "Une comparaison avec une autre saison (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "meteo-ecriture-activite-orale",
            title: "Proposer une sortie selon la météo",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "meteo-h-oral",
                type: "production_orale",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Comme Léna et Rachid, imagine la météo du week-end prochain et propose une activité adaptée à un ami.",
                context: "Tu peux inventer la météo (beau temps, pluie, froid...) et proposer une activité en conséquence.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai décrit une météo précise avec le futur.",
                  "J'ai proposé une activité adaptée à cette météo.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Pas besoin de deviner la vraie météo : invente-la, l'important est d'utiliser le futur simple.",
              },
            ],
          },
        ],
      },
      {
        id: "meteo-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "meteo-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "meteo-i1",
                type: "qcm",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "meteo-i1-q",
                  prompt: "« Demain, il ___ beau. »",
                  choices: [
                    { id: "a", text: "fera" },
                    { id: "b", text: "faira" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "fera",
                    explanation: "« Faire » est irrégulier au futur simple : il fera (jamais « il faira »).",
                  },
                },
              },
              {
                id: "meteo-i2",
                type: "reponse_courte",
                skillId: "a2-voc-meteo",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel mot désigne la pluie très forte avec du tonnerre : un ___ ?",
                acceptedAnswers: ["orage"],
                correction: {
                  correctAnswer: "orage",
                  explanation: "Un orage combine pluie forte, vent et souvent du tonnerre.",
                },
              },
              {
                id: "meteo-i3",
                type: "vrai_faux",
                skillId: "a2-co-annonces-publiques",
                difficulty: "A2",
                instructions: "Item 3. D'après le bulletin météo écouté.",
                statement: "Le bulletin annonce de la neige pour le week-end.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Le bulletin parle de nuages, de pluie légère et de soleil, jamais de neige.",
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "a2-organiser-un-evenement",
    slug: "organiser-un-evenement",
    level: "A2",
    title: "Organiser un événement",
    description:
      "À la fin de ce module, tu pourras organiser une fête simple, écrire une invitation et donner des instructions aux invités.",
    objectives: [
      "Écrire une invitation pour un événement",
      "Donner des instructions simples avec l'impératif",
      "Comprendre les détails pratiques d'une invitation reçue",
    ],
    domain: "production_ecrite",
    stageId: "a2-consolidation",
    estimatedMinutes: 22,
    situation:
      "Manon organise une fête surprise pour les 30 ans de son collègue Julien et écrit un message aux autres collègues pour tout organiser.",
    vocabulary: [
      { term: "un anniversaire", category: "principal" },
      { term: "une invitation", category: "principal" },
      { term: "un cadeau", category: "principal" },
      { term: "fêter", category: "verbe" },
      { term: "organiser", category: "verbe" },
      { term: "prévenir", category: "verbe" },
      { term: "surprendre", category: "verbe" },
      { term: "apporter", category: "verbe" },
      { term: "une surprise", category: "principal" },
      { term: "confirmer sa présence", category: "expression" },
      { term: "se cotiser", category: "verbe" },
      { term: "garder le secret", category: "expression" },
    ],
    languagePoints: [
      {
        title: "L'impératif pour donner des instructions",
        explanation:
          "Pour organiser un événement, on donne souvent des instructions avec l'impératif : apporte un plat, ne dis rien à Julien, venez à 19h précises. Il n'y a pas de sujet exprimé, et le -s final des verbes en -er disparaît à la 2e personne du singulier (tu apportes → apporte).",
      },
      {
        title: "Les expressions de date et d'heure",
        explanation:
          "Pour organiser un rendez-vous ou une fête : le samedi 12 (jour précis), à partir de 19h (heure de début), avant le 10 (date limite). Ces expressions permettent de donner des informations pratiques claires, indispensables pour une invitation.",
      },
    ],
    examLinks: ["DELF A2 — production écrite"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "evt-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "evt-comprendre-activite",
            title: "Lire le message d'organisation de Manon",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "evt-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez le message que Manon envoie au groupe des collègues, puis répondez.",
                text:
                  "Salut à tous !\n\n" +
                  "Comme vous le savez, c'est bientôt l'anniversaire de Julien (30 ans, quand même !). J'ai " +
                  "réservé la salle au-dessus du café du coin pour le vendredi 20, à partir de 19h. Surtout, " +
                  "ne dites rien à Julien, c'est une surprise !\n\n" +
                  "Pour le cadeau, on se cotise : donnez-moi 10 euros chacun avant le 15, en liquide ou par " +
                  "virement. Et si vous pouvez, apportez un petit gâteau ou une boisson pour le buffet.\n\n" +
                  "Merci de confirmer votre présence avant vendredi prochain. À très vite !\nManon",
                questions: [
                  {
                    kind: "qcm",
                    id: "evt-e-q1",
                    prompt: "À quelle heure commence la fête ?",
                    choices: [
                      { id: "a", text: "À 19h." },
                      { id: "b", text: "À 20h." },
                      { id: "c", text: "À 15h." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "À 19h.", explanation: "« à partir de 19h », précise Manon." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "evt-e-q2",
                    prompt: "Vrai ou faux : Julien est déjà au courant de la fête.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "C'est une fête surprise : « ne dites rien à Julien, c'est une surprise ! »",
                    },
                  },
                  {
                    kind: "libre",
                    id: "evt-e-q3",
                    prompt: "Combien chaque collègue doit-il donner pour le cadeau, et avant quand ?",
                    expectedAnswer: "10 euros, avant le 15.",
                    correction: {
                      correctAnswer: "10 euros, avant le 15.",
                      explanation: "« donnez-moi 10 euros chacun avant le 15 »." ,
                    },
                  },
                  {
                    kind: "qcm",
                    id: "evt-e-q4",
                    prompt: "Que demande Manon à la fin du message ?",
                    choices: [
                      { id: "a", text: "De confirmer sa présence." },
                      { id: "b", text: "D'apporter un cadeau pour elle." },
                      { id: "c", text: "De réserver la salle." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "De confirmer sa présence.",
                      explanation: "« Merci de confirmer votre présence avant vendredi prochain »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "evt-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "evt-entrainement-activite",
            title: "Donner des instructions et des dates",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "evt-g1",
                type: "qcm",
                skillId: "a2-gr-imperatif",
                difficulty: "A2",
                instructions: "Choisis la forme correcte de l'impératif.",
                question: {
                  kind: "qcm",
                  id: "evt-g1-q",
                  prompt: "Pour dire à un ami d'apporter une boisson :",
                  choices: [
                    { id: "a", text: "Apportes une boisson." },
                    { id: "b", text: "Apporte une boisson." },
                    { id: "c", text: "Tu apportes une boisson." },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "Apporte une boisson.",
                    explanation: "À l'impératif, les verbes en -er perdent le -s final à la 2e personne du singulier : apporte, pas apportes.",
                    rappelRegle: "tu apportes (présent) → apporte ! (impératif) : le -s disparaît.",
                  },
                },
              },
              {
                id: "evt-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-imperatif",
                difficulty: "A2",
                instructions: "Complète les instructions avec l'impératif du verbe entre parenthèses.",
                textWithBlanks:
                  "{{1}} (venir) à 19h précises. {{2}} (ne pas dire) le secret à Julien. {{3}} (apporter) un plat si tu peux.",
                blanks: [
                  { id: "1", answer: "Viens" },
                  { id: "2", answer: "Ne dis pas" },
                  { id: "3", answer: "Apporte" },
                ],
                correction: {
                  correctAnswer: "Viens — Ne dis pas — Apporte",
                  explanation: "À l'impératif négatif, ne... pas encadre simplement le verbe : ne dis pas.",
                },
              },
              {
                id: "evt-g3",
                type: "association",
                skillId: "a2-gr-expressions-temporelles",
                difficulty: "A2",
                instructions: "Associe chaque expression de temps à son usage.",
                pairs: [
                  { id: "1", left: "à partir de 19h", right: "l'heure où l'événement commence" },
                  { id: "2", left: "avant le 15", right: "une date limite à respecter" },
                  { id: "3", left: "le vendredi 20", right: "le jour précis de l'événement" },
                ],
                correction: {
                  correctAnswer: "1 → début ; 2 → date limite ; 3 → jour précis.",
                  explanation: "Une invitation claire précise toujours le jour, l'heure de début et, si besoin, une date limite.",
                },
              },
              {
                id: "evt-g4",
                type: "remise_en_ordre",
                skillId: "a2-voc-evenements",
                difficulty: "A2",
                instructions: "Remets les étapes de l'organisation dans l'ordre logique.",
                items: [
                  { id: "1", text: "Réserver la salle" },
                  { id: "2", text: "Envoyer l'invitation aux collègues" },
                  { id: "3", text: "Récupérer l'argent pour le cadeau" },
                  { id: "4", text: "Fêter l'anniversaire" },
                ],
                correctOrder: ["1", "2", "3", "4"],
                correction: {
                  correctAnswer: "1 → 2 → 3 → 4.",
                  explanation: "On réserve d'abord le lieu, puis on invite, puis on organise le cadeau, et enfin on fête l'événement.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "evt-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "evt-ecriture-activite",
            title: "Écrire une invitation",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "evt-h",
                type: "production_ecrite",
                skillId: "a2-pe-repondre-invitation",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu organises une petite fête (anniversaire, pendaison de crémaillère...). Écris un message " +
                  "d'invitation à tes amis : l'occasion, le jour, l'heure, le lieu, et une instruction pratique " +
                  "(apporter quelque chose, confirmer sa présence...).",
                minWords: 40,
                maxWords: 70,
                correctionCriteria: [
                  "Occasion, jour et heure précisés (/2)",
                  "Lieu précisé (/1)",
                  "Au moins une instruction à l'impératif (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "evt-ecriture-activite-orale",
            title: "Inviter à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "evt-h-oral",
                type: "production_orale",
                skillId: "a2-pe-repondre-invitation",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Appelle un ami pour l'inviter à ta fête : donne l'occasion, le jour, l'heure et le lieu.",
                context: "Imagine que tu laisses un message vocal si ton ami ne répond pas.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai donné l'occasion de la fête.",
                  "J'ai précisé le jour, l'heure et le lieu.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Reprends la structure du message écrit de Manon : occasion, date, heure, lieu, instruction.",
              },
            ],
          },
        ],
      },
      {
        id: "evt-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "evt-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "evt-i1",
                type: "qcm",
                skillId: "a2-gr-imperatif",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "evt-i1-q",
                  prompt: "Forme correcte pour dire « ne pas être en retard » à un groupe d'amis (vous) :",
                  choices: [
                    { id: "a", text: "Ne soyez pas en retard." },
                    { id: "b", text: "Ne êtes pas en retard." },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Ne soyez pas en retard.",
                    explanation: "L'impératif de « être » à la 2e personne du pluriel est « soyez », jamais « êtes ».",
                  },
                },
              },
              {
                id: "evt-i2",
                type: "reponse_courte",
                skillId: "a2-voc-evenements",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel verbe utiliser pour dire qu'on donne de l'argent ensemble pour un cadeau : se ___ ?",
                acceptedAnswers: ["cotiser", "se cotiser"],
                correction: {
                  correctAnswer: "se cotiser",
                  explanation: "« Se cotiser » = mettre de l'argent en commun pour un achat collectif.",
                },
              },
              {
                id: "evt-i3",
                type: "vrai_faux",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message de Manon.",
                statement: "Manon demande d'apporter un petit gâteau ou une boisson.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« apportez un petit gâteau ou une boisson pour le buffet »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "a2-parler-de-ses-projets-de-vacances",
    slug: "parler-de-ses-projets-de-vacances",
    level: "A2",
    title: "Parler de ses projets de vacances",
    description:
      "À la fin de ce module, tu pourras parler de tes projets de vacances et exprimer une condition simple pour les réaliser.",
    objectives: [
      "Parler de projets et d'intentions pour les vacances",
      "Exprimer une condition simple avec si + présent",
      "Comprendre les projets de vacances de quelqu'un d'autre",
    ],
    domain: "grammaire",
    stageId: "a2-consolidation",
    estimatedMinutes: 24,
    situation:
      "Pendant la pause déjeuner, Inès et Paul parlent de leurs projets pour les vacances d'été, qui dépendent encore de quelques conditions.",
    vocabulary: [
      { term: "des vacances", category: "principal" },
      { term: "des congés", category: "principal" },
      { term: "prévoir", category: "verbe" },
      { term: "réserver à l'avance", category: "expression" },
      { term: "un projet", category: "principal" },
      { term: "une intention", category: "principal" },
      { term: "si possible", category: "expression" },
      { term: "avoir envie de", category: "expression" },
      { term: "profiter de", category: "verbe" },
      { term: "un budget", category: "principal" },
      { term: "hésiter entre", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Le futur simple pour parler de projets",
        explanation:
          "Pour un projet plus ou moins certain, on utilise le futur simple : cet été, nous irons en Espagne ; je prendrai deux semaines de congés. Il reste proche du futur proche, mais donne une nuance un peu plus « décidée » ou un peu plus lointaine.",
      },
      {
        title: "Si + présent, futur ou impératif (condition élémentaire)",
        explanation:
          "Pour exprimer une condition réalisable et sa conséquence : si j'ai des congés en juillet, j'irai voir ma famille. Le verbe après « si » reste toujours au présent, jamais au futur (on ne dit pas « si j'aurai »).",
      },
    ],
    examLinks: ["DELF A2 — production orale (entretien dirigé, projets)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "proj-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "proj-comprendre-activite",
            title: "Lire un message sur des projets de vacances",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "proj-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Lisez le message qu'Inès envoie à sa sœur, puis répondez.",
                text:
                  "Coucou !\n\n" +
                  "Je voulais te parler de mes projets pour cet été. Si mon responsable accepte mes dates, je " +
                  "prendrai deux semaines de congés en juillet. J'hésite encore entre la montagne et la mer, " +
                  "mais si le budget le permet, j'aimerais bien aller en Italie avec Paul : on adore tous les " +
                  "deux la cuisine italienne !\n\n" +
                  "Si on part, on réservera l'hôtel à l'avance, parce que c'est moins cher. Et toi, tu as des " +
                  "projets pour tes vacances ?\n\nBisous, Inès",
                questions: [
                  {
                    kind: "qcm",
                    id: "proj-e-q1",
                    prompt: "De quoi dépendent les vacances d'Inès en premier lieu ?",
                    choices: [
                      { id: "a", text: "De l'accord de son responsable pour les dates." },
                      { id: "b", text: "De la météo en juillet." },
                      { id: "c", text: "De l'avis de sa sœur." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "De l'accord de son responsable pour les dates.",
                      explanation: "« Si mon responsable accepte mes dates, je prendrai deux semaines de congés »." ,
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "proj-e-q2",
                    prompt: "Vrai ou faux : Inès a déjà réservé son hôtel en Italie.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Elle dit « si on part, on réservera l'hôtel à l'avance » : rien n'est réservé pour le moment.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "proj-e-q3",
                    prompt: "Pourquoi Inès et Paul veulent-ils réserver l'hôtel à l'avance ?",
                    expectedAnswer: "Parce que c'est moins cher.",
                    correction: {
                      correctAnswer: "Parce que c'est moins cher.",
                      explanation: "« on réservera l'hôtel à l'avance, parce que c'est moins cher »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "proj-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "proj-entrainement-activite",
            title: "Exprimer un projet et une condition",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "proj-g1",
                type: "qcm",
                skillId: "a2-gr-si-condition-elementaire",
                difficulty: "A2",
                instructions: "Choisis la phrase correcte.",
                question: {
                  kind: "qcm",
                  id: "proj-g1-q",
                  prompt: "Condition + conséquence correcte :",
                  choices: [
                    { id: "a", text: "Si j'aurai des congés, je partirai." },
                    { id: "b", text: "Si j'ai des congés, je partirai." },
                    { id: "c", text: "Si j'ai des congés, je partirai au futur." },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "Si j'ai des congés, je partirai.",
                    explanation: "Après « si » de condition réelle, le verbe reste au présent ; c'est la conséquence, dans l'autre partie de la phrase, qui peut être au futur.",
                    rappelRegle: "si + présent, ... futur (jamais « si » + futur).",
                  },
                },
              },
              {
                id: "proj-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Complète avec le verbe entre parenthèses au futur simple.",
                textWithBlanks:
                  "Si j'ai assez d'argent, je {{1}} (aller) en Italie. Nous {{2}} (visiter) Rome et Paul {{3}} (manger) des pâtes tous les jours !",
                blanks: [
                  { id: "1", answer: "irai" },
                  { id: "2", answer: "visiterons" },
                  { id: "3", answer: "mangera" },
                ],
                correction: {
                  correctAnswer: "irai — visiterons — mangera",
                  explanation: "« aller » est irrégulier au futur simple (j'irai) ; « visiter » et « manger » sont réguliers.",
                },
              },
              {
                id: "proj-g3",
                type: "association",
                skillId: "a2-voc-projets",
                difficulty: "A2",
                instructions: "Associe chaque condition à sa conséquence logique.",
                pairs: [
                  { id: "1", left: "Si mon responsable accepte mes dates,", right: "je prendrai deux semaines de congés." },
                  { id: "2", left: "Si le budget le permet,", right: "nous irons en Italie." },
                  { id: "3", left: "Si on part,", right: "on réservera l'hôtel à l'avance." },
                ],
                correction: {
                  correctAnswer: "1 → congés ; 2 → Italie ; 3 → réservation.",
                  explanation: "Chaque condition du message d'Inès a sa propre conséquence clairement énoncée.",
                },
              },
              {
                id: "proj-g4",
                type: "vrai_faux",
                skillId: "a2-gr-si-condition-elementaire",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "On peut dire « si j'aurai le temps, je viendrai ».",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Après « si » de condition, le verbe est toujours au présent : « si j'ai le temps », jamais « si j'aurai ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "proj-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "proj-ecriture-activite",
            title: "Écrire ses projets de vacances",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "proj-h",
                type: "production_ecrite",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Écris un message à un ami pour parler de tes projets de vacances : où tu aimerais aller, avec " +
                  "qui, et une condition qui doit se réaliser pour que ce projet marche (si + présent).",
                minWords: 40,
                maxWords: 70,
                correctionCriteria: [
                  "Un projet de vacances clairement présenté (/2)",
                  "Au moins une phrase avec si + présent (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "proj-ecriture-activite-orale",
            title: "Parler de ses projets à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "proj-h-oral",
                type: "production_orale",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Présente tes projets de vacances comme Inès : la destination souhaitée et une condition pour que ça marche.",
                context: "Tu peux inventer ta situation si tu préfères.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai présenté un projet de vacances.",
                  "J'ai utilisé si + présent pour une condition.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Une seule condition suffit : pas besoin d'en empiler plusieurs.",
              },
            ],
          },
        ],
      },
      {
        id: "proj-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "proj-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "proj-i1",
                type: "qcm",
                skillId: "a2-gr-si-condition-elementaire",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "proj-i1-q",
                  prompt: "« Si tu ___ (avoir) le temps, appelle-moi. »",
                  choices: [
                    { id: "a", text: "as" },
                    { id: "b", text: "auras" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "as",
                    explanation: "Après « si » de condition, le présent est obligatoire.",
                  },
                },
              },
              {
                id: "proj-i2",
                type: "reponse_courte",
                skillId: "a2-voc-projets",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel mot désigne les jours de repos donnés par l'employeur : des ___ ?",
                acceptedAnswers: ["congés", "conges"],
                correction: {
                  correctAnswer: "congés",
                  explanation: "« Des congés » = des jours d'absence autorisée par l'employeur, notamment pour les vacances.",
                },
              },
              {
                id: "proj-i3",
                type: "vrai_faux",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message d'Inès.",
                statement: "Inès hésite entre la montagne et la mer pour ses vacances.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« J'hésite encore entre la montagne et la mer »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "a2-raconter-une-experience-recente",
    slug: "raconter-une-experience-recente",
    level: "A2",
    title: "Raconter une expérience récente",
    description:
      "À la fin de ce module, tu pourras raconter brièvement un souvenir marquant en le situant dans le temps.",
    objectives: [
      "Raconter un souvenir bref avec passé composé et imparfait",
      "Décrire le contexte d'un souvenir avec l'imparfait",
      "Relier deux phrases avec un pronom relatif qui ou que",
    ],
    domain: "production_ecrite",
    stageId: "a2-consolidation",
    estimatedMinutes: 26,
    situation:
      "Sur le forum de son cours de français, Théo raconte une rencontre inoubliable pendant un voyage récent.",
    vocabulary: [
      { term: "un souvenir", category: "principal" },
      { term: "marquant(e)", category: "principal" },
      { term: "se souvenir de", category: "verbe" },
      { term: "une rencontre", category: "principal" },
      { term: "inoubliable", category: "principal" },
      { term: "surprenant(e)", category: "principal" },
      { term: "par hasard", category: "expression" },
      { term: "garder contact", category: "expression" },
      { term: "un moment", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Passé composé et imparfait pour un petit récit",
        explanation:
          "Le passé composé raconte les actions du récit (j'ai rencontré, on a parlé) ; l'imparfait décrit le contexte ou une habitude (il faisait beau, j'étais un peu perdu). Ne pas les mélanger au hasard : l'action au premier plan est presque toujours au passé composé.",
      },
      {
        title: "Les pronoms relatifs qui et que",
        explanation:
          "« Qui » remplace le sujet de la deuxième phrase : j'ai rencontré une femme. Cette femme parlait trois langues. → J'ai rencontré une femme qui parlait trois langues. « Que » remplace le complément : c'est un souvenir. Je n'oublierai jamais ce souvenir. → C'est un souvenir que je n'oublierai jamais.",
      },
    ],
    examLinks: ["DELF A2 — production écrite", "DELF A2 — production orale"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "a2-exp-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "a2-exp-comprendre-activite",
            title: "Lire le récit de Théo",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "a2-exp-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Lisez le message que Théo poste sur le forum de son cours, puis répondez.",
                text:
                  "La semaine dernière, j'ai fait un voyage en train jusqu'à Marseille. Il faisait très chaud et " +
                  "le train était complet. À côté de moi, il y avait une dame âgée qui a commencé à me parler par " +
                  "hasard. C'était une ancienne professeure de français ! On a discuté pendant tout le trajet, " +
                  "elle m'a donné plein de conseils pour apprendre plus vite. À l'arrivée, on a échangé nos " +
                  "numéros pour garder contact. C'est vraiment une rencontre que je n'oublierai jamais.",
                questions: [
                  {
                    kind: "qcm",
                    id: "a2-exp-e-q1",
                    prompt: "Où était Théo quand il a fait cette rencontre ?",
                    choices: [
                      { id: "a", text: "Dans un train." },
                      { id: "b", text: "Dans un café." },
                      { id: "c", text: "Dans une salle de classe." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "Dans un train.", explanation: "Il raconte « j'ai fait un voyage en train »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "a2-exp-e-q2",
                    prompt: "Vrai ou faux : la dame était professeure d'anglais.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "« C'était une ancienne professeure de français »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "a2-exp-e-q3",
                    prompt: "Qu'est-ce que Théo et la dame ont fait à la fin du trajet ?",
                    expectedAnswer: "Ils ont échangé leurs numéros pour garder contact.",
                    correction: {
                      correctAnswer: "Ils ont échangé leurs numéros.",
                      explanation: "« on a échangé nos numéros pour garder contact »." ,
                    },
                  },
                  {
                    kind: "qcm",
                    id: "a2-exp-e-q4",
                    prompt: "Quel temps faisait-il pendant le voyage ?",
                    choices: [
                      { id: "a", text: "Il faisait très chaud." },
                      { id: "b", text: "Il pleuvait." },
                      { id: "c", text: "Il faisait froid." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "Il faisait très chaud.", explanation: "« Il faisait très chaud », précise Théo — une description à l'imparfait." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a2-exp-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "a2-exp-entrainement-activite",
            title: "Raconter avec qui et que",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-exp-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-passe-compose-imparfait-contraste",
                difficulty: "A2",
                instructions: "Complète avec le verbe entre parenthèses, au passé composé ou à l'imparfait selon le sens.",
                textWithBlanks:
                  "Hier, il {{1}} (faire) beau quand je {{2}} (sortir) me promener. Tout à coup, je {{3}} " +
                  "(rencontrer) un ancien collègue.",
                blanks: [
                  { id: "1", answer: "faisait" },
                  { id: "2", answer: "suis sorti" },
                  { id: "3", answer: "ai rencontré" },
                ],
                correction: {
                  correctAnswer: "faisait — suis sorti — ai rencontré",
                  explanation: "« Il faisait beau » décrit le contexte (imparfait) ; « je suis sorti » et « j'ai rencontré » sont les actions du récit (passé composé).",
                },
              },
              {
                id: "a2-exp-g2",
                type: "qcm",
                skillId: "a2-gr-relatifs-qui-que",
                difficulty: "A2",
                instructions: "Choisis le bon pronom relatif.",
                question: {
                  kind: "qcm",
                  id: "a2-exp-g2-q",
                  prompt: "« J'ai rencontré une dame ___ parlait trois langues. »",
                  choices: [
                    { id: "a", text: "qui" },
                    { id: "b", text: "que" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "qui",
                    explanation: "« Qui » remplace le sujet de « parlait » (c'est la dame qui parlait) : on utilise donc « qui ».",
                  },
                },
              },
              {
                id: "a2-exp-g3",
                type: "association",
                skillId: "a2-gr-relatifs-qui-que",
                difficulty: "A2",
                instructions: "Associe chaque début de phrase à sa suite avec qui ou que.",
                pairs: [
                  { id: "1", left: "C'est un souvenir", right: "que je n'oublierai jamais." },
                  { id: "2", left: "J'ai rencontré une dame", right: "qui était très gentille." },
                  { id: "3", left: "C'est une rencontre", right: "que j'ai beaucoup appréciée." },
                ],
                correction: {
                  correctAnswer: "1 → que ; 2 → qui ; 3 → que.",
                  explanation: "« Qui » remplace un sujet, « que » remplace un complément déjà présent dans la deuxième phrase.",
                },
              },
              {
                id: "a2-exp-g4",
                type: "vrai_faux",
                skillId: "a2-gr-passe-compose-imparfait-contraste",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "Dans un récit, l'imparfait sert surtout à décrire le contexte ou une habitude, pas à raconter une action précise.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "L'action précise du récit (ce qui avance l'histoire) se met presque toujours au passé composé.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a2-exp-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "a2-exp-ecriture-activite",
            title: "Raconter un souvenir par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-exp-h",
                type: "production_ecrite",
                skillId: "a2-pe-raconter-brievement",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Raconte brièvement une rencontre ou un souvenir marquant que tu as vécu (voyage, sortie, événement...). " +
                  "Utilise le passé composé pour les actions et l'imparfait pour décrire le contexte, et au moins un « qui » ou « que ».",
                minWords: 50,
                maxWords: 90,
                correctionCriteria: [
                  "Le récit est clairement situé dans le temps (/2)",
                  "Passé composé et imparfait tous les deux utilisés (/2)",
                  "Au moins un pronom relatif qui/que (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "a2-exp-ecriture-activite-orale",
            title: "Raconter un souvenir à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-exp-h-oral",
                type: "production_orale",
                skillId: "a2-pe-raconter-brievement",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Raconte à voix haute le même souvenir que tu viens d'écrire, comme si tu le racontais à un ami.",
                context: "Reprends l'histoire de ton message écrit, mais raconte-la naturellement, sans la lire mot à mot.",
                prepSeconds: 45,
                maxSpeakSeconds: 60,
                selfAssessmentCriteria: [
                  "J'ai situé mon récit dans le temps.",
                  "J'ai utilisé le passé composé et l'imparfait.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Pas besoin de tout redire exactement comme à l'écrit : l'important est que l'histoire reste claire.",
              },
            ],
          },
        ],
      },
      {
        id: "a2-exp-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "a2-exp-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-exp-i1",
                type: "qcm",
                skillId: "a2-gr-relatifs-qui-que",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "a2-exp-i1-q",
                  prompt: "« C'est un livre ___ j'ai adoré. »",
                  choices: [
                    { id: "a", text: "qui" },
                    { id: "b", text: "que" },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "que",
                    explanation: "« Que » remplace le complément d'objet de « j'ai adoré » (j'ai adoré ce livre).",
                  },
                },
              },
              {
                id: "a2-exp-i2",
                type: "reponse_courte",
                skillId: "a2-voc-experiences",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel adjectif décrit un souvenir qu'on ne peut jamais oublier : ___ ?",
                acceptedAnswers: ["inoubliable"],
                correction: {
                  correctAnswer: "inoubliable",
                  explanation: "« Inoubliable » = qu'on ne peut pas oublier, forcément marquant.",
                },
              },
              {
                id: "a2-exp-i3",
                type: "vrai_faux",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le récit de Théo.",
                statement: "Théo et la dame ont échangé leurs numéros de téléphone.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« on a échangé nos numéros pour garder contact »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "a2-comprendre-annonces-et-programmes",
    slug: "comprendre-annonces-et-programmes",
    level: "A2",
    title: "Comprendre des annonces et des programmes",
    description:
      "À la fin de ce module, tu pourras comprendre un programme d'événements et une annonce, et en reconstituer la chronologie.",
    objectives: [
      "Comprendre un programme d'événements",
      "Comprendre une annonce audio liée à un programme",
      "Remettre en ordre une chronologie simple",
    ],
    domain: "comprehension_ecrite",
    stageId: "a2-consolidation",
    estimatedMinutes: 22,
    situation:
      "Yasmine consulte le programme de la fête de son quartier, puis écoute une annonce diffusée sur place pour connaître un changement d'horaire.",
    vocabulary: [
      { term: "un programme", category: "principal" },
      { term: "une chronologie", category: "principal" },
      { term: "se dérouler", category: "verbe" },
      { term: "à partir de", category: "connecteur" },
      { term: "jusqu'à", category: "connecteur" },
      { term: "un stand", category: "principal" },
      { term: "un créneau", category: "principal" },
      { term: "en cas de", category: "expression" },
      { term: "reporter", category: "verbe" },
      { term: "avoir lieu", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Les pronoms y et en (introduction)",
        explanation:
          "« Y » remplace un lieu déjà mentionné : tu vas à la fête ? Oui, j'y vais à 15h. « En » remplace une quantité ou « de + nom » déjà mentionné : il y a des stands ? Oui, il y en a beaucoup. Ces deux pronoms évitent de répéter le nom une deuxième fois.",
      },
      {
        title: "Quantité et partitifs (reprise)",
        explanation:
          "Dans un programme ou une annonce, on retrouve souvent des quantités : plusieurs stands, beaucoup de monde, un peu de retard. Ces expressions, déjà vues pour les courses, servent aussi à décrire un événement.",
      },
    ],
    examLinks: ["DELF A2 — compréhension des écrits", "DELF A2 — compréhension de l'oral"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "annonce-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "annonce-comprendre-activite",
            title: "Lire le programme de la fête de quartier",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "annonce-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-programmes-horaires",
                difficulty: "A2",
                instructions: "Lisez le programme, puis répondez.",
                text:
                  "FÊTE DU QUARTIER DES PLATANES — Dimanche 8, place centrale\n\n" +
                  "10h : ouverture des stands (artisanat, associations)\n" +
                  "11h30 : atelier cuisine pour les enfants, jusqu'à 12h30\n" +
                  "13h : repas partagé, chacun apporte un plat\n" +
                  "16h : spectacle de danse\n" +
                  "18h : clôture de la fête\n\n" +
                  "En cas de pluie, le repas partagé et le spectacle de danse seront reportés au dimanche suivant.",
                questions: [
                  {
                    kind: "qcm",
                    id: "annonce-e-q1",
                    prompt: "À quelle heure ouvrent les stands ?",
                    choices: [
                      { id: "a", text: "10h." },
                      { id: "b", text: "11h30." },
                      { id: "c", text: "13h." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "10h.", explanation: "Le programme l'indique en première ligne." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "annonce-e-q2",
                    prompt: "Vrai ou faux : l'atelier cuisine dure une heure.",
                    correctAnswer: true,
                    correction: {
                      correctAnswer: "Vrai.",
                      explanation: "De 11h30 à 12h30, cela fait exactement une heure.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "annonce-e-q3",
                    prompt: "Que se passe-t-il pour le repas partagé s'il pleut ?",
                    expectedAnswer: "Il est reporté au dimanche suivant.",
                    correction: {
                      correctAnswer: "Il est reporté au dimanche suivant.",
                      explanation: "« le repas partagé et le spectacle de danse seront reportés au dimanche suivant »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "annonce-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "annonce-ecoute-activite",
            title: "Écouter le programme culturel à la radio",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "annonce-co",
                type: "comprehension_orale",
                skillId: "a2-co-annonces-publiques",
                difficulty: "A2",
                instructions: "Écoutez le programme culturel de la semaine, puis répondez.",
                audioSrc: "/audio/a2/a2-programme-radio-culturel.m4a",
                transcript:
                  "Passons maintenant au programme culturel de la semaine. Mercredi, ne manquez pas le marché aux fleurs sur la place centrale, toute la journée. Vendredi soir, un concert gratuit de musique jazz aura lieu au parc municipal, à partir de vingt heures ; en cas de pluie, il sera déplacé à la salle des fêtes. Enfin, samedi et dimanche, le musée d'histoire ouvre gratuitement ses portes à tous les visiteurs, à l'occasion de son trentième anniversaire. Voilà pour cette semaine, je vous souhaite un excellent programme !",
                questions: [
                  {
                    kind: "qcm",
                    id: "annonce-co-q1",
                    prompt: "Où a lieu le concert de jazz ?",
                    choices: [
                      { id: "a", text: "À la salle des fêtes" },
                      { id: "b", text: "Au parc municipal" },
                      { id: "c", text: "Au musée" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Au parc municipal",
                      explanation: "Le concert « aura lieu au parc municipal », la salle des fêtes n'étant qu'une solution de repli.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "annonce-co-q2",
                    prompt: "En cas de pluie, le concert est annulé.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux", explanation: "Il n'est pas annulé mais « déplacé à la salle des fêtes »." },
                  },
                  {
                    kind: "qcm",
                    id: "annonce-co-q3",
                    prompt: "Pourquoi le musée est-il gratuit ce week-end ?",
                    choices: [
                      { id: "a", text: "C'est son anniversaire" },
                      { id: "b", text: "Ce sont les vacances" },
                      { id: "c", text: "C'est un jour férié" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "C'est son anniversaire",
                      explanation: "L'animateur précise : « à l'occasion de son trentième anniversaire ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "annonce-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "annonce-entrainement-activite",
            title: "Utiliser y, en, et remettre en ordre",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "annonce-g1",
                type: "qcm",
                skillId: "a2-gr-y-en-introduction",
                difficulty: "A2",
                instructions: "Choisis le pronom correct.",
                question: {
                  kind: "qcm",
                  id: "annonce-g1-q",
                  prompt: "« Tu vas à la fête ? » — « Oui, ___ vais à 15h. »",
                  choices: [
                    { id: "a", text: "y" },
                    { id: "b", text: "en" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "y",
                    explanation: "« Y » remplace un lieu déjà mentionné (« à la fête »).",
                  },
                },
              },
              {
                id: "annonce-g2",
                type: "qcm",
                skillId: "a2-gr-y-en-introduction",
                difficulty: "A2",
                instructions: "Choisis le pronom correct.",
                question: {
                  kind: "qcm",
                  id: "annonce-g2-q",
                  prompt: "« Il y a des stands ? » — « Oui, il y ___ a beaucoup. »",
                  choices: [
                    { id: "a", text: "y" },
                    { id: "b", text: "en" },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "en",
                    explanation: "« En » remplace une quantité (« des stands ») déjà mentionnée.",
                  },
                },
              },
              {
                id: "annonce-g3",
                type: "remise_en_ordre",
                skillId: "a2-ce-programmes-horaires",
                difficulty: "A2",
                instructions: "Remets les moments de la fête dans l'ordre chronologique.",
                items: [
                  { id: "1", text: "Ouverture des stands" },
                  { id: "2", text: "Atelier cuisine pour les enfants" },
                  { id: "3", text: "Repas partagé" },
                  { id: "4", text: "Spectacle de danse" },
                ],
                correctOrder: ["1", "2", "3", "4"],
                correction: {
                  correctAnswer: "1 → 2 → 3 → 4.",
                  explanation: "L'ordre suit exactement les horaires du programme : 10h, 11h30, 13h, 16h.",
                },
              },
              {
                id: "annonce-g4",
                type: "vrai_faux",
                skillId: "a2-gr-quantite-partitifs",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Il y en a beaucoup » veut dire qu'il n'y a presque rien.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Beaucoup » indique une grande quantité, tout le contraire de « presque rien ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "annonce-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "annonce-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "annonce-i1",
                type: "qcm",
                skillId: "a2-gr-y-en-introduction",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "annonce-i1-q",
                  prompt: "« Tu penses aller au spectacle ? » — « Oui, je ___ pense. »",
                  choices: [
                    { id: "a", text: "y" },
                    { id: "b", text: "en" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "y",
                    explanation: "« Penser à + chose » se remplace par « y » : j'y pense.",
                  },
                },
              },
              {
                id: "annonce-i2",
                type: "reponse_courte",
                skillId: "a2-voc-evenements",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel verbe utiliser pour dire qu'un événement est déplacé à une date plus tard : ___ ?",
                acceptedAnswers: ["reporter"],
                correction: {
                  correctAnswer: "reporter",
                  explanation: "« Reporter » un événement = le déplacer à une date ultérieure.",
                },
              },
              {
                id: "annonce-i3",
                type: "vrai_faux",
                skillId: "a2-co-annonces-publiques",
                difficulty: "A2",
                instructions: "Item 3. D'après l'annonce écoutée.",
                statement: "L'annonce dit que la fête est annulée à cause de la pluie.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'annonce parle seulement d'un léger retard des artisans, pas d'une annulation.",
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "a2-bilan-a2",
    slug: "bilan-a2",
    level: "A2",
    title: "Bilan A2 : se présenter à un examen",
    description:
      "À la fin de ce module, tu pourras mobiliser l'ensemble des compétences A2 dans un cadre proche d'un examen (DELF A2), à l'écrit comme à l'oral.",
    objectives: [
      "Mobiliser les 4 compétences (compréhension écrite/orale, production écrite/orale) sur un format proche du DELF A2",
      "Réviser les notions grammaticales clés du parcours A2",
      "Se préparer aux conditions de gestion du temps d'un examen",
    ],
    domain: "comprehension_ecrite",
    stageId: "a2-consolidation",
    estimatedMinutes: 32,
    situation:
      "De retour au Café des langues, Nadia (rencontrée au module 1) retrouve Hugo pour un bilan avant de continuer vers le niveau B1 : ils reprennent ensemble compréhension, écriture et prise de parole sur des supports variés.",
    vocabulary: [
      { term: "un bilan", category: "principal" },
      { term: "réviser", category: "verbe" },
      { term: "progresser", category: "verbe" },
      { term: "être à l'aise", category: "expression" },
      { term: "un point fort", category: "principal" },
      { term: "un point à travailler", category: "expression" },
      { term: "se sentir prêt(e)", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Cause et conséquence (récapitulatif)",
        explanation:
          "Pour expliquer une situation, on relie une cause et une conséquence : je suis content parce que j'ai progressé, donc je me sens prêt pour la suite. « Parce que »/« car » introduisent la cause ; « donc »/« alors » introduisent la conséquence.",
      },
      {
        title: "Récapitulatif transversal",
        explanation:
          "Ce bilan reprend des notions vues tout au long du parcours A2 : présent, passé composé, imparfait, futur (proche et simple), impératif, comparatif, pronoms (COD, COI, y, en, qui/que) et connecteurs simples. L'objectif n'est pas d'apprendre du nouveau, mais de vérifier que tout reste solide avant le B1.",
      },
    ],
    examLinks: ["DELF A2 et TCF IRN — bilan transversal des 4 compétences"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "bilan-a2-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "bilan-a2-comprendre-activite",
            title: "Lire le message de Nadia",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "bilan-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez le message que Nadia envoie à Hugo avant leur rencontre, puis répondez.",
                text:
                  "Bonjour Hugo,\n\n" +
                  "J'ai beaucoup progressé depuis notre première rencontre au Café des langues, il y a presque " +
                  "un an ! Je me sens vraiment plus à l'aise pour parler de mon quotidien, faire mes démarches " +
                  "et raconter des souvenirs. Par contre, j'hésite encore un peu avec les temps du passé, donc " +
                  "j'aimerais qu'on révise ça ensemble avant que je commence le niveau B1.\n\n" +
                  "Est-ce qu'on peut se voir samedi matin, comme d'habitude ?\n\nÀ bientôt, Nadia",
                questions: [
                  {
                    kind: "qcm",
                    id: "bilan-e-q1",
                    prompt: "Depuis quand Nadia et Hugo se connaissent-ils ?",
                    choices: [
                      { id: "a", text: "Depuis presque un an." },
                      { id: "b", text: "Depuis une semaine." },
                      { id: "c", text: "Depuis toujours." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "Depuis presque un an.", explanation: "« il y a presque un an » précise la durée écoulée." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "bilan-e-q2",
                    prompt: "Vrai ou faux : Nadia se sent totalement à l'aise avec les temps du passé.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Elle dit « j'hésite encore un peu avec les temps du passé »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "bilan-e-q3",
                    prompt: "Pourquoi Nadia veut-elle réviser avec Hugo ?",
                    expectedAnswer: "Parce qu'elle va bientôt commencer le niveau B1.",
                    correction: {
                      correctAnswer: "Parce qu'elle va commencer le B1.",
                      explanation: "« avant que je commence le niveau B1 »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-a2-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "bilan-a2-ecoute-activite",
            title: "Écouter un récit de journée",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "bilan-co",
                type: "comprehension_orale",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Écoutez ce récit d'une journée bien remplie, puis répondez.",
                audioSrc: "/audio/a2/bilan-a2-recit-journee-chronologie.m4a",
                transcript:
                  "Hier, ma journée a été bien remplie. D'abord, le matin, j'ai emmené les enfants à l'école, puis je suis allée travailler jusqu'à midi. À midi, j'ai déjeuné rapidement avec une collègue. L'après-midi, j'ai eu une réunion importante avec mon chef, ça s'est très bien passé. Enfin, le soir, je suis allée chercher les enfants, et on a préparé le dîner ensemble. Demain, comme la réunion s'est bien passée, je pense que je vais enfin pouvoir commencer le nouveau projet dont on parlait depuis longtemps.",
                questions: [
                  {
                    kind: "qcm",
                    id: "bilan-co-q1",
                    prompt: "Qu'a fait la narratrice en premier, le matin ?",
                    choices: [
                      { id: "a", text: "Une réunion avec son chef" },
                      { id: "b", text: "Emmener les enfants à l'école" },
                      { id: "c", text: "Préparer le dîner" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Emmener les enfants à l'école", explanation: "Elle dit : « d'abord, le matin, j'ai emmené les enfants à l'école »." },
                  },
                  {
                    kind: "qcm",
                    id: "bilan-co-q2",
                    prompt: "Qu'a-t-elle fait l'après-midi ?",
                    choices: [
                      { id: "a", text: "Une réunion avec son chef" },
                      { id: "b", text: "Un déjeuner avec une collègue" },
                      { id: "c", text: "Aller chercher les enfants" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Une réunion avec son chef",
                      explanation: "Elle raconte : « l'après-midi, j'ai eu une réunion importante avec mon chef ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "bilan-co-q3",
                    prompt: "Que va-t-elle probablement faire demain ?",
                    choices: [
                      { id: "a", text: "Reprendre ses vacances" },
                      { id: "b", text: "Commencer le nouveau projet" },
                      { id: "c", text: "Chercher un autre travail" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Commencer le nouveau projet",
                      explanation: "Elle conclut : « je pense que je vais enfin pouvoir commencer le nouveau projet ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-a2-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "bilan-a2-ecriture-activite",
            title: "Production écrite transversale",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "bilan-h",
                type: "production_ecrite",
                skillId: "a2-pe-raconter-brievement",
                difficulty: "A2",
                instructions: "Rédige ta réponse, comme à l'examen.",
                consigne:
                  "Raconte un souvenir des derniers mois qui montre tes progrès en français (une démarche réussie, " +
                  "une conversation, une sortie...). Explique pourquoi ce souvenir est important pour toi (parce " +
                  "que / donc).",
                minWords: 60,
                maxWords: 100,
                correctionCriteria: [
                  "Récit clairement situé dans le temps, passé composé/imparfait utilisés (/2)",
                  "Une cause et une conséquence exprimées (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "bilan-a2-ecriture-activite-orale",
            title: "Production orale calibrée DELF A2",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "bilan-h-oral",
                type: "production_orale",
                skillId: "a2-pe-se-presenter",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi — conditions proches de l'épreuve réelle.",
                consigne:
                  "Présente-toi et parle de tes progrès en français depuis que tu as commencé : ce que tu sais " +
                  "mieux faire maintenant, et ce que tu veux encore travailler.",
                context: "Imagine que tu passes la partie « monologue suivi » de l'épreuve de production orale du DELF A2.",
                prepSeconds: 60,
                maxSpeakSeconds: 90,
                selfAssessmentCriteria: [
                  "Je me suis présenté clairement.",
                  "J'ai parlé d'au moins un progrès réel.",
                  "J'ai mentionné un point que je veux encore travailler.",
                  "Mon discours est compréhensible d'un bout à l'autre.",
                ],
                tips: "Pas de mauvaise réponse : l'objectif est de parler 60 à 90 secondes de façon claire et organisée, pas de tout dire parfaitement.",
              },
            ],
          },
        ],
      },
      {
        id: "bilan-a2-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "bilan-a2-evaluation-activite",
            title: "Bilan transversal du niveau A2",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "bilan-i1",
                type: "qcm",
                skillId: "a2-gr-passe-compose-imparfait-contraste",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "bilan-i1-q",
                  prompt: "« Quand je suis arrivé, il ___ (pleuvoir). »",
                  choices: [
                    { id: "a", text: "pleuvait" },
                    { id: "b", text: "a plu" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "pleuvait",
                    explanation: "C'est le contexte au moment de l'arrivée (description) : imparfait.",
                  },
                },
              },
              {
                id: "bilan-i2",
                type: "qcm",
                skillId: "a2-gr-cause-simple",
                difficulty: "A2",
                instructions: "Item 2.",
                question: {
                  kind: "qcm",
                  id: "bilan-i2-q",
                  prompt: "« Je suis content ___ j'ai progressé. »",
                  choices: [
                    { id: "a", text: "parce que" },
                    { id: "b", text: "donc" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "parce que",
                    explanation: "« Parce que » introduit la cause de ce contentement ; « donc » introduirait plutôt une conséquence.",
                  },
                },
              },
              {
                id: "bilan-i3",
                type: "reponse_courte",
                skillId: "a2-gr-consequence-simple",
                difficulty: "A2",
                instructions: "Item 3.",
                question: "Quel connecteur de conséquence peut remplacer « donc » dans une phrase simple ?",
                acceptedAnswers: ["alors"],
                correction: {
                  correctAnswer: "alors",
                  explanation: "« Donc » et « alors » introduisent tous les deux une conséquence.",
                },
              },
              {
                id: "bilan-i4",
                type: "vrai_faux",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Item 4. D'après le dialogue écouté.",
                statement: "Nadia dit qu'elle n'arrive jamais à parler de son quotidien en français.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Elle dit au contraire « je peux parler de mon quotidien... sans trop chercher mes mots »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
