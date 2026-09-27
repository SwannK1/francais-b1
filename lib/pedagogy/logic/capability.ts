/**
 * Formulation « ce que tu sauras faire » d'un module, dérivée des données
 * déjà rédigées — jamais un second champ éditorial à maintenir. Les
 * descriptions de module suivent (presque) toutes le gabarit « À la fin de
 * ce module, tu pourras … » / « tu peux … » / « tu es capable de … » : on en
 * garde la proposition d'action, en infinitif, avec une majuscule.
 *
 * Exemple : « À la fin de ce module, tu pourras expliquer un problème et
 * demander une solution. » → « Expliquer un problème et demander une solution ».
 *
 * Repli sur le titre du module quand la description ne suit pas ce gabarit
 * (modules d'entraînement, banques d'écoute...) : il vaut mieux un titre
 * exact qu'une phrase reconstruite de travers.
 */
const CAPABILITY_PATTERN =
  /^\s*À la fin de ce module,\s*tu\s+(?:pourras|peux|sauras|es capable de|seras capable de)\s+(.+?)\s*\.?\s*$/i;

/** Au-delà, la phrase devient un paragraphe : le titre, plus court, est plus lisible. */
const MAX_CAPABILITY_LENGTH = 110;

export function getModuleCapability(mod: { title: string; description?: string }): string {
  const match = mod.description?.match(CAPABILITY_PATTERN);
  const action = match?.[1]?.trim();
  if (!action || action.length > MAX_CAPABILITY_LENGTH) return mod.title;
  return action.charAt(0).toUpperCase() + action.slice(1);
}
