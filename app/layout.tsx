import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteDescription =
  "Formation complète de français niveau B1 : teste ton niveau, suis un parcours de modules guidés et prépare le DELF B1 avec des examens blancs, à ton rythme.";

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
      <body className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
