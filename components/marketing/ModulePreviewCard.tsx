import Link from "next/link";
import Card from "@/components/ui/Card";
import type { PublicModule } from "@/lib/pedagogy/types";

/**
 * Carte de renvoi vers un vrai module du parcours, utilisée par les pages
 * SEO éditoriales (/exercices-b1, /grammaire-b1, /comprehension-orale-b1)
 * pour illustrer un domaine avec du contenu réel plutôt qu'une description
 * abstraite. Le statut gratuit/premium reste géré par la page de module
 * elle-même (PremiumLock) — pas dupliqué ici.
 */
export default function ModulePreviewCard({ module: mod }: { module: PublicModule }) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-foreground">{mod.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{mod.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{mod.estimatedMinutes} min</span>
        <Link
          href={`/parcours/module/${mod.slug}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Voir le module →
        </Link>
      </div>
    </Card>
  );
}
