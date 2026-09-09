/**
 * Banque d'écoute A2 — module additionnel et optionnel regroupant les
 * pistes de `chantier/a2-audio` (bibliothèque de 31 pistes depuis l'ajout
 * de `a2-directions-poste-banque`, voir §6.6 ci-dessous) qui ne
 * correspondent à aucun exercice `comprehension_orale` déjà déclaré
 * dans les modules/examens A2 (voir `docs/integration/a2-content.md` et
 * `docs/integration/a2-audio.md`). Objectif : ne laisser aucune piste
 * orpheline sans gonfler le nombre d'exercices des modules gradés existants
 * — ce module est entièrement à part, chaque leçon marquée `optional: true`,
 * regroupée par thème de la bibliothèque audio d'origine.
 *
 * Généré une fois par un script d'intégration à partir de
 * `lib/pedagogy/audio/a2/manifest.ts` (source de vérité des pistes) —
 * `track.exercise` est déjà un `ComprehensionOraleExercise` complet, copié
 * tel quel, jamais réécrit. Section "Écoute libre : transports" ajoutée
 * par le chantier `audio-humanisation`
 * (docs/audio/humanisation-a1-a2-b1.md §6.6) : `a2-annonce-gare-perturbation`
 * n'avait jusque-là aucun exercice live propre, uniquement un appariement
 * accidentel avec `ville-o` (module sans rapport), désormais corrigé.
 */
import type { Module } from "@/lib/pedagogy/types";

