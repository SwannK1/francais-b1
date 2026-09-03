/**
 * Types du cœur pédagogique — source de vérité unique pour toute forme de
 * données pédagogiques dans le projet (pas de types parallèles ailleurs).
 * Architecture : Niveau CECRL -> Module -> Lesson (étape) -> Activity -> Exercise -> Question.
 * Le contenu concret vit dans `data/`, le calcul dérivé dans `logic/`.
 */

export type CEFRLevel = "A1" | "A2" | "B1" | "B2";

export const CEFR_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2"];

export type SkillDomain =
  | "comprehension_ecrite"
  | "comprehension_orale"
  | "grammaire"
  | "vocabulaire"
  | "production_ecrite"
  | "preparation_examen";

export interface Skill {
  id: string;
  domain: SkillDomain;
  name: string;
  description: string;
}

/** Retour pédagogique détaillé, jamais limité à "Faux". */
export interface Correction {
  correctAnswer: string;
  explanation: string;
  rappelRegle?: string;
  notionAssociee?: string;
  conseil?: string;
}

export interface QuestionChoice {
  id: string;
  text: string;
}

/**
 * Sous-question d'une compréhension écrite/orale (section E/F d'un module).
 * Les contenus réels mélangent QCM, vrai/faux et questions ouvertes — d'où
 * cette union plutôt qu'une forme unique imposant des choix à tout.
 */
export interface QcmSubQuestion {
  kind: "qcm";
  id: string;
  prompt: string;
  choices: QuestionChoice[];
  correctChoiceId: string;
  correction: Correction;
}

export interface VraiFauxSubQuestion {
  kind: "vrai_faux";
  id: string;
  prompt: string;
  correctAnswer: boolean;
  correction: Correction;
}

/** Question ouverte : pas de correction automatique fiable, réponse à comparer soi-même. */
export interface LibreSubQuestion {
  kind: "libre";
  id: string;
  prompt: string;
  expectedAnswer: string;
  correction: Correction;
}

export type Question = QcmSubQuestion | VraiFauxSubQuestion | LibreSubQuestion;

export type ExerciseType =
  | "qcm"
  | "vrai_faux"
  | "texte_a_trous"
  | "remise_en_ordre"
  | "association"
  | "comprehension_ecrite"
  | "comprehension_orale"
  | "reponse_courte"
  | "production_ecrite"
  | "production_orale";

interface ExerciseBase {
  id: string;
  skillId: string;
  difficulty: CEFRLevel;
  instructions: string;
}

export interface QcmExercise extends ExerciseBase {
  type: "qcm";
  question: QcmSubQuestion;
}

export interface VraiFauxExercise extends ExerciseBase {
  type: "vrai_faux";
  statement: string;
  correctAnswer: boolean;
  correction: Correction;
}

export interface TexteATrousExercise extends ExerciseBase {
  type: "texte_a_trous";
  /** Texte contenant des espaces réservés du type {{1}}, {{2}}... */
  textWithBlanks: string;
  blanks: { id: string; answer: string }[];
  correction: Correction;
}

export interface RemiseEnOrdreExercise extends ExerciseBase {
  type: "remise_en_ordre";
  items: { id: string; text: string }[];
  /** Ordre correct, exprimé comme une liste d'identifiants d'items. */
  correctOrder: string[];
  correction: Correction;
}

export interface AssociationExercise extends ExerciseBase {
  type: "association";
  pairs: { id: string; left: string; right: string }[];
  correction: Correction;
}

export interface ComprehensionEcriteExercise extends ExerciseBase {
  type: "comprehension_ecrite";
  text: string;
  questions: Question[];
}

export interface ComprehensionOraleExercise extends ExerciseBase {
  type: "comprehension_orale";
  /** Chemin vers un audio préenregistré, ou placeholder si absent. */
  audioSrc: string;
  transcript?: string;
  questions: Question[];
}

