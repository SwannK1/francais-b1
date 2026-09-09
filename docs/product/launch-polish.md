---
title: Launch Polish — bilan du chantier
type: product-audit
lastUpdated: 2026-09-08
---

# Launch Polish — bilan

Chantier `chantier/launch-polish`, base `main` @ `e96b27f` (= HEAD de
`chantier/release-candidate`). Objectif : polir le parcours existant pour
le lancement public, sans nouvelle fonctionnalité massive. Ce document
résume ce chantier ; le détail de l'audit du parcours est dans
`docs/product/launch-polish-audit.md`, le détail du funnel analytics dans
`docs/product/launch-analytics-funnel.md`, et les scénarios encore à
vérifier humainement dans `docs/product/final-human-qa-checklist.md`.

## État initial

Le produit a déjà traversé trois chantiers de polish documentés sur ce
même code (`v1-readiness.md`, `free-premium-audit.md`,
`positioning-a1-b1.md`, `release-candidate.md`) : verdict précédent
**READY WITH MINOR LIMITATIONS**, positionnement A1→B1 cohérent,
sécurité premium vérifiée, SEO corrigé, 495 tests + 8 tests SEO déjà en
place. Ce chantier est donc un second passage de polish, pas un point de
départ — il vérifie que ce qui a été jugé sain reste sain, et cherche
spécifiquement les frictions encore réelles sur le point identifié comme
prioritaire par la consigne : la connexion diagnostic → progression.

## Problème identifié et corrigé

**`getNextModule()` ignorait le niveau CECRL déclaré par le test de
positionnement.** Un utilisateur qui obtenait un résultat A2 ou B1 à
`/test-niveau`, sans avoir encore touché de module, se voyait recommandé
le tout premier module A1 du catalogue par le CTA principal (header, hero,
`PrimaryCta`) — contredisant directement la promesse affichée sur l'écran
de résultat ("on t'emmène à partir de là, pas de zéro"). Détail complet,
correctif et tests dans `docs/product/launch-polish-audit.md` § constat
central.

## Onboarding — avant / après

**Avant :** `/test-niveau` (le test de positionnement, léger, ~10
questions selon arrêt anticipé) sert déjà d'onboarding principal — c'était
déjà la conception voulue par le chantier `positioning-a1-b1`. Un
résultat était produit et affiché, mais sa conséquence réelle sur la suite
du parcours n'était garantie que pour les utilisateurs A1 (premiers
modules du catalogue, par coïncidence d'ordre).
**Après :** même onboarding (pas de nouveau questionnaire ajouté, conforme
à la consigne "pas 20 écrans") — mais son résultat a maintenant une
conséquence réelle et vérifiée pour les 3 niveaux.

## Diagnostic → progression — avant / après

**Avant :** recommandation de découverte indépendante du niveau déclaré.
**Après :** plancher de niveau CECRL (voir audit). Une reprise réelle
(module déjà commencé) n'est jamais affectée par ce plancher — seule la
toute première recommandation en bénéficie.
**Limite assumée, non corrigée :** l'asymétrie gratuit/premium (aucun
module A1/A2 gratuit) peut encore faire retomber un utilisateur gratuit
A1/A2 sur l'un des 2 modules B1 offerts en découverte, dans le cas
spécifique où la recommandation est filtrée par accessibilité réelle
(`/parcours`). Documenté et testé comme comportement assumé depuis
`positioning-a1-b1.md` — non arbitré ici (décision commerciale, hors
périmètre technique de ce chantier).

## Progression / Parcours / Séance du jour / Révision

Aucune régression trouvée. `/parcours` n'affiche qu'une seule
recommandation principale (pas de CTA concurrents, déduplication déjà
faite par un chantier antérieur). `/progression` et `/reviser` ont chacun
un rôle distinct et non redondant (bilan de compétences vs. file de
révision priorisée). Hiérarchie confirmée : reprendre > séance recommandée
> réviser > explorer.

## Premium / Offre

Aucun changement d'accès (conforme à la consigne). `/offre` déjà claire :
comparaison gratuit/premium, gestion de l'état déjà-premium, message
propre si le paiement n'est pas configuré. Asymétrie A1/A2 vs B1
re-confirmée intentionnelle, non arbitrée — voir
`docs/product/free-premium-audit.md` pour le détail et les recommandations
déjà proposées (non implémentées, décision produit).

## Paiement

