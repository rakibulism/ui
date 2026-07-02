import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Build config for the documentation/showcase site (in `site/`).
 * Separate from the library build (vite.config.ts). The site imports the
 * real library source via the `rakibulism-ui` alias, so demos always reflect
 * the current components.
 */
export default defineConfig({
  root: resolve(__dirname, 'site'),
  base: './', // relative asset paths so it works on GitHub Pages project subpaths
  plugins: [react()],
  resolve: {
    alias: {
      'rakibulism-ui/styles': resolve(__dirname, 'src/styles/globals.css'),
      'rakibulism-ui': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    // respect an externally assigned port (e.g. from the preview harness)
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
    fs: {
      // allow importing the library source that lives outside `site/`
      allow: [resolve(__dirname)],
    },
  },
  build: {
    outDir: resolve(__dirname, 'site-dist'),
    emptyOutDir: true,
  },
});
