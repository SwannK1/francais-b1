import type { A1AudioTrack } from "@/lib/pedagogy/audio/a1/types";
import { A1_PACE_WPM } from "@/lib/pedagogy/audio/a1/voices";

/**
 * Manifest de la bibliothèque audio A1 — 65 pistes couvrant les situations
 * de compréhension orale attendues en fin de A1 (voir
 * docs/integration/a1-audio.md §Objectifs pour la liste complète).
 *
 * Contenu isolé à dessein : aucune dépendance vers `lib/pedagogy/data`
 * (chantier « contenu A1 » en cours en parallèle) ni vers le manifest B1
 * (`lib/pedagogy/audio/manifest.ts`). Ce fichier est la seule source de
 * vérité pour le contenu audio A1 tant que le raccordement au parcours
 * central n'est pas fait.
 *
 * `turns` sert à la fois de script de synthèse (consommé par
 * `scripts/a1-audio/generate.mjs`) et de source du transcript affiché
 * (`formatA1Transcript`, types.ts) — un seul et même texte, jamais
 * retranscrit à la main.
 */

const RATE = A1_PACE_WPM;

// ---------------------------------------------------------------------------
// 1. Salutations (4 pistes)
// ---------------------------------------------------------------------------

const salutations: A1AudioTrack[] = [
  {
    id: "a1-salutations-bonjour-matin",
    theme: "salutations",
    skillLabel: "Saluer selon le moment de la journée",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Alors, le matin, on dit : « Bonjour ! » [[slnc 500]] L'après-midi, on dit aussi : « Bonjour ! » [[slnc 500]] Le soir, on dit : « Bonsoir ! » [[slnc 500]] Et très tard le soir, avant de dormir, on dit : « Bonne nuit ! »",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Que dit-on avant de dormir ?",
        choices: [
          { id: "a", text: "Bonjour" },
          { id: "b", text: "Bonne nuit" },
          { id: "c", text: "Bonsoir" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Bonne nuit", explanation: "« Bonne nuit » se dit juste avant d'aller dormir, pas simplement le soir." },
      },
    ],
    locale: "fr-FR",
    filename: "bonjour-matin.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
  {
    id: "a1-salutations-se-presenter",
    theme: "salutations",
    skillLabel: "Se présenter à quelqu'un qu'on rencontre",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    intention: "Première rencontre, simple et souriante.",
    speakers: [
      { role: "Marc", voice: "thomas" },
      { role: "Léa", voice: "flo" },
    ],
    turns: [
      { speaker: "Marc", text: "Bonjour ! Je m'appelle Marc." },
      { speaker: "Léa", text: "Bonjour Marc. Moi, c'est Léa." },
      { speaker: "Marc", text: "Enchanté, Léa !" },
      { speaker: "Léa", text: "Enchantée aussi !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Comment s'appelle la femme ?",
        choices: [
          { id: "a", text: "Léa" },
          { id: "b", text: "Marc" },
          { id: "c", text: "Nadia" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Léa", explanation: "Elle dit : « Moi, c'est Léa »." },
      },
    ],
    locale: "fr-FR",
    filename: "se-presenter.m4a",
    approxDurationSeconds: 12,
    premium: false,
  },
  {
    id: "a1-salutations-comment-ca-va",
    theme: "salutations",
    skillLabel: "Demander et dire comment on va",
    kind: "dialogue",
    level: "A1.1",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Karim", text: "Salut Nadia ! Ça va ?" },
      { speaker: "Nadia", text: "Ça va bien, merci ! Et toi ?" },
      { speaker: "Karim", text: "Ça va, merci. Un peu fatigué, mais ça va." },
      { speaker: "Nadia", text: "Ah bon, pourquoi tu es fatigué ?" },
      { speaker: "Karim", text: "J'ai beaucoup travaillé cette semaine..." },
      { speaker: "Nadia", text: "Je comprends. Repose-toi bien ce week-end !" },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Karim est très en forme.",
        correctAnswer: false,
        correction: { correctAnswer: "Faux", explanation: "Karim dit qu'il est « un peu fatigué »." },
      },
    ],
    locale: "fr-FR",
    filename: "comment-ca-va.m4a",
    approxDurationSeconds: 21,
    premium: false,
  },
  {
    id: "a1-salutations-au-revoir",
    theme: "salutations",
    skillLabel: "Prendre congé et proposer de se revoir",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    intention: "Fin de journée entre collègues devenus amis, chaleureuse.",
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Marc", voice: "thomas" },
    ],
    turns: [
      { speaker: "Sophie", text: "Bon, je dois y aller, Marc ! À bientôt." },
      { speaker: "Marc", text: "À bientôt, Sophie ! On se voit quand ?" },
      { speaker: "Sophie", text: "On peut se voir jeudi, si tu veux ?" },
      { speaker: "Marc", text: "Jeudi, ça marche pour moi. Bonne soirée !" },
      { speaker: "Sophie", text: "Merci, toi aussi ! À jeudi." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel jour Sophie et Marc vont-ils se revoir ?",
        choices: [
          { id: "a", text: "Mardi" },
          { id: "b", text: "Jeudi" },
          { id: "c", text: "Samedi" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Jeudi", explanation: "Sophie propose jeudi et Marc accepte." },
      },
    ],
    locale: "fr-FR",
    filename: "au-revoir.m4a",
    approxDurationSeconds: 19,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 2. Présentations (4 pistes)
// ---------------------------------------------------------------------------

const presentations: A1AudioTrack[] = [
  {
    id: "a1-presentations-nom-age",
    theme: "presentations",
    skillLabel: "Se présenter : nom, âge, ville",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Léa", voice: "flo" }],
    turns: [
      { speaker: "Léa", text: "Bonjour ! [[slnc 400]] Je m'appelle Léa, [[slnc 300]] j'ai vingt-cinq ans, [[slnc 300]] et j'habite à Lyon." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel âge a Léa ?",
        choices: [
          { id: "a", text: "Vingt ans" },
          { id: "b", text: "Vingt-cinq ans" },
          { id: "c", text: "Vingt-huit ans" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Vingt-cinq ans", explanation: "Elle dit clairement : « J'ai vingt-cinq ans »." },
      },
    ],
    locale: "fr-FR",
    filename: "nom-age.m4a",
    approxDurationSeconds: 10,
    premium: false,
  },
  {
    id: "a1-presentations-nationalite",
    theme: "presentations",
    skillLabel: "Dire sa nationalité et son origine",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Karim", text: "Tu es française, Nadia ?" },
      { speaker: "Nadia", text: "Non, je suis marocaine. Et toi ?" },
      { speaker: "Karim", text: "Moi, je suis tunisien... j'habite en France depuis deux ans." },
      { speaker: "Nadia", text: "Ah, moi aussi ! J'habite en France depuis deux ans." },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Nadia est française.",
        correctAnswer: false,
        correction: { correctAnswer: "Faux", explanation: "Nadia dit : « Je suis marocaine »." },
      },
    ],
    locale: "fr-FR",
    filename: "nationalite.m4a",
    approxDurationSeconds: 18,
    premium: false,
  },
  {
    id: "a1-presentations-profession",
    theme: "presentations",
    skillLabel: "Parler de sa profession",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Marc", voice: "thomas" },
      { role: "Sophie", voice: "sandy" },
    ],
    turns: [
      { speaker: "Marc", text: "Tu travailles où, Sophie ?" },
      { speaker: "Sophie", text: "Je suis infirmière, dans un hôpital à Paris. Et toi ?" },
      { speaker: "Marc", text: "Moi, je suis professeur d'anglais dans un collège." },
      { speaker: "Sophie", text: "Ah, c'est intéressant ! Tu aimes ton travail ?" },
      { speaker: "Marc", text: "Oui, beaucoup. Et toi, ton travail à l'hôpital ?" },
      { speaker: "Sophie", text: "C'est fatigant, mais j'aime beaucoup aider les gens." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quelle est la profession de Marc ?",
        choices: [
          { id: "a", text: "Infirmier" },
          { id: "b", text: "Professeur" },
          { id: "c", text: "Médecin" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Professeur", explanation: "Marc dit : « Je suis professeur d'anglais »." },
      },
    ],
    locale: "fr-FR",
    filename: "profession.m4a",
    approxDurationSeconds: 20,
    premium: false,
  },
  {
    id: "a1-presentations-etudiant",
    theme: "presentations",
    skillLabel: "Se présenter en classe (reformulation)",
    kind: "monologue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Sophie", voice: "sandy" }],
    turns: [
      {
        speaker: "Sophie",
        text: "Bonjour à tous ! Je me présente : je m'appelle Sophie, j'ai vingt-neuf ans. Je suis canadienne, je viens de Montréal, et j'apprends le français depuis six mois maintenant. En fait, j'apprends le français parce que je vais travailler en France l'année prochaine. Et mes loisirs préférés, ce sont la lecture et la natation.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Pourquoi Sophie apprend le français ?",
        choices: [
          { id: "a", text: "Pour voyager" },
          { id: "b", text: "Pour travailler en France" },
          { id: "c", text: "Pour ses études" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Pour travailler en France", explanation: "Elle dit : « je vais travailler en France l'année prochaine »." },
      },
      {
        kind: "vrai_faux",
        id: "q2",
        prompt: "Sophie aime la natation.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "Elle cite « la lecture et la natation » comme loisirs préférés." },
      },
    ],
    locale: "fr-FR",
    filename: "etudiant.m4a",
    approxDurationSeconds: 27,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 3. Nombres et téléphone (4 pistes)
// ---------------------------------------------------------------------------

const nombresTelephone: A1AudioTrack[] = [
  {
    id: "a1-nombres-compter-dix",
    theme: "nombres-telephone",
    skillLabel: "Comprendre les nombres de 1 à 10",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      { speaker: "Narrateur", text: "Un, [[slnc 300]] deux, [[slnc 300]] trois, [[slnc 300]] quatre, [[slnc 300]] cinq, [[slnc 300]] six, [[slnc 300]] sept, [[slnc 300]] huit, [[slnc 300]] neuf, [[slnc 300]] dix." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel nombre vient juste après « sept » ?",
        choices: [
          { id: "a", text: "Six" },
          { id: "b", text: "Huit" },
          { id: "c", text: "Neuf" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Huit", explanation: "L'ordre est : ... six, sept, huit, neuf, dix." },
      },
    ],
    locale: "fr-FR",
    filename: "compter-dix.m4a",
    approxDurationSeconds: 12,
    premium: false,
  },
  {
    id: "a1-nombres-numero-telephone",
    theme: "nombres-telephone",
    skillLabel: "Comprendre un numéro de téléphone donné à l'oral",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Karim", text: "Je peux avoir ton numéro de téléphone ?" },
      { speaker: "Nadia", text: "Oui, bien sûr ! C'est le zéro-six, [[slnc 300]] douze, [[slnc 300]] vingt-quatre, [[slnc 300]] trente-six, [[slnc 300]] quarante-huit." },
      { speaker: "Karim", text: "Zéro-six, douze, vingt-quatre, trente-six, quarante-huit... c'est ça ?" },
      { speaker: "Nadia", text: "Oui, exactement !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel est le numéro de Nadia ?",
        choices: [
          { id: "a", text: "06 12 24 36 48" },
          { id: "b", text: "06 12 34 56 78" },
          { id: "c", text: "06 21 24 36 48" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "06 12 24 36 48", explanation: "Nadia épelle : zéro-six, douze, vingt-quatre, trente-six, quarante-huit." },
      },
    ],
    locale: "fr-FR",
    filename: "numero-telephone.m4a",
    approxDurationSeconds: 24,
    premium: false,
  },
  {
    id: "a1-nombres-code-porte",
    theme: "nombres-telephone",
    skillLabel: "Comprendre un code donné chiffre par chiffre",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      { speaker: "Narrateur", text: "Le code de la porte est : [[slnc 400]] trois, [[slnc 300]] sept, [[slnc 300]] neuf, [[slnc 300]] deux. [[slnc 500]] Je répète : [[slnc 400]] trois, [[slnc 300]] sept, [[slnc 300]] neuf, [[slnc 300]] deux." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel est le code de la porte ?",
        choices: [
          { id: "a", text: "3792" },
          { id: "b", text: "3972" },
          { id: "c", text: "7392" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "3792", explanation: "Le code est répété deux fois de façon identique : trois, sept, neuf, deux." },
      },
    ],
    locale: "fr-FR",
    filename: "code-porte.m4a",
    approxDurationSeconds: 14,
    premium: false,
  },
  {
    id: "a1-nombres-repondeur-numero",
    theme: "nombres-telephone",
    skillLabel: "Comprendre un numéro laissé sur répondeur",
    kind: "message_vocal",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Sophie", voice: "sandy" }],
    turns: [
      {
        speaker: "Sophie",
        text: "Bonjour, c'est Sophie ! Je vous appelle pour le rendez-vous de demain. Vous pouvez me rappeler au zéro-sept, quatre-vingt-neuf, quinze, vingt-deux, soixante. Merci, à bientôt !",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel est le numéro laissé par Sophie ?",
        choices: [
          { id: "a", text: "07 89 15 22 60" },
          { id: "b", text: "07 98 15 22 60" },
          { id: "c", text: "07 89 51 22 60" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "07 89 15 22 60", explanation: "Sophie dit : zéro-sept, quatre-vingt-neuf, quinze, vingt-deux, soixante." },
      },
    ],
    locale: "fr-FR",
    filename: "repondeur-numero.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 4. Dates et heures (4 pistes)
// ---------------------------------------------------------------------------

const datesHeures: A1AudioTrack[] = [
  {
    id: "a1-dates-jours-semaine",
    theme: "dates-heures",
    skillLabel: "Connaître les jours de la semaine",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      { speaker: "Narrateur", text: "Lundi, [[slnc 300]] mardi, [[slnc 300]] mercredi, [[slnc 300]] jeudi, [[slnc 300]] vendredi : [[slnc 400]] ce sont les jours de travail. [[slnc 500]] Samedi et dimanche : [[slnc 400]] c'est le week-end." },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Le week-end, ce sont samedi et dimanche.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "Le narrateur le dit directement." },
      },
    ],
    locale: "fr-FR",
    filename: "jours-semaine.m4a",
    approxDurationSeconds: 13,
    premium: false,
  },
  {
    id: "a1-dates-quelle-heure",
    theme: "dates-heures",
    skillLabel: "Demander et donner l'heure",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Marc", voice: "thomas" },
      { role: "Léa", voice: "flo" },
    ],
    turns: [
      { speaker: "Marc", text: "Excuse-moi, Léa, tu as l'heure ?" },
      { speaker: "Léa", text: "Oui ! Il est dix heures et quart." },
      { speaker: "Marc", text: "Dix heures et quart... merci beaucoup !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quelle heure est-il ?",
        choices: [
          { id: "a", text: "10h00" },
          { id: "b", text: "10h15" },
          { id: "c", text: "10h45" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "10h15", explanation: "« Dix heures et quart » signifie dix heures quinze." },
      },
    ],
    locale: "fr-FR",
    filename: "quelle-heure.m4a",
    approxDurationSeconds: 10,
    premium: false,
  },
  {
    id: "a1-dates-anniversaire",
    theme: "dates-heures",
    skillLabel: "Comprendre une date d'anniversaire",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Karim", text: "C'est quand, ton anniversaire, Nadia ?" },
      { speaker: "Nadia", text: "C'est le douze mars. Et toi ?" },
      { speaker: "Karim", text: "Moi, c'est le vingt-cinq octobre. On fête ça ensemble, cette année ?" },
      { speaker: "Nadia", text: "Avec plaisir ! Le douze mars, tu es libre ?" },
      { speaker: "Karim", text: "Oui, je note dans mon agenda." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quand est l'anniversaire de Nadia ?",
        choices: [
          { id: "a", text: "Le 12 mars" },
          { id: "b", text: "Le 25 octobre" },
          { id: "c", text: "Le 21 mars" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Le 12 mars", explanation: "Nadia dit : « C'est le douze mars »." },
      },
    ],
    locale: "fr-FR",
    filename: "anniversaire.m4a",
    approxDurationSeconds: 17,
    premium: false,
  },
  {
    id: "a1-dates-horaires-magasin",
    theme: "dates-heures",
    skillLabel: "Comprendre des horaires d'ouverture annoncés",
    kind: "annonce",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Le magasin est ouvert du lundi au samedi, de neuf heures à dix-neuf heures. Le dimanche, le magasin est fermé. Et pendant la pause déjeuner, de midi à quatorze heures, le magasin reste ouvert.",
      },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Le magasin est fermé le dimanche.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "L'annonce dit : « Le dimanche, le magasin est fermé »." },
      },
    ],
    locale: "fr-FR",
    filename: "horaires-magasin.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 5. Prix et achats (4 pistes)
// ---------------------------------------------------------------------------

const prixAchats: A1AudioTrack[] = [
  {
    id: "a1-prix-au-marche",
    theme: "prix-achats",
    skillLabel: "Demander et comprendre un prix au marché",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Léa", voice: "flo" },
      { role: "Vendeur", voice: "thomas" },
    ],
    turns: [
      { speaker: "Léa", text: "Bonjour, c'est combien, les pommes ?" },
      { speaker: "Vendeur", text: "C'est deux euros le kilo." },
      { speaker: "Léa", text: "D'accord, un kilo, s'il vous plaît." },
      { speaker: "Vendeur", text: "Voilà. Ça fait deux euros." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Combien coûte un kilo de pommes ?",
        choices: [
          { id: "a", text: "1 euro" },
          { id: "b", text: "2 euros" },
          { id: "c", text: "3 euros" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "2 euros", explanation: "Le vendeur dit : « C'est deux euros le kilo »." },
      },
    ],
    locale: "fr-FR",
    filename: "au-marche.m4a",
    approxDurationSeconds: 12,
    premium: false,
  },
  {
    id: "a1-prix-a-la-boulangerie",
    theme: "prix-achats",
    skillLabel: "Acheter du pain et comprendre le total",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Marc", voice: "thomas" },
      { role: "Vendeuse", voice: "flo" },
    ],
    turns: [
      { speaker: "Marc", text: "Bonjour ! Une baguette, s'il vous plaît." },
      { speaker: "Vendeuse", text: "Voilà. Et avec ça ?" },
      { speaker: "Marc", text: "Un croissant aussi, s'il vous plaît." },
      { speaker: "Vendeuse", text: "D'accord, ça fait deux euros cinquante." },
      { speaker: "Marc", text: "Voilà, merci !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Combien Marc paie-t-il en tout ?",
        choices: [
          { id: "a", text: "2 euros" },
          { id: "b", text: "2,50 euros" },
          { id: "c", text: "5 euros" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "2,50 euros", explanation: "La vendeuse dit : « Ça fait deux euros cinquante »." },
      },
    ],
    locale: "fr-FR",
    filename: "a-la-boulangerie.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
  {
    id: "a1-prix-vetements-taille",
    theme: "prix-achats",
    skillLabel: "Essayer un vêtement : taille et prix",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Vendeuse", voice: "shelley" },
    ],
    turns: [
      { speaker: "Sophie", text: "Bonjour ! Je cherche cette robe, en taille 38, vous auriez ça ?" },
      { speaker: "Vendeuse", text: "Alors, je vais regarder... Oui, j'en ai une en 38 ! Vous voulez l'essayer ?" },
      { speaker: "Sophie", text: "Oui, avec plaisir. Elle coûte combien ?" },
      { speaker: "Vendeuse", text: "Elle est à quarante-cinq euros. La cabine d'essayage est juste là-bas." },
      { speaker: "Sophie", text: "D'accord, merci beaucoup !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel prix a la robe ?",
        choices: [
          { id: "a", text: "35 euros" },
          { id: "b", text: "38 euros" },
          { id: "c", text: "45 euros" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "45 euros", explanation: "La vendeuse dit : « Elle est à quarante-cinq euros »." },
      },
    ],
    locale: "fr-FR",
    filename: "vetements-taille.m4a",
    approxDurationSeconds: 27,
    premium: false,
  },
  {
    id: "a1-prix-caisse-supermarche",
    theme: "prix-achats",
    skillLabel: "Comprendre un total à la caisse et le mode de paiement",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Caissière", voice: "flo" },
    ],
    turns: [
      { speaker: "Caissière", text: "Bonjour ! Alors, ça fait dix-huit euros quatre-vingt-dix en tout." },
      { speaker: "Karim", text: "D'accord. Je peux payer par carte ?" },
      { speaker: "Caissière", text: "Oui, bien sûr, vous pouvez insérer votre carte." },
      { speaker: "Karim", text: "Voilà, c'est fait." },
      { speaker: "Caissière", text: "Merci, voici votre ticket. Bonne journée !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Comment Karim paie-t-il ?",
        choices: [
          { id: "a", text: "En espèces" },
          { id: "b", text: "Par carte" },
          { id: "c", text: "Par chèque" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Par carte", explanation: "Karim demande à payer « par carte » et la caissière accepte." },
      },
    ],
    locale: "fr-FR",
    filename: "caisse-supermarche.m4a",
    approxDurationSeconds: 20,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 6. Famille (4 pistes)
// ---------------------------------------------------------------------------

const famille: A1AudioTrack[] = [
  {
    id: "a1-famille-presenter-photo",
    theme: "famille",
    skillLabel: "Présenter sa famille à partir d'une photo",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Léa", voice: "flo" }],
    turns: [
      { speaker: "Léa", text: "Voici ma famille ! [[slnc 400]] Alors, ça c'est mon père, il s'appelle Paul. [[slnc 400]] Ma mère, elle, elle s'appelle Anne. [[slnc 400]] Et voici mon frère, il s'appelle Hugo." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Comment s'appelle le frère de Léa ?",
        choices: [
          { id: "a", text: "Paul" },
          { id: "b", text: "Hugo" },
          { id: "c", text: "Marc" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Hugo", explanation: "Léa dit : « voici mon frère, il s'appelle Hugo »." },
      },
    ],
    locale: "fr-FR",
    filename: "presenter-photo.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
  {
    id: "a1-famille-mamie-papi",
    theme: "famille",
    skillLabel: "Comprendre une conversation entre grands-parents",
    kind: "dialogue",
    level: "A1.1",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    intention: "Grands-parents qui attendent la visite de leurs petits-enfants, ton tendre.",
    speakers: [
      { role: "Mamie", voice: "grandma" },
      { role: "Papi", voice: "grandpa" },
    ],
    turns: [
      { speaker: "Mamie", text: "Les enfants arrivent à quelle heure, samedi ?" },
      { speaker: "Papi", text: "Ils arrivent vers onze heures, avec les petits." },
      { speaker: "Mamie", text: "Parfait, je vais préparer un gâteau au chocolat." },
      { speaker: "Papi", text: "Bonne idée, les petits-enfants adorent ça !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "À quelle heure arrivent les enfants samedi ?",
        choices: [
          { id: "a", text: "Neuf heures" },
          { id: "b", text: "Onze heures" },
          { id: "c", text: "Midi" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Onze heures", explanation: "Papi dit : « Ils arrivent vers onze heures »." },
      },
    ],
    locale: "fr-FR",
    filename: "mamie-papi.m4a",
    approxDurationSeconds: 15,
    premium: false,
  },
  {
    id: "a1-famille-combien-enfants",
    theme: "famille",
    skillLabel: "Parler du nombre de frères et sœurs",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Nadia", voice: "shelley" },
      { role: "Karim", voice: "jacques" },
    ],
    turns: [
      { speaker: "Nadia", text: "Tu as des frères et sœurs, Karim ?" },
      { speaker: "Karim", text: "Oui, j'ai deux sœurs et un frère. Je suis le plus jeune. Et toi ?" },
      { speaker: "Nadia", text: "Moi, je n'ai qu'une sœur, plus âgée que moi." },
      { speaker: "Karim", text: "Vous êtes proches ?" },
      { speaker: "Nadia", text: "Oui, très proches. On se voit chaque semaine." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Combien de frères et sœurs a Karim ?",
        choices: [
          { id: "a", text: "Deux" },
          { id: "b", text: "Trois" },
          { id: "c", text: "Un" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Trois", explanation: "Karim dit : « j'ai deux sœurs et un frère », donc trois en tout." },
      },
    ],
    locale: "fr-FR",
    filename: "combien-enfants.m4a",
    approxDurationSeconds: 18,
    premium: false,
  },
  {
    id: "a1-famille-reunion-dimanche",
    theme: "famille",
    skillLabel: "Comprendre l'organisation d'un déjeuner de famille",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    intention: "Organisation d'un repas de famille dominical avec plusieurs membres cités.",
    speakers: [
      { role: "Mamie", voice: "grandma" },
      { role: "Papi", voice: "grandpa" },
    ],
    turns: [
      { speaker: "Mamie", text: "Alors, pour dimanche : qui vient déjeuner ?" },
      { speaker: "Papi", text: "Notre fille Anne vient avec son mari et leurs deux enfants." },
      { speaker: "Mamie", text: "Et notre fils Paul, il vient aussi ?" },
      { speaker: "Papi", text: "Non, il travaille dimanche. Il viendra la semaine prochaine." },
      { speaker: "Mamie", text: "D'accord. Alors nous serons six à table." },
      { speaker: "Papi", text: "Oui, six. Je vais sortir la grande table." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Pourquoi Paul ne vient-il pas dimanche ?",
        choices: [
          { id: "a", text: "Il est malade" },
          { id: "b", text: "Il travaille" },
          { id: "c", text: "Il est en voyage" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Il travaille", explanation: "Papi dit : « Non, il travaille dimanche »." },
      },
      {
        kind: "vrai_faux",
        id: "q2",
        prompt: "Ils seront six à table.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "Mamie conclut : « nous serons six à table »." },
      },
    ],
    locale: "fr-FR",
    filename: "reunion-dimanche.m4a",
    approxDurationSeconds: 24,
    premium: true,
  },
];

// ---------------------------------------------------------------------------
// 7. Description (3 pistes)
// ---------------------------------------------------------------------------

const description: A1AudioTrack[] = [
  {
    id: "a1-description-physique-ami",
    theme: "description",
    skillLabel: "Décrire l'apparence physique de quelqu'un",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Marc", voice: "thomas" }],
    turns: [
      { speaker: "Marc", text: "Mon ami Karim, il est grand. [[slnc 400]] Il a les cheveux courts et noirs, [[slnc 300]] et il porte souvent des lunettes." },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Karim a les cheveux longs.",
        correctAnswer: false,
        correction: { correctAnswer: "Faux", explanation: "Marc dit : « Il a les cheveux courts et noirs »." },
      },
    ],
    locale: "fr-FR",
    filename: "physique-ami.m4a",
    approxDurationSeconds: 8,
    premium: false,
  },
  {
    id: "a1-description-personnalite",
    theme: "description",
    skillLabel: "Décrire le caractère d'une personne",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Léa", voice: "flo" },
    ],
    turns: [
      { speaker: "Sophie", text: "Comment est ton nouveau collègue, Léa ?" },
      { speaker: "Léa", text: "Il s'appelle Thomas. Il est très gentil et patient." },
      { speaker: "Sophie", text: "Il parle beaucoup ?" },
      { speaker: "Léa", text: "Non, il est plutôt calme et discret. Mais il est toujours souriant." },
      { speaker: "Sophie", text: "Il a l'air sympa !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Comment est Thomas, selon Léa ?",
        choices: [
          { id: "a", text: "Bavard et stressé" },
          { id: "b", text: "Gentil et calme" },
          { id: "c", text: "Timide et triste" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Gentil et calme", explanation: "Léa le décrit comme « gentil et patient », « calme et discret »." },
      },
    ],
    locale: "fr-FR",
    filename: "personnalite.m4a",
    approxDurationSeconds: 17,
    premium: false,
  },
  {
    id: "a1-description-vetements-aujourdhui",
    theme: "description",
    skillLabel: "Décrire une tenue vestimentaire",
    kind: "monologue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Aujourd'hui, Nadia porte une robe bleue et une veste blanche. Elle a aussi des chaussures noires et un petit sac marron.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "De quelle couleur est la robe de Nadia ?",
        choices: [
          { id: "a", text: "Blanche" },
          { id: "b", text: "Bleue" },
          { id: "c", text: "Noire" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Bleue", explanation: "Le texte dit : « une robe bleue »." },
      },
    ],
    locale: "fr-FR",
    filename: "vetements-aujourdhui.m4a",
    approxDurationSeconds: 13,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 8. Café / restaurant (4 pistes)
// ---------------------------------------------------------------------------

const cafeRestaurant: A1AudioTrack[] = [
  {
    id: "a1-cafe-commande-simple",
    theme: "cafe-restaurant",
    skillLabel: "Commander une boisson simple au café",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Serveur", voice: "thomas" },
    ],
    turns: [
      { speaker: "Serveur", text: "Bonjour ! Qu'est-ce que je vous sers ?" },
      { speaker: "Karim", text: "Un café, s'il vous plaît." },
      { speaker: "Serveur", text: "Un café, très bien !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Que commande Karim ?",
        choices: [
          { id: "a", text: "Un thé" },
          { id: "b", text: "Un café" },
          { id: "c", text: "Un jus d'orange" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Un café", explanation: "Karim dit : « Un café, s'il vous plaît »." },
      },
    ],
    locale: "fr-FR",
    filename: "commande-simple.m4a",
    approxDurationSeconds: 8,
    premium: false,
  },
  {
    id: "a1-cafe-serveur-question",
    theme: "cafe-restaurant",
    skillLabel: "Comprendre une question sur ce qu'on souhaite boire",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Serveuse", voice: "flo" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Serveuse", text: "Bonjour madame, vous voulez boire quelque chose ?" },
      { speaker: "Nadia", text: "Oui, un thé à la menthe, s'il vous plaît." },
      { speaker: "Serveuse", text: "Chaud ou glacé ?" },
      { speaker: "Nadia", text: "Chaud, merci." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Comment Nadia veut-elle son thé ?",
        choices: [
          { id: "a", text: "Glacé" },
          { id: "b", text: "Chaud" },
          { id: "c", text: "Avec du sucre" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Chaud", explanation: "Nadia répond : « Chaud, merci »." },
      },
    ],
    locale: "fr-FR",
    filename: "serveur-question.m4a",
    approxDurationSeconds: 11,
    premium: false,
  },
  {
    id: "a1-cafe-restaurant-menu",
    theme: "cafe-restaurant",
    skillLabel: "Commander un plat au restaurant",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Marc", voice: "thomas" },
      { role: "Sophie", voice: "sandy" },
      { role: "Serveuse", voice: "shelley" },
    ],
    turns: [
      { speaker: "Serveuse", text: "Bonjour, vous avez choisi ?" },
      { speaker: "Marc", text: "Oui, pour moi, le poulet avec des frites." },
      { speaker: "Sophie", text: "Et moi, la salade de chèvre chaud, s'il vous plaît." },
      { speaker: "Serveuse", text: "Très bien. Et à boire ?" },
      { speaker: "Marc", text: "Une carafe d'eau, ça suffira." },
      { speaker: "Serveuse", text: "Parfait, je vous apporte ça." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Que commande Sophie ?",
        choices: [
          { id: "a", text: "Le poulet-frites" },
          { id: "b", text: "La salade de chèvre chaud" },
          { id: "c", text: "Une soupe" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "La salade de chèvre chaud", explanation: "Sophie dit : « la salade de chèvre chaud, s'il vous plaît »." },
      },
    ],
    locale: "fr-FR",
    filename: "restaurant-menu.m4a",
    approxDurationSeconds: 20,
    premium: false,
  },
  {
    id: "a1-cafe-addition",
    theme: "cafe-restaurant",
    skillLabel: "Demander l'addition et comprendre comment payer",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
      { role: "Serveur", voice: "thomas" },
    ],
    turns: [
      { speaker: "Karim", text: "L'addition, s'il vous plaît." },
      { speaker: "Serveur", text: "Bien sûr. Ça fait vingt-quatre euros en tout." },
      { speaker: "Nadia", text: "On partage, Karim ? Douze euros chacun." },
      { speaker: "Karim", text: "D'accord, pas de problème." },
      { speaker: "Serveur", text: "Vous payez ensemble ou séparément ?" },
      { speaker: "Nadia", text: "Ensemble, par carte." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Combien chaque personne paie-t-elle ?",
        choices: [
          { id: "a", text: "24 euros" },
          { id: "b", text: "12 euros" },
          { id: "c", text: "10 euros" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "12 euros", explanation: "Nadia propose : « Douze euros chacun »." },
      },
    ],
    locale: "fr-FR",
    filename: "addition.m4a",
    approxDurationSeconds: 21,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 9. Petites annonces (3 pistes)
// ---------------------------------------------------------------------------

const petitesAnnonces: A1AudioTrack[] = [
  {
    id: "a1-annonce-appartement-a-louer",
    theme: "petites-annonces",
    skillLabel: "Comprendre une petite annonce immobilière simple",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      { speaker: "Narrateur", text: "À louer : [[slnc 400]] studio, [[slnc 300]] centre-ville, [[slnc 300]] trois cents euros par mois. [[slnc 400]] Téléphone : zéro-un, vingt, trente, quarante, cinquante." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Combien coûte le studio par mois ?",
        choices: [
          { id: "a", text: "200 euros" },
          { id: "b", text: "300 euros" },
          { id: "c", text: "400 euros" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "300 euros", explanation: "L'annonce dit : « trois cents euros par mois »." },
      },
    ],
    locale: "fr-FR",
    filename: "appartement-a-louer.m4a",
    approxDurationSeconds: 14,
    premium: false,
  },
  {
    id: "a1-annonce-recherche-colocataire",
    theme: "petites-annonces",
    skillLabel: "Comprendre une annonce de recherche de colocataire",
    kind: "monologue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Je cherche un colocataire pour un appartement de trois pièces, proche du métro. La chambre fait quinze mètres carrés, et le loyer est de quatre cent cinquante euros, charges comprises. Et l'appartement est disponible à partir du premier septembre.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel est le loyer proposé ?",
        choices: [
          { id: "a", text: "350 euros" },
          { id: "b", text: "450 euros" },
          { id: "c", text: "550 euros" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "450 euros", explanation: "L'annonce précise : « le loyer est de quatre cent cinquante euros »." },
      },
      {
        kind: "vrai_faux",
        id: "q2",
        prompt: "Le loyer inclut les charges.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "L'annonce dit : « charges comprises »." },
      },
    ],
    locale: "fr-FR",
    filename: "recherche-colocataire.m4a",
    approxDurationSeconds: 19,
    premium: false,
  },
  {
    id: "a1-annonce-objet-a-vendre",
    theme: "petites-annonces",
    skillLabel: "Comprendre une annonce de vente d'objet",
    kind: "monologue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Narrateur", voice: "jacques" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "À vendre : vélo bleu, très bon état, utilisé seulement un an. Prix : quatre-vingts euros. Contactez Karim au zéro-six, quinze, vingt-cinq, trente-cinq, quarante-cinq.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "De quelle couleur est le vélo ?",
        choices: [
          { id: "a", text: "Rouge" },
          { id: "b", text: "Bleu" },
          { id: "c", text: "Noir" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Bleu", explanation: "L'annonce dit : « vélo bleu »." },
      },
    ],
    locale: "fr-FR",
    filename: "objet-a-vendre.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 10. Directions (4 pistes)
// ---------------------------------------------------------------------------

const directions: A1AudioTrack[] = [
  {
    id: "a1-directions-tout-droit",
    theme: "directions",
    skillLabel: "Comprendre des indications simples (tout droit, à gauche)",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      { speaker: "Narrateur", text: "Alors, vous allez tout droit, [[slnc 400]] ensuite vous tournez à gauche, [[slnc 400]] et la boulangerie est juste là." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où faut-il tourner ?",
        choices: [
          { id: "a", text: "À droite" },
          { id: "b", text: "À gauche" },
          { id: "c", text: "Tout droit" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "À gauche", explanation: "Le narrateur dit : « tournez à gauche »." },
      },
    ],
    locale: "fr-FR",
    filename: "tout-droit.m4a",
    approxDurationSeconds: 7,
    premium: false,
  },
  {
    id: "a1-directions-demander-son-chemin",
    theme: "directions",
    skillLabel: "Demander son chemin dans la rue",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Marc", voice: "thomas" },
    ],
    turns: [
      { speaker: "Sophie", text: "Excusez-moi, la gare, c'est loin d'ici ?" },
      { speaker: "Marc", text: "Non, c'est tout près : vous continuez tout droit, puis vous tournez à droite." },
      { speaker: "Sophie", text: "D'accord, merci beaucoup !" },
      { speaker: "Marc", text: "Je vous en prie !" },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "La gare est loin.",
        correctAnswer: false,
        correction: { correctAnswer: "Faux", explanation: "Marc dit : « Non, c'est tout près »." },
      },
    ],
    locale: "fr-FR",
    filename: "demander-son-chemin.m4a",
    approxDurationSeconds: 15,
    premium: false,
  },
  {
    id: "a1-directions-metro-changement",
    theme: "directions",
    skillLabel: "Comprendre une explication de changement de métro",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Karim", text: "Comment on va à Bastille, Nadia ?" },
      { speaker: "Nadia", text: "On prend la ligne 1, direction Château de Vincennes." },
      { speaker: "Karim", text: "On doit changer ?" },
      { speaker: "Nadia", text: "Oui, on change à Châtelet, et on prend la ligne 1 jusqu'à Bastille." },
      { speaker: "Karim", text: "D'accord, merci pour l'explication !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où faut-il changer de ligne ?",
        choices: [
          { id: "a", text: "À Bastille" },
          { id: "b", text: "À Châtelet" },
          { id: "c", text: "À Vincennes" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "À Châtelet", explanation: "Nadia dit : « on change à Châtelet »." },
      },
    ],
    locale: "fr-FR",
    filename: "metro-changement.m4a",
    approxDurationSeconds: 19,
    premium: false,
  },
  {
    id: "a1-directions-pharmacie-proche",
    theme: "directions",
    skillLabel: "Demander et suivre plusieurs indications successives",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Léa", voice: "flo" },
    ],
    turns: [
      { speaker: "Sophie", text: "Bonjour, il y a une pharmacie près d'ici ?" },
      { speaker: "Léa", text: "Oui ! Vous prenez la rue en face, puis vous tournez à gauche au feu rouge." },
      { speaker: "Sophie", text: "D'accord : la rue en face, puis à gauche au feu." },
      { speaker: "Léa", text: "C'est ça. Ensuite, la pharmacie est à droite, à côté de la banque." },
      { speaker: "Sophie", text: "Parfait, merci beaucoup pour ces indications !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où est la pharmacie exactement ?",
        choices: [
          { id: "a", text: "À côté de la banque" },
          { id: "b", text: "En face du feu rouge" },
          { id: "c", text: "Devant la gare" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "À côté de la banque", explanation: "Léa dit : « la pharmacie est à droite, à côté de la banque »." },
      },
    ],
    locale: "fr-FR",
    filename: "pharmacie-proche.m4a",
    approxDurationSeconds: 27,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 11. Transports (4 pistes)
// ---------------------------------------------------------------------------

const transports: A1AudioTrack[] = [
  {
    id: "a1-transports-acheter-billet",
    theme: "transports",
    skillLabel: "Acheter un billet de train au guichet",
    kind: "dialogue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [
      { role: "Marc", voice: "thomas" },
      { role: "Employé", voice: "jacques" },
    ],
    turns: [
      { speaker: "Marc", text: "Bonjour, un billet pour Lyon, s'il vous plaît." },
      { speaker: "Employé", text: "Aller simple, ou aller-retour ?" },
      { speaker: "Marc", text: "Aller simple." },
      { speaker: "Employé", text: "D'accord, alors ça fait vingt-cinq euros." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel type de billet Marc achète-t-il ?",
        choices: [
          { id: "a", text: "Aller-retour" },
          { id: "b", text: "Aller simple" },
          { id: "c", text: "Abonnement" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Aller simple", explanation: "Marc répond : « Aller simple »." },
      },
    ],
    locale: "fr-FR",
    filename: "acheter-billet.m4a",
    approxDurationSeconds: 12,
    premium: false,
  },
  {
    id: "a1-transports-annonce-quai",
    theme: "transports",
    skillLabel: "Comprendre une annonce simple de quai",
    kind: "annonce",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      { speaker: "Narrateur", text: "Le train pour Marseille [[slnc 400]] part à quatorze heures, [[slnc 400]] voie trois." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "À quelle voie part le train ?",
        choices: [
          { id: "a", text: "Voie 1" },
          { id: "b", text: "Voie 3" },
          { id: "c", text: "Voie 4" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Voie 3", explanation: "L'annonce dit : « voie trois »." },
      },
    ],
    locale: "fr-FR",
    filename: "annonce-quai.m4a",
    approxDurationSeconds: 9,
    premium: false,
  },
  {
    id: "a1-transports-bus-horaire",
    theme: "transports",
    skillLabel: "Demander l'horaire du prochain bus",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Karim", voice: "jacques" },
      { role: "Nadia", voice: "shelley" },
    ],
    turns: [
      { speaker: "Karim", text: "Le prochain bus passe à quelle heure ?" },
      { speaker: "Nadia", text: "Il passe dans dix minutes, à quinze heures vingt." },
      { speaker: "Karim", text: "Ah, et le suivant, après celui-là ?" },
      { speaker: "Nadia", text: "Le suivant est à quinze heures quarante. Il y a un bus toutes les vingt minutes." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "À quelle heure passe le prochain bus ?",
        choices: [
          { id: "a", text: "15h00" },
          { id: "b", text: "15h20" },
          { id: "c", text: "15h40" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "15h20", explanation: "Nadia dit : « il passe dans dix minutes, à quinze heures vingt »." },
      },
    ],
    locale: "fr-FR",
    filename: "bus-horaire.m4a",
    approxDurationSeconds: 18,
    premium: false,
  },
  {
    id: "a1-transports-retard-train",
    theme: "transports",
    skillLabel: "Comprendre une annonce de retard avec sa raison",
    kind: "annonce",
    level: "A1.2",
    pace: "naturel_soutenu",
    speakingRateWpm: RATE.naturel_soutenu,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Mesdames et messieurs, votre attention s'il vous plaît. Le train à destination de Bordeaux est annoncé avec vingt minutes de retard, en raison d'un problème technique. Nous nous excusons pour la gêne occasionnée.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Pourquoi le train est-il en retard ?",
        choices: [
          { id: "a", text: "À cause de la météo" },
          { id: "b", text: "À cause d'un problème technique" },
          { id: "c", text: "À cause d'une grève" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "À cause d'un problème technique", explanation: "L'annonce dit : « en raison d'un problème technique »." },
      },
    ],
    locale: "fr-FR",
    filename: "retard-train.m4a",
    approxDurationSeconds: 15,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 12. Météo (3 pistes)
// ---------------------------------------------------------------------------

const meteo: A1AudioTrack[] = [
  {
    id: "a1-meteo-aujourdhui",
    theme: "meteo",
    skillLabel: "Comprendre une météo du jour très simple",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      { speaker: "Narrateur", text: "Aujourd'hui, [[slnc 400]] il fait beau [[slnc 400]] et il fait chaud." },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Il pleut aujourd'hui.",
        correctAnswer: false,
        correction: { correctAnswer: "Faux", explanation: "Le narrateur annonce : « il fait beau »." },
      },
    ],
    locale: "fr-FR",
    filename: "aujourdhui.m4a",
    approxDurationSeconds: 8,
    premium: false,
  },
  {
    id: "a1-meteo-semaine",
    theme: "meteo",
    skillLabel: "Comprendre des prévisions sur plusieurs jours",
    kind: "monologue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Narrateur", voice: "shelley" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Voici la météo de la semaine. Lundi, il y a du soleil. Mardi et mercredi, il pleut un peu. Jeudi, le temps est nuageux. Et vendredi, le soleil revient pour le week-end.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel temps fait-il mardi ?",
        choices: [
          { id: "a", text: "Il fait soleil" },
          { id: "b", text: "Il pleut" },
          { id: "c", text: "C'est nuageux" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Il pleut", explanation: "Le texte dit : « Mardi et mercredi, il pleut un peu »." },
      },
    ],
    locale: "fr-FR",
    filename: "semaine.m4a",
    approxDurationSeconds: 18,
    premium: false,
  },
  {
    id: "a1-meteo-dialogue-sortie",
    theme: "meteo",
    skillLabel: "Décider d'une activité selon la météo",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Léa", voice: "flo" },
      { role: "Marc", voice: "thomas" },
    ],
    turns: [
      { speaker: "Léa", text: "On sort se promener cet après-midi ?" },
      { speaker: "Marc", text: "Il fait quel temps ?" },
      { speaker: "Léa", text: "Il pleut un peu maintenant, mais ça va s'arrêter vers seize heures." },
      { speaker: "Marc", text: "Ah bon... alors on peut sortir à seize heures trente, pour être sûrs." },
      { speaker: "Léa", text: "Bonne idée, on se retrouve devant chez toi !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "À quelle heure décident-ils de sortir ?",
        choices: [
          { id: "a", text: "16h00" },
          { id: "b", text: "16h30" },
          { id: "c", text: "17h00" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "16h30", explanation: "Marc propose : « à seize heures trente »." },
      },
    ],
    locale: "fr-FR",
    filename: "dialogue-sortie.m4a",
    approxDurationSeconds: 19,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 13. Quotidien et loisirs (5 pistes)
// ---------------------------------------------------------------------------

const quotidienLoisirs: A1AudioTrack[] = [
  {
    id: "a1-quotidien-routine-matin",
    theme: "quotidien-loisirs",
    skillLabel: "Comprendre une routine matinale simple",
    kind: "monologue",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Léa", voice: "flo" }],
    turns: [
      { speaker: "Léa", text: "Je m'appelle Léa. [[slnc 400]] Le matin, je me lève à sept heures. [[slnc 400]] Je prends une douche, je bois un café, [[slnc 300]] et je pars au travail à huit heures." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "À quelle heure Léa part-elle au travail ?",
        choices: [
          { id: "a", text: "7h00" },
          { id: "b", text: "7h30" },
          { id: "c", text: "8h00" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "8h00", explanation: "Léa dit : « je pars au travail à huit heures »." },
      },
    ],
    locale: "fr-FR",
    filename: "routine-matin.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
  {
    id: "a1-quotidien-week-end-activites",
    theme: "quotidien-loisirs",
    skillLabel: "Parler de ses activités du week-end",
    kind: "dialogue",
    level: "A1.1",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Karim", voice: "jacques" },
    ],
    turns: [
      { speaker: "Sophie", text: "Dis, qu'est-ce que tu fais ce week-end ?" },
      { speaker: "Karim", text: "Samedi, je joue au foot avec des amis. Et toi ?" },
      { speaker: "Sophie", text: "Moi ? Je vais au cinéma samedi soir." },
      { speaker: "Karim", text: "Ah sympa ! Et dimanche ?" },
      { speaker: "Sophie", text: "Dimanche, je me repose, tranquille, à la maison." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Que fait Karim samedi ?",
        choices: [
          { id: "a", text: "Il va au cinéma" },
          { id: "b", text: "Il joue au foot" },
          { id: "c", text: "Il se repose" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Il joue au foot", explanation: "Karim dit : « Samedi, je joue au foot avec des amis »." },
      },
    ],
    locale: "fr-FR",
    filename: "week-end-activites.m4a",
    approxDurationSeconds: 20,
    premium: false,
  },
  {
    id: "a1-quotidien-loisirs-preferes",
    theme: "quotidien-loisirs",
    skillLabel: "Parler de ses loisirs préférés",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Nadia", voice: "shelley" },
      { role: "Marc", voice: "thomas" },
    ],
    turns: [
      { speaker: "Nadia", text: "Qu'est-ce que tu aimes faire pendant ton temps libre, Marc ?" },
      { speaker: "Marc", text: "J'aime beaucoup lire, et aussi jouer de la guitare." },
      { speaker: "Nadia", text: "Ah, tu joues de la guitare depuis longtemps ?" },
      { speaker: "Marc", text: "Depuis trois ans. Et toi, quels sont tes loisirs ?" },
      { speaker: "Nadia", text: "Moi, j'adore la photographie et la randonnée." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel instrument joue Marc ?",
        choices: [
          { id: "a", text: "Le piano" },
          { id: "b", text: "La guitare" },
          { id: "c", text: "Le violon" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "La guitare", explanation: "Marc dit : « jouer de la guitare »." },
      },
    ],
    locale: "fr-FR",
    filename: "loisirs-preferes.m4a",
    approxDurationSeconds: 19,
    premium: false,
  },
  {
    id: "a1-quotidien-sport",
    theme: "quotidien-loisirs",
    skillLabel: "Parler de la fréquence d'une activité sportive",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Léa", voice: "flo" },
      { role: "Sophie", voice: "sandy" },
    ],
    turns: [
      { speaker: "Léa", text: "Tu fais du sport, Sophie ?" },
      { speaker: "Sophie", text: "Oui, je nage deux fois par semaine, le mardi et le jeudi." },
      { speaker: "Léa", text: "Et le week-end, tu fais aussi du sport ?" },
      { speaker: "Sophie", text: "Non, le week-end je me repose. Mais je marche beaucoup." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quels jours Sophie nage-t-elle ?",
        choices: [
          { id: "a", text: "Lundi et mercredi" },
          { id: "b", text: "Mardi et jeudi" },
          { id: "c", text: "Samedi et dimanche" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Mardi et jeudi", explanation: "Sophie dit : « le mardi et le jeudi »." },
      },
    ],
    locale: "fr-FR",
    filename: "sport.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
  {
    id: "a1-quotidien-recit-samedi",
    theme: "quotidien-loisirs",
    skillLabel: "Comprendre un récit simple au passé composé",
    kind: "monologue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Karim", voice: "jacques" }],
    turns: [
      {
        speaker: "Karim",
        text: "Samedi dernier, je me suis levé tard. J'ai pris le petit-déjeuner avec ma sœur. Ensuite, nous sommes allés au marché. L'après-midi, j'ai regardé un film à la maison. C'était une belle journée tranquille.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où Karim est-il allé avec sa sœur ?",
        choices: [
          { id: "a", text: "Au cinéma" },
          { id: "b", text: "Au marché" },
          { id: "c", text: "Au parc" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Au marché", explanation: "Karim dit : « nous sommes allés au marché »." },
      },
    ],
    locale: "fr-FR",
    filename: "recit-samedi.m4a",
    approxDurationSeconds: 20,
    premium: true,
  },
];

// ---------------------------------------------------------------------------
// 14. Rendez-vous (4 pistes)
// ---------------------------------------------------------------------------

const rendezVous: A1AudioTrack[] = [
  {
    // Réécrit par le chantier `audio-humanisation` (voir
    // docs/audio/humanisation-a1-a2-b1.md §6.6) : ce fichier ne servait
    // jusqu'ici qu'à l'exercice `m18-f1` du module "La santé", dont le
    // vocabulaire enseigné (avoir mal à + partie du corps, impératif de
    // conseil médical) n'apparaissait jamais dans l'ancien script (une
    // simple prise de rendez-vous, jour/heure). `id`/`filename` conservés
    // à l'identique (aucun autre exercice ne référence ce fichier).
    id: "a1-rdv-prendre-rendez-vous-medecin",
    theme: "rendez-vous",
    skillLabel: "Comprendre une explication à la pharmacie (douleur, conseil)",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Chloé", voice: "sandy" },
      { role: "Pharmacien", voice: "jacques" },
    ],
    turns: [
      { speaker: "Chloé", text: "Bonjour, j'ai mal à la tête depuis ce matin. Vous avez un médicament ?" },
      { speaker: "Pharmacien", text: "Bonjour ! Oui, j'ai ça. Prenez un comprimé, et reposez-vous un peu." },
      { speaker: "Chloé", text: "D'accord. Et je dois boire beaucoup d'eau aussi ?" },
      { speaker: "Pharmacien", text: "Oui, buvez beaucoup d'eau, c'est important." },
      { speaker: "Chloé", text: "Très bien, merci beaucoup !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où Chloé a-t-elle mal ?",
        choices: [
          { id: "a", text: "Au ventre" },
          { id: "b", text: "À la tête" },
          { id: "c", text: "Aux dents" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "À la tête", explanation: "Chloé dit : « j'ai mal à la tête »." },
      },
      {
        kind: "qcm",
        id: "q2",
        prompt: "En plus du médicament, que conseille le pharmacien ?",
        choices: [
          { id: "a", text: "Aller à l'hôpital" },
          { id: "b", text: "Se reposer et boire de l'eau" },
          { id: "c", text: "Faire du sport" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Se reposer et boire de l'eau", explanation: "Il dit : « reposez-vous un peu » et « buvez beaucoup d'eau »." },
      },
    ],
    locale: "fr-FR",
    filename: "prendre-rendez-vous-medecin.m4a",
    approxDurationSeconds: 23,
    premium: false,
  },
  {
    id: "a1-rdv-rejoindre-un-ami",
    theme: "rendez-vous",
    skillLabel: "Organiser un rendez-vous entre amis (lieu et heure)",
    kind: "dialogue",
    level: "A1.1",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Nadia", voice: "shelley" },
      { role: "Karim", voice: "jacques" },
    ],
    turns: [
      { speaker: "Nadia", text: "On se retrouve où, ce soir ?" },
      { speaker: "Karim", text: "Devant le cinéma, ça te va ?" },
      { speaker: "Nadia", text: "Oui. À quelle heure ?" },
      { speaker: "Karim", text: "À dix-neuf heures trente." },
      { speaker: "Nadia", text: "Parfait, à ce soir !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où se retrouvent-ils ?",
        choices: [
          { id: "a", text: "Devant le cinéma" },
          { id: "b", text: "Au restaurant" },
          { id: "c", text: "Chez Karim" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Devant le cinéma", explanation: "Karim propose : « Devant le cinéma »." },
      },
    ],
    locale: "fr-FR",
    filename: "rejoindre-un-ami.m4a",
    approxDurationSeconds: 14,
    premium: false,
  },
  {
    id: "a1-rdv-annuler-rendez-vous",
    theme: "rendez-vous",
    skillLabel: "Comprendre une annulation et une nouvelle proposition",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Secrétariat", voice: "shelley" },
    ],
    turns: [
      { speaker: "Sophie", text: "Bonjour, je dois annuler mon rendez-vous de jeudi." },
      { speaker: "Secrétariat", text: "Pas de problème. Vous voulez reprendre un autre rendez-vous ?" },
      { speaker: "Sophie", text: "Oui, si possible la semaine prochaine." },
      { speaker: "Secrétariat", text: "Alors, j'ai un créneau lundi prochain à quatorze heures." },
      { speaker: "Sophie", text: "C'est parfait, je le prends !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quand est le nouveau rendez-vous de Sophie ?",
        choices: [
          { id: "a", text: "Jeudi à 14h" },
          { id: "b", text: "Lundi prochain à 14h" },
          { id: "c", text: "Vendredi à 14h" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Lundi prochain à 14h", explanation: "Le secrétariat propose : « lundi prochain à quatorze heures », que Sophie accepte." },
      },
    ],
    locale: "fr-FR",
    filename: "annuler-rendez-vous.m4a",
    approxDurationSeconds: 22,
    premium: false,
  },
  {
    id: "a1-rdv-coiffeur",
    theme: "rendez-vous",
    skillLabel: "Prendre rendez-vous en choisissant parmi plusieurs créneaux",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [
      { role: "Léa", voice: "flo" },
      { role: "Coiffeuse", voice: "shelley" },
    ],
    turns: [
      { speaker: "Léa", text: "Bonjour, je voudrais un rendez-vous pour une coupe de cheveux, s'il vous plaît." },
      { speaker: "Coiffeuse", text: "Bien sûr ! J'ai un créneau mercredi à dix heures, ou vendredi à seize heures." },
      { speaker: "Léa", text: "Vendredi à seize heures, c'est mieux pour moi." },
      { speaker: "Coiffeuse", text: "Parfait, c'est noté. À vendredi !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel créneau Léa choisit-elle ?",
        choices: [
          { id: "a", text: "Mercredi à 10h" },
          { id: "b", text: "Vendredi à 16h" },
          { id: "c", text: "Vendredi à 10h" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Vendredi à 16h", explanation: "Léa dit : « Vendredi à seize heures, c'est mieux pour moi »." },
      },
    ],
    locale: "fr-FR",
    filename: "coiffeur.m4a",
    approxDurationSeconds: 23,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 15. Messages vocaux (4 pistes)
// ---------------------------------------------------------------------------

const messagesVocaux: A1AudioTrack[] = [
  {
    id: "a1-message-absence-bureau",
    theme: "messages-vocaux",
    skillLabel: "Comprendre un message d'absence très simple",
    kind: "message_vocal",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      { speaker: "Narrateur", text: "Bonjour, [[slnc 300]] je suis absente aujourd'hui. [[slnc 400]] Merci de rappeler demain !" },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Il faut rappeler demain.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "Le message dit : « Merci de rappeler demain »." },
      },
    ],
    locale: "fr-FR",
    filename: "absence-bureau.m4a",
    approxDurationSeconds: 8,
    premium: false,
  },
  {
    id: "a1-message-ami-retard",
    theme: "messages-vocaux",
    skillLabel: "Comprendre un message d'un ami en retard",
    kind: "message_vocal",
    level: "A1.1",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Karim", voice: "jacques" }],
    turns: [
      { speaker: "Karim", text: "Salut, c'est Karim. Je suis en retard, désolé. J'arrive dans dix minutes." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Dans combien de temps Karim arrive-t-il ?",
        choices: [
          { id: "a", text: "5 minutes" },
          { id: "b", text: "10 minutes" },
          { id: "c", text: "20 minutes" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "10 minutes", explanation: "Karim dit : « j'arrive dans dix minutes »." },
      },
    ],
    locale: "fr-FR",
    filename: "ami-retard.m4a",
    approxDurationSeconds: 9,
    premium: false,
  },
  {
    id: "a1-message-rappel-rdv",
    theme: "messages-vocaux",
    skillLabel: "Comprendre un rappel de rendez-vous laissé sur répondeur",
    kind: "message_vocal",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Secrétariat", voice: "shelley" }],
    turns: [
      {
        speaker: "Secrétariat",
        text: "Bonjour, c'est le cabinet du docteur Martin. Nous vous rappelons votre rendez-vous demain à neuf heures trente. Merci d'arriver dix minutes avant. Bonne journée !",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "À quelle heure est le rendez-vous ?",
        choices: [
          { id: "a", text: "9h00" },
          { id: "b", text: "9h30" },
          { id: "c", text: "9h40" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "9h30", explanation: "Le message dit : « votre rendez-vous demain à neuf heures trente »." },
      },
    ],
    locale: "fr-FR",
    filename: "rappel-rdv.m4a",
    approxDurationSeconds: 14,
    premium: false,
  },
  {
    id: "a1-message-invitation-anniversaire",
    theme: "messages-vocaux",
    skillLabel: "Comprendre une invitation à une fête (lieu, date, heure)",
    kind: "message_vocal",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Léa", voice: "flo" }],
    turns: [
      {
        speaker: "Léa",
        text: "Salut ! C'est Léa. Je t'invite à mon anniversaire samedi prochain, chez moi, à partir de vingt heures. N'oublie pas de me dire si tu peux venir. À bientôt !",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Où a lieu la fête d'anniversaire ?",
        choices: [
          { id: "a", text: "Au restaurant" },
          { id: "b", text: "Chez Léa" },
          { id: "c", text: "Au bureau" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Chez Léa", explanation: "Léa dit : « chez moi »." },
      },
      {
        kind: "vrai_faux",
        id: "q2",
        prompt: "La fête commence à 20h.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "Léa précise : « à partir de vingt heures »." },
      },
    ],
    locale: "fr-FR",
    filename: "invitation-anniversaire.m4a",
    approxDurationSeconds: 16,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 16. Consignes simples (3 pistes)
// ---------------------------------------------------------------------------

const consignes: A1AudioTrack[] = [
  {
    id: "a1-consigne-salle-classe",
    theme: "consignes",
    skillLabel: "Comprendre des consignes de classe",
    kind: "consigne",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "flo" }],
    turns: [
      { speaker: "Narrateur", text: "Ouvrez votre livre. [[slnc 500]] Écoutez bien. [[slnc 500]] Et répétez après moi." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Que doit-on faire en premier ?",
        choices: [
          { id: "a", text: "Répéter" },
          { id: "b", text: "Ouvrir le livre" },
          { id: "c", text: "Écouter" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Ouvrir le livre", explanation: "La première consigne est : « Ouvrez votre livre »." },
      },
    ],
    locale: "fr-FR",
    filename: "salle-classe.m4a",
    approxDurationSeconds: 10,
    premium: false,
  },
  {
    id: "a1-consigne-exercice-ecrit",
    theme: "consignes",
    skillLabel: "Comprendre la consigne d'un exercice écrit",
    kind: "consigne",
    level: "A1.1",
    pace: "lent",
    speakingRateWpm: RATE.lent,
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      { speaker: "Narrateur", text: "Prenez une feuille et un stylo. [[slnc 500]] Écrivez votre nom en haut. [[slnc 500]] Puis répondez aux questions." },
    ],
    questions: [
      {
        kind: "vrai_faux",
        id: "q1",
        prompt: "Il faut écrire son nom en haut de la feuille.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "La consigne dit : « Écrivez votre nom en haut »." },
      },
    ],
    locale: "fr-FR",
    filename: "exercice-ecrit.m4a",
    approxDurationSeconds: 11,
    premium: false,
  },
  {
    id: "a1-consigne-securite-avion",
    theme: "consignes",
    skillLabel: "Comprendre une consigne de sécurité orale",
    kind: "consigne",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    speakers: [{ role: "Narrateur", voice: "shelley" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Mesdames et messieurs, veuillez attacher votre ceinture de sécurité et remettre votre siège en position droite. Merci de votre attention.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Que doit-on faire avec sa ceinture ?",
        choices: [
          { id: "a", text: "L'enlever" },
          { id: "b", text: "L'attacher" },
          { id: "c", text: "La vérifier plus tard" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "L'attacher", explanation: "La consigne dit : « veuillez attacher votre ceinture de sécurité »." },
      },
    ],
    locale: "fr-FR",
    filename: "securite-avion.m4a",
    approxDurationSeconds: 12,
    premium: false,
  },
];

// ---------------------------------------------------------------------------
// 17. Bilan A1 (4 pistes, plus exigeantes — synthèse de fin de niveau)
// ---------------------------------------------------------------------------

const bilan: A1AudioTrack[] = [
  {
    id: "a1-bilan-message-nouvel-appartement",
    theme: "bilan",
    skillLabel: "Bilan A1 — comprendre un message combinant date, prix et lieu",
    kind: "message_vocal",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    intention: "Message vocal réaliste combinant plusieurs informations, sans reformulation excessive — test de synthèse fin A1.",
    speakers: [{ role: "Léa", voice: "flo" }],
    turns: [
      {
        speaker: "Léa",
        text: "Bonjour, c'est Léa, l'agence immobilière. J'ai un appartement à vous proposer : deux pièces, au troisième étage, avec un balcon. Le loyer est de six cent vingt euros par mois, charges comprises. La visite est possible samedi à onze heures, au douze rue de la Paix. Rappelez-moi pour confirmer. Merci, bonne journée.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel est le loyer de l'appartement ?",
        choices: [
          { id: "a", text: "520 euros" },
          { id: "b", text: "620 euros" },
          { id: "c", text: "720 euros" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "620 euros", explanation: "Léa dit : « Le loyer est de six cent vingt euros par mois »." },
      },
      {
        kind: "qcm",
        id: "q2",
        prompt: "Quand a lieu la visite ?",
        choices: [
          { id: "a", text: "Samedi à 11h" },
          { id: "b", text: "Dimanche à 11h" },
          { id: "c", text: "Samedi à 10h" },
        ],
        correctChoiceId: "a",
        correction: { correctAnswer: "Samedi à 11h", explanation: "Léa précise : « La visite est possible samedi à onze heures »." },
      },
    ],
    locale: "fr-FR",
    filename: "message-nouvel-appartement.m4a",
    approxDurationSeconds: 28,
    premium: true,
  },
  {
    id: "a1-bilan-dialogue-agence-voyage",
    theme: "bilan",
    skillLabel: "Bilan A1 — comprendre un dialogue combinant dates, prix et transport",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    intention: "Dialogue de synthèse en agence de voyage — plusieurs informations à retenir simultanément.",
    speakers: [
      { role: "Nadia", voice: "shelley" },
      { role: "Karim", voice: "jacques" },
    ],
    turns: [
      { speaker: "Karim", text: "Bonjour, je voudrais un billet de train pour Nice." },
      { speaker: "Nadia", text: "Bien sûr. Vous voulez partir quand ?" },
      { speaker: "Karim", text: "Le quinze juillet, si possible le matin." },
      { speaker: "Nadia", text: "J'ai un train à huit heures, avec un changement à Marseille. Le prix est de soixante-dix euros." },
      { speaker: "Karim", text: "Il y a un train direct, sans changement ?" },
      { speaker: "Nadia", text: "Oui, à dix heures trente, mais c'est plus cher : quatre-vingt-dix euros." },
      { speaker: "Karim", text: "Je préfère le train direct, même si c'est plus cher. Je le prends." },
      { speaker: "Nadia", text: "Très bien, un aller simple pour Nice, le quinze juillet à dix heures trente." },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quel train Karim choisit-il finalement ?",
        choices: [
          { id: "a", text: "Le train à 8h, avec changement" },
          { id: "b", text: "Le train direct à 10h30" },
          { id: "c", text: "Un train le lendemain" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Le train direct à 10h30", explanation: "Karim dit : « Je préfère le train direct », qui part à dix heures trente." },
      },
      {
        kind: "qcm",
        id: "q2",
        prompt: "Combien coûte le billet choisi ?",
        choices: [
          { id: "a", text: "70 euros" },
          { id: "b", text: "80 euros" },
          { id: "c", text: "90 euros" },
        ],
        correctChoiceId: "c",
        correction: { correctAnswer: "90 euros", explanation: "Nadia précise que le train direct coûte « quatre-vingt-dix euros »." },
      },
    ],
    locale: "fr-FR",
    filename: "dialogue-agence-voyage.m4a",
    approxDurationSeconds: 32,
    premium: true,
  },
  {
    id: "a1-bilan-annonce-gare-complete",
    theme: "bilan",
    skillLabel: "Bilan A1 — comprendre une annonce de gare complète (quai, heure, retard, raison)",
    kind: "annonce",
    level: "A1.2",
    pace: "naturel_soutenu",
    speakingRateWpm: RATE.naturel_soutenu,
    intention: "Annonce plus dense que les pistes du thème transports — synthèse de plusieurs informations dans un registre officiel.",
    speakers: [{ role: "Narrateur", voice: "thomas" }],
    turns: [
      {
        speaker: "Narrateur",
        text: "Mesdames et messieurs, votre attention s'il vous plaît. Le train numéro six mille deux cent dix, à destination de Strasbourg, partira voie sept au lieu de la voie deux, avec quinze minutes de retard, en raison d'un incident sur la ligne. Le départ est maintenant prévu à dix-huit heures quarante-cinq. Nous vous remercions de votre compréhension.",
      },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "De quelle voie part le train, finalement ?",
        choices: [
          { id: "a", text: "Voie 2" },
          { id: "b", text: "Voie 7" },
          { id: "c", text: "Voie 15" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Voie 7", explanation: "L'annonce dit : « partira voie sept au lieu de la voie deux »." },
      },
      {
        kind: "qcm",
        id: "q2",
        prompt: "À quelle heure le train part-il maintenant ?",
        choices: [
          { id: "a", text: "18h30" },
          { id: "b", text: "18h45" },
          { id: "c", text: "19h00" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "18h45", explanation: "L'annonce précise : « Le départ est maintenant prévu à dix-huit heures quarante-cinq »." },
      },
    ],
    locale: "fr-FR",
    filename: "annonce-gare-complete.m4a",
    approxDurationSeconds: 26,
    premium: true,
  },
  {
    id: "a1-bilan-conversation-nouvelle-vie",
    theme: "bilan",
    skillLabel: "Bilan A1 — conversation de synthèse (travail, famille, loisirs, projets)",
    kind: "dialogue",
    level: "A1.2",
    pace: "naturel",
    speakingRateWpm: RATE.naturel,
    intention: "Pièce de bilan final A1 : deux amis qui se retrouvent après plusieurs mois, combinant tous les grands thèmes A1 en une seule conversation naturelle.",
    speakers: [
      { role: "Sophie", voice: "sandy" },
      { role: "Karim", voice: "jacques" },
    ],
    turns: [
      { speaker: "Sophie", text: "Karim ! Ça fait longtemps ! Comment tu vas ?" },
      { speaker: "Karim", text: "Très bien, merci ! J'ai changé de travail en septembre, je suis maintenant technicien dans une nouvelle entreprise." },
      { speaker: "Sophie", text: "Félicitations ! Et ta famille, comment ça va ?" },
      { speaker: "Karim", text: "Tout le monde va bien. Ma sœur s'est mariée en juin, c'était une belle fête." },
      { speaker: "Sophie", text: "Oh, super ! Et tu as toujours le temps de faire du sport ?" },
      { speaker: "Karim", text: "Oui, je joue au foot le samedi matin, avec des collègues. Et toi, quoi de neuf ?" },
      { speaker: "Sophie", text: "Moi, je pars vivre à Bordeaux le mois prochain, pour un nouveau projet professionnel." },
      { speaker: "Karim", text: "C'est génial ! On devrait se voir avant ton départ, non ?" },
      { speaker: "Sophie", text: "Bonne idée ! On peut se retrouver le week-end prochain, samedi après-midi ?" },
      { speaker: "Karim", text: "Parfait, je note ça. À samedi, alors !" },
    ],
    questions: [
      {
        kind: "qcm",
        id: "q1",
        prompt: "Quand la sœur de Karim s'est-elle mariée ?",
        choices: [
          { id: "a", text: "En septembre" },
          { id: "b", text: "En juin" },
          { id: "c", text: "Le mois prochain" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "En juin", explanation: "Karim dit : « Ma sœur s'est mariée en juin »." },
      },
      {
        kind: "qcm",
        id: "q2",
        prompt: "Pourquoi Sophie déménage-t-elle à Bordeaux ?",
        choices: [
          { id: "a", text: "Pour sa famille" },
          { id: "b", text: "Pour un projet professionnel" },
          { id: "c", text: "Pour des études" },
        ],
        correctChoiceId: "b",
        correction: { correctAnswer: "Pour un projet professionnel", explanation: "Sophie dit : « je pars vivre à Bordeaux le mois prochain, pour un nouveau projet professionnel »." },
      },
      {
        kind: "vrai_faux",
        id: "q3",
        prompt: "Sophie et Karim décident de se revoir avant le départ de Sophie.",
        correctAnswer: true,
        correction: { correctAnswer: "Vrai", explanation: "Ils se mettent d'accord pour se retrouver « samedi après-midi »." },
      },
    ],
    locale: "fr-FR",
    filename: "conversation-nouvelle-vie.m4a",
    approxDurationSeconds: 45,
    premium: true,
  },
];

export const A1_AUDIO_TRACKS: A1AudioTrack[] = [
  ...salutations,
  ...presentations,
  ...nombresTelephone,
  ...datesHeures,
  ...prixAchats,
  ...famille,
  ...description,
  ...cafeRestaurant,
  ...petitesAnnonces,
  ...directions,
  ...transports,
  ...meteo,
  ...quotidienLoisirs,
  ...rendezVous,
  ...messagesVocaux,
  ...consignes,
  ...bilan,
];
