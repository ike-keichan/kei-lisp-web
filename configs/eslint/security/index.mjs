import securityPlugin from 'eslint-plugin-security';
import { RULE_LEVEL } from '../const/index.mjs';

const { ERROR, OFF } = RULE_LEVEL;

/**
 * ESLint config for eslint-plugin-security.
 */
export const securityConfigs = [
  securityPlugin.configs.recommended,
  {
    rules: {
      'security/detect-eval-with-expression': ERROR,
      'security/detect-unsafe-regex': ERROR,
      'security/detect-pseudoRandomBytes': ERROR,
      'security/detect-object-injection': OFF,
    },
  },
];
