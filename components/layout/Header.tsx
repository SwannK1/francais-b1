"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import PrimaryCta from "@/components/marketing/PrimaryCta";
import { MenuIcon, XIcon } from "@/components/ui/icons";
import AccountStatus from "@/components/auth/AccountStatus";

const navItems = [
  { href: "/#apprentissage", label: "Apprendre" },
  { href: "/#examens", label: "Préparer un examen" },
  { href: "/#fonctionnement", label: "Comment ça marche ?" },
  { href: "/#tarifs", label: "Tarifs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-8 lg:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <AccountStatus />
            <PrimaryCta size="md" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </Container>

        {open && (
          <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
            <Container className="flex flex-col gap-1 py-4">
              <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
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
              <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
                <AccountStatus className="flex-col items-stretch gap-3 text-center" />
                <PrimaryCta onClick={() => setOpen(false)} className="justify-center" />
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
