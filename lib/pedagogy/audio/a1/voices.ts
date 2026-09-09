import type { A1Pace, A1VoiceId, A1VoiceProfile } from "@/lib/pedagogy/audio/a1/types";

/**
 * Voix réellement utilisables localement pour la synthèse A1, auditées sur
 * cette machine avant tout choix (voir docs/integration/a1-audio.md
 * §Voix pour la méthode complète) :
 *
 * - `say -v '?'` liste 9 voix `fr_FR` distinctes de "Thomas"/"Amélie" cités
 *   dans le pack B1 : Eddy, Flo, Grandma, Grandpa, Jacques, Rocko, Sandy,
 *   Shelley, Thomas.
 * - Des voix nommées de meilleure qualité (Audrey, Aurélie, et les voix
 *   neurales "Marie"/"Daniel") ont des fichiers d'assets présents sur le
 *   disque (`/System/Library/AssetsV2/...`) mais ne sont **pas** activées :
 *   `say -v Audrey ...` produit un fichier strictement identique
 *   (comparaison binaire) à `say -v Thomas ...` — bascule silencieuse vers
 *   Thomas, pas une vraie voix Audrey. Confirmé aussi pour Aurelie/Marie.
 *   Ces voix ne sont donc **pas** utilisées ici : les activer demanderait un
 *   téléchargement (Réglages Système > Accessibilité > Contenu énoncé),
 *   explicitement hors du périmètre de ce chantier autonome.
 * - `Jacques` a été vérifié différent de `Thomas` par comparaison binaire :
 *   voix réellement distincte, pas un alias.
 * - Les voix "personnage" (Flo, Grandma, Grandpa, Rocko, Sandy, Shelley,
 *   Eddy) sont elles aussi vérifiées mutuellement distinctes (comparaison
 *   binaire deux à deux) : engine partagé mais rendu réellement différent,
 *   pas des alias silencieux.
 *
 * 7 voix retenues (sur les 9 disponibles) : Thomas et Jacques (voix
 * "standard" adultes, meilleure qualité perçue) comme voix principales
 * homme, Flo/Shelley/Sandy comme voix femme adultes, Grandma/Grandpa
 * réservées aux rôles de grand-mère/grand-père du thème `famille` (usage
 * réaliste, pas un gadget). Eddy et Rocko ne sont pas utilisées : 7 voix
 * suffisent à couvrir toutes les pistes sans jamais dupliquer une voix au
 * sein d'un même dialogue, en gardant une identité stable par personnage
 * récurrent (voir la table des personnages ci-dessous).
 */
export const A1_VOICES: Record<A1VoiceId, A1VoiceProfile> = {
  thomas: {
    id: "thomas",
    sayVoice: "Thomas",
    gender: "H",
    recurringRoles: ["Marc", "Narrateur", "Livreur", "Papi (jeune)"],
    description: "Voix homme adulte standard, registre modulable — même voix que le narrateur B1 pour une identité sonore cohérente entre niveaux.",
  },
  jacques: {
    id: "jacques",
    sayVoice: "Jacques",
    gender: "H",
    recurringRoles: ["Karim", "Vendeur", "Employé"],
    description: "Voix homme adulte distincte de Thomas (timbre plus grave) — second rôle masculin récurrent.",
  },
  flo: {
    id: "flo",
    sayVoice: "Flo",
    gender: "F",
    recurringRoles: ["Léa", "Vendeuse", "Réceptionniste"],
    description: "Voix femme adulte standard, chaleureuse.",
  },
  shelley: {
    id: "shelley",
    sayVoice: "Shelley",
    gender: "F",
    recurringRoles: ["Nadia", "Agent de voyage"],
    description: "Voix femme adulte, timbre nettement distinct de Flo — second rôle féminin récurrent.",
  },
  sandy: {
    id: "sandy",
    sayVoice: "Sandy",
    gender: "F",
    recurringRoles: ["Sophie", "Amie"],
    description: "Voix femme adulte, plus légère/juvénile — troisième rôle féminin pour les scènes à 3 locutrices ou pour varier les monologues.",
  },
  grandma: {
    id: "grandma",
    sayVoice: "Grandma",
    gender: "F",
    recurringRoles: ["Mamie"],
    description: "Voix féminine âgée — réservée au rôle de grand-mère (thème famille), usage réaliste et non un effet gadget.",
  },
  grandpa: {
    id: "grandpa",
    sayVoice: "Grandpa",
    gender: "H",
    recurringRoles: ["Papi"],
    description: "Voix masculine âgée — réservée au rôle de grand-père (thème famille).",
  },
};

/** Débit `say -r` (mots/minute) par palier de rythme demandé — voir docs/integration/a1-audio.md §Difficulté audio. */
export const A1_PACE_WPM: Record<A1Pace, number> = {
  lent: 128,
  naturel: 165,
  naturel_soutenu: 180,
};
