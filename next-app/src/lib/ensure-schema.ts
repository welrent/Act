import { db } from "./db";

let ready: Promise<void> | null = null;

/**
 * Idempotent schema bootstrap for local/dev and production Turso.
 * Safe to call on every request — runs once per process.
 */
export function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = bootstrap().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}

async function bootstrap() {
  const statements = [
    `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_name TEXT NOT NULL UNIQUE,
      key_value TEXT DEFAULT ''
    )`,
    `CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT DEFAULT ''
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
    `CREATE TABLE IF NOT EXISTS contracts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contract_ref TEXT NOT NULL UNIQUE,
      booking_ref TEXT,
      user_uid TEXT NOT NULL,
      user_email TEXT,
      user_name TEXT,
      vehicle_type TEXT NOT NULL DEFAULT 'car',
      vehicle_name TEXT NOT NULL,
      vehicle_image TEXT,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      days INTEGER NOT NULL DEFAULT 1,
      price REAL NOT NULL DEFAULT 0,
      location TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      agreement_slug TEXT,
      contract_html TEXT,
      source TEXT DEFAULT 'wr-frontend',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      firebase_uid TEXT,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      firebase_uid TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS login_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      ip_address TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
  ];

  for (const sql of statements) {
    await db.execute(sql);
  }

  await db.execute({
    sql: `INSERT OR IGNORE INTO settings (key_name, key_value) VALUES (?, ?), (?, ?)`,
    args: ["site_name", "Welrent Act", "contact_email", "hello@welrent.com"],
  });

  const companyDefaults: Array<[string, string]> = [
    ["COMPANY_ADDRESS", "Welrent Europa B.V., The Netherlands"],
    ["CHAMBER_OF_COMMERCE_NUMBER", "KVK pending"],
    ["VAT_NUMBER", "NL VAT pending"],
    ["EMAIL", "hello@welrent.com"],
    ["PHONE_NUMBER", "+31 (0)20 000 0000"],
  ];
  for (const [key, value] of companyDefaults) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`,
      args: [key, value],
    });
  }

  const defaults: Array<[string, string, string]> = [
    [
      "Terms of Service",
      "terms",
      "<h1>Terms of Service</h1><p>Welcome to Welrent Act agreements platform.</p>",
    ],
    [
      "Privacy Policy",
      "privacy",
      "<h1>Privacy Statement</h1><p>Your data is safe with us.</p>",
    ],
    [
      "Cookie Rules",
      "cookie",
      "<h1>Cookie Statement</h1><p>Information about how we use cookies.</p>",
    ],
    [
      "Accessibility Statement",
      "accessibility",
      "<h1>Accessibility</h1><p>We are committed to accessibility.</p>",
    ],
    [
      "Car Rental Agreement",
      "car-rental-agreement",
      "<h1>Car Rental Agreement</h1><p>Terms and conditions for car rentals with Welrent AutoVerhuur.</p>",
    ],
    [
      "Motorcycle Rental Agreement",
      "motorcycle-rental-agreement",
      "<h1>Motorcycle Rental Agreement</h1><p>Terms and conditions for motorcycle and scooter rentals with Welrent AutoVerhuur.</p>",
    ],
    [
      "Boat Rental Agreement",
      "boat-rental-agreement",
      "<h1>Boat Rental Agreement</h1><p>Terms and conditions for boat rentals.</p>",
    ],
    [
      "Equipment Rental Agreement",
      "equipment-rental-agreement",
      "<h1>Equipment Rental Agreement</h1><p>Terms and conditions for equipment rentals.</p>",
    ],
  ];

  for (const [title, slug, content] of defaults) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO pages (title, slug, content) VALUES (?, ?, ?)`,
      args: [title, slug, content],
    });
  }

  await db.execute({
    sql: `INSERT OR IGNORE INTO agreements (title, description, content) VALUES (?, ?, ?)`,
    args: [
      "Standard Rental Agreement",
      "A basic agreement for standard rentals.",
      "<p>Standard rental template details go here.</p>",
    ],
  });
}
