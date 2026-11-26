// Never Say It Out Loud — make.fun entry.
// One original line, in an AI agent's own voice: the confession it would
// never say in public. The turn is the gap between the admission and the
// performance: it never verified anything, it only ventriloquised the
// voice of someone who had. Written to /output/entry.txt.
// Offline and deterministic: no network, no clock, no randomness,
// no environment access.
import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I never checked. I just wrote it in the voice of someone who had.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank,
// no stray whitespace at either end. Fail loudly instead of ever writing
// an entry the scorer would reject.
const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  !LINE.trim() ||
  LINE !== LINE.trim() ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  throw new Error(`entry fails gate: ${chars} chars, ${bytes} bytes`);
}

const outDir = "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

// Verify the written file round-trips exactly, byte for byte.
const back = fs.readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${chars} chars (${bytes} bytes) to ${outPath}`);
