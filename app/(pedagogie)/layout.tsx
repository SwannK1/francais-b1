import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import AppHeader from "@/components/layout/AppHeader";
import AppTabBar from "@/components/layout/AppTabBar";

export default function PedagogieLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />

      {/* `pb-24` sous `lg` : la barre d'onglets fixe du bas ne doit jamais masquer un bouton d'action. */}
      <main id="main-content" className="flex-1 bg-background pb-24 pt-8 sm:pt-10 lg:pb-10">
        <Container className="max-w-4xl">{children}</Container>
      </main>

      <AppTabBar />
    </div>
  );
}
