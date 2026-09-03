import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import AppHeader from "@/components/layout/AppHeader";

export default function PedagogieLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />

      <main id="main-content" className="flex-1 bg-background py-8 sm:py-10">
        <Container className="max-w-4xl">{children}</Container>
      </main>
    </div>
  );
}
