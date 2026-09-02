import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/schema";
import ParcoursClient from "./ParcoursClient";

export const metadata: Metadata = {
  title: "Ton parcours B1",
  description:
    "Suis ton parcours guidé en plusieurs étapes pour atteindre le niveau B1 en français et te préparer au DELF B1.",
  alternates: { canonical: "/parcours" },
};

export default function ParcoursPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Parcours", path: "/parcours" }])} />
      <ParcoursClient />
    </>
  );
}
