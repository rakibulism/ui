#!/usr/bin/env node
// Scaffolding CLI — copies component source into a consumer project, shadcn-style.
// No runtime dependencies: only Node core modules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';

const PKG_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const COMPONENTS_SRC = path.join(PKG_ROOT, 'src', 'components');
const TOKENS_SRC = path.join(PKG_ROOT, 'src', 'tokens');
const GLOBALS_CSS_SRC = path.join(PKG_ROOT, 'src', 'styles', 'globals.css');
const CONFIG_FILE = 'rakibulism-ui.json';
const DEFAULT_CONFIG = {
  componentsDir: 'src/components/ui',
  stylesDir: 'src/styles/rakibulism-ui',
};

// Extra runtime deps a component needs beyond the baseline (clsx, always
// checked separately below). Keep in sync with each component's imports.
const EXTRA_DEPS = {
  Tabs: ['@radix-ui/react-tabs'],
  Accordion: ['@radix-ui/react-accordion'],
  Modal: ['@radix-ui/react-dialog'],
};

function listComponents() {
  return fs
    .readdirSync(COMPONENTS_SRC, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== '__tests__')
    .map((d) => d.name)
    .sort();
}

function findComponent(name) {
  const all = listComponents();
  return all.find((c) => c.toLowerCase() === name.toLowerCase());
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) };
  }
  return null;
}

function hasDep(name) {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return Boolean(
      pkg.dependencies?.[name] ||
        pkg.devDependencies?.[name] ||
        pkg.peerDependencies?.[name]
    );
  } catch {
    return false;
  }
}

async function cmdInit(args) {
  const yes = args.includes('--yes') || args.includes('-y');
  let config = { ...DEFAULT_CONFIG };

  if (fs.existsSync(CONFIG_FILE)) {
    console.log(`${CONFIG_FILE} already exists, skipping.`);
    config = loadConfig();
  } else {
    if (!yes) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const componentsDir = await rl.question(
        `Where should components live? (${DEFAULT_CONFIG.componentsDir}) `
      );
      const stylesDir = await rl.question(
        `Where should tokens/styles live? (${DEFAULT_CONFIG.stylesDir}) `
      );
      rl.close();
      if (componentsDir.trim()) config.componentsDir = componentsDir.trim();
      if (stylesDir.trim()) config.stylesDir = stylesDir.trim();
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2) + '\n');
    console.log(`Created ${CONFIG_FILE}`);
  }

  copyDir(TOKENS_SRC, path.join(config.stylesDir, 'tokens'));
  fs.mkdirSync(config.stylesDir, { recursive: true });
  fs.copyFileSync(GLOBALS_CSS_SRC, path.join(config.stylesDir, 'globals.css'));
  console.log(`Copied tokens + globals.css to ${config.stylesDir}`);

  if (!hasDep('clsx')) {
    console.log('\nAdd the one runtime dependency components use:');
    console.log('  npm install clsx');
  }
  console.log(`\nImport the stylesheet once at your app root:`);
  console.log(`  import './${path.join(config.stylesDir, 'globals.css')}'`);
  console.log(`\nThen add components:`);
  console.log('  npx rakibulism-ui add button');
}

function cmdAdd(names) {
  if (names.length === 0) {
    console.error('Usage: rakibulism-ui add <component> [component...]');
    process.exit(1);
  }
  const config = loadConfig() ?? DEFAULT_CONFIG;
  if (!loadConfig()) {
    console.log(`No ${CONFIG_FILE} found, using defaults (run "rakibulism-ui init" to customize).`);
  }

  const neededExtras = new Set();

  for (const requested of names) {
    const match = findComponent(requested);
    if (!match) {
      console.error(`✗ Unknown component "${requested}". Run "rakibulism-ui list" to see options.`);
      continue;
    }
    const dest = path.join(config.componentsDir, match);
    copyDir(path.join(COMPONENTS_SRC, match), dest);
    console.log(`✓ Added ${match} → ${dest}`);
    for (const dep of EXTRA_DEPS[match] ?? []) neededExtras.add(dep);
  }

  const missing = ['clsx', ...neededExtras].filter((dep) => !hasDep(dep));
  if (missing.length > 0) {
    console.log(`\nInstall the dependencies these components need:`);
    console.log(`  npm install ${missing.join(' ')}`);
  }
}

function cmdList() {
  console.log('Available components:\n');
  for (const name of listComponents()) console.log(`  ${name}`);
  console.log('\nAdd one with: npx rakibulism-ui add <component>');
}

function printHelp() {
  console.log(`rakibulism-ui — copy component source into your project

Usage:
  npx rakibulism-ui init             Set up config, copy design tokens + globals.css
  npx rakibulism-ui add <name...>    Copy one or more components into your project
  npx rakibulism-ui list             List available components

Options:
  -y, --yes    Skip prompts in init and use default paths`);
}

const [, , command, ...rest] = process.argv;

switch (command) {
  case 'init':
    await cmdInit(rest);
    break;
  case 'add':
    cmdAdd(rest);
    break;
  case 'list':
    cmdList();
    break;
  case undefined:
  case '-h':
  case '--help':
    printHelp();
    break;
  default:
    console.error(`Unknown command "${command}"\n`);
    printHelp();
    process.exit(1);
}
