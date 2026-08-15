import { createClient, type Client } from "@libsql/client";
import path from "path";
import fs from "fs";

const url = process.env.TURSO_DATABASE_URL || process.env.NEXT_PUBLIC_TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN;

function resolveLocalUrl(): string {
  const dataDir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return `file:${path.join(dataDir, "welrent-act.db")}`;
}

const clientUrl = url && url.trim().length > 0 ? url : resolveLocalUrl();

if (!url) {
  console.warn(
    "[Welrent Act] TURSO_DATABASE_URL is not set — using local SQLite at .data/welrent-act.db"
  );
}

export const db: Client = createClient({
  url: clientUrl,
  authToken: authToken || undefined,
});
