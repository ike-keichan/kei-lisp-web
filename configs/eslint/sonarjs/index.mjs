import pluginSonarjs from 'eslint-plugin-sonarjs';
import { FILES, RULE_LEVEL } from '../const/index.mjs';

const { TEST } = FILES;
const { WARN, OFF } = RULE_LEVEL;

/**
 * ESLint config for eslint-plugin-sonarjs.
 */
export const sonarjsConfigs = [
  pluginSonarjs.configs.recommended,
  {
    rules: {
      'sonarjs/no-duplicate-string': [WARN, { threshold: 3 }],
      'sonarjs/no-collapsible-if': WARN,
    },
  },
  {
    files: TEST,
    rules: {
      'sonarjs/no-duplicate-string': OFF,
    },
  },
];
