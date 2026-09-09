# Positionnement public : A1 → A2 → B1

Chantier `chantier/positioning-a1-b1`, basé sur `chantier/product-integration`
(le produit réel couvre désormais A1, A2, B1, diagnostic, progression,
séance du jour, révision espacée, compréhension et pratique orale,
évaluations de passage). Ce document fixe le nouveau positionnement public et
les règles de wording à respecter pour que la communication ne redevienne
pas silencieusement B1-only.

## Ancien positionnement

Le site avait été construit à l'origine comme un produit B1 seul (préparation
DELF B1). Après l'intégration A1/A2/B1, la communication publique n'avait pas
suivi : titres, metadata, offre, FAQ et emails continuaient à décrire un
produit B1 uniquement, avec des affirmations devenues fausses (« le contenu
du parcours couvre le niveau B1 », « 26 modules du parcours B1 », « Ton
parcours B1 » pour un utilisateur A1/A2, etc.).

## Nouveau positionnement

**Promesse principale :**

> Apprends le français pour vivre en France avec plus d'autonomie.

**Sous-titre :**

> Teste ton niveau, suis un parcours personnalisé de A1 à B1 et entraîne-toi
> au français de la vie quotidienne, du travail et des démarches.

## Audience cible

Toute personne qui veut progresser en français pour vivre en France avec
plus d'autonomie — quel que soit son niveau de départ (A1, A2 ou B1) — pour
la vie quotidienne, le travail, les démarches administratives, ou en vue du
DELF B1.

## Messages clés

1. Le produit couvre A1, A2 et B1 — un seul parcours continu, pas trois
   produits séparés.
2. On commence où on en est réellement (test de niveau), jamais à zéro par
   défaut.
3. Le parcours est guidé : séances courtes, régulières, avec des situations
   concrètes de la vie en France.
4. L'objectif final est l'autonomie dans la vie réelle, pas seulement un
   examen.
5. Le DELF B1 reste une proposition forte, mais c'est un cas d'usage parmi
   d'autres — pas l'identité unique du produit.

## CTA

- **CTA principal** : « Tester mon niveau » → `/test-niveau`.
- **CTA secondaire** (hero) : « Voir le parcours » → ancre `#niveaux` (la
  nouvelle section qui explique A1 → A2 → B1), pas une navigation qui sort
  du homepage — évite un aller-retour pour quelqu'un qui veut juste
  comprendre l'offre avant de se tester.
- Un seul CTA « test de niveau » mis en avant partout (header, hero,
  pricing, offre, footer) : `/test-niveau`. `/diagnostic` (18 questions,
  adaptatif, bilan par compétence) reste disponible mais en option
  secondaire, proposé depuis l'écran de résultat de `/test-niveau` (« Envie
  d'un bilan plus détaillé ? »), jamais comme CTA concurrent en page
  d'accueil.

## Rôle du DELF

Le DELF B1 n'est plus présenté comme l'identité unique du produit. Hiérarchie :

- **Marque principale** : français pratique + autonomie en France.
- **Cas d'usage** : vie quotidienne, travail, démarches administratives,
  DELF B1 (préparation, pas de garantie de réussite), naturalisation/carte de
  résident *uniquement si le contenu le justifie réellement* — voir la note
  sur `/mentions-legales` ci-dessous, aucune promesse juridique/administrative
  non vérifiée.

## Rôle de la vie en France

Les situations concrètes (achats, rendez-vous, administration, logement,
transports, médecin, travail, entretien) sont mises en avant, mais jamais
comme des règles absolues : le wording préfère « Dans cette situation en
France... », « On rencontre souvent... », « Voici les usages les plus
courants... » — jamais de discours prescriptif sur les « mœurs françaises ».

## Règles de wording

- Ne jamais coder en dur un nombre de modules qui peut évoluer souvent
  (« 26 modules » → « des dizaines de modules »). Les compteurs dynamiques
  (`0/76 modules terminés` sur `/progression`) restent corrects car dérivés
  des données réelles à l'exécution.
