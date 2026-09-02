import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  robots: { index: false, follow: true },
};

export default function MotDePasseOubliePage() {
  return (
    <>
      <Header />
      <main className="py-12 sm:py-16">
        <Container className="max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Mot de passe oublié</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Indique ton email : si un compte existe, tu recevras un lien pour choisir un nouveau
            mot de passe.
          </p>
          <Card className="mt-6">
            <ForgotPasswordForm />
          </Card>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link href="/connexion" className="font-medium text-primary hover:underline">
              ← Retour à la connexion
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
