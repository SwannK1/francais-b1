import type { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AccountStatus from "@/components/auth/AccountStatus";

export default function PedagogieLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Parcours<span className="text-primary">FR</span>
          </Link>

          <nav aria-label="Navigation de l'application" className="flex items-center gap-6">
            <Link
              href="/parcours"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Tableau de bord
            </Link>
            <Link
              href="/progression"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Progression
            </Link>
            <AccountStatus />
          </nav>
        </Container>
      </header>

      <main className="flex-1 bg-background py-8 sm:py-10">
        <Container className="max-w-4xl">{children}</Container>
      </main>
    </div>
  );
}
