import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/marketing/Hero";
import Goals from "@/components/marketing/Goals";
import HowItWorks from "@/components/marketing/HowItWorks";
import ProgressShowcase from "@/components/marketing/ProgressShowcase";
import LearningTypes from "@/components/marketing/LearningTypes";
import Exams from "@/components/marketing/Exams";
import Pricing from "@/components/marketing/Pricing";
import { JsonLd, websiteSchema } from "@/lib/seo/schema";
import ViewTracker from "@/lib/analytics/ViewTracker";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <ViewTracker event="homepage_viewed" />
      <Header />
      <main id="main-content">
        <Hero />
        <Goals />
        <HowItWorks />
        <ProgressShowcase />
        <LearningTypes />
        <Exams />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
