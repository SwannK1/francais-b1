---
title: Checklist QA humaine finale — avant lancement
type: qa-checklist
lastUpdated: 2026-09-08
---

> Mise à jour `chantier/final-launch` (intégration de `launch-polish` +
> `diagnostic-progress` + `audio-humanisation`) : ajout de la section 8bis
> (5 pistes audio prioritaires à écouter avant lancement, voir
> `docs/audio/human-qa-checklist.md` §F pour le détail complet des 58
> pistes humanisées) et confirmation que les points déjà listés ci-dessous
> restent valides après intégration (voir
> `docs/product/final-launch-candidate.md` pour le rapport complet).

# Checklist QA humaine finale

Ces scénarios demandent un vrai humain sur un vrai appareil/navigateur —
l'automatisation de ce chantier (Vitest, navigateur automatisé) a couvert
tout ce qui est vérifiable par ce biais (voir
`docs/product/launch-polish.md` pour le détail), mais plusieurs cas
dépendent de permissions navigateur réelles (micro, TTS) ou d'un vrai
appareil tactile qu'aucun outil d'automatisation disponible ici ne simule
de façon fiable. À cocher avant l'ouverture publique.

## 1. Visite anonyme → diagnostic → première leçon
- [ ] Ouvrir le site en navigation privée (aucun compte, aucun historique).
- [ ] Comprendre en un coup d'œil ce qu'est le site et pour qui, sans faire défiler.
- [ ] Faire `/test-niveau` en répondant sincèrement à un niveau A1 réel.
- [ ] Vérifier que le résultat propose une suite cohérente avec ce niveau (pas de saut vers un contenu trop avancé).
- [ ] Démarrer le premier module proposé et terminer au moins une leçon.

## 2. Création de compte
- [ ] S'inscrire avec un email valide après avoir déjà fait `/test-niveau` en anonyme.
- [ ] Vérifier que la progression anonyme (niveau, module en cours) est bien récupérée après inscription, pas perdue.

## 3. Connexion
- [ ] Se déconnecter puis se reconnecter — vérifier que la progression reste intacte.
- [ ] Tester un mot de passe erroné — message d'erreur clair, pas de comportement bloquant.

## 4. Mot de passe oublié
- [ ] Demander la réinitialisation, recevoir l'email, définir un nouveau mot de passe, se reconnecter avec.

## 5. Progression A1 (vrai apprenant ou simulation sincère)
- [ ] Terminer un module complet du début à la fin, vérifier la mise à jour de `/progression`.

## 6. Progression A2
- [ ] Idem, avec un résultat de diagnostic A2 — vérifier que le point de départ proposé n'est pas le tout début A1.

## 7. Progression B1
- [ ] Idem avec un résultat B1.

## 8. Audio
- [ ] Écouter un exercice de compréhension orale du début à la fin sur un vrai casque/haut-parleur.
- [ ] Couper le son du système et vérifier qu'un message clair apparaît plutôt qu'un silence inexpliqué.

