import tseslint from 'typescript-eslint';
import { FILES, RULE_LEVEL } from '../const/index.mjs';

const { SRC_TS, TEST } = FILES;
const { ERROR, WARN, OFF } = RULE_LEVEL;

/**
 * ESLint config for typescript-eslint.
 *
 * strictTypeChecked を適用するが、Vue SFC (.vue) は vue-eslint-parser が
 * 別途担当するため、ここでは対象を .ts のみに絞る。
 */
export const typescriptConfigs = [
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: [...SRC_TS, ...TEST],
  })),
  {
    files: [...SRC_TS, ...TEST],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // any の使用を禁止
      '@typescript-eslint/no-explicit-any': ERROR,
      // null 非許容アサーション（!）の使用を禁止
      '@typescript-eslint/no-non-null-assertion': ERROR,
      // デフォルトの toString のみを持つ値の文字列化を禁止
      '@typescript-eslint/no-base-to-string': ERROR,
      // 同型への不要な型変換 (Number(num), String(str) 等) を禁止
      '@typescript-eslint/no-unnecessary-type-conversion': ERROR,
      // メソッドの戻り値型に `this` 型の使用を強制
      '@typescript-eslint/prefer-return-this-type': ERROR,
      // NOTE: シム / composable など Vue アプリ側では static-only クラスがそもそも生まれないため無効化寄せ
      '@typescript-eslint/no-extraneous-class': OFF,
      // NOTE: DOM オブジェクトの chain 参照など this alias が便利なケースが Vue アプリでも発生するため無効化
      '@typescript-eslint/no-this-alias': OFF,
      // 型定義は interface ではなく type エイリアスを使う方針
      '@typescript-eslint/consistent-type-definitions': [ERROR, 'type'],
      // NOTE: strictTypeChecked がこのルールを有効化するため、unusedImportsConfigs 側の OFF が上書きされないよう再度 OFF にする（unused-imports/no-unused-vars に委譲）
      '@typescript-eslint/no-unused-vars': OFF,
    },
  },
  {
    // テストコードではモック等で any を使いやすくするため警告に緩和
    files: TEST,
    rules: {
      '@typescript-eslint/no-explicit-any': WARN,
    },
  },
];
