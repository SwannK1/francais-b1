import { EXAMS, MODULES } from "@/lib/pedagogy/data";
import { toHumanAudioPath } from "@/lib/pedagogy/audio/paths";
import type { ComprehensionOraleExercise, Module, StageId } from "@/lib/pedagogy/types";

/**
 * Manifest des pistes audio de la plateforme — enrichit chaque exercice
 * `comprehension_orale` (déjà décrit dans `data/modules.ts`/`data/exams.ts`)
 * avec ce qui n'existe nulle part ailleurs : chemin humain conventionnel et
 * métadonnées de production (locuteurs, locale, type de voix).
 *
 * Dérivé, jamais dupliqué : `transcript`, `skillId`, contexte module/examen
 * viennent directement des données pédagogiques (une seule source de
 * vérité pour le contenu). Seule `AUDIO_PRODUCTION_META` est écrite à la
 * main — voir `docs/b1/audio-human-recording-plan.md` §4-5 pour sa source.
 *
 * Module Node/build-time (pas d'accès disque ici, mais destiné aux scripts
 * et aux tests) — ne pas importer depuis un composant client. Un composant
 * a seulement besoin de `lib/pedagogy/audio/paths.ts` (pur, sans données).
 */

export type AudioLocale = "fr-FR";

export interface AudioSpeaker {
  /** Nom du personnage dans le dialogue, ex. "Marc". */
  role: string;
  /** Étiquette de la voix partagée entre pistes, ex. "Voix A" (voir §5 du plan). */
  voiceLabel: string;
  gender: "H" | "F";
}

export interface AudioProductionMeta {
  speakers: AudioSpeaker[];
  intention?: string;
  pace?: string;
  pronunciationNotes?: string[];
}

export type AudioContext =
  | { kind: "module"; moduleSlug: string; moduleTitle: string; stageId: StageId }
  | { kind: "exam"; examSlug: string; examTitle: string; sectionId: string; sectionTitle: string };

export interface AudioTrack {
  id: string;
  skillId: string;
  /** Fichier actuellement servi — la voix de synthèse, jamais supprimée tant que `humanSrc` n'existe pas réellement. */
  syntheticSrc: string;
  /** Chemin conventionnel du futur fichier humain (voir `paths.ts`) — peut ne pas exister sur disque, c'est l'état attendu tant que l'enregistrement n'est pas livré. */
  humanSrc: string;
  locale: AudioLocale;
  transcript: string;
  context: AudioContext;
  production: AudioProductionMeta;
}

/**
 * Métadonnées de production connues aujourd'hui, sourcées de
 * `docs/b1/audio-human-recording-plan.md` (§4 Fiches, §5 Répartition des
 * voix) — pas réinventées ici. Indexé par id de piste (id de l'exercice
 * `comprehension_orale`). Une piste sans entrée ici obtient un fallback
 * vide (voir `getProductionMeta`) : elle apparaît quand même dans
 * `AUDIO_TRACKS`, mais `content-integrity.test.ts` échoue tant qu'elle n'a
 * pas été complétée — c'est volontaire, pour qu'un nouvel exercice audio ne
 * parte jamais en production sans plan d'enregistrement.
 */
