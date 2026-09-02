import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omis pour le dernier élément : la page courante n'est pas un lien. */
  href?: string;
}

/**
 * Fil d'Ariane commun aux pages imbriquées du parcours (étape, module,
 * examen) : donne à la fois le contexte ("où je suis") et une remontée
 * rapide à n'importe quel niveau parent, à la place d'un simple lien
 * "← Retour" qui ne remonte qu'un niveau à la fois.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="font-medium text-primary hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-foreground" : "font-medium text-muted-foreground"}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="text-muted-foreground">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
