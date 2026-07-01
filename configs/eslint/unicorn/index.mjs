import pluginUnicorn from 'eslint-plugin-unicorn';
import { RULE_LEVEL } from '../const/index.mjs';

const { ERROR, OFF } = RULE_LEVEL;

/**
 * ESLint config for eslint-plugin-unicorn.
 */
export const unicornConfigs = [
  pluginUnicorn.configs.recommended,
  {
    rules: {
      'unicorn/prevent-abbreviations': OFF,
      'unicorn/filename-case': OFF,
      'unicorn/no-null': OFF,
      'unicorn/better-regex': ERROR,
      // Vue / Vite の慣習と衝突: `env.d.ts`, `inputEl`, `historyPrev`, `msg` などのアプリ内で通じる短縮名を強制的に置換させたくない
      'unicorn/name-replacements': OFF,
      // sink 等の関数参照を Boolean と誤検知する false positive があるため無効化
      'unicorn/consistent-boolean-name': OFF,
      // Node API 互換のため意図的にネストしたクロージャを保つケース (nodeModule.ts の createRequire 等) と衝突するため無効化
      'unicorn/consistent-function-scoping': OFF,
    },
  },
];
