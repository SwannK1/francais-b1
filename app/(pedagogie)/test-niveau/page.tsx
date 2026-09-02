import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import TestNiveauClient from "./TestNiveauClient";

export const metadata: Metadata = {
  title: "Test de niveau de français",
  description:
    "Estime gratuitement ton niveau de français (A1 à B2) avec ce test de positionnement, et découvre le parcours B1 adapté.",
  alternates: { canonical: "/test-niveau" },
};

export default function TestNiveauPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Test de niveau", path: "/test-niveau" }])} />
      <TestNiveauClient />
    </>
  );
}
