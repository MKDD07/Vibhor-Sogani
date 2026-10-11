import fs from 'node:fs/promises';
import path from 'node:path';
import { projectsData } from '../src/data/projectsData.js';
import { PAGE_META } from '../src/data/pageMeta.js';

const base = process.env.BASE_PATH || '/';
const origin = (process.env.VITE_SITE_URL || 'https://vibhorsogani.com').replace(/\/$/, '');
const escape = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const asset = (url) => base + url.replace(/^\//, '');
const press = JSON.parse(await fs.readFile('src/data/pressData.json', 'utf8'));
const template = await fs.readFile('dist/index.html', 'utf8');
const pages = Object.entries(PAGE_META).map(([route, meta]) => ({ route, ...meta }));
for (const project of projectsData) pages.push({ route: `/installations/${project.slug}`, title: `${project.title} | Vibhor Sogani`, description: project.description, project });
const nav = Object.entries(PAGE_META).slice(0, 5).map(([route, meta]) => `<a href="${base}${route.slice(1)}">${escape(route === '/' ? 'Home' : route.slice(1))}</a>`).join(' | ');
for (const page of pages) {
  const canonical = origin + page.route;
  let content = `<h1 class="page-heading">${escape(page.project?.title || page.title.split(' — ')[0])}</h1><p class="site-prose">${escape(page.description)}</p>`;
  if (page.project) content += (page.project.paragraphs || []).map((text) => `<p class="site-prose">${escape(text)}</p>`).join('') + (page.project.images || []).map((url) => `<img src="${asset(url)}" alt="${escape(page.project.title)}" loading="lazy" />`).join('');
  if (page.route === '/' || page.route === '/installations') content += `<ul>${projectsData.map((p) => `<li><a href="${base}installations/${p.slug}">${escape(p.title)}</a> | ${escape(p.location)}</li>`).join('')}</ul>`;
  if (page.route === '/press') content += `<ul>${press.map((p) => `<li><a href="${asset(p.link)}">${escape(p.title)}</a> | ${escape(p.date)}</li>`).join('')}</ul>`;
  if (page.route === '/contact') content += '<a href="mailto:info@vibhorsogani.com">info@vibhorsogani.com</a>';
  if (page.route === '/privacy-policy' || page.route === '/terms') {
    const component = page.route === '/terms' ? 'TermsPage' : 'PrivacyPolicyPage';
    const source = await fs.readFile(`src/components/${component}.jsx`, 'utf8');
    content += [...source.matchAll(/<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(([, tag, text]) => `<${tag}>${text.replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '')}</${tag}>`).join('');
  }
  const head = `<meta name="description" content="${escape(page.description)}" /><meta name="robots" content="index, follow, max-image-preview:large" /><link rel="canonical" href="${canonical}" /><meta property="og:title" content="${escape(page.title)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:url" content="${canonical}" />`;
  const html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>${head}`).replace('<div id="root"></div>', `<div id="root"><header class="site-container" style="padding-block:24px">${nav}</header><main class="site-container" style="padding-block:48px">${content}</main></div>`);
  const destination = page.route === '/' ? 'dist/index.html' : path.join('dist', page.route, 'index.html');
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${escape(origin + p.route)}</loc></url>`).join('')}</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
const llms = `# Studio Vibhor Sogani\n\n> Artist portfolio featuring public art, sculpture, light installations, and a press archive.\n\n## Pages\n${pages.map((p) => `- [${p.project?.title || p.title}](${origin}${p.route}): ${p.description}`).join('\n')}\n`;
for (const [name, text] of [['sitemap.xml', sitemap], ['robots.txt', robots], ['llms.txt', llms]]) {
  await fs.writeFile(path.join('dist', name), text);
  if (base === '/' && !process.env.VITE_SITE_URL) await fs.writeFile(path.join('public', name), text);
}
await fs.writeFile('dist/404.html', template.replace('<div id="root"></div>', `<div id="root"><main class="site-container"><h1>Page not found</h1><a href="${base}">Return to the portfolio</a></main></div>`));
console.log(`Generated ${pages.length} static pages, canonical metadata, sitemap, robots.txt, and llms.txt.`);
