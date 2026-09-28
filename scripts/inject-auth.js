// honkit build 後、_book 配下の全 HTML の <head> 先頭にアクセスゲートを埋め込む。
// ハッシュの供給元（優先順）:
//   1. 環境変数 ACCESS_PW_HASH
//   2. 環境変数 ACCESS_PASSWORD（平文。ビルド時にハッシュ化する）
//   3. .env.local / .env の ACCESS_PW_HASH または ACCESS_PASSWORD
// REQUIRE_ACCESS_GATE=1 のときはハッシュが無ければビルドを失敗させる（npm run deploy で使用）。
const fs = require('fs');
const path = require('path');
const { hashPassword, isValidHash } = require('./auth/password');

const root = path.join(__dirname, '..');
const bookDir = path.join(root, '_book');
const gateSource = path.join(__dirname, 'auth', 'gate.js');
const MARKER = '<!-- access-gate -->';
const PLACEHOLDER = '__ACCESS_PW_HASH__';

function readEnvFiles() {
  const values = {};
  for (const name of ['.env', '.env.local']) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return values;
}

function resolveHash() {
  const envFile = readEnvFiles();
  const hash = process.env.ACCESS_PW_HASH || envFile.ACCESS_PW_HASH;
  if (hash) {
    if (!isValidHash(hash)) {
      console.error('[auth] ACCESS_PW_HASH の形式が不正です。scripts/hash-password.js で生成し直してください。');
      process.exit(1);
    }
    return hash;
  }
  const password = process.env.ACCESS_PASSWORD || envFile.ACCESS_PASSWORD;
  if (password) {
    return hashPassword(password);
  }
  return null;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  if (!fs.existsSync(bookDir)) {
    console.error('[auth] _book がありません。先に honkit build を実行してください。');
    process.exit(1);
  }

  const hash = resolveHash();
  if (!hash) {
    if (process.env.REQUIRE_ACCESS_GATE === '1') {
      console.error('[auth] ACCESS_PASSWORD / ACCESS_PW_HASH が未設定のため、デプロイ用ビルドを中止しました。');
      console.error('[auth] .env.local に ACCESS_PASSWORD もしくは ACCESS_PW_HASH を設定してください。');
      process.exit(1);
    }
    console.warn('[auth] ACCESS_PASSWORD / ACCESS_PW_HASH が未設定のため、アクセス制限なしでビルドしました。');
    return;
  }

  const script =
    MARKER +
    '\n<script>\n' +
    fs.readFileSync(gateSource, 'utf8').split(PLACEHOLDER).join(hash) +
    '\n</script>';

  let injected = 0;
  for (const file of walk(bookDir)) {
    const html = fs.readFileSync(file, 'utf8');
    if (html.indexOf(MARKER) !== -1) continue;
    if (!/<head[^>]*>/i.test(html)) {
      console.warn(`[auth] <head> が見つからないためスキップ: ${path.relative(root, file)}`);
      continue;
    }
    // <head> 直後に置き、本文より先にゲートを動かす
    const updated = html.replace(/<head[^>]*>/i, (tag) => `${tag}\n${script}`);
    fs.writeFileSync(file, updated, 'utf8');
    injected += 1;
  }

  console.log(`[auth] アクセスゲートを ${injected} ファイルに埋め込みました。`);
}

main();