## 8bis. Audio — 5 pistes prioritaires (chantier `audio-humanisation`)
Aucune écoute humaine n'a pu être faite pendant l'intégration (capacité
hors de portée d'un agent IA) — voir `docs/audio/human-qa-checklist.md`
§F pour la liste complète (58 pistes humanisées) et le détail par piste.
Avant tout lancement, écouter au minimum :
- [ ] `public/audio/a1/rendez-vous/prendre-rendez-vous-medecin.m4a` (`m18-f1`, module "La santé") — script entièrement réécrit (pharmacie/douleur/conseil), vérifier que Chloé/Pharmacien sonnent bien distincts.
- [ ] `public/audio/a2/a2-directions-poste-banque.m4a` (`ville-o`, "Se repérer en ville") — piste entièrement nouvelle, vérifier la clarté des indications et la distinction Youssef/Passante.
- [ ] `public/audio/a2/bilan-a2-recit-journee-chronologie.m4a` — seule piste de l'évaluation finale A2 modifiée, vérifier que le barème (3 questions) reste juste.
- [ ] Un échantillon B1 avec correction de voix dupliquée (`decrire-vie-quotidienne`, `hypothese-et-conseil`, `discuter-avec-un-proprietaire`) — vérifier que les 2 locuteurs sonnent réellement distincts.
- [ ] `public/audio/a1/salutations/bonjour-matin.m4a` — première piste du parcours A1, jamais réécoutée depuis.

## 9. Oral
- [ ] Autoriser le micro et faire un exercice de pratique orale en conditions réelles.
- [ ] **Refuser** l'accès au micro — vérifier qu'un message clair apparaît (pas d'écran bloqué/blanc). Cas non simulable par l'automatisation de ce chantier.
- [ ] Tester sur un navigateur sans synthèse vocale/`MediaRecorder` disponible si possible (ancien Safari, navigateur embarqué) — même vérification.

## 10. Révision
- [ ] Marquer un module "à revoir" manuellement, vérifier qu'il apparaît en priorité haute sur `/reviser`.

## 11. Évaluation (bilans de passage)
- [ ] Passer un bilan de fin de niveau, vérifier la cohérence du résultat avec `/progression` (`readyForB1`).

## 12. Premium
- [ ] En tant qu'utilisateur gratuit, vérifier qu'un mur premium s'affiche avec un message compréhensible (pas juste "verrouillé").
- [ ] Vérifier que l'offre (`/offre`) explique clairement ce que premium débloque par rapport à gratuit.

## 13. Checkout test
- [ ] Utiliser une carte de test Stripe pour un paiement complet, vérifier l'arrivée sur `/paiement/succes` et l'activation réelle de l'accès premium (pas juste l'affichage de la page de succès).
- [ ] Interrompre le paiement avant la fin (retour navigateur) — vérifier `/paiement/annulation`.

## 14. Annulation d'abonnement
- [ ] Depuis le portail de gestion d'abonnement, annuler — vérifier le message de fin d'accès (date, pas de coupure brutale si l'accès reste valide jusqu'à la fin de période payée).

## 15. Mobile réel (vrai appareil, pas seulement un viewport simulé)
- [ ] iPhone réel (Safari iOS) : homepage, `/test-niveau`, résultat, `/parcours`, un module, `/progression`, `/reviser`, `/oral`, `/offre`, connexion/inscription, `/paiement/succes`.
- [ ] Android réel (Chrome) : mêmes pages.
- [ ] Champs de formulaire : le clavier ne doit jamais masquer le champ actif ni le bouton de soumission.

## 16. Safari (desktop et iOS)
- [ ] Vérifier spécifiquement la lecture audio et la reconnaissance vocale (API historiquement moins uniformes sur Safari).

## 17. Chrome
- [ ] Parcours complet de bout en bout, sert de référence de comparaison avec Safari.

## Limites déjà documentées (ne pas re-découvrir en QA humaine, déjà connu)
- Diagnostic (`/diagnostic` et `/test-niveau`) : réponses visibles côté client si on ouvre les DevTools — accepté, outil gratuit non certifiant.
- Asymétrie gratuit A1/A2 (rien) vs B1 (2 modules, `se-presenter` et `decrire-vie-quotidienne`, voir `lib/commerce/access.ts` `FREE_MODULE_SLUGS`) — décision produit assumée, pas un bug à signaler. Conséquence directe confirmée pendant l'intégration : un profil anonyme A1 sans aucun module accessible à son niveau peut voir "Se présenter" (B1) recommandé en "prochaine étape" — comportement du fallback `getNextModule` déjà documenté par `chantier/diagnostic-progress`, pas une régression de cette intégration.
- `/diagnostic` reste déconnecté de la progression réelle (`useProgress`) — voir `docs/product/launch-polish-audit.md`.
- Ce sandbox de développement n'a pas de `DATABASE_URL` configurée (voir `.env.example`) : auth/Stripe basculent proprement en "repli anonyme" (pas de crash), mais inscription/connexion/checkout/webhook réels n'ont pas pu être testés de bout en bout pendant l'intégration — sections 2, 3, 4, 13, 14 de cette checklist restent entièrement à faire par un humain avec un environnement complet.
