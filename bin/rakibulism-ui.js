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

// Built-in external registries, addressable as "@scope/item" in `add`.
// Any shadcn-protocol registry.json works: { items: [{ name, url }] }, where
// each item's url resolves to a registry-item.json with a `files` array.
// Override or extend via the "registries" field in rakibulism-ui.json.
const DEFAULT_REGISTRIES = {
  spinnerkit: 'https://spinnerkit.vercel.app/r/registry.json',
};

// Extra runtime deps a component needs beyond the baseline (clsx, always
// checked separately below). Keep in sync with each component's imports.
const EXTRA_DEPS = {
  Tabs: ['@base-ui/react'],
  Accordion: ['@base-ui/react'],
  Modal: ['@base-ui/react'],
  Menu: ['@base-ui/react'],
  Tooltip: ['@base-ui/react'],
  Toast: ['@base-ui/react'],
  Select: ['@base-ui/react'],
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

function resolveRegistries(config) {
  return { ...DEFAULT_REGISTRIES, ...(config?.registries ?? {}) };
}

// Registry-sourced files import each other via "@/…", the shadcn convention.
// Detect whether the consumer's tsconfig/jsconfig already maps that alias to
// the project root so we only warn when it's actually missing.
function hasAtAlias() {
  for (const file of ['tsconfig.json', 'jsconfig.json']) {
    try {
      if (!fs.existsSync(file)) continue;
      const config = JSON.parse(fs.readFileSync(file, 'utf8'));
      const paths = config.compilerOptions?.paths ?? {};
      if (Object.keys(paths).some((key) => key === '@/*' || key === '@/')) return true;
    } catch {
      // Malformed or unreadable config — treat as "can't confirm", not fatal.
    }
  }
  return false;
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

// "@spinnerkit/sk-square-3" -> { scope: "spinnerkit", item: "sk-square-3" }
function parseRegistryRef(name) {
  const match = /^@([^/]+)\/(.+)$/.exec(name);
  return match ? { scope: match[1], item: match[2] } : null;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// Registry file paths (e.g. "components/ui/button.tsx") are written verbatim,
// relative to the project root — the same convention the shadcn CLI uses.
// Remapping them into a different local layout breaks the "@/…" imports
// baked into the file content, since sibling files reference each other by
// their declared registry path, not by rakibulism-ui's own componentsDir.
function resolveRegistryTargetPath(filePath) {
  const dest = path.resolve(process.cwd(), filePath);
  const root = path.resolve(process.cwd());
  if (dest !== root && !dest.startsWith(root + path.sep)) {
    throw new Error(`Refusing to write outside the project: "${filePath}"`);
  }
  return dest;
}

async function addFromRegistry(scope, itemName, registryUrl, config, npmDeps, seen = new Set()) {
  const registryKey = `${scope}/${itemName}`;
  if (seen.has(registryKey)) return;
  seen.add(registryKey);

  let registry;
  try {
    registry = await fetchJson(registryUrl);
  } catch (err) {
    console.error(`✗ Could not reach registry "@${scope}" (${registryUrl}): ${err.message}`);
    return;
  }

  const entry = registry.items?.find((i) => i.name === itemName);
  if (!entry) {
    console.error(`✗ Unknown component "@${scope}/${itemName}" — not found in ${registry.name ?? scope} registry.`);
    return;
  }

  const itemUrl = new URL(entry.url, registryUrl).toString();
  let item;
  try {
    item = await fetchJson(itemUrl);
  } catch (err) {
    console.error(`✗ Failed to fetch "@${scope}/${itemName}": ${err.message}`);
    return;
  }

  const written = [];
  for (const file of item.files ?? []) {
    let dest;
    try {
      dest = resolveRegistryTargetPath(file.path);
    } catch (err) {
      console.error(`✗ ${err.message}`);
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, file.content ?? '');
    written.push(file.path);
  }
  console.log(`✓ Added @${scope}/${itemName}`);
  for (const filePath of written) console.log(`  ${filePath}`);

  for (const dep of item.dependencies ?? []) npmDeps.add(dep);

  for (const depName of item.registryDependencies ?? []) {
    await addFromRegistry(scope, depName, registryUrl, config, npmDeps, seen);
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
  console.log('  npx rakibulism-ui add @spinnerkit/sk-square-3');
}

async function cmdAdd(names) {
  if (names.length === 0) {
    console.error('Usage: rakibulism-ui add <component> [component...]');
    console.error('       rakibulism-ui add @<registry>/<component>   (e.g. @spinnerkit/sk-square-3)');
    process.exit(1);
  }
  const config = loadConfig() ?? DEFAULT_CONFIG;
  if (!loadConfig()) {
    console.log(`No ${CONFIG_FILE} found, using defaults (run "rakibulism-ui init" to customize).`);
  }
  const registries = resolveRegistries(config);

  const neededExtras = new Set();
  const npmDeps = new Set();
  let addedLocal = false;
  let addedRegistry = false;

  for (const requested of names) {
    const ref = parseRegistryRef(requested);

    if (ref) {
      const registryUrl = registries[ref.scope];
      if (!registryUrl) {
        console.error(
          `✗ Unknown registry "@${ref.scope}". Add it to "registries" in ${CONFIG_FILE}, e.g.:\n` +
            `  { "registries": { "${ref.scope}": "https://example.com/r/registry.json" } }`
        );
        continue;
      }
      await addFromRegistry(ref.scope, ref.item, registryUrl, config, npmDeps);
      addedRegistry = true;
      continue;
    }

    const match = findComponent(requested);
    if (!match) {
      console.error(`✗ Unknown component "${requested}". Run "rakibulism-ui list" to see options.`);
      continue;
    }
    const dest = path.join(config.componentsDir, match);
    copyDir(path.join(COMPONENTS_SRC, match), dest);
    console.log(`✓ Added ${match} → ${dest}`);
    addedLocal = true;
    for (const dep of EXTRA_DEPS[match] ?? []) neededExtras.add(dep);
  }

  const baseline = addedLocal ? ['clsx'] : [];
  const missing = [...baseline, ...neededExtras, ...npmDeps].filter((dep) => !hasDep(dep));
  if (missing.length > 0) {
    console.log(`\nInstall the dependencies these components need:`);
    console.log(`  npm install ${missing.join(' ')}`);
  }

  if (addedRegistry && !hasAtAlias()) {
    console.log(
      `\n⚠ These files import via "@/…". Add a "@/*" path alias to your project root in\n` +
        `  tsconfig.json (or jsconfig.json), e.g.:\n` +
        `  { "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }`
    );
  }
}

function cmdList() {
  console.log('Available components:\n');
  for (const name of listComponents()) console.log(`  ${name}`);
  console.log('\nAdd one with: npx rakibulism-ui add <component>');
  console.log('\nExternal registries configured:');
  for (const [scope, url] of Object.entries(DEFAULT_REGISTRIES)) {
    console.log(`  @${scope} → ${url}`);
  }
}

function printHelp() {
  console.log(`rakibulism-ui — copy component source into your project

Usage:
  npx rakibulism-ui init             Set up config, copy design tokens + globals.css
  npx rakibulism-ui add <name...>    Copy one or more components into your project
  npx rakibulism-ui add @<registry>/<name>
                                      Copy a component from an external registry
                                      (e.g. @spinnerkit/sk-square-3)
  npx rakibulism-ui list             List available components and configured registries

Options:
  -y, --yes    Skip prompts in init and use default paths

Config (rakibulism-ui.json):
  {
    "componentsDir": "src/components/ui",
    "stylesDir": "src/styles/rakibulism-ui",
    "registries": {
      "spinnerkit": "https://spinnerkit.vercel.app/r/registry.json"
    }
  }`);
}

const [, , command, ...rest] = process.argv;

switch (command) {
  case 'init':
    await cmdInit(rest);
    break;
  case 'add':
    await cmdAdd(rest);
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
