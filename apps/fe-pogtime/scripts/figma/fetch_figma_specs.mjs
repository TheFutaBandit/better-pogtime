#!/usr/bin/env node
/*
 Fetch Figma node JSON and variables for a file.
 Usage:
   FIGMA_TOKEN=... node scripts/figma/fetch_figma_specs.mjs --file Rc6vdigxzueeVd5x9oJ5UX --ids 4:2
 Options:
   --out <dir>                Output directory (default: apps/fe-pogtime/figma/specs)
   --include-document         Also fetch full file document JSON (can be large)
*/

import fs from "node:fs";
import path from "node:path";

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
if (!FIGMA_TOKEN) {
  console.error("Missing FIGMA_TOKEN env var. Create a Figma personal access token and set FIGMA_TOKEN.");
  process.exit(1);
}

function parseArgs(argv) {
  const args = { file: "", ids: [], out: "apps/fe-pogtime/figma/specs", includeDocument: false };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--file") args.file = argv[++i] || "";
    else if (arg === "--ids") args.ids = (argv[++i] || "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (arg === "--out") args.out = argv[++i] || args.out;
    else if (arg === "--include-document") args.includeDocument = true;
  }
  if (!args.file) {
    console.error("--file <fileKey> is required");
    process.exit(1);
  }
  return args;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${FIGMA_TOKEN}` } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status} ${res.statusText} for ${url}: ${text}`);
  }
  return res.json();
}

async function fetchNodes(fileKey, ids) {
  if (!ids.length) return null;
  // Figma allows multiple ids via comma-separated list.
  const url = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}/nodes?ids=${encodeURIComponent(ids.join(","))}`;
  return fetchJson(url);
}

async function fetchVariables(fileKey) {
  // Try new variables endpoint first; fall back to /variables/local for older behavior.
  const primary = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}/variables`;
  try {
    return await fetchJson(primary);
  } catch (err) {
    const fallback = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}/variables/local`;
    return fetchJson(fallback);
  }
}

async function fetchStyles(fileKey) {
  const url = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}/styles`;
  try {
    return await fetchJson(url);
  } catch {
    return null;
  }
}

async function fetchDocument(fileKey) {
  const url = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}`;
  return fetchJson(url);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(outDir, name, data) {
  ensureDir(outDir);
  const file = path.join(outDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Wrote ${file}`);
}

async function main() {
  const args = parseArgs(process.argv);
  const outDir = path.isAbsolute(args.out) ? args.out : path.join(process.cwd(), args.out);

  const [nodes, variables, styles, documentJson] = await Promise.all([
    fetchNodes(args.file, args.ids),
    fetchVariables(args.file),
    fetchStyles(args.file),
    args.includeDocument ? fetchDocument(args.file) : Promise.resolve(null),
  ]);

  if (nodes) writeJson(outDir, "nodes", nodes);
  if (variables) writeJson(outDir, "variables", variables);
  if (styles) writeJson(outDir, "styles", styles);
  if (documentJson) writeJson(outDir, "document", documentJson);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


