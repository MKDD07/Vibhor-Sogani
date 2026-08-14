DROP TABLE IF EXISTS projects;
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
);