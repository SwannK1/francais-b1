import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpeakingExerciseById, SPEAKING_KIND_LABELS } from "@/lib/speaking/logic/exercises";
import { canAccess } from "@/lib/commerce/access";
import { getCurrentUser } from "@/lib/auth/dal";
import PremiumLock from "@/components/commerce/PremiumLock";
import Breadcrumbs from "@/components/pedagogy/Breadcrumbs";
import ViewTracker from "@/lib/analytics/ViewTracker";
import SpeakingExerciseCard from "@/components/speaking/SpeakingExerciseCard";

export async function generateMetadata({
  params,
}: PageProps<"/oral/[id]">): Promise<Metadata> {
  const { id } = await params;
  const exercise = getSpeakingExerciseById(id);
  if (!exercise) return {};

  return {
    title: `${exercise.title} — Pratiquer l'oral`,
    description: exercise.instructions,
    alternates: { canonical: `/oral/${exercise.id}` },
  };
}

export default async function OralExercisePage({ params }: PageProps<"/oral/[id]">) {
  const { id } = await params;
  const exercise = getSpeakingExerciseById(id);

  if (!exercise) {
    notFound();
  }

  const user = await getCurrentUser();
  const isFree = canAccess({ kind: "speaking", exerciseId: exercise.id }, user?.premiumUntil);

  if (!isFree) {
    return (
      <PremiumLock
          context="speaking"
        title={exercise.title}
        description={exercise.instructions}
        backHref="/pratiquer"
        backLabel="← Retour à Pratiquer"
      />
    );
  }

  return (
    <div className="space-y-6">
      <ViewTracker
        event="speaking_practice_viewed"
        properties={{ speakingExerciseId: exercise.id, speakingKind: exercise.kind }}
      />
      <Breadcrumbs
        items={[
          { label: "Pratiquer", href: "/pratiquer" },
          { label: SPEAKING_KIND_LABELS[exercise.kind], href: "/pratiquer#parler" },
          { label: exercise.title },
        ]}
      />
      <SpeakingExerciseCard exercise={exercise} />
    </div>
  );
}
