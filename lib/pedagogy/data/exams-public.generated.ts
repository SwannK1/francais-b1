// Fichier généré — NE PAS ÉDITER À LA MAIN.
// Source : lib/pedagogy/data/exams.ts, via `npm run generate:public-exams`
// (scripts/generate-public-exams.mjs). Volontairement sans aucun import vers
// data/exams.ts : c'est ce qui garantit que ce fichier est sûr à importer
// depuis du code client — voir lib/pedagogy/data/exams-public.ts et
// docs/architecture/user-lifecycle.md § Premium content boundary.
import type { ExamSummary } from "@/lib/pedagogy/types";

export const PUBLIC_EXAMS: ExamSummary[] = [
  {
    "id": "exam-b1-demo",
    "slug": "delf-b1-entrainement-demo",
    "title": "Entraînement B1 — Épreuve de démonstration",
    "type": "delf",
    "level": "B1",
    "description": "Épreuve fictive inspirée du format DELF B1, avec un contenu entièrement original, à but d'entraînement.",
    "durationMinutes": 47,
    "maxScore": 125,
    "passingScore": 63,
    "isBlanc": false
  },
  {
    "id": "delf-b1-blanc-1",
    "slug": "delf-b1-examen-blanc-1",
    "title": "DELF B1 — Examen blanc 1",
    "type": "delf",
    "level": "B1",
    "description": "Premier examen blanc complet, structure et barème alignés sur le format officiel DELF B1 (France Éducation International) : 4 épreuves sur 25 points chacune, seuil de réussite 50/100, note éliminatoire 5/25 par épreuve. Contenu 100% original. Différence avec le vrai DELF : les documents audio sont ici réécoutables librement, alors qu'ils ne sont diffusés que deux fois le jour de l'examen.",
    "durationMinutes": 140,
    "maxScore": 100,
    "passingScore": 50,
    "isBlanc": true
  },
  {
    "id": "exam-a1-evaluation-finale",
    "slug": "evaluation-finale-a1",
    "title": "Évaluation finale A1",
    "type": "delf",
    "level": "A1",
    "description": "Épreuve de fin de parcours A1, au format inspiré du DELF A1, avec un contenu entièrement original. Elle vérifie que les 5 grandes compétences A1 (CE, CO, interaction, production écrite, production orale) sont acquises.",
    "durationMinutes": 35,
    "maxScore": 100,
    "passingScore": 50,
    "isBlanc": true
  },
  {
    "id": "exam-a2-demo",
    "slug": "delf-a2-entrainement-demo",
    "title": "Entraînement A2 — Épreuve de démonstration",
    "type": "delf",
    "level": "A2",
    "description": "Épreuve fictive inspirée du format DELF A2, avec un contenu entièrement original, à but d'entraînement.",
    "durationMinutes": 33,
    "maxScore": 100,
    "passingScore": 50,
    "isBlanc": false
  },
  {
    "id": "delf-a2-blanc-1",
    "slug": "delf-a2-examen-blanc-1",
    "title": "DELF A2 — Examen blanc 1",
    "type": "delf",
    "level": "A2",
    "description": "Premier examen blanc complet, structure et barème alignés sur le format officiel DELF A2 (France Éducation International) : 4 épreuves sur 25 points chacune, seuil de réussite 50/100, note éliminatoire 5/25 par épreuve. Contenu 100% original. Différence avec le vrai DELF : les documents audio sont ici réécoutables librement, alors qu'ils ne sont diffusés que deux fois le jour de l'examen.",
    "durationMinutes": 118,
    "maxScore": 100,
    "passingScore": 50,
    "isBlanc": true
  }
];
