import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const recoveryRoot = process.argv[2];
const outputPath = process.argv[3] ?? "docs/recovery-audio-inventory.csv";

if (!recoveryRoot || !existsSync(recoveryRoot)) {
  throw new Error("Usage: node scripts/recovery-audio-inventory.mjs <recovery-root> [output.csv]");
}

const AUDIO_EXTENSIONS = new Set([".aac", ".m4a", ".mp3", ".ogg", ".wav"]);
const SKIPPED_DIRECTORIES = new Set([".git", ".next", "build", "coverage", "dist", "node_modules"]);

function walk(directory, predicate, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIPPED_DIRECTORIES.has(entry.name)) continue;
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) walk(absolutePath, predicate, files);
    else if (entry.isFile() && predicate(absolutePath)) files.push(absolutePath);
  }
  return files;
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function durationSeconds(filePath) {
  try {
    const output = execFileSync("/usr/bin/afinfo", [filePath], { encoding: "utf8" });
    const match = output.match(/estimated duration:\s*([0-9.]+) sec/i);
    return match ? Number(match[1]).toFixed(3) : "";
  } catch {
    return "";
  }
}

function csv(value) {
  const stringValue = String(value ?? "");
  return /[",\n]/.test(stringValue) ? `"${stringValue.replaceAll('"', '""')}"` : stringValue;
}

const sourceDirectories = readdirSync(recoveryRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({ name: entry.name, path: join(recoveryRoot, entry.name) }));

const groupedVariants = new Map();
for (const source of sourceDirectories) {
  const audioFiles = walk(source.path, (filePath) => AUDIO_EXTENSIONS.has(extname(filePath).toLowerCase()));
  for (const filePath of audioFiles) {
    const sourceRelative = relative(source.path, filePath).split(sep).join("/");
    const audioIndex = sourceRelative.indexOf("public/audio/");
    if (audioIndex < 0) continue;
    const logicalPath = sourceRelative.slice(audioIndex);
    const hash = sha256(filePath);
    const key = `${logicalPath}|${hash}`;
    const existing = groupedVariants.get(key);
    if (existing) {
      existing.sources.push(source.name);
      continue;
    }
    groupedVariants.set(key, {
      logicalPath,
      hash,
      size: statSync(filePath).size,
      format: extname(filePath).slice(1).toLowerCase(),
      duration: durationSeconds(filePath),
      sources: [source.name],
    });
  }
}

const textExtensions = new Set([".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const productText = walk(process.cwd(), (filePath) => textExtensions.has(extname(filePath).toLowerCase()))
  .map((filePath) => readFileSync(filePath, "utf8"))
  .join("\n");

const rows = [...groupedVariants.values()]
  .sort((a, b) => a.logicalPath.localeCompare(b.logicalPath) || a.hash.localeCompare(b.hash))
  .map((variant) => {
    const rebuiltPath = join(process.cwd(), variant.logicalPath);
    const selected = existsSync(rebuiltPath) && sha256(rebuiltPath) === variant.hash;
    const productReference = productText.includes(variant.logicalPath.replace(/^public/, ""));
    const level = variant.logicalPath.split("/")[2] ?? "other";
    const manifestPath = `lib/pedagogy/audio/${level}/manifest.ts`;
    const manifestAssociated = existsSync(join(process.cwd(), manifestPath)) ? manifestPath : "lib/pedagogy/audio/manifest.ts";
    return [
      variant.logicalPath,
      variant.sources.sort().join(";"),
      variant.hash,
      variant.size,
      variant.format,
      variant.duration,
      manifestAssociated,
      productReference ? "referenced" : "not-found-by-static-scan",
      selected ? "selected-final-launch" : "retained-in-recovery-only",
    ];
  });

const header = [
  "logical_path",
  "sources",
  "sha256",
  "size_bytes",
  "format",
  "duration_seconds",
  "manifest",
  "product_usage",
  "selection",
];

writeFileSync(outputPath, [header, ...rows].map((row) => row.map(csv).join(",")).join("\n") + "\n");
console.log(`Audio variants inventoried: ${rows.length}`);
console.log(`Selected variants: ${rows.filter((row) => row.at(-1) === "selected-final-launch").length}`);

