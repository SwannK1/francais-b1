import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Se connecter — ParcoursFR",
};

export default async function ConnexionPage({ searchParams }: PageProps<"/connexion">) {
  const { next } = await searchParams;
  const nextHref = typeof next === "string" && next.startsWith("/") ? next : undefined;

  return (
    <>
      <Header />
      <main className="py-12 sm:py-16">
        <Container className="max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Se connecter</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Retrouve ta progression sauvegardée sur tous tes appareils.
          </p>
          <Card className="mt-6">
            <LoginForm next={nextHref} />
          </Card>
          <p className="mt-4 text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link
              href={nextHref ? `/inscription?next=${encodeURIComponent(nextHref)}` : "/inscription"}
              className="font-medium text-primary hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
