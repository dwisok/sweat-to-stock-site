// Copies the static site into dist/ (what hosts like Vercel or Netlify publish). No bundling: the site is plain HTML.
const fs = require('fs'), path = require('path');
const out = path.join(__dirname, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
const skip = new Set(['node_modules', 'dist', 'build.js', 'package.json', 'package-lock.json', '.gitignore', 'vercel.json']);
for (const n of fs.readdirSync(__dirname)) {
  if (skip.has(n) || (n.startsWith('_') && n.endsWith('.html'))) continue;
  fs.cpSync(path.join(__dirname, n), path.join(out, n), { recursive: true });
}
console.log('dist/ ready');
