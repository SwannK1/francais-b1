import type { Exercise, Module } from "@/lib/pedagogy/types";

/**
 * Modules B1 réels, transcrits depuis les fichiers pilotes rédigés dans le
 * worktree de contenu (`content/b1/modules/module-XX-*.md`, front-matter +
 * sections A à I). Voir la méthode d'adaptation dans le rapport de chantier :
 * transcription manuelle vers ces types, pas de parseur Markdown généraliste
 * pour 5 fichiers connus. Contenu original, aucun sujet DELF/TCF reproduit.
 */
export const MODULES: Module[] = [
  {
    id: "b1-donner-son-opinion",
    slug: "donner-son-opinion",
    level: "B1",
    title: "Donner son opinion",
    description:
      "À la fin de ce module, tu pourras donner ton avis sur un sujet simple et le justifier, à l'oral comme à l'écrit.",
    objectives: [
      "Exprimer un accord ou un désaccord",
      "Justifier une opinion",
      "Réagir à l'opinion d'une autre personne",
    ],
    domain: "production_ecrite",
    stageId: "b1-intermediaire",
    estimatedMinutes: 33,
    situation:
      "Dans l'immeuble de Nadia, les voisins discutent d'un projet : installer des bacs à compost partagés dans la cour. Certains sont pour, d'autres contre. Nadia donne son avis à une réunion de copropriété.",
    vocabulary: [
      { term: "une opinion", category: "principal" },
      { term: "un avis", category: "principal" },
      { term: "un point de vue", category: "principal" },
      { term: "être pour / être contre", category: "principal" },
      { term: "être d'accord / ne pas être d'accord", category: "principal" },
      { term: "une raison", category: "principal" },
      { term: "un argument", category: "principal" },
      { term: "un inconvénient", category: "principal" },
      { term: "un avantage", category: "principal" },
      { term: "convaincre", category: "principal" },
      { term: "hésiter", category: "principal" },
      { term: "changer d'avis", category: "principal" },
      { term: "avoir raison / avoir tort", category: "principal" },
      { term: "selon moi", category: "principal" },
      { term: "à mon avis", category: "principal" },
      { term: "personnellement", category: "principal" },
      { term: "franchement", category: "principal" },
      { term: "au contraire", category: "principal" },
      { term: "« ça dépend » (pour nuancer)", category: "expression" },
      { term: "« je n'ai pas d'avis tranché »", category: "expression" },
      { term: "« tout à fait d'accord »", category: "expression" },
      { term: "« pas du tout d'accord »", category: "expression" },
      { term: "« ça se discute »", category: "expression" },
      { term: "penser que", category: "verbe" },
      { term: "trouver que", category: "verbe" },
      { term: "croire que", category: "verbe" },
      { term: "avoir l'impression que", category: "verbe" },
      { term: "ne pas être sûr que", category: "verbe" },
      { term: "parce que", category: "connecteur" },
      { term: "car", category: "connecteur" },
      { term: "donc", category: "connecteur" },
      { term: "mais", category: "connecteur" },
      { term: "par contre", category: "connecteur" },
      { term: "d'un côté... de l'autre", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Exprimer une opinion",
        explanation:
          "On utilise un verbe d'opinion + « que » + indicatif : Je pense que c'est une bonne idée. Je trouve que c'est compliqué.",
      },
      {
        title: "Les pronoms compléments : le, la, les, lui, leur",
        explanation:
          "Ils remplacent un nom déjà mentionné, pour éviter de le répéter. Tu as vu le projet ? — Oui, je l'ai vu (le = le projet). Tu as parlé à Nadia ? — Oui, je lui ai parlé (lui = à Nadia). Vous avez expliqué aux voisins ? — Oui, on leur a expliqué.",
      },
      {
        title: "Introduction à y et en",
        explanation:
          "« y » remplace un lieu ou « à + chose » : Tu penses au projet ? — Oui, j'y pense. « en » remplace « de + chose » ou une quantité : Tu as des arguments ? — Oui, j'en ai. Au B1, on retient surtout l'usage avec les verbes courants (penser à, avoir besoin de, parler de) — l'approfondissement vient plus tard dans le parcours.",
      },
    ],
    examLinks: [
      "DELF B1 — production orale (monologue suivi)",
      "TCF IRN — expression orale, tâche 3",
    ],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "donner-son-opinion-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "donner-son-opinion-comprendre-activite",
            title: "Lire un message sur le compost partagé",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "opinion-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le message, puis répondez aux questions.",
                text:
                  "Bonjour à tous, comme vous le savez, le syndic propose d'installer des bacs à compost " +
                  "partagés dans la cour. Personnellement, je trouve que c'est une très bonne idée : ça " +
                  "réduit nos déchets et ça peut servir pour les plantes de la cour. Mais je comprends " +
                  "aussi les voisins qui s'inquiètent des odeurs, surtout en été. À mon avis, si le compost " +
                  "est bien entretenu, il n'y a pas de problème. Qu'en pensez-vous ? Merci de répondre " +
                  "avant la réunion de copropriété de vendredi. — Nadia, appartement 12",
                questions: [
                  {
                    kind: "libre",
                    id: "opinion-e-q1",
                    prompt: "Quel est le projet dont parle Nadia ?",
                    expectedAnswer: "Installer des bacs à compost partagés dans la cour.",
                    correction: {
                      correctAnswer: "Installer des bacs à compost partagés dans la cour.",
                      explanation: "C'est l'objet du message dès la première phrase.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "opinion-e-q2",
                    prompt: "Vrai ou faux : Nadia est totalement contre ce projet.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Elle trouve que c'est une très bonne idée, même si elle comprend les inquiétudes.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "opinion-e-q3",
                    prompt: "Quel avantage Nadia voit-elle au compost ?",
                    expectedAnswer: "Réduire les déchets et servir pour les plantes de la cour.",
                    correction: {
                      correctAnswer: "Réduire les déchets et servir pour les plantes de la cour.",
                      explanation: "Nadia cite ces deux avantages juste après avoir donné son avis.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "opinion-e-q4",
                    prompt: "Quelle inquiétude certains voisins ont-ils ?",
                    expectedAnswer: "Les odeurs, surtout en été.",
                    correction: {
                      correctAnswer: "Les odeurs, surtout en été.",
                      explanation: "Nadia reconnaît cette inquiétude avant d'y répondre.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "opinion-e-q5",
                    prompt: "Que demande Nadia à la fin du message ?",
                    choices: [
                      { id: "a", text: "De voter tout de suite." },
                      { id: "b", text: "De donner son avis avant vendredi." },
                      { id: "c", text: "D'acheter un bac à compost." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "De donner son avis avant vendredi.",
                      explanation: "Le message se termine par « merci de répondre avant la réunion de copropriété de vendredi ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "donner-son-opinion-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "donner-son-opinion-ecoute-activite",
            title: "Écouter un débat entre voisins",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "opinion-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez le dialogue (« Pour ou contre le compost ? », Nadia et Marc, 1 min 30), puis répondez.",
                audioSrc: "/audio/b1/donner-son-opinion.mp3",
                transcript:
                  "Marc — Moi, franchement, je suis contre ce projet de compost.\n" +
                  "Nadia — Ah bon ? Pourquoi ?\n" +
                  "Marc — Parce que je pense que ça va sentir mauvais, surtout l'été, et qu'il va y avoir des insectes.\n" +
                  "Nadia — Je comprends ton inquiétude, mais je ne suis pas d'accord avec toi. Si on l'entretient bien, il n'y a pas de mauvaise odeur.\n" +
                  "Marc — Peut-être, mais qui va s'en occuper ? Personne n'a le temps pour ça.\n" +
                  "Nadia — On peut organiser un planning, un voisin différent chaque semaine. À mon avis, ça peut vraiment marcher si on s'organise.\n" +
                  "Marc — Bon, ça se discute. Mais j'aimerais qu'on essaie d'abord pendant trois mois, pour voir.\n" +
                  "Nadia — Ça me semble raisonnable, oui. On propose ça à la réunion ?\n" +
                  "Marc — D'accord, on propose ça.",
                questions: [
                  {
                    kind: "libre",
                    id: "opinion-f-q1",
                    prompt: "Quel est l'avis de Marc au début ?",
                    expectedAnswer: "Il est contre le projet de compost.",
                    correction: { correctAnswer: "Il est contre le projet de compost.", explanation: "Il le dit dès sa première réplique." },
                  },
                  {
                    kind: "libre",
                    id: "opinion-f-q2",
                    prompt: "Pourquoi Marc s'inquiète-t-il ?",
                    expectedAnswer: "Il pense que ça va sentir mauvais et attirer des insectes.",
                    correction: { correctAnswer: "Il pense que ça va sentir mauvais et attirer des insectes.", explanation: "C'est la raison qu'il donne à Nadia." },
                  },
                  {
                    kind: "libre",
                    id: "opinion-f-q3",
                    prompt: "Quelle solution Nadia propose-t-elle pour l'entretien ?",
                    expectedAnswer: "Organiser un planning avec un voisin différent chaque semaine.",
                    correction: { correctAnswer: "Organiser un planning avec un voisin différent chaque semaine.", explanation: "C'est sa réponse au « qui va s'en occuper ? » de Marc." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "opinion-f-q4",
                    prompt: "Vrai ou faux : à la fin, Marc reste complètement contre le projet.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il accepte un essai de trois mois." },
                  },
                  {
                    kind: "libre",
                    id: "opinion-f-q5",
                    prompt: "Que décident-ils de proposer à la réunion ?",
                    expectedAnswer: "Un essai du compost pendant trois mois.",
                    correction: { correctAnswer: "Un essai du compost pendant trois mois.", explanation: "C'est le compromis trouvé à la fin du dialogue." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "donner-son-opinion-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "donner-son-opinion-entrainement-activite",
            title: "Pronoms compléments et vocabulaire de l'opinion",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "opinion-g1",
                type: "qcm",
                skillId: "gr-pronoms-complements",
                difficulty: "B1",
                instructions: "Quel pronom utiliser ?",
                question: {
                  kind: "qcm",
                  id: "opinion-g1-q",
                  prompt: "« Tu as parlé à Marc du projet ? » → « Oui, je ___ ai parlé. »",
                  choices: [
                    { id: "a", text: "le" },
                    { id: "b", text: "lui" },
                    { id: "c", text: "y" },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "lui",
                    explanation: "« à Marc » est remplacé par « lui » (pronom complément d'objet indirect).",
                  },
                },
              },
              {
                id: "opinion-g2",
                type: "texte_a_trous",
                skillId: "gr-pronoms-complements",
                difficulty: "B1",
                instructions: "Complète avec le, la, les, lui, leur, y ou en.",
                textWithBlanks:
                  "Tu as vu le message de Nadia ? — Oui, je {{1}} ai vu. Vous pensez au compost ? — Oui, on {{2}} pense. " +
                  "Elle a parlé aux voisins ? — Oui, elle {{3}} a parlé. Tu as des arguments ? — Oui, j'{{4}} ai plusieurs.",
                blanks: [
                  { id: "1", answer: "l'" },
                  { id: "2", answer: "y" },
                  { id: "3", answer: "leur" },
                  { id: "4", answer: "en" },
                ],
                correction: {
                  correctAnswer: "l' — y — leur — en",
                  explanation: "Chaque pronom remplace un groupe déjà mentionné : le message → l', au compost → y, aux voisins → leur, des arguments → en.",
                },
              },
              {
                id: "opinion-g3",
                type: "qcm",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Choisis le bon mot.",
                question: {
                  kind: "qcm",
                  id: "opinion-g3-q",
                  prompt: "« Je suis ___ avec toi, mais je trouve que c'est un peu compliqué à organiser. »",
                  choices: [
                    { id: "a", text: "d'accord" },
                    { id: "b", text: "pour" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "d'accord",
                    explanation: "On est d'accord AVEC quelqu'un ; on est pour ou contre un projet.",
                  },
                },
              },
              {
                id: "opinion-g4",
                type: "association",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Associe chaque opinion à son argument.",
                pairs: [
                  { id: "1", left: "Je suis pour le compost...", right: "parce que ça réduit les déchets." },
                  { id: "2", left: "Je suis contre...", right: "car c'est trop de travail." },
                  { id: "3", left: "Je n'ai pas d'avis tranché...", right: "je vois des avantages et des inconvénients." },
                ],
                correction: {
                  correctAnswer: "1 → réduit les déchets ; 2 → trop de travail ; 3 → avantages et inconvénients.",
                  explanation: "Chaque prise de position B1 s'accompagne d'une justification introduite par un connecteur de cause.",
                },
              },
              {
                id: "opinion-g5",
                type: "remise_en_ordre",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Remets les mots dans l'ordre pour former une phrase correcte.",
                items: [
                  { id: "a", text: "Si" },
                  { id: "b", text: "le compost" },
                  { id: "c", text: "est bien entretenu," },
                  { id: "d", text: "il n'y a pas" },
                  { id: "e", text: "de problème." },
                ],
                correctOrder: ["a", "b", "c", "d", "e"],
                correction: {
                  correctAnswer: "Si le compost est bien entretenu, il n'y a pas de problème.",
                  explanation: "La condition (« si... ») précède toujours sa conséquence dans cette structure.",
                },
              },
              {
                id: "opinion-g6",
                type: "reponse_courte",
                skillId: "pe-exprimer-avis",
                difficulty: "B1",
                instructions: "Réponds en une phrase courte, d'après le dialogue de la partie « Compréhension orale ».",
                question: "Quel compromis Marc et Nadia trouvent-ils ?",
                acceptedAnswers: [
                  "un essai du compost pendant trois mois",
                  "essai pendant trois mois",
                  "ils décident de proposer un essai du compost pendant trois mois",
                ],
                correction: {
                  correctAnswer: "Ils décident de proposer un essai du compost pendant trois mois, pour voir si ça fonctionne.",
                  explanation: "C'est la conclusion du dialogue, après négociation.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "donner-son-opinion-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "donner-son-opinion-ecriture-activite",
            title: "Donner son avis par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "opinion-h",
                type: "production_ecrite",
                skillId: "pe-exprimer-avis",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Un site d'information demande l'avis des habitants sur un sujet de vie quotidienne (par exemple : les transports, le tri des déchets, le télétravail). Choisis un sujet et écris un court message donnant ton opinion, avec au moins deux arguments.",
                minWords: 80,
                maxWords: 100,
                correctionCriteria: [
                  "Opinion clairement exprimée (/2)",
                  "Au moins deux arguments justifiés (/3)",
                  "Connecteurs d'argumentation utilisés correctement (/2)",
                  "Vocabulaire du module réutilisé (/2)",
                  "Texte compréhensible dans l'ensemble (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "donner-son-opinion-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: false,
        activities: [
          {
            id: "donner-son-opinion-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "opinion-i1",
                type: "qcm",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "opinion-i1-q",
                  prompt: "« Je ___ que c'est une bonne idée. »",
                  choices: [
                    { id: "a", text: "suis" },
                    { id: "b", text: "pense" },
                    { id: "c", text: "fais" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "pense", explanation: "« penser que » + indicatif exprime une opinion." },
                },
              },
              {
                id: "opinion-i2",
                type: "reponse_courte",
                skillId: "gr-pronoms-complements",
                difficulty: "B1",
                instructions: "Item 2. Remplace le nom par un pronom.",
                question: "« Tu as vu Marc ? » → « Oui, je ___ ai vu. »",
                acceptedAnswers: ["l'", "l’"],
                correction: { correctAnswer: "l'", explanation: "Marc (personne déjà nommée) → pronom complément « l' »." },
              },
              {
                id: "opinion-i3",
                type: "vrai_faux",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "« À mon avis » et « selon moi » ont le même sens.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "Ce sont deux formules équivalentes pour introduire une opinion." },
              },
              {
                id: "opinion-i4",
                type: "reponse_courte",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Item 4.",
                question: "Donne le contraire de « être pour ».",
                acceptedAnswers: ["être contre", "etre contre"],
                correction: { correctAnswer: "être contre", explanation: "« être pour » et « être contre » sont opposés." },
              },
              {
                id: "opinion-i5",
                type: "texte_a_trous",
                skillId: "gr-pronoms-complements",
                difficulty: "B1",
                instructions: "Item 5.",
                textWithBlanks: "Tu penses {{1}} projet ? — Oui, j'{{2}} pense.",
                blanks: [
                  { id: "1", answer: "au" },
                  { id: "2", answer: "y" },
                ],
                correction: { correctAnswer: "au — y", explanation: "« penser à » se remplace par « y » pour une chose." },
              },
              {
                id: "opinion-i6",
                type: "reponse_courte",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 6.",
                question: "Cite un connecteur pour introduire un contre-argument.",
                acceptedAnswers: ["mais", "par contre", "au contraire"],
                correction: { correctAnswer: "mais / par contre / au contraire", explanation: "Ces connecteurs introduisent une opposition." },
              },
              {
                id: "opinion-i7",
                type: "qcm",
                skillId: "gr-pronoms-complements",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "opinion-i7-q",
                  prompt: "« Vous avez parlé aux voisins ? » → « Oui, on ___ a parlé. »",
                  choices: [
                    { id: "a", text: "les" },
                    { id: "b", text: "leur" },
                    { id: "c", text: "y" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "leur", explanation: "« aux voisins » (personnes, complément indirect) → « leur »." },
                },
              },
              {
                id: "opinion-i8",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 8. D'après le texte de compréhension écrite.",
                question: "Quelle est l'inquiétude de certains voisins ?",
                acceptedAnswers: ["les odeurs", "les odeurs, surtout en été", "l'odeur"],
                correction: { correctAnswer: "Les odeurs, surtout en été.", explanation: "Nadia mentionne cette inquiétude dans son message." },
              },
              {
                id: "opinion-i9",
                type: "reponse_courte",
                skillId: "voc-opinion",
                difficulty: "B1",
                instructions: "Item 9.",
                question: "Que signifie « ça se discute » ?",
                acceptedAnswers: ["que ce n'est pas si simple", "il y a des avantages et des inconvénients"],
                correction: {
                  correctAnswer: "Que ce n'est pas si simple, qu'il y a des avantages et des inconvénients.",
                  explanation: "C'est une façon nuancée de dire qu'on n'est pas totalement convaincu.",
                },
              },
              {
                id: "opinion-i10",
                type: "reponse_courte",
                skillId: "pe-exprimer-avis",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "Donne ton avis en une phrase sur un sujet de ton choix, avec « parce que ».",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi selon la grille de la section Production écrite : une opinion claire, justifiée par « parce que ».",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-raconter-un-evenement-passe",
    slug: "raconter-un-evenement-passe",
    level: "B1",
    title: "Raconter un événement passé",
    description:
      "À la fin de ce module, tu pourras raconter un événement passé de façon claire, en distinguant ce qui s'est passé (les actions) de ce qui était (le contexte, les circonstances).",
    objectives: [
      "Raconter un événement",
      "Structurer un récit court",
      "Distinguer premier plan (actions) et arrière-plan (contexte)",
    ],
    domain: "grammaire",
    stageId: "b1-debut",
    estimatedMinutes: 33,
    situation:
      "Farid travaille dans une entreprise près de Lyon. Un matin, tout va mal : il se réveille en retard, les transports sont perturbés, et il a un entretien important à 9h. Il raconte cette matinée à sa collègue Sophie.",
    vocabulary: [
      { term: "un imprévu", category: "principal" },
      { term: "un retard", category: "principal" },
      { term: "une panne", category: "principal" },
      { term: "tomber en panne", category: "principal" },
      { term: "rater (le bus, un rendez-vous)", category: "principal" },
      { term: "se dépêcher", category: "principal" },
      { term: "prévenir (quelqu'un)", category: "principal" },
      { term: "un embouteillage", category: "principal" },
      { term: "une grève", category: "principal" },
      { term: "un contretemps", category: "principal" },
      { term: "avoir de la chance / ne pas avoir de chance", category: "principal" },
      { term: "finalement", category: "principal" },
      { term: "heureusement", category: "principal" },
      { term: "malheureusement", category: "principal" },
      { term: "se rendre compte (de quelque chose)", category: "principal" },
      { term: "paniquer", category: "principal" },
      { term: "une réunion", category: "principal" },
      { term: "joindre (quelqu'un, au téléphone)", category: "principal" },
      { term: "reporter (un rendez-vous)", category: "principal" },
      { term: "s'excuser", category: "principal" },
      { term: "« je n'en revenais pas » (j'étais très surpris)", category: "expression" },
      { term: "« pour ne rien arranger » (en plus, la situation empire)", category: "expression" },
      { term: "« au bout du compte » (finalement)", category: "expression" },
      { term: "« sur le coup » (au moment même)", category: "expression" },
      { term: "se réveiller", category: "verbe" },
      { term: "se dépêcher", category: "verbe" },
      { term: "rater", category: "verbe" },
      { term: "prévenir", category: "verbe" },
      { term: "réussir à (+ infinitif)", category: "verbe" },
      { term: "se rendre compte de", category: "verbe" },
      { term: "paniquer", category: "verbe" },
      { term: "s'excuser (de)", category: "verbe" },
      { term: "d'abord", category: "connecteur" },
      { term: "ensuite", category: "connecteur" },
      { term: "pendant que", category: "connecteur" },
      { term: "tout à coup", category: "connecteur" },
      { term: "finalement", category: "connecteur" },
      { term: "heureusement", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Passé composé : les actions",
        explanation:
          "Le passé composé raconte les actions, les événements qui font avancer l'histoire : je me suis réveillé, j'ai couru, j'ai appelé.",
      },
      {
        title: "Imparfait : le contexte",
        explanation:
          "L'imparfait décrit le contexte : ce qui était déjà là, ce qui durait, ce qu'on faisait habituellement : il pleuvait, j'étais fatigué, je prenais toujours le même bus. Exemple : Il pleuvait (contexte) quand je suis sorti de chez moi (action). Le bus était en retard (contexte), alors j'ai décidé de marcher (action).",
      },
      {
        title: "Plus-que-parfait : l'antériorité",
        explanation:
          "Le plus-que-parfait raconte ce qui s'est passé avant un autre moment du passé : Quand je suis arrivé, la réunion avait déjà commencé. Repère pratique : une liste d'actions qui s'enchaînent → passé composé ; une description ou une habitude → imparfait ; une action antérieure à une autre action passée → plus-que-parfait.",
      },
    ],
    examLinks: [
      "DELF B1 — production écrite (récit) et orale",
      "TCF IRN — expression écrite, tâche 2",
    ],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "raconter-un-evenement-passe-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "raconter-un-evenement-passe-comprendre-activite",
            title: "Lire le message de Farid",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "recit-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le message de Farid sur le forum interne de son entreprise, puis répondez.",
                text:
                  "Franchement, quelle matinée ! Hier soir, j'étais tellement fatigué que j'ai oublié de mettre mon réveil. " +
                  "Résultat : je me suis réveillé à 7h50, alors que mon entretien commençait à 9h et que je devais prendre " +
                  "le train de 8h05. J'ai pris une douche en cinq minutes, j'ai attrapé mon sac et je suis sorti en courant. " +
                  "Dehors, il pleuvait très fort et il n'y avait pas un seul taxi. Pour ne rien arranger, mon téléphone " +
                  "n'avait plus de batterie : je n'ai pas pu prévenir mon responsable. Je suis quand même arrivé à la gare " +
                  "à 8h03, mais le train avait déjà quitté le quai. Sur le coup, j'ai vraiment paniqué. Finalement, j'ai " +
                  "réussi à joindre Sophie depuis une cabine, et elle a prévenu mon responsable à ma place. Il a accepté " +
                  "de reporter l'entretien à 10h30. Au bout du compte, tout s'est bien terminé, mais je n'en revenais pas " +
                  "d'avoir vécu ça un jour aussi important !",
                questions: [
                  {
                    kind: "libre",
                    id: "recit-e-q1",
                    prompt: "Pourquoi Farid ne s'est-il pas réveillé à l'heure ?",
                    expectedAnswer: "Il était très fatigué et il a oublié de mettre son réveil.",
                    correction: { correctAnswer: "Il était très fatigué et il a oublié de mettre son réveil.", explanation: "C'est la première cause donnée dans le texte." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "recit-e-q2",
                    prompt: "Vrai ou faux : quand Farid est arrivé à la gare, le train n'était pas encore parti.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Le train avait déjà quitté le quai quand il est arrivé (plus-que-parfait = antériorité)." },
                  },
                  {
                    kind: "libre",
                    id: "recit-e-q3",
                    prompt: "Pourquoi Farid n'a-t-il pas pu appeler son responsable directement ?",
                    expectedAnswer: "Parce que son téléphone n'avait plus de batterie.",
                    correction: { correctAnswer: "Parce que son téléphone n'avait plus de batterie.", explanation: "Le texte le précise juste avant l'épisode de la gare." },
                  },
                  {
                    kind: "libre",
                    id: "recit-e-q4",
                    prompt: "Qui a prévenu le responsable de Farid ?",
                    expectedAnswer: "Sophie, sa collègue.",
                    correction: { correctAnswer: "Sophie, sa collègue.", explanation: "Farid l'a jointe depuis une cabine téléphonique." },
                  },
                  {
                    kind: "qcm",
                    id: "recit-e-q5",
                    prompt: "À quelle heure l'entretien a-t-il finalement eu lieu ?",
                    choices: [
                      { id: "a", text: "9h" },
                      { id: "b", text: "8h05" },
                      { id: "c", text: "10h30" },
                    ],
                    correctChoiceId: "c",
                    correction: { correctAnswer: "10h30", explanation: "Le responsable a accepté de reporter l'entretien à 10h30." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "raconter-un-evenement-passe-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "raconter-un-evenement-passe-ecoute-activite",
            title: "Écouter Farid raconter sa matinée",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "recit-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez le dialogue (« Une matinée compliquée », Sophie et Farid, 1 min 40), puis répondez.",
                audioSrc: "/audio/b1/raconter-un-evenement-passe.mp3",
                transcript:
                  "Sophie — Alors, ton entretien d'hier, ça s'est bien passé ?\n" +
                  "Farid — Oh là là, ne m'en parle pas ! J'ai failli tout rater.\n" +
                  "Sophie — Comment ça ?\n" +
                  "Farid — Je me suis réveillé en retard, il pleuvait, j'ai couru jusqu'à la gare, et quand je suis arrivé, le train était déjà parti !\n" +
                  "Sophie — Non ! Et ton entretien, il était à quelle heure déjà ?\n" +
                  "Farid — À 9h. Et en plus, mon téléphone n'avait plus de batterie, impossible de prévenir qui que ce soit.\n" +
                  "Sophie — Alors comment tu as fait ?\n" +
                  "Farid — J'ai trouvé une cabine téléphonique, tu te rends compte, une vraie cabine ! Je t'ai appelée, et toi tu as prévenu mon responsable.\n" +
                  "Sophie — Ah oui, c'est vrai ! Et il a dit quoi ?\n" +
                  "Farid — Il a été super compréhensif, il a décalé l'entretien à 10h30. Du coup, j'ai eu le temps de me calmer avant d'y aller.\n" +
                  "Sophie — Et l'entretien, il s'est bien passé, au final ?\n" +
                  "Farid — Oui, très bien, heureusement ! Mais quelle matinée...",
                questions: [
                  {
                    kind: "libre",
                    id: "recit-f-q1",
                    prompt: "Quel temps faisait-il quand Farid est sorti de chez lui ?",
                    expectedAnswer: "Il pleuvait.",
                    correction: { correctAnswer: "Il pleuvait.", explanation: "Contexte décrit à l'imparfait." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "recit-f-q2",
                    prompt: "Vrai ou faux : Farid a réussi à prendre son train.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il l'a raté, le train était déjà parti." },
                  },
                  {
                    kind: "libre",
                    id: "recit-f-q3",
                    prompt: "Pourquoi Farid n'a-t-il pas pu téléphoner avec son portable ?",
                    expectedAnswer: "Son téléphone n'avait plus de batterie.",
                    correction: { correctAnswer: "Son téléphone n'avait plus de batterie.", explanation: "Il a dû trouver une cabine téléphonique." },
                  },
                  {
                    kind: "libre",
                    id: "recit-f-q4",
                    prompt: "Qu'est-ce que Sophie a fait pour aider Farid ?",
                    expectedAnswer: "Elle a prévenu le responsable de Farid.",
                    correction: { correctAnswer: "Elle a prévenu le responsable de Farid.", explanation: "Farid l'a appelée depuis la cabine." },
                  },
                  {
                    kind: "libre",
                    id: "recit-f-q5",
                    prompt: "Comment s'est terminé l'entretien de Farid ?",
                    expectedAnswer: "Il s'est très bien passé.",
                    correction: { correctAnswer: "Il s'est très bien passé.", explanation: "Farid le confirme à la fin du dialogue." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "raconter-un-evenement-passe-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "raconter-un-evenement-passe-entrainement-activite",
            title: "Passé composé, imparfait et plus-que-parfait",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "recit-g1",
                type: "texte_a_trous",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Choisis la bonne forme (passé composé ou imparfait).",
                textWithBlanks:
                  "1) Hier, il {{1}} toute la journée. 2) Soudain, le téléphone {{2}}. 3) Quand j'étais petit, je {{3}} à l'école à pied. " +
                  "4) Elle {{4}} la porte et elle {{5}} dans la pièce.",
                blanks: [
                  { id: "1", answer: "pleuvait" },
                  { id: "2", answer: "a sonné" },
                  { id: "3", answer: "allais" },
                  { id: "4", answer: "a ouvert" },
                  { id: "5", answer: "est entrée" },
                ],
                correction: {
                  correctAnswer: "pleuvait — a sonné — allais — a ouvert — est entrée",
                  explanation: "Description/habitude → imparfait (1, 3) ; action ponctuelle ou enchaînement d'actions → passé composé (2, 4, 5).",
                },
              },
              {
                id: "recit-g2",
                type: "texte_a_trous",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Complète avec le passé composé ou l'imparfait du verbe.",
                textWithBlanks:
                  "Ce jour-là, il {{1}} très froid. Je {{2}} sans manteau parce que je {{3}} pressé. " +
                  "Quand je {{4}} au bureau, je {{5}} de mon erreur.",
                blanks: [
                  { id: "1", answer: "faisait" },
                  { id: "2", answer: "suis sorti" },
                  { id: "3", answer: "étais" },
                  { id: "4", answer: "suis arrivé" },
                  { id: "5", answer: "me suis rendu compte" },
                ],
                correction: {
                  correctAnswer: "faisait — suis sorti — étais — suis arrivé — me suis rendu compte",
                  explanation: "Le contexte (froid, pressé) est à l'imparfait, les actions qui s'enchaînent sont au passé composé.",
                },
              },
              {
                id: "recit-g3",
                type: "remise_en_ordre",
                skillId: "pe-recit",
                difficulty: "B1",
                instructions: "Remets ces phrases dans l'ordre chronologique.",
                items: [
                  { id: "a", text: "Il a couru jusqu'à la gare." },
                  { id: "b", text: "Le réveil n'a pas sonné." },
                  { id: "c", text: "Il a raté son train." },
                  { id: "d", text: "Il s'est réveillé en retard." },
                ],
                correctOrder: ["b", "d", "a", "c"],
                correction: {
                  correctAnswer: "b, d, a, c",
                  explanation: "Le réveil ne sonne pas → réveil en retard → course jusqu'à la gare → train raté.",
                },
              },
              {
                id: "recit-g4",
                type: "vrai_faux",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "D'après le dialogue de la partie « Compréhension orale ».",
                statement: "Farid a pu prévenir son responsable lui-même, directement.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "C'est Sophie qui a prévenu le responsable, parce que Farid n'avait plus de batterie.",
                },
              },
              {
                id: "recit-g5",
                type: "association",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Associe chaque cause à sa conséquence.",
                pairs: [
                  { id: "1", left: "Il n'avait plus de batterie...", right: "donc il n'a pas pu appeler." },
                  { id: "2", left: "Il était en retard...", right: "alors il a couru." },
                  { id: "3", left: "Le train était déjà parti...", right: "alors il a cherché une cabine." },
                ],
                correction: {
                  correctAnswer: "1 → n'a pas pu appeler ; 2 → a couru ; 3 → a cherché une cabine.",
                  explanation: "Chaque cause introduit logiquement sa conséquence dans le récit de Farid.",
                },
              },
              {
                id: "recit-g6",
                type: "reponse_courte",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Corrige l'erreur de temps dans cette phrase.",
                question: "« Quand je suis arrivé à la gare, le train partait déjà depuis dix minutes. »",
                acceptedAnswers: ["le train était déjà parti depuis dix minutes", "était déjà parti"],
                correction: {
                  correctAnswer: "« Quand je suis arrivé à la gare, le train était déjà parti depuis dix minutes. »",
                  explanation: "Antériorité par rapport à une autre action passée → plus-que-parfait.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "raconter-un-evenement-passe-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "raconter-un-evenement-passe-ecriture-activite",
            title: "Raconter un imprévu",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "recit-h",
                type: "production_ecrite",
                skillId: "pe-recit",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Raconte, dans un message à un ami ou une amie, un imprévu qui t'est arrivé récemment (retard, panne, oubli...). Explique ce qui s'est passé et comment la situation s'est terminée.",
                minWords: 80,
                maxWords: 120,
                correctionCriteria: [
                  "Le récit respecte la situation demandée (/2)",
                  "Passé composé et imparfait bien distingués (/3)",
                  "Au moins 2 connecteurs chronologiques (/2)",
                  "Vocabulaire du module réutilisé, au moins 3 mots (/2)",
                  "Texte compréhensible dans l'ensemble (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "raconter-un-evenement-passe-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: false,
        activities: [
          {
            id: "raconter-un-evenement-passe-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "recit-i1",
                type: "qcm",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "recit-i1-q",
                  prompt: "« Il ___ 8h quand je me suis levé. »",
                  choices: [
                    { id: "a", text: "était" },
                    { id: "b", text: "a été" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "était", explanation: "L'heure qu'il était = contexte → imparfait." },
                },
              },
              {
                id: "recit-i2",
                type: "reponse_courte",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 2. Conjugaison.",
                question: "Mets au passé composé : « elle (partir) tôt ce matin ».",
                acceptedAnswers: ["elle est partie", "est partie"],
                correction: { correctAnswer: "elle est partie", explanation: "« partir » se conjugue avec l'auxiliaire être." },
              },
              {
                id: "recit-i3",
                type: "vrai_faux",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "L'imparfait sert à décrire des actions ponctuelles et soudaines.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "L'imparfait décrit le contexte, les habitudes ; le passé composé raconte les actions ponctuelles." },
              },
              {
                id: "recit-i4",
                type: "reponse_courte",
                skillId: "pe-recit",
                difficulty: "B1",
                instructions: "Item 4. Vocabulaire.",
                question: "Trouve un synonyme de « finalement » dans la liste du module.",
                acceptedAnswers: ["au bout du compte"],
                correction: { correctAnswer: "au bout du compte", explanation: "Cette expression signifie aussi « finalement »." },
              },
              {
                id: "recit-i5",
                type: "texte_a_trous",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 5. Complète au plus-que-parfait.",
                textWithBlanks: "Quand nous {{1}}, le film {{2}} déjà {{3}}.",
                blanks: [
                  { id: "1", answer: "sommes arrivés" },
                  { id: "2", answer: "avait" },
                  { id: "3", answer: "commencé" },
                ],
                correction: { correctAnswer: "sommes arrivés — avait — commencé", explanation: "Antériorité : le film a commencé avant notre arrivée." },
              },
              {
                id: "recit-i6",
                type: "reponse_courte",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 6.",
                question: "Cite deux connecteurs chronologiques vus dans ce module.",
                acceptedAnswers: ["d'abord, ensuite", "ensuite, finalement", "d'abord et ensuite", "d'abord, finalement"],
                correction: { correctAnswer: "deux parmi : d'abord, ensuite, pendant que, tout à coup, finalement, heureusement.", explanation: "Ces connecteurs structurent un récit chronologique." },
              },
              {
                id: "recit-i7",
                type: "qcm",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "recit-i7-q",
                  prompt: "Quel temps utilise-t-on pour une action qui dure ou se répète dans le passé ?",
                  choices: [
                    { id: "a", text: "passé composé" },
                    { id: "b", text: "imparfait" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "imparfait", explanation: "L'imparfait exprime la durée et l'habitude." },
                },
              },
              {
                id: "recit-i8",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 8. D'après le texte de compréhension écrite.",
                question: "Pourquoi Farid a-t-il paniqué ?",
                acceptedAnswers: ["parce que son train était parti", "le train était parti et il ne pouvait prévenir personne"],
                correction: { correctAnswer: "Parce que son train était parti et qu'il ne pouvait prévenir personne.", explanation: "C'est le moment le plus critique du récit de Farid." },
              },
              {
                id: "recit-i9",
                type: "reponse_courte",
                skillId: "pe-recit",
                difficulty: "B1",
                instructions: "Item 9. Vocabulaire.",
                question: "Que veut dire « prévenir quelqu'un » ?",
                acceptedAnswers: ["informer quelqu'un à l'avance"],
                correction: { correctAnswer: "Informer quelqu'un à l'avance d'une situation.", explanation: "C'est un des verbes utiles du module." },
              },
              {
                id: "recit-i10",
                type: "reponse_courte",
                skillId: "pe-recit",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, raconte une action passée en utilisant le passé composé et l'imparfait.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi selon le point de langue : contexte à l'imparfait, action au passé composé.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-expliquer-un-probleme-et-demander-une-solution",
    slug: "expliquer-un-probleme-et-demander-une-solution",
    level: "B1",
    title: "Expliquer un problème et demander une solution",
    description:
      "À la fin de ce module, tu pourras décrire un problème concret, en expliquer la cause, et demander clairement une solution, à l'oral et à l'écrit.",
    objectives: [
      "Expliquer un problème",
      "Exprimer une cause et une conséquence",
      "Demander de l'aide de façon claire et polie",
    ],
    domain: "production_ecrite",
    stageId: "b1-intermediaire",
    estimatedMinutes: 33,
    situation:
      "Depuis une semaine, Amélie n'a plus d'accès internet chez elle. Elle appelle le service technique de son fournisseur, puis elle écrit un message pour expliquer le problème.",
    vocabulary: [
      { term: "une panne", category: "principal" },
      { term: "un problème", category: "principal" },
      { term: "un dysfonctionnement", category: "principal" },
      { term: "une coupure", category: "principal" },
      { term: "signaler (un problème)", category: "principal" },
      { term: "réparer", category: "principal" },
      { term: "fonctionner / ne pas fonctionner", category: "principal" },
      { term: "un technicien", category: "principal" },
      { term: "une intervention", category: "principal" },
      { term: "un délai", category: "principal" },
      { term: "une solution", category: "principal" },
      { term: "un remboursement", category: "principal" },
      { term: "un dédommagement", category: "principal" },
      { term: "un fournisseur", category: "principal" },
      { term: "un contrat", category: "principal" },
      { term: "un abonnement", category: "principal" },
      { term: "persister (le problème persiste)", category: "principal" },
      { term: "constater", category: "principal" },
      { term: "« le problème, c'est que... »", category: "expression" },
      { term: "« depuis [durée], je n'ai plus... »", category: "expression" },
      { term: "« qu'est-ce que vous pouvez faire ? »", category: "expression" },
      { term: "« j'aimerais savoir quand... »", category: "expression" },
      { term: "« ça fait la troisième fois que... »", category: "expression" },
      { term: "signaler", category: "verbe" },
      { term: "constater", category: "verbe" },
      { term: "réparer", category: "verbe" },
      { term: "résoudre", category: "verbe" },
      { term: "intervenir", category: "verbe" },
      { term: "se plaindre de", category: "verbe" },
      { term: "demander à ce que", category: "verbe" },
      { term: "parce que", category: "connecteur" },
      { term: "car", category: "connecteur" },
      { term: "comme", category: "connecteur" },
      { term: "à cause de", category: "connecteur" },
      { term: "donc", category: "connecteur" },
      { term: "alors", category: "connecteur" },
      { term: "c'est pourquoi", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Exprimer une cause",
        explanation:
          "parce que / car (cause simple) : Je n'ai plus internet parce que ma box ne fonctionne plus. comme (en début de phrase, cause déjà connue) : Comme le problème persiste, j'appelle le service technique. à cause de + nom (cause plutôt négative) : Je ne peux plus travailler à cause de cette panne. grâce à + nom (cause positive) : Grâce à votre aide, le problème est résolu.",
      },
      {
        title: "Exprimer une conséquence",
        explanation:
          "donc / alors (à l'oral comme à l'écrit) : Ma box ne fonctionne plus, donc je n'ai plus internet. c'est pourquoi (plus formel, à l'écrit) : Le problème persiste depuis une semaine, c'est pourquoi je vous contacte aujourd'hui. Astuce : la cause répond à « pourquoi ? », la conséquence répond à « et donc, qu'est-ce qui se passe ? ».",
      },
    ],
    examLinks: [
      "DELF B1 — production écrite (lettre/message)",
      "TCF IRN — expression écrite, tâche 1",
    ],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "expliquer-un-probleme-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "expliquer-un-probleme-comprendre-activite",
            title: "Lire le message d'Amélie au service client",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "probleme-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le message d'Amélie, puis répondez.",
                text:
                  "Bonjour, je vous contacte parce que je n'ai plus accès à internet depuis une semaine. J'ai déjà " +
                  "redémarré ma box plusieurs fois, comme indiqué sur votre site, mais le problème persiste. Comme " +
                  "je travaille depuis chez moi, cette coupure me pose de vraies difficultés : je ne peux pas envoyer " +
                  "mes documents à temps, à cause de cette panne. C'est pourquoi j'aimerais qu'un technicien " +
                  "intervienne le plus rapidement possible. Pourriez-vous également me dire si un dédommagement " +
                  "est possible pour cette semaine sans connexion ? Merci de votre réponse rapide. Cordialement, " +
                  "Amélie Girard",
                questions: [
                  {
                    kind: "libre",
                    id: "probleme-e-q1",
                    prompt: "Depuis combien de temps Amélie n'a-t-elle plus internet ?",
                    expectedAnswer: "Depuis une semaine.",
                    correction: { correctAnswer: "Depuis une semaine.", explanation: "C'est précisé dès la première phrase." },
                  },
                  {
                    kind: "libre",
                    id: "probleme-e-q2",
                    prompt: "Qu'a-t-elle déjà essayé de faire pour résoudre le problème ?",
                    expectedAnswer: "Elle a redémarré sa box plusieurs fois.",
                    correction: { correctAnswer: "Elle a redémarré sa box plusieurs fois.", explanation: "Comme indiqué sur le site du fournisseur." },
                  },
                  {
                    kind: "libre",
                    id: "probleme-e-q3",
                    prompt: "Pourquoi cette panne pose-t-elle un problème particulier à Amélie ?",
                    expectedAnswer: "Parce qu'elle travaille depuis chez elle et a besoin d'internet pour envoyer ses documents.",
                    correction: { correctAnswer: "Parce qu'elle travaille depuis chez elle et a besoin d'internet pour envoyer ses documents.", explanation: "C'est la conséquence professionnelle qu'elle met en avant." },
                  },
                  {
                    kind: "libre",
                    id: "probleme-e-q4",
                    prompt: "Que demande Amélie à la fin du message, en plus de l'intervention ?",
                    expectedAnswer: "Un dédommagement pour la semaine sans connexion.",
                    correction: { correctAnswer: "Un dédommagement pour la semaine sans connexion.", explanation: "C'est sa deuxième demande, après l'intervention technique." },
                  },
                  {
                    kind: "qcm",
                    id: "probleme-e-q5",
                    prompt: "Quel est le ton du message d'Amélie ?",
                    choices: [
                      { id: "a", text: "Agressif." },
                      { id: "b", text: "Poli mais ferme." },
                      { id: "c", text: "Indifférent." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Poli mais ferme.", explanation: "Elle utilise des formules de politesse tout en exprimant clairement sa demande." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "expliquer-un-probleme-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "expliquer-un-probleme-ecoute-activite",
            title: "Écouter l'appel au service technique",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "probleme-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez le dialogue (« Appel au service technique », Amélie et le conseiller, 1 min 50), puis répondez.",
                audioSrc: "/audio/b1/expliquer-un-probleme-et-demander-une-solution.mp3",
                transcript:
                  "Conseiller — Service technique, bonjour, je vous écoute.\n" +
                  "Amélie — Bonjour, je vous appelle parce que je n'ai plus internet depuis une semaine.\n" +
                  "Conseiller — D'accord, je vais regarder ça. Vous avez déjà essayé de redémarrer votre box ?\n" +
                  "Amélie — Oui, plusieurs fois, mais le problème persiste. Comme je travaille depuis chez moi, c'est vraiment gênant.\n" +
                  "Conseiller — Je comprends. Je vois effectivement une anomalie sur la ligne. Il va falloir qu'un technicien intervienne chez vous.\n" +
                  "Amélie — D'accord. Et ça peut se faire quand ?\n" +
                  "Conseiller — Le premier créneau disponible est après-demain, entre 9h et 12h.\n" +
                  "Amélie — C'est un peu tard, mais bon, je n'ai pas le choix. Est-ce qu'un dédommagement est prévu pour cette semaine sans connexion ?\n" +
                  "Conseiller — Oui, on va vous créditer une semaine d'abonnement, c'est automatique dans ce genre de situation.\n" +
                  "Amélie — Très bien, merci beaucoup.",
                questions: [
                  {
                    kind: "libre",
                    id: "probleme-f-q1",
                    prompt: "Depuis quand Amélie n'a-t-elle plus internet ?",
                    expectedAnswer: "Depuis une semaine.",
                    correction: { correctAnswer: "Depuis une semaine.", explanation: "C'est la première chose qu'elle précise au conseiller." },
                  },
                  {
                    kind: "libre",
                    id: "probleme-f-q2",
                    prompt: "Qu'est-ce que le conseiller propose comme solution ?",
                    expectedAnswer: "Qu'un technicien intervienne chez elle.",
                    correction: { correctAnswer: "Qu'un technicien intervienne chez elle.", explanation: "Il constate une anomalie sur la ligne." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "probleme-f-q3",
                    prompt: "Vrai ou faux : le technicien peut intervenir le jour même.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "L'intervention est prévue après-demain." },
                  },
                  {
                    kind: "libre",
                    id: "probleme-f-q4",
                    prompt: "Pourquoi Amélie trouve-t-elle le délai « un peu tard » ?",
                    expectedAnswer: "Parce qu'elle a besoin d'internet pour travailler.",
                    correction: { correctAnswer: "Parce qu'elle a besoin d'internet pour travailler.", explanation: "Elle travaille depuis chez elle." },
                  },
                  {
                    kind: "libre",
                    id: "probleme-f-q5",
                    prompt: "Quel dédommagement le conseiller propose-t-il ?",
                    expectedAnswer: "Un crédit d'une semaine d'abonnement.",
                    correction: { correctAnswer: "Un crédit d'une semaine d'abonnement.", explanation: "C'est automatique dans ce genre de situation, précise le conseiller." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "expliquer-un-probleme-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "expliquer-un-probleme-entrainement-activite",
            title: "Cause, conséquence et vocabulaire du problème",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "probleme-g1",
                type: "qcm",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Cause ou conséquence ?",
                question: {
                  kind: "qcm",
                  id: "probleme-g1-q",
                  prompt: "« Ma box ne fonctionne plus, ___ je n'ai plus internet. »",
                  choices: [
                    { id: "a", text: "parce que" },
                    { id: "b", text: "donc" },
                    { id: "c", text: "à cause de" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "donc", explanation: "« donc » introduit la conséquence de la panne." },
                },
              },
              {
                id: "probleme-g2",
                type: "texte_a_trous",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Complète avec parce que, comme, donc ou c'est pourquoi.",
                textWithBlanks:
                  "{{1}} le problème persiste depuis trois jours, j'ai décidé d'appeler le service client. " +
                  "Ma box ne fonctionne plus {{2}} il y a une panne sur la ligne. {{3}}, je n'ai plus internet chez moi.",
                blanks: [
                  { id: "1", answer: "Comme" },
                  { id: "2", answer: "parce qu'" },
                  { id: "3", answer: "Donc" },
                ],
                correction: {
                  correctAnswer: "Comme — parce qu' — Donc",
                  explanation: "« Comme » introduit une cause déjà connue en début de phrase, « parce que » une cause simple, « donc » la conséquence finale.",
                },
              },
              {
                id: "probleme-g3",
                type: "association",
                skillId: "voc-problemes-quotidien",
                difficulty: "B1",
                instructions: "Associe chaque problème à sa solution.",
                pairs: [
                  { id: "1", left: "plus d'internet", right: "un technicien intervient" },
                  { id: "2", left: "facture incorrecte", right: "demander un remboursement" },
                  { id: "3", left: "voisin trop bruyant", right: "en parler au syndic" },
                ],
                correction: {
                  correctAnswer: "1 → intervention technicien ; 2 → remboursement ; 3 → syndic.",
                  explanation: "Chaque type de problème du quotidien appelle une démarche différente.",
                },
              },
              {
                id: "probleme-g4",
                type: "qcm",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Choisis le bon mot.",
                question: {
                  kind: "qcm",
                  id: "probleme-g4-q",
                  prompt: "« Je n'ai pas pu travailler ___ cette panne internet. »",
                  choices: [
                    { id: "a", text: "grâce à" },
                    { id: "b", text: "à cause de" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "à cause de", explanation: "La panne est une cause négative → « à cause de »." },
                },
              },
              {
                id: "probleme-g5",
                type: "vrai_faux",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "D'après le dialogue de la partie « Compréhension orale ».",
                statement: "Le conseiller propose une intervention le jour même.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "L'intervention est prévue après-demain." },
              },
              {
                id: "probleme-g6",
                type: "reponse_courte",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Corrige l'erreur dans cette phrase.",
                question: "« Ma box ne marche plus, à cause de je n'ai plus internet. »",
                acceptedAnswers: ["ma box ne marche plus, donc je n'ai plus internet"],
                correction: {
                  correctAnswer: "« Ma box ne marche plus, donc je n'ai plus internet. »",
                  explanation: "« à cause de » introduit une cause, pas une conséquence : il fallait un connecteur de conséquence comme « donc ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "expliquer-un-probleme-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "expliquer-un-probleme-ecriture-activite",
            title: "Signaler un problème par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "probleme-h",
                type: "production_ecrite",
                skillId: "pe-expliquer-probleme",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Écris un message à un service technique ou à ton propriétaire pour signaler un problème (panne, dysfonctionnement, nuisance). Explique le problème, sa cause si tu la connais, et demande une solution claire.",
                minWords: 80,
                maxWords: 120,
                correctionCriteria: [
                  "Problème clairement expliqué (/2)",
                  "Cause et conséquence bien exprimées (/3)",
                  "Demande de solution explicite (/2)",
                  "Politesse et registre adaptés (/2)",
                  "Vocabulaire du module réutilisé (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "expliquer-un-probleme-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: false,
        activities: [
          {
            id: "expliquer-un-probleme-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "probleme-i1",
                type: "qcm",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "probleme-i1-q",
                  prompt: "« ___ le problème persiste, j'appelle le service client. »",
                  choices: [
                    { id: "a", text: "Comme" },
                    { id: "b", text: "Donc" },
                    { id: "c", text: "Alors" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "Comme", explanation: "« Comme » en début de phrase introduit une cause déjà connue." },
                },
              },
              {
                id: "probleme-i2",
                type: "reponse_courte",
                skillId: "voc-problemes-quotidien",
                difficulty: "B1",
                instructions: "Item 2. Vocabulaire.",
                question: "Donne un synonyme de « une panne ».",
                acceptedAnswers: ["un dysfonctionnement", "une coupure"],
                correction: { correctAnswer: "un dysfonctionnement / une coupure", explanation: "Ces mots désignent tous un problème technique." },
              },
              {
                id: "probleme-i3",
                type: "vrai_faux",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "« à cause de » introduit toujours une conséquence.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« à cause de » introduit une cause, pas une conséquence." },
              },
              {
                id: "probleme-i4",
                type: "texte_a_trous",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 4.",
                textWithBlanks: "Ma box est en panne, {{1}} je travaille au café aujourd'hui.",
                blanks: [{ id: "1", answer: "donc" }],
                correction: { correctAnswer: "donc", explanation: "C'est la conséquence de la panne." },
              },
              {
                id: "probleme-i5",
                type: "reponse_courte",
                skillId: "voc-problemes-quotidien",
                difficulty: "B1",
                instructions: "Item 5.",
                question: "Cite deux verbes utiles pour signaler un problème.",
                acceptedAnswers: ["signaler, constater"],
                correction: { correctAnswer: "deux parmi : signaler, constater, réparer, résoudre, intervenir.", explanation: "Ces verbes reviennent souvent dans une réclamation." },
              },
              {
                id: "probleme-i6",
                type: "qcm",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 6.",
                question: {
                  kind: "qcm",
                  id: "probleme-i6-q",
                  prompt: "Quelle expression est la plus formelle ?",
                  choices: [
                    { id: "a", text: "« c'est pourquoi »" },
                    { id: "b", text: "« donc »" },
                    { id: "c", text: "« alors »" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "« c'est pourquoi »", explanation: "C'est un connecteur de conséquence plus soutenu, adapté à l'écrit formel." },
                },
              },
              {
                id: "probleme-i7",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 7. D'après le texte de compréhension écrite.",
                question: "Que demande Amélie en plus de l'intervention technique ?",
                acceptedAnswers: ["un dédommagement"],
                correction: { correctAnswer: "Un dédommagement pour la semaine sans connexion.", explanation: "C'est sa seconde demande dans le message." },
              },
              {
                id: "probleme-i8",
                type: "reponse_courte",
                skillId: "voc-problemes-quotidien",
                difficulty: "B1",
                instructions: "Item 8. Vocabulaire.",
                question: "Que signifie « le problème persiste » ?",
                acceptedAnswers: ["le problème continue"],
                correction: { correctAnswer: "Que le problème continue, n'est pas résolu.", explanation: "« persister » = continuer malgré les tentatives de résolution." },
              },
              {
                id: "probleme-i9",
                type: "reponse_courte",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 9. Reformulation.",
                question: "Reformule avec « c'est pourquoi » : « Le problème dure depuis longtemps. J'écris ce message. »",
                acceptedAnswers: ["le problème dure depuis longtemps, c'est pourquoi j'écris ce message"],
                correction: { correctAnswer: "« Le problème dure depuis longtemps, c'est pourquoi j'écris ce message. »", explanation: "« c'est pourquoi » relie la cause à la conséquence en une seule phrase." },
              },
              {
                id: "probleme-i10",
                type: "reponse_courte",
                skillId: "pe-expliquer-probleme",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, explique un problème avec « parce que » et sa conséquence avec « donc ».",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi selon le point de langue : une cause introduite par « parce que », une conséquence par « donc ».",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-parler-de-son-travail-et-projets",
    slug: "parler-de-son-travail-et-projets",
    level: "B1",
    title: "Parler de son travail et de ses projets",
    description:
      "À la fin de ce module, tu pourras décrire ton travail (actuel ou passé), raconter brièvement ton parcours professionnel et présenter un projet pour l'avenir.",
    objectives: [
      "Décrire un poste",
      "Raconter un parcours professionnel",
      "Présenter un projet professionnel",
    ],
    domain: "production_ecrite",
    stageId: "b1-intermediaire",
    estimatedMinutes: 33,
    situation:
      "Karim vient de rejoindre une nouvelle équipe. Lors de la pause de midi, une collègue, Julie, lui demande de parler de son parcours et de ses projets.",
    vocabulary: [
      { term: "un poste", category: "principal" },
      { term: "un métier", category: "principal" },
      { term: "une entreprise", category: "principal" },
      { term: "un contrat (CDI, CDD, intérim)", category: "principal" },
      { term: "un employeur", category: "principal" },
      { term: "une équipe", category: "principal" },
      { term: "une compétence", category: "principal" },
      { term: "une expérience professionnelle", category: "principal" },
      { term: "une formation", category: "principal" },
      { term: "un diplôme", category: "principal" },
      { term: "une candidature", category: "principal" },
      { term: "une évolution (professionnelle)", category: "principal" },
      { term: "une responsabilité", category: "principal" },
      { term: "un salaire", category: "principal" },
      { term: "embaucher", category: "principal" },
      { term: "démissionner", category: "principal" },
      { term: "postuler", category: "principal" },
      { term: "« je travaille dans... » (le domaine)", category: "expression" },
      { term: "« je travaille comme... » (le poste)", category: "expression" },
      { term: "« ça fait [durée] que je travaille... »", category: "expression" },
      { term: "« j'aimerais évoluer vers... »", category: "expression" },
      { term: "« grâce à cette expérience »", category: "expression" },
      { term: "travailler (dans, comme, pour)", category: "verbe" },
      { term: "gérer", category: "verbe" },
      { term: "s'occuper de", category: "verbe" },
      { term: "être chargé(e) de", category: "verbe" },
      { term: "se former à", category: "verbe" },
      { term: "évoluer", category: "verbe" },
      { term: "envisager de (+ infinitif)", category: "verbe" },
      { term: "parce que", category: "connecteur" },
      { term: "car", category: "connecteur" },
      { term: "grâce à", category: "connecteur" },
      { term: "c'est pourquoi", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Parler du passé professionnel : passé composé / imparfait",
        explanation:
          "Comme pour un récit personnel, on distingue les événements (passé composé) du contexte (imparfait) : J'ai travaillé trois ans comme serveur, mais je voulais changer de métier, alors j'ai suivi une formation.",
      },
      {
        title: "Le futur proche pour les projets professionnels",
        explanation:
          "aller (au présent) + infinitif : Je vais commencer une formation en septembre. Je vais postuler à ce poste. C'est le temps privilégié pour un projet concret et proche.",
      },
      {
        title: "Exprimer une cause professionnelle simple",
        explanation:
          "J'ai changé de métier parce que je voulais plus de responsabilités. Grâce à cette formation, j'ai trouvé ce poste. « grâce à » introduit une cause positive ; « à cause de » introduit une cause plutôt négative.",
      },
    ],
    examLinks: ["DELF B1 — production orale", "TCF IRN — expression orale, tâche 2"],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "parler-de-son-travail-et-projets-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "parler-de-son-travail-et-projets-comprendre-activite",
            title: "Lire le profil professionnel de Karim",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "travail-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le profil de Karim sur un réseau professionnel en ligne, puis répondez.",
                text:
                  "Je m'appelle Karim et je travaille comme technicien de maintenance depuis trois ans. Avant, j'ai " +
                  "travaillé dans la restauration pendant cinq ans, mais je voulais un métier plus technique. Grâce " +
                  "à une formation professionnelle, j'ai pu changer de voie. Aujourd'hui, je suis chargé de " +
                  "l'entretien des machines dans une usine près de Lyon. J'aime ce métier parce qu'il change tous " +
                  "les jours et que je travaille en équipe. Pour l'avenir, je vais suivre une formation " +
                  "complémentaire en électronique, et j'aimerais évoluer vers un poste de responsable technique " +
                  "dans les prochaines années.",
                questions: [
                  {
                    kind: "libre",
                    id: "travail-e-q1",
                    prompt: "Quel est le métier actuel de Karim ?",
                    expectedAnswer: "Technicien de maintenance.",
                    correction: { correctAnswer: "Technicien de maintenance.", explanation: "C'est précisé dès la première phrase." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "travail-e-q2",
                    prompt: "Vrai ou faux : Karim a toujours travaillé dans la maintenance.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il a d'abord travaillé cinq ans dans la restauration." },
                  },
                  {
                    kind: "libre",
                    id: "travail-e-q3",
                    prompt: "Grâce à quoi Karim a-t-il changé de métier ?",
                    expectedAnswer: "Grâce à une formation professionnelle.",
                    correction: { correctAnswer: "Grâce à une formation professionnelle.", explanation: "« grâce à » introduit cette cause positive." },
                  },
                  {
                    kind: "libre",
                    id: "travail-e-q4",
                    prompt: "Pourquoi Karim aime-t-il son métier actuel ?",
                    expectedAnswer: "Parce que le métier change tous les jours et qu'il travaille en équipe.",
                    correction: { correctAnswer: "Parce que le métier change tous les jours et qu'il travaille en équipe.", explanation: "Deux raisons données dans le texte." },
                  },
                  {
                    kind: "qcm",
                    id: "travail-e-q5",
                    prompt: "Quel est le projet professionnel de Karim ?",
                    choices: [
                      { id: "a", text: "Changer complètement de métier." },
                      { id: "b", text: "Devenir responsable technique." },
                      { id: "c", text: "Arrêter de travailler." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Devenir responsable technique.", explanation: "C'est l'objectif qu'il mentionne à la fin de son profil." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "parler-de-son-travail-et-projets-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "parler-de-son-travail-et-projets-ecoute-activite",
            title: "Écouter Karim et Julie",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "travail-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez le dialogue (« Nouveau dans l'équipe », Julie et Karim, 1 min 45), puis répondez.",
                audioSrc: "/audio/b1/parler-de-son-travail-et-projets.mp3",
                transcript:
                  "Julie — Alors, tu es nouveau dans l'équipe ! Tu faisais quoi avant ?\n" +
                  "Karim — Avant, j'ai travaillé dans la restauration pendant cinq ans, comme serveur.\n" +
                  "Julie — Ah bon ? Et pourquoi tu as changé ?\n" +
                  "Karim — Parce que je voulais un métier plus technique, avec moins de contact avec le public, en fait. Alors j'ai suivi une formation en maintenance industrielle.\n" +
                  "Julie — Et ça s'est bien passé ?\n" +
                  "Karim — Oui, très bien. Grâce à cette formation, j'ai trouvé un premier poste, et maintenant je suis ici.\n" +
                  "Julie — Et tu as des projets, pour la suite ?\n" +
                  "Karim — Oui, je vais commencer une formation en électronique le mois prochain. J'aimerais évoluer vers un poste de responsable technique d'ici deux ou trois ans.\n" +
                  "Julie — C'est un bon objectif ! Moi, je travaille ici depuis longtemps, je pourrai t'aider si tu as des questions.\n" +
                  "Karim — Merci, c'est gentil !",
                questions: [
                  {
                    kind: "libre",
                    id: "travail-f-q1",
                    prompt: "Que faisait Karim avant de travailler dans la maintenance ?",
                    expectedAnswer: "Il travaillait comme serveur dans la restauration.",
                    correction: { correctAnswer: "Il travaillait comme serveur dans la restauration.", explanation: "Il le raconte dès le début du dialogue." },
                  },
                  {
                    kind: "libre",
                    id: "travail-f-q2",
                    prompt: "Pourquoi a-t-il changé de métier ?",
                    expectedAnswer: "Parce qu'il voulait un métier plus technique, avec moins de contact avec le public.",
                    correction: { correctAnswer: "Parce qu'il voulait un métier plus technique, avec moins de contact avec le public.", explanation: "C'est la raison qu'il donne à Julie." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "travail-f-q3",
                    prompt: "Vrai ou faux : Karim a trouvé son poste sans formation.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Grâce à une formation en maintenance industrielle." },
                  },
                  {
                    kind: "libre",
                    id: "travail-f-q4",
                    prompt: "Quel est le projet de Karim pour le mois prochain ?",
                    expectedAnswer: "Commencer une formation en électronique.",
                    correction: { correctAnswer: "Commencer une formation en électronique.", explanation: "Il l'annonce au futur proche." },
                  },
                  {
                    kind: "libre",
                    id: "travail-f-q5",
                    prompt: "Quel est son objectif professionnel à long terme ?",
                    expectedAnswer: "Devenir responsable technique d'ici deux ou trois ans.",
                    correction: { correctAnswer: "Devenir responsable technique d'ici deux ou trois ans.", explanation: "C'est son objectif exprimé à la fin du dialogue." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "parler-de-son-travail-et-projets-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "parler-de-son-travail-et-projets-entrainement-activite",
            title: "Passé, futur proche et vocabulaire du travail",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "travail-g1",
                type: "texte_a_trous",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Passé composé, imparfait ou futur proche ?",
                textWithBlanks:
                  "Avant, je {{1}} dans un magasin, mais l'année dernière, je {{2}} de métier. " +
                  "Maintenant, je {{3}} suivre une nouvelle formation.",
                blanks: [
                  { id: "1", answer: "travaillais" },
                  { id: "2", answer: "ai changé" },
                  { id: "3", answer: "vais" },
                ],
                correction: {
                  correctAnswer: "travaillais — ai changé — vais",
                  explanation: "Habitude passée → imparfait, événement daté → passé composé, projet proche → futur proche (aller + infinitif).",
                },
              },
              {
                id: "travail-g2",
                type: "texte_a_trous",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Complète au temps qui convient.",
                textWithBlanks:
                  "Karim {{1}} comme serveur pendant cinq ans. Il {{2}} un métier plus technique, alors il {{3}} une formation.",
                blanks: [
                  { id: "1", answer: "a travaillé" },
                  { id: "2", answer: "voulait" },
                  { id: "3", answer: "a suivi" },
                ],
                correction: {
                  correctAnswer: "a travaillé — voulait — a suivi",
                  explanation: "Un fait daté et terminé (« pendant cinq ans ») → passé composé ; un souhait qui durait → imparfait.",
                },
              },
              {
                id: "travail-g3",
                type: "association",
                skillId: "voc-travail",
                difficulty: "B1",
                instructions: "Associe chaque métier à son lieu de travail habituel.",
                pairs: [
                  { id: "1", left: "technicien de maintenance", right: "une usine" },
                  { id: "2", left: "serveur", right: "un restaurant" },
                  { id: "3", left: "responsable technique", right: "une équipe de maintenance" },
                ],
                correction: {
                  correctAnswer: "1 → usine ; 2 → restaurant ; 3 → équipe de maintenance.",
                  explanation: "Ce vocabulaire reprend le parcours professionnel de Karim.",
                },
              },
              {
                id: "travail-g4",
                type: "texte_a_trous",
                skillId: "voc-travail",
                difficulty: "B1",
                instructions: "Complète avec « comme » ou « dans ».",
                textWithBlanks: "Je travaille {{1}} technicien de maintenance {{2}} une usine près de Lyon.",
                blanks: [
                  { id: "1", answer: "comme" },
                  { id: "2", answer: "dans" },
                ],
                correction: {
                  correctAnswer: "comme — dans",
                  explanation: "« travailler comme + métier » et « travailler dans + lieu/domaine ».",
                },
              },
              {
                id: "travail-g5",
                type: "vrai_faux",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "D'après le dialogue de la partie « Compréhension orale ».",
                statement: "Julie propose son aide à Karim s'il a des questions.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "Elle le lui propose à la fin de leur échange." },
              },
              {
                id: "travail-g6",
                type: "reponse_courte",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Reformule avec « grâce à ».",
                question: "« J'ai suivi une formation, et c'est pour ça que j'ai trouvé ce poste. »",
                acceptedAnswers: ["grâce à cette formation, j'ai trouvé ce poste"],
                correction: { correctAnswer: "« Grâce à cette formation, j'ai trouvé ce poste. »", explanation: "« grâce à » introduit une cause positive de façon plus concise." },
              },
            ],
          },
        ],
      },
      {
        id: "parler-de-son-travail-et-projets-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "parler-de-son-travail-et-projets-ecriture-activite",
            title: "Se présenter professionnellement",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "travail-h",
                type: "production_ecrite",
                skillId: "pe-presentation-professionnelle",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Présente-toi professionnellement pour un nouveau collègue ou une nouvelle collègue : ton métier actuel (ou souhaité), ton parcours, et un projet professionnel pour l'avenir.",
                minWords: 80,
                maxWords: 120,
                correctionCriteria: [
                  "Présentation professionnelle claire (/2)",
                  "Parcours passé correctement raconté (/2)",
                  "Projet exprimé au futur proche (/2)",
                  "Connecteur de cause utilisé correctement (/2)",
                  "Vocabulaire du module réutilisé (/2)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "parler-de-son-travail-et-projets-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: false,
        activities: [
          {
            id: "parler-de-son-travail-et-projets-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "travail-i1",
                type: "qcm",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "travail-i1-q",
                  prompt: "« Je ___ commencer une formation le mois prochain. »",
                  choices: [
                    { id: "a", text: "vais" },
                    { id: "b", text: "suis" },
                    { id: "c", text: "ai" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "vais", explanation: "Futur proche : aller + infinitif." },
                },
              },
              {
                id: "travail-i2",
                type: "reponse_courte",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 2. Conjugaison.",
                question: "Mets au passé composé : « il (suivre) une formation ».",
                acceptedAnswers: ["il a suivi", "a suivi"],
                correction: { correctAnswer: "il a suivi", explanation: "« suivre » se conjugue avec l'auxiliaire avoir." },
              },
              {
                id: "travail-i3",
                type: "vrai_faux",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "« Grâce à » introduit toujours une cause négative.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« grâce à » introduit une cause positive." },
              },
              {
                id: "travail-i4",
                type: "reponse_courte",
                skillId: "voc-travail",
                difficulty: "B1",
                instructions: "Item 4. Vocabulaire.",
                question: "Donne un synonyme de « un poste ».",
                acceptedAnswers: ["un métier", "un emploi"],
                correction: { correctAnswer: "un métier / un emploi", explanation: "Ces mots désignent l'activité professionnelle exercée." },
              },
              {
                id: "travail-i5",
                type: "texte_a_trous",
                skillId: "voc-travail",
                difficulty: "B1",
                instructions: "Item 5.",
                textWithBlanks: "Je travaille {{1}} infirmière {{2}} un hôpital.",
                blanks: [
                  { id: "1", answer: "comme" },
                  { id: "2", answer: "dans" },
                ],
                correction: { correctAnswer: "comme — dans", explanation: "« travailler comme + métier » et « travailler dans + lieu »." },
              },
              {
                id: "travail-i6",
                type: "reponse_courte",
                skillId: "voc-travail",
                difficulty: "B1",
                instructions: "Item 6.",
                question: "Cite deux mots pour décrire un contrat de travail.",
                acceptedAnswers: ["cdi, cdd", "cdi et cdd"],
                correction: { correctAnswer: "deux parmi : CDI, CDD, intérim, employeur, salaire.", explanation: "Ce sont des termes courants liés au contrat de travail." },
              },
              {
                id: "travail-i7",
                type: "qcm",
                skillId: "gr-passe-compose-imparfait",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "travail-i7-q",
                  prompt: "Quel temps utilise-t-on pour un projet concret et proche ?",
                  choices: [
                    { id: "a", text: "imparfait" },
                    { id: "b", text: "futur proche" },
                    { id: "c", text: "plus-que-parfait" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "futur proche", explanation: "Le futur proche exprime un projet concret et proche dans le temps." },
                },
              },
              {
                id: "travail-i8",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 8. D'après le texte de compréhension écrite.",
                question: "Pourquoi Karim a-t-il changé de métier ?",
                acceptedAnswers: ["il voulait un métier plus technique"],
                correction: { correctAnswer: "Parce qu'il voulait un métier plus technique.", explanation: "Il le précise dans son profil professionnel." },
              },
              {
                id: "travail-i9",
                type: "reponse_courte",
                skillId: "voc-travail",
                difficulty: "B1",
                instructions: "Item 9. Vocabulaire.",
                question: "Que signifie « évoluer vers un poste » ?",
                acceptedAnswers: ["progresser vers un poste"],
                correction: { correctAnswer: "Progresser vers un poste avec plus de responsabilités.", explanation: "C'est une évolution professionnelle positive." },
              },
              {
                id: "travail-i10",
                type: "reponse_courte",
                skillId: "pe-presentation-professionnelle",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, présente un projet professionnel au futur proche.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi selon le point de langue : « aller » au présent + infinitif.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-comprendre-une-demarche-administrative",
    slug: "comprendre-une-demarche-administrative",
    level: "B1",
    title: "Comprendre une démarche administrative",
    description:
      "À la fin de ce module, tu pourras comprendre les étapes d'une démarche administrative, identifier les documents à fournir et poser une question pour clarifier une procédure.",
    objectives: [
      "Comprendre une procédure",
      "Repérer une liste de pièces justificatives",
      "Poser une question de clarification",
    ],
    domain: "comprehension_ecrite",
    stageId: "b1-intermediaire",
    estimatedMinutes: 33,
    situation:
      "Youssef doit renouveler son titre de séjour. Il consulte les informations disponibles, puis prend rendez-vous et pose des questions à un agent d'accueil.",
    vocabulary: [
      { term: "une démarche", category: "principal" },
      { term: "un dossier", category: "principal" },
      { term: "une pièce justificative", category: "principal" },
      { term: "un justificatif de domicile", category: "principal" },
      { term: "une photo d'identité", category: "principal" },
      { term: "un formulaire", category: "principal" },
      { term: "remplir (un formulaire)", category: "principal" },
      { term: "fournir (un document)", category: "principal" },
      { term: "déposer (un dossier)", category: "principal" },
      { term: "un récépissé", category: "principal" },
      { term: "un délai de traitement", category: "principal" },
      { term: "une convocation", category: "principal" },
      { term: "un guichet", category: "principal" },
      { term: "un agent (d'accueil)", category: "principal" },
      { term: "une prise de rendez-vous", category: "principal" },
      { term: "un renouvellement", category: "principal" },
      { term: "valable (un document valable)", category: "principal" },
      { term: "en cours de validité", category: "principal" },
      { term: "« il faut que vous fournissiez... »", category: "expression" },
      { term: "« les pièces à fournir sont... »", category: "expression" },
      { term: "« dans un délai de... »", category: "expression" },
      { term: "« pouvez-vous me préciser... ? »", category: "expression" },
      { term: "« qu'est-ce qu'il me manque ? »", category: "expression" },
      { term: "remplir", category: "verbe" },
      { term: "fournir", category: "verbe" },
      { term: "déposer", category: "verbe" },
      { term: "joindre (un document)", category: "verbe" },
      { term: "vérifier", category: "verbe" },
      { term: "se renseigner sur", category: "verbe" },
      { term: "d'abord", category: "connecteur" },
      { term: "ensuite", category: "connecteur" },
      { term: "puis", category: "connecteur" },
      { term: "enfin", category: "connecteur" },
      { term: "pour finir", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "« Il faut » et « il faut que » + subjonctif présent",
        explanation:
          "il faut + infinitif : quand on ne précise pas qui doit agir. Pour renouveler son titre de séjour, il faut prendre rendez-vous. il faut que + subjonctif : quand on précise la personne. Il faut que vous fournissiez un justificatif de domicile. Au B1, on retient des formes fréquentes : il faut que je fournisse / vous fournissiez, je remplisse / vous remplissiez, je sois / vous soyez, j'aie / vous ayez, je fasse / vous fassiez — un usage pratique, pas un cours complet sur le subjonctif.",
      },
      {
        title: "Structurer un texte informatif",
        explanation:
          "Pour présenter des étapes dans l'ordre : D'abord, vous devez... Ensuite, il faut... Enfin / Pour finir, vous recevrez...",
      },
    ],
    examLinks: [
      "DELF B1 — compréhension des écrits (document informatif/administratif)",
      "TCF IRN — compréhension écrite",
    ],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "comprendre-une-demarche-administrative-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "comprendre-une-demarche-administrative-comprendre-activite",
            title: "Lire une page d'information administrative",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "admin-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez la page « Renouvellement du titre de séjour : les étapes » (fictive), puis répondez.",
                text:
                  "D'abord, vous devez prendre rendez-vous en ligne, au moins deux mois avant la date d'expiration " +
                  "de votre titre actuel. Ensuite, il faut que vous prépariez les pièces justificatives suivantes : " +
                  "une pièce d'identité, un justificatif de domicile de moins de trois mois, deux photos " +
                  "d'identité récentes, et votre titre de séjour actuel. Le jour du rendez-vous, un agent " +
                  "vérifiera votre dossier et vous remettra un récépissé. Ce récépissé est valable pendant toute " +
                  "la durée du traitement de votre demande. Enfin, vous recevrez une convocation par courrier " +
                  "pour venir récupérer votre nouveau titre, généralement dans un délai de deux à quatre mois.",
                questions: [
                  {
                    kind: "libre",
                    id: "admin-e-q1",
                    prompt: "Combien de temps avant l'expiration faut-il prendre rendez-vous ?",
                    expectedAnswer: "Au moins deux mois avant.",
                    correction: { correctAnswer: "Au moins deux mois avant.", explanation: "C'est la première étape mentionnée dans le texte." },
                  },
                  {
                    kind: "libre",
                    id: "admin-e-q2",
                    prompt: "Cite deux pièces justificatives demandées.",
                    expectedAnswer: "Deux parmi : pièce d'identité, justificatif de domicile, photos d'identité, titre de séjour actuel.",
                    correction: { correctAnswer: "Deux parmi : pièce d'identité, justificatif de domicile, photos d'identité, titre de séjour actuel.", explanation: "Ces quatre documents sont listés dans le texte." },
                  },
                  {
                    kind: "libre",
                    id: "admin-e-q3",
                    prompt: "Que reçoit-on le jour du rendez-vous ?",
                    expectedAnswer: "Un récépissé.",
                    correction: { correctAnswer: "Un récépissé.", explanation: "Il est remis après vérification du dossier." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "admin-e-q4",
                    prompt: "Vrai ou faux : le récépissé n'a aucune valeur légale.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Il est valable pendant toute la durée du traitement de la demande." },
                  },
                  {
                    kind: "qcm",
                    id: "admin-e-q5",
                    prompt: "Quel est le délai moyen pour recevoir le nouveau titre ?",
                    choices: [
                      { id: "a", text: "Une semaine." },
                      { id: "b", text: "Deux à quatre mois." },
                      { id: "c", text: "Un an." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Deux à quatre mois.", explanation: "Le texte le précise à la toute fin." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-une-demarche-administrative-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "comprendre-une-demarche-administrative-ecoute-activite",
            title: "Écouter Youssef au guichet de la préfecture",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "admin-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez le dialogue (« Au guichet de la préfecture », Youssef et l'agent, 1 min 45), puis répondez.",
                audioSrc: "/audio/b1/comprendre-une-demarche-administrative.mp3",
                transcript:
                  "Agent — Bonjour, vous venez pour quelle démarche ?\n" +
                  "Youssef — Bonjour, je voudrais renouveler mon titre de séjour, il expire dans trois mois.\n" +
                  "Agent — Très bien. Est-ce que vous avez déjà pris rendez-vous en ligne ?\n" +
                  "Youssef — Pas encore, je voulais d'abord savoir quels documents il me faut.\n" +
                  "Agent — D'accord. Il faut que vous ayez une pièce d'identité, un justificatif de domicile de moins de trois mois, deux photos d'identité, et votre titre actuel.\n" +
                  "Youssef — Et pour le justificatif de domicile, une facture d'électricité, ça convient ?\n" +
                  "Agent — Oui, tout à fait, à condition qu'elle ait moins de trois mois.\n" +
                  "Youssef — Très bien. Et combien de temps ça prend, en général ?\n" +
                  "Agent — Comptez entre deux et quatre mois après le dépôt du dossier. En attendant, vous recevrez un récépissé qui vous permet de continuer à vivre normalement en France.\n" +
                  "Youssef — D'accord, merci beaucoup pour ces précisions.",
                questions: [
                  {
                    kind: "libre",
                    id: "admin-f-q1",
                    prompt: "Dans combien de temps le titre de séjour de Youssef expire-t-il ?",
                    expectedAnswer: "Dans trois mois.",
                    correction: { correctAnswer: "Dans trois mois.", explanation: "Il le précise dès le début du dialogue." },
                  },
                  {
                    kind: "libre",
                    id: "admin-f-q2",
                    prompt: "Youssef a-t-il déjà pris rendez-vous en ligne ?",
                    expectedAnswer: "Non, pas encore.",
                    correction: { correctAnswer: "Non, pas encore.", explanation: "Il veut d'abord connaître les documents nécessaires." },
                  },
                  {
                    kind: "libre",
                    id: "admin-f-q3",
                    prompt: "Une facture d'électricité peut-elle servir de justificatif de domicile ?",
                    expectedAnswer: "Oui, si elle a moins de trois mois.",
                    correction: { correctAnswer: "Oui, si elle a moins de trois mois.", explanation: "L'agent le confirme à Youssef." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "admin-f-q4",
                    prompt: "Vrai ou faux : sans récépissé, Youssef ne peut plus rester en France pendant le traitement du dossier.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Le récépissé lui permet justement de continuer à vivre normalement en France." },
                  },
                  {
                    kind: "libre",
                    id: "admin-f-q5",
                    prompt: "Combien de temps dure en général le traitement du dossier ?",
                    expectedAnswer: "Entre deux et quatre mois.",
                    correction: { correctAnswer: "Entre deux et quatre mois.", explanation: "C'est l'estimation donnée par l'agent." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-une-demarche-administrative-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "comprendre-une-demarche-administrative-entrainement-activite",
            title: "Il faut que + subjonctif, et vocabulaire administratif",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "admin-g1",
                type: "qcm",
                skillId: "gr-subjonctif-il-faut-que",
                difficulty: "B1",
                instructions: "« Il faut » ou « il faut que » ?",
                question: {
                  kind: "qcm",
                  id: "admin-g1-q",
                  prompt: "« ___ vous fournissiez un justificatif de domicile. »",
                  choices: [
                    { id: "a", text: "Il faut" },
                    { id: "b", text: "Il faut que" },
                    { id: "c", text: "Il faudra" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Il faut que", explanation: "Le sujet (« vous ») est précisé → « il faut que » + subjonctif." },
                },
              },
              {
                id: "admin-g2",
                type: "texte_a_trous",
                skillId: "gr-subjonctif-il-faut-que",
                difficulty: "B1",
                instructions: "Complète au subjonctif présent.",
                textWithBlanks:
                  "Pour ce dossier, il faut que vous {{1}} une pièce d'identité, que vous {{2}} le formulaire, " +
                  "et que vous {{3}} présent le jour du rendez-vous.",
                blanks: [
                  { id: "1", answer: "ayez" },
                  { id: "2", answer: "remplissiez" },
                  { id: "3", answer: "soyez" },
                ],
                correction: {
                  correctAnswer: "ayez — remplissiez — soyez",
                  explanation: "Subjonctif présent, 2e personne du pluriel, des verbes avoir, remplir et être.",
                },
              },
              {
                id: "admin-g3",
                type: "remise_en_ordre",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Remets les étapes dans l'ordre.",
                items: [
                  { id: "a", text: "Recevoir une convocation pour le nouveau titre." },
                  { id: "b", text: "Prendre rendez-vous en ligne." },
                  { id: "c", text: "Recevoir un récépissé au guichet." },
                  { id: "d", text: "Préparer les pièces justificatives." },
                ],
                correctOrder: ["b", "d", "c", "a"],
                correction: {
                  correctAnswer: "b, d, c, a",
                  explanation: "Rendez-vous → préparation des documents → dépôt et récépissé → convocation finale.",
                },
              },
              {
                id: "admin-g4",
                type: "association",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Associe chaque document à sa description.",
                pairs: [
                  { id: "1", left: "un récépissé", right: "document provisoire pendant le traitement du dossier" },
                  { id: "2", left: "un justificatif de domicile", right: "preuve qu'on habite à une adresse" },
                  { id: "3", left: "une convocation", right: "courrier qui demande de venir à un rendez-vous" },
                ],
                correction: {
                  correctAnswer: "1 → document provisoire ; 2 → preuve d'adresse ; 3 → courrier de rendez-vous.",
                  explanation: "Ces trois documents reviennent souvent dans les démarches administratives.",
                },
              },
              {
                id: "admin-g5",
                type: "reponse_courte",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "D'après le texte de compréhension écrite.",
                question: "Quelle est la durée de validité maximale d'un justificatif de domicile accepté ?",
                acceptedAnswers: ["moins de trois mois", "trois mois"],
                correction: { correctAnswer: "Moins de trois mois.", explanation: "C'est précisé deux fois dans le module (texte et dialogue)." },
              },
              {
                id: "admin-g6",
                type: "vrai_faux",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "D'après le dialogue de la partie « Compréhension orale ».",
                statement: "Youssef doit attendre un an pour recevoir son nouveau titre.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "Il doit attendre entre deux et quatre mois." },
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-une-demarche-administrative-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "comprendre-une-demarche-administrative-ecriture-activite",
            title: "Demander une clarification par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "admin-h",
                type: "production_ecrite",
                skillId: "pe-clarifier-demarche",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Tu dois accomplir une démarche administrative (à toi de choisir laquelle : inscription à un service, demande de document, renouvellement...). Écris un court message pour demander à un agent quelles sont les étapes et les documents nécessaires.",
                minWords: 60,
                maxWords: 90,
                correctionCriteria: [
                  "Demande clairement formulée (/2)",
                  "Questions précises et pertinentes (/3)",
                  "Registre poli et adapté (/2)",
                  "Vocabulaire du module réutilisé (/2)",
                  "Texte compréhensible dans l'ensemble (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-une-demarche-administrative-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: false,
        activities: [
          {
            id: "comprendre-une-demarche-administrative-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "admin-i1",
                type: "qcm",
                skillId: "gr-subjonctif-il-faut-que",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "admin-i1-q",
                  prompt: "« ___ vous ayez un justificatif de domicile. »",
                  choices: [
                    { id: "a", text: "Il faut" },
                    { id: "b", text: "Il faut que" },
                    { id: "c", text: "Il fait" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Il faut que", explanation: "Sujet précisé (« vous ») → subjonctif après « il faut que »." },
                },
              },
              {
                id: "admin-i2",
                type: "reponse_courte",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Item 2. Vocabulaire.",
                question: "Que signifie « une pièce justificative » ?",
                acceptedAnswers: ["un document qui prouve une information"],
                correction: { correctAnswer: "Un document qui prouve une information (identité, domicile, etc.).", explanation: "C'est un terme générique pour désigner les documents à fournir." },
              },
              {
                id: "admin-i3",
                type: "vrai_faux",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "Le récépissé remplace définitivement le titre de séjour.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "Il est provisoire, valable pendant le traitement du dossier." },
              },
              {
                id: "admin-i4",
                type: "texte_a_trous",
                skillId: "gr-connecteurs-logiques",
                difficulty: "B1",
                instructions: "Item 4. Connecteurs d'ordre.",
                textWithBlanks: "{{1}}, vous prenez rendez-vous. {{2}}, vous préparez vos documents.",
                blanks: [
                  { id: "1", answer: "D'abord" },
                  { id: "2", answer: "Ensuite" },
                ],
                correction: { correctAnswer: "D'abord — Ensuite", explanation: "Ces connecteurs structurent les étapes dans l'ordre." },
              },
              {
                id: "admin-i5",
                type: "reponse_courte",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Item 5.",
                question: "Cite deux documents souvent demandés dans une démarche administrative.",
                acceptedAnswers: ["pièce d'identité, justificatif de domicile"],
                correction: { correctAnswer: "deux parmi : pièce d'identité, justificatif de domicile, photo d'identité.", explanation: "Ce sont les documents les plus fréquemment exigés." },
              },
              {
                id: "admin-i6",
                type: "reponse_courte",
                skillId: "gr-subjonctif-il-faut-que",
                difficulty: "B1",
                instructions: "Item 6. Conjugaison.",
                question: "Subjonctif présent de « être » : « il faut que je ___. »",
                acceptedAnswers: ["sois"],
                correction: { correctAnswer: "sois", explanation: "« être » au subjonctif présent, 1re personne du singulier." },
              },
              {
                id: "admin-i7",
                type: "qcm",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "admin-i7-q",
                  prompt: "Quel est le sens de « en cours de validité » ?",
                  choices: [
                    { id: "a", text: "Expiré." },
                    { id: "b", text: "Toujours valable." },
                    { id: "c", text: "Perdu." },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Toujours valable.", explanation: "Un document « en cours de validité » n'a pas expiré." },
                },
              },
              {
                id: "admin-i8",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 8. D'après le texte de compréhension écrite.",
                question: "À quoi sert le récépissé ?",
                acceptedAnswers: ["il permet de continuer à vivre normalement en france pendant le traitement"],
                correction: { correctAnswer: "Il permet de continuer à vivre normalement en France pendant le traitement de la demande.", explanation: "C'est son rôle principal, précisé dans le texte et le dialogue." },
              },
              {
                id: "admin-i9",
                type: "reponse_courte",
                skillId: "voc-administratif",
                difficulty: "B1",
                instructions: "Item 9. Vocabulaire.",
                question: "Que fait-on quand on « dépose un dossier » ?",
                acceptedAnswers: ["on remet officiellement ses documents"],
                correction: { correctAnswer: "On remet officiellement ses documents à l'administration.", explanation: "« déposer » = remettre en main propre ou transmettre officiellement." },
              },
              {
                id: "admin-i10",
                type: "reponse_courte",
                skillId: "pe-clarifier-demarche",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, explique une étape d'une démarche avec « il faut que ».",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi selon le point de langue : « il faut que » + subjonctif présent.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-decrire-vie-quotidienne",
    slug: "decrire-vie-quotidienne",
    level: "B1",
    title: "Décrire sa vie quotidienne et ses habitudes",
    description:
      "À la fin de ce module, tu pourras décrire ton quotidien, tes habitudes et ton organisation avec précision.",
    objectives: [
      "Décrire une habitude",
      "Exprimer une fréquence",
      "Comparer un avant et un maintenant",
    ],
    domain: "vocabulaire",
    stageId: "b1-debut",
    estimatedMinutes: 28,
    situation:
      "Léa vient d'emménager en colocation. Sa colocataire Fatou lui propose d'organiser ensemble le ménage et les repas de la semaine.",
    vocabulary: [
      { term: "une habitude", category: "principal" },
      { term: "une routine", category: "principal" },
      { term: "le quotidien", category: "principal" },
      { term: "une tâche ménagère", category: "principal" },
      { term: "le ménage", category: "principal" },
      { term: "les courses", category: "principal" },
      { term: "un repas équilibré", category: "principal" },
      { term: "l'organisation", category: "principal" },
      { term: "une corvée", category: "principal" },
      { term: "un emploi du temps", category: "principal" },
      { term: "« d'habitude »", category: "expression" },
      { term: "« en général »", category: "expression" },
      { term: "« de temps en temps »", category: "expression" },
      { term: "« ça dépend des jours »", category: "expression" },
      { term: "se lever", category: "verbe" },
      { term: "se coucher", category: "verbe" },
      { term: "faire les courses", category: "verbe" },
      { term: "faire le ménage", category: "verbe" },
      { term: "ranger", category: "verbe" },
      { term: "partager (une tâche)", category: "verbe" },
      { term: "toujours", category: "connecteur" },
      { term: "souvent", category: "connecteur" },
      { term: "parfois", category: "connecteur" },
      { term: "rarement", category: "connecteur" },
      { term: "ne...jamais", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Le présent pour parler d'habitudes",
        explanation:
          "Le présent + un adverbe de fréquence décrit une habitude : Je me lève toujours à 7h. Elle fait souvent les courses le samedi. L'adverbe se place en général juste après le verbe conjugué.",
      },
      {
        title: "Les articles partitifs et la négation",
        explanation:
          "Pour une quantité indéfinie, on utilise du, de la, de l', des : Je mange du pain, de la salade. À la forme négative, du/de la/des deviennent « de » (ou « d' ») : Je ne mange pas de viande. On retrouve la même règle avec ne...plus et ne...jamais : Je n'achète plus de plats préparés.",
      },
    ],
    examLinks: ["DELF B1 — compréhension de l'oral (documents de vie quotidienne)"],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "decrire-vie-quotidienne-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "decrire-vie-quotidienne-comprendre-activite",
            title: "Lire le message de Léa",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "quotidien-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le message, puis répondez aux questions.",
                text:
                  "Salut Fatou, comme promis, voici mon organisation habituelle ! En général, je me lève " +
                  "vers 7h en semaine et je prends toujours un petit-déjeuner avant de partir. Le soir, je " +
                  "fais souvent les courses en rentrant, sauf le vendredi : ce jour-là, je ne cuisine jamais, " +
                  "on commande plutôt un repas. Le ménage, je le fais plutôt le week-end, de temps en temps " +
                  "avec de la musique pour que ce soit moins une corvée ! Dis-moi ton emploi du temps et on " +
                  "s'organise ensemble.",
                questions: [
                  {
                    kind: "vrai_faux",
                    id: "quotidien-e-q1",
                    prompt: "Vrai ou faux : Léa cuisine tous les soirs de la semaine.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Le vendredi, elle ne cuisine jamais : ils commandent un repas.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "quotidien-e-q2",
                    prompt: "Quand Léa fait-elle le ménage, en général ?",
                    expectedAnswer: "Plutôt le week-end.",
                    correction: {
                      correctAnswer: "Plutôt le week-end.",
                      explanation: "Elle le dit directement : « le ménage, je le fais plutôt le week-end ».",
                    },
                  },
                  {
                    kind: "libre",
                    id: "quotidien-e-q3",
                    prompt: "Que fait Léa pour rendre le ménage moins pénible ?",
                    expectedAnswer: "Elle met de la musique.",
                    correction: {
                      correctAnswer: "Elle écoute de la musique en le faisant.",
                      explanation: "« de temps en temps avec de la musique pour que ce soit moins une corvée ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "decrire-vie-quotidienne-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "decrire-vie-quotidienne-ecoute-activite",
            title: "Écouter Léa et Fatou s'organiser",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "quotidien-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez le dialogue (« On s'organise ? », Léa et Fatou, 1 min 20), puis répondez.",
                audioSrc: "/audio/b1/decrire-vie-quotidienne.mp3",
                transcript:
                  "Fatou — Bon, pour les courses, on fait comment ? Toutes les deux chacune son tour ?\n" +
                  "Léa — Ça me va. Moi je peux y aller le mardi, j'ai moins cours ce jour-là.\n" +
                  "Fatou — Parfait, et moi le samedi matin, avant que ce soit trop plein.\n" +
                  "Léa — Et pour le ménage ? Moi, en semaine, j'ai vraiment jamais le temps.\n" +
                  "Fatou — Pas de souci, on le fait le dimanche, toutes les deux, ça ira plus vite.\n" +
                  "Léa — Bonne idée. Et la vaisselle, on ne la laisse jamais traîner, d'accord ?\n" +
                  "Fatou — D'accord, chacune la sienne, tout de suite après manger.",
                questions: [
                  {
                    kind: "libre",
                    id: "quotidien-f-q1",
                    prompt: "Quel jour Léa fait-elle les courses ?",
                    expectedAnswer: "Le mardi.",
                    correction: { correctAnswer: "Le mardi.", explanation: "Elle a moins cours ce jour-là." },
                  },
                  {
                    kind: "libre",
                    id: "quotidien-f-q2",
                    prompt: "Pourquoi Fatou préfère-t-elle faire les courses le samedi matin ?",
                    expectedAnswer: "Avant que le magasin soit trop plein.",
                    correction: {
                      correctAnswer: "Avant que ce soit trop plein.",
                      explanation: "« avant que ce soit trop plein » : elle veut éviter l'affluence.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "quotidien-f-q3",
                    prompt: "Quel jour font-elles le ménage ensemble ?",
                    choices: [
                      { id: "a", text: "Le samedi" },
                      { id: "b", text: "Le dimanche" },
                      { id: "c", text: "Le mardi" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Le dimanche.", explanation: "« on le fait le dimanche, toutes les deux »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "quotidien-f-q4",
                    prompt: "Vrai ou faux : elles décident de laisser parfois la vaisselle pour plus tard.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "« on ne la laisse jamais traîner » : chacune fait sa vaisselle tout de suite.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "decrire-vie-quotidienne-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "decrire-vie-quotidienne-entrainement-activite",
            title: "Fréquence, partitifs et négation",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "quotidien-g1",
                type: "qcm",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Choisissez l'adverbe qui convient.",
                question: {
                  kind: "qcm",
                  id: "quotidien-g1-q",
                  prompt: "« Le dimanche, il ne travaille ___. »",
                  choices: [
                    { id: "a", text: "toujours" },
                    { id: "b", text: "jamais" },
                    { id: "c", text: "souvent" },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "jamais",
                    explanation: "« ne...jamais » exprime une fréquence nulle : il ne travaille jamais le dimanche.",
                  },
                },
              },
              {
                id: "quotidien-g2",
                type: "texte_a_trous",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Complétez avec l'article partitif qui convient (du, de la, de l', ou « de » si négatif).",
                textWithBlanks:
                  "Le matin, je bois {{1}} café et je mange {{2}} pain. Le soir, je ne mange jamais {{3}} viande.",
                blanks: [
                  { id: "1", answer: "du" },
                  { id: "2", answer: "du" },
                  { id: "3", answer: "de" },
                ],
                correction: {
                  correctAnswer: "du — du — de",
                  explanation: "« café » et « pain » sont masculins (du) ; à la forme négative, l'article partitif devient « de ».",
                },
              },
              {
                id: "quotidien-g3",
                type: "association",
                skillId: "voc-vie-quotidienne",
                difficulty: "B1",
                instructions: "Associez chaque tâche à son moment habituel.",
                pairs: [
                  { id: "1", left: "Faire les courses", right: "en général le week-end" },
                  { id: "2", left: "Se coucher", right: "vers 22h ou 23h" },
                  { id: "3", left: "Faire la vaisselle", right: "juste après le repas" },
                ],
                correction: {
                  correctAnswer:
                    "Courses → week-end ; se coucher → 22h-23h ; vaisselle → après le repas.",
                  explanation: "Ce sont des associations habituelles, pas des règles absolues, mais logiques dans un quotidien organisé.",
                  notionAssociee: "voc-vie-quotidienne",
                },
              },
              {
                id: "quotidien-g4",
                type: "remise_en_ordre",
                skillId: "voc-vie-quotidienne",
                difficulty: "B1",
                instructions: "Remettez cette routine du matin dans l'ordre logique.",
                items: [
                  { id: "a", text: "Elle se lève." },
                  { id: "b", text: "Elle prend son petit-déjeuner." },
                  { id: "c", text: "Elle se douche et s'habille." },
                  { id: "d", text: "Elle part au travail." },
                ],
                correctOrder: ["a", "c", "b", "d"],
                correction: {
                  correctAnswer: "a, c, b, d",
                  explanation: "Se lever, puis se préparer, puis manger, puis partir : l'ordre le plus courant d'une routine matinale.",
                },
              },
              {
                id: "quotidien-g5",
                type: "vrai_faux",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Vrai ou faux ?",
                statement: "« Je ne bois plus de café le soir » signifie que j'ai arrêté d'en boire le soir.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "« ne...plus » indique l'arrêt d'une habitude passée.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "decrire-vie-quotidienne-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "decrire-vie-quotidienne-ecriture-activite",
            title: "Décrire sa semaine type",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "quotidien-h",
                type: "production_ecrite",
                skillId: "pe-decrire-quotidien",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Dans un message à un·e nouveau·elle colocataire, décris ta semaine type : tes habitudes, tes tâches ménagères et ton organisation. Utilise au moins trois adverbes de fréquence.",
                minWords: 60,
                maxWords: 120,
                correctionCriteria: [
                  "Au moins trois adverbes de fréquence (toujours, souvent, parfois, rarement, jamais)",
                  "Au moins une tâche ménagère mentionnée",
                  "Une négation correcte (ne...jamais, ne...plus...)",
                  "Un texte organisé et compréhensible",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "decrire-vie-quotidienne-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: true,
        activities: [
          {
            id: "decrire-vie-quotidienne-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "quotidien-i1",
                type: "qcm",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "quotidien-i1-q",
                  prompt: "« Elle fait ___ les courses le samedi. »",
                  choices: [
                    { id: "a", text: "souvent" },
                    { id: "b", text: "souvente" },
                    { id: "c", text: "souventes" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "souvent", explanation: "L'adverbe « souvent » est invariable." },
                },
              },
              {
                id: "quotidien-i2",
                type: "reponse_courte",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Item 2. Mettez à la forme négative avec « ne...jamais ».",
                question: "« Je mange de la viande le soir. » → négatif :",
                acceptedAnswers: ["je ne mange jamais de viande le soir", "je ne mange jamais de viande"],
                correction: {
                  correctAnswer: "Je ne mange jamais de viande le soir.",
                  explanation: "À la forme négative, l'article partitif « de la » devient « de ».",
                },
              },
              {
                id: "quotidien-i3",
                type: "vrai_faux",
                skillId: "voc-vie-quotidienne",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "Une « corvée » est une tâche qu'on adore faire.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Une corvée est au contraire une tâche pénible ou peu agréable.",
                },
              },
              {
                id: "quotidien-i4",
                type: "reponse_courte",
                skillId: "voc-vie-quotidienne",
                difficulty: "B1",
                instructions: "Item 4.",
                question: "Donne un synonyme de « le quotidien ».",
                acceptedAnswers: ["la routine", "la vie de tous les jours", "les habitudes"],
                correction: {
                  correctAnswer: "La routine / la vie de tous les jours.",
                  explanation: "Ces expressions désignent toutes ce qu'on fait régulièrement, jour après jour.",
                },
              },
              {
                id: "quotidien-i5",
                type: "texte_a_trous",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Item 5.",
                textWithBlanks: "Le matin, je ne bois jamais {{1}} thé, je préfère {{2}} café.",
                blanks: [
                  { id: "1", answer: "de" },
                  { id: "2", answer: "le" },
                ],
                correction: {
                  correctAnswer: "de — le",
                  explanation: "Négation → « de » ; après un verbe de préférence, on utilise l'article défini (« le café » en général).",
                },
              },
              {
                id: "quotidien-i6",
                type: "reponse_courte",
                skillId: "voc-vie-quotidienne",
                difficulty: "B1",
                instructions: "Item 6.",
                question: "Cite deux tâches ménagères vues dans ce module.",
                acceptedAnswers: [
                  "le ménage et les courses",
                  "les courses et la vaisselle",
                  "le ménage et la vaisselle",
                  "faire le ménage et faire les courses",
                ],
                correction: {
                  correctAnswer: "Le ménage, les courses, la vaisselle...",
                  explanation: "Toute paire de tâches ménagères mentionnées dans le module est acceptée.",
                },
              },
              {
                id: "quotidien-i7",
                type: "qcm",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "quotidien-i7-q",
                  prompt: "Quel adverbe exprime la fréquence la plus faible (hors « jamais ») ?",
                  choices: [
                    { id: "a", text: "toujours" },
                    { id: "b", text: "rarement" },
                    { id: "c", text: "souvent" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "rarement", explanation: "« rarement » signifie presque jamais, mais pas totalement." },
                },
              },
              {
                id: "quotidien-i8",
                type: "reponse_courte",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Item 8. D'après le dialogue de la partie « Compréhension orale ».",
                question: "Qui fait les courses le samedi matin ?",
                acceptedAnswers: ["fatou"],
                correction: { correctAnswer: "Fatou.", explanation: "Elle préfère y aller avant que ce soit trop plein." },
              },
              {
                id: "quotidien-i9",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 9. D'après le message de Léa.",
                question: "Que font Léa et sa coloc le vendredi soir au lieu de cuisiner ?",
                acceptedAnswers: ["ils commandent un repas", "elles commandent un repas", "commander un repas"],
                correction: { correctAnswer: "Ils commandent un repas.", explanation: "« ce jour-là, je ne cuisine jamais, on commande plutôt un repas »." },
              },
              {
                id: "quotidien-i10",
                type: "reponse_courte",
                skillId: "pe-decrire-quotidien",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, décris une de tes habitudes avec un adverbe de fréquence.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi : présent + adverbe de fréquence bien placé, phrase claire.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-prendre-rendez-vous",
    slug: "prendre-rendez-vous",
    level: "B1",
    title: "Prendre rendez-vous",
    description:
      "À la fin de ce module, tu pourras prendre, modifier ou annuler un rendez-vous par téléphone ou par écrit.",
    objectives: [
      "Demander un rendez-vous",
      "Proposer une date ou un horaire",
      "Comprendre une confirmation de rendez-vous",
    ],
    domain: "grammaire",
    stageId: "b1-debut",
    estimatedMinutes: 27,
    situation:
      "Karim doit prendre rendez-vous chez le dentiste. Il appelle le cabinet, puis reçoit un message de confirmation.",
    vocabulary: [
      { term: "un rendez-vous", category: "principal" },
      { term: "un cabinet (médical)", category: "principal" },
      { term: "un créneau", category: "principal" },
      { term: "la disponibilité", category: "principal" },
      { term: "une confirmation", category: "principal" },
      { term: "un empêchement", category: "principal" },
      { term: "un secrétariat", category: "principal" },
      { term: "une convocation", category: "principal" },
      { term: "« Je vous appelle pour... »", category: "expression" },
      { term: "« Est-ce que vous auriez... »", category: "expression" },
      { term: "« Ça vous conviendrait ? »", category: "expression" },
      { term: "« Je suis désolé·e, je ne peux pas venir. »", category: "expression" },
      { term: "prendre rendez-vous", category: "verbe" },
      { term: "confirmer", category: "verbe" },
      { term: "annuler", category: "verbe" },
      { term: "reporter", category: "verbe" },
      { term: "déplacer (un rendez-vous)", category: "verbe" },
      { term: "dans (+ durée)", category: "connecteur" },
      { term: "avant (+ date)", category: "connecteur" },
      { term: "à partir de", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Le futur proche : aller + infinitif",
        explanation:
          "Il annonce une action proche ou déjà décidée : Je vais appeler le cabinet demain. Le rendez-vous va être confirmé par SMS.",
      },
      {
        title: "Le futur simple",
        explanation:
          "Il annonce une action plus lointaine ou moins certaine : Le docteur vous recevra à 15h. Radical de l'infinitif (souvent) + terminaisons -ai, -as, -a, -ons, -ez, -ont : je viendrai, vous recevrez.",
      },
      {
        title: "Les expressions de temps : dans, avant, à partir de",
        explanation:
          "« dans » + durée = à la fin de cette durée (Je serai disponible dans deux jours). « avant » + date/heure = une limite à ne pas dépasser (Appelez avant 18h). « à partir de » = un point de départ (Le cabinet est ouvert à partir de 9h).",
      },
    ],
    examLinks: ["TCF IRN — compréhension de l'oral (messages/répondeurs)"],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "prendre-rendez-vous-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "prendre-rendez-vous-comprendre-activite",
            title: "Lire le SMS de confirmation",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "rdv-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le message, puis répondez aux questions.",
                text:
                  "Cabinet dentaire Leroy : votre rendez-vous du mardi 14 à 10h30 est confirmé. Merci d'arriver " +
                  "10 minutes avant, avec votre carte vitale. En cas d'empêchement, merci de prévenir le " +
                  "secrétariat au moins 24h avant, au 01 23 45 67 89. À partir de 9h, une personne pourra " +
                  "aussi vous répondre par téléphone.",
                questions: [
                  {
                    kind: "libre",
                    id: "rdv-e-q1",
                    prompt: "À quelle heure Karim doit-il arriver au cabinet ?",
                    expectedAnswer: "10h20, soit 10 minutes avant le rendez-vous de 10h30.",
                    correction: {
                      correctAnswer: "À 10h20 (10 minutes avant 10h30).",
                      explanation: "Le message précise « merci d'arriver 10 minutes avant ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "rdv-e-q2",
                    prompt: "Vrai ou faux : Karim peut annuler son rendez-vous la veille au soir sans problème.",
                    correctAnswer: true,
                    correction: {
                      correctAnswer: "Vrai.",
                      explanation: "« au moins 24h avant » : la veille au soir, pour un rendez-vous le matin, respecte ce délai.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "rdv-e-q3",
                    prompt: "Que doit apporter Karim au rendez-vous ?",
                    expectedAnswer: "Sa carte vitale.",
                    correction: {
                      correctAnswer: "Sa carte vitale.",
                      explanation: "« avec votre carte vitale » est précisé juste après l'heure d'arrivée.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "prendre-rendez-vous-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "prendre-rendez-vous-ecoute-activite",
            title: "Écouter l'appel au secrétariat",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "rdv-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez l'appel (« Prendre rendez-vous », Karim et le secrétariat, 1 min), puis répondez.",
                audioSrc: "/audio/b1/prendre-rendez-vous.mp3",
                transcript:
                  "Secrétariat — Cabinet Leroy, bonjour.\n" +
                  "Karim — Bonjour, je vous appelle pour prendre rendez-vous, j'ai une douleur depuis deux jours.\n" +
                  "Secrétariat — D'accord, est-ce que demain matin vous conviendrait ?\n" +
                  "Karim — Ah non, désolé, je travaille toute la matinée. L'après-midi, ce sera possible ?\n" +
                  "Secrétariat — Alors j'ai un créneau à 16h30.\n" +
                  "Karim — Parfait, ça me va très bien.\n" +
                  "Secrétariat — Très bien, c'est noté. Vous recevrez un SMS de confirmation dans quelques minutes.",
                questions: [
                  {
                    kind: "libre",
                    id: "rdv-f-q1",
                    prompt: "Pourquoi Karim appelle-t-il le cabinet ?",
                    expectedAnswer: "Il a une douleur depuis deux jours et veut un rendez-vous.",
                    correction: {
                      correctAnswer: "Il a une douleur depuis deux jours.",
                      explanation: "Il le dit dès le début de l'appel.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "rdv-f-q2",
                    prompt: "Pourquoi Karim refuse-t-il le rendez-vous du lendemain matin ?",
                    choices: [
                      { id: "a", text: "Il n'est pas encore levé le matin." },
                      { id: "b", text: "Il travaille toute la matinée." },
                      { id: "c", text: "Le cabinet est fermé le matin." },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Il travaille toute la matinée.", explanation: "C'est la raison qu'il donne directement." },
                  },
                  {
                    kind: "libre",
                    id: "rdv-f-q3",
                    prompt: "À quelle heure est finalement fixé le rendez-vous ?",
                    expectedAnswer: "16h30.",
                    correction: { correctAnswer: "16h30.", explanation: "Le secrétariat propose ce créneau et Karim l'accepte." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "rdv-f-q4",
                    prompt: "Vrai ou faux : Karim recevra une confirmation par courrier postal.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "« Vous recevrez un SMS de confirmation dans quelques minutes » : c'est par SMS, pas par courrier.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "prendre-rendez-vous-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "prendre-rendez-vous-entrainement-activite",
            title: "Futur proche, futur simple et expressions de temps",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "rdv-g1",
                type: "qcm",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Choisissez la forme correcte.",
                question: {
                  kind: "qcm",
                  id: "rdv-g1-q",
                  prompt: "« Le docteur vous ___ à 15h. » (recevoir, futur simple)",
                  choices: [
                    { id: "a", text: "recevra" },
                    { id: "b", text: "recevrai" },
                    { id: "c", text: "reçoit" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "recevra",
                    explanation: "3e personne du singulier du futur simple de « recevoir » : il/elle recevra.",
                  },
                },
              },
              {
                id: "rdv-g2",
                type: "texte_a_trous",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Complétez avec « dans », « avant » ou « à partir de ».",
                textWithBlanks:
                  "Le cabinet ouvre {{1}} 9h. Appelez {{2}} midi si possible. Je serai disponible {{3}} trois jours.",
                blanks: [
                  { id: "1", answer: "à partir de" },
                  { id: "2", answer: "avant" },
                  { id: "3", answer: "dans" },
                ],
                correction: {
                  correctAnswer: "à partir de — avant — dans",
                  explanation: "Point de départ → « à partir de » ; limite à ne pas dépasser → « avant » ; durée avant un moment futur → « dans ».",
                },
              },
              {
                id: "rdv-g3",
                type: "remise_en_ordre",
                skillId: "voc-rendez-vous",
                difficulty: "B1",
                instructions: "Remettez cet appel téléphonique dans l'ordre logique.",
                items: [
                  { id: "a", text: "« Bonjour, je vous appelle pour prendre rendez-vous. »" },
                  { id: "b", text: "« Est-ce que jeudi après-midi vous conviendrait ? »" },
                  { id: "c", text: "« Oui, parfait, ça me va. »" },
                  { id: "d", text: "« Très bien, c'est noté, à jeudi. »" },
                ],
                correctOrder: ["a", "b", "c", "d"],
                correction: {
                  correctAnswer: "a, b, c, d",
                  explanation: "On explique sa demande, on reçoit une proposition, on l'accepte, puis on confirme.",
                },
              },
              {
                id: "rdv-g4",
                type: "association",
                skillId: "voc-rendez-vous",
                difficulty: "B1",
                instructions: "Associez chaque action à sa définition.",
                pairs: [
                  { id: "1", left: "Reporter un rendez-vous", right: "le décaler à une autre date" },
                  { id: "2", left: "Annuler un rendez-vous", right: "dire qu'on ne viendra pas du tout" },
                  { id: "3", left: "Confirmer un rendez-vous", right: "dire qu'on sera bien présent" },
                ],
                correction: {
                  correctAnswer: "Reporter → décaler ; annuler → ne pas venir ; confirmer → présence certaine.",
                  explanation: "Trois actions différentes autour d'un même rendez-vous, à ne pas confondre.",
                  notionAssociee: "voc-rendez-vous",
                },
              },
              {
                id: "rdv-g5",
                type: "vrai_faux",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Vrai ou faux ?",
                statement: "« Je vais appeler le cabinet » est une phrase au futur simple.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "« aller » + infinitif est le futur proche, pas le futur simple (qui serait « j'appellerai »).",
                },
              },
            ],
          },
        ],
      },
      {
        id: "prendre-rendez-vous-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "prendre-rendez-vous-ecriture-activite",
            title: "Demander un rendez-vous par écrit",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "rdv-h",
                type: "production_ecrite",
                skillId: "pe-demander-rdv",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Écris un message pour demander un rendez-vous (médical ou administratif). Explique la raison de ta demande et propose un ou deux créneaux qui te conviennent.",
                minWords: 50,
                maxWords: 100,
                correctionCriteria: [
                  "La raison du rendez-vous est claire",
                  "Au moins un créneau proposé (jour et/ou heure)",
                  "Une formule de politesse en ouverture et en conclusion",
                  "Un futur proche ou futur simple utilisé correctement",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "prendre-rendez-vous-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: true,
        activities: [
          {
            id: "prendre-rendez-vous-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "rdv-i1",
                type: "qcm",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "rdv-i1-q",
                  prompt: "« Nous ___ le rendez-vous à 14h. » (confirmer, futur simple)",
                  choices: [
                    { id: "a", text: "confirmerons" },
                    { id: "b", text: "confirmons" },
                    { id: "c", text: "confirmerions" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "confirmerons", explanation: "1re personne du pluriel du futur simple : nous confirmerons." },
                },
              },
              {
                id: "rdv-i2",
                type: "reponse_courte",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Item 2. Mettez au futur proche.",
                question: "« Je prends rendez-vous demain. » → futur proche :",
                acceptedAnswers: ["je vais prendre rendez-vous demain", "je vais prendre rendez-vous"],
                correction: { correctAnswer: "Je vais prendre rendez-vous demain.", explanation: "Futur proche = aller (au présent) + infinitif." },
              },
              {
                id: "rdv-i3",
                type: "vrai_faux",
                skillId: "voc-rendez-vous",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "Un « créneau » est un horaire disponible pour un rendez-vous.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "C'est exactement sa définition dans ce contexte." },
              },
              {
                id: "rdv-i4",
                type: "reponse_courte",
                skillId: "voc-rendez-vous",
                difficulty: "B1",
                instructions: "Item 4.",
                question: "Donne le contraire de « confirmer un rendez-vous ».",
                acceptedAnswers: ["annuler un rendez-vous", "annuler"],
                correction: { correctAnswer: "Annuler un rendez-vous.", explanation: "« confirmer » = dire qu'on vient ; « annuler » = dire qu'on ne vient plus." },
              },
              {
                id: "rdv-i5",
                type: "texte_a_trous",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Item 5.",
                textWithBlanks: "Le secrétariat vous {{1}} (rappeler) demain matin, {{2}} 9h.",
                blanks: [
                  { id: "1", answer: "rappellera" },
                  { id: "2", answer: "avant" },
                ],
                correction: {
                  correctAnswer: "rappellera — avant",
                  explanation: "Futur simple de « rappeler » à la 3e personne ; « avant 9h » indique une limite.",
                },
              },
              {
                id: "rdv-i6",
                type: "reponse_courte",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Item 6. D'après l'appel de la partie « Compréhension orale ».",
                question: "Comment Karim recevra-t-il la confirmation de son rendez-vous ?",
                acceptedAnswers: ["par sms", "un sms"],
                correction: { correctAnswer: "Par SMS.", explanation: "« Vous recevrez un SMS de confirmation »." },
              },
              {
                id: "rdv-i7",
                type: "qcm",
                skillId: "voc-rendez-vous",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "rdv-i7-q",
                  prompt: "Quel mot désigne un problème qui empêche de venir à un rendez-vous ?",
                  choices: [
                    { id: "a", text: "un empêchement" },
                    { id: "b", text: "une confirmation" },
                    { id: "c", text: "un créneau" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "un empêchement", explanation: "C'est le terme exact utilisé dans le message du cabinet." },
                },
              },
              {
                id: "rdv-i8",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 8. D'après le message du cabinet.",
                question: "Combien de temps à l'avance faut-il prévenir en cas d'empêchement ?",
                acceptedAnswers: ["24h", "24 heures", "au moins 24h", "au moins 24 heures"],
                correction: { correctAnswer: "Au moins 24 heures avant.", explanation: "C'est précisé explicitement dans le SMS de confirmation." },
              },
              {
                id: "rdv-i9",
                type: "vrai_faux",
                skillId: "gr-futur-proche-simple",
                difficulty: "B1",
                instructions: "Item 9.",
                statement: "« à partir de 9h » signifie qu'il faut appeler avant 9h.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« à partir de 9h » indique au contraire le moment où ça devient possible." },
              },
              {
                id: "rdv-i10",
                type: "reponse_courte",
                skillId: "pe-demander-rdv",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, propose un créneau pour un rendez-vous, au futur proche ou au futur simple.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi : futur correctement formé, créneau (jour/heure) précisé.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-comprendre-un-courrier-simple",
    slug: "comprendre-un-courrier-simple",
    level: "B1",
    title: "Comprendre un courrier simple",
    description:
      "À la fin de ce module, tu pourras comprendre un courrier administratif courant et identifier ce qu'on te demande de faire.",
    objectives: [
      "Comprendre un courrier administratif",
      "Repérer une information précise dans un texte",
      "Réagir à un courrier par écrit",
    ],
    domain: "comprehension_ecrite",
    stageId: "b1-debut",
    estimatedMinutes: 27,
    situation:
      "Amina reçoit un courrier de la CAF au sujet de son aide au logement : sa situation doit être mise à jour avant une date limite.",
    vocabulary: [
      { term: "un courrier", category: "principal" },
      { term: "un organisme", category: "principal" },
      { term: "une aide au logement", category: "principal" },
      { term: "une situation (administrative)", category: "principal" },
      { term: "une pièce justificative", category: "principal" },
      { term: "une date limite", category: "principal" },
      { term: "un dossier", category: "principal" },
      { term: "un montant", category: "principal" },
      { term: "« Nous vous informons que... »", category: "expression" },
      { term: "« Merci de nous transmettre... »", category: "expression" },
      { term: "« Sans réponse de votre part... »", category: "expression" },
      { term: "« Veuillez agréer... »", category: "expression" },
      { term: "mettre à jour", category: "verbe" },
      { term: "transmettre", category: "verbe" },
      { term: "joindre (un document)", category: "verbe" },
      { term: "suspendre (un versement)", category: "verbe" },
      { term: "d'ici", category: "connecteur" },
      { term: "faute de", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Les formules figées de la correspondance administrative",
        explanation:
          "Certaines formules reviennent presque à l'identique d'un courrier à l'autre : « Nous vous informons que... » (annonce), « Merci de nous transmettre... » (demande polie), « Sans réponse de votre part avant le [date]... » (conséquence en cas d'inaction). Les reconnaître aide à comprendre vite l'essentiel d'un courrier.",
      },
      {
        title: "Le futur proche pour annoncer une action à faire",
        explanation:
          "Dans un courrier, le futur proche annonce souvent ce qui va se passer si l'on ne réagit pas : Votre versement va être suspendu. Votre dossier va être clôturé. C'est un signal à prendre au sérieux : il indique une conséquence proche et concrète.",
      },
    ],
    examLinks: ["DELF B1 — compréhension des écrits (courrier administratif)"],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "comprendre-un-courrier-simple-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "comprendre-un-courrier-simple-comprendre-activite",
            title: "Lire le courrier de la CAF",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "courrier-e",
                type: "comprehension_ecrite",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Lisez le courrier, puis répondez aux questions.",
                text:
                  "Madame, Nous vous informons que votre dossier d'aide au logement doit être mis à jour : " +
                  "votre dernière déclaration de ressources date de plus d'un an. Merci de nous transmettre, " +
                  "d'ici le 30 septembre, votre dernier avis d'imposition ainsi qu'un justificatif de " +
                  "domicile de moins de trois mois. Sans réponse de votre part avant cette date, le " +
                  "versement de votre aide sera suspendu jusqu'à régularisation de votre dossier. Pour toute " +
                  "question, un conseiller peut vous recevoir sur rendez-vous. Veuillez agréer, Madame, nos " +
                  "salutations distinguées.",
                questions: [
                  {
                    kind: "libre",
                    id: "courrier-e-q1",
                    prompt: "Pourquoi le dossier d'Amina doit-il être mis à jour ?",
                    expectedAnswer: "Sa dernière déclaration de ressources date de plus d'un an.",
                    correction: {
                      correctAnswer: "Sa déclaration de ressources date de plus d'un an.",
                      explanation: "C'est la raison donnée dès la première phrase du courrier.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "courrier-e-q2",
                    prompt: "Quels documents Amina doit-elle envoyer ?",
                    expectedAnswer: "Son dernier avis d'imposition et un justificatif de domicile de moins de trois mois.",
                    correction: {
                      correctAnswer: "L'avis d'imposition et un justificatif de domicile récent.",
                      explanation: "Les deux documents sont listés juste après « merci de nous transmettre ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "courrier-e-q3",
                    prompt: "Que se passe-t-il si Amina ne répond pas avant le 30 septembre ?",
                    choices: [
                      { id: "a", text: "Son dossier est automatiquement fermé." },
                      { id: "b", text: "Le versement de son aide est suspendu." },
                      { id: "c", text: "Rien de particulier ne se passe." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Le versement de son aide sera suspendu.",
                      explanation: "« sans réponse de votre part avant cette date, le versement de votre aide sera suspendu ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-un-courrier-simple-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "comprendre-un-courrier-simple-ecoute-activite",
            title: "Écouter Amina au téléphone avec la CAF",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "courrier-f",
                type: "comprehension_orale",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Écoutez l'appel (« Mettre à jour son dossier », Amina et un conseiller, 1 min 10), puis répondez.",
                audioSrc: "/audio/b1/comprendre-un-courrier-simple.mp3",
                transcript:
                  "Conseiller — Bonjour, CAF, j'écoute.\n" +
                  "Amina — Bonjour, j'ai reçu un courrier qui me demande de mettre à jour mon dossier, mais " +
                  "je ne suis pas sûre de tout comprendre.\n" +
                  "Conseiller — Pas de souci. Il faut juste nous envoyer votre avis d'imposition et un " +
                  "justificatif de domicile récent.\n" +
                  "Amina — D'accord, et je peux les envoyer par internet ou seulement par courrier ?\n" +
                  "Conseiller — Vous pouvez tout faire depuis votre espace en ligne, c'est plus rapide.\n" +
                  "Amina — Très bien, et j'ai jusqu'à quand exactement ?\n" +
                  "Conseiller — Jusqu'au 30 septembre. Après cette date, le versement sera mis en pause.",
                questions: [
                  {
                    kind: "libre",
                    id: "courrier-f-q1",
                    prompt: "Pourquoi Amina appelle-t-elle la CAF ?",
                    expectedAnswer: "Elle a reçu un courrier et ne comprend pas tout ce qu'on lui demande.",
                    correction: { correctAnswer: "Elle n'est pas sûre de comprendre le courrier reçu.", explanation: "Elle le dit dès le début de l'appel." },
                  },
                  {
                    kind: "qcm",
                    id: "courrier-f-q2",
                    prompt: "Comment Amina peut-elle envoyer ses documents le plus rapidement ?",
                    choices: [
                      { id: "a", text: "Par courrier postal uniquement" },
                      { id: "b", text: "Depuis son espace en ligne" },
                      { id: "c", text: "En se déplaçant à l'agence" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Depuis son espace en ligne.", explanation: "Le conseiller lui dit que c'est possible et « plus rapide »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "courrier-f-q3",
                    prompt: "Vrai ou faux : le conseiller confirme la même date limite que dans le courrier.",
                    correctAnswer: true,
                    correction: { correctAnswer: "Vrai.", explanation: "Il confirme « jusqu'au 30 septembre », comme dans le courrier." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-un-courrier-simple-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "comprendre-un-courrier-simple-entrainement-activite",
            title: "Vocabulaire et formules du courrier",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "courrier-g1",
                type: "qcm",
                skillId: "voc-courrier",
                difficulty: "B1",
                instructions: "Choisissez le mot qui convient.",
                question: {
                  kind: "qcm",
                  id: "courrier-g1-q",
                  prompt: "Un document qui prouve quelque chose (identité, domicile...) s'appelle :",
                  choices: [
                    { id: "a", text: "un montant" },
                    { id: "b", text: "une pièce justificative" },
                    { id: "c", text: "un organisme" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "une pièce justificative", explanation: "C'est le terme administratif exact pour ce type de document." },
                },
              },
              {
                id: "courrier-g2",
                type: "texte_a_trous",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Complétez avec le futur proche.",
                textWithBlanks: "Sans réponse avant le 30 septembre, votre versement {{1}} (être) suspendu.",
                blanks: [{ id: "1", answer: "va être" }],
                correction: {
                  correctAnswer: "va être",
                  explanation: "Futur proche : aller (au présent) + infinitif « être ».",
                },
              },
              {
                id: "courrier-g3",
                type: "association",
                skillId: "voc-courrier",
                difficulty: "B1",
                instructions: "Associez chaque formule à sa fonction.",
                pairs: [
                  { id: "1", left: "« Nous vous informons que... »", right: "annoncer une information" },
                  { id: "2", left: "« Merci de nous transmettre... »", right: "demander poliment un document" },
                  { id: "3", left: "« Veuillez agréer... »", right: "clore poliment le courrier" },
                ],
                correction: {
                  correctAnswer: "informer → annonce ; transmettre → demande ; agréer → formule de politesse finale.",
                  explanation: "Ces trois formules reviennent très souvent dans les courriers administratifs français.",
                  notionAssociee: "voc-courrier",
                },
              },
              {
                id: "courrier-g4",
                type: "remise_en_ordre",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Remettez ces étapes de la démarche dans l'ordre logique.",
                items: [
                  { id: "a", text: "Recevoir le courrier de la CAF." },
                  { id: "b", text: "Rassembler les documents demandés." },
                  { id: "c", text: "Les envoyer avant la date limite." },
                  { id: "d", text: "Recevoir la confirmation de mise à jour." },
                ],
                correctOrder: ["a", "b", "c", "d"],
                correction: {
                  correctAnswer: "a, b, c, d",
                  explanation: "On reçoit le courrier, on prépare les documents, on les envoie, puis le dossier est mis à jour.",
                },
              },
              {
                id: "courrier-g5",
                type: "vrai_faux",
                skillId: "voc-courrier",
                difficulty: "B1",
                instructions: "Vrai ou faux ?",
                statement: "« d'ici le 30 septembre » signifie « après le 30 septembre ».",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« d'ici » indique une limite à ne pas dépasser : avant ou au plus tard à cette date." },
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-un-courrier-simple-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "comprendre-un-courrier-simple-ecriture-activite",
            title: "Répondre au courrier",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "courrier-h",
                type: "production_ecrite",
                skillId: "pe-repondre-courrier",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Réponds au courrier de la CAF par un message court : confirme que tu as bien reçu le courrier, précise quand tu vas envoyer les documents demandés, et pose une question si besoin.",
                minWords: 50,
                maxWords: 100,
                correctionCriteria: [
                  "Confirmation claire de la réception du courrier",
                  "Mention des documents à envoyer et d'un délai",
                  "Une formule de politesse adaptée",
                  "Un futur proche ou futur simple utilisé correctement",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "comprendre-un-courrier-simple-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: true,
        activities: [
          {
            id: "comprendre-un-courrier-simple-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "courrier-i1",
                type: "qcm",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "courrier-i1-q",
                  prompt: "« Nous vous informons que... » sert surtout à :",
                  choices: [
                    { id: "a", text: "poser une question" },
                    { id: "b", text: "annoncer une information" },
                    { id: "c", text: "s'excuser" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "annoncer une information", explanation: "C'est une formule d'ouverture pour introduire une information importante." },
                },
              },
              {
                id: "courrier-i2",
                type: "reponse_courte",
                skillId: "voc-courrier",
                difficulty: "B1",
                instructions: "Item 2.",
                question: "Donne un synonyme de « pièce justificative ».",
                acceptedAnswers: ["document", "un document", "justificatif", "un justificatif"],
                correction: { correctAnswer: "Un document / un justificatif.", explanation: "Ce sont des synonymes courants dans le contexte administratif." },
              },
              {
                id: "courrier-i3",
                type: "vrai_faux",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "Un avis d'imposition est un document lié aux impôts.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "C'est un document officiel qui indique les revenus déclarés et les impôts correspondants." },
              },
              {
                id: "courrier-i4",
                type: "reponse_courte",
                skillId: "voc-courrier",
                difficulty: "B1",
                instructions: "Item 4.",
                question: "Comment appelle-t-on la date à ne pas dépasser pour répondre ?",
                acceptedAnswers: ["une date limite", "date limite", "délai"],
                correction: { correctAnswer: "Une date limite (un délai).", explanation: "C'est le terme utilisé dans le courrier et le dialogue." },
              },
              {
                id: "courrier-i5",
                type: "texte_a_trous",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Item 5.",
                textWithBlanks: "Faute de réponse, le dossier {{1}} (être) clôturé et l'aide {{2}} (être) suspendue.",
                blanks: [
                  { id: "1", answer: "va être" },
                  { id: "2", answer: "va être" },
                ],
                correction: {
                  correctAnswer: "va être — va être",
                  explanation: "Le futur proche annonce ici une conséquence proche en cas d'inaction.",
                },
              },
              {
                id: "courrier-i6",
                type: "reponse_courte",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Item 6. D'après le courrier de la CAF.",
                question: "Pourquoi le dossier d'Amina doit-il être mis à jour ?",
                acceptedAnswers: ["sa déclaration de ressources date de plus d'un an", "declaration de ressources trop ancienne"],
                correction: { correctAnswer: "Sa déclaration de ressources date de plus d'un an.", explanation: "C'est la raison indiquée en tout début de courrier." },
              },
              {
                id: "courrier-i7",
                type: "qcm",
                skillId: "voc-courrier",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "courrier-i7-q",
                  prompt: "« Veuillez agréer, Madame, nos salutations distinguées » est :",
                  choices: [
                    { id: "a", text: "une formule de politesse finale" },
                    { id: "b", text: "une demande de document" },
                    { id: "c", text: "une question" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "une formule de politesse finale", explanation: "C'est la formule classique pour terminer un courrier administratif." },
                },
              },
              {
                id: "courrier-i8",
                type: "reponse_courte",
                skillId: "co-dialogues-simples",
                difficulty: "B1",
                instructions: "Item 8. D'après l'appel de la partie « Compréhension orale ».",
                question: "Quel est le moyen le plus rapide d'envoyer les documents, selon le conseiller ?",
                acceptedAnswers: ["l'espace en ligne", "en ligne", "internet"],
                correction: { correctAnswer: "Depuis l'espace en ligne.", explanation: "Le conseiller précise que c'est « plus rapide »." },
              },
              {
                id: "courrier-i9",
                type: "vrai_faux",
                skillId: "ce-courrier-administratif",
                difficulty: "B1",
                instructions: "Item 9.",
                statement: "Amina doit envoyer ses documents avant le 30 septembre.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "C'est la date limite indiquée à la fois dans le courrier et par le conseiller." },
              },
              {
                id: "courrier-i10",
                type: "reponse_courte",
                skillId: "pe-repondre-courrier",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase, confirme la réception d'un courrier administratif.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi : formule claire, polie, qui confirme bien la réception.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-utiliser-les-transports",
    slug: "utiliser-les-transports",
    level: "B1",
    title: "Utiliser les transports et comprendre une annonce",
    description:
      "À la fin de ce module, tu pourras comprendre une annonce dans les transports et expliquer un trajet ou un incident.",
    objectives: [
      "Comprendre une annonce publique",
      "Décrire un trajet",
      "Signaler un incident de transport",
    ],
    domain: "comprehension_orale",
    stageId: "b1-consolidation",
    estimatedMinutes: 27,
    situation:
      "Youssef prend le train pour se rendre à un entretien. Une annonce informe les voyageurs d'un changement de voie.",
    vocabulary: [
      { term: "un trajet", category: "principal" },
      { term: "une voie", category: "principal" },
      { term: "un quai", category: "principal" },
      { term: "une correspondance", category: "principal" },
      { term: "un retard", category: "principal" },
      { term: "une perturbation", category: "principal" },
      { term: "un billet", category: "principal" },
      { term: "un composteur", category: "principal" },
      { term: "« exceptionnellement »", category: "expression" },
      { term: "« en raison de... »", category: "expression" },
      { term: "« nous vous prions de nous excuser »", category: "expression" },
      { term: "« merci de vous présenter... »", category: "expression" },
      { term: "prendre (un train, un bus)", category: "verbe" },
      { term: "descendre (à un arrêt)", category: "verbe" },
      { term: "changer (de ligne, de quai)", category: "verbe" },
      { term: "rater (un train)", category: "verbe" },
      { term: "jusqu'à", category: "connecteur" },
      { term: "en raison de", category: "connecteur" },
    ],
    languagePoints: [
      {
        title: "Les prépositions de lieu et de déplacement",
        explanation:
          "à + lieu précis (Le train arrive à la gare de Lyon), vers + direction approximative (Il se dirige vers la sortie), jusqu'à + destination finale (Ce bus va jusqu'à l'aéroport). Elles permettent de décrire un trajet de façon précise.",
      },
      {
        title: "Décrire un incident au passé composé",
        explanation:
          "Pour raconter un incident de transport déjà passé, on utilise le passé composé : Le train a eu vingt minutes de retard. J'ai raté ma correspondance. On précise souvent la cause avec « à cause de » ou « en raison de » : en raison d'un incident technique.",
      },
    ],
    examLinks: ["DELF B1 — compréhension de l'oral (annonces publiques)"],
    miniEvaluationThreshold: 7,
    lessons: [
      {
        id: "utiliser-les-transports-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "utiliser-les-transports-comprendre-activite",
            title: "Lire le panneau d'information voyageurs",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "transport-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le panneau d'information, puis répondez aux questions.",
                text:
                  "Ligne B — En raison de travaux sur les voies, les trains circulent avec un retard moyen " +
                  "de 15 minutes ce matin. Une correspondance est mise en place en gare de Nord pour les " +
                  "voyageurs à destination du centre-ville. Nous vous prions de nous excuser pour la gêne " +
                  "occasionnée.",
                questions: [
                  {
                    kind: "libre",
                    id: "transport-e-q1",
                    prompt: "Pourquoi les trains ont-ils du retard ce matin ?",
                    expectedAnswer: "Il y a des travaux sur les voies.",
                    correction: { correctAnswer: "À cause de travaux sur les voies.", explanation: "C'est la première raison donnée sur le panneau." },
                  },
                  {
                    kind: "libre",
                    id: "transport-e-q2",
                    prompt: "Que doivent faire les voyageurs qui vont au centre-ville ?",
                    expectedAnswer: "Prendre une correspondance en gare de Nord.",
                    correction: { correctAnswer: "Prendre la correspondance en gare de Nord.", explanation: "« Une correspondance est mise en place en gare de Nord pour les voyageurs à destination du centre-ville »." },
                  },
                  {
                    kind: "qcm",
                    id: "transport-e-q3",
                    prompt: "Quel est le retard moyen annoncé ?",
                    choices: [
                      { id: "a", text: "5 minutes" },
                      { id: "b", text: "15 minutes" },
                      { id: "c", text: "30 minutes" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "15 minutes.", explanation: "Le panneau indique « un retard moyen de 15 minutes »." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "utiliser-les-transports-ecoute",
        type: "ecoute",
        title: "Compréhension orale",
        optional: false,
        activities: [
          {
            id: "utiliser-les-transports-ecoute-activite",
            title: "Écouter l'annonce en gare",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "transport-f",
                type: "comprehension_orale",
                skillId: "co-annonces-publiques",
                difficulty: "B1",
                instructions: "Écoutez l'annonce (« Changement de voie », gare, 50 secondes), puis répondez.",
                audioSrc: "/audio/b1/utiliser-les-transports.mp3",
                transcript:
                  "« Mesdames, messieurs, votre attention s'il vous plaît. En raison d'un incident technique, " +
                  "le train à destination de Lyon partira exceptionnellement voie 4 au lieu de la voie 2. " +
                  "Ce train est annoncé avec dix minutes de retard. Nous vous prions de nous excuser pour la " +
                  "gêne occasionnée et vous remercions de votre compréhension. »",
                questions: [
                  {
                    kind: "libre",
                    id: "transport-f-q1",
                    prompt: "Quel changement est annoncé pour le train à destination de Lyon ?",
                    expectedAnswer: "Il part voie 4 au lieu de la voie 2.",
                    correction: { correctAnswer: "Il partira voie 4 au lieu de la voie 2.", explanation: "C'est l'information centrale de l'annonce." },
                  },
                  {
                    kind: "qcm",
                    id: "transport-f-q2",
                    prompt: "Pourquoi ce changement a-t-il lieu ?",
                    choices: [
                      { id: "a", text: "Des travaux sur la voie 2" },
                      { id: "b", text: "Un incident technique" },
                      { id: "c", text: "Une grève des conducteurs" },
                    ],
                    correctChoiceId: "b",
                    correction: { correctAnswer: "Un incident technique.", explanation: "« En raison d'un incident technique »." },
                  },
                  {
                    kind: "libre",
                    id: "transport-f-q3",
                    prompt: "Quel est le retard annoncé pour ce train ?",
                    expectedAnswer: "Dix minutes.",
                    correction: { correctAnswer: "Dix minutes.", explanation: "« annoncé avec dix minutes de retard »." },
                  },
                  {
                    kind: "vrai_faux",
                    id: "transport-f-q4",
                    prompt: "Vrai ou faux : le train est annulé.",
                    correctAnswer: false,
                    correction: { correctAnswer: "Faux.", explanation: "Le train n'est pas annulé, seulement retardé et déplacé sur une autre voie." },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "utiliser-les-transports-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "utiliser-les-transports-entrainement-activite",
            title: "Vocabulaire et récit d'un trajet",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "transport-g1",
                type: "qcm",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Choisissez le mot qui convient.",
                question: {
                  kind: "qcm",
                  id: "transport-g1-q",
                  prompt: "Le changement d'un train à un autre pour continuer son trajet s'appelle :",
                  choices: [
                    { id: "a", text: "une correspondance" },
                    { id: "b", text: "un composteur" },
                    { id: "c", text: "un quai" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "une correspondance", explanation: "C'est le terme exact pour un changement de train ou de ligne." },
                },
              },
              {
                id: "transport-g2",
                type: "texte_a_trous",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Complétez au passé composé.",
                textWithBlanks: "Hier, mon train {{1}} (avoir) vingt minutes de retard et j'{{2}} (rater) ma correspondance.",
                blanks: [
                  { id: "1", answer: "a eu" },
                  { id: "2", answer: "ai raté" },
                ],
                correction: {
                  correctAnswer: "a eu — ai raté",
                  explanation: "Deux actions ponctuelles et terminées : le passé composé convient pour raconter cet incident.",
                },
              },
              {
                id: "transport-g3",
                type: "association",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Associez chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "Un quai", right: "où on attend le train" },
                  { id: "2", left: "Une voie", right: "le chemin sur lequel roule le train" },
                  { id: "3", left: "Un billet", right: "le document qui donne le droit de voyager" },
                ],
                correction: {
                  correctAnswer: "Quai → on attend ; voie → le train roule dessus ; billet → droit de voyager.",
                  explanation: "Trois mots proches mais bien distincts dans le vocabulaire des transports.",
                  notionAssociee: "voc-transports",
                },
              },
              {
                id: "transport-g4",
                type: "remise_en_ordre",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Remettez ce petit récit d'incident dans l'ordre logique.",
                items: [
                  { id: "a", text: "J'ai entendu une annonce de changement de voie." },
                  { id: "b", text: "Je suis arrivé sur le quai." },
                  { id: "c", text: "J'ai couru jusqu'à la voie 4." },
                  { id: "d", text: "Je suis monté dans le train juste à temps." },
                ],
                correctOrder: ["b", "a", "c", "d"],
                correction: {
                  correctAnswer: "b, a, c, d",
                  explanation: "Arrivée sur le quai, puis annonce, puis course jusqu'à la bonne voie, puis montée dans le train.",
                },
              },
              {
                id: "transport-g5",
                type: "vrai_faux",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Vrai ou faux ?",
                statement: "« Rater un train » signifie arriver à temps pour le prendre.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "« Rater un train » signifie au contraire ne pas réussir à le prendre." },
              },
            ],
          },
        ],
      },
      {
        id: "utiliser-les-transports-ecriture",
        type: "ecriture",
        title: "Production écrite",
        optional: false,
        activities: [
          {
            id: "utiliser-les-transports-ecriture-activite",
            title: "Raconter un incident de trajet",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "transport-h",
                type: "production_ecrite",
                skillId: "pe-signaler-incident",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Dans un message à un ami ou un collègue, raconte un incident de trajet (retard, changement de voie, correspondance ratée...) que tu as vécu ou imaginé. Explique ce qui s'est passé et comment tu as réagi.",
                minWords: 60,
                maxWords: 120,
                correctionCriteria: [
                  "L'incident est clairement décrit (quoi, quand)",
                  "Au moins un verbe correctement conjugué au passé composé",
                  "Un vocabulaire des transports bien utilisé",
                  "Une conclusion (comment ça s'est terminé)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "utiliser-les-transports-evaluation",
        type: "evaluation",
        title: "Mini-évaluation",
        optional: true,
        activities: [
          {
            id: "utiliser-les-transports-evaluation-activite",
            title: "Bilan du module (10 items, 7/10 pour valider)",
            skillDomain: "comprehension_orale",
            exercises: [
              {
                id: "transport-i1",
                type: "qcm",
                skillId: "co-annonces-publiques",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "transport-i1-q",
                  prompt: "« En raison de... » sert à introduire :",
                  choices: [
                    { id: "a", text: "une cause" },
                    { id: "b", text: "une conséquence" },
                    { id: "c", text: "une opposition" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "une cause", explanation: "« en raison de » = « à cause de », introduit toujours une cause." },
                },
              },
              {
                id: "transport-i2",
                type: "reponse_courte",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Item 2.",
                question: "Donne le contraire de « prendre un train » (ne pas réussir à le prendre).",
                acceptedAnswers: ["rater un train", "rater le train", "rater"],
                correction: { correctAnswer: "Rater un train.", explanation: "C'est l'expression exacte pour ne pas réussir à prendre son train." },
              },
              {
                id: "transport-i3",
                type: "vrai_faux",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Item 3.",
                statement: "Une « perturbation » dans les transports est toujours annoncée à l'avance.",
                correctAnswer: false,
                correction: { correctAnswer: "Faux.", explanation: "Une perturbation peut être annoncée en direct, comme l'incident technique du dialogue." },
              },
              {
                id: "transport-i4",
                type: "reponse_courte",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Item 4.",
                question: "Comment appelle-t-on le lieu où on attend le train sur le quai ?",
                acceptedAnswers: ["le quai", "un quai"],
                correction: { correctAnswer: "Le quai.", explanation: "C'est le terme précis pour cet endroit de la gare." },
              },
              {
                id: "transport-i5",
                type: "texte_a_trous",
                skillId: "gr-present-habitudes",
                difficulty: "B1",
                instructions: "Item 5.",
                textWithBlanks: "En raison d'un incident, le bus {{1}} (partir) exceptionnellement {{2}} l'arrêt voisin.",
                blanks: [
                  { id: "1", answer: "partira" },
                  { id: "2", answer: "de" },
                ],
                correction: {
                  correctAnswer: "partira — de",
                  explanation: "Futur simple pour une annonce officielle ; « partir de » indique le point de départ.",
                },
              },
              {
                id: "transport-i6",
                type: "reponse_courte",
                skillId: "co-annonces-publiques",
                difficulty: "B1",
                instructions: "Item 6. D'après l'annonce de la partie « Compréhension orale ».",
                question: "De quelle voie le train part-il finalement ?",
                acceptedAnswers: ["voie 4", "la voie 4", "4"],
                correction: { correctAnswer: "Voie 4.", explanation: "« partira exceptionnellement voie 4 au lieu de la voie 2 »." },
              },
              {
                id: "transport-i7",
                type: "qcm",
                skillId: "voc-transports",
                difficulty: "B1",
                instructions: "Item 7.",
                question: {
                  kind: "qcm",
                  id: "transport-i7-q",
                  prompt: "« jusqu'à » exprime :",
                  choices: [
                    { id: "a", text: "une destination finale" },
                    { id: "b", text: "une cause" },
                    { id: "c", text: "une opinion" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "une destination finale", explanation: "« Ce bus va jusqu'à l'aéroport » : point d'arrivée du trajet." },
                },
              },
              {
                id: "transport-i8",
                type: "reponse_courte",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 8. D'après le panneau d'information voyageurs.",
                question: "Où est mise en place la correspondance pour le centre-ville ?",
                acceptedAnswers: ["en gare de nord", "gare de nord", "gare du nord"],
                correction: { correctAnswer: "En gare de Nord.", explanation: "« Une correspondance est mise en place en gare de Nord »." },
              },
              {
                id: "transport-i9",
                type: "vrai_faux",
                skillId: "co-annonces-publiques",
                difficulty: "B1",
                instructions: "Item 9.",
                statement: "Dans l'annonce, le retard du train pour Lyon est de dix minutes.",
                correctAnswer: true,
                correction: { correctAnswer: "Vrai.", explanation: "« annoncé avec dix minutes de retard »." },
              },
              {
                id: "transport-i10",
                type: "reponse_courte",
                skillId: "pe-signaler-incident",
                difficulty: "B1",
                instructions: "Item 10 — production courte, réponse libre.",
                question: "En une phrase au passé composé, raconte un incident de trajet (réel ou imaginé).",
                acceptedAnswers: [],
                correction: {
                  correctAnswer: "Réponse libre.",
                  explanation: "Évalue-toi : passé composé bien formé, incident clairement décrit.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-se-presenter",
    slug: "se-presenter",
    level: "B1",
    title: "Se présenter",
    description: "À la fin de ce module, tu pourras te présenter clairement et poser des questions pour connaître quelqu'un.",
    objectives: ["Donner des informations sur soi", "Parler de sa famille et de son parcours", "Poser des questions simples à quelqu'un"],
    domain: "grammaire",
    stageId: "b1-debut",
    estimatedMinutes: 20,
    situation:
      "Léa vient d'emménager dans un nouvel appartement à Lyon. Dans l'escalier, elle croise son voisin, Thomas, et ils font connaissance.",
    vocabulary: [
      { term: "se présenter", category: "principal" },
      { term: "s'appeler", category: "verbe" },
      { term: "habiter", category: "verbe" },
      { term: "déménager", category: "verbe" },
      { term: "emménager", category: "verbe" },
      { term: "venir de", category: "verbe" },
      { term: "un parcours", category: "principal" },
      { term: "une origine", category: "principal" },
      { term: "un voisin / une voisine", category: "principal" },
      { term: "faire connaissance", category: "expression" },
      { term: "une colocation", category: "principal" },
      { term: "« n'hésitez pas à... »", category: "expression" },
    ],
    languagePoints: [
      {
        title: "Poser une question avec « est-ce que »",
        explanation:
          "On place « est-ce que » devant une phrase affirmative pour poser une question : Tu habites ici. → Est-ce que tu habites ici ? C'est la façon la plus simple et la plus courante à l'oral comme à l'écrit.",
      },
      {
        title: "Les verbes en -er du quotidien",
        explanation:
          "habiter, déménager, emménager, se présenter... se conjuguent comme « parler » au présent : j'habite, tu habites, il/elle habite, nous habitons, vous habitez, ils/elles habitent.",
      },
    ],
    examLinks: ["DELF B1 — production orale (entretien dirigé)"],
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
            title: "Lire un message de présentation",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "sp-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez le message que Léa poste dans le groupe WhatsApp de l'immeuble, puis répondez.",
                text:
                  "Bonjour à tous ! Je m'appelle Léa, je viens d'emménager au 3ème étage, appartement 8. Je suis " +
                  "originaire de Bordeaux, mais j'habite à Lyon depuis cette semaine pour mon nouveau travail. Je " +
                  "suis assez sociable et j'aime bien faire connaissance avec mes voisins, donc n'hésitez pas à " +
                  "sonner si besoin ! Au fait, est-ce que quelqu'un connaît une bonne boulangerie dans le " +
                  "quartier ? Merci et à bientôt, Léa",
                questions: [
                  {
                    kind: "qcm",
                    id: "sp-e-q1",
                    prompt: "Où habite Léa maintenant ?",
                    choices: [
                      { id: "a", text: "Bordeaux" },
                      { id: "b", text: "Lyon" },
                      { id: "c", text: "Paris" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Lyon",
                      explanation: "Léa précise qu'elle habite à Lyon depuis cette semaine.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "sp-e-q2",
                    prompt: "Vrai ou faux : Léa habite à Lyon depuis plusieurs années.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Elle vient d'emménager : elle habite à Lyon depuis cette semaine seulement.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "sp-e-q3",
                    prompt: "Pourquoi Léa a-t-elle déménagé à Lyon ?",
                    expectedAnswer: "Pour son nouveau travail.",
                    correction: {
                      correctAnswer: "Pour son nouveau travail.",
                      explanation: "Elle le précise dans la deuxième phrase de son message.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "sp-e-q4",
                    prompt: "Qu'est-ce que Léa demande à la fin de son message ?",
                    choices: [
                      { id: "a", text: "Une bonne boulangerie dans le quartier." },
                      { id: "b", text: "L'adresse d'un de ses voisins." },
                      { id: "c", text: "De l'aide pour son déménagement." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "Une bonne boulangerie dans le quartier.",
                      explanation: "Elle pose cette question juste avant de saluer.",
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
            title: "Se présenter et poser des questions",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "sp-g1",
                type: "qcm",
                skillId: "gr-questions",
                difficulty: "B1",
                instructions: "Transforme cette phrase en question avec « est-ce que ».",
                question: {
                  kind: "qcm",
                  id: "sp-g1-q",
                  prompt: "« Tu habites ici depuis longtemps. » devient :",
                  choices: [
                    { id: "a", text: "Est-ce que tu habites ici depuis longtemps ?" },
                    { id: "b", text: "Habites-tu ici depuis longtemps est-ce que ?" },
                    { id: "c", text: "Tu es-ce que habites ici depuis longtemps ?" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Est-ce que tu habites ici depuis longtemps ?",
                    explanation: "« Est-ce que » se place tout au début de la phrase affirmative.",
                  },
                },
              },
              {
                id: "sp-g2",
                type: "texte_a_trous",
                skillId: "gr-questions",
                difficulty: "B1",
                instructions: "Complète les questions avec « Est-ce que » ou « Qu'est-ce que ».",
                textWithBlanks:
                  "{{1}} tu habites ici ? — Oui, depuis une semaine. {{2}} tu fais comme travail ? — Je suis " +
                  "infirmier. Et {{3}} tu viens d'emménager avec quelqu'un ?",
                blanks: [
                  { id: "1", answer: "Est-ce que" },
                  { id: "2", answer: "Qu'est-ce que" },
                  { id: "3", answer: "est-ce que" },
                ],
                correction: {
                  correctAnswer: "Est-ce que — Qu'est-ce que — est-ce que",
                  explanation:
                    "« Est-ce que » introduit une question fermée (oui/non) ; « Qu'est-ce que » introduit une question sur une chose.",
                },
              },
              {
                id: "sp-g3",
                type: "association",
                skillId: "voc-identite",
                difficulty: "B1",
                instructions: "Associe chaque question à la réponse logique.",
                pairs: [
                  { id: "1", left: "Comment tu t'appelles ?", right: "Je m'appelle Thomas." },
                  { id: "2", left: "D'où viens-tu ?", right: "Je viens de Marseille." },
                  { id: "3", left: "Depuis quand tu habites ici ?", right: "Depuis trois mois." },
                ],
                correction: {
                  correctAnswer: "1 → Thomas ; 2 → Marseille ; 3 → trois mois.",
                  explanation: "Chaque question porte sur une information différente : le nom, l'origine, la durée.",
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
                id: "sp-h",
                type: "production_ecrite",
                skillId: "pe-se-presenter",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Vous venez d'emménager dans un nouvel immeuble. Écrivez un message de présentation pour le " +
                  "groupe de vos voisins (nom, origine, ce que vous aimez faire) en 4 à 6 phrases.",
                minWords: 35,
                maxWords: 70,
                correctionCriteria: [
                  "Informations essentielles présentes : nom, origine (/2)",
                  "Au moins une habitude ou un goût mentionné (/2)",
                  "Phrases correctement construites (/2)",
                  "Ton amical adapté à un message de voisinage (/1)",
                ],
                aiCorrectionAvailable: false,
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
                id: "sp-i1",
                type: "qcm",
                skillId: "gr-questions",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "sp-i1-q",
                  prompt: "Quelle question est correcte ?",
                  choices: [
                    { id: "a", text: "Est-ce que vous habitez à Lyon ?" },
                    { id: "b", text: "Vous est-ce que habitez à Lyon ?" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "Est-ce que vous habitez à Lyon ?",
                    explanation: "« Est-ce que » se place en tête de phrase.",
                  },
                },
              },
              {
                id: "sp-i2",
                type: "reponse_courte",
                skillId: "voc-identite",
                difficulty: "B1",
                instructions: "Item 2.",
                question: "Quel verbe utiliser pour dire qu'on arrive dans un nouveau logement : « ___ » ?",
                acceptedAnswers: ["emménager", "emmenager"],
                correction: {
                  correctAnswer: "emménager",
                  explanation: "« Emménager » = arriver dans un nouveau logement (à ne pas confondre avec « déménager »).",
                },
              },
              {
                id: "sp-i3",
                type: "vrai_faux",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 3. D'après le message de Léa.",
                statement: "Léa demande une adresse de boulangerie dans son message.",
                correctAnswer: true,
                correction: {
                  correctAnswer: "Vrai.",
                  explanation: "Elle pose cette question à la fin de son message.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-habitudes-et-gouts",
    slug: "habitudes-et-gouts",
    level: "B1",
    title: "Parler de ses habitudes et de ses goûts",
    description: "À la fin de ce module, tu pourras parler de ta routine, de tes loisirs et de ce que tu aimes ou non.",
    objectives: ["Décrire une habitude", "Exprimer une préférence", "Comparer deux goûts"],
    domain: "vocabulaire",
    stageId: "b1-debut",
    estimatedMinutes: 20,
    situation:
      "Léa et Thomas, ses nouveaux voisins, discutent de leurs habitudes du week-end autour d'un café.",
    vocabulary: [
      { term: "une habitude", category: "principal" },
      { term: "d'habitude", category: "expression" },
      { term: "souvent", category: "principal" },
      { term: "rarement", category: "principal" },
      { term: "jamais", category: "principal" },
      { term: "toujours", category: "principal" },
      { term: "un loisir", category: "principal" },
      { term: "un point commun", category: "principal" },
      { term: "préférer", category: "verbe" },
      { term: "aimer mieux", category: "verbe" },
      { term: "se détendre", category: "verbe" },
      { term: "sortir", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Les adverbes de fréquence",
        explanation:
          "Ils se placent en général juste après le verbe conjugué : Je sors souvent le vendredi. Je ne sors jamais le lundi (« jamais » s'utilise avec « ne »).",
      },
      {
        title: "Comparer avec plus / moins / aussi... que",
        explanation:
          "Plus + adjectif + que = supériorité (C'est plus reposant que sortir). Moins + adjectif + que = infériorité (C'est moins amusant que voir des amis). Aussi + adjectif + que = égalité.",
      },
    ],
    examLinks: ["TCF IRN — expression orale, tâche 1"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "habitudes-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "habitudes-comprendre-activite",
            title: "Lire une conversation entre voisins",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "hab-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez la conversation entre Léa et Thomas, puis répondez.",
                text:
                  "Léa — Alors, qu'est-ce que tu fais d'habitude le week-end ?\n" +
                  "Thomas — Le samedi, je fais toujours du sport le matin, en général du vélo. Et toi ?\n" +
                  "Léa — Moi, je préfère rester à la maison et lire. Je sors rarement le samedi.\n" +
                  "Thomas — Ah, on est différents alors ! Et le dimanche ?\n" +
                  "Léa — Le dimanche, j'aime bien cuisiner. C'est plus reposant que sortir, pour moi.\n" +
                  "Thomas — Moi c'est l'inverse : je trouve que rester à la maison toute la journée, c'est moins amusant que voir des amis.",
                questions: [
                  {
                    kind: "qcm",
                    id: "hab-e-q1",
                    prompt: "Que fait Thomas le samedi matin, en général ?",
                    choices: [
                      { id: "a", text: "Il lit." },
                      { id: "b", text: "Il fait du vélo." },
                      { id: "c", text: "Il reste à la maison." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "Il fait du vélo.",
                      explanation: "Il dit qu'il fait toujours du sport, en général du vélo.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "hab-e-q2",
                    prompt: "Vrai ou faux : Léa sort souvent le samedi.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Elle dit qu'elle sort rarement le samedi.",
                    },
                  },
                  {
                    kind: "libre",
                    id: "hab-e-q3",
                    prompt: "Qu'aime faire Léa le dimanche ?",
                    expectedAnswer: "Cuisiner.",
                    correction: {
                      correctAnswer: "Cuisiner.",
                      explanation: "Elle le dit directement : « j'aime bien cuisiner ».",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "hab-e-q4",
                    prompt: "Pour Thomas, rester à la maison toute la journée est...",
                    choices: [
                      { id: "a", text: "plus amusant que voir des amis." },
                      { id: "b", text: "moins amusant que voir des amis." },
                      { id: "c", text: "aussi amusant que voir des amis." },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "moins amusant que voir des amis.",
                      explanation: "Il utilise « moins... que » pour comparer.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "habitudes-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "habitudes-entrainement-activite",
            title: "Fréquence et comparaisons",
            skillDomain: "grammaire",
            exercises: [
              {
                id: "hab-g1",
                type: "qcm",
                skillId: "gr-comparatifs",
                difficulty: "B1",
                instructions: "Choisis le bon comparatif.",
                question: {
                  kind: "qcm",
                  id: "hab-g1-q",
                  prompt: "« Pour moi, cuisiner est ___ reposant ___ sortir. »",
                  choices: [
                    { id: "a", text: "plus ... que" },
                    { id: "b", text: "moins ... de" },
                    { id: "c", text: "aussi ... de" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "plus ... que",
                    explanation: "On dit « plus + adjectif + que ».",
                  },
                },
              },
              {
                id: "hab-g2",
                type: "texte_a_trous",
                skillId: "voc-loisirs-gouts",
                difficulty: "B1",
                instructions: "Complète avec un adverbe de fréquence logique, d'après la conversation.",
                textWithBlanks:
                  "Le samedi, Thomas fait {{1}} du sport : c'est une habitude pour lui. Léa, elle, sort {{2}} " +
                  "le samedi, elle préfère rester chez elle.",
                blanks: [
                  { id: "1", answer: "toujours" },
                  { id: "2", answer: "rarement" },
                ],
                correction: {
                  correctAnswer: "toujours — rarement",
                  explanation:
                    "La conversation dit que Thomas fait « toujours » du sport le samedi, et que Léa sort « rarement » ce jour-là.",
                },
              },
              {
                id: "hab-g3",
                type: "association",
                skillId: "voc-loisirs-gouts",
                difficulty: "B1",
                instructions: "Associe chaque activité à son moment, d'après la conversation.",
                pairs: [
                  { id: "1", left: "Faire du vélo", right: "Le samedi matin (Thomas)" },
                  { id: "2", left: "Lire à la maison", right: "Le samedi (Léa)" },
                  { id: "3", left: "Cuisiner", right: "Le dimanche (Léa)" },
                ],
                correction: {
                  correctAnswer: "vélo → samedi matin ; lire → samedi (Léa) ; cuisiner → dimanche (Léa).",
                  explanation: "Chaque personnage associe une activité précise à un moment du week-end.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "habitudes-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "habitudes-ecriture-activite",
            title: "Décrire son week-end",
            skillDomain: "production_ecrite",
            exercises: [
              {
                id: "hab-h",
                type: "production_ecrite",
                skillId: "pe-decrire-quotidien",
                difficulty: "B1",
                instructions: "Rédige ta réponse.",
                consigne:
                  "Décrivez votre week-end typique en 4 à 6 phrases. Utilisez au moins un adverbe de fréquence " +
                  "(souvent, rarement...) et un comparatif (plus/moins/aussi... que).",
                minWords: 35,
                maxWords: 70,
                correctionCriteria: [
                  "Au moins un adverbe de fréquence utilisé (/2)",
                  "Au moins un comparatif utilisé (/2)",
                  "Deux activités ou habitudes différentes décrites (/2)",
                  "Phrases correctement construites (/1)",
                ],
                aiCorrectionAvailable: false,
              },
            ],
          },
        ],
      },
      {
        id: "habitudes-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "habitudes-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "hab-i1",
                type: "qcm",
                skillId: "gr-comparatifs",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "hab-i1-q",
                  prompt:
                    "« Le samedi, Thomas sort ___ souvent ___ Léa. » (Thomas sort très souvent, Léa très rarement)",
                  choices: [
                    { id: "a", text: "plus ... que" },
                    { id: "b", text: "aussi ... que" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "plus ... que",
                    explanation: "« Plus... que » exprime une différence claire entre les deux fréquences.",
                  },
                },
              },
              {
                id: "hab-i2",
                type: "reponse_courte",
                skillId: "voc-loisirs-gouts",
                difficulty: "B1",
                instructions: "Item 2.",
                question: "Quel est le contraire de « souvent » ?",
                acceptedAnswers: ["rarement", "jamais"],
                correction: {
                  correctAnswer: "rarement (ou jamais)",
                  explanation: "« Rarement » et « jamais » expriment une fréquence basse ou nulle, à l'opposé de « souvent ».",
                },
              },
              {
                id: "hab-i3",
                type: "vrai_faux",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 3. D'après la conversation.",
                statement: "Léa et Thomas ont exactement les mêmes habitudes du week-end.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Thomas est plutôt sportif et sociable, Léa préfère rester à la maison : ils sont différents.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-chercher-un-logement",
    slug: "chercher-un-logement",
    level: "B1",
    title: "Chercher un logement",
    description: "À la fin de ce module, tu pourras lire une annonce immobilière et poser les bonnes questions avant de visiter.",
    objectives: ["Comprendre une annonce de logement", "Identifier les informations essentielles", "Poser des questions sur un logement"],
    domain: "comprehension_ecrite",
    stageId: "b1-debut",
    estimatedMinutes: 20,
    situation: "Sophie cherche un studio à louer près de son travail. Elle trouve une annonce en ligne.",
    vocabulary: [
      { term: "une annonce", category: "principal" },
      { term: "louer", category: "verbe" },
      { term: "un loyer", category: "principal" },
      { term: "les charges", category: "principal" },
      { term: "« charges comprises »", category: "expression" },
      { term: "un studio", category: "principal" },
      { term: "meublé", category: "principal" },
      { term: "disponible", category: "principal" },
      { term: "une caution", category: "principal" },
      { term: "un propriétaire / une propriétaire", category: "principal" },
      { term: "visiter", category: "verbe" },
      { term: "lumineux", category: "principal" },
    ],
    languagePoints: [
      {
        title: "Comprendre une annonce immobilière",
        explanation:
          "Une annonce donne les informations essentielles dans un ordre logique : type de logement, surface, prix, disponibilité, contact. Repérer les chiffres (m², €, étage) aide à comprendre rapidement.",
      },
      {
        title: "Poser une question polie à un propriétaire",
        explanation:
          "Pour demander une information par écrit, on peut utiliser : « Est-ce que... ? », « Est-il possible de... ? » ou « Pourriez-vous me dire... ? » (plus formel).",
      },
    ],
    examLinks: ["DELF B1 — compréhension des écrits"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "logement-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "logement-comprendre-activite",
            title: "Lire une annonce de location",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "log-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez l'annonce, puis répondez aux questions.",
                text:
                  "À LOUER — Studio meublé, quartier Part-Dieu (Lyon)\n" +
                  "Studio de 22 m², lumineux, au 4ème étage sans ascenseur. Cuisine équipée, salle de bain avec " +
                  "douche. Loyer : 550 € charges comprises. Caution demandée : un mois de loyer. Disponible à " +
                  "partir du 1er septembre. Proche des transports : métro à 5 minutes à pied. Animaux non " +
                  "acceptés. Pour une visite, contactez l'agence Bellevue au 04 78 XX XX XX.",
                questions: [
                  {
                    kind: "qcm",
                    id: "log-e-q1",
                    prompt: "Quelle est la surface du studio ?",
                    choices: [
                      { id: "a", text: "12 m²" },
                      { id: "b", text: "22 m²" },
                      { id: "c", text: "42 m²" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "22 m²",
                      explanation: "L'annonce précise « Studio de 22 m² ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "log-e-q2",
                    prompt: "Vrai ou faux : le loyer ne comprend pas les charges.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "L'annonce précise « 550 € charges comprises ».",
                    },
                  },
                  {
                    kind: "libre",
                    id: "log-e-q3",
                    prompt: "À partir de quelle date le studio est-il disponible ?",
                    expectedAnswer: "À partir du 1er septembre.",
                    correction: {
                      correctAnswer: "À partir du 1er septembre.",
                      explanation: "C'est indiqué juste après le montant de la caution.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "log-e-q4",
                    prompt: "Combien de temps faut-il pour aller au métro à pied ?",
                    choices: [
                      { id: "a", text: "5 minutes" },
                      { id: "b", text: "15 minutes" },
                      { id: "c", text: "L'annonce ne le dit pas." },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "5 minutes",
                      explanation: "L'annonce précise « métro à 5 minutes à pied ».",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "log-e-q5",
                    prompt: "Vrai ou faux : les animaux sont acceptés dans ce studio.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "L'annonce précise « Animaux non acceptés ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "logement-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "logement-entrainement-activite",
            title: "Vocabulaire du logement",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "log-g1",
                type: "qcm",
                skillId: "voc-logement",
                difficulty: "B1",
                instructions: "Choisis le bon mot.",
                question: {
                  kind: "qcm",
                  id: "log-g1-q",
                  prompt: "La somme d'argent versée en garantie avant d'emménager s'appelle...",
                  choices: [
                    { id: "a", text: "le loyer" },
                    { id: "b", text: "la caution" },
                    { id: "c", text: "les charges" },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "la caution",
                    explanation: "La caution est rendue au locataire s'il n'y a pas de dégâts.",
                  },
                },
              },
              {
                id: "log-g2",
                type: "texte_a_trous",
                skillId: "voc-logement",
                difficulty: "B1",
                instructions: "Complète l'annonce avec le mot qui convient.",
                textWithBlanks:
                  "Studio {{1}} (avec des meubles), {{2}} à partir du 1er octobre. {{3}} : 500 € par mois, " +
                  "charges non comprises.",
                blanks: [
                  { id: "1", answer: "meublé" },
                  { id: "2", answer: "disponible" },
                  { id: "3", answer: "Loyer" },
                ],
                correction: {
                  correctAnswer: "meublé — disponible — Loyer",
                  explanation: "Ce sont des mots-clés typiques d'une annonce de location.",
                },
              },
              {
                id: "log-g3",
                type: "association",
                skillId: "voc-logement",
                difficulty: "B1",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "un studio", right: "un petit appartement avec une seule pièce principale" },
                  { id: "2", left: "la caution", right: "une somme versée en garantie, rendue plus tard" },
                  { id: "3", left: "les charges", right: "les frais en plus du loyer (eau, entretien...)" },
                ],
                correction: {
                  correctAnswer: "studio → petit appartement ; caution → somme rendue ; charges → frais en plus.",
                  explanation: "Ces trois mots reviennent dans presque toutes les annonces de logement.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "logement-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "logement-ecriture-activite",
            title: "Poser une question au propriétaire",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "log-h",
                type: "reponse_courte",
                skillId: "voc-logement",
                difficulty: "B1",
                instructions: "Réponds avec une phrase complète.",
                question:
                  "Vous voulez visiter le studio de l'annonce. Écrivez une question polie à poser au propriétaire " +
                  "pour demander si l'eau et l'électricité sont vraiment comprises dans le loyer.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer:
                    "Par exemple : « Est-ce que l'eau et l'électricité sont vraiment comprises dans les charges ? »",
                  explanation: "Une question polie et précise permet d'obtenir une information utile avant de s'engager.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "logement-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "logement-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "log-i1",
                type: "qcm",
                skillId: "voc-logement",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "log-i1-q",
                  prompt: "Quel mot désigne les frais d'eau, d'électricité ou d'entretien, en plus du loyer ?",
                  choices: [
                    { id: "a", text: "la caution" },
                    { id: "b", text: "les charges" },
                    { id: "c", text: "l'annonce" },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "les charges",
                    explanation: "Les charges sont les frais supplémentaires, parfois « comprises » dans le loyer.",
                  },
                },
              },
              {
                id: "log-i2",
                type: "reponse_courte",
                skillId: "voc-logement",
                difficulty: "B1",
                instructions: "Item 2.",
                question: "Quel est le contraire de « meublé » ?",
                acceptedAnswers: ["non meublé", "vide", "non-meublé"],
                correction: {
                  correctAnswer: "non meublé (ou vide)",
                  explanation: "Un logement « non meublé » n'a pas de meubles fournis par le propriétaire.",
                },
              },
              {
                id: "log-i3",
                type: "vrai_faux",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 3. D'après l'annonce du studio Part-Dieu.",
                statement: "Ce studio a un ascenseur.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'annonce précise « au 4ème étage sans ascenseur ».",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "b1-faire-des-achats",
    slug: "faire-des-achats",
    level: "B1",
    title: "Faire des achats et comparer",
    description: "À la fin de ce module, tu pourras comparer des produits, demander de l'aide et signaler un problème lors d'un achat.",
    objectives: ["Comparer deux produits", "Demander un renseignement en magasin", "Faire une réclamation simple"],
    domain: "vocabulaire",
    stageId: "b1-debut",
    estimatedMinutes: 20,
    situation: "Julien hésite entre deux ordinateurs portables dans un magasin et demande conseil à une vendeuse.",
    vocabulary: [
      { term: "un vendeur / une vendeuse", category: "principal" },
      { term: "un rayon", category: "principal" },
      { term: "« en solde »", category: "expression" },
      { term: "le prix", category: "principal" },
      { term: "la qualité", category: "principal" },
      { term: "la garantie", category: "principal" },
      { term: "échanger", category: "verbe" },
      { term: "rembourser", category: "verbe" },
      { term: "un reçu", category: "principal" },
      { term: "un défaut", category: "principal" },
      { term: "se renseigner", category: "verbe" },
      { term: "comparer", category: "verbe" },
    ],
    languagePoints: [
      {
        title: "Comparer deux produits",
        explanation:
          "Plus cher / moins cher / aussi cher que ; plus léger, plus puissant... que. On peut aussi dire : « Celui-ci coûte plus que celui-là » sans répéter l'adjectif.",
      },
      {
        title: "Expliquer un problème avec un achat",
        explanation:
          "Pour signaler un défaut, on peut dire : « Ce produit a un défaut. », « Il ne fonctionne pas. », « Je voudrais l'échanger ou me faire rembourser. »",
      },
    ],
    examLinks: ["TCF IRN — expression orale, tâche 2"],
    miniEvaluationThreshold: 2,
    lessons: [
      {
        id: "achats-comprendre",
        type: "comprendre",
        title: "Compréhension écrite",
        optional: false,
        activities: [
          {
            id: "achats-comprendre-activite",
            title: "Lire un échange chez le vendeur",
            skillDomain: "comprehension_ecrite",
            exercises: [
              {
                id: "ach-e",
                type: "comprehension_ecrite",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Lisez l'échange entre Julien et la vendeuse, puis répondez.",
                text:
                  "Julien — Bonjour, je cherche un ordinateur portable, mais j'hésite entre deux modèles.\n" +
                  "Vendeuse — Bien sûr ! Celui-ci coûte 599 €, il est plus léger, mais la garantie n'est que d'un an.\n" +
                  "Julien — Et l'autre ?\n" +
                  "Vendeuse — Il coûte un peu plus cher, 699 €, mais il est plus puissant et la garantie dure deux ans.\n" +
                  "Julien — D'accord... Et si j'ai un problème après l'achat, je peux le rapporter ?\n" +
                  "Vendeuse — Oui, vous avez 15 jours pour l'échanger ou vous faire rembourser, avec le reçu.\n" +
                  "Julien — Parfait, je vais réfléchir un peu. Merci beaucoup !",
                questions: [
                  {
                    kind: "qcm",
                    id: "ach-e-q1",
                    prompt: "Combien coûte le premier ordinateur ?",
                    choices: [
                      { id: "a", text: "599 €" },
                      { id: "b", text: "699 €" },
                      { id: "c", text: "550 €" },
                    ],
                    correctChoiceId: "a",
                    correction: {
                      correctAnswer: "599 €",
                      explanation: "La vendeuse annonce ce prix pour le premier modèle.",
                    },
                  },
                  {
                    kind: "vrai_faux",
                    id: "ach-e-q2",
                    prompt: "Vrai ou faux : le deuxième ordinateur est moins cher que le premier.",
                    correctAnswer: false,
                    correction: {
                      correctAnswer: "Faux.",
                      explanation: "Il coûte 699 €, donc plus cher que le premier (599 €).",
                    },
                  },
                  {
                    kind: "libre",
                    id: "ach-e-q3",
                    prompt: "Combien de temps dure la garantie du deuxième ordinateur ?",
                    expectedAnswer: "Deux ans.",
                    correction: {
                      correctAnswer: "Deux ans.",
                      explanation: "La vendeuse le précise directement.",
                    },
                  },
                  {
                    kind: "qcm",
                    id: "ach-e-q4",
                    prompt: "Combien de jours Julien a-t-il pour échanger un produit ?",
                    choices: [
                      { id: "a", text: "7 jours" },
                      { id: "b", text: "15 jours" },
                      { id: "c", text: "30 jours" },
                    ],
                    correctChoiceId: "b",
                    correction: {
                      correctAnswer: "15 jours",
                      explanation: "La vendeuse indique « 15 jours ».",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "achats-entrainement",
        type: "entrainement",
        title: "S'entraîner",
        optional: false,
        activities: [
          {
            id: "achats-entrainement-activite",
            title: "Comparer et parler d'un problème",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "ach-g1",
                type: "qcm",
                skillId: "gr-comparatifs",
                difficulty: "B1",
                instructions: "Choisis la bonne comparaison.",
                question: {
                  kind: "qcm",
                  id: "ach-g1-q",
                  prompt:
                    "Le premier ordinateur coûte 599 €, le deuxième coûte 699 €. Donc le premier est...",
                  choices: [
                    { id: "a", text: "plus cher que le deuxième." },
                    { id: "b", text: "moins cher que le deuxième." },
                    { id: "c", text: "aussi cher que le deuxième." },
                  ],
                  correctChoiceId: "b",
                  correction: {
                    correctAnswer: "moins cher que le deuxième.",
                    explanation: "599 € est inférieur à 699 €, donc « moins cher que ».",
                  },
                },
              },
              {
                id: "ach-g2",
                type: "texte_a_trous",
                skillId: "voc-achats",
                difficulty: "B1",
                instructions: "Complète avec le mot qui convient.",
                textWithBlanks:
                  "Si le produit a un {{1}}, vous pouvez l'{{2}} contre un autre, ou demander à être {{3}}, avec le reçu.",
                blanks: [
                  { id: "1", answer: "défaut" },
                  { id: "2", answer: "échanger" },
                  { id: "3", answer: "remboursé" },
                ],
                correction: {
                  correctAnswer: "défaut — échanger — remboursé",
                  explanation: "Ce sont les trois mots-clés pour gérer un problème avec un achat.",
                },
              },
              {
                id: "ach-g3",
                type: "association",
                skillId: "voc-achats",
                difficulty: "B1",
                instructions: "Associe chaque mot à sa définition.",
                pairs: [
                  { id: "1", left: "la garantie", right: "la période où le vendeur répare ou remplace gratuitement" },
                  { id: "2", left: "un reçu", right: "le document qui prouve l'achat" },
                  { id: "3", left: "en solde", right: "vendu moins cher pendant une période limitée" },
                ],
                correction: {
                  correctAnswer: "garantie → réparation gratuite ; reçu → preuve d'achat ; en solde → vendu moins cher.",
                  explanation: "Ces mots reviennent souvent dans un magasin.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "achats-ecriture",
        type: "ecriture",
        title: "Réutiliser",
        optional: false,
        activities: [
          {
            id: "achats-ecriture-activite",
            title: "Faire une réclamation",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "ach-h",
                type: "reponse_courte",
                skillId: "voc-achats",
                difficulty: "B1",
                instructions: "Réponds avec une phrase complète.",
                question:
                  "Vous avez acheté un ordinateur, mais il ne fonctionne pas bien après une semaine. Écrivez une " +
                  "phrase pour expliquer le problème au vendeur et demander une solution.",
                acceptedAnswers: [],
                correction: {
                  correctAnswer:
                    "Par exemple : « Bonjour, mon ordinateur a un défaut : il s'éteint tout seul. Je voudrais l'échanger ou être remboursé. »",
                  explanation: "Une bonne réclamation décrit le problème précisément et propose une solution.",
                },
              },
            ],
          },
        ],
      },
      {
        id: "achats-evaluation",
        type: "evaluation",
        title: "Faire le point",
        optional: false,
        activities: [
          {
            id: "achats-evaluation-activite",
            title: "Bilan du module",
            skillDomain: "vocabulaire",
            exercises: [
              {
                id: "ach-i1",
                type: "qcm",
                skillId: "gr-comparatifs",
                difficulty: "B1",
                instructions: "Item 1.",
                question: {
                  kind: "qcm",
                  id: "ach-i1-q",
                  prompt:
                    "« Ce modèle est ___ puissant ___ l'autre, mais il coûte le même prix. » (= un niveau équivalent)",
                  choices: [
                    { id: "a", text: "aussi ... que" },
                    { id: "b", text: "plus ... que" },
                  ],
                  correctChoiceId: "a",
                  correction: {
                    correctAnswer: "aussi ... que",
                    explanation: "« Aussi + adjectif + que » exprime une égalité.",
                  },
                },
              },
              {
                id: "ach-i2",
                type: "reponse_courte",
                skillId: "voc-achats",
                difficulty: "B1",
                instructions: "Item 2.",
                question: "Quel document faut-il garder pour pouvoir échanger un produit ?",
                acceptedAnswers: ["le reçu", "un reçu", "reçu"],
                correction: {
                  correctAnswer: "le reçu",
                  explanation: "Le reçu prouve la date et le lieu de l'achat.",
                },
              },
              {
                id: "ach-i3",
                type: "vrai_faux",
                skillId: "ce-textes-courants",
                difficulty: "B1",
                instructions: "Item 3. D'après l'échange chez le vendeur.",
                statement: "Julien achète immédiatement un des deux ordinateurs.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Il dit qu'il va « réfléchir un peu » avant de se décider.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find((mod) => mod.slug === slug);
}

export function getModulesByLevel(level: Module["level"]): Module[] {
  return MODULES.filter((mod) => mod.level === level);
}

export function countModuleExercises(mod: Module): number {
  return mod.lessons.reduce(
    (total, lesson) =>
      total +
      lesson.activities.reduce((sum, activity) => sum + activity.exercises.length, 0),
    0
  );
}

export function findExerciseInModule(mod: Module, exerciseId: string): Exercise | undefined {
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      const exercise = activity.exercises.find((e) => e.id === exerciseId);
      if (exercise) return exercise;
    }
  }
  return undefined;
}
