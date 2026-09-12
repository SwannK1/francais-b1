# Bêta humaine — productions orales B1

Ce protocole valide ce que les tests automatisés ne peuvent pas prouver : un vrai microphone, une vraie réécoute et la compréhension du parcours par un apprenant. Une session dure environ **10 à 20 minutes**.

## Préparation

- Utiliser un compte bêta premium autorisé, jamais un compte de production partagé.
- Tester au moins une fois sur ordinateur et une fois sur téléphone réel.
- Noter l'appareil, le système, le navigateur et l'activité choisie.
- Vérifier que le navigateur affiche bien sa demande d'autorisation du microphone.

Activités disponibles : raconter une expérience personnelle, chercher un logement, parler avec un médecin, faire une réclamation, donner son opinion sur une question de société.

## Scénario à faire sans aide

1. Ouvrir le site et se connecter.
2. Ouvrir une production orale B1.
3. Lire la situation et démarrer l'activité.
4. Accepter l'accès au microphone.
5. Parler réellement pendant quelques secondes.
6. Arrêter l'enregistrement.
7. Réécouter sa voix jusqu'à entendre clairement la prise.
8. Recommencer la prise si souhaité, puis la réécouter.
9. Continuer vers l'auto-évaluation.
10. Lire et cocher honnêtement les quatre critères.
11. Terminer, lire le feedback et poursuivre vers l'étape suivante.

Pendant le test, l'observateur ne doit pas expliquer l'interface avant que l'apprenant ait essayé. Il peut intervenir si la personne est réellement bloquée et doit alors noter l'étape exacte.

## Points à observer

- La demande d'autorisation apparaît et son résultat est compréhensible.
- L'apprenant sait quand l'enregistrement commence et comment l'arrêter.
- La prise est audible et correspond bien à ce qui vient d'être dit.
- « Recommencer la prise » remplace correctement l'enregistrement précédent.
- Les boutons et le lecteur restent utilisables au toucher et après la boîte de permission.
- Les quatre critères sont compris sans explication et peuvent être jugés par l'apprenant.
- Le feedback ne ressemble pas à une correction automatique de la voix.
- L'apprenant trouve naturellement comment poursuivre le parcours.

## Questions courtes à poser

1. As-tu compris immédiatement ce qu'il fallait dire ?
2. As-tu su quand l'enregistrement commençait et comment l'arrêter ?
3. As-tu réussi à réécouter ta voix ?
4. As-tu compris les quatre critères d'auto-évaluation ?
5. As-tu hésité à une étape ? Laquelle ?
6. Le feedback t'a-t-il aidé à savoir si tu devais recommencer ?
7. Quelque chose t'a-t-il semblé bizarre ou compliqué ?
8. Aurais-tu envie de faire une autre activité orale ? Pourquoi ?

## Fiche de retour minimale

Pour chaque anomalie, noter seulement :

- appareil et système ;
- navigateur et version ;
- activité ;
- étape concernée ;
- résultat attendu et résultat observé ;
- message affiché, sans copier de cookie ni de donnée sensible ;
- capture d'écran éventuelle ;
- commentaire spontané de l'apprenant ;
- caractère reproductible : toujours / parfois / une seule fois.

## Confidentialité de la prise

Dans l'implémentation actuelle, la voix est enregistrée dans la mémoire du navigateur sous forme de blob local. Elle n'est pas envoyée à une API, n'est pas stockée en base et n'est pas associée au compte. L'URL locale est supprimée lorsque la prise est remplacée ou lorsque le composant est quitté. Seul le résultat de l'exercice — terminé et réussi ou à consolider selon l'auto-évaluation — peut être synchronisé avec la progression.

Ne jamais demander au bêta-testeur de transmettre son fichier audio. Une capture de l'interface suffit pour signaler un problème, sauf consentement distinct et explicite organisé ultérieurement.

## Matrice matérielle à compléter

| Environnement | Permission | Enregistrer | Arrêter | Réécouter | Refaire | Continuer | Résultat |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ordinateur — Chrome | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| Ordinateur — Safari | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| iPhone — Safari | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| Android — Chrome | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |

## Critère de sortie de bêta

Le parcours est validé sur un environnement lorsqu'un apprenant peut, sans aide préalable, autoriser le micro, enregistrer, arrêter, entendre sa prise, la remplacer, comprendre les critères, lire le feedback et poursuivre. Tout blocage matériel ou toute incompréhension répétée par plusieurs personnes doit être reproduit avant correction.
