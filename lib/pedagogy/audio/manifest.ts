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
  "blanc1-co-2": {
    speakers: [
      { role: "Thomas", voiceLabel: "Voix A", gender: "H" },
      { role: "Nadia", voiceLabel: "Voix B", gender: "F" },
    ],
    pace: "Posé, ton bureau/collègues, courtes pauses entre répliques.",
    pronunciationNotes: ["« 18h » → « dix-huit heures »", "« 17h » → « dix-sept heures »"],
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
