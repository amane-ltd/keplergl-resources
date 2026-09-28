/*
 * アクセス制限ゲート（ブラウザ側）。
 * scripts/inject-auth.js がビルド後の各HTMLの <head> 先頭にインライン展開する。
 * __ACCESS_PW_HASH__ はビルド時にハッシュ文字列へ置換される。
 * トランスパイルされないため ES5 相当の記法で書くこと。
 */
(function () {
  var HASH = '__ACCESS_PW_HASH__';
  var STORAGE_KEY = 'keplergl-resources.auth';
  var MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30日
  var LOCKED_CLASS = 'auth-locked';

  var doc = document;
  var root = doc.documentElement;

  root.className += (root.className ? ' ' : '') + LOCKED_CLASS;

  var style = doc.createElement('style');
  style.textContent = [
    'html.' + LOCKED_CLASS + ' { overflow: hidden; }',
    'html.' + LOCKED_CLASS + ' body > *:not(#auth-gate) { display: none !important; }',
    '#auth-gate { position: fixed; inset: 0; z-index: 2147483647; display: flex;',
    '  align-items: center; justify-content: center; padding: 24px;',
    '  background: #f4f6f8; color: #333;',
    '  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Helvetica Neue", Arial, sans-serif; }',
    '#auth-gate .auth-card { width: 100%; max-width: 380px; background: #fff; border-radius: 10px;',
    '  box-shadow: 0 2px 16px rgba(0,0,0,0.12); padding: 32px 28px; box-sizing: border-box; }',
    '#auth-gate h1 { margin: 0 0 6px; font-size: 18px; font-weight: 600; line-height: 1.4; }',
    '#auth-gate .auth-sub { margin: 0 0 20px; font-size: 12px; color: #6b7280; line-height: 1.6; }',
    '#auth-gate label { display: block; font-size: 12px; color: #4b5563; margin-bottom: 6px; }',
    '#auth-gate input { width: 100%; box-sizing: border-box; padding: 10px 12px; font-size: 14px;',
    '  border: 1px solid #d1d5db; border-radius: 6px; background: #fff; color: #111827; }',
    '#auth-gate input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }',
    '#auth-gate button[type="submit"] { width: 100%; margin-top: 16px; padding: 10px 12px; font-size: 14px;',
    '  font-weight: 600; color: #fff; background: #2563eb; border: 0; border-radius: 6px; cursor: pointer; }',
    '#auth-gate button[type="submit"]:hover { background: #1d4ed8; }',
    '#auth-gate button[type="submit"][disabled] { background: #9ca3af; cursor: default; }',
    '#auth-gate .auth-error { margin: 14px 0 0; font-size: 12px; color: #b91c1c; line-height: 1.6; min-height: 1em; }',
    '#auth-gate .auth-foot { margin: 20px 0 0; font-size: 11px; color: #9ca3af; text-align: center; }',
    '#auth-logout { position: fixed; right: 14px; bottom: 14px; z-index: 2147483000; padding: 6px 12px;',
    '  font-size: 11px; color: #4b5563; background: rgba(255,255,255,0.94); border: 1px solid #d1d5db;',
    '  border-radius: 999px; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,0.12); }',
    '#auth-logout:hover { color: #111827; border-color: #9ca3af; }'
  ].join('\n');
  (doc.head || root).appendChild(style);

  function ready(fn) {
    if (doc.readyState === 'loading') {
      doc.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function storage() {
    try {
      return window.localStorage;
    } catch (e) {
      return null;
    }
  }

  function readSession() {
    var store = storage();
    if (!store) return null;
    try {
      var raw = store.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      // パスワードを変更（＝ハッシュを差し替え）したら既存セッションは無効になる
      if (!data || data.hash !== HASH) return null;
      if (typeof data.expiresAt !== 'number' || data.expiresAt <= Date.now()) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeSession() {
    var store = storage();
    if (!store) return;
    try {
      store.setItem(STORAGE_KEY, JSON.stringify({
        hash: HASH,
        expiresAt: Date.now() + MAX_AGE_MS
      }));
    } catch (e) {
      /* プライベートモードなどでは保存しない（セッション限りになる） */
    }
  }

  function clearSession() {
    var store = storage();
    if (!store) return;
    try {
      store.removeItem(STORAGE_KEY);
    } catch (e) {
      /* noop */
    }
  }

  function base64ToBytes(b64) {
    var binary = window.atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function bytesToBase64(bytes) {
    var binary = '';
    for (var i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // ここが将来の差し替え点（HubSpot 連携などに置き換える場合はこの関数だけを変える）
  function verifyPassword(password) {
    var parts = HASH.split('$');
    var iterations = parseInt(parts[2], 10);
    var salt = base64ToBytes(parts[3]);
    var expected = parts[4];
    var subtle = window.crypto && window.crypto.subtle;
    if (!subtle) {
      return Promise.reject(new Error('crypto.subtle unavailable'));
    }
    var encoded = new TextEncoder().encode(password.normalize ? password.normalize('NFKC') : password);
    return subtle
      .importKey('raw', encoded, 'PBKDF2', false, ['deriveBits'])
      .then(function (key) {
        return subtle.deriveBits(
          { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
          key,
          256
        );
      })
      .then(function (bits) {
        return bytesToBase64(new Uint8Array(bits)) === expected;
      });
  }

  function unlock() {
    root.className = root.className
      .split(/\s+/)
      .filter(function (name) {
        return name && name !== LOCKED_CLASS;
      })
      .join(' ');
    var gate = doc.getElementById('auth-gate');
    if (gate && gate.parentNode) gate.parentNode.removeChild(gate);
    ready(addLogoutButton);
  }

  function addLogoutButton() {
    if (doc.getElementById('auth-logout')) return;
    var button = doc.createElement('button');
    button.id = 'auth-logout';
    button.type = 'button';
    button.textContent = 'ログアウト';
    button.setAttribute('aria-label', 'ログアウト / Sign out');
    button.onclick = function () {
      clearSession();
      window.location.reload();
    };
    doc.body.appendChild(button);
  }

  function renderGate() {
    var wrap = doc.createElement('div');
    wrap.id = 'auth-gate';
    wrap.innerHTML =
      '<div class="auth-card">' +
      '<h1>Kepler.gl 可視化素材集</h1>' +
      '<p class="auth-sub">このサイトの閲覧にはパスワードが必要です。<br>' +
      '<span lang="en">This site is password protected.</span></p>' +
      '<form novalidate>' +
      '<label for="auth-password">パスワード / Password</label>' +
      '<input id="auth-password" type="password" autocomplete="current-password" autofocus>' +
      '<button type="submit">閲覧する / Enter</button>' +
      '<p class="auth-error" role="alert"></p>' +
      '</form>' +
      '<p class="auth-foot">株式会社AMANE</p>' +
      '</div>';
    doc.body.appendChild(wrap);

    var form = wrap.querySelector('form');
    var input = wrap.querySelector('#auth-password');
    var submit = wrap.querySelector('button[type="submit"]');
    var error = wrap.querySelector('.auth-error');

    form.onsubmit = function (event) {
      event.preventDefault();
      var value = input.value;
      if (!value) {
        error.textContent = 'パスワードを入力してください。 / Enter a password.';
        return;
      }
      submit.disabled = true;
      error.textContent = '';
      verifyPassword(value).then(
        function (ok) {
          if (ok) {
            writeSession();
            unlock();
            return;
          }
          submit.disabled = false;
          input.value = '';
          input.focus();
          error.textContent = 'パスワードが違います。 / Incorrect password.';
        },
        function () {
          submit.disabled = false;
          error.textContent =
            'この環境では認証できません（HTTPS でアクセスしてください）。 / Verification unavailable over an insecure connection.';
        }
      );
    };

    input.focus();
  }

  if (readSession()) {
    unlock();
  } else {
    ready(renderGate);
  }
})();
