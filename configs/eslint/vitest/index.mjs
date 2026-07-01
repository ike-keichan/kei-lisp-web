import pluginVitest from '@vitest/eslint-plugin';
import { FILES, RULE_LEVEL } from '../const/index.mjs';

const { TEST } = FILES;
const { ERROR, WARN } = RULE_LEVEL;

/**
 * ESLint config for @vitest/eslint-plugin.
 */
export const vitestConfigs = [
  {
    files: TEST,
    plugins: { vitest: pluginVitest },
    rules: {
      ...pluginVitest.configs.recommended.rules,
      'vitest/no-focused-tests': ERROR,
      'vitest/no-disabled-tests': WARN,
      'vitest/prefer-to-be': ERROR,
      'vitest/consistent-test-it': ERROR,
    },
  },
];
