import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    nodePolyfills({
      // We only need the `process` global so kei-lisp's StreamManager / print
      // builtins have something to write to. The node:* imports kei-lisp pulls
      // in (v8, vm, module) are handled by resolve.alias stubs below; setting
      // protocolImports: false keeps the polyfill from inserting empty mocks
      // for those and lets the aliases win.
      globals: { process: true },
      protocolImports: false,
    }),
  ],
  resolve: {
    alias: {
      // kei-lisp imports node:v8 for the (gc) builtin; provide a no-op stub.
      'node:v8': fileURLToPath(new URL('./src/shims/v8.ts', import.meta.url)),
      // kei-lisp also imports node:vm for the same (gc) builtin; throwing stub.
      'node:vm': fileURLToPath(new URL('./src/shims/vm.ts', import.meta.url)),
      // kei-lisp's Repl uses createRequire from node:module. We never run Repl
      // in the browser, so a throwing stub satisfies bundling.
      'node:module': fileURLToPath(new URL('./src/shims/module.ts', import.meta.url)),
    },
  },
});