export interface ReponseCourteExercise extends ExerciseBase {
  type: "reponse_courte";
  question: string;
  /**
   * Réponses acceptées (comparaison insensible à la casse). Tableau vide =
   * question ouverte sans correction automatique fiable (ex. item libre
   * d'une mini-évaluation) : `WrittenExercise` la traite alors comme
   * auto-évaluée plutôt que comme une réponse fausse — ne jamais lire un
   * tableau vide comme "aucune bonne réponse acceptée" ou comme un oubli.
   */
  acceptedAnswers: string[];
  correction: Correction;
}

/** Champs prêts pour une correction IA future, non implémentée ici. */
export interface ProductionEcriteExercise extends ExerciseBase {
  type: "production_ecrite";
  consigne: string;
  minWords: number;
  maxWords?: number;
  correctionCriteria: string[];
  aiCorrectionAvailable: boolean;
}

/**
 * Aucune correction automatique de la prononciation/de l'oral n'existe (ni
 * ici, ni prévue) : après l'enregistrement, l'apprenant s'auto-évalue via
 * `selfAssessmentCriteria`, jamais noté comme une correction officielle.
 */
export interface ProductionOraleExercise extends ExerciseBase {
  type: "production_orale";
  consigne: string;
  /** Document ou mise en situation déclenchant la prise de parole, si besoin. */
  context?: string;
  prepSeconds: number;
  /** Durée de parole conseillée (indicative, n'interrompt pas l'enregistrement). */
  maxSpeakSeconds?: number;
  selfAssessmentCriteria: string[];
  tips?: string;
}

export type Exercise =
  | QcmExercise
  | VraiFauxExercise
  | TexteATrousExercise
  | RemiseEnOrdreExercise
  | AssociationExercise
  | ComprehensionEcriteExercise
  | ComprehensionOraleExercise
  | ReponseCourteExercise
  | ProductionEcriteExercise
  | ProductionOraleExercise;

/** Regroupement d'exercices autour d'un même contenu pédagogique. */
export interface Activity {
  id: string;
  title: string;
  skillDomain: SkillDomain;
  exercises: Exercise[];
}

export type LessonStepType =
  | "decouvrir"
  | "comprendre"
  | "entrainement"
  | "ecoute"
  | "ecriture"
  | "evaluation";

/** Une étape d'un module (Découvrir, Comprendre, S'entraîner...). */
export interface Lesson {
  id: string;
  type: LessonStepType;
  title: string;
  optional: boolean;
  activities: Activity[];
}

export type VocabularyCategory = "principal" | "expression" | "verbe" | "connecteur";

export interface VocabularyEntry {
  term: string;
  category: VocabularyCategory;
}

/** Un point de grammaire expliqué dans la section "Point de langue" d'un module. */
export interface LanguagePoint {
  title: string;
  explanation: string;
}

/**
 * Identifiants stables des grandes étapes du parcours B1 (voir
 * `data/parcours-stages.ts` pour leur définition complète). Type fermé —
 * plutôt qu'une chaîne libre — pour qu'une affectation de module vers une
 * étape inexistante soit une erreur de compilation, pas une surprise en
 * exécution.
 */
export type StageId =
  | "faire-le-point"
  | "b1-debut"
  | "b1-intermediaire"
  | "b1-consolidation"
  | "preparation-examen"
  | "pret-pour-le-b1";

export interface Module {
  id: string;
  slug: string;
  level: CEFRLevel;
  title: string;
  description: string;
  objectives: string[];
  domain: SkillDomain;
  /**
   * Étape du parcours à laquelle ce module est explicitement affecté.
   * Source de vérité unique pour "quels modules appartiennent à quelle
   * étape" — ne jamais redériver cette affectation depuis `domain`, l'ordre
   * du tableau, ou l'identifiant du module.
   */
  stageId: StageId;
  estimatedMinutes: number;
  lessons: Lesson[];
  /** Champs de contenu réel (module rédigé) — absents sur un module minimal. */
  situation?: string;
  vocabulary?: VocabularyEntry[];
  languagePoints?: LanguagePoint[];
  examLinks?: string[];
  /** Score minimum (sur 10) pour valider la mini-évaluation du module. */
  miniEvaluationThreshold?: number;
}

