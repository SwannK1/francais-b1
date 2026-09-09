import type { A2TrackDefinition } from "@/lib/pedagogy/audio/a2/types";

/**
 * Évaluation orale A2 finale — combine 4 documents originaux (distincts des
 * 26 pistes de pratique) pour tester ensemble : repérage d'information
 * (document A), compréhension de détails/reformulation (document B),
 * compréhension globale et intentions évidentes (document C), chronologie
 * simple et inférence élémentaire (document D).
 *
 * Assemblée en `Exam` par `manifest.ts` (même dérivation turns -> transcript
 * / id -> audioSrc que les pistes de pratique) — voir
 * `docs/integration/a2-audio.md` §Évaluation finale pour le raccordement à
 * un futur examen A2 officiel.
 */

export const A2_FINAL_EVAL_META = {
  id: "bilan-a2-comprehension-orale",
  slug: "bilan-a2-comprehension-orale",
  title: "Bilan de compréhension orale A2",
  description:
    "Évaluation finale combinant quatre documents audio originaux (annonce, répondeur, dialogue, récit) pour valider l'ensemble des objectifs d'écoute A2 : repérage d'information, compréhension globale, détails, chronologie simple et intentions évidentes.",
  durationMinutes: 25,
  passingScore: 8,
} as const;

