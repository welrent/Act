import { NextResponse } from "next/server";
import { createContract, listContracts, publicContractUrl } from "@/lib/contracts";
import { ensureSchema } from "@/lib/ensure-schema";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Welrent-Source",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

/**
 * GET /api/contracts?uid=<firebase-uid>
 * Lists rental contracts for a user (created from wr-frontend bookings).
 */
export async function GET(request: Request) {
  try {
    await ensureSchema();
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid") || undefined;
    const contracts = await listContracts(uid || undefined);
    const origin = new URL(request.url).origin;

    return NextResponse.json(
      {
        contracts: contracts.map((c) => ({
          ...c,
          contract_url: publicContractUrl(String(c.contract_ref), origin),
        })),
      },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error("List contracts error:", error);
    return NextResponse.json(
      { error: "Failed to list contracts" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

/**
 * POST /api/contracts
 * Called by wr-frontend when a booking is created.
 * Body mirrors /api/rentals plus optional vehicle_type / user_email / user_name.
 */
export async function POST(request: Request) {
  try {
    await ensureSchema();
    const body = await request.json();

    const vehicle_name = body.vehicle_name || body.car_name;
    const vehicle_image = body.vehicle_image || body.car_image;
    const vehicle_type = body.vehicle_type || body.type || "car";

    if (!body.uid && !body.user_uid) {
      return NextResponse.json(
        { error: "uid (or user_uid) is required" },
        { status: 400, headers: corsHeaders() }
      );
    }
    if (!vehicle_name || !body.start_date || !body.end_date) {
      return NextResponse.json(
        { error: "vehicle_name (or car_name), start_date, and end_date are required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const contract = await createContract({
      user_uid: body.user_uid || body.uid,
      user_email: body.user_email || body.email,
      user_name: body.user_name || body.displayName || body.name,
      booking_ref: body.booking_ref,
      vehicle_type,
      vehicle_name,
      vehicle_image,
      start_date: body.start_date,
      end_date: body.end_date,
      days: body.days ? Number(body.days) : undefined,
      price: body.price !== undefined ? Number(body.price) : undefined,
      location: body.location,
      status: body.status || "active",
      source: body.source || request.headers.get("x-welrent-source") || "wr-frontend",
    });

    const origin = new URL(request.url).origin;
    const contract_url = publicContractUrl(String(contract.contract_ref), origin);

    return NextResponse.json(
      {
        ok: true,
        contract,
        contract_ref: contract.contract_ref,
        contract_url,
        // Convenience: wr-frontend can deep-link users into Act
        frontend_profile_url: `${origin}/profile`,
      },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    console.error("Create contract error:", error);
    const message = error instanceof Error ? error.message : "Failed to create contract";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders() });
  }
}
