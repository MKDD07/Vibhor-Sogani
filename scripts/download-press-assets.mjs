import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const input = process.argv[2];
if (!input) throw new Error('Pass the path to the press HTML file.');
const html = await fs.readFile(input, 'utf8');
const records = html.trimStart().startsWith('[') ? JSON.parse(html) : null;
const decode = (text) => text.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const urls = records ? [...new Set(records.flatMap((item) => [item.image, item.link]).filter(Boolean))] : [...new Set([...html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)]
  .map((match) => decode(match[1]))
  .filter((url) => /\.(?:pdf|jpe?g|png|webp|gif|svg|mp4|webm)(?:[?#]|$)/i.test(url)))];
const root = path.resolve('public/assets/press');
const results = new Map();
let cursor = 0;

async function download(source) {
  const url = new URL(source);
  if (!['www.vibhorsogani.com', 'vibhorsogani.com'].includes(url.hostname)) throw new Error(`Unexpected media host: ${url.hostname}`);
  const extension = path.extname(url.pathname).toLowerCase();
  const folder = extension === '.pdf' ? 'pdfs' : 'images';
  const originalName = decodeURIComponent(path.basename(url.pathname));
  const name = originalName.replace(/[^a-zA-Z0-9._-]+/g, '-');
  const destination = path.join(root, folder, name);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  let error;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!bytes.length || /text\/html/i.test(response.headers.get('content-type') || '')) throw new Error('Not a media response');
      if (extension === '.pdf' && bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error('Invalid PDF signature');
      if (['.jpg', '.jpeg'].includes(extension) && bytes.readUInt16BE(0) !== 0xffd8) throw new Error('Invalid JPEG signature');
      if (extension === '.png' && bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Invalid PNG signature');
      await fs.writeFile(destination, bytes);
      return { source, local: `/assets/press/${folder}/${name}`, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
    } catch (failure) { error = failure; }
  }
  return { source, error: error.message };
}

await Promise.all(Array.from({ length: 5 }, async () => {
  while (cursor < urls.length) {
    const source = urls[cursor++];
    const result = await download(source);
    results.set(source, result);
    console.log(`${result.error ? 'FAILED' : 'Saved'} ${decodeURIComponent(new URL(source).pathname.split('/').pop())}${result.error ? ': ' + result.error : ''}`);
  }
}));

const articles = records ? records.map((item) => ({ ...item, imageSource: item.image, linkSource: item.link, image: results.get(item.image)?.local || null, link: results.get(item.link)?.local || null })) : html.split(/<div\s+class=["']press-item["']\s*>/i).slice(1).map((block) => {
  const text = (className) => decode(block.match(new RegExp(`<p\\s+class=["']${className}["'][^>]*>([\\s\\S]*?)<\\/p>`, 'i'))?.[1]?.replace(/<[^>]+>/g, '').trim() || '');
  const media = [...block.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map((match) => decode(match[1]));
  const imageSource = media.find((url) => /\.(jpe?g|png|webp)(?:[?#]|$)/i.test(url));
  const pdfSource = media.find((url) => /\.pdf(?:[?#]|$)/i.test(url));
  return { title: text('press-text'), date: text('press-year'), image: results.get(imageSource)?.local || null, pdf: results.get(pdfSource)?.local || null, imageSource, pdfSource };
});
const files = urls.map((url) => results.get(url));
await fs.writeFile(path.join(root, 'manifest.json'), JSON.stringify({ articles, files }, null, 2));
const failures = files.filter((file) => file.error);
console.log(JSON.stringify({ downloaded: files.length - failures.length, failed: failures.length, articles: articles.length, totalBytes: files.reduce((sum, file) => sum + (file.bytes || 0), 0) }));
if (failures.length) process.exitCode = 1;
