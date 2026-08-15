/**
 * Next.js helper for wr-frontend/next-web
 * Usage after a successful booking POST:
 *
 *   import { createActContract } from '@/lib/act-contracts';
 *   const act = await createActContract({ ...booking, booking_ref });
 */
const ACT_API_URL = (
  process.env.NEXT_PUBLIC_ACT_API_URL ||
  process.env.ACT_API_URL ||
  'https://act.welrent.com'
).replace(/\/$/, '');

export type ActContractPayload = {
  uid: string;
  user_email?: string;
  user_name?: string;
  booking_ref?: string;
  vehicle_type?: 'car' | 'motorcycle' | 'boat' | 'equipment' | string;
  car_name?: string;
  vehicle_name?: string;
  car_image?: string;
  vehicle_image?: string;
  start_date: string;
  end_date: string;
  days?: number;
  price?: number;
  location?: string;
  status?: string;
};

export async function createActContract(payload: ActContractPayload) {
  const res = await fetch(`${ACT_API_URL}/api/contracts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Welrent-Source': 'wr-frontend-next',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Act contract failed (${res.status})`);
  }
  return data as {
    ok: boolean;
    contract_ref: string;
    contract_url: string;
    contract: Record<string, unknown>;
  };
}

export async function listActContracts(uid: string) {
  const res = await fetch(`${ACT_API_URL}/api/contracts?uid=${encodeURIComponent(uid)}`);
  const data = await res.json().catch(() => ({ contracts: [] }));
  return data.contracts || [];
}

export function actContractPageUrl(contractRef: string) {
  return `${ACT_API_URL}/contracts/${encodeURIComponent(contractRef)}`;
}
