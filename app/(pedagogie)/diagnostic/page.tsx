import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import DiagnosticClient from "./DiagnosticClient";

export const metadata: Metadata = {
  title: "Diagnostic de niveau détaillé",
  description:
    "Un diagnostic approfondi en 18 questions pour estimer ton niveau (A1, A2 ou B1), identifier tes points forts et fragiles, et démarrer au bon endroit du parcours.",
  alternates: { canonical: "/diagnostic" },
};

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Diagnostic de niveau", path: "/diagnostic" }])} />
      <DiagnosticClient />
    </>
  );
}
