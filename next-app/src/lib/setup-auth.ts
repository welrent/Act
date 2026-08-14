import { db } from './db';

async function setupAuthTables() {
  console.log('🌱 Creating auth tables in Turso...');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      firebase_uid TEXT UNIQUE,
      role TEXT DEFAULT 'admin',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      firebase_uid TEXT UNIQUE,
      permissions TEXT DEFAULT 'edit_content',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS login_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      ip_address TEXT,
      status TEXT NOT NULL,
      timestamp TEXT DEFAULT (datetime('now'))
    )
  `);

  console.log('✅ Auth tables created.');
}

setupAuthTables().catch(console.error);
