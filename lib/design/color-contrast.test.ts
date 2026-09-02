import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Garde-fou de contraste WCAG AA (4.5:1, texte normal) sur les tokens de
 * couleur réellement utilisés comme texte dans l'app (pas seulement comme
 * couleur d'icône décorative, qui elle ne requiert que 3:1) : badges
 * "Terminé", retour "Bonne réponse" en quiz, bannière "accès complet".
 * `--success` est passé sous ce seuil une fois (2f9e68, ~2.9:1 à 3.4:1 selon
 * le fond réel) ; ce test l'empêche de régresser silencieusement à l'occasion
 * d'un futur ajustement de thème.
 */

const CSS_PATH = path.join(process.cwd(), "app/globals.css");

function readToken(name: string): string {
  const css = readFileSync(CSS_PATH, "utf8");
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Token CSS --${name} introuvable dans ${CSS_PATH}`);
  return match[1];
}

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** Formule de contraste WCAG 2.x (https://www.w3.org/TR/WCAG21/#contrast-minimum). */
function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexA);
  const lB = relativeLuminance(hexB);
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

/** Composite une couleur à une opacité donnée sur un fond opaque (ex. bg-success/10). */
function compositeOver(hexFg: string, alpha: number, hexBg: string): string {
  const [fr, fg, fb] = hexToRgb(hexFg);
  const [br, bg, bb] = hexToRgb(hexBg);
  const mix = (f: number, b: number) => Math.round(f * alpha + b * (1 - alpha));
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(mix(fr, br))}${toHex(mix(fg, bg))}${toHex(mix(fb, bb))}`;
}

const WCAG_AA_NORMAL_TEXT = 4.5;

describe("contraste des tokens de couleur (WCAG AA texte normal)", () => {
  it("--success sur le fond de page est lisible (badges, retour de quiz)", () => {
    const success = readToken("success");
    const background = readToken("background");
    expect(contrastRatio(success, background)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it("--success sur une carte blanche est lisible", () => {
    const success = readToken("success");
    const card = readToken("card");
    expect(contrastRatio(success, card)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it("--success sur son propre fond teinté (bg-success/10) reste lisible", () => {
    const success = readToken("success");
    const card = readToken("card");
    const tinted = compositeOver(success, 0.1, card);
    expect(contrastRatio(success, tinted)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it("--foreground et --muted-foreground restent lisibles sur le fond de page (non-régression)", () => {
    const background = readToken("background");
    expect(contrastRatio(readToken("foreground"), background)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
    expect(contrastRatio(readToken("muted-foreground"), background)).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });
});
