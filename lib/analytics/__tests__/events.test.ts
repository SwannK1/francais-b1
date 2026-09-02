import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

/**
 * Garde-fous de la taxonomie : noms uniques (un événement dupliqué serait un
 * signe d'oubli lors d'un ajout), et aucun nom de propriété manifestement
 * personnel/sensible dans `AnalyticsProperties`. Le compilateur TypeScript
 * bloque déjà toute propriété inline non déclarée ici (excess property
 * checking) — ce test protège l'autre bout : qu'on n'ajoute jamais une
 * propriété interdite À la liste blanche elle-même.
 */

const FORBIDDEN_PROPERTY_SUBSTRINGS = [
  "email",
  "name",
  "password",
  "token",
  "secret",
  "cookie",
  "phone",
  "address",
  "answer",
  "text",
  "content",
  "cardnumber",
  "stripekey",
];

function readEventsSource(): string {
  return readFileSync(path.join(process.cwd(), "lib/analytics/events.ts"), "utf8");
}

function extractPropertyKeys(source: string): string[] {
  const interfaceMatch = source.match(/export interface AnalyticsProperties \{([^}]*)\}/);
  if (!interfaceMatch) throw new Error("AnalyticsProperties introuvable dans events.ts");
  const body = interfaceMatch[1];
  return [...body.matchAll(/^\s*(\w+)\??:/gm)].map((m) => m[1]);
}

describe("taxonomie analytics (lib/analytics/events.ts)", () => {
  it("n'a aucun nom d'événement dupliqué", () => {
    const seen = new Set(ANALYTICS_EVENTS);
    expect(seen.size).toBe(ANALYTICS_EVENTS.length);
  });

  it("n'a aucun nom d'événement vide ou mal formé (snake_case)", () => {
    for (const name of ANALYTICS_EVENTS) {
      expect(name).toMatch(/^[a-z]+(_[a-z]+)*$/);
    }
  });

  it("ne liste, dans AnalyticsProperties, aucune propriété au nom manifestement personnel ou sensible", () => {
    const keys = extractPropertyKeys(readEventsSource());
    expect(keys.length).toBeGreaterThan(0);

    for (const key of keys) {
      const normalized = key.toLowerCase();
      for (const forbidden of FORBIDDEN_PROPERTY_SUBSTRINGS) {
        expect(normalized, `propriété suspecte : "${key}"`).not.toContain(forbidden);
      }
    }
  });
});
