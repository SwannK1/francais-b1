"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { ChartIcon, MapIcon, MicrophoneIcon, RefreshIcon, SunIcon } from "@/components/ui/icons";
import { APP_NAV_ITEMS, getActiveNavHref } from "@/components/layout/app-nav";
import { cn } from "@/lib/cn";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "/aujourdhui": SunIcon,
  "/parcours": MapIcon,
  "/pratiquer": MicrophoneIcon,
  "/reviser": RefreshIcon,
  "/progression": ChartIcon,
};

/**
 * Barre d'onglets du bas, sous `lg` uniquement : les cinq destinations
 * restent à portée de pouce sur téléphone, sans ouvrir de menu. Cibles
 * tactiles ≥ 56 px de haut ; le libellé est toujours affiché (jamais
 * l'icône seule).
 */
export default function AppTabBar() {
  const activeHref = getActiveNavHref(usePathname());

  return (
    <nav
      aria-label="Navigation de l'application (mobile)"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {APP_NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.href] ?? SunIcon;
          const active = item.href === activeHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 px-0.5 text-[11px] font-medium leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="max-w-full truncate">{item.shortLabel ?? item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
