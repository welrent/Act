/**
 * Seed demo contracts for local testing / screenshots.
 * Run: npx tsx src/lib/seed-demo-contracts.ts
 */
import { ensureSchema } from "./ensure-schema";
import { createContract } from "./contracts";

async function main() {
  await ensureSchema();

  const samples = [
    {
      user_uid: "demo-user-001",
      user_email: "demo@welrent.com",
      user_name: "Demo Renter",
      booking_ref: "WLR-2026-DEMO1",
      vehicle_type: "car",
      vehicle_name: "Audi RS6 Avant",
      vehicle_image: "/img/hero_car.png",
      start_date: "2026-08-20",
      end_date: "2026-08-22",
      days: 2,
      price: 380,
      location: "Amsterdam Central",
      source: "seed",
    },
    {
      user_uid: "demo-user-001",
      user_email: "demo@welrent.com",
      user_name: "Demo Renter",
      booking_ref: "WLR-2026-DEMO2",
      vehicle_type: "motorcycle",
      vehicle_name: "Yamaha MT-07",
      start_date: "2026-09-01",
      end_date: "2026-09-03",
      days: 2,
      price: 160,
      location: "Rotterdam Centrum",
      source: "seed",
    },
  ];

  for (const sample of samples) {
    const contract = await createContract(sample);
    console.log("✅", contract.contract_ref, "→", contract.vehicle_name);
  }

  console.log("\nDemo contracts ready. Open /api/contracts?uid=demo-user-001");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
