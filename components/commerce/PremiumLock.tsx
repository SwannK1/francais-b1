"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { LockIcon } from "@/components/ui/icons";
import { MAIN_PLAN } from "@/lib/commerce/plans";
import { trackEvent } from "@/lib/analytics/client";

export default function PremiumLock({
  title,
  backHref,
  backLabel,
}: {
  title: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="space-y-6">
      <Link href={backHref} className="text-sm font-medium text-primary hover:underline">
        {backLabel}
      </Link>

      <Card className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LockIcon className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ce contenu fait partie de l&apos;offre « {MAIN_PLAN.name} ». La découverte gratuite te donne
          déjà accès au test de niveau et à deux modules complets pour essayer la méthode.
        </p>
        <Button
          href="/offre"
          size="lg"
          className="mt-6"
          onClick={() => trackEvent("premium_cta_clicked", { source: "premium_lock" })}
        >
          Voir l&apos;offre complète
        </Button>
      </Card>
    </div>
  );
}
