"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import AccountStatus from "@/components/auth/AccountStatus";
import { MenuIcon, XIcon } from "@/components/ui/icons";
import { APP_NAV_ITEMS, getActiveNavHref } from "@/components/layout/app-nav";
import { cn } from "@/lib/cn";

/**
 * En-tête de l'espace d'apprentissage. Cinq destinations pédagogiques
 * (Aujourd'hui, Parcours, Pratiquer, Réviser, Progression) ; le compte (et
 * l'offre, qui s'y trouve) à droite. Sous `lg`, les destinations passent
 * dans la barre d'onglets du bas (`AppTabBar`) et le menu ne garde que le
 * compte — jamais deux menus qui répètent la même liste.
 */
export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeHref = getActiveNavHref(pathname);

  // Fermeture au clavier : voir la même logique dans components/layout/Header.tsx.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/aujourdhui"
            className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Parcours<span className="text-primary">FR</span>
          </Link>

          <nav aria-label="Navigation de l'application" className="hidden items-center gap-1 lg:flex">
            {APP_NAV_ITEMS.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/compte"
              aria-current={pathname === "/compte" ? "page" : undefined}
              className="inline-flex items-center py-3 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Mon compte
            </Link>
            <AccountStatus showEmail={false} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="app-mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </Container>

        {open && (
          <div id="app-mobile-menu" className="border-t border-border bg-background lg:hidden">
            <Container className="flex flex-col gap-1 py-4">
              <nav aria-label="Compte et offre (mobile)" className="flex flex-col gap-1">
                <Link
                  href="/compte"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Mon compte et mon rythme
                </Link>
                <Link
                  href="/offre"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                >
                  Accès complet
                </Link>
              </nav>
              <div className="mt-3 border-t border-border pt-4">
                <AccountStatus className="flex-col items-stretch gap-3 text-center" />
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
