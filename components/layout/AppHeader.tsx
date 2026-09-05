"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import AccountStatus from "@/components/auth/AccountStatus";
import { MenuIcon, XIcon } from "@/components/ui/icons";

const navItems = [
  { href: "/parcours", label: "Tableau de bord" },
  { href: "/progression", label: "Progression" },
];

/**
 * En-tête de l'application connectée (parcours, module, examen, progression).
 * Reprend le même motif que le header marketing (`components/layout/Header.tsx`) :
 * sans repli sous `lg`, les liens + le bloc compte débordaient/se
 * recroquevillaient sur mobile (aucune classe responsive n'existait ici avant).
 */
export default function AppHeader() {
  const [open, setOpen] = useState(false);

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
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Parcours<span className="text-primary">FR</span>
          </Link>

          <nav aria-label="Navigation de l'application" className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {item.label}
              </Link>
            ))}
            <AccountStatus />
          </nav>

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
              <nav aria-label="Navigation de l'application (mobile)" className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
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
