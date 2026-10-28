// Runs Astro commands for this project: `node tools/run.mjs dev|build|preview|sync [astro args]`.
//
// Vite/Tailwind cannot run inside a folder whose path contains '#' (e.g. "Solana Landing Page #3"):
// '#' is treated as a URL fragment and the module path is cut off. When the project path contains
// '#', this script mirrors src/, public/ and astro.config.mjs into a '#'-free sibling folder
// (default: "solana-east-build", override with SOLANA_MIRROR), keeps it in sync while `dev` runs,
// and runs Astro there. In a normal path it simply runs Astro in place.
//
// Permanent fix: rename the project folder without '#'.
import { spawn, spawnSync } from 'node:child_process';
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [command = 'dev', ...rest] = process.argv.slice(2);
const needsMirror = root.includes('#');
const mirror = process.env.SOLANA_MIRROR ?? join(dirname(root), 'solana-east-build');
const node = process.execPath;
const npmCli = join(dirname(node), 'node_modules', 'npm', 'bin', 'npm-cli.js');

function sync() {
  mkdirSync(mirror, { recursive: true });
  for (const file of ['package.json', 'package-lock.json', 'tsconfig.json', 'astro.config.mjs']) {
    if (existsSync(join(root, file))) copyFileSync(join(root, file), join(mirror, file));
  }
  for (const dir of ['src', 'public']) {
    if (process.platform === 'win32') {
      // /MIR mirrors deletions too; robocopy exit codes below 8 mean success.
      spawnSync('robocopy', [join(root, dir), join(mirror, dir), '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NP'], {
        stdio: 'ignore',
        windowsHide: true,
      });
    } else {
      rmSync(join(mirror, dir), { recursive: true, force: true });
      cpSync(join(root, dir), join(mirror, dir), { recursive: true });
    }
  }
}

/** Run Astro via node + local CLI — no shell, no DEP0190. */
function runAstro(cwd, args) {
  const astroCli = join(cwd, 'node_modules', 'astro', 'bin', 'astro.mjs');
  if (!existsSync(astroCli)) {
    console.error(`Astro CLI not found at ${astroCli}. Run npm install first.`);
    process.exit(1);
  }
  return spawn(node, [astroCli, ...args], {
    cwd,
    stdio: 'inherit',
    shell: false,
    windowsHide: true,
    env: process.env,
  });
}

function runNpm(cwd, args) {
  if (!existsSync(npmCli)) {
    console.error(`npm CLI not found at ${npmCli}.`);
    process.exit(1);
  }
  return spawnSync(node, [npmCli, ...args], {
    cwd,
    stdio: 'inherit',
    shell: false,
    windowsHide: true,
    env: process.env,
  });
}

if (!needsMirror) {
  if (command === 'sync') {
    console.log('Project path has no "#"; nothing to sync.');
    process.exit(0);
  }
  runAstro(root, [command, ...rest]).on('exit', (code) => process.exit(code ?? 0));
} else {
  console.log(`Project path contains "#" — running Astro from the mirror: ${mirror}`);
  sync();
  if (!existsSync(join(mirror, 'node_modules'))) {
    console.log('Installing dependencies in the mirror (first run)…');
    const install = runNpm(mirror, ['ci']);
    if (install.status !== 0) process.exit(install.status ?? 1);
  }
  if (command === 'sync') {
    console.log('Synced.');
    process.exit(0);
  }

  const timer = command === 'dev' ? setInterval(sync, 1000) : undefined;
  const child = runAstro(mirror, [command, ...rest]);
  const stop = () => {
    if (timer) clearInterval(timer);
    child.kill();
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  child.on('exit', (code) => {
    if (timer) clearInterval(timer);
    if (command === 'build' && code === 0 && process.platform === 'win32') {
      spawnSync('robocopy', [join(mirror, 'dist'), join(root, 'dist'), '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NP'], {
        stdio: 'ignore',
        windowsHide: true,
      });
      console.log(`Build copied to ${join(root, 'dist')}`);
    }
    process.exit(code ?? 0);
  });
}
