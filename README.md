# kepler.glによる可視化に使える素材集

## Github Pages
https://amane-ltd.github.io/keplergl-resources/

## ディレクトリ構成

```
.
├── book.json              # HonKit設定
├── package.json           # npm scripts (build/serve/deploy)
├── .env.example           # アクセス制限用パスワードの設定例
├── scripts/               # ビルド後処理
│   ├── fix-seo.js         # メタ情報の補正
│   ├── hash-password.js   # パスワードのハッシュ生成CLI
│   ├── inject-auth.js     # アクセス制限ゲートの埋め込み
│   └── auth/              # ハッシュ定義とゲート本体
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

## アクセス制限（パスワード）

公開サイト全体にパスワード入力画面（ゲート）をかけられます。ビルド時に各HTMLの `<head>` へゲートを埋め込む方式です。

### パスワードの設定

```bash
# 1. ハッシュを生成する
npm run hash-password -- "設定したいパスワード"

# 2. 出力された文字列を .env.local に書く
cp .env.example .env.local
# ACCESS_PW_HASH=pbkdf2$sha256$310000$...
```

`.env.local` は `.gitignore` 済みです。平文パスワードをリポジトリに置く必要はありません（`ACCESS_PASSWORD` に平文を書いてビルド時にハッシュ化することもできます）。

### 挙動

- 初回アクセスでゲートを表示し、正しいパスワードを入力するとサイトが表示されます。
- ログイン状態は `localStorage` に **30日間** 保持されます。右下の「ログアウト」ボタンで破棄できます。
- パスワード（＝ハッシュ）を変更すると、既存のログイン状態は自動的に無効になります。
- `npm run build` はパスワード未設定でも警告を出して続行します（ゲートなし）。`npm run deploy` は `REQUIRE_ACCESS_GATE=1` が付くため、**未設定だとデプロイが失敗します**（ゲートなしで公開されるのを防ぐため）。
- `npm run serve`（ローカルプレビュー）にはゲートはかかりません。

### 注意事項

- **これは技術的なアクセス制御ではありません。** 静的サイトのため、HTMLのソースを直接取得すれば本文は読めます。ハッシュも公開ビルドに含まれるため、辞書攻撃に耐える長くランダムなパスワードを設定してください。本当に秘匿が必要な場合は Cloudflare Access などホスティング層の保護が必要です。
- 検索エンジンからの除外設定（`robots.txt` / `noindex`）は変更していません。ゲートをかけたまま検索結果に残したくない場合は別途調整してください。
- 将来 HubSpot 連携などに差し替える際の変更点は `scripts/auth/gate.js` の `verifyPassword()` ひとつです。UI とセッション管理はそのまま流用できます。
