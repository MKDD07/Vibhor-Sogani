import fs from "fs";
import { projectsData } from "../src/data/projectsData.js";
const pressData = JSON.parse(fs.readFileSync("./src/data/pressData.json", "utf-8"));

// 1. Clean Schema File (No leading comments or multi-statements)
const schemaSql = `DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS press_articles;
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  location TEXT,
  url TEXT,
  description TEXT,
  paragraphs TEXT,
  images TEXT
);
CREATE TABLE press_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image TEXT,
  pdf TEXT,
  type TEXT
);`;

fs.writeFileSync("./d1_schema.sql", schemaSql);

// 2. Clean Projects Seed File
let projectsSql = "";
for (const p of projectsData) {
  const id = p.id.replace(/'/g, "''");
  const slug = p.slug.replace(/'/g, "''");
  const title = p.title.replace(/'/g, "''");
  const location = (p.location || "").replace(/'/g, "''");
  const url = (p.url || "").replace(/'/g, "''");
  const desc = (p.description || "").replace(/'/g, "''");
  const paragraphsJson = JSON.stringify(p.paragraphs || []).replace(/'/g, "''");
  const imagesJson = JSON.stringify(p.images || []).replace(/'/g, "''");

  projectsSql += `INSERT INTO projects (id, slug, title, location, url, description, paragraphs, images) VALUES ('${id}', '${slug}', '${title}', '${location}', '${url}', '${desc}', '${paragraphsJson}', '${imagesJson}');\n`;
}
fs.writeFileSync("./d1_seed_projects.sql", projectsSql);

// 3. Clean Press Seed File
let pressSql = "";
for (const a of pressData) {
  const id = a.id.replace(/'/g, "''");
  const title = a.title.replace(/'/g, "''");
  const category = (a.category || "").replace(/'/g, "''");
  const image = (a.image || "").replace(/'/g, "''");
  const pdf = a.pdf ? `'${a.pdf.replace(/'/g, "''")}'` : "NULL";
  const type = (a.type || "image").replace(/'/g, "''");

  pressSql += `INSERT INTO press_articles (id, title, category, image, pdf, type) VALUES ('${id}', '${title}', '${category}', '${image}', ${pdf}, '${type}');\n`;
}
fs.writeFileSync("./d1_seed_press.sql", pressSql);

// 4. Combined clean d1_seed.sql without comment headers
fs.writeFileSync("./d1_seed.sql", `${schemaSql}\n${projectsSql}\n${pressSql}`);

console.log("Generated clean d1_schema.sql, d1_seed_projects.sql, d1_seed_press.sql, and d1_seed.sql");
