import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await db.execute(
      "SELECT key, value, label FROM site_settings ORDER BY key ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body is an array of { key, value } or a single { key, value }
    const updates: { key: string; value: string }[] = Array.isArray(body) ? body : [body];

    for (const { key, value } of updates) {
      if (!key || value === undefined) continue;
      await db.execute({
        sql: "UPDATE site_settings SET value = ?, updated_at = datetime('now') WHERE key = ?",
        args: [value, key],
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
