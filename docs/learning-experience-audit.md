# Audit de l’expérience apprenant

Document de travail du chantier « excellence pédagogique ». Les constats sont reliés à une correction vérifiable ; les améliorations purement cosmétiques restent hors périmètre.

## Parcours réel

| Étape | Ce qui fonctionne | Friction ou risque | Priorité | Correction proposée | Statut |
|---|---|---|---|---|---|
| Diagnostic → résultat | Niveau, forces et recommandations alimentent la progression existante | À confirmer sur les cas limites A1/A2/B1 | P1 | QA ciblée et tests de cohérence | À auditer |
| Résultat → parcours | Le niveau effectif suit l’avancement, même après le niveau diagnostiqué | Deux actions proches peuvent concurrencer la séance recommandée | P2 | Vérifier la hiérarchie en QA, conserver si elle reste claire | À auditer |
| Parcours → séance du jour | Séance déterministe, courte, ordonnée et compatible A1/A2/B1 | La priorité avancée de `/reviser` n’alimentait pas la séance ; l’ordre brut de `weakSkillIds` gagnait | P1 | Réutiliser la priorité du moteur de révision espacé dans la séance | Corrigé, tests en cours |
| Exercice → feedback | Chaque exercice dispose d’une correction structurée dans le modèle | Qualité éditoriale inégale possible ; à mesurer sur échantillon | P1 | Échantillon début/milieu/fin par niveau | À auditer |
| Erreur → révision | Résultats récents, erreurs répétées et ancienneté alimentent `/reviser` | La boucle s’arrêtait avant la Daily Session | P1 | Ajouter le rappel prioritaire et cibler la compétence fragile | Corrigé, tests en cours |
| Progression → maîtrise | Compétences et taux de réussite sont visibles | Une seule bonne réponse sur dix pouvait afficher une barre à 100 %, confondant réussite et couverture | P1 | Barre = couverture ; réussite affichée séparément | Corrigé, tests en cours |
| Révision → nouvelle tentative | Les liens ramènent vers un vrai module du catalogue | Vérifier la sortie de révision après réussite | P1 | Tests moteur + QA du parcours | À auditer |
| Évaluation → passage de niveau | Parcours unifié et niveaux effectifs existent | Couverture et seuils à valider pédagogiquement | P1 | Audit ciblé des transitions A1→A2 et A2→B1 | À auditer |
| Production → maîtrise | Des productions écrites et orales contextualisées existent aux trois niveaux | Toute production envoyée était comptée correcte, sans tenir compte de la grille | P0 | Faire de l’auto-évaluation existante le signal de réussite | Corrigé et validé |

## Lots

### Lot 1 — prochaine action, erreurs et maîtrise

- Problème démontré : la séance du jour utilisait l’ancien mécanisme de rappel et le premier identifiant faible, tandis que `/reviser` classait déjà les compétences selon erreurs récentes, répétition, couverture et ancienneté.
- Décision : réutiliser la recommandation prioritaire existante, uniquement lorsqu’elle correspond à un module réel du niveau effectif.
- Garde-fous : sélection déterministe, repli sur le comportement historique, aucun module inventé, aucune donnée nouvelle.
- Problème démontré : le composant de compétence présentait le taux de réussite comme remplissage de progression.
- Décision : séparer la couverture du catalogue pratiqué et la réussite sur les tentatives.
- Tests : à compléter puis quality gate globale.

### Lot 2 — productions et preuve de maîtrise

- Échantillon : début/milieu/fin A1, A2 et B1, puis inventaire transversal des types d’exercice.
- Constat : les productions proposent déjà contexte, consigne et critères, mais leur simple envoi appelait `onExerciseAnswered(true)`.
- Risque : progression, taux global, compétence faible et révision étaient tous alimentés par une réussite non démontrée.
- Décision : conserver l’auto-évaluation (pas de fausse correction automatique), enregistrer la réussite seulement lorsque tous les critères sont cochés ; sinon terminer l’activité comme compétence à consolider.
- Portée : toutes les productions écrites et les 42 productions orales du catalogue, sans modifier leur contenu ni ajouter d’IA.
- Validation : tests ciblés écrit/oral/progression, suite complète, lint, TypeScript, build, audit dépendances et QA mobile 390 px sur le module B1 « Se présenter ».
