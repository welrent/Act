import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env.local");
  process.exit(1);
}

const db = createClient({ url, authToken });

async function migrate() {
  console.log("🚀 Starting migration to Turso...");

  const schema = [
    `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_name TEXT NOT NULL UNIQUE,
      key_value TEXT DEFAULT ''
    )`,
    `CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT,
      image_path TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS agreements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `INSERT OR IGNORE INTO settings (key_name, key_value) VALUES 
      ('site_name', 'Welrent Act'),
      ('contact_email', 'hello@welrent.com')`,
    `INSERT OR IGNORE INTO pages (title, slug, content) VALUES 
      ('Terms of Service', 'terms', '<h1>Terms of Service</h1><p>Welcome to Welrent Act agreements platform.</p>'),
      ('Privacy Policy', 'privacy', '<h1>Privacy Statement</h1><p>Your data is safe with us.</p>'),
      ('Cookie Rules', 'cookie', '<h1>Cookie Statement</h1><p>Information about how we use cookies.</p>'),
      ('Accessibility Statement', 'accessibility', '<h1>Accessibility</h1><p>We are committed to accessibility.</p>'),
      ('Car Rental Agreement', 'car-rental-agreement', '<h1>Car Rental Agreement</h1><p>Terms and conditions for car rentals...</p>'),
      ('Boat Rental Agreement', 'boat-rental-agreement', '<h1>Boat Rental Agreement</h1><p>Terms and conditions for boat rentals...</p>'),
      ('Equipment Rental Agreement', 'equipment-rental-agreement', '<h1>Equipment Rental Agreement</h1><p>Terms and conditions for equipment rentals...</p>')`,
    `INSERT OR IGNORE INTO agreements (title, description, content) VALUES 
      ('Standard Rental Agreement', 'A basic agreement for standard rentals.', '<p>Standard rental template details go here.</p>')`
  ];

  try {
    for (const sql of schema) {
      console.log(`Executing: ${sql.substring(0, 50)}...`);
      await db.execute(sql);
    }
    console.log("✅ Migration successful! Your Turso database is ready.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

migrate();