// --- Frontière contenu public / contenu protégé ---
//
// `Module` (ci-dessus) porte le contenu pédagogique complet — consignes,
// textes, questions, choix, **réponses correctes**, transcripts. Il ne doit
// jamais être importé par du code qui s'exécute côté client pour un module
// dont l'accès n'a pas déjà été vérifié côté serveur (voir
// `docs/architecture/user-lifecycle.md` § Premium content boundary).
//
// `PublicModule` est la forme sûre : mêmes métadonnées de navigation
// (id, slug, titre, niveau, étape...) et la même arborescence
// leçons/activités/exercices, mais chaque exercice ne garde que ce qui est
// nécessaire à la navigation et au calcul de progression — jamais son
// contenu ni sa réponse. Dérivée de `Module` par
// `lib/pedagogy/data/modules-public.ts` (serveur uniquement).

/** Un exercice réduit à ce qui est nécessaire à la navigation/progression — jamais son contenu ni sa réponse. */
export interface PublicExercise {
  id: string;
  type: ExerciseType;
  skillId: string;
  difficulty: CEFRLevel;
}

export interface PublicActivity {
  id: string;
  title: string;
  skillDomain: SkillDomain;
  exercises: PublicExercise[];
}

export interface PublicLesson {
  id: string;
  type: LessonStepType;
  title: string;
  optional: boolean;
  activities: PublicActivity[];
}

/** Vue publique d'un `Module` — sûre à envoyer à n'importe quel visiteur, quel que soit son statut premium. */
export interface PublicModule {
  id: string;
  slug: string;
  level: CEFRLevel;
  title: string;
  description: string;
  objectives: string[];
  domain: SkillDomain;
  stageId: StageId;
  estimatedMinutes: number;
  lessons: PublicLesson[];
  /** Précalculé à la dérivation — évite d'avoir à exposer le détail des exercices juste pour les compter. */
  totalExercises: number;
}

// --- Progression ---

export interface SkillProgress {
  skillId: string;
  domain: SkillDomain;
  totalExercises: number;
  completedExercises: number;
  correctExercises: number;
  successRate: number;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  correctExerciseIds: string[];
  lastActivityAt: string | null;
}

export interface UserProgress {
  userId: string;
  level: CEFRLevel;
  goalId?: LearningGoalId;
  moduleProgress: ModuleProgress[];
  skillProgress: SkillProgress[];
  globalSuccessRate: number;
  lastActivityAt: string | null;
  weakSkillIds: string[];
  /** Date du test de positionnement complété, ou null si jamais passé. */
  placementCompletedAt: string | null;
  /** Distinct de `moduleProgress` : progression du curriculum et tentatives d'examen ne sont jamais mélangées. */
  examAttempts: ExamAttempt[];
  /**
   * Modules explicitement marqués "à revoir" par l'apprenant (voir
   * `logic/progress.ts` : `toggleModuleReview`). Orthogonal au statut de
   * complétion — un module peut être à la fois "terminé" et "à revoir" : ce
   * n'est pas une étape du cycle de vie du module, juste une étiquette
   * manuelle. Champ ajouté après le lancement : toujours défaulté à `[]`
   * via `INITIAL_USER_PROGRESS`/`EMPTY_USER_PROGRESS`, donc une progression
   * existante sans ce champ reste valide (voir `useProgress.ts: parseProgress`).
   */
  reviewedModuleIds: string[];
}

// --- Séance recommandée ---

export interface DailySession {
  goalLevel: CEFRLevel;
  moduleId: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  exerciseCount: number;
  includesListening: boolean;
  includesWriting: boolean;
  focusSkillId: string | null;
  reason: string;
}

// --- Test de positionnement ---

export interface PlacementQuestion {
  id: string;
  level: CEFRLevel;
  domain: SkillDomain;
  prompt: string;
  choices: QuestionChoice[];
  correctChoiceId: string;
}

export interface PlacementAnswer {
  questionId: string;
  choiceId: string;
}

