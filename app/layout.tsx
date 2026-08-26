import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteDescription =
  "Teste ton niveau de français, suis le parcours B1 et prépare le DELF B1 à ton rythme.";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
