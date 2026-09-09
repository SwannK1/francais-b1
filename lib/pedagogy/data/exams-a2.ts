import { DELF_A2_REFERENCE } from "@/lib/pedagogy/data/delf-a2-reference";
import type { Exam } from "@/lib/pedagogy/types";

const { maxScorePerSection, passingScoreTotal, maxScoreTotal, eliminatoryScorePerSection } =
  DELF_A2_REFERENCE;

/**
 * Examens A2 — catalogue isolé du B1 (`lib/pedagogy/data/exams.ts`), voir
 * `docs/integration/a2-content.md`. Contenu 100% original, ne reproduit
 * aucun sujet officiel DELF ou TCF ; ne prétend jamais être un examen
 * officiel. `audioSrc` suit la convention `/audio/a2/...` mais les fichiers
 * ne sont pas encore produits dans ce chantier (contenu/pédagogie, pas
 * audio) — voir `docs/integration/a2-content.md` § Audio.
 */
export const EXAMS_A2: Exam[] = [
  {
    id: "exam-a2-demo",
    slug: "delf-a2-entrainement-demo",
    title: "Entraînement A2 — Épreuve de démonstration",
    type: "delf",
    level: "A2",
    description:
      "Épreuve fictive inspirée du format DELF A2, avec un contenu entièrement original, à but d'entraînement.",
    durationMinutes: 33,
    maxScore: 100,
    passingScore: 50,
    isBlanc: false,
    sections: [
      {
        id: "exam-a2-co",
        title: "Compréhension orale",
        delfSection: "comprehension_orale",
        durationMinutes: 8,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a2-co-1",
            type: "comprehension_orale",
            skillId: "a2-co-annonces-publiques",
            difficulty: "A2",
            instructions: "Écoutez l'annonce, puis répondez aux questions.",
            audioSrc: "/audio/a2/bilan-a2-annonce-aeroport.m4a",
            transcript:
              "Attention, mesdames et messieurs les passagers du vol Air Régional deux cent huit à destination de Toulouse : embarquement immédiat, porte quatorze. Nous invitons les passagers à se présenter porte quatorze sans attendre, l'embarquement se terminera dans dix minutes.",
            questions: [
              {
                kind: "qcm",
                id: "exam-a2-co-1-q1",
                prompt: "Quelle est la destination du vol ?",
                choices: [
                  { id: "a", text: "Toulouse" },
                  { id: "b", text: "Nantes" },
                  { id: "c", text: "Lisbonne" },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Toulouse",
                  explanation: "L'annonce cite « le vol Air Régional deux cent huit à destination de Toulouse ».",
                },
              },
              {
                kind: "qcm",
                id: "exam-a2-co-1-q2",
                prompt: "À quelle porte faut-il se présenter ?",
                choices: [
                  { id: "a", text: "Porte 4" },
                  { id: "b", text: "Porte 14" },
                  { id: "c", text: "Porte 40" },
                ],
                correctChoiceId: "b",
                correction: { correctAnswer: "Porte 14", explanation: "L'annonce répète deux fois « porte quatorze »." },
              },
            ],
          },
        ],
      },
      {
        id: "exam-a2-ce",
        title: "Compréhension écrite",
        delfSection: "comprehension_ecrite",
        durationMinutes: 10,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a2-ce-1",
            type: "comprehension_ecrite",
            skillId: "a2-ce-annonces",
            difficulty: "A2",
            instructions: "Lisez l'annonce, puis répondez aux questions.",
            text:
              "« À louer : studio meublé, 22 m², 3e étage sans ascenseur, proche métro. Cuisine équipée, salle " +
              "de bain avec douche. Charges comprises. Libre à partir du 1er octobre. Merci d'envoyer un mail " +
              "avec vos coordonnées et votre situation professionnelle. »",
            questions: [
              {
                kind: "qcm",
                id: "exam-a2-ce-1-q1",
                prompt: "Quelle est la surface du studio ?",
                choices: [
                  { id: "a", text: "12 m²." },
                  { id: "b", text: "22 m²." },
                  { id: "c", text: "32 m²." },
                ],
                correctChoiceId: "b",
                correction: { correctAnswer: "22 m².", explanation: "L'annonce précise « 22 m² »." },
              },
              {
                kind: "vrai_faux",
                id: "exam-a2-ce-1-q2",
                prompt: "Vrai ou faux : il y a un ascenseur dans l'immeuble.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "L'annonce précise « 3e étage sans ascenseur ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-a2-pe",
        title: "Production écrite",
        delfSection: "production_ecrite",
        durationMinutes: 10,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a2-pe-1",
            type: "production_ecrite",
            skillId: "a2-pe-message-informel",
            difficulty: "A2",
            instructions: "Rédigez votre réponse.",
            consigne:
              "Un ami français vous invite à son anniversaire samedi soir, mais vous ne pouvez pas venir. " +
              "Écrivez-lui un message pour vous excuser, expliquer pourquoi, et proposer de le voir un autre jour.",
            minWords: 40,
            maxWords: 60,
            correctionCriteria: [
              "Excuse claire et raison donnée (/2)",
              "Proposition d'un autre moment (/2)",
              "Phrases correctement construites (/1)",
            ],
            aiCorrectionAvailable: false,
          },
        ],
      },
      {
        id: "exam-a2-po",
        title: "Production orale",
        delfSection: "production_orale",
        durationMinutes: 5,
        maxScore: 25,
        exercises: [
          {
            id: "exam-a2-po-1",
            type: "production_orale",
            skillId: "a2-pe-se-presenter",
            difficulty: "A2",
            instructions: "Préparez-vous, puis enregistrez-vous.",
            consigne:
              "Présentez-vous : votre nom, votre origine, ce que vous faites (travail ou études) et un loisir que vous aimez.",
            prepSeconds: 60,
            maxSpeakSeconds: 90,
            selfAssessmentCriteria: [
              "J'ai dit mon nom et mon origine.",
              "J'ai parlé de mon activité actuelle.",
              "J'ai mentionné au moins un loisir.",
              "Mes phrases sont compréhensibles d'un bout à l'autre.",
            ],
            tips: "Pas besoin de tout dire en une seule longue phrase : plusieurs phrases courtes et claires valent mieux qu'une phrase compliquée.",
          },
        ],
      },
    ],
  },
  {
    id: "delf-a2-blanc-1",
    slug: "delf-a2-examen-blanc-1",
    title: "DELF A2 — Examen blanc 1",
    type: "delf",
    level: "A2",
    description:
      "Premier examen blanc complet, structure et barème alignés sur le format officiel DELF A2 " +
      "(France Éducation International) : 4 épreuves sur 25 points chacune, seuil de réussite 50/100, " +
      "note éliminatoire 5/25 par épreuve. Contenu 100% original. Différence avec le vrai DELF : les " +
      "documents audio sont ici réécoutables librement, alors qu'ils ne sont diffusés que deux fois le " +
      "jour de l'examen.",
    durationMinutes:
      DELF_A2_REFERENCE.comprehensionOrale.durationMinutes +
      DELF_A2_REFERENCE.comprehensionEcrite.durationMinutes +
      DELF_A2_REFERENCE.productionEcrite.durationMinutes +
      18,
    maxScore: maxScoreTotal,
    passingScore: passingScoreTotal,
    isBlanc: true,
    sections: [
      {
        id: "blanc1-a2-co",
        title: "Compréhension orale",
        delfSection: "comprehension_orale",
        durationMinutes: DELF_A2_REFERENCE.comprehensionOrale.durationMinutes,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-a2-co-1",
            type: "comprehension_orale",
            skillId: "a2-co-messages-vocaux",
            difficulty: "A2",
            instructions: "Écoutez le message vocal du cabinet de kinésithérapie, puis répondez.",
            audioSrc: "/audio/a2/a2-repondeur-rdv-annule.m4a",
            transcript:
              "Bonjour, c'est le cabinet de kinésithérapie. Je vous appelle pour votre rendez-vous de jeudi dix mars à quinze heures : malheureusement, le kinésithérapeute est absent ce jour-là. Je vous propose donc de venir le lendemain, vendredi onze mars, à la même heure, quinze heures. Si ça ne vous convient pas, rappelez-nous au numéro habituel avant mercredi. Merci et à bientôt.",
            questions: [
              {
                kind: "vrai_faux",
                id: "blanc1-a2-co-1-q1",
                prompt: "Le rendez-vous du jeudi 10 mars est maintenu.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux",
                  explanation: "Le kinésithérapeute est absent ce jour-là, le rendez-vous est donc annulé et déplacé.",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-a2-co-1-q2",
                prompt: "Quelle nouvelle date est proposée ?",
                choices: [
                  { id: "a", text: "Jeudi 10 mars" },
                  { id: "b", text: "Vendredi 11 mars" },
                  { id: "c", text: "Lundi 14 mars" },
                ],
                correctChoiceId: "b",
                correction: { correctAnswer: "Vendredi 11 mars", explanation: "Le message propose « le lendemain, vendredi onze mars, à la même heure »." },
              },
              {
                kind: "qcm",
                id: "blanc1-a2-co-1-q3",
                prompt: "Que doit faire la personne si la nouvelle date ne lui convient pas ?",
                choices: [
                  { id: "a", text: "Aller directement au cabinet." },
                  { id: "b", text: "Rappeler avant mercredi." },
                  { id: "c", text: "Ne rien faire." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Rappeler avant mercredi.",
                  explanation: "Le message dit : « rappelez-nous au numéro habituel avant mercredi ».",
                },
              },
            ],
          },
          {
            id: "blanc1-a2-co-2",
            type: "comprehension_orale",
            skillId: "a2-co-dialogues-quotidiens",
            difficulty: "A2",
            instructions: "Écoutez le dialogue à la boulangerie, puis répondez.",
            audioSrc: "/audio/a2/a2-achats-boulangerie.m4a",
            transcript:
              "Boulanger : Bonjour madame, qu'est-ce qu'il vous faut aujourd'hui ?\nCliente : Bonjour. Je voudrais une baguette pas trop cuite, et deux croissants, s'il vous plaît.\nBoulanger : Très bien. Avec ceci ?\nCliente : Vous avez encore du pain de campagne ?\nBoulanger : Non, désolé, il est déjà tout vendu. Il en reste demain matin.\nCliente : D'accord, tant pis. Ça fait combien ?\nBoulanger : Alors, la baguette, les deux croissants... ça fait quatre euros quarante.\nCliente : Voilà. Merci, au revoir !\nBoulanger : Merci à vous, bonne journée !",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-a2-co-2-q1",
                prompt: "Qu'est-ce que la cliente achète ?",
                choices: [
                  { id: "a", text: "Une baguette et deux croissants." },
                  { id: "b", text: "Un pain de campagne." },
                  { id: "c", text: "Trois croissants." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Une baguette et deux croissants.",
                  explanation: "C'est ce que la cliente commande au début, le pain de campagne n'étant plus disponible.",
                },
              },
              {
                kind: "vrai_faux",
                id: "blanc1-a2-co-2-q2",
                prompt: "Le pain de campagne est disponible aujourd'hui.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux",
                  explanation: "Le boulanger répond : « il est déjà tout vendu. Il en reste demain matin ».",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-a2-co-2-q3",
                prompt: "Combien coûtent les achats de la cliente ?",
                choices: [
                  { id: "a", text: "4,40 €." },
                  { id: "b", text: "4,04 €." },
                  { id: "c", text: "14,40 €." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "4,40 €.",
                  explanation: "Le boulanger annonce : « ça fait quatre euros quarante ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "blanc1-a2-ce",
        title: "Compréhension écrite",
        delfSection: "comprehension_ecrite",
        durationMinutes: DELF_A2_REFERENCE.comprehensionEcrite.durationMinutes,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-a2-ce-1",
            type: "comprehension_ecrite",
            skillId: "a2-ce-messages-courts",
            difficulty: "A2",
            instructions: "Lisez le message, puis répondez aux questions.",
            text:
              "Salut Yasmine,\n\n" +
              "Comment vas-tu ? Je t'écris parce que je vais bientôt déménager, à la fin du mois. J'ai trouvé " +
              "un appartement plus grand, avec un vrai balcon, pas loin de mon travail. Je suis très contente, " +
              "même si j'ai un peu peur du déménagement lui-même : j'ai beaucoup de cartons à faire !\n\n" +
              "Est-ce que tu serais libre samedi pour m'aider un peu ? On pourrait commander une pizza après, " +
              "pour te remercier.\n\n" +
              "Réponds-moi vite,\nCamille",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-a2-ce-1-q1",
                prompt: "Pourquoi Camille écrit-elle à Yasmine ?",
                choices: [
                  { id: "a", text: "Pour lui souhaiter son anniversaire." },
                  { id: "b", text: "Pour lui demander de l'aide pour un déménagement." },
                  { id: "c", text: "Pour l'inviter à une fête." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Pour lui demander de l'aide pour un déménagement.",
                  explanation: "« Est-ce que tu serais libre samedi pour m'aider un peu ? »",
                },
              },
              {
                kind: "vrai_faux",
                id: "blanc1-a2-ce-1-q2",
                prompt: "Vrai ou faux : Camille n'a aucune inquiétude à propos du déménagement.",
                correctAnswer: false,
                correction: {
                  correctAnswer: "Faux.",
                  explanation: "Elle dit « j'ai un peu peur du déménagement lui-même »." ,
                },
              },
              {
                kind: "qcm",
                id: "blanc1-a2-ce-1-q3",
                prompt: "Qu'est-ce que le nouvel appartement a de plus, selon Camille ?",
                choices: [
                  { id: "a", text: "Un balcon." },
                  { id: "b", text: "Une piscine." },
                  { id: "c", text: "Un jardin." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "Un balcon.", explanation: "« un vrai balcon »." },
              },
            ],
          },
          {
            id: "blanc1-a2-ce-2",
            type: "comprehension_ecrite",
            skillId: "a2-ce-programmes-horaires",
            difficulty: "A2",
            instructions: "Lisez le programme, puis répondez aux questions.",
            text:
              "FÊTE DU QUARTIER — Samedi 14 juin, place des Tilleuls\n\n" +
              "10h : ouverture du marché artisanal\n" +
              "12h : repas partagé, chacun apporte un plat\n" +
              "14h30 : jeux pour les enfants (gratuit, inscription sur place)\n" +
              "17h : concert du groupe local « Les Voisins »\n" +
              "19h : feu d'artifice\n\n" +
              "En cas de pluie, le concert et le repas partagé seront déplacés à la salle des fêtes, juste à côté.",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-a2-ce-2-q1",
                prompt: "À quelle heure commence le concert ?",
                choices: [
                  { id: "a", text: "14h30." },
                  { id: "b", text: "17h." },
                  { id: "c", text: "19h." },
                ],
                correctChoiceId: "b",
                correction: { correctAnswer: "17h.", explanation: "Le programme l'indique directement." },
              },
              {
                kind: "libre",
                id: "blanc1-a2-ce-2-q2",
                prompt: "Que se passe-t-il pour le concert s'il pleut ?",
                expectedAnswer: "Il est déplacé à la salle des fêtes.",
                correction: {
                  correctAnswer: "Il est déplacé à la salle des fêtes.",
                  explanation: "« le concert et le repas partagé seront déplacés à la salle des fêtes »." ,
                },
              },
              {
                kind: "qcm",
                id: "blanc1-a2-ce-2-q3",
                prompt: "Que doivent apporter les habitants pour le repas partagé ?",
                choices: [
                  { id: "a", text: "Un plat." },
                  { id: "b", text: "Une chaise." },
                  { id: "c", text: "Rien, tout est fourni." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "Un plat.", explanation: "« chacun apporte un plat »." },
              },
            ],
          },
        ],
      },
      {
        id: "blanc1-a2-pe",
        title: "Production écrite",
        delfSection: "production_ecrite",
        durationMinutes: DELF_A2_REFERENCE.productionEcrite.durationMinutes,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-a2-pe-1",
            type: "production_ecrite",
            skillId: "a2-pe-raconter-brievement",
            difficulty: "A2",
            instructions: "Rédigez votre réponse.",
            consigne:
              "Le week-end dernier, vous avez fait quelque chose de sympa (sortie, visite, repas entre amis...). " +
              "Racontez ce week-end dans un message à un ami : où, avec qui, ce que vous avez fait, et ce que " +
              "vous avez pensé de cette sortie.",
            minWords: 60,
            maxWords: 100,
            correctionCriteria: [
              "Le récit est clairement situé dans le temps (/2)",
              "Au moins 3 actions racontées au passé composé (/2)",
              "Une appréciation personnelle donnée (/1)",
            ],
            aiCorrectionAvailable: false,
          },
        ],
      },
      {
        id: "blanc1-a2-po",
        title: "Production orale",
        delfSection: "production_orale",
        durationMinutes: 18,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-a2-po-1",
            type: "production_orale",
            skillId: "a2-pe-organiser-sortie",
            difficulty: "A2",
            instructions: "Préparez-vous, puis enregistrez-vous (jeu de rôle).",
            consigne:
              "Vous appelez un ami pour proposer une sortie ce week-end (cinéma, restaurant, promenade...). " +
              "Proposez une activité, un jour et une heure, et réagissez si votre ami propose autre chose.",
            context: "Imaginez que votre ami vous répond qu'il préfère une autre activité ou un autre jour : adaptez votre proposition.",
            prepSeconds: 600,
            maxSpeakSeconds: 240,
            selfAssessmentCriteria: [
              "J'ai proposé une activité claire.",
              "J'ai proposé un jour et une heure précis.",
              "J'ai réagi de façon cohérente à une objection possible.",
              "Mon discours est compréhensible d'un bout à l'autre.",
            ],
            tips: "Pas de mauvaise réponse : l'objectif est de tenir une petite conversation naturelle, pas de réciter un texte appris par cœur.",
          },
        ],
      },
    ],
  },
];

export function getExamBySlugA2(slug: string): Exam | undefined {
  return EXAMS_A2.find((exam) => exam.slug === slug);
}
