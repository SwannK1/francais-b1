import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site";

const tagline = "Un test de niveau, un parcours de modules guidés et des examens blancs DELF B1.";

/**
 * Image de partage générée à partir des vraies couleurs de marque
 * (app/globals.css) et du vrai texte de description du site — pas un
 * visuel factice importé d'ailleurs.
 */
export const alt = `${SITE_NAME} — Apprends le français à ton rythme`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#faf9f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
            color: "#1c2333",
          }}
        >
          Parcours<span style={{ color: "#2c4a7c" }}>FR</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 56,
            fontWeight: 700,
            color: "#1c2333",
            lineHeight: 1.15,
          }}
        >
          Apprends le français à ton rythme
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#5b6472",
            maxWidth: 920,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 24,
            fontWeight: 600,
            color: "#ffffff",
            backgroundColor: "#2c4a7c",
            padding: "10px 24px",
            borderRadius: 999,
            alignSelf: "flex-start",
          }}
        >
          Niveau B1 · Préparation DELF B1
        </div>
      </div>
    ),
    { ...size }
  );
}
