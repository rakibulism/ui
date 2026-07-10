import { resolve } from 'node:path';
import { copyFileSync, mkdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

/**
 * Copies the hand-authored global stylesheet into the build output verbatim,
 * so it can be published and imported via `@rakibulism/ui/styles`.
 */
function copyGlobalStyles() {
  return {
    name: 'copy-global-styles',
    closeBundle() {
      mkdirSync(resolve(__dirname, 'dist/styles'), { recursive: true });
      copyFileSync(
        resolve(__dirname, 'src/styles/globals.css'),
        resolve(__dirname, 'dist/styles/globals.css'),
      );
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      entryRoot: 'src',
      include: ['src'],
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*'],
      insertTypesEntry: true,
    }),
    copyGlobalStyles(),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
      },
    },
    rollupOptions: {
      // @base-ui/react is externalized like react/react-dom rather than
      // bundled: it's a regular `dependency` so a plain
      // `npm install rakibulism-ui` installs it, but keeping it out of
      // dist/index.js lets each consumer's own bundler dedupe/tree-shake it
      // normally instead of every consumer paying for every primitive
      // regardless of which components they actually use.
      external: (id) =>
        ['react', 'react-dom', 'react/jsx-runtime'].includes(id) || id.startsWith('@base-ui/react'),
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name][extname]',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          assetFileNames: 'assets/[name][extname]',
          exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
        },
      ],
    },
  },
});
