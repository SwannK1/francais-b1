import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { checkPasswordResetToken } from "@/lib/auth/password-reset";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe",
  robots: { index: false, follow: true },
};

export default async function ReinitialiserMotDePassePage({
  searchParams,
}: PageProps<"/reinitialiser-mot-de-passe">) {
  const { token } = await searchParams;
  const rawToken = typeof token === "string" ? token : null;
  const status = rawToken ? await checkPasswordResetToken(rawToken) : "invalid";

  return (
    <>
      <Header />
      <main className="py-12 sm:py-16">
        <Container className="max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Nouveau mot de passe</h1>
          <Card className="mt-6">
            {status === "valid" && rawToken ? (
              <ResetPasswordForm token={rawToken} />
            ) : (
              <div className="space-y-3">
                <p role="alert" className="text-sm text-foreground">
                  {status === "expired"
                    ? "Ce lien de réinitialisation a expiré."
                    : "Ce lien de réinitialisation est invalide."}
                </p>
                <Link
                  href="/mot-de-passe-oublie"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Demander un nouveau lien
                </Link>
              </div>
            )}
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}
