# kei-lisp-web

[kei-lisp](https://github.com/ike-keichan/kei-lisp) を Web ブラウザ上で動かす REPL。

公開ページ: https://ike-keichan.github.io/kei-lisp-web/

## 開発

```bash
pnpm install
pnpm dev        # http://localhost:5173/
pnpm build      # ビルド成果物は dist/
pnpm preview    # ビルド結果をローカル確認
```

## 構成

- Vue 3 + Vite + TypeScript
- [kei-lisp](https://www.npmjs.com/package/kei-lisp) を npm 経由で利用
- ブラウザで Node.js 互換 API を提供するため `vite-plugin-node-polyfills` を併用、`process.stdout.write` を REPL 出力にルーティング

## デプロイ

`main` への push で GitHub Actions が `dist/` を GitHub Pages へ自動デプロイする。
