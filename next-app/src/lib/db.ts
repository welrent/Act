import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL || process.env.NEXT_PUBLIC_TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN;

if (!url) {
  console.warn("TURSO_DATABASE_URL is not defined. Database connections may fail.");
}

export const db = createClient({
  url: url || "",
  authToken: authToken || "",
});
