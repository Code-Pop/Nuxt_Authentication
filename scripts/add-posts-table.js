import Database from 'better-sqlite3'

const db = new Database('db.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  userId TEXT NOT NULL
)`).run()

db.close()
