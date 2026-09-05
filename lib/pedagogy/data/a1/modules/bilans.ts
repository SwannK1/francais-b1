import type { A1Module } from "@/lib/pedagogy/data/a1/types";

/**
 * Bilans intermédiaires — un par grande étape de contenu (voir
 * `docs/integration/a1-content.md` § progression). Chaque bilan recycle le
 * vocabulaire et la grammaire des modules précédents dans des mini-dialogues
 * qui combinent plusieurs notions déjà vues, conformément à la consigne
 * "Milieu A1" (mini-dialogues, plusieurs informations, combinaisons de
 * notions déjà étudiées). Placé en dernier module de son étape.
 */
export const MODULES_A1_BILANS: A1Module[] = [
  {
    id: "a1-bilan-intermediaire-1",
    slug: "bilan-intermediaire-1",
    level: "A1",
    title: "Bilan intermédiaire 1",
    description:
      "Ce bilan reprend les modules 1 à 9 : se présenter, les nombres, la nationalité, la famille, décrire quelqu'un, la maison, les dates et l'heure.",
    objectives: [
      "Réutiliser le vocabulaire de l'identité, de la famille et de la maison",
      "Combiner plusieurs informations dans un même dialogue",
      "Vérifier ses acquis avant de continuer",
    ],
    domain: "vocabulaire",
    stageId: "a1-vie-quotidienne",
    estimatedMinutes: 22,
    situation:
      "Amélie retrouve un ancien ami, Diego, dans une fête entre voisins. Ils se présentent et parlent de leur vie.",
    vocabulary: [
      { term: "se présenter", category: "expression" },
      { term: "la famille", category: "principal" },
      { term: "l'âge", category: "principal" },
      { term: "la nationalité", category: "principal" },
      { term: "le logement", category: "principal" },
      { term: "la date, l'heure", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Récapitulatif : être, avoir, venir",
        explanation:
          "Ces trois verbes reviennent dans presque toutes les présentations : être pour l'identité (je suis...), avoir pour l'âge (j'ai... ans), venir pour l'origine (je viens de...).",
      },
      {
        title: "Récapitulatif : les possessifs et il y a",
        explanation:
          "mon/ma/mes... pour la famille et les affaires ; il y a pour signaler une présence (dans une maison, une ville...).",
      },
    ],
    miniEvaluationThreshold: 4,
    lessons: [
      {
        id: "bilan-intermediaire-1-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-1-comprendre-activite",
            title: "Lire un dialogue qui combine plusieurs sujets",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "b01-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le dialogue, puis réponds.",
                text:
                  "— Diego ! Ça fait longtemps ! Tu habites toujours ici ?\n" +
                  "— Oui, j'ai un nouvel appartement, pas loin. Il y a deux chambres, c'est parfait pour moi et " +
                  "ma fille.\n" +
                  "— Ta fille a quel âge maintenant ?\n" +
                  "— Elle a 8 ans. Et toi, tu es toujours à Paris ?\n" +
                  "— Non, je viens de déménager à Lyon, le 3 mars dernier.",
                questions: [
                  {
                    kind: "qcm",
                    id: "b01-e1-q1",
                    prompt: "Combien de chambres a l'appartement de Diego ?",
                    choices: [
                      { id: "a", text: "Une" },
                      { id: "b", text: "Deux" },
                      { id: "c", text: "Trois" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Deux", explanation: "« Il y a deux chambres. »" },
                  },
                  {
                    kind: "qcm",
                    id: "b01-e1-q2",
                    prompt: "Quel âge a la fille de Diego ?",
                    choices: [
                      { id: "a", text: "3 ans" },
                      { id: "b", text: "18 ans" },
                      { id: "c", text: "8 ans" },
                    ],
                    correctChoiceId: "c",
                    correction: { correctAnswer: "8 ans", explanation: "« Elle a 8 ans. »" },
                  },
                  {
                    kind: "vrai_faux",
                    id: "b01-e1-q3",
                    prompt: "Vrai ou faux : Amélie habite toujours à Paris.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Elle « vient de déménager à Lyon »." },
                  },
                  {
                    kind: "libre",
                    id: "b01-e1-q4",
                    prompt: "Quelle est la date du déménagement d'Amélie ?",
                    expectedAnswer: "Le 3 mars.",
                    correction: { correctAnswer: "Le 3 mars", explanation: "« Le 3 mars dernier. »" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-1-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-1-entrainement-activite",
            title: "Réviser identité, famille et maison",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "b01-g1",
                type: "texte_a_trous",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Complète avec être, avoir ou venir conjugués.",
                textWithBlanks: "Je m'appelle Diego, je {{1}} (avoir) 40 ans et je {{2}} (venir) d'Espagne. Ma fille {{3}} (être) petite.",
                blanks: [
                  { id: "1", answer: "ai" },
                  { id: "2", answer: "viens" },
                  { id: "3", answer: "est" },
                ],
                correction: { correctAnswer: "ai — viens — est", explanation: "j'ai, je viens, elle est : formes du présent." },
              },
              {
                id: "b01-g2",
                type: "qcm",
                skillId: "a1-gr-possessifs",
                difficulty: "A1",
                instructions: "Choisis le bon possessif.",
                question: {
                  kind: "qcm",
                  id: "b01-g2-q",
                  prompt: "Diego présente ___ fille.",
                  choices: [
                    { id: "a", text: "sa" },
                    { id: "b", text: "son" },
                    { id: "c", text: "ses" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "sa", explanation: "« Fille » est féminin singulier : sa fille." },
                },
              },
              {
                id: "b01-g3",
                type: "association",
                skillId: "a1-voc-description",
                difficulty: "A1",
                instructions: "Associe chaque question au thème correspondant.",
                pairs: [
                  { id: "1", left: "Quel âge as-tu ?", right: "l'âge" },
                  { id: "2", left: "Tu viens d'où ?", right: "l'origine" },
                  { id: "3", left: "Il y a combien de pièces ?", right: "le logement" },
                ],
                correction: {
                  correctAnswer: "1 → l'âge ; 2 → l'origine ; 3 → le logement",
                  explanation: "Chaque question renvoie à un thème étudié dans les modules 1 à 9.",
                },
              },
              {
                id: "b01-g4",
                type: "remise_en_ordre",
                skillId: "a1-gr-interrogation",
                difficulty: "A1",
                instructions: "Remets les mots dans l'ordre pour former une question correcte.",
                items: [
                  { id: "a", text: "vous" },
                  { id: "b", text: "est-ce que" },
                  { id: "c", text: "habitez" },
                  { id: "d", text: "ici" },
                ],
                correctOrder: ["b", "a", "c", "d"],
                correction: {
                  correctAnswer: "Est-ce que vous habitez ici ?",
                  explanation: "« Est-ce que » se place en tête, suivi du sujet et du verbe.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-1-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-1-ecriture-activite",
            title: "Se présenter en détail",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "b01-h",
                type: "production_ecrite",
                skillId: "a1-pe-se-presenter",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne:
                  "Présente-toi en 5 phrases : ton nom, ton âge, ta nationalité, un membre de ta famille, et ton logement.",
                minWords: 25,
                maxWords: 60,
                correctionCriteria: [
                  "Nom et âge donnés avec être/avoir (/2)",
                  "Nationalité et origine données (/1)",
                  "Un membre de la famille mentionné avec un possessif (/1)",
                  "Le logement est décrit avec il y a (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-1-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-1-evaluation-activite",
            title: "Bilan intermédiaire",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "b01-i1",
                type: "qcm",
                skillId: "a1-gr-etre-avoir",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "b01-i1-q",
                  prompt: "Nous ___ 30 ans.",
                  choices: [
                    { id: "a", text: "avons" },
                    { id: "b", text: "sommes" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "avons", explanation: "On utilise « avoir » pour l'âge : nous avons 30 ans." },
                },
              },
              {
                id: "b01-i2",
                type: "reponse_courte",
                skillId: "a1-voc-famille",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Comment appelle-t-on la mère de son père ou de sa mère ?",
                acceptedAnswers: ["une grand-mère", "grand-mère", "la grand-mère"],
                correction: { correctAnswer: "une grand-mère", explanation: "La mère du père ou de la mère est « une grand-mère »." },
              },
              {
                id: "b01-i3",
                type: "vrai_faux",
                skillId: "a1-gr-il-y-a-cest",
                difficulty: "A1",
                instructions: "Item 3.",
                statement: "« Il y a » sert à présenter quelqu'un, comme « je m'appelle ».",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« Il y a » signale une présence (un objet, un lieu), pas une présentation personnelle." },
              },
              {
                id: "b01-i4",
                type: "qcm",
                skillId: "a1-voc-vetements",
                difficulty: "A1",
                instructions: "Item 4.",
                question: {
                  kind: "qcm",
                  id: "b01-i4-q",
                  prompt: "Quelle couleur ne s'accorde jamais ?",
                  choices: [
                    { id: "a", text: "marron" },
                    { id: "b", text: "bleue" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "marron", explanation: "Marron et orange sont invariables." },
                },
              },
              {
                id: "b01-i5",
                type: "reponse_courte",
                skillId: "a1-voc-temps",
                difficulty: "A1",
                instructions: "Item 5.",
                question: "Quel jour vient après dimanche ?",
                acceptedAnswers: ["lundi"],
                correction: { correctAnswer: "lundi", explanation: "La semaine recommence le lundi." },
              },
              {
                id: "b01-i6",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 6. D'après le dialogue de ce module.",
                statement: "Diego a une fille de 8 ans.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "« Elle a 8 ans. »" },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a1-bilan-intermediaire-2",
    slug: "bilan-intermediaire-2",
    level: "A1",
    title: "Bilan intermédiaire 2",
    description:
      "Ce bilan reprend les modules 10 à 14 : la ville, les transports, le restaurant, les courses et les achats.",
    objectives: [
      "Réutiliser le vocabulaire de la ville, des transports et des achats",
      "Combiner plusieurs informations pratiques dans un même dialogue",
      "Vérifier ses acquis avant de continuer",
    ],
    domain: "vocabulaire",
    stageId: "a1-sortir-et-bouger",
    estimatedMinutes: 22,
    situation:
      "Le samedi matin, Karim organise sa journée : courses, banque et un café avec un ami avant de reprendre le train.",
    vocabulary: [
      { term: "la ville", category: "principal" },
      { term: "les transports", category: "principal" },
      { term: "commander", category: "verbe" },
      { term: "les courses", category: "principal" },
      { term: "un achat", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Récapitulatif : prépositions de lieu et quantité",
        explanation:
          "au/à la/à l' pour se déplacer vers un lieu (je vais au marché) ; un kilo de / un peu de pour préciser une quantité (un kilo de pommes).",
      },
      {
        title: "Récapitulatif : je voudrais / avez-vous",
        explanation:
          "« Je voudrais » pour commander ou demander poliment ; « avez-vous... ? » pour vérifier qu'un produit est disponible.",
      },
    ],
    miniEvaluationThreshold: 4,
    lessons: [
      {
        id: "bilan-intermediaire-2-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-2-comprendre-activite",
            title: "Lire un programme de journée",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "b02-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le message de Karim, puis réponds.",
                text:
                  "Ce matin, je vais d'abord à la boulangerie, puis au marché pour acheter un kilo de tomates et " +
                  "du fromage. Ensuite, je prends le bus pour aller à la banque. À midi, je retrouve Sam au café : " +
                  "je voudrais juste un café, mais lui, il va sûrement commander un sandwich aussi. Après, je " +
                  "prends le train de 15h pour rentrer.",
                questions: [
                  {
                    kind: "qcm",
                    id: "b02-e1-q1",
                    prompt: "Que fait Karim en premier ?",
                    choices: [
                      { id: "a", text: "Il va à la banque." },
                      { id: "b", text: "Il va à la boulangerie." },
                      { id: "c", text: "Il prend le train." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Il va à la boulangerie.", explanation: "« Ce matin, je vais d'abord à la boulangerie. »" },
                  },
                  {
                    kind: "qcm",
                    id: "b02-e1-q2",
                    prompt: "Comment Karim va-t-il à la banque ?",
                    choices: [
                      { id: "a", text: "À pied" },
                      { id: "b", text: "En bus" },
                      { id: "c", text: "En train" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "En bus", explanation: "« Je prends le bus pour aller à la banque. »" },
                  },
                  {
                    kind: "vrai_faux",
                    id: "b02-e1-q3",
                    prompt: "Vrai ou faux : Karim commande un sandwich au café.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il voudrait « juste un café » ; c'est Sam qui commandera peut-être un sandwich." },
                  },
                  {
                    kind: "libre",
                    id: "b02-e1-q4",
                    prompt: "À quelle heure part le train de Karim ?",
                    expectedAnswer: "15h",
                    correction: { correctAnswer: "15h", explanation: "« Je prends le train de 15h pour rentrer. »" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-2-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-2-entrainement-activite",
            title: "Réviser ville, transports et achats",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "b02-g1",
                type: "texte_a_trous",
                skillId: "a1-gr-prepositions-lieu",
                difficulty: "A1",
                instructions: "Complète avec au, à la ou à l'.",
                textWithBlanks: "Je vais {{1}} marché, puis {{2}} banque, et enfin {{3}} arrêt de bus.",
                blanks: [
                  { id: "1", answer: "au" },
                  { id: "2", answer: "à la" },
                  { id: "3", answer: "à l'" },
                ],
                correction: { correctAnswer: "au — à la — à l'", explanation: "à + le → au ; à + la reste à la ; à + voyelle → à l'." },
              },
              {
                id: "b02-g2",
                type: "qcm",
                skillId: "a1-gr-verbes-irreguliers",
                difficulty: "A1",
                instructions: "Choisis la bonne forme.",
                question: {
                  kind: "qcm",
                  id: "b02-g2-q",
                  prompt: "Nous ___ le train à 15h.",
                  choices: [
                    { id: "a", text: "prenons" },
                    { id: "b", text: "prend" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "prenons", explanation: "Avec « nous », on utilise « prenons »." },
                },
              },
              {
                id: "b02-g3",
                type: "association",
                skillId: "a1-voc-achats",
                difficulty: "A1",
                instructions: "Associe la situation au lieu correspondant.",
                pairs: [
                  { id: "1", left: "acheter du pain", right: "la boulangerie" },
                  { id: "2", left: "retirer de l'argent", right: "la banque" },
                  { id: "3", left: "prendre un café", right: "le café" },
                ],
                correction: {
                  correctAnswer: "1 → la boulangerie ; 2 → la banque ; 3 → le café",
                  explanation: "Chaque activité correspond à un lieu précis en ville.",
                },
              },
              {
                id: "b02-g4",
                type: "remise_en_ordre",
                skillId: "a1-voc-quotidien",
                difficulty: "A1",
                instructions: "Remets les étapes de la journée de Karim dans l'ordre.",
                items: [
                  { id: "a", text: "Il prend le bus pour la banque." },
                  { id: "b", text: "Il va à la boulangerie." },
                  { id: "c", text: "Il retrouve Sam au café." },
                  { id: "d", text: "Il prend le train de 15h." },
                ],
                correctOrder: ["b", "a", "c", "d"],
                correction: {
                  correctAnswer: "boulangerie → banque → café → train",
                  explanation: "C'est l'ordre du texte lu dans la compréhension écrite.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-2-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-2-ecriture-activite",
            title: "Raconter une sortie",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "b02-h",
                type: "production_ecrite",
                skillId: "a1-pe-message-simple",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne:
                  "Écris 5 phrases pour raconter une sortie en ville : où tu vas, comment tu y vas, ce que tu achètes ou commandes.",
                minWords: 25,
                maxWords: 60,
                correctionCriteria: [
                  "Au moins deux lieux nommés avec la bonne préposition (/2)",
                  "Un moyen de transport mentionné (/1)",
                  "Un achat ou une commande mentionné (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-2-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-2-evaluation-activite",
            title: "Bilan intermédiaire",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "b02-i1",
                type: "qcm",
                skillId: "a1-gr-prepositions-lieu",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "b02-i1-q",
                  prompt: "Je vais ___ pharmacie.",
                  choices: [
                    { id: "a", text: "à la" },
                    { id: "b", text: "au" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "à la", explanation: "« Pharmacie » est féminin : à la pharmacie." },
                },
              },
              {
                id: "b02-i2",
                type: "reponse_courte",
                skillId: "a1-voc-transports",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Comment appelle-t-on un billet pour partir sans revenir ?",
                acceptedAnswers: ["un aller simple", "aller simple"],
                correction: { correctAnswer: "un aller simple", explanation: "C'est le contraire de l'aller-retour." },
              },
              {
                id: "b02-i3",
                type: "vrai_faux",
                skillId: "a1-gr-quantite",
                difficulty: "A1",
                instructions: "Item 3.",
                statement: "Après « un kilo de », on met un article (un kilo des pommes).",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "Après une expression de quantité, pas d'article : un kilo de pommes." },
              },
              {
                id: "b02-i4",
                type: "qcm",
                skillId: "a1-voc-achats",
                difficulty: "A1",
                instructions: "Item 4.",
                question: {
                  kind: "qcm",
                  id: "b02-i4-q",
                  prompt: "Avant d'acheter un vêtement, on peut demander à le :",
                  choices: [
                    { id: "a", text: "essayer" },
                    { id: "b", text: "commander" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "essayer", explanation: "On essaie un vêtement avant de l'acheter." },
                },
              },
              {
                id: "b02-i5",
                type: "reponse_courte",
                skillId: "a1-voc-alimentation",
                difficulty: "A1",
                instructions: "Item 5.",
                question: "Que demande-t-on pour payer, au restaurant ?",
                acceptedAnswers: ["l'addition", "addition"],
                correction: { correctAnswer: "l'addition", explanation: "« L'addition, s'il vous plaît. »" },
              },
              {
                id: "b02-i6",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 6. D'après le texte de ce module.",
                statement: "Karim prend le train de 15h.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "« Je prends le train de 15h pour rentrer. »" },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "a1-bilan-intermediaire-3",
    slug: "bilan-intermediaire-3",
    level: "A1",
    title: "Bilan intermédiaire 3",
    description:
      "Ce bilan reprend les modules 15 à 20 : la journée type, les loisirs, le travail, la santé, la météo et les rendez-vous.",
    objectives: [
      "Réutiliser le vocabulaire du quotidien, du travail et des loisirs",
      "Combiner plusieurs informations dans une situation complète",
      "Vérifier ses acquis avant l'entraînement final",
    ],
    domain: "vocabulaire",
    stageId: "a1-quotidien-et-loisirs",
    estimatedMinutes: 22,
    situation:
      "Par message, Léa raconte sa semaine chargée à son amie Nora : travail, rendez-vous chez le médecin et un week-end de loisirs.",
    vocabulary: [
      { term: "le quotidien", category: "principal" },
      { term: "le travail", category: "principal" },
      { term: "les loisirs", category: "principal" },
      { term: "la santé", category: "principal" },
      { term: "un rendez-vous", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Récapitulatif : verbes pronominaux et futur proche",
        explanation:
          "je me lève / je me couche pour le quotidien ; je vais + infinitif pour un projet proche : je vais prendre rendez-vous demain.",
      },
      {
        title: "Récapitulatif : avoir mal à / avoir envie de",
        explanation: "avoir mal à + partie du corps ; aimer/préférer + loisir. Ces structures reviennent souvent ensemble dans un message sur sa semaine.",
      },
    ],
    miniEvaluationThreshold: 4,
    lessons: [
      {
        id: "bilan-intermediaire-3-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-3-comprendre-activite",
            title: "Lire un message sur la semaine",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "b03-e1",
                type: "comprehension_ecrite",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Lis le message de Léa, puis réponds.",
                text:
                  "Coucou ! Ma semaine a été chargée : je me lève à 6h30 tous les jours pour aller travailler. " +
                  "Mardi, j'ai eu mal au dos, alors j'ai pris rendez-vous chez le médecin. Il m'a dit de me " +
                  "reposer un peu. Ce week-end, il va faire beau, donc je vais enfin faire du sport avec des " +
                  "amis, et samedi soir, on se retrouve au restaurant. J'ai hâte !",
                questions: [
                  {
                    kind: "qcm",
                    id: "b03-e1-q1",
                    prompt: "À quelle heure Léa se lève-t-elle ?",
                    choices: [
                      { id: "a", text: "6h30" },
                      { id: "b", text: "7h30" },
                      { id: "c", text: "8h" },
                    ],
                    correctChoiceId: "a",
                    correction: { correctAnswer: "6h30", explanation: "« Je me lève à 6h30 tous les jours. »" },
                  },
                  {
                    kind: "qcm",
                    id: "b03-e1-q2",
                    prompt: "Pourquoi Léa a-t-elle pris rendez-vous chez le médecin ?",
                    choices: [
                      { id: "a", text: "Elle a mal à la tête." },
                      { id: "b", text: "Elle a mal au dos." },
                      { id: "c", text: "Elle a mal au ventre." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Elle a mal au dos.", explanation: "« Mardi, j'ai eu mal au dos. »" },
                  },
                  {
                    kind: "vrai_faux",
                    id: "b03-e1-q3",
                    prompt: "Vrai ou faux : le médecin a dit à Léa de faire beaucoup de sport tout de suite.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il lui a dit « de se reposer un peu »." },
                  },
                  {
                    kind: "libre",
                    id: "b03-e1-q4",
                    prompt: "Que va faire Léa ce week-end, en plus du restaurant ?",
                    expectedAnswer: "Du sport avec des amis.",
                    correction: { correctAnswer: "Du sport avec des amis.", explanation: "« Je vais enfin faire du sport avec des amis. »" },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-3-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-3-entrainement-activite",
            title: "Réviser quotidien, travail et santé",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "b03-g1",
                type: "texte_a_trous",
                skillId: "a1-gr-futur-proche",
                difficulty: "A1",
                instructions: "Complète avec le futur proche.",
                textWithBlanks: "Ce week-end, je {{1}} (aller) faire du sport. Mes amis {{2}} (aller) venir avec moi.",
                blanks: [
                  { id: "1", answer: "vais" },
                  { id: "2", answer: "vont" },
                ],
                correction: { correctAnswer: "vais — vont", explanation: "je vais, ils vont + infinitif." },
              },
              {
                id: "b03-g2",
                type: "qcm",
                skillId: "a1-gr-prepositions-lieu",
                difficulty: "A1",
                instructions: "Choisis la bonne préposition.",
                question: {
                  kind: "qcm",
                  id: "b03-g2-q",
                  prompt: "Léa a mal ___ dos.",
                  choices: [
                    { id: "a", text: "au" },
                    { id: "b", text: "à la" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "au", explanation: "« Dos » est masculin : au dos." },
                },
              },
              {
                id: "b03-g3",
                type: "association",
                skillId: "a1-voc-loisirs",
                difficulty: "A1",
                instructions: "Associe chaque situation au thème correspondant.",
                pairs: [
                  { id: "1", left: "je me lève à 6h30", right: "le quotidien" },
                  { id: "2", left: "j'ai mal au dos", right: "la santé" },
                  { id: "3", left: "je fais du sport avec des amis", right: "les loisirs" },
                ],
                correction: {
                  correctAnswer: "1 → le quotidien ; 2 → la santé ; 3 → les loisirs",
                  explanation: "Chaque phrase du message de Léa illustre un des thèmes des modules 15 à 20.",
                },
              },
              {
                id: "b03-g4",
                type: "remise_en_ordre",
                skillId: "a1-voc-quotidien",
                difficulty: "A1",
                instructions: "Remets les événements de la semaine de Léa dans l'ordre.",
                items: [
                  { id: "a", text: "Elle a mal au dos et prend rendez-vous." },
                  { id: "b", text: "Elle se lève tous les jours à 6h30 pour travailler." },
                  { id: "c", text: "Le médecin lui dit de se reposer." },
                  { id: "d", text: "Le week-end, elle fait du sport et va au restaurant." },
                ],
                correctOrder: ["b", "a", "c", "d"],
                correction: {
                  correctAnswer: "quotidien → problème de santé → conseil du médecin → week-end",
                  explanation: "C'est l'ordre du message de Léa.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-3-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-3-ecriture-activite",
            title: "Raconter sa semaine",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "b03-h",
                type: "production_ecrite",
                skillId: "a1-pe-message-simple",
                difficulty: "A1",
                instructions: "Écris ta réponse.",
                consigne:
                  "Écris un message de 5 phrases à un ami pour raconter ta semaine : ton quotidien, un loisir, et un projet pour le week-end.",
                minWords: 25,
                maxWords: 60,
                correctionCriteria: [
                  "Une activité quotidienne mentionnée (/1)",
                  "Un loisir ou une préférence mentionné (/1)",
                  "Un projet au futur proche (/1)",
                  "Message clair et bien organisé (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "bilan-intermediaire-3-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "bilan-intermediaire-3-evaluation-activite",
            title: "Bilan intermédiaire",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "b03-i1",
                type: "qcm",
                skillId: "a1-gr-futur-proche",
                difficulty: "A1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "b03-i1-q",
                  prompt: "Demain, nous ___ voir le médecin.",
                  choices: [
                    { id: "a", text: "allons" },
                    { id: "b", text: "va" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "allons", explanation: "Avec « nous », on utilise « allons »." },
                },
              },
              {
                id: "b03-i2",
                type: "reponse_courte",
                skillId: "a1-voc-quotidien",
                difficulty: "A1",
                instructions: "Item 2.",
                question: "Quel adverbe utilise-t-on pour dire « 0 fois » ?",
                acceptedAnswers: ["jamais"],
                correction: { correctAnswer: "jamais", explanation: "« Jamais » exprime une fréquence nulle." },
              },
              {
                id: "b03-i3",
                type: "vrai_faux",
                skillId: "a1-voc-sante",
                difficulty: "A1",
                instructions: "Item 3.",
                statement: "« Avoir mal à la tête » et « avoir mal au dos » utilisent la même préposition.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« à la tête » (féminin) mais « au dos » (masculin)." },
              },
              {
                id: "b03-i4",
                type: "qcm",
                skillId: "a1-voc-loisirs",
                difficulty: "A1",
                instructions: "Item 4.",
                question: {
                  kind: "qcm",
                  id: "b03-i4-q",
                  prompt: "Le contraire d'« adorer » est :",
                  choices: [
                    { id: "a", text: "détester" },
                    { id: "b", text: "préférer" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "détester", explanation: "Adorer ≠ détester." },
                },
              },
              {
                id: "b03-i5",
                type: "reponse_courte",
                skillId: "a1-voc-invitations",
                difficulty: "A1",
                instructions: "Item 5.",
                question: "Comment accepter une proposition de rendez-vous avec enthousiasme ?",
                acceptedAnswers: ["avec plaisir"],
                correction: { correctAnswer: "avec plaisir", explanation: "C'est la formule habituelle d'acceptation." },
              },
              {
                id: "b03-i6",
                type: "vrai_faux",
                skillId: "a1-ce-messages-simples",
                difficulty: "A1",
                instructions: "Item 6. D'après le message de ce module.",
                statement: "Léa a mal au dos mardi.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "« Mardi, j'ai eu mal au dos. »" },
              },
            ],
          },
        ],
      },
    ],
  },
];
