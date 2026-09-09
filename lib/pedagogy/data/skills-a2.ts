import type { Skill } from "@/lib/pedagogy/types";

/**
 * Compétences A2 — catalogue isolé du B1 (`lib/pedagogy/data/skills.ts`).
 * Tous les identifiants sont préfixés `a2-` pour ne jamais collisionner
 * avec un `skillId` B1, y compris si les deux catalogues sont un jour
 * fusionnés (voir `docs/integration/a2-content.md`). Une compétence n'est
 * retenue ici que parce qu'elle est réellement utilisée dans au moins un
 * module du programme A2 (`docs/a2/curriculum.md`) — même principe que
 * `docs/b1/grammar/grammar-notions.md`.
 */
export const SKILLS_A2: Skill[] = [
  // --- Compréhension écrite ---
  {
    id: "a2-ce-messages-courts",
    domain: "comprehension_ecrite",
    name: "Comprendre un message ou un email court",
    description: "Comprendre l'essentiel d'un message, d'un SMS ou d'un email court de la vie quotidienne.",
  },
  {
    id: "a2-ce-annonces",
    domain: "comprehension_ecrite",
    name: "Comprendre une annonce",
    description: "Comprendre une annonce immobilière, commerciale ou d'événement.",
  },
  {
    id: "a2-ce-programmes-horaires",
    domain: "comprehension_ecrite",
    name: "Comprendre un programme ou un horaire",
    description: "Repérer une information précise dans un programme, un horaire ou une chronologie.",
  },
  {
    id: "a2-ce-recits-courts",
    domain: "comprehension_ecrite",
    name: "Comprendre un petit récit",
    description: "Comprendre un petit récit, un commentaire ou une description simple.",
  },

  // --- Compréhension orale ---
  {
    id: "a2-co-dialogues-quotidiens",
    domain: "comprehension_orale",
    name: "Comprendre un dialogue du quotidien",
    description: "Comprendre une conversation courte et claire sur un sujet familier.",
  },
  {
    id: "a2-co-annonces-publiques",
    domain: "comprehension_orale",
    name: "Comprendre une annonce publique",
    description: "Comprendre l'essentiel d'une annonce dans un lieu public, une gare ou un magasin.",
  },
  {
    id: "a2-co-messages-vocaux",
    domain: "comprehension_orale",
    name: "Comprendre un message vocal",
    description: "Comprendre un message laissé sur un répondeur ou une messagerie.",
  },

  // --- Grammaire ---
  {
    id: "a2-gr-present-verbes-frequents",
    domain: "grammaire",
    name: "Présent des verbes fréquents",
    description: "Conjuguer au présent les verbes les plus utiles au quotidien (être, avoir, aller, faire, vouloir, pouvoir).",
  },
  {
    id: "a2-gr-pronominaux",
    domain: "grammaire",
    name: "Verbes pronominaux du quotidien",
    description: "Utiliser les verbes pronominaux de la routine (se lever, s'appeler, se reposer).",
  },
  {
    id: "a2-gr-possessifs",
    domain: "grammaire",
    name: "Adjectifs possessifs",
    description: "Utiliser mon/ma/mes, ton/ta/tes, son/sa/ses... pour parler de sa famille et de ses affaires.",
  },
  {
    id: "a2-gr-il-faut-infinitif",
    domain: "grammaire",
    name: "Il faut + infinitif",
    description: "Exprimer une nécessité ou un conseil simple avec il faut + infinitif.",
  },
  {
    id: "a2-gr-connecteurs-chronologiques",
    domain: "grammaire",
    name: "Connecteurs chronologiques",
    description: "Organiser un petit récit dans le temps avec d'abord, ensuite, après, enfin.",
  },
  {
    id: "a2-gr-passe-compose",
    domain: "grammaire",
    name: "Passé composé",
    description: "Former le passé composé avec avoir et être, avec les accords essentiels.",
  },
  {
    id: "a2-gr-imparfait-introduction",
    domain: "grammaire",
    name: "Imparfait (introduction)",
    description: "Utiliser l'imparfait pour décrire une habitude ou une situation passée.",
  },
  {
    id: "a2-gr-passe-compose-imparfait-contraste",
    domain: "grammaire",
    name: "Passé composé / imparfait (contraste élémentaire)",
    description: "Choisir entre passé composé et imparfait dans un récit très simple.",
  },
  {
    id: "a2-gr-futur-proche",
    domain: "grammaire",
    name: "Futur proche",
    description: "Annoncer une action à venir avec aller + infinitif.",
  },
  {
    id: "a2-gr-futur-simple-introduction",
    domain: "grammaire",
    name: "Futur simple (introduction)",
    description: "Utiliser le futur simple pour un projet ou une prévision.",
  },
  {
    id: "a2-gr-imperatif",
    domain: "grammaire",
    name: "Impératif",
    description: "Donner une instruction, un conseil ou une indication simple.",
  },
  {
    id: "a2-gr-comparatif",
    domain: "grammaire",
    name: "Comparatif",
    description: "Comparer deux choses, deux personnes ou deux lieux (plus/moins/aussi... que).",
  },
  {
    id: "a2-gr-superlatif-simple",
    domain: "grammaire",
    name: "Superlatif simple",
    description: "Exprimer un degré maximal ou minimal (le/la plus... , le/la moins...).",
  },
  {
    id: "a2-gr-pronoms-cod",
    domain: "grammaire",
    name: "Pronoms compléments d'objet direct",
    description: "Remplacer un nom déjà mentionné avec le, la, les.",
  },
  {
    id: "a2-gr-pronoms-coi",
    domain: "grammaire",
    name: "Pronoms compléments d'objet indirect",
    description: "Remplacer un complément introduit par « à » avec lui, leur.",
  },
  {
    id: "a2-gr-y-en-introduction",
    domain: "grammaire",
    name: "Les pronoms y et en (introduction)",
    description: "Utiliser y et en pour remplacer un lieu ou une quantité déjà mentionnés.",
  },
  {
    id: "a2-gr-quantite-partitifs",
    domain: "grammaire",
    name: "Quantité et articles partitifs",
    description: "Exprimer une quantité avec du, de la, des, un peu de, beaucoup de.",
  },
  {
    id: "a2-gr-adverbes-frequence",
    domain: "grammaire",
    name: "Adverbes de fréquence",
    description: "Situer une habitude avec toujours, souvent, parfois, rarement, jamais.",
  },
  {
    id: "a2-gr-connecteurs-simples",
    domain: "grammaire",
    name: "Connecteurs simples",
    description: "Relier deux idées avec et, mais, donc, parce que.",
  },
  {
    id: "a2-gr-cause-simple",
    domain: "grammaire",
    name: "Exprimer une cause simple",
    description: "Expliquer la cause d'une situation avec parce que ou car.",
  },
  {
    id: "a2-gr-consequence-simple",
    domain: "grammaire",
    name: "Exprimer une conséquence simple",
    description: "Exprimer une conséquence avec donc ou alors.",
  },
  {
    id: "a2-gr-expressions-temporelles",
    domain: "grammaire",
    name: "Expressions temporelles",
    description: "Situer une action dans le temps avec depuis, il y a, dans, pendant.",
  },
  {
    id: "a2-gr-relatifs-qui-que",
    domain: "grammaire",
    name: "Pronoms relatifs qui/que (introduction)",
    description: "Relier deux phrases simples avec qui ou que.",
  },
  {
    id: "a2-gr-si-condition-elementaire",
    domain: "grammaire",
    name: "Si + présent (condition élémentaire)",
    description: "Exprimer une condition réalisable et sa conséquence avec si + présent.",
  },
  {
    id: "a2-gr-but-simple",
    domain: "grammaire",
    name: "Exprimer un but simple",
    description: "Exprimer un but avec pour + infinitif.",
  },

  // --- Vocabulaire ---
  {
    id: "a2-voc-identite",
    domain: "vocabulaire",
    name: "Identité et parcours",
    description: "Mots pour se présenter en détail : origine, parcours, situation actuelle.",
  },
  {
    id: "a2-voc-famille",
    domain: "vocabulaire",
    name: "Famille et relations",
    description: "Mots pour parler de sa famille et de ses relations proches.",
  },
  {
    id: "a2-voc-quotidien",
    domain: "vocabulaire",
    name: "Vie quotidienne",
    description: "Mots pour décrire une journée, une routine et des tâches du quotidien.",
  },
  {
    id: "a2-voc-logement",
    domain: "vocabulaire",
    name: "Logement",
    description: "Mots pour décrire un logement, ses pièces et son équipement.",
  },
  {
    id: "a2-voc-voisinage",
    domain: "vocabulaire",
    name: "Voisinage et problèmes courants",
    description: "Mots pour décrire un problème de logement ou de voisinage.",
  },
  {
    id: "a2-voc-achats",
    domain: "vocabulaire",
    name: "Achats et quantités",
    description: "Mots pour faire ses courses, comparer des produits et exprimer une quantité.",
  },
  {
    id: "a2-voc-ville-services",
    domain: "vocabulaire",
    name: "Ville et services",
    description: "Mots pour se repérer en ville et utiliser la poste, la banque ou la mairie.",
  },
  {
    id: "a2-voc-loisirs-gouts",
    domain: "vocabulaire",
    name: "Loisirs et goûts",
    description: "Mots pour parler de ses loisirs et de ses préférences.",
  },
  {
    id: "a2-voc-transports",
    domain: "vocabulaire",
    name: "Transports",
    description: "Mots pour décrire un trajet, une gare, un horaire ou un retard.",
  },
  {
    id: "a2-voc-voyage",
    domain: "vocabulaire",
    name: "Voyage et réservation",
    description: "Mots pour organiser un voyage, réserver un hébergement et gérer un imprévu simple.",
  },
  {
    id: "a2-voc-sante",
    domain: "vocabulaire",
    name: "Santé et pharmacie",
    description: "Mots pour décrire un symptôme simple et comprendre un conseil de santé.",
  },
  {
    id: "a2-voc-travail",
    domain: "vocabulaire",
    name: "Travail",
    description: "Mots pour décrire un métier, des horaires et des tâches professionnelles.",
  },
  {
    id: "a2-voc-recherche-emploi",
    domain: "vocabulaire",
    name: "Recherche d'emploi",
    description: "Mots pour une recherche d'emploi simple et un premier contact professionnel.",
  },
  {
    id: "a2-voc-etudes",
    domain: "vocabulaire",
    name: "Études et formation",
    description: "Mots pour parler de ses études, d'une formation et d'un emploi du temps.",
  },
  {
    id: "a2-voc-numerique",
    domain: "vocabulaire",
    name: "Téléphone et numérique",
    description: "Mots pour le téléphone, les messages et les usages numériques quotidiens.",
  },
  {
    id: "a2-voc-meteo",
    domain: "vocabulaire",
    name: "Météo et saisons",
    description: "Mots pour parler du temps qu'il fait et des saisons.",
  },
  {
    id: "a2-voc-evenements",
    domain: "vocabulaire",
    name: "Événements et invitations",
    description: "Mots pour organiser une fête, un anniversaire ou une invitation.",
  },
  {
    id: "a2-voc-projets",
    domain: "vocabulaire",
    name: "Projets et vacances",
    description: "Mots pour parler de projets, d'intentions et de vacances.",
  },
  {
    id: "a2-voc-experiences",
    domain: "vocabulaire",
    name: "Expériences et souvenirs",
    description: "Mots pour raconter brièvement une expérience ou un souvenir.",
  },

  // --- Production écrite ---
  {
    id: "a2-pe-se-presenter",
    domain: "production_ecrite",
    name: "Se présenter par écrit",
    description: "Rédiger un texte court de présentation personnelle.",
  },
  {
    id: "a2-pe-decrire",
    domain: "production_ecrite",
    name: "Décrire par écrit",
    description: "Décrire une personne, un lieu ou une situation avec quelques détails.",
  },
  {
    id: "a2-pe-message-informel",
    domain: "production_ecrite",
    name: "Écrire un message informel",
    description: "Rédiger un message court à un ami, un proche ou un voisin.",
  },
  {
    id: "a2-pe-repondre-invitation",
    domain: "production_ecrite",
    name: "Répondre à une invitation",
    description: "Accepter, refuser ou proposer une modification à une invitation par écrit.",
  },
  {
    id: "a2-pe-demander-information",
    domain: "production_ecrite",
    name: "Demander une information par écrit",
    description: "Rédiger une question claire pour obtenir une information pratique.",
  },
  {
    id: "a2-pe-raconter-brievement",
    domain: "production_ecrite",
    name: "Raconter brièvement",
    description: "Raconter un événement passé en quelques phrases, situées dans le temps.",
  },
  {
    id: "a2-pe-organiser-sortie",
    domain: "production_ecrite",
    name: "Organiser une sortie ou un événement",
    description: "Proposer et organiser une sortie ou un événement par écrit.",
  },

  // --- Préparation examen ---
  {
    id: "a2-exam-delf-a2",
    domain: "preparation_examen",
    name: "Préparation DELF A2",
    description: "Compétences attendues pour l'examen DELF A2.",
  },
];

export function getSkillByIdA2(id: string): Skill | undefined {
  return SKILLS_A2.find((skill) => skill.id === id);
}
