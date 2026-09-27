import type { Metadata } from "next";
import CompteExperience from "./CompteExperience";

export const metadata: Metadata = {
  title: "Mon compte",
  robots: { index: false, follow: true },
};

export default function ComptePage() {
  return <CompteExperience />;
}
