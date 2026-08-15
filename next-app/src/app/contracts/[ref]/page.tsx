import { getContractByRef } from "@/lib/contracts";
import { ensureSchema } from "@/lib/ensure-schema";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ ref: string }>;
}

export default async function ContractPage({ params }: PageProps) {
  await ensureSchema();
  const { ref } = await params;
  const contract = await getContractByRef(ref);

  if (!contract) {
    notFound();
  }

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 0 3rem 0" }}>
      <div
        className="design-message"
        style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}
      >
        <div>
          <strong style={{ color: "#2F214B", fontSize: "18px", display: "block" }}>
            {String(contract.contract_ref)}
          </strong>
          <span style={{ color: "#8C8C91", fontSize: "14px" }}>
            {String(contract.vehicle_name)} · {String(contract.vehicle_type)} · {String(contract.status)}
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {contract.agreement_slug ? (
            <Link href={`/pages/${String(contract.agreement_slug)}`} className="rental-card-pill">
              Full agreement terms
            </Link>
          ) : null}
          <a
            href="https://github.com/welrent/wr-frontend"
            target="_blank"
            rel="noreferrer"
            className="rental-card-pill"
          >
            Open main site
          </a>
        </div>
      </div>

      <div
        className="prose prose-slate max-w-none legal-content"
        style={{ fontSize: "15px", lineHeight: 1.8, color: "#2F214B" }}
        dangerouslySetInnerHTML={{ __html: String(contract.contract_html || "") }}
      />
    </div>
  );
}