export const A2_FINAL_EVAL_DOCS: A2TrackDefinition[] = [
  {
    id: "bilan-a2-annonce-aeroport",
    theme: "voyages",
    docType: "annonce_aeroport",
    stage: "a2-fin",
    objectif: "Repérage d'information : destination, porte d'embarquement, délai.",
    pace: "Registre d'annonce officielle, débit soutenu mais intelligible.",
    rateWpm: 175,
    gapSeconds: 0,
    turns: [
      {
        voiceId: "voix-d",
        speakerRole: "Narrateur",
        text: "Attention, mesdames et messieurs les passagers du vol Air Régional deux cent huit à destination de Toulouse : embarquement immédiat, porte quatorze. Nous invitons les passagers à se présenter porte quatorze sans attendre, l'embarquement se terminera dans dix minutes.",
      },
    ],
    exercise: {
      id: "bilan-a2-annonce-aeroport",
      skillId: "co-annonces-publiques",
      difficulty: "A2",
      instructions: "Document 1/4 — Écoute l'annonce et réponds aux questions.",
      questions: [
        {
          kind: "qcm",
          id: "bilan-a2-annonce-aeroport-q1",
          prompt: "Quelle est la destination du vol ?",
          choices: [
            { id: "a", text: "Toulouse" },
            { id: "b", text: "Nantes" },
            { id: "c", text: "Lisbonne" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Toulouse", explanation: "L'annonce cite « le vol Air Régional deux cent huit à destination de Toulouse »." },
        },
        {
          kind: "qcm",
          id: "bilan-a2-annonce-aeroport-q2",
          prompt: "À quelle porte faut-il se présenter ?",
          choices: [
            { id: "a", text: "Porte 4" },
            { id: "b", text: "Porte 14" },
            { id: "c", text: "Porte 40" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Porte 14", explanation: "L'annonce répète deux fois « porte quatorze »." },
        },
        {
          kind: "vrai_faux",
          id: "bilan-a2-annonce-aeroport-q3",
          prompt: "L'embarquement va encore durer une heure.",
          correctAnswer: false,
          correction: { correctAnswer: "Faux", explanation: "L'annonce précise : « l'embarquement se terminera dans dix minutes »." },
        },
      ],
    },
  },
  {
    id: "bilan-a2-repondeur-coiffeur",
    theme: "rendez_vous",
    docType: "repondeur",
    stage: "a2-fin",
    objectif: "Compréhension de détails et de reformulation : raison du changement, deux options proposées, action attendue.",
    pace: "Ton professionnel de salon de coiffure, débit régulier.",
    rateWpm: 175,
    gapSeconds: 0,
    turns: [
      {
        voiceId: "voix-f",
        speakerRole: "Salon de coiffure",
        text: "Bonjour, c'est le salon de coiffure Marie Ciseaux. On vous appelle pour votre rendez-vous de mardi quinze à dix heures : notre coiffeuse habituelle est malade, donc nous vous proposons de venir plutôt à quatorze heures le même jour, avec une autre coiffeuse, ou de reporter à jeudi dix heures avec elle. Merci de nous rappeler pour nous dire votre choix.",
      },
    ],
    exercise: {
      id: "bilan-a2-repondeur-coiffeur",
      skillId: "co-annonces-publiques",
      difficulty: "A2",
      instructions: "Document 2/4 — Écoute le message et réponds aux questions.",
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
  },
  {
    id: "bilan-a2-dialogue-patinoire",
    theme: "loisirs",
    docType: "dialogue",
    stage: "a2-fin",
    objectif: "Compréhension globale et intentions évidentes : sujet de la conversation, raison d'une hésitation, décision finale.",
    pace: "Naturel, amical, hésitation puis enthousiasme.",
    rateWpm: 175,
    gapSeconds: 0.45,
    turns: [
      { voiceId: "voix-b", speakerRole: "Ami 1", text: "Dis, ça te dirait de venir avec nous à la patinoire samedi ? On y va à quatre." },
      { voiceId: "voix-c", speakerRole: "Ami 2", text: "Euh, je ne sais pas trop, je n'ai jamais fait de patin à glace, j'ai peur de tomber !" },
      { voiceId: "voix-b", speakerRole: "Ami 1", text: "Ne t'inquiète pas, c'est facile, et puis c'est fait pour rigoler, personne ne va se moquer de toi." },
      { voiceId: "voix-c", speakerRole: "Ami 2", text: "Bon, d'accord, je viens ! Mais toi, tu m'aides à rester debout, hein !" },
      { voiceId: "voix-b", speakerRole: "Ami 1", text: "Promis ! Rendez-vous samedi à quinze heures devant la patinoire, alors." },
    ],
    exercise: {
      id: "bilan-a2-dialogue-patinoire",
      skillId: "co-dialogues-simples",
      difficulty: "A2",
      instructions: "Document 3/4 — Écoute la conversation et réponds aux questions.",
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
  },
  {
    id: "bilan-a2-recit-journee-chronologie",
    theme: "recits",
    docType: "recit_weekend",
    stage: "a2-fin",
    objectif: "Chronologie simple et inférence élémentaire : ordre des événements de la veille, projet probable du lendemain.",
    pace: "Naturel, ton posé d'une narration personnelle.",
    rateWpm: 175,
    gapSeconds: 0,
    turns: [
      {
        voiceId: "voix-c",
        speakerRole: "Narratrice",
        text: "Alors, hier, ma journée a été bien remplie ! D'abord, le matin, j'ai emmené les enfants à l'école, puis je suis allée travailler jusqu'à midi. Là, j'ai déjeuné rapidement avec une collègue. Et l'après-midi, j'ai eu une réunion importante avec mon chef — ça s'est très bien passé, d'ailleurs. Enfin, le soir, je suis allée chercher les enfants, et on a préparé le dîner ensemble. Demain, comme la réunion s'est bien passée, je pense que je vais enfin pouvoir commencer le nouveau projet dont on parlait depuis longtemps.",
      },
    ],
    exercise: {
      id: "bilan-a2-recit-journee-chronologie",
      skillId: "co-annonces-publiques",
      difficulty: "A2",
      instructions: "Document 4/4 — Écoute le récit et réponds aux questions.",
      questions: [
        {
          kind: "qcm",
          id: "bilan-a2-recit-journee-chronologie-q1",
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
          id: "bilan-a2-recit-journee-chronologie-q2",
          prompt: "Qu'a-t-elle fait l'après-midi ?",
          choices: [
            { id: "a", text: "Une réunion avec son chef" },
            { id: "b", text: "Un déjeuner avec une collègue" },
            { id: "c", text: "Aller chercher les enfants" },
          ],
          correctChoiceId: "a",
          correction: { correctAnswer: "Une réunion avec son chef", explanation: "Elle raconte : « l'après-midi, j'ai eu une réunion importante avec mon chef »." },
        },
        {
          kind: "qcm",
          id: "bilan-a2-recit-journee-chronologie-q3",
          prompt: "Que va-t-elle probablement faire demain ?",
          choices: [
            { id: "a", text: "Reprendre ses vacances" },
            { id: "b", text: "Commencer le nouveau projet" },
            { id: "c", text: "Chercher un autre travail" },
          ],
          correctChoiceId: "b",
          correction: { correctAnswer: "Commencer le nouveau projet", explanation: "Elle conclut : « je pense que je vais enfin pouvoir commencer le nouveau projet »." },
        },
      ],
    },
  },
];
