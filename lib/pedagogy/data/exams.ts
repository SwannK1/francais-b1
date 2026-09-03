import { DELF_B1_REFERENCE } from "@/lib/pedagogy/data/delf-b1-reference";
import type { Exam } from "@/lib/pedagogy/types";

const { maxScorePerSection, passingScoreTotal, maxScoreTotal, eliminatoryScorePerSection } =
  DELF_B1_REFERENCE;

/**
 * Exemple d'examen fictif B1, contenu 100% original — ne reproduit aucun
 * sujet officiel DELF ou TCF. Sert uniquement à valider la structure de données.
 */
export const EXAMS: Exam[] = [
  {
    id: "exam-b1-demo",
    slug: "delf-b1-entrainement-demo",
    title: "Entraînement B1 — Épreuve de démonstration",
    type: "delf",
    level: "B1",
    description:
      "Épreuve fictive inspirée du format DELF B1, avec un contenu entièrement original, à but d'entraînement.",
    durationMinutes: 47,
    maxScore: 125,
    passingScore: 63,
    isBlanc: false,
    sections: [
      {
        id: "exam-b1-ce",
        title: "Compréhension écrite",
        delfSection: "comprehension_ecrite",
        durationMinutes: 15,
        maxScore: 34,
        exercises: [
          {
            id: "exam-b1-ce-1",
            type: "comprehension_ecrite",
            skillId: "ce-textes-courants",
            difficulty: "B1",
            instructions: "Lisez l'annonce, puis répondez aux questions.",
            text:
              "« L'association Les Mots Voyageurs recherche des bénévoles pour animer des ateliers " +
              "de conversation en français, deux fois par mois, le samedi matin. Aucune expérience " +
              "n'est exigée, mais une bonne humeur communicative est indispensable ! »",
            questions: [
              {
                kind: "qcm",
                id: "exam-b1-ce-1-q1",
                prompt: "À quelle fréquence ont lieu les ateliers ?",
                choices: [
                  { id: "a", text: "Une fois par semaine." },
                  { id: "b", text: "Deux fois par mois." },
                  { id: "c", text: "Une fois par mois." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Deux fois par mois.",
                  explanation: "Le texte précise « deux fois par mois, le samedi matin ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-b1-co",
        title: "Compréhension orale",
        delfSection: "comprehension_orale",
        durationMinutes: 10,
        maxScore: 33,
        exercises: [
          {
            id: "exam-b1-co-1",
            type: "comprehension_orale",
            skillId: "co-dialogues-simples",
            difficulty: "B1",
            instructions: "Écoutez l'annonce, puis répondez à la question.",
            audioSrc: "/audio/demo/exam-b1-annonce.m4a",
            transcript:
              "« Attention, le train à destination de Lyon partira exceptionnellement voie 4 au lieu de la voie 2. »",
            questions: [
              {
                kind: "qcm",
                id: "exam-b1-co-1-q1",
                prompt: "Quel changement est annoncé ?",
                choices: [
                  { id: "a", text: "Le train est annulé." },
                  { id: "b", text: "Le train change de voie." },
                  { id: "c", text: "Le train est retardé." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Le train change de voie.",
                  explanation: "L'annonce indique un départ « voie 4 au lieu de la voie 2 ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "exam-b1-pe",
        title: "Production écrite",
        delfSection: "production_ecrite",
        durationMinutes: 20,
        maxScore: 33,
        exercises: [
          {
            id: "exam-b1-pe-1",
            type: "production_ecrite",
            skillId: "pe-exprimer-avis",
            difficulty: "B1",
            instructions: "Rédigez votre réponse.",
            consigne:
              "Vous répondez à un forum en ligne : donnez votre avis sur l'intérêt des ateliers de conversation pour apprendre une langue.",
            minWords: 80,
            maxWords: 150,
            correctionCriteria: [
              "Une opinion claire",
              "Des arguments justifiés",
              "Des connecteurs logiques",
              "Une orthographe et une grammaire correctes",
            ],
            aiCorrectionAvailable: false,
          },
        ],
      },
      {
        id: "exam-b1-po",
        title: "Production orale",
        delfSection: "production_orale",
        durationMinutes: 2,
        maxScore: 25,
        exercises: [
          {
            id: "exam-b1-po-1",
            type: "production_orale",
            skillId: "pe-exprimer-avis",
            difficulty: "B1",
            instructions: "Préparez-vous, puis enregistrez-vous.",
            consigne:
              "Certaines villes limitent la circulation des voitures en centre-ville. Donnez votre opinion sur cette mesure et justifiez-la, pendant environ 1 à 2 minutes.",
            prepSeconds: 120,
            maxSpeakSeconds: 120,
            selfAssessmentCriteria: [
              "J'ai répondu clairement à la consigne.",
              "Mon discours est compréhensible d'un bout à l'autre.",
              "J'ai donné une opinion claire.",
              "J'ai justifié mon opinion avec au moins un argument.",
              "J'ai relié mes idées avec des connecteurs (par exemple, cependant, donc...).",
              "J'ai utilisé un vocabulaire adapté au sujet.",
            ],
            tips:
              "Pas de mauvaise réponse : l'objectif est de parler 1 à 2 minutes de façon compréhensible et organisée, pas de convaincre.",
          },
        ],
      },
    ],
  },
  {
    id: "delf-b1-blanc-1",
    slug: "delf-b1-examen-blanc-1",
    title: "DELF B1 — Examen blanc 1",
    type: "delf",
    level: "B1",
    description:
      "Premier examen blanc complet, structure et barème alignés sur le format officiel DELF B1 " +
      "(France Éducation International) : 4 épreuves sur 25 points chacune, seuil de réussite 50/100, " +
      "note éliminatoire 5/25 par épreuve. Contenu 100% original. Différence avec le vrai DELF : les " +
      "documents audio sont ici réécoutables librement, alors qu'ils ne sont diffusés que deux fois le " +
      "jour de l'examen.",
    durationMinutes:
      DELF_B1_REFERENCE.comprehensionOrale.durationMinutes +
      DELF_B1_REFERENCE.comprehensionEcrite.durationMinutes +
      DELF_B1_REFERENCE.productionEcrite.durationMinutes +
      25,
    maxScore: maxScoreTotal,
    passingScore: passingScoreTotal,
    isBlanc: true,
    sections: [
      {
        id: "blanc1-co",
        title: "Compréhension orale",
        delfSection: "comprehension_orale",
        durationMinutes: DELF_B1_REFERENCE.comprehensionOrale.durationMinutes,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-co-1",
            type: "comprehension_orale",
            skillId: "co-dialogues-simples",
            difficulty: "B1",
            instructions: "Écoutez le message vocal (« Changement de programme », 30 secondes), puis répondez.",
            audioSrc: "/audio/examens/blanc-1/co-message-camping.m4a",
            transcript:
              "Salut, c'est Karim ! Je t'appelle parce qu'on doit changer nos plans pour samedi. En fait, " +
              "le camping où on devait aller est complet, il n'y a plus de place pour ce week-end. Alors " +
              "j'ai regardé sur internet, et j'ai trouvé un autre camping, un peu plus loin, à Annecy. C'est " +
              "à peu près une heure de route en plus, mais les avis sont vraiment bons. Est-ce que ça te va " +
              "si on part une heure plus tôt, du coup, vers 8h au lieu de 9h ? Rappelle-moi pour me dire si " +
              "c'est possible pour toi. Merci, à bientôt !",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-co-1-q1",
                prompt: "Pourquoi Karim change-t-il les plans ?",
                choices: [
                  { id: "a", text: "Il pleut le week-end prochain." },
                  { id: "b", text: "Le camping prévu est complet." },
                  { id: "c", text: "La voiture est en panne." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Le camping prévu est complet.",
                  explanation: "« le camping où on devait aller est complet, il n'y a plus de place ».",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-co-1-q2",
                prompt: "Où se trouve le nouveau camping ?",
                choices: [
                  { id: "a", text: "À Annecy." },
                  { id: "b", text: "Près de Lyon." },
                  { id: "c", text: "À la montagne, dans les Alpes." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "À Annecy.", explanation: "Karim le précise directement." },
              },
              {
                kind: "qcm",
                id: "blanc1-co-1-q3",
                prompt: "Comment le nouveau camping se compare-t-il au premier ?",
                choices: [
                  { id: "a", text: "Il est plus loin." },
                  { id: "b", text: "Il est plus proche." },
                  { id: "c", text: "Il est à la même distance." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Il est plus loin.",
                  explanation: "« C'est à peu près une heure de route en plus » : il est plus loin.",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-co-1-q4",
                prompt: "À quelle heure Karim propose-t-il de partir ?",
                choices: [
                  { id: "a", text: "Vers 8h." },
                  { id: "b", text: "Vers 9h." },
                  { id: "c", text: "Vers 10h." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "Vers 8h.", explanation: "« si on part une heure plus tôt... vers 8h ». " },
              },
            ],
          },
          {
            id: "blanc1-co-2",
            type: "comprehension_orale",
            skillId: "co-dialogues-simples",
            difficulty: "B1",
            instructions:
              "Écoutez le dialogue (« Organiser un déplacement professionnel », Nadia et Thomas, 55 secondes), puis répondez.",
            audioSrc: "/audio/examens/blanc-1/co-dialogue-salon-lyon.m4a",
            transcript:
              "Thomas — Nadia, tu as réservé les billets de train pour le salon à Lyon ?\n" +
              "Nadia — Pas encore, je voulais d'abord vérifier les horaires avec toi. Tu préfères partir la veille ou le matin même ?\n" +
              "Thomas — Je préfère partir la veille, comme ça on n'est pas fatigués et on arrive reposés pour la première réunion.\n" +
              "Nadia — D'accord, alors je regarde un train vers 18h, ça te va ?\n" +
              "Thomas — Parfait. Et pour l'hôtel, tu as une idée ?\n" +
              "Nadia — Oui, j'ai trouvé un hôtel pas trop cher, à dix minutes à pied du centre des congrès. Par contre, il ne reste que des chambres simples, pas de chambre double.\n" +
              "Thomas — Ce n'est pas grave, chacun sa chambre, c'est plus simple de toute façon.\n" +
              "Nadia — Je m'en occupe aujourd'hui, alors. Et pour le retour, on rentre le soir même ou le lendemain ?\n" +
              "Thomas — Le salon se termine à 17h, donc on peut rentrer le soir même, non ?\n" +
              "Nadia — Oui, ça devrait aller. Je réserve tout ça cet après-midi et je t'envoie la confirmation par mail.",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-co-2-q1",
                prompt: "Pourquoi Thomas préfère-t-il partir la veille ?",
                choices: [
                  { id: "a", text: "Pour ne pas être fatigué le premier jour." },
                  { id: "b", text: "Parce que le train coûte moins cher la veille." },
                  { id: "c", text: "Parce que l'hôtel est complet le jour même." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Pour ne pas être fatigué le premier jour.",
                  explanation: "« on n'est pas fatigués et on arrive reposés pour la première réunion ».",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-co-2-q2",
                prompt: "À quelle distance du centre des congrès se trouve l'hôtel ?",
                choices: [
                  { id: "a", text: "À dix minutes à pied." },
                  { id: "b", text: "À une heure en voiture." },
                  { id: "c", text: "Juste en face du centre des congrès." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "À dix minutes à pied.", explanation: "Nadia le précise directement." },
              },
              {
                kind: "qcm",
                id: "blanc1-co-2-q3",
                prompt: "Quelles chambres Nadia a-t-elle trouvées à l'hôtel ?",
                choices: [
                  { id: "a", text: "Deux chambres simples." },
                  { id: "b", text: "Une chambre double." },
                  { id: "c", text: "Une suite avec deux lits." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Deux chambres simples.",
                  explanation: "« il ne reste que des chambres simples, pas de chambre double ».",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-co-2-q4",
                prompt: "Quand vont-ils rentrer, selon leur discussion ?",
                choices: [
                  { id: "a", text: "Le soir même." },
                  { id: "b", text: "Le lendemain matin." },
                  { id: "c", text: "Deux jours après." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "Le soir même.", explanation: "Le salon se termine à 17h, ils peuvent rentrer le soir même." },
              },
              {
                kind: "qcm",
                id: "blanc1-co-2-q5",
                prompt: "Qu'est-ce que Nadia va faire cet après-midi ?",
                choices: [
                  { id: "a", text: "Appeler l'hôtel pour annuler la réservation." },
                  { id: "b", text: "Réserver le train et l'hôtel." },
                  { id: "c", text: "Se rendre au salon à Lyon." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Réserver le train et l'hôtel.",
                  explanation: "« Je réserve tout ça cet après-midi et je t'envoie la confirmation par mail ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "blanc1-ce",
        title: "Compréhension écrite",
        delfSection: "comprehension_ecrite",
        durationMinutes: DELF_B1_REFERENCE.comprehensionEcrite.durationMinutes,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-ce-1",
            type: "comprehension_ecrite",
            skillId: "ce-textes-courants",
            difficulty: "B1",
            instructions: "Lisez le message, puis répondez aux questions.",
            text:
              "Objet : Fermeture exceptionnelle de la salle de sport\n\n" +
              "Bonjour à toutes et à tous,\n\n" +
              "Nous vous informons que la salle de sport sera fermée exceptionnellement le samedi 12 " +
              "septembre pour des travaux de rénovation du sol. Les cours habituels du samedi matin sont " +
              "annulés, mais ils seront proposés en ligne, en visioconférence, à la même heure que " +
              "d'habitude.\n\n" +
              "Si vous êtes inscrit à un cours ce jour-là, merci de nous répondre avant le 8 septembre pour " +
              "indiquer si vous êtes intéressé par la version en ligne. Sans réponse de votre part, nous " +
              "considérerons que vous ne participerez pas.\n\n" +
              "La salle rouvrira normalement dès le lundi 14 septembre.\n\n" +
              "Merci de votre compréhension.\n" +
              "L'équipe de la salle Vitalis",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-ce-1-q1",
                prompt: "Pourquoi la salle de sport ferme-t-elle le 12 septembre ?",
                choices: [
                  { id: "a", text: "Pour des travaux de rénovation du sol." },
                  { id: "b", text: "Pour les vacances du personnel." },
                  { id: "c", text: "À cause d'un problème technique." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Pour des travaux de rénovation du sol.",
                  explanation: "C'est la raison donnée dans le premier paragraphe.",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-1-q2",
                prompt: "Que se passe-t-il pour les cours du samedi matin ?",
                choices: [
                  { id: "a", text: "Ils sont annulés, sans aucune alternative." },
                  { id: "b", text: "Ils sont proposés en ligne, à la même heure." },
                  { id: "c", text: "Ils sont reportés au dimanche." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Ils sont proposés en ligne, à la même heure.",
                  explanation: "Ils sont proposés en ligne, en visioconférence, à la même heure.",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-1-q3",
                prompt: "Avant quelle date faut-il répondre pour participer au cours en ligne ?",
                choices: [
                  { id: "a", text: "Avant le 8 septembre." },
                  { id: "b", text: "Avant le 12 septembre." },
                  { id: "c", text: "Avant le 14 septembre." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "Avant le 8 septembre.", explanation: "C'est la date limite donnée dans le message." },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-1-q4",
                prompt: "Que se passe-t-il si on ne répond pas au message ?",
                choices: [
                  { id: "a", text: "On considère qu'on ne participera pas au cours en ligne." },
                  { id: "b", text: "On est automatiquement inscrit au cours en ligne." },
                  { id: "c", text: "Le cours est annulé pour tout le monde." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "On considère que la personne ne participera pas au cours en ligne.",
                  explanation: "« Sans réponse de votre part, nous considérerons que vous ne participerez pas ».",
                },
              },
            ],
          },
          {
            id: "blanc1-ce-2",
            type: "comprehension_ecrite",
            skillId: "ce-textes-courants",
            difficulty: "B1",
            instructions: "Lisez l'article, puis répondez aux questions.",
            text:
              "Les jardins partagés, une tendance qui pousse dans les villes\n\n" +
              "De plus en plus de villes françaises voient apparaître des jardins partagés : des terrains, " +
              "souvent au milieu des immeubles, où les habitants d'un même quartier cultivent ensemble des " +
              "légumes, des fruits et des fleurs. Le principe est simple : chacun peut réserver une petite " +
              "parcelle, ou participer aux tâches communes comme l'arrosage ou la récolte.\n\n" +
              "Pour Sophie, qui participe à un jardin partagé depuis deux ans dans son quartier, c'est avant " +
              "tout une façon de rencontrer ses voisins. « Avant, je ne connaissais presque personne dans " +
              "mon immeuble. Maintenant, on partage des conseils de jardinage, mais aussi des repas, " +
              "parfois. » D'autres participants apprécient surtout le contact avec la nature, difficile à " +
              "trouver en ville, ou l'occasion d'apprendre à cultiver leurs propres légumes.\n\n" +
              "Les mairies encouragent de plus en plus ce type de projet, car il permet aussi de verdir des " +
              "terrains inutilisés, sans coût très élevé pour la collectivité. Il suffit généralement d'un " +
              "accord avec la mairie et d'un petit groupe de bénévoles motivés pour démarrer un jardin " +
              "partagé.\n\n" +
              "Cependant, tout n'est pas toujours simple : il faut s'organiser collectivement, se répartir " +
              "les tâches équitablement, et parfois gérer des désaccords entre participants sur la façon de " +
              "cultiver le jardin. Malgré ces difficultés, le nombre de jardins partagés continue " +
              "d'augmenter chaque année dans les grandes villes comme dans les villes moyennes.",
            questions: [
              {
                kind: "qcm",
                id: "blanc1-ce-2-q1",
                prompt: "Qu'est-ce qu'un jardin partagé, selon le texte ?",
                choices: [
                  { id: "a", text: "Un terrain où plusieurs habitants cultivent ensemble." },
                  { id: "b", text: "Un jardin privé loué par la mairie à une seule famille." },
                  { id: "c", text: "Un magasin qui vend des légumes du quartier." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Un terrain où plusieurs habitants cultivent ensemble.",
                  explanation: "C'est la définition donnée dès la première phrase.",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-2-q2",
                prompt: "Pourquoi le jardin partagé est-il surtout important pour Sophie ?",
                choices: [
                  { id: "a", text: "Pour rencontrer ses voisins." },
                  { id: "b", text: "Pour gagner de l'argent en vendant des légumes." },
                  { id: "c", text: "Pour obtenir une réduction sur ses impôts." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Pour rencontrer ses voisins.",
                  explanation: "« Avant, je ne connaissais presque personne dans mon immeuble. »",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-2-q3",
                prompt: "Que dit le texte à propos du coût d'un jardin partagé pour la mairie ?",
                choices: [
                  { id: "a", text: "Il n'est pas très élevé." },
                  { id: "b", text: "Il est très élevé." },
                  { id: "c", text: "Le texte ne parle pas du coût." },
                ],
                correctChoiceId: "a",
                correction: { correctAnswer: "Il n'est pas très élevé.", explanation: "Le texte dit « sans coût très élevé pour la collectivité »." },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-2-q4",
                prompt: "Que faut-il généralement pour démarrer un jardin partagé, selon le texte ?",
                choices: [
                  { id: "a", text: "Un accord avec la mairie et un petit groupe de bénévoles motivés." },
                  { id: "b", text: "Un budget municipal important et un appel d'offres." },
                  { id: "c", text: "L'accord de tous les habitants de la ville." },
                ],
                correctChoiceId: "a",
                correction: {
                  correctAnswer: "Un accord avec la mairie et un petit groupe de bénévoles motivés.",
                  explanation: "C'est ce qu'indique le troisième paragraphe.",
                },
              },
              {
                kind: "qcm",
                id: "blanc1-ce-2-q5",
                prompt: "Quelle difficulté le texte mentionne-t-il pour les jardins partagés ?",
                choices: [
                  { id: "a", text: "Le manque de terrains disponibles en ville." },
                  { id: "b", text: "Des désaccords entre participants sur la façon de cultiver." },
                  { id: "c", text: "L'interdiction de la mairie." },
                ],
                correctChoiceId: "b",
                correction: {
                  correctAnswer: "Des désaccords entre participants sur la façon de cultiver.",
                  explanation: "Dernier paragraphe : « parfois gérer des désaccords entre participants ».",
                },
              },
            ],
          },
        ],
      },
      {
        id: "blanc1-pe",
        title: "Production écrite",
        delfSection: "production_ecrite",
        durationMinutes: DELF_B1_REFERENCE.productionEcrite.durationMinutes,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-pe-1",
            type: "production_ecrite",
            skillId: "pe-exprimer-avis",
            difficulty: "B1",
            instructions: "Rédigez votre réponse.",
            consigne:
              "Vous lisez sur un forum en ligne cette question : « Faut-il limiter l'usage du téléphone " +
              "portable pendant les repas en famille ? » Vous décidez de répondre en donnant votre opinion " +
              "personnelle et en la justifiant avec des arguments et des exemples.",
            minWords: DELF_B1_REFERENCE.productionEcrite.minWords,
            correctionCriteria: [
              "Une opinion claire sur la question posée",
              "Au moins deux arguments différents",
              "Un exemple concret pour illustrer un argument",
              "Des connecteurs logiques (d'abord, cependant, enfin...)",
              "Une orthographe et une grammaire globalement correctes",
              `Au moins ${DELF_B1_REFERENCE.productionEcrite.minWords} mots`,
            ],
            aiCorrectionAvailable: false,
          },
        ],
      },
      {
        id: "blanc1-po",
        title: "Production orale",
        delfSection: "production_orale",
        durationMinutes: 25,
        maxScore: maxScorePerSection,
        eliminatoryScore: eliminatoryScorePerSection,
        exercises: [
          {
            id: "blanc1-po-1",
            type: "production_orale",
            skillId: "pe-se-presenter",
            difficulty: "B1",
            instructions: "Partie 1/3 — Entretien dirigé (non préparé).",
            consigne:
              "Présentez-vous : parlez de vous, de votre vie quotidienne, de vos habitudes, de votre " +
              "travail ou de vos études, de vos loisirs.",
            prepSeconds: 0,
            maxSpeakSeconds: 150,
            selfAssessmentCriteria: [
              "J'ai parlé de moi de façon spontanée, sans notes.",
              "J'ai donné des informations sur mon quotidien (travail, études, loisirs...).",
              "Mes phrases étaient globalement claires et compréhensibles.",
              "J'ai parlé pendant 2 à 3 minutes environ.",
            ],
            tips:
              "Dans le vrai DELF, l'examinateur peut vous poser des questions de relance après votre " +
              "présentation — ici, personne ne vous relance : essayez d'anticiper une ou deux questions " +
              "possibles et d'y répondre vous-même avant de terminer.",
          },
          {
            id: "blanc1-po-2",
            type: "production_orale",
            skillId: "pe-expliquer-probleme",
            difficulty: "B1",
            instructions: "Partie 2/3 — Exercice en interaction (non préparé).",
            context:
              "Situation : vous travaillez dans un magasin. Un ou une cliente souhaite être remboursé(e) " +
              "d'un article acheté il y a un mois, mais le magasin n'accepte les remboursements que dans " +
              "les 15 jours. Vous devez lui expliquer poliment la situation et proposer une solution " +
              "(échange, avoir...).",
            consigne:
              "Jouez la scène : imaginez les réponses du client ou de la cliente et poursuivez le " +
              "dialogue seul(e), en jouant les deux rôles si besoin, pendant 3 à 4 minutes.",
            prepSeconds: 0,
            maxSpeakSeconds: 210,
            selfAssessmentCriteria: [
              "J'ai expliqué clairement la règle du magasin.",
              "J'ai proposé au moins une solution alternative.",
              "J'ai gardé un ton poli même en cas de désaccord.",
              "J'ai réussi à faire avancer la négociation vers une solution.",
            ],
            tips:
              "Dans le vrai DELF, c'est l'examinateur qui joue le rôle du client ou de la cliente et " +
              "réagit à vos propositions — ici, personne ne vous répond réellement : imaginez ses " +
              "réactions probables (par exemple une objection) et montrez que vous savez y réagir.",
          },
          {
            id: "blanc1-po-3",
            type: "production_orale",
            skillId: "pe-exprimer-avis",
            difficulty: "B1",
            instructions: "Partie 3/3 — Expression d'un point de vue (seule partie préparée).",
            context:
              "Document : « De plus en plus d'entreprises proposent à leurs salariés de travailler quatre " +
              "jours par semaine au lieu de cinq, avec le même salaire. Certaines entreprises françaises " +
              "testent déjà cette organisation depuis quelques années. »",
            consigne:
              "Dégagez le thème du document, puis présentez votre opinion personnelle sur cette question " +
              "et justifiez-la avec des arguments. (5 à 7 minutes)",
            prepSeconds: DELF_B1_REFERENCE.productionOrale.prepMinutesPart3 * 60,
            maxSpeakSeconds: 360,
            selfAssessmentCriteria: [
              "J'ai identifié clairement le thème du document.",
              "J'ai donné une opinion personnelle claire.",
              "J'ai développé au moins deux arguments différents.",
              "J'ai organisé mon discours (introduction, arguments, conclusion).",
              "J'ai parlé pendant 5 à 7 minutes environ.",
            ],
            tips:
              "Dans le vrai DELF, l'examinateur relance le débat avec des questions après votre " +
              "présentation — ici, personne ne vous contredit ni ne vous relance : à vous d'anticiper une " +
              "objection possible et d'y répondre vous-même pour aller plus loin.",
          },
        ],
      },
    ],
  },
];

export function getExamBySlug(slug: string): Exam | undefined {
  return EXAMS.find((exam) => exam.slug === slug);
}

/** `ExamAttempt.examId` référence un id, jamais un slug — voir `logic/review.ts`. */
export function getExamById(id: string): Exam | undefined {
  return EXAMS.find((exam) => exam.id === id);
}