const AUDIO_PRODUCTION_META: Record<string, AudioProductionMeta> = {
  "opinion-f": {
    speakers: [
      { role: "Marc", voiceLabel: "Voix A", gender: "H" },
      { role: "Nadia", voiceLabel: "Voix B", gender: "F" },
    ],
    intention: "Léger désaccord de voisinage qui s'apaise progressivement — discussion cordiale, pas un conflit.",
    pace: "Conversationnel, Marc un peu plus vif au début, ralentit avec Nadia vers la fin.",
    pronunciationNotes: ["« compost » à bien articuler (mot clé de l'exercice)"],
  },
  "recit-f": {
    speakers: [
      { role: "Sophie", voiceLabel: "Voix B", gender: "F" },
      { role: "Farid", voiceLabel: "Voix A", gender: "H" },
    ],
    intention: "Anecdote comique racontée après coup — Farid amusé/soulagé, pas paniqué.",
    pace: "Naturel, Farid peut accélérer légèrement sur « j'ai couru jusqu'à la gare ».",
    pronunciationNotes: ["« 9h » → « neuf heures »", "« 10h30 » → « dix heures et demie »"],
  },
  "probleme-f": {
    speakers: [
      { role: "Conseiller technique", voiceLabel: "Voix A", gender: "H" },
      { role: "Amélie", voiceLabel: "Voix B", gender: "F" },
    ],
    intention: "Appel de service client classique, léger agacement contenu côté cliente, professionnalisme rassurant côté conseiller.",
    pace: "Modéré, ton centre d'appel.",
    pronunciationNotes: ["« 9h et 12h » → « neuf heures et midi »"],
  },
  "travail-f": {
    speakers: [
      { role: "Julie", voiceLabel: "Voix B", gender: "F" },
      { role: "Karim", voiceLabel: "Voix A", gender: "H" },
    ],
    intention: "Conversation entre collègues, premier jour d'un nouveau dans l'équipe — chaleureux, pas formel.",
    pace: "Naturel, conversationnel.",
  },
  "admin-f": {
    speakers: [
      { role: "Agent de préfecture", voiceLabel: "Voix B", gender: "F" },
      { role: "Youssef", voiceLabel: "Voix A", gender: "H" },
    ],
    intention: "Guichet administratif, échange factuel, aucun agacement.",
    pace: "Modéré, articulation soignée (informations précises à retenir).",
    pronunciationNotes: ["« trois mois » répété : bien distinguer à chaque occurrence", "« deux photos d'identité »"],
  },
  "quotidien-f": {
    speakers: [
      { role: "Fatou", voiceLabel: "Voix B", gender: "F" },
      { role: "Léa", voiceLabel: "Voix C", gender: "F" },
    ],
    intention: "Organisation du quotidien entre colocataires, complicité amicale, aucune tension.",
    pace: "Naturel, léger, presque badin.",
  },
  "rdv-f": {
    speakers: [
      { role: "Secrétariat médical", voiceLabel: "Voix B", gender: "F" },
      { role: "Karim", voiceLabel: "Voix A", gender: "H" },
    ],
    pace: "Modéré, rythme d'un appel bref et efficace.",
    pronunciationNotes: ["« 16h30 » → « seize heures trente » ou « quatre heures et demie »"],
  },
  "courrier-f": {
    speakers: [
      { role: "Conseiller CAF", voiceLabel: "Voix A", gender: "H" },
      { role: "Amina", voiceLabel: "Voix B", gender: "F" },
    ],
    pace: "Modéré, articulation claire (informations à retenir : documents, délai).",
    pronunciationNotes: ["« 30 septembre » → « trente septembre » ou « le trente septembre »"],
  },
  "transport-f": {
    speakers: [{ role: "Narrateur", voiceLabel: "Voix A", gender: "H" }],
    intention: "Annonce de gare, registre officiel, sans émotion.",
    pace: "Soutenu mais intelligible, débit d'annonce publique réelle.",
    pronunciationNotes: ["« voie 4 » / « voie 2 » clairement distinguées"],
  },
  "prop-e": {
    speakers: [
      { role: "Amélie", voiceLabel: "Voix B", gender: "F" },
      { role: "Mme Lefèvre", voiceLabel: "Voix C", gender: "F" },
    ],
    intention: "Appel pour visiter un logement — la propriétaire doit sonner clairement différente d'Amélie.",
    pace: "Naturel, poli des deux côtés.",
    pronunciationNotes: ["« rue des Lilas » bien articulé"],
  },
  "prj-e": {
    speakers: [
      { role: "Conseillère", voiceLabel: "Voix B", gender: "F" },
      { role: "Yassine", voiceLabel: "Voix A", gender: "H" },
    ],
    pace: "Naturel, ton positif.",
  },
  "med-e": {
    speakers: [
      { role: "Médecin", voiceLabel: "Voix A", gender: "H" },
      { role: "Farida", voiceLabel: "Voix B", gender: "F" },
    ],
    pace: "Modéré, ton de consultation, pas pressé.",
  },
  "eco-e": {
    speakers: [
      { role: "Institutrice", voiceLabel: "Voix B", gender: "F" },
      { role: "Karim", voiceLabel: "Voix A", gender: "H" },
    ],
    pace: "Naturel, ton bienveillant de réunion parent-professeur.",
  },
  "cns-e": {
    speakers: [
      { role: "Yasmine", voiceLabel: "Voix B", gender: "F" },
      { role: "Camille", voiceLabel: "Voix C", gender: "F" },
    ],
    pace: "Naturel, conversation entre amies.",
    pronunciationNotes: ["« CDD » → épeler « C.D.D. »"],
  },
  "rap-e": {
    speakers: [{ role: "Livreur", voiceLabel: "Voix A", gender: "H" }],
    pace: "Naturel, débit de message vocal (ni pressé ni traînant).",
    pronunciationNotes: ["Numéro de téléphone épelé chiffre par chiffre : « zéro-six, douze, trente-quatre, cinquante-six, soixante-dix-huit »"],
  },
  "exam-b1-co-1": {
    speakers: [{ role: "Narrateur", voiceLabel: "Voix A", gender: "H" }],
    pace: "Soutenu mais intelligible, même registre que la piste transport.",
    pronunciationNotes: ["« voie 4 » / « voie 2 »"],
  },
  "blanc1-co-1": {
    speakers: [{ role: "Karim", voiceLabel: "Voix A", gender: "H" }],
    intention: "Message vocal amical, spontané.",
    pace: "Naturel, un peu rapide (ami à ami), respiration avant « Alors j'ai regardé... ».",
    pronunciationNotes: ["« 8h »/« 9h » → « huit heures »/« neuf heures »"],
  },
  "bil-f": {
    speakers: [
      { role: "Karim", voiceLabel: "Voix A", gender: "H" },
      { role: "Léa", voiceLabel: "Voix C", gender: "F" },
    ],
    intention: "Léa raconte un changement de poste récent à un ami, avec un avis nuancé (moins payé, mais plus motivant) — conversation confiante, pas triomphaliste.",
    pace: "Naturel, conversationnel, légère hésitation de Léa sur « un peu hésitante au début ».",
  },
  "blanc1-co-2": {
    speakers: [
      { role: "Thomas", voiceLabel: "Voix A", gender: "H" },
      { role: "Nadia", voiceLabel: "Voix B", gender: "F" },
    ],
    pace: "Posé, ton bureau/collègues, courtes pauses entre répliques.",
    pronunciationNotes: ["« 18h » → « dix-huit heures »", "« 17h » → « dix-sept heures »"],
  },

  // --- Ajouté par l'intégration A1+A2 (voir docs/integration/*.md) ---
  "m02-f1": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m04-f1": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m06-f1": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Vendeuse", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "m08-f1": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m10-f1": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m11-f1": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m12-f1": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Serveur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m14-f1": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
      { role: "Vendeur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m16-f1": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "m18-f1": {
    speakers: [
      { role: "Secrétariat", voiceLabel: "Flo", gender: "F" },
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "m21-f1": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "m21-f2": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
      { role: "Employé", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-salutations-bonjour-matin": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-salutations-se-presenter": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    intention: "Première rencontre, simple et souriante.",
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-salutations-comment-ca-va": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-salutations-au-revoir": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
    ],
    intention: "Fin de journée entre collègues devenus amis, chaleureuse.",
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-presentations-nationalite": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-presentations-profession": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-presentations-etudiant": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-nombres-compter-dix": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-nombres-numero-telephone": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-nombres-code-porte": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-nombres-repondeur-numero": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-dates-quelle-heure": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-dates-anniversaire": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-prix-a-la-boulangerie": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
      { role: "Vendeuse", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-prix-caisse-supermarche": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Caissière", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-famille-mamie-papi": {
    speakers: [
      { role: "Mamie", voiceLabel: "Grandma", gender: "F" },
      { role: "Papi", voiceLabel: "Grandpa", gender: "H" },
    ],
    intention: "Grands-parents qui attendent la visite de leurs petits-enfants, ton tendre.",
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-famille-combien-enfants": {
    speakers: [
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-famille-reunion-dimanche": {
    speakers: [
      { role: "Mamie", voiceLabel: "Grandma", gender: "F" },
      { role: "Papi", voiceLabel: "Grandpa", gender: "H" },
    ],
    intention: "Organisation d'un repas de famille dominical avec plusieurs membres cités.",
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-description-physique-ami": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-description-personnalite": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-description-vetements-aujourdhui": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-cafe-serveur-question": {
    speakers: [
      { role: "Serveuse", voiceLabel: "Flo", gender: "F" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-cafe-restaurant-menu": {
    speakers: [
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Serveuse", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-annonce-appartement-a-louer": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-annonce-recherche-colocataire": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-annonce-objet-a-vendre": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-directions-tout-droit": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-directions-metro-changement": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-directions-pharmacie-proche": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-transports-bus-horaire": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-meteo-aujourdhui": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-meteo-semaine": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-meteo-dialogue-sortie": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-quotidien-routine-matin": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-quotidien-loisirs-preferes": {
    speakers: [
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
      { role: "Marc", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-quotidien-sport": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-quotidien-recit-samedi": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-rdv-rejoindre-un-ami": {
    speakers: [
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-rdv-annuler-rendez-vous": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Secrétariat", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-rdv-coiffeur": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
      { role: "Coiffeuse", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-message-absence-bureau": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-message-ami-retard": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-message-rappel-rdv": {
    speakers: [
      { role: "Secrétariat", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-message-invitation-anniversaire": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-consigne-salle-classe": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Flo", gender: "F" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-consigne-exercice-ecrit": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "lent (128 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-consigne-securite-avion": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Shelley", gender: "F" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-bilan-message-nouvel-appartement": {
    speakers: [
      { role: "Léa", voiceLabel: "Flo", gender: "F" },
    ],
    intention: "Message vocal réaliste combinant plusieurs informations, sans reformulation excessive — test de synthèse fin A1.",
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-bilan-dialogue-agence-voyage": {
    speakers: [
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    intention: "Dialogue de synthèse en agence de voyage — plusieurs informations à retenir simultanément.",
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-bilan-annonce-gare-complete": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    intention: "Annonce plus dense que les pistes du thème transports — synthèse de plusieurs informations dans un registre officiel.",
    pace: "naturel_soutenu (180 mots/min, voix de synthèse macOS `say`)",
  },
  "a1-bilan-conversation-nouvelle-vie": {
    speakers: [
      { role: "Sophie", voiceLabel: "Sandy", gender: "F" },
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
    ],
    intention: "Pièce de bilan final A1 : deux amis qui se retrouvent après plusieurs mois, combinant tous les grands thèmes A1 en une seule conversation naturelle.",
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "quot-o": {
    speakers: [
      { role: "Léa", voiceLabel: "voix-b", gender: "F" },
      { role: "Nora", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Comprendre les horaires et habitudes quotidiennes de deux personnes qui se croisent le matin.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "logp-o": {
    speakers: [
      { role: "Locataire", voiceLabel: "voix-a", gender: "H" },
      { role: "Plombière", voiceLabel: "voix-f", gender: "F" },
    ],
    intention: "Comprendre l'évaluation d'une urgence, la solution provisoire proposée et le rendez-vous fixé.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "ville-o": {
    speakers: [
      { role: "Narrateur", voiceLabel: "voix-d", gender: "H" },
    ],
    intention: "Comprendre une annonce de perturbation et inférer les deux solutions possibles offertes au voyageur.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "trans-e": {
    speakers: [
      { role: "Narrateur", voiceLabel: "voix-d", gender: "H" },
    ],
    intention: "Comprendre une annonce de gare courte : destination, heure de départ, voie.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "sante-e": {
    speakers: [
      { role: "Pharmacien", voiceLabel: "voix-d", gender: "H" },
      { role: "Cliente", voiceLabel: "voix-f", gender: "F" },
    ],
    intention: "Comprendre des conseils de posologie simples : fréquence de prise, condition, durée limite.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-emp-e": {
    speakers: [
      { role: "Journaliste", voiceLabel: "voix-f", gender: "F" },
      { role: "Homme interviewé", voiceLabel: "voix-d", gender: "H" },
      { role: "Femme interviewée", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Repérer des métiers et des informations associées chez plusieurs locuteurs brefs (micro-trottoir).",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "wknd-e": {
    speakers: [
      { role: "Léa", voiceLabel: "voix-b", gender: "F" },
      { role: "Nora", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Suivre un récit chronologique (samedi matin/après-midi, dimanche matin/après-midi) et comparer deux week-ends différents.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "meteo-e": {
    speakers: [
      { role: "Présentatrice", voiceLabel: "voix-f", gender: "F" },
    ],
    intention: "Relever des informations météo simples : moment de la journée, température, conditions.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "annonce-co": {
    speakers: [
      { role: "Animateur", voiceLabel: "voix-d", gender: "H" },
    ],
    intention: "Repérer plusieurs événements dans une annonce plus longue : jour, lieu, condition/alternative.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "bilan-co": {
    speakers: [
      { role: "Narratrice", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Chronologie simple et inférence élémentaire : ordre des événements de la veille, projet probable du lendemain.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-famille-message-presentation": {
    speakers: [
      { role: "Karim", voiceLabel: "voix-a", gender: "H" },
    ],
    intention: "Repérer des informations pratiques (jour, heure, lieu) et des informations familiales simples dans un message vocal.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-logement-appel-agence": {
    speakers: [
      { role: "Agence", voiceLabel: "voix-b", gender: "F" },
      { role: "Client", voiceLabel: "voix-a", gender: "H" },
    ],
    intention: "Comprendre les informations pratiques d'une prise de rendez-vous immobilier : disponibilité, étage, horaire choisi.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-copropriete-reunion-travaux": {
    speakers: [
      { role: "Syndic", voiceLabel: "voix-d", gender: "H" },
      { role: "Mme Petit", voiceLabel: "voix-c", gender: "F" },
      { role: "M. Diallo", voiceLabel: "voix-e", gender: "H" },
    ],
    intention: "Suivre une décision collective avec comparaison de deux options, et inférer le choix final avant qu'il ne soit annoncé explicitement.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-rdv-medecin-secretariat": {
    speakers: [
      { role: "Secrétariat", voiceLabel: "voix-c", gender: "F" },
      { role: "Patient", voiceLabel: "voix-a", gender: "H" },
    ],
    intention: "Comprendre une prise de rendez-vous avec reformulation d'horaire : première proposition refusée, horaire final retenu.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "bilan-a2-repondeur-coiffeur": {
    speakers: [
      { role: "Salon de coiffure", voiceLabel: "voix-f", gender: "F" },
    ],
    intention: "Compréhension de détails et de reformulation : raison du changement, deux options proposées, action attendue.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-loisirs-invitation-vocale": {
    speakers: [
      { role: "Camille", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Comprendre une invitation informelle : activité, jour, horaire, lieu de rendez-vous.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-restaurant-reservation-telephone": {
    speakers: [
      { role: "Serveur", voiceLabel: "voix-a", gender: "H" },
      { role: "Cliente", voiceLabel: "voix-b", gender: "F" },
    ],
    intention: "Suivre deux changements successifs (horaire puis nombre de personnes) dans une réservation de restaurant.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "bilan-a2-dialogue-patinoire": {
    speakers: [
      { role: "Ami 1", voiceLabel: "voix-b", gender: "F" },
      { role: "Ami 2", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Compréhension globale et intentions évidentes : sujet de la conversation, raison d'une hésitation, décision finale.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-travail-nouveau-collegue": {
    speakers: [
      { role: "Julie", voiceLabel: "voix-b", gender: "F" },
      { role: "Karim", voiceLabel: "voix-a", gender: "H" },
    ],
    intention: "Suivre un changement de planning annoncé oralement (distracteur : information initiale corrigée en cours de dialogue).",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-hotel-reservation-dates": {
    speakers: [
      { role: "Réceptionniste", voiceLabel: "voix-c", gender: "F" },
      { role: "Client", voiceLabel: "voix-e", gender: "H" },
    ],
    intention: "Suivre une modification de dates de séjour (mêmes nombre de nuits, dates décalées) — distracteur sur les dates exactes.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-projet-vacances-couple": {
    speakers: [
      { role: "Lui", voiceLabel: "voix-a", gender: "H" },
      { role: "Elle", voiceLabel: "voix-b", gender: "F" },
    ],
    intention: "Suivre une décision commune avec ajustement de durée (distracteur sur la préférence initiale de chacun).",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-reunion-projet-collegues": {
    speakers: [
      { role: "Manager", voiceLabel: "voix-d", gender: "H" },
      { role: "Julie", voiceLabel: "voix-b", gender: "F" },
      { role: "Karim", voiceLabel: "voix-a", gender: "H" },
    ],
    intention: "Suivre une réunion à trois voix, distinguer avancement/retard de chaque personne, et inférer si le projet global est en danger.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-evenement-anniversaire-surprise": {
    speakers: [
      { role: "Nadia", voiceLabel: "voix-b", gender: "F" },
      { role: "Marc", voiceLabel: "voix-e", gender: "H" },
      { role: "Sophie", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Suivre une organisation à trois voix : répartition des tâches entre plusieurs personnes.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-invitation-mariage-repondeur": {
    speakers: [
      { role: "Amina", voiceLabel: "voix-c", gender: "F" },
    ],
    intention: "Retenir plusieurs détails pratiques dans un message d'invitation assez long : date, lieux, tenue, délai de réponse.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-appel-service-client-colis": {
    speakers: [
      { role: "Conseiller", voiceLabel: "voix-a", gender: "H" },
      { role: "Cliente", voiceLabel: "voix-f", gender: "F" },
    ],
    intention: "Comprendre la cause d'un problème et inférer la solution proposée, sans qu'elle soit résumée en une phrase unique.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-medecin-suivi-consultation": {
    speakers: [
      { role: "Médecin", voiceLabel: "voix-a", gender: "H" },
      { role: "Patiente", voiceLabel: "voix-f", gender: "F" },
    ],
    intention: "Suivre une consultation de suivi avec plusieurs recommandations (autorisé/interdit, durée, prochaine étape) et inférer une amélioration générale.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "a2-recit-voyage-etranger": {
    speakers: [
      { role: "Farid", voiceLabel: "voix-e", gender: "H" },
      { role: "Julie", voiceLabel: "voix-b", gender: "F" },
    ],
    intention: "Suivre un récit chronologique de voyage incluant un imprévu, et inférer l'avis global du narrateur malgré l'incident.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "exam-a1-co-1": {
    speakers: [
      { role: "Narrateur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "naturel_soutenu (180 mots/min, voix de synthèse macOS `say`)",
  },
  "exam-a1-co-2": {
    speakers: [
      { role: "Karim", voiceLabel: "Jacques", gender: "H" },
      { role: "Nadia", voiceLabel: "Shelley", gender: "F" },
      { role: "Serveur", voiceLabel: "Thomas", gender: "H" },
    ],
    pace: "naturel (165 mots/min, voix de synthèse macOS `say`)",
  },
  "exam-a2-co-1": {
    speakers: [
      { role: "Narrateur", voiceLabel: "voix-d", gender: "H" },
    ],
    intention: "Repérage d'information : destination, porte d'embarquement, délai.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "blanc1-a2-co-1": {
    speakers: [
      { role: "Secrétariat", voiceLabel: "voix-b", gender: "F" },
    ],
    intention: "Suivre l'annulation d'un rendez-vous et sa reformulation : nouvelle date proposée, action à faire en cas de refus.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  "blanc1-a2-co-2": {
    speakers: [
      { role: "Boulanger", voiceLabel: "voix-a", gender: "H" },
      { role: "Cliente", voiceLabel: "voix-b", gender: "F" },
    ],
    intention: "Comprendre une transaction simple chez un commerçant : quantités, disponibilité d'un produit, prix.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
  },
  // Ajouté par le chantier `audio-humanisation` (docs/audio/humanisation-a1-a2-b1.md
  // §6.6) : piste désormais raccordée à un vrai exercice live (banque
  // d'écoute A2, section "transports"), après correction du mismatch ville-o.
  "a2-annonce-gare-perturbation": {
    speakers: [{ role: "Narrateur", voiceLabel: "voix-d", gender: "H" }],
    intention: "Annonce de gare, registre officiel, sans émotion.",
    pace: "Voix de synthèse macOS `say` (voir chantier/a2-audio, docs/integration/a2-audio.md)",
    pronunciationNotes: ["« voie trois » clairement articulé"],
  },
};

function getProductionMeta(id: string): AudioProductionMeta {
  return AUDIO_PRODUCTION_META[id] ?? { speakers: [] };
}

function tracksFromModule(mod: Module): AudioTrack[] {
  const tracks: AudioTrack[] = [];
  for (const lesson of mod.lessons) {
    for (const activity of lesson.activities) {
      for (const exercise of activity.exercises) {
        if (exercise.type !== "comprehension_orale") continue;
        tracks.push(buildTrack(exercise, {
          kind: "module",
          moduleSlug: mod.slug,
          moduleTitle: mod.title,
          stageId: mod.stageId,
        }));
      }
    }
  }
  return tracks;
}

function tracksFromExams(): AudioTrack[] {
  const tracks: AudioTrack[] = [];
  for (const exam of EXAMS) {
    for (const section of exam.sections) {
      for (const exercise of section.exercises) {
        if (exercise.type !== "comprehension_orale") continue;
        tracks.push(buildTrack(exercise, {
          kind: "exam",
          examSlug: exam.slug,
          examTitle: exam.title,
          sectionId: section.id,
          sectionTitle: section.title,
        }));
      }
    }
  }
  return tracks;
}

function buildTrack(exercise: ComprehensionOraleExercise, context: AudioContext): AudioTrack {
  return {
    id: exercise.id,
    skillId: exercise.skillId,
    syntheticSrc: exercise.audioSrc,
    humanSrc: toHumanAudioPath(exercise.audioSrc),
    locale: "fr-FR",
    transcript: exercise.transcript ?? "",
    context,
    production: getProductionMeta(exercise.id),
  };
}

export const AUDIO_TRACKS: AudioTrack[] = [
  ...MODULES.flatMap(tracksFromModule),
  ...tracksFromExams(),
];
