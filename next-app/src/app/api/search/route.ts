import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    // Search in pages and agreements
    const pageRes = await db.execute({
      sql: "SELECT title, slug as url, 'Page' as type FROM pages WHERE title LIKE ? OR content LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`]
    });

    const agreementRes = await db.execute({
      sql: "SELECT title, '/agreements' as url, 'Agreement' as type FROM agreements WHERE title LIKE ? OR description LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`]
    });

    const results = [...(pageRes.rows as any), ...(agreementRes.rows as any)].map(r => ({
      ...r,
      url: r.type === 'Page' ? `/pages/${r.url}` : r.url
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
