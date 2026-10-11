import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/assets/press');
const manifestPath = path.join(root, 'manifest.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const dataPath = 'src/data/pressData.json';
const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
const slug = (text) => text.normalize('NFKD').replace(/[’']/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const renames = new Map();
const names = new Set();
for (const article of manifest.articles) {
  const [month, year] = article.date.split(' ');
  const date = `${year}-${String(months.indexOf(month) + 1).padStart(2, '0')}`;
  const base = `${date}-${slug(article.title)}`;
  let unique = base;
  let number = 2;
  while (names.has(unique)) unique = `${base}-${number++}`;
  names.add(unique);
  for (const [key, role] of [['image', 'cover'], ['link', 'article']]) {
    const old = article[key];
    if (!old || renames.has(old)) continue;
    const extension = path.extname(old);
    const folder = extension === '.pdf' ? 'pdfs' : 'images';
    renames.set(old, `/assets/press/${folder}/${unique}-${role}${extension}`);
  }
}
const disk = (url) => {
  const resolved = path.resolve('public', `.${url}`);
  if (!resolved.startsWith(root + path.sep)) throw new Error(`Path outside press assets: ${url}`);
  return resolved;
};
// Validate the complete plan before moving any files; never overwrite an asset.
for (const [old, next] of renames) {
  await fs.access(disk(old));
  if (old !== next) {
    try { await fs.access(disk(next)); throw new Error(`Destination already exists: ${next}`); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
for (const [old, next] of renames) if (old !== next) await fs.rename(disk(old), disk(next));
for (const article of manifest.articles) for (const key of ['image', 'link']) article[key] = renames.get(article[key]) || article[key];
for (const file of manifest.files) file.local = renames.get(file.local) || file.local;
for (const article of data) {
  for (const key of ['image', 'link', 'pdf', 'scan']) article[key] = renames.get(article[key]) || article[key];
  article.id = path.basename(article.image, path.extname(article.image)).replace(/-cover$/, '');
  for (const key of ['image', 'link']) await fs.access(disk(article[key]));
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
await fs.writeFile(dataPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Renamed ${renames.size} assets and updated ${data.length} publications. All paths verified.`);
