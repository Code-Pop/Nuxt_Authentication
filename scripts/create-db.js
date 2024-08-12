import Database from 'better-sqlite3'

const db = new Database('db.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY NOT NULL,
  username TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  sessionToken TEXT,
  csrfToken TEXT
)`).run()

db.close()
