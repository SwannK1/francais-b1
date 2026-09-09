---
title: Audit gratuit / premium — V1
type: product-audit
lastUpdated: 2026-09-07
---

# Audit gratuit / premium

État constaté du produit tel qu'il est aujourd'hui, sans arbitrage
commercial nouveau — ce chantier documente et corrige les bugs manifestes,
il ne décide pas d'ouvrir ou fermer du contenu (consigne explicite du
chantier Final Polish V1). Base : le tableau déjà établi par
`docs/integration/product-v1.md` § 5, revérifié contre le code actuel et
complété par fonctionnalité.

## Tableau par fonctionnalité

| Fonctionnalité | Statut | Détail |
|---|---|---|
| Diagnostic (`/diagnostic`) | **Gratuit**, non gated | Aucun `canAccess()` sur la route ; 18 questions, résultat et recommandation toujours visibles. |
| Test de positionnement (`/test-niveau`) | **Gratuit** | Idem, plus ancien équivalent. |
| Modules A1 | **Premium** | Aucun module A1 offert en découverte (contrairement au B1, voir plus bas) — asymétrie constatée, pas un bug technique. |
| Modules A2 | **Premium** | Idem, aucun module A2 gratuit. |
| Modules B1 | **Partiellement gratuit** | 2 modules complets offerts en découverte (`se-presenter`, `decrire-vie-quotidienne`), le reste premium. |
| Examens (A1/A2/B1) | **Toujours premium** | `canAccess()` avant rendu de `ExamExperience`, cohérent pour les 3 niveaux. |
| Révision espacée (`/reviser`) | **Non gated** (page) | La page elle-même est libre d'accès ; chaque lien cible respecte le statut premium de son module/compétence — un utilisateur gratuit y voit ses recommandations mais retombe sur `PremiumLock` en suivant un lien vers du contenu premium. |
| Séance du jour (`/parcours/seance`) | **Non gated** (page) | Verrouille dynamiquement si le module ciblé est premium (`PremiumLock`, CTA "Débloquer") — même logique que `/reviser`. |
| Oral (`/oral`) | **Partiellement gratuit** | 2 exercices de découverte (`FREE_SPEAKING_EXERCISE_IDS`), le reste premium. |
| Évaluations de passage (`/parcours/evaluations`) | **Toujours premium** | Les 4 bilans/passages (fin-a1, passage-a1-a2, fin-a2, passage-a2-b1), aucune exception. |
| Audio | Suit le statut de son exercice/module porteur | Pas de statut premium propre à l'audio lui-même. |

## Incohérences constatées

### 1. Asymétrie A1/A2 vs B1 sur la découverte gratuite (signal produit, pas un bug)

Un nouvel utilisateur gratuit peut :
1. Faire le diagnostic (gratuit) et se voir recommander un module A1 réel
   (première étape logique s'il est vraiment débutant) ;
2. Consulter la fiche de ce module (titre, description, objectifs — la
   partie publique) ;
3. **N'avoir accès à aucun module A1 réel gratuitement** pour l'essayer,
   alors qu'un profil B1 dans la même situation a 2 modules complets
   offerts.

Déjà signalé par `docs/integration/product-v1.md` § 5 et
`a1-a2-b1-integration.md` § 4 comme décision commerciale hors périmètre
technique — confirmé inchangé ici, non arbitré par ce chantier (consigne
explicite : ne pas décider arbitrairement d'ouvrir/fermer du contenu). Un
apprenant qui se qualifie A1 ou A2 par le diagnostic (gratuit, sans
friction) rencontre donc un mur premium plus tôt dans son parcours réel
qu'un apprenant B1 — c'est un choix produit à trancher, pas un défaut de
code.

### 2. Paywall vu mais jamais mesuré avant ce chantier (corrigé)

`PremiumLock` ne trackait que le clic (`premium_cta_clicked`), jamais le
fait d'atterrir dessus. Impossible avant ce chantier de savoir combien
d'utilisateurs *voient* un mur premium sans jamais cliquer dessus (signal
de friction silencieuse) — voir `docs/product/analytics-plan.md`. Corrigé
par l'ajout de `paywall_viewed`.

### 3. Diagnostic gratuit mais réponses visibles côté client (signalé, non corrigé — cohérent avec l'existant)

Voir § Sécurité premium ci-dessous — ce n'est pas un problème gratuit/premium
au sens strict (aucun contenu payant en jeu), mais ça mérite d'être lu en
regard de ce tableau : le diagnostic étant l'un des deux points d'entrée
gratuits du produit (avec `/test-niveau`), sa fiabilité en tant qu'outil de
qualification (pas de contenu payant) reste un point d'attention si son rôle
produit évolue un jour vers un test certifiant.

## Frictions identifiées

- **Le mur premium arrive au même endroit techniquement (`PremiumLock`)
  pour des contextes très différents** (module suivant, séance du jour,
  révision, oral, évaluation) — le composant est générique et ne dit jamais
  "c'est parce que tu as terminé la découverte gratuite" vs. "c'est parce
  que ce contenu a toujours été premium" (cas d'un examen ou d'une
  évaluation). Un utilisateur qui vient de terminer un module B1 gratuit et
  un utilisateur qui n'a jamais rien terminé voient exactement le même
  message. Amélioration possible mais non triviale (nécessiterait de
  passer un contexte supplémentaire à `PremiumLock` selon l'appelant) —
  non faite dans ce chantier pour rester dans "corriger les bugs
  manifestes", pas "redesigner l'écran de paywall".
- **Aucune indication du nombre d'éléments gratuits restants** avant de
  tomber sur du premium (ex. "encore 1 module B1 gratuit avant l'offre") —
  frein à la transparence, pas un bug.

## Recommandations (non implémentées ici — hors périmètre "corriger les bugs manifestes")

1. Décider explicitement si un module A1 (et/ou A2) doit rejoindre la
   découverte gratuite, symétriquement au B1 — décision produit, pas
   technique.
2. Utiliser `paywall_viewed` vs `premium_cta_clicked` (maintenant mesurés
   tous les deux) pour quantifier le taux de conversion réel du mur premium
   avant de faire évoluer son wording ou son design.
3. Si le diagnostic devient un jour un test certifiant, revoir l'exposition
   client de `correctChoiceId` (actuellement acceptée car outil non gradé,
   gratuit).

## Ce qui a été corrigé dans ce chantier

Uniquement des bugs manifestes, comme demandé — aucun changement d'accès :

- Instrumentation `paywall_viewed` (mesure manquante, pas un accès mal
  configuré).
- Aucune régression de `canAccess()` trouvée sur aucune des routes premium
  auditées (voir § Sécurité premium, `docs/product/v1-readiness.md`).
