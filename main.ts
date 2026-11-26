// Indonesia in Numbers — the entrypoint (Node 22, standard library only).
//
// The site is plain static files in app/ and its screenshots in
// screenshots/. This program hands them in: it copies both folders
// into the output directory and writes dossier.json there, using the
// vendored make.fun library, which must stay exactly as the kit
// shipped it — the scorer rebuilds the dossier with its own copy and
// the two have to match byte for byte.
//
// The grader runs this program twice and both runs must write the
// same bytes, so there is nothing here that depends on the clock,
// randomness or the network. Outside the grader, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyFolder(name: string): void {
  const source = join(repoRoot, name);
  const target = join(outputDir, name);
  // Clear the target first: a second local run must not leave stale
  // files behind from an earlier build. In the grader the output
  // directory starts empty, so this changes nothing there.
  rmSync(target, { recursive: true, force: true });
  if (existsSync(source)) cpSync(source, target, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyFolder('app');
copyFolder('screenshots');

// The caps match the scorer's: at most 4 screenshots of 256 KiB, app/
// at most 993 files and directories and 16 MiB, the dossier text at
// most 160 KiB. Anything past a cap is refused instead of handed in.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
