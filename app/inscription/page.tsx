import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Créer un compte",
  robots: { index: false, follow: true },
};

export default async function InscriptionPage({ searchParams }: PageProps<"/inscription">) {
  const { next } = await searchParams;
  const nextHref = typeof next === "string" && next.startsWith("/") ? next : undefined;

  return (
    <>
      <Header />
      <main className="py-12 sm:py-16">
        <Container className="max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Créer un compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ta progression actuelle (si tu en as une) sera automatiquement associée à
            ton nouveau compte.
          </p>
          <Card className="mt-6">
            <SignupForm next={nextHref} />
          </Card>
          <p className="mt-4 text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link
              href={nextHref ? `/connexion?next=${encodeURIComponent(nextHref)}` : "/connexion"}
              className="font-medium text-primary hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
