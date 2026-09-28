#!/usr/bin/env node
// 使い方: node scripts/hash-password.js "パスワード"
//        echo "パスワード" | node scripts/hash-password.js
const { hashPassword, ITERATIONS } = require('./auth/password');

function output(password) {
  const value = password.replace(/\r?\n$/, '');
  if (!value) {
    console.error('パスワードが空です。');
    process.exit(1);
  }
  if (value.length < 12) {
    console.error(
      '警告: ハッシュは公開ビルドに含まれます。辞書攻撃に耐える 12 文字以上のランダムなパスワードを推奨します。'
    );
  }
  console.log(hashPassword(value));
  console.error(`(PBKDF2-SHA256 / ${ITERATIONS} 回)`);
  console.error('この値を .env.local の ACCESS_PW_HASH に設定してください。');
}

const arg = process.argv[2];
if (arg) {
  output(arg);
} else if (process.stdin.isTTY) {
  console.error('使い方: node scripts/hash-password.js "パスワード"');
  process.exit(1);
} else {
  let buffer = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    buffer += chunk;
  });
  process.stdin.on('end', () => output(buffer));
}
