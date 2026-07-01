import pluginN from 'eslint-plugin-n';
import { FILES, RULE_LEVEL } from '../const/index.mjs';

const { CONFIG } = FILES;
const { ERROR } = RULE_LEVEL;

/**
 * ESLint config for eslint-plugin-n.
 *
 * Node ランタイム前提のルールはブラウザ側の src/ に適用しないため、
 * ビルド/ツール系ファイル (vite.config.ts / eslint.config.mjs / configs/**\/*.mjs) に scope 限定する。
 */
export const nConfigs = [
  {
    files: CONFIG,
    ...pluginN.configs['flat/recommended'],
  },
  {
    files: CONFIG,
    rules: {
      'n/prefer-node-protocol': ERROR,
    },
  },
];
