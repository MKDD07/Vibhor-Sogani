import fs from "fs";
import { projectsData } from "../src/data/projectsData.js";

const BASE_URL = "https://vibhorsogani.com";
const currentDate = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/installations", priority: "0.9", changefreq: "weekly" },
  { path: "/press", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Static Pages
for (const route of staticRoutes) {
  sitemap += `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>\n`;
}

// Project Detail Pages
for (const project of projectsData) {
  sitemap += `  <url>
    <loc>${BASE_URL}/installations/${project.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
}

sitemap += `</urlset>\n`;

fs.writeFileSync("./public/sitemap.xml", sitemap);
console.log("Generated sitemap.xml with", staticRoutes.length + projectsData.length, "URLs.");