- « Ton parcours B1 » / « parcours B1 » ne s'emploie que quand B1 est
  réellement le sujet (les 4 pages SEO dédiées `/francais-b1`,
  `/exercices-b1`, `/grammaire-b1`, `/comprehension-orale-b1` restent
  inchangées : B1 y est le vrai sujet). Partout ailleurs, le wording doit
  fonctionner pour un utilisateur A1, A2 ou B1.
- Un titre ou une recommandation qui dépend du niveau réel de l'utilisateur
  (`progress.level`, `result.estimatedLevel`) doit être interpolé
  dynamiquement, jamais hardcodé sur B1 (voir le bug corrigé sur l'écran de
  résultat de `/test-niveau`, ci-dessous).
- Un test statique (`lib/seo/positioning.test.ts`) grep les fichiers publics
  les plus visibles pour empêcher un retour silencieux du wording B1-only.

## Point produit trouvé en auditant le funnel réel (non arbitré ici)

En testant le funnel réel (test de niveau → résultat → parcours), la
première version de ce chantier avait initialement corrigé unilatéralement
`FREE_MODULE_SLUGS` (`lib/commerce/access.ts`), qui n'ouvre que 2 modules
B1 en découverte gratuite : un utilisateur diagnostiqué A1 ou A2 n'a
**aucun** module gratuit à son niveau, et `getNextModule` le renvoie
directement vers ce module B1 dès sa première visite gratuite.

Cette asymétrie s'est révélée être une décision produit déjà connue et
documentée à deux reprises avant ce chantier
(`docs/integration/product-v1.md` § 5, puis
`docs/product/free-premium-audit.md` du chantier v1-polish), explicitement
qualifiée de « décision commerciale hors périmètre technique », pas d'un
bug. Au moment d'intégrer ce chantier dans la release candidate, le
correctif a donc été **retiré** plutôt qu'imposé une troisième fois sans
mandat — voir `docs/product/release-candidate.md` pour la décision finale
et son statut de risque résiduel. Le wording de `FREE_PLAN_FEATURES` a été
ajusté en conséquence pour rester honnête (« 2 modules **B1** complets »,
pas « à ton niveau »).

## Éléments à tester avec de vrais utilisateurs

- Est-ce que « Tester mon niveau » (sans « gratuitement » dans le libellé)
  est toujours perçu comme sans engagement ? Le sous-titre du hero et la
  page `/test-niveau` le précisent, mais le CTA seul ne le dit plus.
- Est-ce que la nouvelle section A1 → A2 → B1 (`/#niveaux`) aide vraiment à
  se situer, ou est-elle redondante avec le résultat du test de niveau lui-même ?
- Est-ce que le lien secondaire « Fais le diagnostic complet » depuis le
  résultat du test de niveau est utilisé, ou ignoré (fonctionnalité qui
  reste orpheline malgré le lien) ?
- Réaction à « Progression pour passer au niveau suivant » vs. l'ancien
  cadrage 100 % DELF — certains utilisateurs venus spécifiquement pour le
  DELF pourraient trouver le nouveau positionnement plus vague.

## Risques résiduels (non traités dans ce chantier)

- `app/mentions-legales/page.tsx` : le champ légal « Nom commercial (site) »
  affiche encore « France B1 (provisoire) », distinct de la marque affichée
  partout (« ParcoursFR »). Champ d'identité légale/administrative en attente
  d'immatriculation — volontairement non modifié ici (hors périmètre UX
  writing, et toute correction doit venir de qui gère l'immatriculation
  réelle, pas d'une déduction de wording).
- `/diagnostic` reste fonctionnellement déconnecté de `useProgress`
  (décision documentée d'un chantier précédent) : le compléter ne met pas à
  jour le niveau/la progression réels de l'utilisateur. Le lien ajouté
  depuis `/test-niveau` en fait un complément explicite, pas un remplacement
  — brancher `/diagnostic` sur `useProgress` reste un chantier technique à
  part entière, hors du périmètre « pas de refonte technique massive » de
  celui-ci.
