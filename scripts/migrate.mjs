#!/usr/bin/env node
// Applique lib/auth/schema.sql à la base pointée par DATABASE_URL.
// Convenience équivalente à coller le fichier dans l'éditeur SQL de Neon —
// utile en CI/CD ou pour un développeur qui préfère une seule commande.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL manquant. Copiez .env.example vers .env.local et renseignez-le.");
  process.exit(1);
}

const schemaPath = join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "auth", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");

// On retire d'abord les lignes de commentaire, puis on découpe sur `;` :
// suffisant tant que schema.sql ne contient pas de point-virgule à
// l'intérieur d'une chaîne/d'un corps de fonction (ce qui n'est pas le cas
// ici — uniquement des CREATE TABLE/INDEX). Filtrer les commentaires après
// coup (au lieu d'avant le split) ratait les statements précédés d'un
// commentaire collé sans ligne vide, dont le chunk entier commençait par
// "--" et était donc silencieusement jeté.
const statements = schema
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

const sql = neon(url);

for (const statement of statements) {
  const label = statement.split("\n")[0].slice(0, 60);
  process.stdout.write(`→ ${label}...\n`);
  await sql.query(statement);
}

console.log(`✓ ${statements.length} instructions appliquées.`);
