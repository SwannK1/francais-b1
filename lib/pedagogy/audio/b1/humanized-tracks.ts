import type { B1VoiceId } from "@/lib/pedagogy/audio/b1/voices";

/**
 * Données pures des pistes B1 réécrites par le chantier `audio-humanisation`
 * — extraites de `scripts/b1-audio-generate.mjs` pour être importables sans
 * déclencher de génération audio (ce script exécute la synthèse dès son
 * import, il ne peut donc pas être importé par un test).
 *
 * Le texte de chaque tour doit rester synchronisé mot pour mot avec le
 * `transcript` de l'exercice correspondant dans `lib/pedagogy/data/modules.ts`
 * (même risque de désynchronisation que documenté pour A1, voir
 * `docs/audio/humanisation-a1-a2-b1.md` §7) — voir
 * `lib/pedagogy/audio/b1/humanized-tracks-sync.test.ts` pour le garde-fou.
 */

export interface B1HumanizedTurn {
  /** Nom du personnage tel qu'affiché dans le transcript (ex. "Amélie"). */
  speaker: string;
  /** Profil vocal utilisé pour la synthèse — voir `b1/voices.ts`. */
  voiceId: B1VoiceId;
  text: string;
}

export interface B1HumanizedTrack {
  /** Id de l'exercice `comprehension_orale` correspondant dans `lib/pedagogy/data/modules.ts`. */
  id: string;
  filename: string;
  rateWpm: number;
  turns: B1HumanizedTurn[];
}

