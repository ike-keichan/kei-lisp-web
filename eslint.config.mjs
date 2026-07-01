import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

import { importXConfigs } from './configs/eslint/import-x/index.mjs';
import { unicornConfigs } from './configs/eslint/unicorn/index.mjs';
import { unusedImportsConfigs } from './configs/eslint/unused-imports/index.mjs';
import { securityConfigs } from './configs/eslint/security/index.mjs';
import { sonarjsConfigs } from './configs/eslint/sonarjs/index.mjs';
import { nConfigs } from './configs/eslint/n/index.mjs';
import { vitestConfigs } from './configs/eslint/vitest/index.mjs';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.vite/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...importXConfigs,
  ...unicornConfigs,
  ...unusedImportsConfigs,
  ...securityConfigs,
  ...sonarjsConfigs,
  ...nConfigs,
  ...vitestConfigs,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
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
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
];
