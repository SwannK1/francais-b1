import type { Module } from "@/lib/pedagogy/types";

/**
 * Modules A2 — Phase Intermédiaire (« Vivre son quotidien »), 8 modules.
 * Catalogue isolé du B1 (`lib/pedagogy/data/modules.ts`), voir
 * `docs/integration/a2-content.md`. Contenu 100% original, aucun sujet
 * DELF/TCF reproduit. Tutoiement systématique (cohérence avec le reste du
 * produit — voir `docs/b1/pedagogical-audit-2026.md` §13).
 */
export const MODULES_A2_PART2: Module[] = [
  {
    id: "a2-prendre-les-transports",
    slug: "prendre-les-transports-a2",
    level: "A2",
    title: "Prendre les transports",
    description:
      "À la fin de ce module, tu pourras comprendre une annonce dans une gare et expliquer ton trajet à quelqu'un.",
    objectives: [
      "Comprendre une annonce de retard ou de changement de quai",
      "Utiliser le futur proche pour annoncer une action prévue",
      "Expliquer un trajet avec des expressions temporelles",
    ],
    domain: "comprehension_orale",
    stageId: "a2-intermediaire",
    estimatedMinutes: 24,
    situation:
      "Karim est à la gare pour prendre son train habituel quand une annonce interrompt l'attente sur le " +
      "quai. Il envoie ensuite un message à sa collègue Salomé pour expliquer son trajet.",
    vocabulary: [
      { term: "un quai", category: "principal" },
      { term: "un retard", category: "principal" },
      { term: "une correspondance", category: "principal" },
      { term: "un billet", category: "principal" },
      { term: "un aller-retour", category: "principal" },
      { term: "composter", category: "verbe" },
      { term: "la ligne", category: "principal" },
      { term: "la prochaine station", category: "principal" },
      { term: "en avance", category: "expression" },
      { term: "en retard", category: "expression" },
      { term: "à l'heure", category: "expression" },
      { term: "dans dix minutes", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Le futur proche",
        explanation:
          "aller (au présent) + infinitif annonce une action très proche dans le temps : le train va partir, tu vas arriver en retard. C'est la façon la plus naturelle de parler d'un futur proche à l'oral.",
      },
      {
        title: "Les expressions temporelles",
        explanation:
          "« dans » + durée annonce un moment futur (le train part dans dix minutes), « depuis » + durée annonce un point de départ toujours valable (j'attends depuis vingt minutes). Ne pas confondre ces deux emplois.",
      },
    ],
    examLinks: ["DELF A2 — compréhension de l'oral (annonces)", "TCF IRN — compréhension orale"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "trans-comprendre",
        type: "comprendre",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "trans-comprendre-activite",
            title: "Écouter une annonce de gare",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "trans-e",
                type: "comprehension_orale",
                skillId: "a2-co-annonces-publiques",
                difficulty: "A2",
                instructions: "Écoutez l'annonce, puis répondez aux questions.",
                audioSrc: "/audio/a2/a2-transport-annonce-gare-simple.m4a",
                transcript:
                  "Attention, votre attention s'il vous plaît. Le train à destination de Lyon, départ dix heures quinze, partira voie B, voie B. Les voyageurs sont priés de se diriger vers la voie B.",
                questions: [
                  {
                    kind: "qcm",
                    id: "trans-e-q1",
                    prompt: "Quelle est la destination du train ?",
                    choices: [
                      { id: "a", text: "Lyon" },
                      { id: "b", text: "Paris" },
                      { id: "c", text: "Marseille" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Lyon",
                      explanation: "L'annonce précise : « le train à destination de Lyon ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "trans-e-q2",
                    prompt: "À quelle heure part le train ?",
                    choices: [
                      { id: "a", text: "10h50" },
                      { id: "b", text: "10h15" },
                      { id: "c", text: "15h10" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "10h15",
                      explanation: "L'annonce dit : « départ dix heures quinze ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "trans-e-q3",
                    prompt: "Le train part de la voie A.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux",
                      explanation: "L'annonce répète deux fois « voie B », pas voie A.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "trans-e-q4",
                    prompt: "De combien de temps est le retard ?",
                    expectedAnswer: "Environ quinze minutes.",
                    correction: {
                      correctAnswer: "Environ quinze minutes.",
                      explanation: "« un retard d'environ quinze minutes »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "trans-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "trans-entrainement-activite",
            title: "Parler de son trajet",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "trans-g1",
                type: "qcm",
                skillId: "a2-gr-futur-proche",
                difficulty: "A2",
                instructions: "Choisis la bonne forme du futur proche.",
                question: {
                  kind: "qcm",
                  id: "trans-g1-q",
                  prompt: "« Attention, le train ___ dans deux minutes ! »",
                  choices: [
                    { id: "a", text: "va partir" },
                    { id: "b", text: "vais partir" },
                    { id: "c", text: "va parti" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "va partir",
                    explanation: "Le futur proche se forme avec aller au présent (il/elle va) + l'infinitif du verbe (partir).",
                  },
                },
              },
              {
                id: "trans-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-expressions-temporelles",
                difficulty: "A2",
                instructions: "Complète avec « dans » ou « depuis ».",
                textWithBlanks:
                  "J'attends sur le quai {{1}} vingt minutes. Le prochain train arrive {{2}} cinq minutes.",
                blanks: [
                  { id: "1", answer: "depuis" },
                  { id: "2", answer: "dans" },
                ],
                correction: {
                  correctAnswer: "depuis — dans",
                  explanation: "« Depuis » indique une durée déjà écoulée (l'attente continue) ; « dans » annonce un moment futur.",
                  rappelRegle: "depuis = point de départ d'une situation qui continue ; dans = moment futur précis.",
                },
              },
              {
                id: "trans-g3",
                type: "association",
                skillId: "a2-voc-transports",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "une correspondance", right: "un changement de train ou de ligne" },
                  { id: "2", left: "composter", right: "valider son billet avant de monter" },
                  { id: "3", left: "un aller-retour", right: "un billet pour partir et pour revenir" },
                ],
                correction: {
                  correctAnswer: "1 → changement de train ; 2 → valider un billet ; 3 → billet aller et retour.",
                  explanation: "Ce vocabulaire revient très souvent dans les annonces et les guichets de gare.",
                },
              },
              {
                id: "trans-g4",
                type: "remise_en_ordre",
                skillId: "a2-gr-futur-proche",
                difficulty: "A2",
                instructions: "Remets la phrase dans le bon ordre.",
                items: [
                  { id: "1", text: "je" },
                  { id: "2", text: "vais" },
                  { id: "3", text: "arriver" },
                  { id: "4", text: "en retard" },
                ],
                correctOrder: ["1", "2", "3", "4"],
                correction: {
                  correctAnswer: "Je vais arriver en retard.",
                  explanation: "Sujet + aller conjugué + infinitif + complément : l'ordre habituel du futur proche.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "trans-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "trans-ecriture-activite",
            title: "Expliquer son trajet par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "trans-h",
                type: "production_ecrite",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Ton train a du retard et tu vas arriver en retard à un rendez-vous. Écris un message à la " +
                  "personne qui t'attend pour expliquer la situation et donner une nouvelle heure d'arrivée.",
                minWords: 30,
                maxWords: 50,
                correctionCriteria: [
                  "Raison du retard donnée (/2)",
                  "Nouvelle heure d'arrivée précisée avec le futur proche (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "trans-ecriture-activite-orale",
            title: "Expliquer son trajet à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "trans-h-oral",
                type: "production_orale",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Tu appelles un ami pour lui expliquer que ton train a du retard, et tu lui dis à quelle heure tu vas arriver.",
                context: "Même situation que Karim à la gare, mais c'est toi qui expliques ton trajet.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai expliqué le problème (retard, correspondance...).",
                  "J'ai utilisé le futur proche pour donner une nouvelle heure.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Commence par le problème, puis annonce ce que tu vas faire.",
              },
            ],
          },
        ],
      },
      {
        id: "trans-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "trans-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "trans-i1",
                type: "qcm",
                skillId: "a2-gr-futur-proche",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "trans-i1-q",
                  prompt: "« Nous ___ prendre le prochain train. »",
                  choices: [
                    { id: "a", text: "allons" },
                    { id: "b", text: "allez" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "allons",
                    explanation: "Avec « nous », le verbe aller se conjugue « nous allons ».",
                  },
                },
              },
              {
                id: "trans-i2",
                type: "reponse_courte",
                skillId: "a2-voc-transports",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Comment appelle-t-on le changement d'un train à un autre : « une ___ » ?",
                acceptedAnswers: ["correspondance", "une correspondance"],
                correction: {
                  correctAnswer: "correspondance",
                  explanation: "« Une correspondance » est le changement de train ou de ligne au cours d'un trajet.",
                },
              },
              {
                id: "trans-i3",
                type: "vrai_faux",
                skillId: "a2-co-annonces-publiques",
                difficulty: "A2",
                instructions: "Item 3. D'après l'annonce écoutée.",
                statement: "Le train part finalement du quai 1.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'annonce précise que le train part du quai 3, pas du quai 1.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-organiser-un-voyage",
    slug: "organiser-un-voyage-a2",
    level: "A2",
    title: "Organiser un voyage",
    description:
      "À la fin de ce module, tu pourras comprendre une confirmation de réservation et échanger avec un hôtel par écrit.",
    objectives: [
      "Comprendre une confirmation de réservation d'hôtel",
      "Comparer deux offres d'hébergement",
      "Écrire pour demander une information sur une réservation",
    ],
    domain: "comprehension_ecrite",
    stageId: "a2-intermediaire",
    estimatedMinutes: 24,
    situation:
      "Sofia prépare un week-end à Nice. Elle a déjà reçu une confirmation de réservation, mais elle trouve " +
      "ensuite une offre de dernière minute et écrit à l'hôtel pour demander si elle peut changer.",
    vocabulary: [
      { term: "réserver", category: "verbe" },
      { term: "une confirmation", category: "principal" },
      { term: "un hébergement", category: "principal" },
      { term: "l'arrivée", category: "principal" },
      { term: "le départ", category: "principal" },
      { term: "une chambre double", category: "principal" },
      { term: "une chambre simple", category: "principal" },
      { term: "inclus(e)", category: "principal" },
      { term: "annuler", category: "verbe" },
      { term: "un imprévu", category: "principal" },
      { term: "à l'avance", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Le passé composé pour raconter une réservation",
        explanation:
          "J'ai réservé, j'ai reçu, j'ai payé : le passé composé sert à raconter les étapes déjà faites d'une organisation. Ne pas oublier l'accord du participe passé avec être (je suis arrivé / arrivée).",
      },
      {
        title: "Les pronoms compléments indirects lui/leur",
        explanation:
          "lui remplace « à + une personne » (singulier), leur remplace « à + des personnes » (pluriel) : j'écris à l'hôtel → je lui écris. Ils se placent juste avant le verbe.",
      },
    ],
    examLinks: ["DELF A2 — compréhension des écrits (documents de réservation)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "a2-voy-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "a2-voy-comprendre-activite",
            title: "Lire une confirmation de réservation",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "a2-voy-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez l'email de confirmation reçu par Sofia, puis répondez.",
                text:
                  "Objet : Confirmation de votre réservation — Hôtel Bellevue, Nice\n\n" +
                  "Bonjour,\n\n" +
                  "Nous confirmons votre réservation du 12 au 14 juin : une chambre double avec vue sur mer, " +
                  "petit-déjeuner inclus. Arrivée possible à partir de 15h, départ avant 11h. Le paiement se " +
                  "fera directement à l'hôtel.\n\n" +
                  "En cas d'annulation, merci de nous prévenir au moins 48h à l'avance.\n\n" +
                  "À bientôt,\nL'équipe de l'Hôtel Bellevue",
                questions: [
                  {
                    kind: "qcm",
                    id: "a2-voy-e-q1",
                    prompt: "Pour combien de nuits est la réservation ?",
                    choices: [
                      { id: "a", text: "Une nuit." },
                      { id: "b", text: "Deux nuits." },
                      { id: "c", text: "Trois nuits." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Deux nuits.",
                      explanation: "Du 12 au 14 juin, cela fait deux nuits (12-13 et 13-14).",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "a2-voy-e-q2",
                    prompt: "Vrai ou faux : le petit-déjeuner est inclus dans la réservation.",
                    correctAnswer: true,
                    correction: {
                      correctAnswer: "Vrai.",
                      explanation: "L'email précise « petit-déjeuner inclus »." ,
                    },
                  },
                  {
                    kind: "libre",
                    id: "a2-voy-e-q3",
                    prompt: "Combien de temps à l'avance faut-il prévenir en cas d'annulation ?",
                    expectedAnswer: "Au moins 48 heures à l'avance.",
                    correction: {
                      correctAnswer: "Au moins 48h à l'avance.",
                      explanation: "« merci de nous prévenir au moins 48h à l'avance »." ,
                    },
                  },
                  {
                    kind: "qcm",
                    id: "a2-voy-e-q4",
                    prompt: "À partir de quelle heure peut-on arriver à l'hôtel ?",
                    choices: [
                      { id: "a", text: "11h." },
                      { id: "b", text: "13h." },
                      { id: "c", text: "15h." },
                    ],
                    correctChoiceId: "c",
                    correction: { correctAnswer: "15h.", explanation: "« Arrivée possible à partir de 15h »." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a2-voy-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "a2-voy-entrainement-activite",
            title: "Raconter une réservation",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-voy-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-passe-compose",
                difficulty: "A2",
                instructions: "Complète au passé composé.",
                textWithBlanks:
                  "Sofia {{1}} (réserver) un hôtel à Nice. Elle {{2}} (recevoir) un email de confirmation. Elle " +
                  "{{3}} (trouver) ensuite une offre moins chère.",
                blanks: [
                  { id: "1", answer: "a réservé" },
                  { id: "2", answer: "a reçu" },
                  { id: "3", answer: "a trouvé" },
                ],
                correction: {
                  correctAnswer: "a réservé — a reçu — a trouvé",
                  explanation: "Ces trois verbes se conjuguent avec l'auxiliaire avoir au passé composé.",
                },
              },
              {
                id: "a2-voy-g2",
                type: "qcm",
                skillId: "a2-gr-pronoms-coi",
                difficulty: "A2",
                instructions: "Remplace le complément par le bon pronom.",
                question: {
                  kind: "qcm",
                  id: "a2-voy-g2-q",
                  prompt: "« J'écris à l'hôtel. » devient :",
                  choices: [
                    { id: "a", text: "Je lui écris." },
                    { id: "b", text: "Je le écris." },
                    { id: "c", text: "Je leur écris." },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Je lui écris.",
                    explanation: "« à l'hôtel » est singulier : on utilise « lui », pas « leur » (réservé au pluriel).",
                  },
                },
              },
              {
                id: "a2-voy-g3",
                type: "association",
                skillId: "a2-voc-voyage",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "un hébergement", right: "un endroit où loger pendant un voyage" },
                  { id: "2", left: "annuler", right: "dire qu'on ne vient plus finalement" },
                  { id: "3", left: "un imprévu", right: "quelque chose qui arrive sans être prévu" },
                ],
                correction: {
                  correctAnswer: "1 → logement ; 2 → dire qu'on ne vient plus ; 3 → événement non prévu.",
                  explanation: "Ce vocabulaire est utile pour comprendre et gérer une réservation.",
                },
              },
              {
                id: "a2-voy-g4",
                type: "vrai_faux",
                skillId: "a2-gr-pronoms-coi",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Leur » remplace toujours un complément au singulier.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Leur » remplace un complément introduit par « à » au pluriel (plusieurs personnes), pas au singulier.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a2-voy-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "a2-voy-ecriture-activite",
            title: "Demander une information à un hôtel",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-voy-h",
                type: "production_ecrite",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu as réservé une chambre, mais tu as trouvé une offre moins chère ailleurs. Écris un email à " +
                  "l'hôtel pour demander si tu peux annuler ou modifier ta réservation sans payer de frais.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Situation expliquée clairement (/2)",
                  "Question précise posée (/2)",
                  "Formule de politesse adaptée à un email (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "a2-voy-ecriture-activite-orale",
            title: "Demander une information à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-voy-h-oral",
                type: "production_orale",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne:
                  "Tu appelles l'hôtel pour demander si tu peux changer la date de ton arrivée. Explique la situation et pose ta question.",
                context: "Même situation que Sofia, mais tu passes cette fois par un appel téléphonique.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai expliqué pourquoi j'appelle.",
                  "J'ai posé une question claire.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Commence par te présenter et rappeler ta réservation (nom, dates).",
              },
            ],
          },
        ],
      },
      {
        id: "a2-voy-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "a2-voy-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-voy-i1",
                type: "qcm",
                skillId: "a2-gr-passe-compose",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "a2-voy-i1-q",
                  prompt: "« Elle ___ un hôtel à Nice. »",
                  choices: [
                    { id: "a", text: "a réservé" },
                    { id: "b", text: "réserve à" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "a réservé", explanation: "Le passé composé de « réserver » est « a réservé »." },
                },
              },
              {
                id: "a2-voy-i2",
                type: "reponse_courte",
                skillId: "a2-voc-voyage",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel mot désigne un endroit où loger pendant un voyage : « un ___ » ?",
                acceptedAnswers: ["hébergement", "un hébergement"],
                correction: { correctAnswer: "hébergement", explanation: "« Un hébergement » est un lieu où l'on dort pendant un voyage." },
              },
              {
                id: "a2-voy-i3",
                type: "vrai_faux",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après l'email de confirmation.",
                statement: "Le paiement se fait en ligne avant l'arrivée.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'email précise que « le paiement se fera directement à l'hôtel »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-aller-a-la-pharmacie-et-chez-le-medecin",
    slug: "aller-a-la-pharmacie-et-chez-le-medecin",
    level: "A2",
    title: "Aller à la pharmacie et chez le médecin",
    description:
      "À la fin de ce module, tu pourras décrire un symptôme simple et comprendre un conseil de santé.",
    objectives: [
      "Décrire un symptôme simple",
      "Comprendre un conseil donné à la pharmacie",
      "Utiliser il faut + infinitif pour exprimer une nécessité",
    ],
    domain: "comprehension_orale",
    stageId: "a2-intermediaire",
    estimatedMinutes: 24,
    situation:
      "Farid ne se sent pas bien depuis deux jours. Il va à la pharmacie du quartier pour demander conseil " +
      "avant de décider s'il doit prendre rendez-vous chez le médecin.",
    vocabulary: [
      { term: "avoir mal à", category: "expression" },
      { term: "la fièvre", category: "principal" },
      { term: "un rhume", category: "principal" },
      { term: "la toux", category: "principal" },
      { term: "un médicament", category: "principal" },
      { term: "une ordonnance", category: "principal" },
      { term: "se reposer", category: "verbe" },
      { term: "prendre rendez-vous", category: "expression" },
      { term: "un cachet", category: "principal" },
      { term: "tousser", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Il faut + infinitif",
        explanation:
          "« Il faut » + infinitif exprime une nécessité ou un conseil, sans préciser qui doit agir : il faut se reposer, il faut prendre un médicament. Très utile pour donner un conseil de santé simple.",
      },
      {
        title: "L'impératif pour conseiller",
        explanation:
          "Reposez-vous, prenez ce médicament, buvez beaucoup d'eau : l'impératif s'adresse directement à la personne, sans pronom sujet. À la 2e personne du pluriel/vouvoiement, le verbe garde son -ez habituel.",
      },
    ],
    examLinks: ["DELF A2 — compréhension de l'oral (dialogue simple)"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "sante-comprendre",
        type: "comprendre",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "sante-comprendre-activite",
            title: "Écouter un dialogue à la pharmacie",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "sante-e",
                type: "comprehension_orale",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Écoutez le dialogue à la pharmacie, puis répondez.",
                audioSrc: "/audio/a2/a2-pharmacie-conseil.m4a",
                transcript:
                  "Pharmacien : Bonjour, je peux vous aider ?\nCliente : Bonjour, j'ai mal à la tête depuis ce matin, et un peu de fièvre aussi. Vous pouvez me conseiller quelque chose ?\nPharmacien : Vous avez de la fièvre, quelle température exactement ?\nCliente : Trente-huit et demi, à peu près.\nPharmacien : D'accord, ce n'est pas très grave. Je vous propose ce médicament, un comprimé toutes les six heures, avec de l'eau, jamais l'estomac vide.\nCliente : Et je peux le prendre combien de jours ?\nPharmacien : Pas plus de trois jours. Si la fièvre continue après, allez voir votre médecin.\nCliente : D'accord, merci beaucoup.\nPharmacien : Je vous en prie, et reposez-vous bien !",
                questions: [
                  {
                    kind: "qcm",
                    id: "sante-e-q1",
                    prompt: "Quelle est la fréquence de prise du médicament ?",
                    choices: [
                      { id: "a", text: "Toutes les 3 heures" },
                      { id: "b", text: "Toutes les 6 heures" },
                      { id: "c", text: "Une fois par jour" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Toutes les 6 heures", explanation: "Le pharmacien dit : « un comprimé toutes les six heures »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "sante-e-q2",
                    prompt: "Il faut prendre le médicament l'estomac vide.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux",
                      explanation: "Le pharmacien précise : « jamais l'estomac vide ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "sante-e-q3",
                    prompt: "Pendant combien de jours maximum peut-elle prendre le médicament ?",
                    choices: [
                      { id: "a", text: "1 jour" },
                      { id: "b", text: "3 jours" },
                      { id: "c", text: "6 jours" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "3 jours", explanation: "Le pharmacien répond : « pas plus de trois jours »." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sante-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "sante-entrainement-activite",
            title: "Donner un conseil de santé",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "sante-g1",
                type: "qcm",
                skillId: "a2-gr-il-faut-infinitif",
                difficulty: "A2",
                instructions: "Choisis la phrase correcte.",
                question: {
                  kind: "qcm",
                  id: "sante-g1-q",
                  prompt: "Pour dire qu'il est nécessaire de se reposer :",
                  choices: [
                    { id: "a", text: "Il faut se reposer." },
                    { id: "b", text: "Il faut se reposez." },
                    { id: "c", text: "Il faut vous reposez." },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Il faut se reposer.",
                    explanation: "« Il faut » est toujours suivi de l'infinitif, jamais d'une forme conjuguée.",
                  },
                },
              },
              {
                id: "sante-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-imperatif",
                difficulty: "A2",
                instructions: "Complète les conseils avec l'impératif du verbe entre parenthèses (2e personne du pluriel).",
                textWithBlanks:
                  "{{1}} (boire) beaucoup d'eau. {{2}} (prendre) un cachet le matin et le soir. {{3}} (se reposer) bien ce week-end.",
                blanks: [
                  { id: "1", answer: "Buvez" },
                  { id: "2", answer: "Prenez" },
                  { id: "3", answer: "Reposez-vous" },
                ],
                correction: {
                  correctAnswer: "Buvez — Prenez — Reposez-vous",
                  explanation: "À l'impératif, le pronom sujet disparaît ; « se reposer » garde son pronom réfléchi après le verbe : Reposez-vous.",
                },
              },
              {
                id: "sante-g3",
                type: "association",
                skillId: "a2-voc-sante",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "une ordonnance", right: "un papier du médecin pour acheter des médicaments" },
                  { id: "2", left: "un rhume", right: "un petit problème de santé courant (nez qui coule, toux légère)" },
                  { id: "3", left: "un cachet", right: "un médicament sous forme de petit comprimé" },
                ],
                correction: {
                  correctAnswer: "1 → papier du médecin ; 2 → petit problème courant ; 3 → comprimé.",
                  explanation: "Ce vocabulaire est utile pour comprendre une visite à la pharmacie ou chez le médecin.",
                },
              },
              {
                id: "sante-g4",
                type: "vrai_faux",
                skillId: "a2-gr-il-faut-infinitif",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Il faut » change de forme selon la personne à qui on parle.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Il faut » reste invariable ; c'est le contexte qui indique à qui s'adresse le conseil.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "sante-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "sante-ecriture-activite",
            title: "Demander un conseil de santé par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "sante-h",
                type: "production_ecrite",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu ne te sens pas bien depuis deux jours (décris tes symptômes). Écris un message à ton pharmacien " +
                  "habituel pour lui demander conseil avant de te déplacer.",
                minWords: 30,
                maxWords: 50,
                correctionCriteria: [
                  "Symptômes décrits clairement (/2)",
                  "Durée précisée (/1)",
                  "Question de conseil posée (/2)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "sante-ecriture-activite-orale",
            title: "Décrire ses symptômes à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "sante-h-oral",
                type: "production_orale",
                skillId: "a2-pe-demander-information",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Comme Farid, décris tes symptômes à voix haute à un pharmacien imaginaire et demande-lui conseil.",
                context: "Même situation que Farid à la pharmacie, mais c'est toi qui parles.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai décrit au moins un symptôme.",
                  "J'ai précisé depuis quand.",
                  "J'ai demandé un conseil clairement.",
                ],
                tips: "Utilise « j'ai mal à... » et « depuis... » pour structurer ta réponse.",
              },
            ],
          },
        ],
      },
      {
        id: "sante-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "sante-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "sante-i1",
                type: "qcm",
                skillId: "a2-gr-il-faut-infinitif",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "sante-i1-q",
                  prompt: "« ___ se reposer quand on est malade. »",
                  choices: [
                    { id: "a", text: "Il faut" },
                    { id: "b", text: "Il fait" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "Il faut", explanation: "« Il faut » exprime la nécessité, « il fait » parle de la météo ou d'une action." },
                },
              },
              {
                id: "sante-i2",
                type: "reponse_courte",
                skillId: "a2-voc-sante",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel mot désigne le papier du médecin pour acheter des médicaments : « une ___ » ?",
                acceptedAnswers: ["ordonnance", "une ordonnance"],
                correction: { correctAnswer: "ordonnance", explanation: "« Une ordonnance » est délivrée par le médecin." },
              },
              {
                id: "sante-i3",
                type: "vrai_faux",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Item 3. D'après le dialogue écouté.",
                statement: "La pharmacienne conseille à Farid de prendre rendez-vous chez le médecin immédiatement.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Elle conseille d'abord du repos et un sirop, et de prendre rendez-vous seulement si ça ne va pas mieux dans deux jours.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-parler-de-son-travail",
    slug: "parler-de-son-travail",
    level: "A2",
    title: "Parler de son travail",
    description:
      "À la fin de ce module, tu pourras décrire ton travail, tes horaires et tes tâches à un nouveau collègue.",
    objectives: [
      "Décrire un poste et des horaires de travail",
      "Relier des idées avec et, mais, donc, parce que",
      "Comprendre la présentation professionnelle de quelqu'un d'autre",
    ],
    domain: "grammaire",
    stageId: "a2-intermediaire",
    estimatedMinutes: 24,
    situation:
      "Diego commence un nouveau travail dans une entreprise de logistique. Le premier jour, il se présente " +
      "à son équipe et décrit son poste.",
    vocabulary: [
      { term: "un poste", category: "principal" },
      { term: "une équipe", category: "principal" },
      { term: "un horaire", category: "principal" },
      { term: "à temps plein", category: "expression" },
      { term: "à temps partiel", category: "expression" },
      { term: "une pause", category: "principal" },
      { term: "une tâche", category: "principal" },
      { term: "un collègue", category: "principal" },
      { term: "un(e) responsable", category: "principal" },
      { term: "commencer", category: "verbe" },
      { term: "terminer", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Les connecteurs simples",
        explanation:
          "et ajoute une information, mais oppose deux idées, donc introduit une conséquence, parce que introduit une cause : je travaille le matin et l'après-midi, mais je préfère le matin parce que c'est plus calme.",
      },
      {
        title: "Le futur proche pour un changement professionnel",
        explanation:
          "aller + infinitif annonce un changement prévu dans le travail : je vais changer d'équipe, elle va commencer un nouveau poste.",
      },
    ],
    examLinks: ["DELF A2 — production orale", "TCF IRN — expression orale, tâche 2"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "trav-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "trav-comprendre-activite",
            title: "Lire un message de présentation professionnelle",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "trav-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez le message que Diego envoie à l'équipe avant son arrivée, puis répondez.",
                text:
                  "Bonjour à toutes et à tous,\n\n" +
                  "Je m'appelle Diego, je commence lundi comme magasinier dans l'équipe logistique. Je travaille " +
                  "à temps plein, du lundi au vendredi, de 8h à 16h, avec une pause d'une heure à midi. Mes " +
                  "tâches principales seront la réception des livraisons et la préparation des commandes. Je " +
                  "suis un peu stressé mais content de commencer ! À lundi.\n\nDiego",
                questions: [
                  {
                    kind: "qcm",
                    id: "trav-e-q1",
                    prompt: "Quel est le poste de Diego ?",
                    choices: [
                      { id: "a", text: "Magasinier." },
                      { id: "b", text: "Responsable d'équipe." },
                      { id: "c", text: "Chauffeur." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "Magasinier.", explanation: "« je commence lundi comme magasinier »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "trav-e-q2",
                    prompt: "Vrai ou faux : Diego travaille à temps partiel.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il précise « je travaille à temps plein »." },
                  },
                  {
                    kind: "libre",
                    id: "trav-e-q3",
                    prompt: "Quelles sont les deux tâches principales de Diego ?",
                    expectedAnswer: "La réception des livraisons et la préparation des commandes.",
                    correction: {
                      correctAnswer: "La réception des livraisons et la préparation des commandes.",
                      explanation: "Le message les liste directement.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "trav-e-q4",
                    prompt: "À quelle heure Diego termine-t-il sa journée ?",
                    choices: [
                      { id: "a", text: "16h." },
                      { id: "b", text: "18h." },
                      { id: "c", text: "12h." },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "16h.", explanation: "« de 8h à 16h »." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "trav-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "trav-entrainement-activite",
            title: "Relier des idées sur le travail",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "trav-g1",
                type: "qcm",
                skillId: "a2-gr-connecteurs-simples",
                difficulty: "A2",
                instructions: "Choisis le bon connecteur.",
                question: {
                  kind: "qcm",
                  id: "trav-g1-q",
                  prompt: "« Je commence tôt, ___ je finis tôt aussi. » (conséquence)",
                  choices: [
                    { id: "a", text: "donc" },
                    { id: "b", text: "mais" },
                    { id: "c", text: "parce que" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "donc",
                    explanation: "« Donc » introduit une conséquence logique de ce qui précède.",
                  },
                },
              },
              {
                id: "trav-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-connecteurs-simples",
                difficulty: "A2",
                instructions: "Complète avec et, mais, donc ou parce que.",
                textWithBlanks:
                  "J'aime mon travail {{1}} les horaires sont difficiles. Je commence tôt {{2}} je me lève à 6h. " +
                  "Je suis fatigué le soir, {{3}} je me couche tôt.",
                blanks: [
                  { id: "1", answer: "mais" },
                  { id: "2", answer: "parce que" },
                  { id: "3", answer: "donc" },
                ],
                correction: {
                  correctAnswer: "mais — parce que — donc",
                  explanation: "« mais » oppose, « parce que » donne la cause, « donc » donne la conséquence.",
                },
              },
              {
                id: "trav-g3",
                type: "association",
                skillId: "a2-voc-travail",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "un(e) responsable", right: "la personne qui dirige une équipe" },
                  { id: "2", left: "une tâche", right: "un travail précis à réaliser" },
                  { id: "3", left: "à temps plein", right: "travailler toute la semaine, pas seulement quelques heures" },
                ],
                correction: {
                  correctAnswer: "1 → dirige l'équipe ; 2 → travail précis ; 3 → toute la semaine.",
                  explanation: "Ce vocabulaire revient souvent pour décrire un poste.",
                },
              },
              {
                id: "trav-g4",
                type: "vrai_faux",
                skillId: "a2-gr-futur-proche",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Je vais changer de poste » parle d'une action déjà terminée.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Le futur proche annonce une action à venir, pas une action déjà terminée.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "trav-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "trav-ecriture-activite",
            title: "Se présenter professionnellement par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "trav-h",
                type: "production_ecrite",
                skillId: "a2-pe-se-presenter",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu commences un nouveau travail lundi. Écris un message à ta future équipe pour te présenter : " +
                  "ton poste, tes horaires et une ou deux tâches principales.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Poste et horaires mentionnés (/2)",
                  "Au moins une tâche décrite (/1)",
                  "Un connecteur simple utilisé (et/mais/donc/parce que) (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "trav-ecriture-activite-orale",
            title: "Se présenter professionnellement à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "trav-h-oral",
                type: "production_orale",
                skillId: "a2-pe-se-presenter",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Comme Diego, présente-toi à voix haute à une nouvelle équipe : ton poste, tes horaires, tes tâches.",
                context: "Même situation que Diego le premier jour, mais c'est toi qui te présentes.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai dit mon poste.",
                  "J'ai donné mes horaires.",
                  "J'ai mentionné au moins une tâche.",
                ],
                tips: "Structure ta présentation comme le message de Diego : poste, horaires, tâches.",
              },
            ],
          },
        ],
      },
      {
        id: "trav-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "trav-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "trav-i1",
                type: "qcm",
                skillId: "a2-gr-connecteurs-simples",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "trav-i1-q",
                  prompt: "« Je suis fatigué ___ j'ai beaucoup travaillé. » (cause)",
                  choices: [
                    { id: "a", text: "parce que" },
                    { id: "b", text: "donc" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "parce que", explanation: "« Parce que » introduit la cause de la fatigue." },
                },
              },
              {
                id: "trav-i2",
                type: "reponse_courte",
                skillId: "a2-voc-travail",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Comment appelle-t-on un temps d'arrêt pendant la journée de travail : « une ___ » ?",
                acceptedAnswers: ["pause", "une pause"],
                correction: { correctAnswer: "pause", explanation: "« Une pause » est un temps d'arrêt pendant le travail." },
              },
              {
                id: "trav-i3",
                type: "vrai_faux",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message de Diego.",
                statement: "Diego travaille le week-end.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Il précise travailler « du lundi au vendredi »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-chercher-un-emploi-simplement",
    slug: "chercher-un-emploi-simplement",
    level: "A2",
    title: "Chercher un emploi simplement",
    description:
      "À la fin de ce module, tu pourras répondre à une annonce d'emploi et comprendre une convocation à un entretien.",
    objectives: [
      "Comprendre un message vocal de convocation à un entretien",
      "Raconter son parcours au passé composé",
      "Parler de ses disponibilités avec le futur simple",
    ],
    domain: "production_ecrite",
    stageId: "a2-intermediaire",
    estimatedMinutes: 24,
    situation:
      "Aïcha a répondu à une petite annonce pour un poste de vendeuse. Quelques jours plus tard, elle reçoit " +
      "un message vocal du magasin qui la convoque à un entretien.",
    vocabulary: [
      { term: "une annonce d'emploi", category: "principal" },
      { term: "postuler", category: "verbe" },
      { term: "un CV", category: "principal" },
      { term: "une lettre de motivation", category: "principal" },
      { term: "un entretien", category: "principal" },
      { term: "disponible", category: "principal" },
      { term: "une expérience", category: "principal" },
      { term: "convoquer", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Le passé composé pour raconter un parcours",
        explanation:
          "j'ai travaillé, j'ai suivi une formation, j'ai postulé : le passé composé permet de résumer les étapes déjà passées d'un parcours professionnel.",
      },
      {
        title: "Le futur simple (introduction)",
        explanation:
          "Le futur simple se forme souvent sur l'infinitif + terminaisons (-ai, -as, -a, -ons, -ez, -ont) : je travaillerai, je serai disponible. Il annonce un fait futur, un peu plus formel que le futur proche.",
      },
    ],
    examLinks: ["DELF A2 — production écrite", "TCF IRN — expression orale, tâche 2"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "a2-emp-comprendre",
        type: "comprendre",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "a2-emp-comprendre-activite",
            title: "Écouter un micro-trottoir sur les métiers",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "a2-emp-e",
                type: "comprehension_orale",
                skillId: "a2-co-messages-vocaux",
                difficulty: "A2",
                instructions: "Écoutez le journaliste interroger deux personnes sur leur métier, puis répondez.",
                audioSrc: "/audio/a2/a2-interview-simple-metiers.m4a",
                transcript:
                  "Journaliste : Bonjour, je fais un petit reportage sur les métiers. Vous faites quoi dans la vie ?\nHomme interviewé : Moi je suis infirmier, je travaille dans un hôpital, la nuit surtout.\nJournaliste : Et vous aimez travailler la nuit ?\nHomme interviewé : Oui, c'est plus calme, et je suis payé un peu plus. Mais c'est fatigant pour la famille.\nJournaliste : Merci. Et vous madame, vous travaillez dans quoi ?\nFemme interviewée : Moi je suis institutrice, je travaille avec des enfants de six ans. J'adore mon métier, même si c'est fatigant aussi, mais différemment !\nJournaliste : Merci beaucoup à tous les deux !",
                questions: [
                  {
                    kind: "qcm",
                    id: "a2-emp-e-q1",
                    prompt: "Quel est le métier de l'homme interviewé ?",
                    choices: [
                      { id: "a", text: "Instituteur" },
                      { id: "b", text: "Infirmier" },
                      { id: "c", text: "Journaliste" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Infirmier", explanation: "Il répond : « moi je suis infirmier, je travaille dans un hôpital »." },
                  },
                  {
                    kind: "qcm",
                    id: "a2-emp-e-q2",
                    prompt: "Avec quel âge d'enfants travaille la femme interviewée ?",
                    choices: [
                      { id: "a", text: "3 ans" },
                      { id: "b", text: "6 ans" },
                      { id: "c", text: "10 ans" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "6 ans", explanation: "Elle précise : « je travaille avec des enfants de six ans »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "a2-emp-e-q3",
                    prompt: "L'infirmier trouve son travail de nuit difficile pour sa famille.",
                    correctAnswer: true,
                    correction: { correctAnswer: "Vrai", explanation: "Il dit : « c'est fatigant pour la famille »." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "a2-emp-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "a2-emp-entrainement-activite",
            title: "Raconter son parcours et ses disponibilités",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-emp-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-passe-compose",
                difficulty: "A2",
                instructions: "Complète au passé composé.",
                textWithBlanks:
                  "L'année dernière, Aïcha {{1}} (suivre) une formation de vente. Ensuite, elle {{2}} (postuler) " +
                  "dans plusieurs magasins.",
                blanks: [
                  { id: "1", answer: "a suivi" },
                  { id: "2", answer: "a postulé" },
                ],
                correction: {
                  correctAnswer: "a suivi — a postulé",
                  explanation: "« suivre » et « postuler » se conjuguent avec l'auxiliaire avoir au passé composé.",
                },
              },
              {
                id: "a2-emp-g2",
                type: "qcm",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Choisis la bonne forme du futur simple.",
                question: {
                  kind: "qcm",
                  id: "a2-emp-g2-q",
                  prompt: "« Jeudi, je ___ disponible toute la journée. »",
                  choices: [
                    { id: "a", text: "serai" },
                    { id: "b", text: "suis été" },
                    { id: "c", text: "serais" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "serai",
                    explanation: "Le futur simple de « être » à la première personne est « je serai ».",
                  },
                },
              },
              {
                id: "a2-emp-g3",
                type: "association",
                skillId: "a2-voc-recherche-emploi",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "postuler", right: "envoyer sa candidature pour un poste" },
                  { id: "2", left: "convoquer", right: "demander à quelqu'un de venir à un rendez-vous précis" },
                  { id: "3", left: "une lettre de motivation", right: "un texte qui explique pourquoi on veut le poste" },
                ],
                correction: {
                  correctAnswer: "1 → envoyer sa candidature ; 2 → demander de venir ; 3 → texte expliquant sa motivation.",
                  explanation: "Ce vocabulaire revient dans toute recherche d'emploi simple.",
                },
              },
              {
                id: "a2-emp-g4",
                type: "remise_en_ordre",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Remets la phrase dans le bon ordre.",
                items: [
                  { id: "1", text: "je" },
                  { id: "2", text: "travaillerai" },
                  { id: "3", text: "à" },
                  { id: "4", text: "temps plein" },
                ],
                correctOrder: ["1", "2", "3", "4"],
                correction: {
                  correctAnswer: "Je travaillerai à temps plein.",
                  explanation: "Sujet + verbe au futur simple + complément : structure de base d'une annonce d'intention future.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "a2-emp-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "a2-emp-ecriture-activite",
            title: "Répondre à une annonce d'emploi",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-emp-h",
                type: "production_ecrite",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu as vu une annonce pour un poste qui t'intéresse. Écris un court message pour te présenter, " +
                  "dire pourquoi le poste t'intéresse et préciser tes disponibilités.",
                minWords: 35,
                maxWords: 60,
                correctionCriteria: [
                  "Présentation courte et claire (/1)",
                  "Raison de l'intérêt pour le poste (/2)",
                  "Disponibilité précisée au futur simple (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "a2-emp-ecriture-activite-orale",
            title: "Répondre à des questions d'entretien",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "a2-emp-h-oral",
                type: "production_orale",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "On te demande en entretien : « Parlez-moi de votre parcours et de vos disponibilités. » Réponds à voix haute.",
                context: "Imagine que tu es Aïcha à son entretien chez Mode & Style.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai parlé de mon parcours au passé composé.",
                  "J'ai précisé mes disponibilités.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Commence par ton parcours (passé), termine par tes disponibilités (futur).",
              },
            ],
          },
        ],
      },
      {
        id: "a2-emp-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "a2-emp-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "a2-emp-i1",
                type: "qcm",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "a2-emp-i1-q",
                  prompt: "« Nous ___ ensemble sur ce projet. » (futur simple de travailler)",
                  choices: [
                    { id: "a", text: "travaillerons" },
                    { id: "b", text: "travaillons" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "travaillerons", explanation: "Futur simple de « travailler » à la 1re personne du pluriel." },
                },
              },
              {
                id: "a2-emp-i2",
                type: "reponse_courte",
                skillId: "a2-voc-recherche-emploi",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel verbe utiliser pour dire qu'on envoie sa candidature : « je ___ » ?",
                acceptedAnswers: ["postule", "je postule"],
                correction: { correctAnswer: "postule", explanation: "« Postuler » = envoyer sa candidature pour un poste." },
              },
              {
                id: "a2-emp-i3",
                type: "vrai_faux",
                skillId: "a2-co-messages-vocaux",
                difficulty: "A2",
                instructions: "Item 3. D'après le message vocal écouté.",
                statement: "Le magasin refuse la candidature d'Aïcha.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Le magasin lui propose au contraire un entretien : « votre profil nous intéresse »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-parler-de-ses-etudes",
    slug: "parler-de-ses-etudes",
    level: "A2",
    title: "Parler de ses études",
    description:
      "À la fin de ce module, tu pourras parler de ta formation actuelle et comparer avec ta situation d'avant.",
    objectives: [
      "Décrire une formation et un emploi du temps",
      "Utiliser l'imparfait pour décrire une situation passée",
      "Comprendre un petit récit sur des études",
    ],
    domain: "grammaire",
    stageId: "a2-intermediaire",
    estimatedMinutes: 22,
    situation:
      "Karim suit maintenant une formation professionnelle en France. Il compare cette formation avec ses " +
      "études d'avant, dans son pays d'origine, sur le forum de son organisme de formation.",
    vocabulary: [
      { term: "une formation", category: "principal" },
      { term: "un emploi du temps", category: "principal" },
      { term: "un cours", category: "principal" },
      { term: "réussir", category: "verbe" },
      { term: "échouer", category: "verbe" },
      { term: "un diplôme", category: "principal" },
      { term: "s'inscrire à", category: "expression" },
      { term: "une matière", category: "principal" },
    ],
    languagePoints: [
      {
        title: "L'imparfait pour décrire une situation passée",
        explanation:
          "j'étudiais, j'avais, c'était : l'imparfait décrit une situation ou une habitude passée, sans en préciser le début ni la fin. Formation : radical de « nous » au présent + terminaisons -ais, -ais, -ait, -ions, -iez, -aient.",
      },
      {
        title: "Les connecteurs simples pour comparer avant/maintenant",
        explanation:
          "et, mais, donc, parce que permettent de relier une description du passé à la situation actuelle : avant, j'étudiais le soir, mais maintenant je suis des cours le matin.",
      },
    ],
    examLinks: ["DELF A2 — production écrite"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "etud-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "etud-comprendre-activite",
            title: "Lire un message sur un forum de formation",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "etud-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Lisez le message de Karim sur le forum, puis répondez.",
                text:
                  "Bonjour à tous,\n\n" +
                  "Je suis une formation de comptabilité depuis deux mois. Avant, dans mon pays, j'étudiais " +
                  "l'informatique à l'université, mais les cours étaient très théoriques. Ici, c'est différent : " +
                  "les cours sont plus pratiques, et j'ai un emploi du temps chargé, du lundi au jeudi. Je dois " +
                  "réussir un examen à la fin du mois pour obtenir mon diplôme. J'espère ne pas échouer !\n\n" +
                  "Karim",
                questions: [
                  {
                    kind: "qcm",
                    id: "etud-e-q1",
                    prompt: "Quelle formation Karim suit-il actuellement ?",
                    choices: [
                      { id: "a", text: "Informatique." },
                      { id: "b", text: "Comptabilité." },
                      { id: "c", text: "Langues." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Comptabilité.", explanation: "« Je suis une formation de comptabilité »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "etud-e-q2",
                    prompt: "Vrai ou faux : avant, Karim étudiait l'informatique.",
                    correctAnswer: true,
                    correction: { correctAnswer: "Vrai.", explanation: "« Avant... j'étudiais l'informatique à l'université »." },
                  },
                  {
                    kind: "libre",
                    id: "etud-e-q3",
                    prompt: "Qu'est-ce que Karim doit réussir à la fin du mois ?",
                    expectedAnswer: "Un examen, pour obtenir son diplôme.",
                    correction: { correctAnswer: "Un examen.", explanation: "« Je dois réussir un examen à la fin du mois pour obtenir mon diplôme »." },
                  },
                  {
                    kind: "qcm",
                    id: "etud-e-q4",
                    prompt: "Comment étaient les cours dans son pays d'origine, selon Karim ?",
                    choices: [
                      { id: "a", text: "Très pratiques." },
                      { id: "b", text: "Très théoriques." },
                      { id: "c", text: "Très courts." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Très théoriques.", explanation: "« les cours étaient très théoriques »." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "etud-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "etud-entrainement-activite",
            title: "Comparer avant et maintenant",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "etud-g1",
                type: "texte_a_trous",
                skillId: "a2-gr-imparfait-introduction",
                difficulty: "A2",
                instructions: "Complète à l'imparfait.",
                textWithBlanks:
                  "Avant, je {{1}} (habiter) dans une petite ville et j'{{2}} (avoir) des cours tous les matins. " +
                  "Les journées {{3}} (être) longues.",
                blanks: [
                  { id: "1", answer: "habitais" },
                  { id: "2", answer: "avais" },
                  { id: "3", answer: "étaient" },
                ],
                correction: {
                  correctAnswer: "habitais — avais — étaient",
                  explanation: "L'imparfait décrit une situation passée qui durait, sans préciser son début ni sa fin.",
                },
              },
              {
                id: "etud-g2",
                type: "qcm",
                skillId: "a2-gr-imparfait-introduction",
                difficulty: "A2",
                instructions: "Choisis la bonne terminaison.",
                question: {
                  kind: "qcm",
                  id: "etud-g2-q",
                  prompt: "« Nous ___ souvent en retard à l'école. » (imparfait de être)",
                  choices: [
                    { id: "a", text: "étions" },
                    { id: "b", text: "étiez" },
                    { id: "c", text: "étaient" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "étions",
                    explanation: "Avec « nous », la terminaison de l'imparfait est toujours -ions.",
                  },
                },
              },
              {
                id: "etud-g3",
                type: "association",
                skillId: "a2-voc-etudes",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "réussir", right: "obtenir un bon résultat à un examen" },
                  { id: "2", left: "échouer", right: "ne pas obtenir le résultat attendu" },
                  { id: "3", left: "s'inscrire à", right: "faire les démarches pour commencer un cours" },
                ],
                correction: {
                  correctAnswer: "1 → obtenir un bon résultat ; 2 → ne pas réussir ; 3 → faire les démarches pour commencer.",
                  explanation: "Ce vocabulaire est utile pour parler de son parcours scolaire.",
                },
              },
              {
                id: "etud-g4",
                type: "vrai_faux",
                skillId: "a2-gr-imparfait-introduction",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "L'imparfait se forme toujours sur le radical de la première personne du singulier au présent.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'imparfait se forme sur le radical de « nous » au présent (nous habit-ons → j'habitais), pas sur « je ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "etud-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "etud-ecriture-activite",
            title: "Comparer ses études d'avant et de maintenant",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "etud-h",
                type: "production_ecrite",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Compare tes études ou ta formation d'avant avec ta situation actuelle : ce qui a changé, ce qui " +
                  "est différent. Utilise l'imparfait pour parler d'avant.",
                minWords: 40,
                maxWords: 70,
                correctionCriteria: [
                  "Description du passé à l'imparfait (/2)",
                  "Description de la situation actuelle (/2)",
                  "Au moins un connecteur de comparaison (mais, alors que...) (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "etud-ecriture-activite-orale",
            title: "Comparer ses études à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "etud-h-oral",
                type: "production_orale",
                skillId: "a2-pe-decrire",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Comme Karim, raconte à voix haute comment étaient tes études avant et comment elles sont maintenant.",
                context: "Même situation que Karim sur le forum, mais tu parles à voix haute.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai utilisé l'imparfait pour parler du passé.",
                  "J'ai décrit ma situation actuelle.",
                  "Mes phrases sont compréhensibles d'un bout à l'autre.",
                ],
                tips: "Commence par « avant... » puis continue par « maintenant... ».",
              },
            ],
          },
        ],
      },
      {
        id: "etud-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "etud-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "etud-i1",
                type: "qcm",
                skillId: "a2-gr-imparfait-introduction",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "etud-i1-q",
                  prompt: "« Avant, tu ___ dans une autre ville. » (imparfait de habiter)",
                  choices: [
                    { id: "a", text: "habitais" },
                    { id: "b", text: "habites" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "habitais", explanation: "Imparfait de « habiter » à la 2e personne du singulier." },
                },
              },
              {
                id: "etud-i2",
                type: "reponse_courte",
                skillId: "a2-voc-etudes",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel mot désigne le document obtenu après avoir réussi une formation : « un ___ » ?",
                acceptedAnswers: ["diplôme", "diplome", "un diplôme"],
                correction: { correctAnswer: "diplôme", explanation: "« Un diplôme » atteste la réussite d'une formation." },
              },
              {
                id: "etud-i3",
                type: "vrai_faux",
                skillId: "a2-ce-recits-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message de Karim.",
                statement: "Karim n'a aucun examen à passer.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Il précise devoir « réussir un examen à la fin du mois »." ,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-raconter-son-week-end",
    slug: "raconter-son-week-end",
    level: "A2",
    title: "Raconter son week-end",
    description:
      "À la fin de ce module, tu pourras raconter ton week-end de façon organisée et proposer une nouvelle sortie.",
    objectives: [
      "Raconter un week-end en distinguant actions et contexte",
      "Organiser un récit avec d'abord, ensuite, après, enfin",
      "Proposer une sortie à un ami",
    ],
    domain: "production_ecrite",
    stageId: "a2-intermediaire",
    estimatedMinutes: 26,
    situation:
      "Camille appelle son amie Yasmine pour lui raconter son week-end à la campagne, puis elles décident de " +
      "se voir le week-end suivant.",
    vocabulary: [
      { term: "un week-end", category: "principal" },
      { term: "se promener", category: "verbe" },
      { term: "sortir", category: "verbe" },
      { term: "rester à la maison", category: "expression" },
      { term: "s'ennuyer", category: "verbe" },
      { term: "s'amuser", category: "verbe" },
      { term: "une fois", category: "connecteur" },
      { term: "tout à coup", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Passé composé et imparfait, contraste élémentaire",
        explanation:
          "Le passé composé raconte les actions (nous sommes allés à la campagne), l'imparfait décrit le contexte ou une habitude (il faisait beau, c'était calme). Dans un petit récit, on mélange souvent les deux.",
      },
      {
        title: "Les connecteurs chronologiques",
        explanation:
          "d'abord, ensuite, après, enfin permettent d'organiser un récit dans l'ordre où les choses se sont passées, pour que l'histoire soit facile à suivre.",
      },
    ],
    examLinks: ["DELF A2 — production orale", "TCF IRN — expression orale, tâche 2"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "wknd-comprendre",
        type: "comprendre",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "wknd-comprendre-activite",
            title: "Écouter un récit de week-end",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "wknd-e",
                type: "comprehension_orale",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Écoutez Léa et Nora parler de leur week-end, puis répondez.",
                audioSrc: "/audio/a2/a2-recit-weekend-entre-amies.m4a",
                transcript:
                  "Léa : Alors, raconte, comment s'est passé ton week-end ?\nNora : Très bien, je suis allée à la campagne chez mes parents. Samedi matin, j'ai aidé mon père dans le jardin, et l'après-midi, on a fait une grande balade en forêt avec le chien.\nLéa : Ça a l'air sympa. Et dimanche ?\nNora : Dimanche, il a plu toute la matinée, donc on est restés à la maison, on a joué aux cartes et regardé un film. Puis l'après-midi, le soleil est revenu, alors on est sortis manger une glace au village.\nLéa : Super ! Moi j'ai eu un week-end beaucoup plus calme : samedi j'ai fait le ménage et les courses, et dimanche je suis restée chez moi à lire toute la journée. J'avais vraiment besoin de me reposer.\nNora : Ça fait aussi du bien de temps en temps ! On se voit cette semaine ?\nLéa : Oui, avec plaisir, on s'appelle.",
                questions: [
                  {
                    kind: "qcm",
                    id: "wknd-e-q1",
                    prompt: "Qu'a fait Nora samedi après-midi ?",
                    choices: [
                      { id: "a", text: "Du jardinage" },
                      { id: "b", text: "Une balade en forêt" },
                      { id: "c", text: "Du ménage" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Une balade en forêt", explanation: "Le matin elle a jardiné, « et l'après-midi, on a fait une grande balade en forêt »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "wknd-e-q2",
                    prompt: "Il a plu toute la journée de dimanche chez Nora.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux", explanation: "Il a plu seulement le matin ; l'après-midi, « le soleil est revenu »." },
                  },
                  {
                    kind: "qcm",
                    id: "wknd-e-q3",
                    prompt: "Comment Léa a-t-elle passé son week-end ?",
                    choices: [
                      { id: "a", text: "En voyage" },
                      { id: "b", text: "Très occupée avec des amis" },
                      { id: "c", text: "Calme, à la maison" },
                    ],
                    correctChoiceId: "c",
                    correction: { correctAnswer: "Calme, à la maison", explanation: "Elle décrit un week-end « beaucoup plus calme » entre ménage, courses et lecture." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "wknd-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "wknd-entrainement-activite",
            title: "Raconter dans l'ordre",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "wknd-g1",
                type: "qcm",
                skillId: "a2-gr-passe-compose-imparfait-contraste",
                difficulty: "A2",
                instructions: "Choisis le bon temps.",
                question: {
                  kind: "qcm",
                  id: "wknd-g1-q",
                  prompt: "« Il ___ beau, alors nous sommes sortis. » (description du contexte)",
                  choices: [
                    { id: "a", text: "faisait" },
                    { id: "b", text: "a fait" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "faisait",
                    explanation: "L'imparfait décrit le contexte (le temps qu'il faisait) au moment de l'action.",
                  },
                },
              },
              {
                id: "wknd-g2",
                type: "remise_en_ordre",
                skillId: "a2-gr-connecteurs-chronologiques",
                difficulty: "A2",
                instructions: "Remets les connecteurs dans l'ordre logique du récit.",
                items: [
                  { id: "1", text: "d'abord" },
                  { id: "2", text: "ensuite" },
                  { id: "3", text: "après" },
                  { id: "4", text: "enfin" },
                ],
                correctOrder: ["1", "2", "3", "4"],
                correction: {
                  correctAnswer: "d'abord — ensuite — après — enfin",
                  explanation: "C'est l'ordre classique pour organiser un petit récit chronologique.",
                },
              },
              {
                id: "wknd-g3",
                type: "texte_a_trous",
                skillId: "a2-gr-passe-compose-imparfait-contraste",
                difficulty: "A2",
                instructions: "Complète avec le passé composé ou l'imparfait.",
                textWithBlanks:
                  "Samedi, je {{1}} (aller) au marché. Il {{2}} (faire) très froid. Ensuite, je {{3}} (rentrer) vite à la maison.",
                blanks: [
                  { id: "1", answer: "suis allé" },
                  { id: "2", answer: "faisait" },
                  { id: "3", answer: "suis rentré" },
                ],
                correction: {
                  correctAnswer: "suis allé — faisait — suis rentré",
                  explanation: "Les actions (aller, rentrer) sont au passé composé, la description du temps (il faisait froid) est à l'imparfait.",
                },
              },
              {
                id: "wknd-g4",
                type: "vrai_faux",
                skillId: "a2-gr-connecteurs-chronologiques",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Enfin » se place toujours au début d'un récit.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Enfin » conclut un récit ; « d'abord » se place au début.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "wknd-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "wknd-ecriture-activite",
            title: "Raconter son week-end par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "wknd-h",
                type: "production_ecrite",
                skillId: "a2-pe-raconter-brievement",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Raconte ton dernier week-end à un ami dans un message : ce que tu as fait, dans l'ordre, avec " +
                  "au moins deux connecteurs chronologiques (d'abord, ensuite, après, enfin).",
                minWords: 40,
                maxWords: 70,
                correctionCriteria: [
                  "Récit clairement organisé dans le temps (/2)",
                  "Au moins deux connecteurs chronologiques (/1)",
                  "Passé composé correctement utilisé (/1)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "wknd-ecriture-activite-orale",
            title: "Raconter son week-end à l'oral",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "wknd-h-oral",
                type: "production_orale",
                skillId: "a2-pe-raconter-brievement",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Comme Yasmine et Camille, raconte ton week-end à voix haute à un ami imaginaire, et propose-lui une sortie.",
                context: "Même situation que Camille et Yasmine au téléphone, mais c'est toi qui racontes.",
                prepSeconds: 30,
                maxSpeakSeconds: 45,
                selfAssessmentCriteria: [
                  "J'ai raconté au moins deux activités.",
                  "J'ai utilisé un connecteur chronologique.",
                  "J'ai proposé une sortie à la fin.",
                ],
                tips: "Utilise « d'abord » pour commencer et termine par ta proposition de sortie.",
              },
            ],
          },
        ],
      },
      {
        id: "wknd-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "wknd-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "wknd-i1",
                type: "qcm",
                skillId: "a2-gr-passe-compose-imparfait-contraste",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "wknd-i1-q",
                  prompt: "« Nous ___ au cinéma samedi soir. » (action ponctuelle)",
                  choices: [
                    { id: "a", text: "sommes allés" },
                    { id: "b", text: "allions" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "sommes allés", explanation: "Une action ponctuelle et terminée se raconte au passé composé." },
                },
              },
              {
                id: "wknd-i2",
                type: "reponse_courte",
                skillId: "a2-gr-connecteurs-chronologiques",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel connecteur utiliser pour conclure un récit : « ___, on est rentrés » ?",
                acceptedAnswers: ["enfin"],
                correction: { correctAnswer: "enfin", explanation: "« Enfin » conclut un récit chronologique." },
              },
              {
                id: "wknd-i3",
                type: "vrai_faux",
                skillId: "a2-co-dialogues-quotidiens",
                difficulty: "A2",
                instructions: "Item 3. D'après le dialogue écouté.",
                statement: "Camille et Yasmine décident de ne plus se voir.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Au contraire, elles décident de sortir ensemble le week-end suivant.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a2-communiquer-au-quotidien",
    slug: "communiquer-au-quotidien",
    level: "A2",
    title: "Communiquer au quotidien",
    description:
      "À la fin de ce module, tu pourras écrire un message pour annuler un rendez-vous et répondre à un message en ligne.",
    objectives: [
      "Écrire un SMS pour annuler ou modifier un rendez-vous",
      "Répondre à un message sur un groupe en ligne",
      "Utiliser lui/leur et le futur simple dans un message court",
    ],
    domain: "vocabulaire",
    stageId: "a2-intermediaire",
    estimatedMinutes: 20,
    situation:
      "Léa doit annuler un rendez-vous par SMS, puis elle répond à un message posté sur le groupe en ligne de " +
      "son quartier.",
    vocabulary: [
      { term: "un SMS", category: "principal" },
      { term: "une appli", category: "principal" },
      { term: "un mot de passe", category: "principal" },
      { term: "télécharger", category: "verbe" },
      { term: "envoyer", category: "verbe" },
      { term: "répondre", category: "verbe" },
      { term: "un réseau social", category: "principal" },
      { term: "en ligne", category: "expression" },
      { term: "une notification", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Les pronoms compléments indirects, reprise",
        explanation:
          "lui et leur remplacent « à + personne(s) » : j'écris à mon collègue → je lui écris ; je réponds aux voisins → je leur réponds. Ils évitent de répéter le nom déjà connu.",
      },
      {
        title: "Le futur simple, reprise",
        explanation:
          "Dans un message, le futur simple annonce une action prévue de façon un peu plus formelle que le futur proche : je vous répondrai demain, je le ferai dès que possible.",
      },
    ],
    examLinks: ["TCF IRN — expression écrite"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "num-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "num-comprendre-activite",
            title: "Lire un message de groupe en ligne",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "num-e",
                type: "comprehension_ecrite",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Lisez le message posté sur le groupe en ligne du quartier, puis répondez.",
                text:
                  "Bonjour le groupe ! Je cherche une appli simple pour apprendre le français tous les jours, " +
                  "pas trop compliquée. Vous avez des idées ? Merci d'avance, et n'hésitez pas à m'envoyer un " +
                  "message directement si vous préférez. Bonne journée à tous !",
                questions: [
                  {
                    kind: "qcm",
                    id: "num-e-q1",
                    prompt: "Que cherche la personne qui écrit ce message ?",
                    choices: [
                      { id: "a", text: "Un professeur particulier." },
                      { id: "b", text: "Une application pour apprendre le français." },
                      { id: "c", text: "Un livre de grammaire." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Une application pour apprendre le français.", explanation: "« Je cherche une appli simple pour apprendre le français »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "num-e-q2",
                    prompt: "Vrai ou faux : la personne veut une appli très compliquée.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Elle précise « pas trop compliquée »." },
                  },
                  {
                    kind: "libre",
                    id: "num-e-q3",
                    prompt: "Comment peut-on répondre à cette personne, selon le message ?",
                    expectedAnswer: "En commentant sur le groupe, ou en lui envoyant un message directement.",
                    correction: {
                      correctAnswer: "Sur le groupe, ou par message direct.",
                      explanation: "« n'hésitez pas à m'envoyer un message directement si vous préférez »." ,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "num-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "num-entrainement-activite",
            title: "Écrire des messages courts",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "num-g1",
                type: "qcm",
                skillId: "a2-gr-pronoms-coi",
                difficulty: "A2",
                instructions: "Choisis le bon pronom.",
                question: {
                  kind: "qcm",
                  id: "num-g1-q",
                  prompt: "« Je réponds à mes voisins. » devient :",
                  choices: [
                    { id: "a", text: "Je leur réponds." },
                    { id: "b", text: "Je lui réponds." },
                    { id: "c", text: "Je les réponds." },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "Je leur réponds.", explanation: "« mes voisins » est pluriel : on utilise « leur »." },
                },
              },
              {
                id: "num-g2",
                type: "texte_a_trous",
                skillId: "a2-gr-futur-simple-introduction",
                difficulty: "A2",
                instructions: "Complète au futur simple.",
                textWithBlanks: "Ne t'inquiète pas, je te {{1}} (répondre) demain matin et je {{2}} (envoyer) le document.",
                blanks: [
                  { id: "1", answer: "répondrai" },
                  { id: "2", answer: "enverrai" },
                ],
                correction: {
                  correctAnswer: "répondrai — enverrai",
                  explanation: "« Envoyer » est irrégulier au futur : j'enverrai, tu enverras...",
                },
              },
              {
                id: "num-g3",
                type: "association",
                skillId: "a2-voc-numerique",
                difficulty: "A2",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "télécharger", right: "installer une application sur son téléphone" },
                  { id: "2", left: "une notification", right: "un petit message d'alerte sur le téléphone" },
                  { id: "3", left: "un mot de passe", right: "une suite de caractères secrète pour se connecter" },
                ],
                correction: {
                  correctAnswer: "1 → installer une appli ; 2 → message d'alerte ; 3 → code secret de connexion.",
                  explanation: "Ce vocabulaire numérique est utile dans la vie de tous les jours.",
                },
              },
              {
                id: "num-g4",
                type: "vrai_faux",
                skillId: "a2-gr-pronoms-coi",
                difficulty: "A2",
                instructions: "Vrai ou faux ?",
                statement: "« Lui » ne peut remplacer qu'une personne de sexe féminin.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« Lui » remplace une personne au singulier, homme ou femme : à Marc → lui, à Sarah → lui.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "num-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "num-ecriture-activite",
            title: "Annuler un rendez-vous par SMS",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "num-h",
                type: "production_ecrite",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu dois annuler un rendez-vous prévu demain. Écris un SMS pour t'excuser, expliquer pourquoi, et " +
                  "proposer un autre moment.",
                minWords: 25,
                maxWords: 45,
                correctionCriteria: [
                  "Excuse claire (/1)",
                  "Raison donnée (/1)",
                  "Nouvelle proposition faite (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
          {
            id: "num-ecriture-activite-orale",
            title: "Laisser un message vocal",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "num-h-oral",
                type: "production_orale",
                skillId: "a2-pe-message-informel",
                difficulty: "A2",
                instructions: "Prépare-toi, puis enregistre-toi.",
                consigne: "Laisse un message vocal à un ami pour annuler un rendez-vous et proposer un autre moment.",
                context: "Imagine que tu n'as pas le temps d'écrire, tu préfères appeler.",
                prepSeconds: 30,
                maxSpeakSeconds: 40,
                selfAssessmentCriteria: [
                  "J'ai expliqué pourquoi j'annule.",
                  "J'ai proposé un autre moment.",
                  "Mon message est compréhensible d'un bout à l'autre.",
                ],
                tips: "Un message vocal reste court et direct : va à l'essentiel.",
              },
            ],
          },
        ],
      },
      {
        id: "num-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "num-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "num-i1",
                type: "qcm",
                skillId: "a2-gr-pronoms-coi",
                difficulty: "A2",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "num-i1-q",
                  prompt: "« J'écris à ma sœur. » devient :",
                  choices: [
                    { id: "a", text: "Je lui écris." },
                    { id: "b", text: "Je la écris." },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "Je lui écris.", explanation: "« à ma sœur » est un complément indirect singulier : « lui »." },
                },
              },
              {
                id: "num-i2",
                type: "reponse_courte",
                skillId: "a2-voc-numerique",
                difficulty: "A2",
                instructions: "Item 2.",
                question: "Quel verbe utiliser pour installer une application : « ___ une appli » ?",
                acceptedAnswers: ["télécharger"],
                correction: { correctAnswer: "télécharger", explanation: "« Télécharger » = installer une application ou un fichier sur son appareil." },
              },
              {
                id: "num-i3",
                type: "vrai_faux",
                skillId: "a2-ce-messages-courts",
                difficulty: "A2",
                instructions: "Item 3. D'après le message du groupe en ligne.",
                statement: "La personne refuse tout message direct.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Elle propose au contraire d'envoyer un message directement si on préfère.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
