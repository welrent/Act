import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { ensureSchema } from "@/lib/ensure-schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    await ensureSchema();

    const pageRes = await db.execute({
      sql: "SELECT title, slug as url, 'Page' as type FROM pages WHERE title LIKE ? OR content LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`],
    });

    const agreementRes = await db.execute({
      sql: "SELECT title, '/agreements' as url, 'Agreement' as type FROM agreements WHERE title LIKE ? OR description LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`],
    });

    const contractRes = await db.execute({
      sql: "SELECT contract_ref as title, contract_ref as url, 'Contract' as type FROM contracts WHERE contract_ref LIKE ? OR vehicle_name LIKE ? OR booking_ref LIKE ? LIMIT 5",
      args: [`%${query}%`, `%${query}%`, `%${query}%`],
    });

    const results = [
      ...(pageRes.rows as any[]),
      ...(agreementRes.rows as any[]),
      ...(contractRes.rows as any[]),
    ].map((r) => ({
      ...r,
      url:
        r.type === "Page"
          ? `/pages/${r.url}`
          : r.type === "Contract"
            ? `/contracts/${r.url}`
            : r.url,
    }));

    // Return both shapes for Header (array) and WelrentAPI SDK ({ results })
    return NextResponse.json(results, {
      headers: {
        "X-Welrent-Results-Count": String(results.length),
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
