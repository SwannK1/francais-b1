---
title: Checklist QA humaine — audio A1/A2/B1
type: audio-qa-checklist
lastUpdated: 2026-09-07
---

# Checklist QA humaine — audio

**Cette checklist requiert une écoute humaine réelle.** Aucun assistant IA
qui a préparé ce chantier n'a la capacité d'écouter un fichier `.m4a` — les
audits techniques produits ici (voir `humanisation-a1-a2-b1.md`) vérifient
la structure du code et des manifests (existence de fichier, transcript
non vide, cohérence des ids), jamais la qualité sonore perçue. Ne jamais
cocher une case ci-dessous sans écoute effective.

Généralisation de la checklist par piste déjà écrite pour B1
(`docs/b1/audio-human-recording-plan.md` §10), étendue à A1/A2 et aux
critères spécifiques à une piste de synthèse (`say` ou fournisseur
neuronal) en plus des critères d'enregistrement humain.

## A. Checklist par piste (tous niveaux, tout fournisseur)

- [ ] Le texte lu correspond exactement au transcript affiché (aucun mot
      ajouté, omis ou substitué par la synthèse/l'enregistrement)
- [ ] Aucune hésitation ou coupure involontaire non désirée
- [ ] Débit correct pour le niveau et le palier visés (voir
      `audio-style-guide.md` §1) — ni précipité, ni artificiellement lent
- [ ] Volume homogène avec les autres pistes du même niveau
- [ ] Absence de bruit gênant (clic de synthèse, souffle, saturation)
- [ ] Début de fichier non coupé (première syllabe intacte)
- [ ] Fin de fichier non coupée, silence propre après la dernière réplique
- [ ] Prononciation des nombres/sigles/noms propres correcte et naturelle
      (ex. "9h" prononcé "neuf heures", pas épelé chiffre par chiffre sauf
      numéro de téléphone)
- [ ] La bonne réponse à chaque question reste déductible à l'écoute réelle
      (pas seulement à la lecture du transcript)
- [ ] Durée cohérente avec un débit de parole réel pour ce texte (pas de
      silence excessif au milieu de la piste)

## B. Spécifique à une voix de synthèse (`say` ou fournisseur neuronal)

- [ ] La voix ne sonne pas monotone sur toute la durée (variation de ton
      perceptible, pas un débit robotique constant)
- [ ] Dans un dialogue, les deux/trois voix restent bien distinguables
      l'une de l'autre sans lire le transcript (test : fermer les yeux et
      compter les locuteurs perçus)
- [ ] Les hésitations/reformulations ajoutées au script (voir
      `audio-style-guide.md` §3) sonnent naturelles à l'oreille, pas
      artificiellement plaquées par la synthèse (une virgule ou un tiret
      mal placé peut donner un effet haché plutôt qu'une vraie hésitation)
- [ ] Les marqueurs de pause (`[[slnc ...]]` pour `say`) tombent à des
      endroits qui correspondraient à une vraie respiration, pas au milieu
      d'un groupe de sens

## C. Spécifique à un enregistrement humain

Voir la checklist complète et déjà détaillée du pack B1
(`docs/b1/audio-human-recording-plan.md` §10) — reprise telle quelle,
directement applicable à tout futur enregistrement A1/A2 :

- [ ] Script intégral lu, aucune phrase oubliée
- [ ] Intention/ton de la fiche de production respecté (ex. "léger
      désaccord qui s'apaise", pas un vrai conflit)
- [ ] Pas de réverbération perceptible (pièce traitée)
- [ ] Correspondance vérifiée avec les questions de l'exercice

## D. Contrôle par lot (à faire après un lot de génération/enregistrement)

- [ ] `npm run audio:status` (B1) / équivalent A1/A2 ne signale aucune
      piste manquante ni orpheline
- [ ] Échantillon représentatif écouté par niveau (3-4 pistes minimum par
      niveau, en priorité les pistes `bilan`/`preparation-examen` et les
      tout premiers modules — voir priorités du backlog) avant tout
      déploiement d'un nouveau lot
- [ ] Aucune piste d'examen blanc/DELF modifiée sans revalidation complète
      de la cohérence questions/réponses par un humain (voir encadré
      `audio-style-guide.md` §3)
- [ ] `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`
      passent tous avant tout commit du lot

## E. Verdict à consigner après une session de QA humaine

Pour chaque piste vérifiée : `OK` / `À corriger (préciser)` /
`Non vérifiée (préciser pourquoi)`. Ne jamais consigner `OK` sur la base du
texte du script seul — uniquement après écoute effective du fichier
produit.

## F. Clôture du chantier `audio-humanisation` — 58 pistes à couvrir

Le chantier a humanisé 58 pistes sans qu'aucune écoute humaine n'ait pu
être faite (capacité hors de portée d'un agent IA dans cet environnement,
voir avertissement en tête de document). Avant toute mise en production,
un humain doit écouter au minimum un échantillon représentatif — voir
§D — et en priorité :

- [ ] **`public/audio/a1/rendez-vous/prendre-rendez-vous-medecin.m4a`**
      (exercice `m18-f1`, module "La santé") — script entièrement réécrit
      (scène pharmacie/douleur/conseil au lieu d'une prise de rendez-vous
      sans rapport) ; vérifier que les 2 voix (Chloé/Pharmacien) sonnent
      bien distinctes et que les 2 nouvelles réponses restent déductibles
      à l'écoute réelle, pas seulement à la lecture du transcript
- [ ] **`public/audio/a2/a2-directions-poste-banque.m4a`** (exercice
      `ville-o`, module "Se repérer en ville") — piste entièrement
      nouvelle ; vérifier la clarté des indications (tout droit, à
      gauche, au coin de) et que les 2 voix (Youssef/Passante) restent
      distinctes
- [ ] **`public/audio/a2/bilan-a2-recit-journee-chronologie.m4a`** —
      seule piste de l'évaluation finale A2 modifiée dans ce chantier ;
      vérifier que le barème reste juste (3 questions, chaque réponse
      toujours déductible à l'écoute) et qu'aucune régression de
      difficulté n'a été introduite par la reformulation des connecteurs
- [ ] Les 3 autres `bilan-a2-*` (annonce-aeroport, repondeur-coiffeur,
      dialogue-patinoire) — non modifiées, mais jamais réécoutées "à
      neuf" depuis la création de l'évaluation ; confirmer qu'elles
      méritent bien leur statut "déjà excellentes"
- [ ] Un échantillon des pistes B1 avec correction de voix dupliquée
      (`decrire-vie-quotidienne`, `hypothese-et-conseil`,
      `discuter-avec-un-proprietaire`) — vérifier que les 2 locuteurs
      sonnent réellement distincts, pas juste différents sur le papier
- [ ] `public/audio/a1/salutations/bonjour-matin.m4a` — première piste
      jamais citée dans ce chantier, jamais réécoutée depuis

**Cas précédemment réservés, désormais résolus** : `a1-la-sante` et le
mismatch A2 `ville-o` (voir `humanisation-a1-a2-b1.md` §6.6) ont
finalement été corrigés avec le pipeline existant — les deux étaient un
mauvais choix de contenu, jamais une limitation technique. Aucun cas de
contenu A1/A2/B1 ne reste identifié comme problématique à ce jour ; seule
une QA d'écoute humaine normale (comme pour toute piste de ce chantier)
reste nécessaire pour ces deux pistes, sans traitement spécial.
