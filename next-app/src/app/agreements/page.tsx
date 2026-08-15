import { db } from "@/lib/db";
import { ensureSchema } from "@/lib/ensure-schema";

export default async function AgreementsPage() {
  await ensureSchema();
  const { rows: agreements } = await db.execute("SELECT * FROM agreements ORDER BY title ASC");

  return (
    <div className="container mx-auto mt-10 pb-10 px-4">
      <div className="flex flex-wrap mb-10">
        <div className="w-full lg:w-2/3">
          <h1 className="text-4xl font-bold mb-3 text-[#2F214B]">All Agreements</h1>
          <p className="text-lg text-[#8C8C91]">
            A comprehensive directory of our standard forms and contracts.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 g-4">
        {agreements.length > 0 ? (
          agreements.map((agreement: any) => (
            <div key={agreement.id} className="w-full md:w-1/2 px-2 mb-4">
              <div className="design-message interactive h-full flex flex-col p-6 rounded-xl border border-[#F4F5F6] bg-[#F9FAFB] hover:bg-[#F4F5F6] transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold mb-0 text-[#2F214B]">
                    {agreement.title}
                  </h4>
                </div>
                <p className="text-[#8C8C91] mb-6">
                  {agreement.description}
                </p>
                <div className="mt-auto">
                  <a
                    href="/agreements"
                    className="inline-block border border-[#2D3ED2] text-[#2D3ED2] hover:bg-[#2D3ED2] hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
                  >
                    Read Agreement
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center mt-10">
            <h5 className="text-[#8C8C91]">No agreements found. Check back later or create some from the Admin Panel.</h5>
          </div>
        )}
      </div>
    </div>
  );
}
