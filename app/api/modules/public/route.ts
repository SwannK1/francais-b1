import { NextResponse } from "next/server";
import { PUBLIC_MODULES } from "@/lib/pedagogy/data/modules-public";

/**
 * Métadonnées de navigation des modules (titres, structure, compétences) —
 * jamais le contenu détaillé des exercices ni leurs réponses, gratuit et
 * premium confondus. Utilisé par les composants client qui ont besoin du
 * catalogue complet mais ne sont pas rendus sous une page serveur qui
 * pourrait le leur passer en prop directement (ex. `PrimaryCta`, partagé
 * par de nombreux en-têtes/pages) — voir
 * `docs/architecture/user-lifecycle.md` § Premium content boundary.
 * Public sans authentification : ce n'est pas une donnée qui dépend de
 * l'utilisateur, seul son usage (calcul du prochain module) en dépend, côté
 * client, à partir de la progression locale.
 */
export async function GET() {
  return NextResponse.json({ modules: PUBLIC_MODULES });
}
