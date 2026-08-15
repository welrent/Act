import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ensureSchema } from "@/lib/ensure-schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getSettings(): Promise<Record<string, string>> {
  try {
    const { rows } = await db.execute("SELECT key, value FROM site_settings");
    const map: Record<string, string> = {};
    for (const row of rows as any[]) {
      map[row.key] = row.value;
    }
    return map;
  } catch {
    return {};
  }
}

function replacePlaceholders(content: string, settings: Record<string, string>): string {
  let result = content;
  for (const [key, value] of Object.entries(settings)) {
    result = result.split(`[${key}]`).join(value);
  }
  return result;
}

export default async function DynamicPage({ params }: PageProps) {
  await ensureSchema();
  const { slug } = await params;

  const [pageResult, settings] = await Promise.all([
    db.execute({ sql: "SELECT * FROM pages WHERE slug = ? LIMIT 1", args: [slug] }),
    getSettings(),
  ]);

  const page = pageResult.rows[0] as any;

  if (!page) {
    notFound();
  }

  const processedContent = replacePlaceholders(page.content || '', settings);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 0 3rem 0' }}>
      <div
        className="prose prose-slate max-w-none legal-content"
        style={{
          fontSize: '15px',
          lineHeight: 1.8,
          color: '#2F214B',
        }}
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
}
