import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { getCurrentUser } from "@/lib/auth/dal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteDescription =
  "Teste ton niveau de français, suis un parcours personnalisé du A1 au B2 et prépare le DELF ou le TCF IRN à ton rythme.";

export const metadata: Metadata = {
  title: "ParcoursFR — Apprends le français à ton rythme",
  description: siteDescription,
  openGraph: {
    title: "ParcoursFR — Apprends le français à ton rythme",
    description: siteDescription,
    locale: "fr_FR",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="fr" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
