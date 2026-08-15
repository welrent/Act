import { NextResponse } from "next/server";
import { getContractByRef, publicContractUrl } from "@/lib/contracts";
import { ensureSchema } from "@/lib/ensure-schema";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ ref: string }> }
) {
  try {
    await ensureSchema();
    const { ref } = await context.params;
    const contract = await getContractByRef(ref);
    if (!contract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404, headers: corsHeaders() }
      );
    }
    const origin = new URL(request.url).origin;
    return NextResponse.json(
      {
        contract: {
          ...contract,
          contract_url: publicContractUrl(String(contract.contract_ref), origin),
        },
      },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error("Get contract error:", error);
    return NextResponse.json(
      { error: "Failed to load contract" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
