import fs from 'node:fs/promises';
import path from 'node:path';

const manifest = JSON.parse(await fs.readFile('public/assets/press/manifest.json', 'utf8'));
if (manifest.files.some((file) => file.error)) throw new Error('Finish all downloads before replacing press data.');
const old = JSON.parse(await fs.readFile('src/data/pressData.json', 'utf8'));
const normalize = (title) => title.toLowerCase().replace(/[^a-z0-9]/g, '');
const categories = new Map(old.map((item) => [normalize(item.title), item.category]));
const articles = manifest.articles.map((item) => {
  if (!item.image || !item.link) throw new Error(`Missing media: ${item.title}`);
  const pdf = item.link.endsWith('.pdf');
  return {
    id: path.basename(item.image, path.extname(item.image)),
    title: item.title,
    date: item.date,
    category: categories.get(normalize(item.title)) || 'Magazines & Features',
    image: item.image,
    link: item.link,
    pdf: pdf ? item.link : null,
    scan: pdf ? null : item.link,
    type: pdf ? 'pdf' : 'image',
  };
});
for (const item of articles) {
  for (const url of [item.image, item.link]) await fs.access(path.join('public', url));
}
await fs.writeFile('src/data/pressData.json', JSON.stringify(articles, null, 2) + '\n');
console.log(`Replaced press data with ${articles.length} publications; all local media exists.`);
