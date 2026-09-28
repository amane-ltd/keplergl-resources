// パスワードのハッシュ生成・検証に関する定義はこのファイルに集約する。
// 将来 HubSpot 連携などに差し替える場合も、ここと gate.js の verify() だけを触ればよい。
const crypto = require('crypto');

const ALGORITHM = 'pbkdf2';
const DIGEST = 'sha256';
const ITERATIONS = 310000;
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;

// 形式: pbkdf2$sha256$<iterations>$<salt(base64)>$<hash(base64)>
function hashPassword(password, salt) {
  const saltBuf = salt || crypto.randomBytes(SALT_LENGTH);
  const derived = crypto.pbkdf2Sync(
    password.normalize('NFKC'),
    saltBuf,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST
  );
  return [
    ALGORITHM,
    DIGEST,
    String(ITERATIONS),
    saltBuf.toString('base64'),
    derived.toString('base64')
  ].join('$');
}

function isValidHash(value) {
  if (typeof value !== 'string') return false;
  const parts = value.split('$');
  if (parts.length !== 5) return false;
  const [algorithm, digest, iterations, salt, hash] = parts;
  return (
    algorithm === ALGORITHM &&
    digest === DIGEST &&
    /^[0-9]+$/.test(iterations) &&
    Number(iterations) > 0 &&
    salt.length > 0 &&
    hash.length > 0
  );
}

module.exports = { hashPassword, isValidHash, ITERATIONS };