export interface PlacementDomainScore {
  domain: SkillDomain;
  correct: number;
  total: number;
  successRate: number;
}

/** Statut pédagogique d'un niveau au sein du test de positionnement. */
export type PlacementLevelStatus = "acquired" | "partial" | "gap";

export interface PlacementLevelScore {
  level: CEFRLevel;
  correct: number;
  total: number;
  successRate: number;
  /** "acquired" (>= seuil de réussite), "gap" (lacune critique), "partial" (entre les deux). */
  status: PlacementLevelStatus;
}

/** Résultat indicatif : "niveau estimé", pas une certification CECRL officielle. */
export interface PlacementResult {
  estimatedLevel: CEFRLevel;
  globalScore: number;
  levelScores: PlacementLevelScore[];
  domainScores: PlacementDomainScore[];
  strengths: SkillDomain[];
  weaknesses: SkillDomain[];
}

// --- Objectifs utilisateur ---

export type LearningGoalId =
  | "ameliorer_francais"
  | "vivre_en_france"
  | "carte_sejour"
  | "carte_resident"
  | "naturalisation"
  | "etudes"
  | "travail"
  | "delf"
  | "tcf_irn";

/**
 * Structure éditable : le niveau recommandé n'encode aucune règle juridique
 * définitive et doit pouvoir être mis à jour si la réglementation change.
 */
export interface LearningGoal {
  id: LearningGoalId;
  title: string;
  description: string;
  recommendedLevel: CEFRLevel;
  note?: string;
}

// --- Examens ---

export type ExamType = "delf" | "tcf_irn" | "interne";

/**
 * Les 4 épreuves DELF — type dédié plutôt que `SkillDomain` : ce dernier
 * porte des valeurs sans rapport avec une épreuve d'examen (grammaire,
 * vocabulaire...) et ne distingue pas production écrite/orale de la même
 * façon qu'un `ExerciseType` le fait déjà.
 */
export type DelfSection =
  | "comprehension_orale"
  | "comprehension_ecrite"
  | "production_ecrite"
  | "production_orale";

export interface ExamSection {
  id: string;
  title: string;
  /** Épreuve DELF représentée — affectation explicite, jamais déduite des exercices. */
  delfSection: DelfSection;
  durationMinutes: number;
  maxScore: number;
  /**
   * Note éliminatoire officielle DELF (ex. 5/25) : en dessous, l'examen est
   * échoué même si le total dépasse `passingScore`. Absent = pas de règle
   * éliminatoire pour cette section (cas de l'examen de démonstration).
   */
  eliminatoryScore?: number;
  exercises: Exercise[];
}

export interface Exam {
  id: string;
  slug: string;
  title: string;
  type: ExamType;
  level: CEFRLevel;
  description: string;
  sections: ExamSection[];
  durationMinutes: number;
  maxScore: number;
  passingScore: number;
  /** true = examen blanc complet, false = entraînement ciblé. */
  isBlanc: boolean;
}

// --- Tentatives d'examen ---

export type ExamAttemptStatus = "in_progress" | "completed" | "abandoned";

export type SectionResultStatus = "not_started" | "in_progress" | "completed";

/**
 * Résultat d'une épreuve au sein d'une tentative. `score` vaut `null` tant
 * qu'aucune note fiable n'existe — jamais `0` par défaut, pour ne pas
 * confondre "pas encore évalué" et "0 point" (compréhension écrite/orale :
 * calculé automatiquement une fois l'épreuve complète ; production
 * écrite/orale : reste `null` ici, aucune correction automatique fiable
 * n'existe — `selfAssessed` indique seulement qu'une grille d'auto-évaluation
 * a été remplie, jamais une note officielle).
 */
export interface SectionResult {
  section: DelfSection;
  status: SectionResultStatus;
  score: number | null;
  maxScore: number;
  selfAssessed: boolean;
  completedExerciseIds: string[];
  correctExerciseIds: string[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  startedAt: string;
  completedAt: string | null;
  status: ExamAttemptStatus;
  sections: SectionResult[];
}
