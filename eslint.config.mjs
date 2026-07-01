import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

import { jsConfigs } from './configs/eslint/js/index.mjs';
import { nConfigs } from './configs/eslint/n/index.mjs';
import { sonarjsConfigs } from './configs/eslint/sonarjs/index.mjs';
import { securityConfigs } from './configs/eslint/security/index.mjs';
import { unicornConfigs } from './configs/eslint/unicorn/index.mjs';
import { importXConfigs } from './configs/eslint/import-x/index.mjs';
import { unusedImportsConfigs } from './configs/eslint/unused-imports/index.mjs';
import { typescriptConfigs } from './configs/eslint/typescript/index.mjs';
import { vitestConfigs } from './configs/eslint/vitest/index.mjs';

/**
 * kei-lisp / kei-lisp-plugin-graphics の eslint.config.mjs と揃えつつ、
 * Vue アプリ固有の追加を行う。
 *
 * 意味のある差分:
 *   - pluginVue の flat/recommended を追加
 *   - .vue ファイルは vue-eslint-parser + tseslint.parser の 2 段構成
 *   - browser globals を含める
 *   - vue/multi-word-component-names を off（Repl 等の 1 語コンポーネント名を許容）
 */
export default [
  {
    // env.d.ts は declare module 宣言のみのため lint 対象から外す
    ignores: ['dist/**', 'node_modules/**', '.vite/**', 'env.d.ts'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },
  ...jsConfigs,
  ...nConfigs,
  ...sonarjsConfigs,
  ...securityConfigs,
  ...unicornConfigs,
  ...importXConfigs,
  ...unusedImportsConfigs,
  ...typescriptConfigs,
  ...vitestConfigs,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
];