Relu (`/api/checkout`, webhook Stripe, `/paiement/succes`,
`/paiement/annulation`, portail d'abonnement) : `purchase_completed` ne se
déclenche que sur confirmation serveur du webhook Stripe, jamais de façon
optimiste côté client — la source de vérité est fiable. Aucune
modification apportée, aucune régression trouvée.

## Auth

Relu (inscription, connexion, déconnexion, mot de passe oublié, fusion de
progression à la connexion). Fusion par union (`mergeUserProgress`),
idempotente, sans perte — vérifié dans le code, pas de changement
nécessaire.

## Mobile

Aucun changement visuel dans ce chantier (seule une fonction de logique
pure a été modifiée). Spot-check à 375px effectué sur `/`, `/parcours`,
`/test-niveau`, `/offre` (mesure directe en iframe, la même méthode que le
chantier `v1-polish` a dû utiliser car l'outil `resize_window` du
navigateur ne descend pas sous ~500px de largeur CSS réelle ici) : aucun
débordement horizontal détecté. L'audit mobile complet à 375/320px sur
l'ensemble des pages prioritaires reste celui de
`docs/product/v1-readiness.md` §13 (même code, aucune UI modifiée depuis).
**QA humaine sur vrai appareil (iPhone/Android réels, clavier, audio,
micro) reste à faire** — voir `docs/product/final-human-qa-checklist.md`
§15-17, non simulable de façon fiable par l'outillage disponible ici.

## Accessibilité

Aucun changement de code UI dans ce chantier. État hérité de
`docs/product/v1-readiness.md` §14 (spot-checks positifs sur les libellés
ARIA, le contraste, la structure de titres) — pas un audit WCAG exhaustif.

## Analytics

Funnel minimum demandé entièrement mesurable avec l'instrumentation
existante, aucun événement manquant trouvé — voir
`docs/product/launch-analytics-funnel.md` pour la cartographie complète.
Aucun code analytics ajouté.

## Performance

Aucune régression possible par construction : le seul changement de code
de ce chantier est une fonction pure sans nouvelle dépendance
(`lib/pedagogy/logic/recommendation.ts`), aucun nouveau composant client,
aucun nouvel appel réseau. Build de production réussi sans avertissement
de taille de bundle nouveau. Pas d'audit de performance complet refait ici
(hors périmètre, rien n'a changé côté rendu/chargement).

## SEO

Aucun changement de métadonnées, titres, sitemap ou contenu visible dans
ce chantier. Le test statique `lib/seo/positioning.test.ts` (garde contre
un retour au wording B1-only) reste dans la suite et passe.

## Tests

- Baseline avant ce chantier : 491 tests Vitest + 8 tests SEO (tous
  passent sur ce commit avant modification).
- Ajoutés : 4 tests de régression sur le plancher de niveau
  (`lib/pedagogy/logic/__tests__/recommendation.test.ts`).
- **Total après ce chantier : 495 tests Vitest + 8 tests SEO, tous
  passent.**

Note sur la consigne : le runbook du chantier mentionne une baseline "au
moins 519 tests Vitest" — le nombre réel constaté au démarrage de ce
chantier sur `chantier/launch-polish` (identique à `main`) était 491. Écart
non expliqué par ce chantier (aucun test supprimé ni déplacé ici) —
probablement un chiffre de référence d'un état de repo différent. Signalé
pour transparence plutôt que masqué.

## Limites connues (héritées, non résolues par ce chantier)

- `/diagnostic` (bilan détaillé optionnel) reste déconnecté de
  `useProgress` — refonte technique hors périmètre polish.
- Asymétrie gratuit A1/A2 (rien) vs B1 (2 modules) — décision produit
  assumée.
- Réponses du diagnostic/test-niveau visibles côté client (DevTools) —
  accepté pour un outil gratuit non certifiant.
- QA mobile réelle (vrais appareils), audio/micro réels, Safari vs Chrome
  — reste à faire humainement (checklist fournie).
- Accessibilité : spot-checks seulement, pas d'audit WCAG exhaustif.

## Éléments bloquants pour le lancement

Aucun trouvé. Aucune fuite de contenu premium, aucune régression de
sécurité, build/lint/typecheck/tests tous verts, aucun écran cassé
rencontré pendant la vérification manuelle en navigateur.

## Verdict

**READY WITH MINOR LIMITATIONS**

Le problème le plus critique identifié par la consigne (le diagnostic doit
avoir une conséquence réelle) est corrigé et testé. Les limitations
listées ci-dessus sont soit des décisions produit déjà tranchées par des
chantiers antérieurs (asymétrie gratuit/premium), soit des vérifications
qui nécessitent un vrai appareil/navigateur qu'aucun outil disponible ici
ne peut simuler de façon fiable (micro, audio, vrais mobiles) — pas des
défauts fonctionnels constatés.
