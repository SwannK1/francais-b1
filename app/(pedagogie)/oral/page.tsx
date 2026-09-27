import { permanentRedirect } from "next/navigation";

/**
 * L'ancienne zone « Expression orale » vit désormais dans « Pratiquer »
 * (section Parler), qui la complète avec l'écoute et les situations réelles.
 * Redirection permanente : les liens et favoris existants vers `/oral`
 * restent valides. Les exercices eux-mêmes gardent leur URL `/oral/[id]`.
 */
export default function OralPage() {
  permanentRedirect("/pratiquer#parler");
}
