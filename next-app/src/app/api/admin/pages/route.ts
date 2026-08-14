import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await db.execute("SELECT id, title, slug, content FROM pages ORDER BY title ASC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch pages:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, content } = await request.json();
    
    if (!id || content === undefined) {
      return NextResponse.json({ error: "Missing id or content" }, { status: 400 });
    }

    await db.execute({
      sql: "UPDATE pages SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      args: [content, id]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update page:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}
