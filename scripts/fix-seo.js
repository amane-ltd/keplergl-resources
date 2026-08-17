const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const appDir = path.join(root, '_book');

const defaultDescription = 'Kepler.gl で利用できるベクタータイル、ベースマップ、サンプルマップの素材一覧。地図可視化の参考資料をまとめています。';

function updateFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  let updated = html.replace(
    /<meta name="description" content="">/i,
    `<meta name="description" content="${defaultDescription}">`
  );

  updated = updated.replace(
    /<meta name="description" content="[^"]*">/i,
    `<meta name="description" content="${defaultDescription}">`
  );

  updated = updated.replace(
    /<title>.*?<\/title>/i,
    '<title>Kepler.gl 可視化素材集</title>'
  );

  if (updated !== html) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && full.endsWith('.html')) {
      updateFile(full);
    }
  }
}

if (fs.existsSync(appDir)) {
  walk(appDir);
}
