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
  }
];
