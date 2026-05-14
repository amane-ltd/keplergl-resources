# kepler.glによる可視化に使える素材集

## ディレクトリ構成

```
.
├── book.json              # HonKit設定
├── package.json           # npm scripts (build/serve/deploy)
└── docs/                  # ドキュメントソース（GitHub Pages公開対象）
    ├── README.md          # トップページ
    ├── SUMMARY.md         # 目次
    ├── vector-tiles.md    # ベクタータイル一覧
    ├── basemaps.md        # ベースマップ一覧
    └── images/            # ドキュメント用画像
```

## 開発

### セットアップ

```bash
npm install
```

### ローカルプレビュー

```bash
npm run serve
```

`http://localhost:4000` でドキュメントのプレビューを確認できます。

### ビルド

```bash
npm run build
```

### GitHub Pagesへのデプロイ

```bash
npm run deploy
```

初回デプロイ後、GitHubリポジトリの **Settings > Pages** で Source を `gh-pages` ブランチに設定してください。
