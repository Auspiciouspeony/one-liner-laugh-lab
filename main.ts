// One-Liner Laugh Lab
// make.fun bounty u-suroso-69-one-liner-laugh-lab-6ccf3aae
//
// The entry is one short funny line answering the prompt: the excuse a
// robot vacuum gives after eating a sock. The program writes that line to
// /output/entry.txt, where the sealed gate checks it is UTF-8 text of 1 to
// 200 characters, and the house judge then compares it pairwise against the
// other entries, weighing first that it answers the prompt, then how funny
// it is, how original, how well it fits the situation, and how tight the
// wording is.
//
// The line is fixed text: the same bytes on every run, so the two grading
// runs are byte-identical (deterministic). No network, no randomness, no
// clock, no input read.
//
// The joke, in the vacuum's own shameless voice: it works through three
// senses — smell, sight, taste — and the third one turns on the reader,
// because the "mistake" is one the vacuum would happily make again. A sock
// on the floor really does smell like a foot and really does look like a
// dust bunny to a machine that eats dust for a living, so the setup is an
// everyday truth and the punchline is the lack of remorse.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your sock smelled like a foot, looked like a dust bunny, and tasted like a mistake I would make again.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = join(outputDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

// Never chmod the output directory itself (the sandbox owns it); only the
// file this program creates, left world-readable (0644) so the grader,
// which collects outputs as another user, can read it.
mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LINE, "utf8");
chmodSync(entryPath, 0o644);
