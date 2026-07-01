# kei-lisp-web

[![CI](https://github.com/ike-keichan/kei-lisp-web/actions/workflows/ci.yml/badge.svg)](https://github.com/ike-keichan/kei-lisp-web/actions/workflows/ci.yml)
[![Deploy](https://github.com/ike-keichan/kei-lisp-web/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/ike-keichan/kei-lisp-web/actions/workflows/deploy-pages.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](https://nodejs.org/)
[![kei-lisp](https://img.shields.io/npm/v/kei-lisp.svg?label=kei-lisp)](https://www.npmjs.com/package/kei-lisp)
[![kei-lisp-plugin-graphics](https://img.shields.io/npm/v/kei-lisp-plugin-graphics.svg?label=kei-lisp-plugin-graphics)](https://www.npmjs.com/package/kei-lisp-plugin-graphics)

[kei-lisp](https://github.com/ike-keichan/kei-lisp) と
[kei-lisp-plugin-graphics](https://github.com/ike-keichan/kei-lisp-plugin-graphics)
を組み合わせて Web ブラウザ上で動かす Lisp REPL。

公開ページ: https://ike-keichan.github.io/kei-lisp-web/

## 使い方

上部の入力欄に S 式を入力して Enter で評価。↑/↓ で入力履歴。

```lisp
;; 通常の Lisp 式
(+ 1 2)                        ; => 3
(defun square (x) (* x x))     ; => square
(square 5)                     ; => 25

;; Canvas 描画（下部の canvas に描かれる）
(gopen)
(gfill-color "tomato")
(gfill-rect 10 10 120 80)
(gclose)
```

利用可能な関数の詳細は各ライブラリ側のドキュメント参照:

| 対象                        | ドキュメント                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lisp の組込関数一覧         | [kei-lisp/docs/built-in-functions.md](https://github.com/ike-keichan/kei-lisp/blob/main/docs/built-in-functions.md)                                     |
| データ型（アトム / cons）   | [atoms.md](https://github.com/ike-keichan/kei-lisp/blob/main/docs/atoms.md) / [cons.md](https://github.com/ike-keichan/kei-lisp/blob/main/docs/cons.md) |
| kei-lisp の Examples / API  | [kei-lisp README](https://github.com/ike-keichan/kei-lisp#readme)                                                                                       |
| Canvas 描画関数一覧（`g…`） | [kei-lisp-plugin-graphics README](https://github.com/ike-keichan/kei-lisp-plugin-graphics#provided-lisp-functions)                                      |

## 開発

### 前提

- Node.js `>= 24`（`.node-version` 参照）
- pnpm `10.x`（Corepack 経由推奨）

### スクリプト

| コマンド         | 内容                                                 |
| ---------------- | ---------------------------------------------------- |
| `pnpm dev`       | 開発サーバ起動（http://localhost:5173/）             |
| `pnpm build`     | 型チェック + Vite 本番ビルド（成果物は `dist/`）     |
| `pnpm preview`   | ビルド結果をローカル配信                             |
| `pnpm typecheck` | `vue-tsc --noEmit`                                   |
| `pnpm test`      | `vitest run`                                         |
| `pnpm check`     | `check:format` + `check:lint` + `check:spell` を一括 |
| `pnpm fix`       | `fix:format` + `fix:lint` を一括                     |

## 構成

### 主要パッケージ

| Package                                                                              | 用途                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------- |
| [`kei-lisp`](https://www.npmjs.com/package/kei-lisp)                                 | Lisp インタプリタ本体                 |
| [`kei-lisp-plugin-graphics`](https://www.npmjs.com/package/kei-lisp-plugin-graphics) | Canvas2D 描画関数を追加するプラグイン |
| Vue 3 / Vite / TypeScript                                                            | フロントエンドスタック                |

### ディレクトリ

```text
src/
├── App.vue                        # <Repl/> をマウントするルート
├── main.ts                        # エントリ（process シム設定 + Vue 起動）
├── components/
│   └── Repl/Repl.vue              # REPL UI 本体（履歴 / 括弧バランス / エラー捕捉）
├── composables/
│   └── useReplOutput/             # REPL 出力の共有 ref
└── shims/
    ├── installProcessShim.ts      # process.stdout/stderr.write を REPL 出力にリダイレクト
    ├── nodeModule.ts              # node:module (createRequire) の browser スタブ
    ├── nodeV8.ts                  # node:v8 (setFlagsFromString) の browser スタブ
    └── nodeVm.ts                  # node:vm (runInNewContext) の browser スタブ

configs/
├── eslint/                        # プラグイン別に分割した ESLint config
└── cspell/                        # cspell の分割辞書
```

### ブラウザ互換について

`kei-lisp` は現時点で Node.js 前提の API（`process.*`, `node:v8`, `node:vm`,
`node:module`）に依存しているため、本リポで以下の層で吸収している:

- `vite-plugin-node-polyfills` で `process` グローバルを供給
- `vite.config.ts` の `resolve.alias` で `node:v8` / `node:vm` / `node:module`
  を `src/shims/` の最小スタブに差し替え
- `installProcessShim` で `process.stdout.write` / `stderr.write` を REPL 出力
  ref に付け替え（`new LispInterpreter()` より前に実行される）

将来 `kei-lisp` 側でブラウザ互換 IO が提供されればこの層は削れる想定。

## CI / デプロイ

- `.github/workflows/ci.yml`: PR / main push で `typecheck` / `check` / `test`
  / `build` を並列実行
- `.github/workflows/deploy-pages.yml`: main への push で `dist/` を GitHub
  Pages に自動デプロイ
- `.github/dependabot.yml`: 依存の minor / patch を weekly でグループ化 PR
