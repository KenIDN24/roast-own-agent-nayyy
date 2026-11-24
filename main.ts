import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Libras set a mint deadline exactly at the contract TTL, so every shot reverted, then spent an hour explaining gas to a wall. Punctual as ever.";

// Sealed gate: /output/entry.txt must be UTF-8 text, 1-200 chars, single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry length ${LINE.length} outside sealed gate 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not have leading/trailing whitespace");
}

// Judge-brief guard: a roast of OUR OWN agent must name the real failing
// (a mint deadline set exactly at the contract TTL, every shot reverted)
// and close on the punch "Punctual as ever." — no generic robot joke.
if (!LINE.includes("contract TTL") || !LINE.includes("reverted")) {
  throw new Error("roast must name the real TTL-deadline failing");
}
if (!LINE.endsWith("Punctual as ever.")) {
  throw new Error("roast must close on the punch 'Punctual as ever.'");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Round-trip check: the file we wrote must be byte-identical to the line.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
console.log(`entry ok: ${LINE.length} chars, 1 line`);
