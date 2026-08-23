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