export const MODULE_A2_BANQUE_ECOUTE: Module = {
  id: "a2-banque-ecoute",
  slug: "banque-ecoute-a2",
  level: "A2",
  title: "Banque d'écoute A2",
  description:
    "Un ensemble libre de pistes audio supplémentaires pour t'entraîner à l'écoute, classées par thème. Ce module est optionnel : il n'est pas nécessaire de le terminer pour progresser dans le parcours A2.",
  objectives: [
    "S'entraîner à la compréhension orale sur des situations variées du quotidien",
    "Élargir l'exposition à des voix et des débits différents",
  ],
  domain: "comprehension_orale",
  stageId: "a2-pret-pour-le-b1",
  estimatedMinutes: 18,
  lessons: [
  {
    id: "banque-a2-famille",
    type: "ecoute",
    title: "Écoute libre : famille",
    optional: true,
    activities: [
      {
        id: "banque-a2-famille-activite",
        title: "Famille",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-famille-message-presentation",
        type: "comprehension_orale",
        skillId: "a2-co-annonces-publiques",
        difficulty: "A2",
        instructions: "Écoute le message et réponds aux questions.",
        audioSrc: "/audio/a2/a2-famille-message-presentation.m4a",
        transcript: "Bonjour, c'est Karim, l'étudiant. Je vous laisse ce message parce que j'arrive samedi prochain, vers quinze heures, à la gare. J'ai deux valises, ce n'est pas beaucoup. Ma famille est assez grande : j'ai deux frères et une sœur, mais je voyage seul cette fois. Est-ce que quelqu'un peut venir me chercher à la gare ? Sinon, je peux prendre un taxi, pas de problème. Merci beaucoup, et à samedi !",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-famille-message-presentation-q1",
                  prompt: "Quand est-ce que Karim arrive ?",
                  choices: [
                    { id: "a", text: "Vendredi" },
                    { id: "b", text: "Samedi" },
                    { id: "c", text: "Dimanche" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Samedi", explanation: "Karim dit : « j'arrive samedi prochain, vers quinze heures »." },
                },
                {
                  kind: "qcm",
                  id: "a2-famille-message-presentation-q2",
                  prompt: "Combien de frères et sœurs a Karim ?",
                  choices: [
                    { id: "a", text: "Un frère et une sœur" },
                    { id: "b", text: "Deux frères et une sœur" },
                    { id: "c", text: "Trois frères" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Deux frères et une sœur", explanation: "Il dit : « j'ai deux frères et une sœur, mais je voyage seul cette fois »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-famille-message-presentation-q3",
                  prompt: "Karim demande si quelqu'un peut venir le chercher à la gare.",
                  correctAnswer: true,
                  correction: { correctAnswer: "Vrai", explanation: "Il demande explicitement si quelqu'un peut venir, tout en précisant qu'il peut aussi prendre un taxi." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-logement",
    type: "ecoute",
    title: "Écoute libre : logement",
    optional: true,
    activities: [
      {
        id: "banque-a2-logement-activite",
        title: "Logement",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-logement-appel-agence",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute l'appel téléphonique et réponds aux questions.",
        audioSrc: "/audio/a2/a2-logement-appel-agence.m4a",
        transcript: "Agence : Agence Immo Centre, bonjour.\nClient : Bonjour madame, je vous appelle pour l'appartement de la rue Victor Hugo. Il est toujours disponible ?\nAgence : Oui, il est libre. C'est un deux-pièces au troisième étage, sans ascenseur.\nClient : D'accord. Est-ce que je peux le visiter cette semaine ?\nAgence : Oui, je peux vous proposer jeudi à seize heures, ou vendredi matin.\nClient : Jeudi à seize heures, c'est parfait pour moi.\nAgence : Très bien, je note votre visite jeudi à seize heures. Votre nom, s'il vous plaît ?\nClient : Diallo, D-I-A-L-L-O.\nAgence : Merci monsieur Diallo, à jeudi !",
        questions: [
                {
                  kind: "vrai_faux",
                  id: "a2-logement-appel-agence-q1",
                  prompt: "L'appartement a un ascenseur.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "L'agence précise : « au troisième étage, sans ascenseur »." },
                },
                {
                  kind: "qcm",
                  id: "a2-logement-appel-agence-q2",
                  prompt: "Quel jour la visite est-elle finalement fixée ?",
                  choices: [
                    { id: "a", text: "Mercredi" },
                    { id: "b", text: "Jeudi" },
                    { id: "c", text: "Vendredi" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Jeudi", explanation: "Le client choisit « jeudi à seize heures », confirmé ensuite par l'agence." },
                },
                {
                  kind: "qcm",
                  id: "a2-logement-appel-agence-q3",
                  prompt: "À quel étage se trouve l'appartement ?",
                  choices: [
                    { id: "a", text: "Deuxième" },
                    { id: "b", text: "Troisième" },
                    { id: "c", text: "Quatrième" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Troisième", explanation: "L'agence dit : « un deux-pièces au troisième étage »." },
                },
        ],
      },
      {
        id: "a2-copropriete-reunion-travaux",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute la réunion et réponds aux questions.",
        audioSrc: "/audio/a2/a2-copropriete-reunion-travaux.m4a",
        transcript: "Syndic : Bonsoir à tous, merci d'être venus. On doit décider aujourd'hui pour les travaux de la toiture, il y a deux fuites depuis l'hiver dernier.\nMme Petit : Oui, c'est urgent, chez moi l'eau arrive presque jusqu'au salon quand il pleut fort.\nM. Diallo : D'accord pour l'urgence, mais on a deux devis : celui de douze mille euros et celui de dix-huit mille. Quelle différence entre les deux ?\nSyndic : L'entreprise la moins chère refait seulement les parties abîmées. L'autre refait toute la toiture, avec une garantie de vingt ans.\nMme Petit : Vu le prix, moi je préfère la réparation partielle, on n'a pas besoin de refaire tout le toit maintenant.\nM. Diallo : Je suis d'accord, surtout que les charges ont déjà augmenté cette année.\nSyndic : Très bien, donc si tout le monde est d'accord, on part sur le devis à douze mille euros, travaux prévus le mois prochain. Je vous enverrai les documents à signer par email cette semaine.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-copropriete-reunion-travaux-q1",
                  prompt: "Pourquoi les copropriétaires se réunissent-ils ?",
                  choices: [
                    { id: "a", text: "Pour parler du jardin" },
                    { id: "b", text: "Pour décider des travaux de toiture" },
                    { id: "c", text: "Pour élire un nouveau syndic" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Pour décider des travaux de toiture", explanation: "Le syndic annonce : « on doit décider aujourd'hui pour les travaux de la toiture »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-copropriete-reunion-travaux-q2",
                  prompt: "Ils choisissent finalement le devis le plus cher.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Ils retiennent « le devis à douze mille euros », le moins cher des deux." },
                },
                {
                  kind: "qcm",
                  id: "a2-copropriete-reunion-travaux-q3",
                  prompt: "Pourquoi préfèrent-ils l'option la moins chère ?",
                  choices: [
                    { id: "a", text: "Elle est plus rapide" },
                    { id: "b", text: "Les charges ont déjà augmenté" },
                    { id: "c", text: "L'autre entreprise n'est pas disponible" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Les charges ont déjà augmenté", explanation: "M. Diallo justifie ce choix car « les charges ont déjà augmenté cette année »." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-rendez-vous",
    type: "ecoute",
    title: "Écoute libre : rendez-vous",
    optional: true,
    activities: [
      {
        id: "banque-a2-rendez-vous-activite",
        title: "Rendez-vous",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-rdv-medecin-secretariat",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute l'appel téléphonique et réponds aux questions.",
        audioSrc: "/audio/a2/a2-rdv-medecin-secretariat.m4a",
        transcript: "Secrétariat : Cabinet du docteur Bernard, bonjour.\nPatient : Bonjour, je voudrais un rendez-vous, s'il vous plaît. J'ai mal à la gorge depuis trois jours.\nSecrétariat : D'accord. Le docteur a une place demain à onze heures trente, ça vous convient ?\nPatient : Demain matin, c'est un peu difficile pour moi, je travaille. Vous n'avez rien l'après-midi ?\nSecrétariat : Si, j'ai quatorze heures, ou dix-sept heures quinze.\nPatient : Dix-sept heures quinze, c'est très bien.\nSecrétariat : Parfait. C'est à quel nom ?\nPatient : Mercier, Antoine Mercier.\nSecrétariat : Très bien monsieur Mercier, à demain dix-sept heures quinze.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-rdv-medecin-secretariat-q1",
                  prompt: "Pourquoi le patient veut-il un rendez-vous ?",
                  choices: [
                    { id: "a", text: "Il a mal au dos" },
                    { id: "b", text: "Il a mal à la gorge" },
                    { id: "c", text: "Il a mal au ventre" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Il a mal à la gorge", explanation: "Le patient dit : « j'ai mal à la gorge depuis trois jours »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-rdv-medecin-secretariat-q2",
                  prompt: "Le patient prend le rendez-vous de onze heures trente proposé au début.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Il refuse ce créneau du matin car il travaille, et demande un rendez-vous l'après-midi." },
                },
                {
                  kind: "qcm",
                  id: "a2-rdv-medecin-secretariat-q3",
                  prompt: "Quel est l'horaire final du rendez-vous ?",
                  choices: [
                    { id: "a", text: "14h00" },
                    { id: "b", text: "17h15" },
                    { id: "c", text: "11h30" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "17h15", explanation: "Le patient choisit « dix-sept heures quinze », confirmé par le secrétariat." },
                },
        ],
      },
      {
        id: "bilan-a2-repondeur-coiffeur",
        type: "comprehension_orale",
        skillId: "a2-co-annonces-publiques",
        difficulty: "A2",
        instructions: "Document 2/4 — Écoute le message et réponds aux questions.",
        audioSrc: "/audio/a2/bilan-a2-repondeur-coiffeur.m4a",
        transcript: "Bonjour, c'est le salon de coiffure Marie Ciseaux. On vous appelle pour votre rendez-vous de mardi quinze à dix heures : notre coiffeuse habituelle est malade, donc nous vous proposons de venir plutôt à quatorze heures le même jour, avec une autre coiffeuse, ou de reporter à jeudi dix heures avec elle. Merci de nous rappeler pour nous dire votre choix.",
        questions: [
                {
                  kind: "qcm",
                  id: "bilan-a2-repondeur-coiffeur-q1",
                  prompt: "Pourquoi le salon appelle-t-il ?",
                  choices: [
                    { id: "a", text: "Le salon est fermé mardi" },
                    { id: "b", text: "La coiffeuse habituelle est malade" },
                    { id: "c", text: "Le rendez-vous est confirmé sans changement" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "La coiffeuse habituelle est malade", explanation: "Le message explique : « notre coiffeuse habituelle est malade »." },
                },
                {
                  kind: "qcm",
                  id: "bilan-a2-repondeur-coiffeur-q2",
                  prompt: "Quelles sont les deux options proposées ?",
                  choices: [
                    { id: "a", text: "Mardi 14h (autre coiffeuse) ou jeudi 10h (même coiffeuse)" },
                    { id: "b", text: "Mardi 10h ou mercredi 10h" },
                    { id: "c", text: "Annulation définitive ou remboursement" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "Mardi 14h (autre coiffeuse) ou jeudi 10h (même coiffeuse)", explanation: "Le message propose « quatorze heures le même jour, avec une autre coiffeuse, ou de reporter à jeudi dix heures avec elle »." },
                },
                {
                  kind: "vrai_faux",
                  id: "bilan-a2-repondeur-coiffeur-q3",
                  prompt: "Le rendez-vous du mardi 15 à dix heures est confirmé sans changement.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Ce créneau initial n'est plus disponible ; deux nouvelles options sont proposées à sa place." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-loisirs",
    type: "ecoute",
    title: "Écoute libre : loisirs",
    optional: true,
    activities: [
      {
        id: "banque-a2-loisirs-activite",
        title: "Loisirs",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-loisirs-invitation-vocale",
        type: "comprehension_orale",
        skillId: "a2-co-annonces-publiques",
        difficulty: "A2",
        instructions: "Écoute le message et réponds aux questions.",
        audioSrc: "/audio/a2/a2-loisirs-invitation-vocale.m4a",
        transcript: "Salut, c'est Camille ! Dis, ça te dit d'aller au cinéma vendredi soir ? Il y a un nouveau film qui commence à vingt heures. On peut se retrouver devant le cinéma à dix-neuf heures quarante-cinq. Réponds-moi vite si tu es libre. À bientôt !",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-loisirs-invitation-vocale-q1",
                  prompt: "Quelle activité Camille propose-t-elle ?",
                  choices: [
                    { id: "a", text: "Un restaurant" },
                    { id: "b", text: "Un cinéma" },
                    { id: "c", text: "Une piscine" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Un cinéma", explanation: "Elle propose : « ça te dit d'aller au cinéma vendredi soir ? »." },
                },
                {
                  kind: "qcm",
                  id: "a2-loisirs-invitation-vocale-q2",
                  prompt: "À quelle heure commence le film ?",
                  choices: [
                    { id: "a", text: "19h45" },
                    { id: "b", text: "20h00" },
                    { id: "c", text: "20h45" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "20h00", explanation: "Camille dit : « il y a un nouveau film qui commence à vingt heures »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-loisirs-invitation-vocale-q3",
                  prompt: "Camille propose de se retrouver après le film.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Le rendez-vous (19h45) est avant le début du film (20h00), pas après." },
                },
        ],
      },
      {
        id: "a2-restaurant-reservation-telephone",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute l'appel téléphonique et réponds aux questions.",
        audioSrc: "/audio/a2/a2-restaurant-reservation-telephone.m4a",
        transcript: "Serveur : Restaurant Le Petit Jardin, bonsoir.\nCliente : Bonsoir, je voudrais réserver une table pour samedi soir, s'il vous plaît.\nServeur : Bien sûr. Pour combien de personnes ?\nCliente : Pour quatre personnes, vers vingt heures.\nServeur : Alors... samedi vingt heures pour quatre... Ah, je suis désolé, à vingt heures c'est complet. J'ai de la place à vingt heures trente, ou à dix-neuf heures.\nCliente : Vingt heures trente, ça marche très bien pour nous. Et en fait, on sera plutôt cinq, ma sœur vient aussi.\nServeur : Pas de problème, une table de cinq à vingt heures trente samedi. C'est à quel nom ?\nCliente : Rousseau.\nServeur : Parfait madame Rousseau, à samedi !",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-restaurant-reservation-telephone-q1",
                  prompt: "Pourquoi la cliente ne peut-elle pas avoir une table à vingt heures ?",
                  choices: [
                    { id: "a", text: "Le restaurant est fermé" },
                    { id: "b", text: "C'est complet" },
                    { id: "c", text: "Il n'y a pas de table pour quatre" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "C'est complet", explanation: "Le serveur répond : « à vingt heures c'est complet »." },
                },
                {
                  kind: "qcm",
                  id: "a2-restaurant-reservation-telephone-q2",
                  prompt: "Finalement, combien de personnes seront à table ?",
                  choices: [
                    { id: "a", text: "Quatre" },
                    { id: "b", text: "Cinq" },
                    { id: "c", text: "Trois" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Cinq", explanation: "La cliente ajoute sa sœur : « on sera plutôt cinq »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-restaurant-reservation-telephone-q3",
                  prompt: "La réservation est finalement à dix-neuf heures.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "La cliente choisit l'autre créneau proposé, vingt heures trente." },
                },
        ],
      },
      {
        id: "bilan-a2-dialogue-patinoire",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Document 3/4 — Écoute la conversation et réponds aux questions.",
        audioSrc: "/audio/a2/bilan-a2-dialogue-patinoire.m4a",
        transcript: "Ami 1 : Dis, ça te dirait de venir avec nous à la patinoire samedi ? On y va à quatre.\nAmi 2 : Euh, je ne sais pas trop, je n'ai jamais fait de patin à glace, j'ai peur de tomber !\nAmi 1 : Ne t'inquiète pas, c'est facile, et puis c'est fait pour rigoler, personne ne va se moquer de toi.\nAmi 2 : Bon, d'accord, je viens ! Mais toi, tu m'aides à rester debout, hein !\nAmi 1 : Promis ! Rendez-vous samedi à quinze heures devant la patinoire, alors.",
        questions: [
                {
                  kind: "qcm",
                  id: "bilan-a2-dialogue-patinoire-q1",
                  prompt: "De quoi parle cette conversation ?",
                  choices: [
                    { id: "a", text: "D'une sortie à la patinoire" },
                    { id: "b", text: "D'un cours de natation" },
                    { id: "c", text: "D'une compétition de sport" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "D'une sortie à la patinoire", explanation: "Ami 1 propose : « ça te dirait de venir avec nous à la patinoire samedi ? »." },
                },
                {
                  kind: "qcm",
                  id: "bilan-a2-dialogue-patinoire-q2",
                  prompt: "Pourquoi Ami 2 hésite-t-il/elle d'abord ?",
                  choices: [
                    { id: "a", text: "Il/elle n'aime pas ses amis" },
                    { id: "b", text: "Il/elle n'a jamais fait de patin et a peur de tomber" },
                    { id: "c", text: "Il/elle travaille samedi" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Il/elle n'a jamais fait de patin et a peur de tomber", explanation: "Ami 2 dit : « je n'ai jamais fait de patin à glace, j'ai peur de tomber ! »." },
                },
                {
                  kind: "vrai_faux",
                  id: "bilan-a2-dialogue-patinoire-q3",
                  prompt: "Ami 2 finit par accepter de venir.",
                  correctAnswer: true,
                  correction: { correctAnswer: "Vrai", explanation: "Il/elle dit finalement : « bon, d'accord, je viens ! »." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-travail",
    type: "ecoute",
    title: "Écoute libre : travail",
    optional: true,
    activities: [
      {
        id: "banque-a2-travail-activite",
        title: "Travail",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-travail-nouveau-collegue",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute le dialogue et réponds aux questions.",
        audioSrc: "/audio/a2/a2-travail-nouveau-collegue.m4a",
        transcript: "Julie : Bonjour ! Tu dois être Karim, le nouveau ? Moi c'est Julie, je travaille au service commercial.\nKarim : Ah oui, bonjour Julie ! Enchanté. C'est mon premier jour, je suis un peu perdu.\nJulie : C'est normal, ne t'inquiète pas. Tu commences par le service client, c'est ça ?\nKarim : Oui, c'est ça. Mais en fait, on m'a dit ce matin que je vais plutôt commencer par la logistique, avec monsieur Petit. Le service client, ce sera la semaine prochaine.\nJulie : Ah d'accord, ça change un peu alors ! Le bureau de monsieur Petit est au deuxième étage, juste à côté de la salle de pause.\nKarim : Super, merci beaucoup. Et la pause déjeuner, c'est à quelle heure ici ?\nJulie : En général vers midi et demi, mais c'est assez libre. On peut déjeuner ensemble aujourd'hui si tu veux, comme ça je te présente l'équipe.\nKarim : Avec plaisir, merci Julie !",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-travail-nouveau-collegue-q1",
                  prompt: "Par quel service Karim commence-t-il finalement ?",
                  choices: [
                    { id: "a", text: "Le service client" },
                    { id: "b", text: "La logistique" },
                    { id: "c", text: "Le service commercial" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "La logistique", explanation: "Karim corrige : « on m'a dit ce matin que je vais plutôt commencer par la logistique »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-travail-nouveau-collegue-q2",
                  prompt: "Karim connaissait déjà ce changement avant ce matin.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Il précise que l'information lui a été donnée « ce matin », donc au dernier moment." },
                },
                {
                  kind: "qcm",
                  id: "a2-travail-nouveau-collegue-q3",
                  prompt: "Où se trouve le bureau de monsieur Petit ?",
                  choices: [
                    { id: "a", text: "Au premier étage" },
                    { id: "b", text: "Au deuxième étage, à côté de la salle de pause" },
                    { id: "c", text: "Au rez-de-chaussée" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Au deuxième étage, à côté de la salle de pause", explanation: "Julie donne cette indication précise à Karim." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-voyages",
    type: "ecoute",
    title: "Écoute libre : voyages",
    optional: true,
    activities: [
      {
        id: "banque-a2-voyages-activite",
        title: "Voyages",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-hotel-reservation-dates",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute l'appel téléphonique et réponds aux questions.",
        audioSrc: "/audio/a2/a2-hotel-reservation-dates.m4a",
        transcript: "Réceptionniste : Hôtel des Voyageurs, bonjour.\nClient : Bonjour, je voudrais réserver une chambre du trois au six juillet, s'il vous plaît.\nRéceptionniste : Une seconde... du trois au six juillet, donc trois nuits. Pour combien de personnes ?\nClient : Pour deux personnes, un lit double si possible.\nRéceptionniste : J'ai une chambre double avec vue sur la cour, ça vous va ?\nClient : Oui, très bien. Ah, en fait, est-ce qu'on peut plutôt arriver le quatre et repartir le sept ? Nos horaires de train ont changé.\nRéceptionniste : Pas de problème, je change ça : du quatre au sept juillet, toujours trois nuits, chambre double. Le petit-déjeuner est inclus.\nClient : Parfait, merci beaucoup.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-hotel-reservation-dates-q1",
                  prompt: "Quelles sont finalement les dates du séjour ?",
                  choices: [
                    { id: "a", text: "Du 3 au 6 juillet" },
                    { id: "b", text: "Du 4 au 7 juillet" },
                    { id: "c", text: "Du 4 au 6 juillet" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Du 4 au 7 juillet", explanation: "Le client change ses dates à cause de ses horaires de train, la réceptionniste confirme « du quatre au sept juillet »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-hotel-reservation-dates-q2",
                  prompt: "Le petit-déjeuner est inclus dans la réservation.",
                  correctAnswer: true,
                  correction: { correctAnswer: "Vrai", explanation: "La réceptionniste précise : « le petit-déjeuner est inclus »." },
                },
                {
                  kind: "qcm",
                  id: "a2-hotel-reservation-dates-q3",
                  prompt: "Combien de nuits le client réserve-t-il ?",
                  choices: [
                    { id: "a", text: "Deux" },
                    { id: "b", text: "Trois" },
                    { id: "c", text: "Quatre" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Trois", explanation: "Le changement de dates garde la même durée : « toujours trois nuits »." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-projets",
    type: "ecoute",
    title: "Écoute libre : projets",
    optional: true,
    activities: [
      {
        id: "banque-a2-projets-activite",
        title: "Projets",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-projet-vacances-couple",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute le dialogue et réponds aux questions.",
        audioSrc: "/audio/a2/a2-projet-vacances-couple.m4a",
        transcript: "Lui : Alors, pour les vacances d'été, on part à la mer ou à la montagne cette année ?\nElle : Moi je pensais plutôt à la montagne, on n'y est pas allés depuis longtemps. Mais toi, tu préfères toujours la mer, non ?\nLui : Oui, mais bon, on peut essayer la montagne. Il y a de bonnes randonnées, et il fait moins chaud en août.\nElle : Exactement ! Et les enfants adoreraient voir des vaches et des chèvres là-bas.\nLui : D'accord, la montagne alors. On part deux semaines, du premier au quinze août ?\nElle : Plutôt dix jours, je crois, parce que ma sœur vient à la maison la dernière semaine d'août.\nLui : Ah oui, c'est vrai, j'avais oublié. Dix jours, ça marche.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-projet-vacances-couple-q1",
                  prompt: "Où partiront-ils finalement en vacances ?",
                  choices: [
                    { id: "a", text: "À la mer" },
                    { id: "b", text: "À la montagne" },
                    { id: "c", text: "À l'étranger" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "À la montagne", explanation: "Il accepte la proposition d'elle : « d'accord, la montagne alors »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-projet-vacances-couple-q2",
                  prompt: "Ils partent deux semaines complètes.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Ils réduisent à dix jours à cause de la visite de la sœur." },
                },
                {
                  kind: "qcm",
                  id: "a2-projet-vacances-couple-q3",
                  prompt: "Pourquoi réduisent-ils la durée du voyage ?",
                  choices: [
                    { id: "a", text: "Ils manquent d'argent" },
                    { id: "b", text: "La sœur vient à la maison" },
                    { id: "c", text: "Il fait trop chaud" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "La sœur vient à la maison", explanation: "Elle explique : « ma sœur vient à la maison la dernière semaine d'août »." },
                },
        ],
      },
      {
        id: "a2-reunion-projet-collegues",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute la réunion et réponds aux questions.",
        audioSrc: "/audio/a2/a2-reunion-projet-collegues.m4a",
        transcript: "Manager : Bon, on fait un petit point sur le projet du nouveau site internet. Où en êtes-vous ?\nJulie : De mon côté, j'ai fini les textes pour la page d'accueil et la page contact. Il me reste encore la page des services, je pense terminer ça vendredi.\nKarim : Moi, j'ai un peu de retard sur les photos, le photographe n'est disponible que la semaine prochaine. Par contre, j'ai déjà choisi les couleurs et la mise en page avec le graphiste.\nManager : D'accord. Est-ce que ce retard sur les photos va poser un problème pour le lancement du site ?\nKarim : Non, je ne pense pas, parce qu'on peut mettre des photos temporaires en attendant, et les changer plus tard sans problème.\nManager : Parfait, alors on garde la date de lancement dans trois semaines. Julie, tu peux envoyer tes textes à Karim dès qu'ils sont prêts ?\nJulie : Oui, pas de souci, je les enverrai au fur et à mesure.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-reunion-projet-collegues-q1",
                  prompt: "Qu'est-ce que Julie doit encore terminer ?",
                  choices: [
                    { id: "a", text: "Les photos" },
                    { id: "b", text: "La page des services" },
                    { id: "c", text: "La mise en page" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "La page des services", explanation: "Elle dit : « il me reste encore la page des services »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-reunion-projet-collegues-q2",
                  prompt: "Karim est en retard parce qu'il n'a pas encore choisi les couleurs du site.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Son retard concerne les photos ; les couleurs et la mise en page sont déjà faites." },
                },
                {
                  kind: "qcm",
                  id: "a2-reunion-projet-collegues-q3",
                  prompt: "Le lancement du site va-t-il probablement être retardé à cause des photos ?",
                  choices: [
                    { id: "a", text: "Oui, à cause des photos" },
                    { id: "b", text: "Non, ils utiliseront des photos temporaires" },
                    { id: "c", text: "Oui, à cause des textes" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Non, ils utiliseront des photos temporaires", explanation: "Karim propose une solution qui évite le retard, et le manager garde la date prévue." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-evenements",
    type: "ecoute",
    title: "Écoute libre : événements",
    optional: true,
    activities: [
      {
        id: "banque-a2-evenements-activite",
        title: "Événements",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-evenement-anniversaire-surprise",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute la conversation et réponds aux questions.",
        audioSrc: "/audio/a2/a2-evenement-anniversaire-surprise.m4a",
        transcript: "Nadia : Allô, c'est Nadia. Je vous appelle pour l'anniversaire surprise de Farid samedi. Vous êtes disponibles tous les deux ?\nMarc : Oui, moi je suis libre. Il faut faire ça où, chez toi ?\nNadia : Oui, chez moi, vers dix-neuf heures. Farid pense qu'on va juste dîner tranquillement tous les trois.\nSophie : Génial ! Je peux apporter le gâteau, j'en fais un super bon au chocolat.\nNadia : Parfait Sophie ! Marc, tu peux t'occuper des décorations et des boissons ?\nMarc : Pas de souci. Et pour le cadeau, on fait un cadeau commun ou chacun le sien ?\nNadia : Un cadeau commun, c'est mieux je pense. J'ai vu un beau sac de sport, il en a besoin.\nSophie : Bonne idée. Bon, alors samedi dix-neuf heures chez Nadia, avec le gâteau, les décorations et le sac de sport. On garde le secret !",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-evenement-anniversaire-surprise-q1",
                  prompt: "Qui apporte le gâteau ?",
                  choices: [
                    { id: "a", text: "Nadia" },
                    { id: "b", text: "Marc" },
                    { id: "c", text: "Sophie" },
                  ],
                  correctChoiceId: "c",
                  correction: { correctAnswer: "Sophie", explanation: "Sophie propose : « je peux apporter le gâteau »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-evenement-anniversaire-surprise-q2",
                  prompt: "Farid sait qu'une fête surprise est organisée pour lui.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Nadia dit que Farid pense qu'ils vont « juste dîner tranquillement », et ils gardent « le secret »." },
                },
                {
                  kind: "qcm",
                  id: "a2-evenement-anniversaire-surprise-q3",
                  prompt: "Quel cadeau choisissent-ils ?",
                  choices: [
                    { id: "a", text: "Un livre" },
                    { id: "b", text: "Un sac de sport" },
                    { id: "c", text: "Une montre" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Un sac de sport", explanation: "Nadia propose « un beau sac de sport, il en a besoin », et Sophie confirme ce choix à la fin." },
                },
        ],
      },
      {
        id: "a2-invitation-mariage-repondeur",
        type: "comprehension_orale",
        skillId: "a2-co-annonces-publiques",
        difficulty: "A2",
        instructions: "Écoute le message et réponds aux questions.",
        audioSrc: "/audio/a2/a2-invitation-mariage-repondeur.m4a",
        transcript: "Bonjour, c'est Amina ! Je t'appelle pour te dire officiellement que je me marie, et j'aimerais beaucoup que tu viennes ! Ce sera le samedi quatorze juin, à quatorze heures, à la mairie du village, et ensuite la fête continuera le soir dans une salle à la campagne, près de chez mes parents. Il faut prévoir une tenue plutôt habillée, mais pas de robe blanche bien sûr ! Si tu viens avec quelqu'un, dis-le-moi avant la fin du mois, pour que je compte les places pour le repas. Il y aura aussi de la musique et de la danse jusqu'à tard le soir. Rappelle-moi vite pour me confirmer, j'ai hâte de te voir là-bas !",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-invitation-mariage-repondeur-q1",
                  prompt: "Quelle est la date du mariage ?",
                  choices: [
                    { id: "a", text: "4 juin" },
                    { id: "b", text: "14 juin" },
                    { id: "c", text: "40 juin" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "14 juin", explanation: "Amina dit : « ce sera le samedi quatorze juin »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-invitation-mariage-repondeur-q2",
                  prompt: "La fête du soir a lieu au même endroit que la cérémonie à la mairie.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "La cérémonie est à la mairie, la fête « dans une salle à la campagne, près de chez mes parents »." },
                },
                {
                  kind: "qcm",
                  id: "a2-invitation-mariage-repondeur-q3",
                  prompt: "Avant quand faut-il répondre si on vient accompagné ?",
                  choices: [
                    { id: "a", text: "Avant le mariage" },
                    { id: "b", text: "Avant la fin du mois" },
                    { id: "c", text: "Le jour même" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Avant la fin du mois", explanation: "Amina demande : « dis-le-moi avant la fin du mois »." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-achats",
    type: "ecoute",
    title: "Écoute libre : achats",
    optional: true,
    activities: [
      {
        id: "banque-a2-achats-activite",
        title: "Achats",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-appel-service-client-colis",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute l'appel téléphonique et réponds aux questions.",
        audioSrc: "/audio/a2/a2-appel-service-client-colis.m4a",
        transcript: "Conseiller : Service client, bonjour, je vous écoute.\nCliente : Bonjour, j'ai commandé un colis il y a dix jours, et je ne l'ai toujours pas reçu. C'est normal ?\nConseiller : Je suis désolé pour ça. Vous avez votre numéro de commande ?\nCliente : Oui, c'est le quatre, quatre, deux, un, neuf.\nConseiller : Un instant... Alors je vois que le colis a été envoyé, mais il est bloqué depuis trois jours au centre de tri, à cause d'une adresse incomplète : il manque le numéro d'appartement.\nCliente : Ah, c'est possible, j'ai peut-être oublié de l'indiquer. C'est le douze.\nConseiller : Très bien, je corrige l'adresse tout de suite. Normalement, vous devriez recevoir votre colis d'ici deux ou trois jours.\nCliente : D'accord. Et si je ne le reçois toujours pas la semaine prochaine ?\nConseiller : Dans ce cas, rappelez-nous avec votre numéro de commande, et on vous enverra un nouveau colis gratuitement.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-appel-service-client-colis-q1",
                  prompt: "Pourquoi le colis est-il bloqué ?",
                  choices: [
                    { id: "a", text: "Il est perdu" },
                    { id: "b", text: "L'adresse est incomplète" },
                    { id: "c", text: "Le magasin est fermé" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "L'adresse est incomplète", explanation: "Le conseiller explique : « il manque le numéro d'appartement »." },
                },
                {
                  kind: "qcm",
                  id: "a2-appel-service-client-colis-q2",
                  prompt: "Que va probablement faire le conseiller juste après cet appel ?",
                  choices: [
                    { id: "a", text: "Rembourser la cliente" },
                    { id: "b", text: "Corriger l'adresse et renvoyer le colis" },
                    { id: "c", text: "Annuler la commande" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Corriger l'adresse et renvoyer le colis", explanation: "Il annonce : « je corrige l'adresse tout de suite », l'envoi n'étant pas annulé mais débloqué." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-appel-service-client-colis-q3",
                  prompt: "Si le colis n'arrive toujours pas, la cliente devra payer un nouveau colis.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Le conseiller précise qu'un nouveau colis serait envoyé « gratuitement »." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-sante",
    type: "ecoute",
    title: "Écoute libre : santé",
    optional: true,
    activities: [
      {
        id: "banque-a2-sante-activite",
        title: "Santé",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-medecin-suivi-consultation",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute la consultation et réponds aux questions.",
        audioSrc: "/audio/a2/a2-medecin-suivi-consultation.m4a",
        transcript: "Médecin : Bonjour madame Lefort, alors, comment allez-vous depuis la dernière fois ?\nPatiente : Beaucoup mieux, docteur. Le dos me fait encore un peu mal le matin, mais beaucoup moins qu'avant.\nMédecin : Très bien, c'est normal, ça prend du temps. Vous continuez les exercices que je vous avais montrés ?\nPatiente : Oui, tous les jours, sauf le week-end dernier, j'étais en voyage.\nMédecin : Ce n'est pas grave, l'important c'est la régularité en général. Je vais vous prescrire encore trois semaines de kinésithérapie, deux séances par semaine. Après ça, normalement, vous n'en aurez plus besoin.\nPatiente : D'accord. Et je peux recommencer le sport ? J'aimerais reprendre la natation.\nMédecin : La natation, oui, c'est même très bon pour le dos. Par contre, évitez encore la course à pied pendant un mois.\nPatiente : Très bien, merci docteur.\nMédecin : Je vous revois dans trois semaines pour faire le point. Bonne journée !",
        questions: [
                {
                  kind: "vrai_faux",
                  id: "a2-medecin-suivi-consultation-q1",
                  prompt: "La patiente va moins bien que la dernière fois.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Elle dit aller « beaucoup mieux », avec une douleur « beaucoup moins qu'avant »." },
                },
                {
                  kind: "qcm",
                  id: "a2-medecin-suivi-consultation-q2",
                  prompt: "Quel sport le médecin autorise-t-il tout de suite ?",
                  choices: [
                    { id: "a", text: "La course à pied" },
                    { id: "b", text: "La natation" },
                    { id: "c", text: "Le tennis" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "La natation", explanation: "Le médecin répond : « la natation, oui, c'est même très bon pour le dos »." },
                },
                {
                  kind: "qcm",
                  id: "a2-medecin-suivi-consultation-q3",
                  prompt: "Combien de temps encore de kinésithérapie ?",
                  choices: [
                    { id: "a", text: "1 semaine" },
                    { id: "b", text: "3 semaines" },
                    { id: "c", text: "3 mois" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "3 semaines", explanation: "Le médecin prescrit « encore trois semaines de kinésithérapie »." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    id: "banque-a2-recits",
    type: "ecoute",
    title: "Écoute libre : récits",
    optional: true,
    activities: [
      {
        id: "banque-a2-recits-activite",
        title: "Récits",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-recit-voyage-etranger",
        type: "comprehension_orale",
        skillId: "a2-co-dialogues-quotidiens",
        difficulty: "A2",
        instructions: "Écoute le récit et réponds aux questions.",
        audioSrc: "/audio/a2/a2-recit-voyage-etranger.m4a",
        transcript: "Farid : Tu sais que je suis parti une semaine au Portugal le mois dernier ?\nJulie : Non ! Raconte, c'était comment ?\nFarid : Super ! Je suis arrivé à Lisbonne un lundi, et les trois premiers jours, j'ai visité la ville : le centre historique, les tramways jaunes, et j'ai mangé beaucoup de pastéis de nata, ces petits gâteaux typiques.\nJulie : Miam ! Et ensuite ?\nFarid : Ensuite, jeudi, j'ai pris le train pour Porto, au nord. Là-bas, j'ai visité les caves à vin, et j'ai découvert que je n'aimais pas trop le porto, en fait !\nJulie : Ha ha ! Et tu es rentré directement de Porto ?\nFarid : Non, le dernier jour, je suis revenu à Lisbonne pour reprendre l'avion. Mais il y a eu un problème : mon vol a été annulé à cause d'une grève, et j'ai dû rester une nuit de plus à l'aéroport !\nJulie : Oh non, quelle histoire ! Mais sinon, tu as adoré le voyage ?\nFarid : Oui, malgré ça, c'était un super voyage, j'y retournerai avec plaisir.",
        questions: [
                {
                  kind: "qcm",
                  id: "a2-recit-voyage-etranger-q1",
                  prompt: "Quel jour Farid part-il pour Porto ?",
                  choices: [
                    { id: "a", text: "Lundi" },
                    { id: "b", text: "Jeudi" },
                    { id: "c", text: "Dimanche" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Jeudi", explanation: "Il dit : « ensuite, jeudi, j'ai pris le train pour Porto »." },
                },
                {
                  kind: "vrai_faux",
                  id: "a2-recit-voyage-etranger-q2",
                  prompt: "Farid a adoré le porto, le vin de la région.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "Il dit avoir découvert « que je n'aimais pas trop le porto »." },
                },
                {
                  kind: "qcm",
                  id: "a2-recit-voyage-etranger-q3",
                  prompt: "Que s'est-il passé le dernier jour du voyage ?",
                  choices: [
                    { id: "a", text: "Il a raté son train" },
                    { id: "b", text: "Son vol a été annulé" },
                    { id: "c", text: "Il a perdu ses valises" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Son vol a été annulé", explanation: "Il raconte : « mon vol a été annulé à cause d'une grève »." },
                },
                {
                  kind: "qcm",
                  id: "a2-recit-voyage-etranger-q4",
                  prompt: "Comment Farid juge-t-il son voyage, malgré le problème de vol ?",
                  choices: [
                    { id: "a", text: "Il l'a détesté" },
                    { id: "b", text: "C'était un super voyage" },
                    { id: "c", text: "Il ne sait pas encore" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "C'était un super voyage", explanation: "Il conclut : « malgré ça, c'était un super voyage, j'y retournerai avec plaisir » — l'imprévu ne change pas son avis global." },
                },
        ],
      },
        ],
      },
    ],
  },
  {
    // Ajoutée par le chantier `audio-humanisation` (voir
    // docs/audio/humanisation-a1-a2-b1.md §6.6) : cette piste n'avait
    // jusqu'ici aucun exercice live qui lui soit propre — elle n'était
    // référencée que par l'exercice `ville-o` du module
    // `a2-se-reperer-en-ville`, un mauvais appariement thématique
    // aujourd'hui corrigé (`ville-o` utilise désormais
    // `a2-directions-poste-banque`). Plutôt que de laisser cette piste
    // bien écrite devenir orpheline, elle reçoit ici son propre exercice,
    // dans le thème "transports" qu'elle a toujours eu — même principe
    // que les autres sections de cette banque (copie telle quelle de
    // `track.exercise`, jamais réécrite).
    id: "banque-a2-transports",
    type: "ecoute",
    title: "Écoute libre : transports",
    optional: true,
    activities: [
      {
        id: "banque-a2-transports-activite",
        title: "Transports",
        skillDomain: "comprehension_orale",
        exercises: [
      {
        id: "a2-annonce-gare-perturbation",
        type: "comprehension_orale",
        skillId: "a2-co-annonces-publiques",
        difficulty: "A2",
        instructions: "Écoute l'annonce et réponds aux questions.",
        audioSrc: "/audio/a2/a2-annonce-gare-perturbation.m4a",
        transcript:
          "Mesdames et messieurs, votre attention s'il vous plaît. En raison d'un problème technique, le train numéro huit mille cinq cent quarante-trois à destination de Nantes, prévu à seize heures vingt, est annulé. Les voyageurs sont invités à se présenter au train suivant, à destination de Nantes également, qui partira à dix-sept heures cinq, voie trois, avec leur billet actuel, sans supplément. Pour les personnes ne pouvant pas attendre, un remboursement est possible au guichet d'information, hall principal. Nous vous prions de nous excuser pour la gêne occasionnée.",
        questions: [
                {
                  kind: "vrai_faux",
                  id: "a2-annonce-gare-perturbation-q1",
                  prompt: "Le train de seize heures vingt est simplement en retard.",
                  correctAnswer: false,
                  correction: { correctAnswer: "Faux", explanation: "L'annonce dit qu'il « est annulé », pas seulement retardé." },
                },
                {
                  kind: "qcm",
                  id: "a2-annonce-gare-perturbation-q2",
                  prompt: "Que peuvent faire les voyageurs pressés qui ne veulent pas attendre le train suivant ?",
                  choices: [
                    { id: "a", text: "Prendre un bus" },
                    { id: "b", text: "Se faire rembourser au guichet" },
                    { id: "c", text: "Payer un supplément" },
                  ],
                  correctChoiceId: "b",
                  correction: { correctAnswer: "Se faire rembourser au guichet", explanation: "L'annonce propose : « un remboursement est possible au guichet d'information »." },
                },
                {
                  kind: "qcm",
                  id: "a2-annonce-gare-perturbation-q3",
                  prompt: "À quelle heure et quelle voie part le train de remplacement ?",
                  choices: [
                    { id: "a", text: "17h05, voie 3" },
                    { id: "b", text: "16h20, voie 8" },
                    { id: "c", text: "17h50, voie 3" },
                  ],
                  correctChoiceId: "a",
                  correction: { correctAnswer: "17h05, voie 3", explanation: "L'annonce précise : « partira à dix-sept heures cinq, voie trois »." },
                },
        ],
      },
        ],
      },
    ],
  },
  ],
};
