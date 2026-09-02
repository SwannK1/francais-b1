import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx,mjs}"],
    // scripts/seo.test.ts est écrit pour `node --test` (voir npm run test:seo),
    // pas vitest : il n'exporte aucun test au sens vitest et ferait échouer la run.
    exclude: ["**/node_modules/**", ".next/**", "scripts/seo.test.ts"],
  },
});
