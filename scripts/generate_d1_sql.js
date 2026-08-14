import fs from "fs";
import { projectsData } from "../src/data/projectsData.js";
const pressData = JSON.parse(fs.readFileSync("./src/data/pressData.json", "utf-8"));

let sql = `-- Cloudflare D1 Database Schema & Data Migration for Vibhor Sogani
-- Drop existing tables
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS press_articles;

-- 1. Create Projects Table (Excluding raw binary images, preserving image path references)
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  location TEXT,
  url TEXT,
  description TEXT,
  paragraphs TEXT, -- Stored as JSON string
  images TEXT      -- Stored as JSON string of image path URLs
);

-- 2. Create Press Articles Table
CREATE TABLE press_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image TEXT,
  pdf TEXT,
  type TEXT
);

-- ----------------------------------------------------
-- INSERT PROJECTS DATA (${projectsData.length} records)
-- ----------------------------------------------------
`;

for (const p of projectsData) {
  const id = p.id.replace(/'/g, "''");
  const slug = p.slug.replace(/'/g, "''");
  const title = p.title.replace(/'/g, "''");
  const location = (p.location || "").replace(/'/g, "''");
  const url = (p.url || "").replace(/'/g, "''");
  const desc = (p.description || "").replace(/'/g, "''");
  const paragraphsJson = JSON.stringify(p.paragraphs || []).replace(/'/g, "''");
  const imagesJson = JSON.stringify(p.images || []).replace(/'/g, "''");

  sql += `INSERT INTO projects (id, slug, title, location, url, description, paragraphs, images) VALUES ('${id}', '${slug}', '${title}', '${location}', '${url}', '${desc}', '${paragraphsJson}', '${imagesJson}');\n`;
}

sql += `\n-- ----------------------------------------------------\n-- INSERT PRESS ARTICLES (${pressData.length} records)\n-- ----------------------------------------------------\n`;

for (const a of pressData) {
  const id = a.id.replace(/'/g, "''");
  const title = a.title.replace(/'/g, "''");
  const category = (a.category || "").replace(/'/g, "''");
  const image = (a.image || "").replace(/'/g, "''");
  const pdf = a.pdf ? `'${a.pdf.replace(/'/g, "''")}'` : "NULL";
  const type = (a.type || "image").replace(/'/g, "''");

  sql += `INSERT INTO press_articles (id, title, category, image, pdf, type) VALUES ('${id}', '${title}', '${category}', '${image}', ${pdf}, '${type}');\n`;
}

fs.writeFileSync("./d1_seed.sql", sql);
console.log("d1_seed.sql successfully generated with", projectsData.length, "projects and", pressData.length, "press articles.");