export const B1_HUMANIZED_TRACKS: B1HumanizedTrack[] = [
  {
    id: "prop-e",
    filename: "discuter-avec-un-proprietaire.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Amélie", voiceId: "voix-b", text: "Bonjour madame, je vous appelle au sujet de l'annonce pour le studio rue des Lilas... il est toujours disponible ?" },
      { speaker: "Mme Lefèvre", voiceId: "voix-c", text: "Oui, tout à fait ! Vous voulez le visiter ?" },
      { speaker: "Amélie", voiceId: "voix-b", text: "Avec plaisir, oui. Est-ce que ce serait possible samedi matin ?" },
      { speaker: "Mme Lefèvre", voiceId: "voix-c", text: "Ah, samedi je ne suis pas disponible, désolée — mais dimanche après-midi, ça vous irait ?" },
      { speaker: "Amélie", voiceId: "voix-b", text: "Oui, oui, parfait. Euh, une dernière question : est-ce qu'il faut un garant pour ce logement ?" },
      { speaker: "Mme Lefèvre", voiceId: "voix-c", text: "Oui, c'est obligatoire. Envoyez-moi votre dossier avant la visite, si vous pouvez, ça ira plus vite." },
      { speaker: "Amélie", voiceId: "voix-b", text: "Très bien, je vous l'envoie aujourd'hui même. Merci beaucoup, à dimanche !" },
    ],
  },
  {
    // Corrige au passage le défaut de voix dupliquée documenté pour cette
    // piste (Fatou/Léa) — voir docs/b1/audio-human-recording-plan.md §1/§2.
    id: "quotidien-f",
    filename: "decrire-vie-quotidienne.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Fatou", voiceId: "voix-b", text: "Bon, pour les courses, on fait comment ? Toutes les deux, chacune son tour ?" },
      { speaker: "Léa", voiceId: "voix-c", text: "Ça me va. Moi je peux y aller le mardi, j'ai moins cours ce jour-là." },
      { speaker: "Fatou", voiceId: "voix-b", text: "Parfait, et moi le samedi matin, avant que ce soit trop plein." },
      { speaker: "Léa", voiceId: "voix-c", text: "Et pour le ménage ? Moi, en semaine, j'ai vraiment jamais le temps..." },
      { speaker: "Fatou", voiceId: "voix-b", text: "Pas de souci, on le fait le dimanche, toutes les deux, ça ira plus vite." },
      { speaker: "Léa", voiceId: "voix-c", text: "Bonne idée. Et la vaisselle, on ne la laisse jamais traîner, hein ?" },
      { speaker: "Fatou", voiceId: "voix-b", text: "D'accord, chacune la sienne, tout de suite après manger." },
    ],
  },
  {
    // Corrige au passage le défaut de voix dupliquée documenté pour cette
    // piste (Yasmine/Camille), qui l'avait fait surclasser en P1.
    id: "cns-e",
    filename: "hypothese-et-conseil.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Yasmine", voiceId: "voix-b", text: "Bon, j'ai reçu deux propositions de travail, et... je ne sais vraiment pas laquelle choisir." },
      { speaker: "Camille", voiceId: "voix-c", text: "Ah bon ? Raconte-moi, c'est quoi la différence ?" },
      { speaker: "Yasmine", voiceId: "voix-b", text: "Alors, la première est mieux payée, mais il faudrait que je déménage. La deuxième, elle est plus proche, mais moins stable : c'est un CDD de six mois." },
      { speaker: "Camille", voiceId: "voix-c", text: "Hmm... si j'étais toi, je réfléchirais d'abord à ce qui compte le plus pour moi : l'argent, ou la stabilité ?" },
      { speaker: "Yasmine", voiceId: "voix-b", text: "La stabilité, je crois. Mais bon, si je refusais la première offre, je risquerais de le regretter, non ?" },
      { speaker: "Camille", voiceId: "voix-c", text: "Tu pourrais aussi demander un délai de réflexion à l'entreprise, non ?" },
      { speaker: "Yasmine", voiceId: "voix-b", text: "Ah, bonne idée, j'y avais pas pensé ! Je vais essayer." },
      { speaker: "Camille", voiceId: "voix-c", text: "À ta place, c'est ce que je ferais, avant de me décider définitivement." },
    ],
  },
  {
    id: "courrier-f",
    filename: "comprendre-un-courrier-simple.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Conseiller", voiceId: "voix-a", text: "Bonjour, CAF, j'écoute." },
      { speaker: "Amina", voiceId: "voix-b", text: "Bonjour, alors voilà, j'ai reçu un courrier qui me demande de mettre à jour mon dossier, mais... je ne suis pas sûre de tout comprendre." },
      { speaker: "Conseiller", voiceId: "voix-a", text: "Pas de souci, c'est simple : il faut juste nous envoyer votre avis d'imposition, et un justificatif de domicile récent." },
      { speaker: "Amina", voiceId: "voix-b", text: "D'accord. Je peux les envoyer par internet, ou seulement par courrier ?" },
      { speaker: "Conseiller", voiceId: "voix-a", text: "Vous pouvez tout faire depuis votre espace en ligne, c'est plus rapide." },
      { speaker: "Amina", voiceId: "voix-b", text: "Très bien. Et j'ai jusqu'à quand, exactement ?" },
      { speaker: "Conseiller", voiceId: "voix-a", text: "Jusqu'au 30 septembre. Après cette date, le versement sera mis en pause." },
    ],
  },
  {
    id: "rdv-f",
    filename: "prendre-rendez-vous.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Secrétariat", voiceId: "voix-b", text: "Cabinet Leroy, bonjour." },
      { speaker: "Karim", voiceId: "voix-a", text: "Bonjour, je vous appelle pour prendre rendez-vous... j'ai une douleur depuis deux jours." },
      { speaker: "Secrétariat", voiceId: "voix-b", text: "D'accord, est-ce que demain matin vous conviendrait ?" },
      { speaker: "Karim", voiceId: "voix-a", text: "Ah non, désolé, je travaille toute la matinée. L'après-midi, ce serait possible ?" },
      { speaker: "Secrétariat", voiceId: "voix-b", text: "Alors, laissez-moi voir... j'ai un créneau à 16h30." },
      { speaker: "Karim", voiceId: "voix-a", text: "Parfait, ça me va très bien !" },
      { speaker: "Secrétariat", voiceId: "voix-b", text: "Très bien, c'est noté. Vous recevrez un SMS de confirmation dans quelques minutes." },
    ],
  },
  {
    id: "admin-f",
    filename: "comprendre-une-demarche-administrative.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Agent", voiceId: "voix-b", text: "Bonjour, vous venez pour quelle démarche ?" },
      { speaker: "Youssef", voiceId: "voix-a", text: "Bonjour, je voudrais renouveler mon titre de séjour... il expire dans trois mois." },
      { speaker: "Agent", voiceId: "voix-b", text: "Très bien. Est-ce que vous avez déjà pris rendez-vous en ligne ?" },
      { speaker: "Youssef", voiceId: "voix-a", text: "Pas encore, je voulais d'abord savoir quels documents il me faut." },
      { speaker: "Agent", voiceId: "voix-b", text: "D'accord. Alors, il faut que vous ayez une pièce d'identité, un justificatif de domicile de moins de trois mois, deux photos d'identité, et votre titre actuel." },
      { speaker: "Youssef", voiceId: "voix-a", text: "Et pour le justificatif de domicile, une facture d'électricité, ça convient ?" },
      { speaker: "Agent", voiceId: "voix-b", text: "Oui, tout à fait, à condition qu'elle ait moins de trois mois." },
      { speaker: "Youssef", voiceId: "voix-a", text: "Très bien. Et ça prend combien de temps, en général ?" },
      { speaker: "Agent", voiceId: "voix-b", text: "Comptez entre deux et quatre mois après le dépôt du dossier. En attendant, vous recevrez un récépissé qui vous permet de continuer à vivre normalement en France." },
      { speaker: "Youssef", voiceId: "voix-a", text: "D'accord, merci beaucoup pour ces précisions." },
    ],
  },
  {
    id: "med-e",
    filename: "aller-chez-le-medecin.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Médecin", voiceId: "voix-a", text: "Bonjour madame, qu'est-ce qui vous amène ?" },
      { speaker: "Farida", voiceId: "voix-b", text: "Bonjour docteur, j'ai mal à la gorge et un peu de fièvre depuis trois jours." },
      { speaker: "Médecin", voiceId: "voix-a", text: "Vous toussez aussi ?" },
      { speaker: "Farida", voiceId: "voix-b", text: "Oui, surtout le soir... et je me sens très fatiguée." },
      { speaker: "Médecin", voiceId: "voix-a", text: "D'accord. Est-ce que ça s'améliore, ou est-ce que ça empire depuis le début ?" },
      { speaker: "Farida", voiceId: "voix-b", text: "Ça empire un peu, je trouve." },
      { speaker: "Médecin", voiceId: "voix-a", text: "Je vais vous prescrire un médicament contre la fièvre. Reposez-vous, buvez beaucoup d'eau et évitez de sortir dans le froid. Si ça ne va pas mieux dans quatre jours, revenez me voir." },
      { speaker: "Farida", voiceId: "voix-b", text: "D'accord, merci docteur. Est-ce que je peux quand même aller travailler ?" },
      { speaker: "Médecin", voiceId: "voix-a", text: "Je vous conseille de vous reposer deux jours, au moins." },
    ],
  },
  {
    id: "travail-f",
    filename: "parler-de-son-travail-et-projets.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Julie", voiceId: "voix-b", text: "Alors, tu es nouveau dans l'équipe ! Tu faisais quoi avant ?" },
      { speaker: "Karim", voiceId: "voix-a", text: "Avant, j'ai travaillé dans la restauration pendant cinq ans, comme serveur." },
      { speaker: "Julie", voiceId: "voix-b", text: "Ah bon ? Et pourquoi tu as changé ?" },
      { speaker: "Karim", voiceId: "voix-a", text: "Parce que je voulais un métier plus technique, avec moins de contact avec le public, en fait... Alors j'ai suivi une formation en maintenance industrielle." },
      { speaker: "Julie", voiceId: "voix-b", text: "Et ça s'est bien passé ?" },
      { speaker: "Karim", voiceId: "voix-a", text: "Oui, très bien. Grâce à cette formation, j'ai trouvé un premier poste, et maintenant je suis ici." },
      { speaker: "Julie", voiceId: "voix-b", text: "Et tu as des projets, pour la suite ?" },
      { speaker: "Karim", voiceId: "voix-a", text: "Oui, je vais commencer une formation en électronique le mois prochain. J'aimerais évoluer vers un poste de responsable technique d'ici deux ou trois ans." },
      { speaker: "Julie", voiceId: "voix-b", text: "C'est un bon objectif, ça ! Moi, je travaille ici depuis longtemps, je pourrai t'aider si tu as des questions." },
      { speaker: "Karim", voiceId: "voix-a", text: "Merci, c'est gentil !" },
    ],
  },
  {
    id: "eco-e",
    filename: "parler-ecole-enfant.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Institutrice", voiceId: "voix-b", text: "Bonjour monsieur, merci d'être venu. Je voulais vous parler de Léo." },
      { speaker: "Karim", voiceId: "voix-a", text: "Bonjour madame, oui, j'ai reçu votre message dans le carnet de liaison. Il y a un problème ?" },
      { speaker: "Institutrice", voiceId: "voix-b", text: "Rien de grave, mais je trouve qu'il a du mal à se concentrer depuis quelques semaines, surtout en mathématiques." },
      { speaker: "Karim", voiceId: "voix-a", text: "Je vois. Il rentre fatigué le soir, c'est vrai... Vous pensez que c'est lié ?" },
      { speaker: "Institutrice", voiceId: "voix-b", text: "C'est possible. Je pense qu'un peu plus de repos pourrait l'aider. Est-ce qu'il pourrait se coucher un peu plus tôt ?" },
      { speaker: "Karim", voiceId: "voix-a", text: "On va essayer, oui. Et pour rattraper son retard en maths, vous auriez un conseil ?" },
      { speaker: "Institutrice", voiceId: "voix-b", text: "Je vous conseille quelques exercices simples à la maison, dix minutes par jour. Je vous envoie une liste." },
      { speaker: "Karim", voiceId: "voix-a", text: "D'accord, merci beaucoup madame. N'hésitez pas à me recontacter si besoin." },
    ],
  },
  {
    id: "transport-f",
    filename: "utiliser-les-transports.m4a",
    rateWpm: 178,
    turns: [
      {
        speaker: "Narrateur",
        voiceId: "voix-a",
        text: "« Mesdames, messieurs, votre attention s'il vous plaît : en raison d'un incident technique, le train à destination de Lyon partira exceptionnellement voie 4 au lieu de la voie 2. Ce train est annoncé avec dix minutes de retard. Nous vous prions de nous excuser pour la gêne occasionnée, et vous remercions de votre compréhension. »",
      },
    ],
  },
  {
    id: "opinion-f",
    filename: "donner-son-opinion.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Marc", voiceId: "voix-a", text: "Moi, franchement, je suis contre ce projet de compost." },
      { speaker: "Nadia", voiceId: "voix-b", text: "Ah bon ? Pourquoi ?" },
      { speaker: "Marc", voiceId: "voix-a", text: "Parce que je pense que ça va sentir mauvais, surtout l'été... et qu'il va y avoir des insectes." },
      { speaker: "Nadia", voiceId: "voix-b", text: "Je comprends ton inquiétude, mais je ne suis pas d'accord avec toi. Si on l'entretient bien, il n'y a pas de mauvaise odeur." },
      { speaker: "Marc", voiceId: "voix-a", text: "Peut-être, mais qui va s'en occuper ? Personne n'a le temps pour ça." },
      { speaker: "Nadia", voiceId: "voix-b", text: "On peut organiser un planning, un voisin différent chaque semaine. À mon avis, ça peut vraiment marcher, si on s'organise." },
      { speaker: "Marc", voiceId: "voix-a", text: "Bon... ça se discute. Mais j'aimerais qu'on essaie d'abord pendant trois mois, pour voir." },
      { speaker: "Nadia", voiceId: "voix-b", text: "Ça me semble raisonnable, oui. On propose ça à la réunion ?" },
      { speaker: "Marc", voiceId: "voix-a", text: "D'accord, on propose ça." },
    ],
  },
  {
    id: "probleme-f",
    filename: "expliquer-un-probleme-et-demander-une-solution.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Conseiller", voiceId: "voix-a", text: "Service technique, bonjour, je vous écoute." },
      { speaker: "Amélie", voiceId: "voix-b", text: "Bonjour, je vous appelle parce que je n'ai plus internet... depuis une semaine, maintenant." },
      { speaker: "Conseiller", voiceId: "voix-a", text: "D'accord, je vais regarder ça. Vous avez déjà essayé de redémarrer votre box ?" },
      { speaker: "Amélie", voiceId: "voix-b", text: "Oui, plusieurs fois, mais le problème persiste. Et comme je travaille depuis chez moi, c'est vraiment gênant." },
      { speaker: "Conseiller", voiceId: "voix-a", text: "Je comprends. Alors, je vois effectivement une anomalie sur la ligne. Il va falloir qu'un technicien intervienne chez vous." },
      { speaker: "Amélie", voiceId: "voix-b", text: "D'accord... et ça peut se faire quand ?" },
      { speaker: "Conseiller", voiceId: "voix-a", text: "Le premier créneau disponible est après-demain, entre 9h et 12h." },
      { speaker: "Amélie", voiceId: "voix-b", text: "C'est un peu tard, mais bon, je n'ai pas le choix. Est-ce qu'un dédommagement est prévu pour cette semaine sans connexion ?" },
      { speaker: "Conseiller", voiceId: "voix-a", text: "Oui, on va vous créditer une semaine d'abonnement, c'est automatique dans ce genre de situation." },
      { speaker: "Amélie", voiceId: "voix-b", text: "Très bien, merci beaucoup." },
    ],
  },
  {
    id: "prj-e",
    filename: "parler-de-ses-projets.m4a",
    rateWpm: 175,
    turns: [
      { speaker: "Conseillère", voiceId: "voix-b", text: "Bonjour Yassine, vous vouliez me parler de votre projet ?" },
      { speaker: "Yassine", voiceId: "voix-a", text: "Oui, j'envisage de faire une formation en logistique... l'année prochaine." },
      { speaker: "Conseillère", voiceId: "voix-b", text: "Très bien. Et concrètement, quelles sont les étapes ?" },
      { speaker: "Yassine", voiceId: "voix-a", text: "Alors, d'abord, je vais m'inscrire en ligne avant la fin du mois. Ensuite, si mon dossier est accepté, je commencerai la formation en septembre." },
      { speaker: "Conseillère", voiceId: "voix-b", text: "Et si votre dossier n'est pas accepté du premier coup ?" },
      { speaker: "Yassine", voiceId: "voix-a", text: "Dans ce cas, je referai une demande l'année suivante. Mais je préfère rester positif !" },
      { speaker: "Conseillère", voiceId: "voix-b", text: "C'est une bonne attitude, ça. Je vais vous envoyer la liste des documents à préparer." },
    ],
  },
  {
    id: "rap-e",
    filename: "rapporter-les-paroles.m4a",
    rateWpm: 175,
    turns: [
      {
        speaker: "Livreur",
        voiceId: "voix-a",
        text: "Bonjour, c'est le livreur de chez ColisPlus. Je suis passé, mais il n'y avait personne... Je repasserai demain matin, vers 9 heures. Est-ce que quelqu'un sera présent ? Si besoin, vous pouvez me rappeler au 06 12 34 56 78. Merci, bonne journée !",
      },
    ],
  },
];

/**
 * Reconstruit le transcript affiché à l'apprenant depuis les tours de
 * synthèse — même convention que `formatA1Transcript` : un seul locuteur
 * (monologue/annonce) n'affiche jamais de préfixe "Nom — ", uniquement le
 * texte brut.
 */
export function formatB1HumanizedTranscript(track: B1HumanizedTrack): string {
  const distinctSpeakers = new Set(track.turns.map((t) => t.speaker));
  if (distinctSpeakers.size <= 1) {
    return track.turns.map((t) => t.text).join("\n");
  }
  return track.turns.map((t) => `${t.speaker} — ${t.text}`).join("\n");
}
