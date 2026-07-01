import pluginImportX from 'eslint-plugin-import-x';
import { RULE_LEVEL } from '../const/index.mjs';

const { ERROR, WARN } = RULE_LEVEL;

/**
 * ESLint config for eslint-plugin-import-x.
 */
export const importXConfigs = [
  pluginImportX.flatConfigs.recommended,
  {
    settings: {
      'import-x/resolver': { typescript: true, node: true },
    },
    rules: {
      'import-x/no-unresolved': ERROR,
      'import-x/no-duplicates': ERROR,
      'import-x/no-cycle': WARN,
      'import-x/no-self-import': ERROR,
      'import-x/no-useless-path-segments': ERROR,
      'import-x/first': ERROR,
      'import-x/order': WARN,
    },
  },
];
