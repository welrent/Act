#!/usr/bin/env node
/**
 * API smoke tests for Welrent Act contracts + search.
 * Usage: node scripts/test-api.mjs [baseUrl]
 */
const BASE = process.argv[2] || process.env.ACT_BASE_URL || 'http://127.0.0.1:3000';

async function req(path, options) {
  const res = await fetch(`${BASE}${path}`, options);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, json };
}

async function main() {
  const failures = [];

  console.log(`Testing Act API at ${BASE}`);

  const home = await fetch(BASE);
  if (!home.ok) failures.push(`GET / => ${home.status}`);
  else console.log('✅ GET /');

  const search = await req('/api/search?q=car');
  if (search.status !== 200 || !Array.isArray(search.json)) {
    failures.push(`GET /api/search failed: ${search.status}`);
  } else {
    console.log(`✅ GET /api/search (${search.json.length} results)`);
  }

  const create = await req('/api/contracts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Welrent-Source': 'test-api' },
    body: JSON.stringify({
      uid: 'test-uid-sdk',
      user_email: 'tester@welrent.com',
      user_name: 'SDK Tester',
      booking_ref: `WLR-TEST-${Date.now()}`,
      vehicle_type: 'motorcycle',
      car_name: 'Test Yamaha MT-07',
      start_date: '2026-10-01',
      end_date: '2026-10-02',
      days: 1,
      price: 95,
      location: 'Test Lab',
    }),
  });

  if (create.status !== 201 || !create.json.contract_ref) {
    failures.push(`POST /api/contracts failed: ${create.status} ${JSON.stringify(create.json)}`);
  } else {
    console.log('✅ POST /api/contracts', create.json.contract_ref);
  }

  const list = await req('/api/contracts?uid=test-uid-sdk');
  if (list.status !== 200 || !Array.isArray(list.json.contracts) || list.json.contracts.length < 1) {
    failures.push(`GET /api/contracts?uid= failed`);
  } else {
    console.log(`✅ GET /api/contracts (${list.json.contracts.length})`);
  }

  if (create.json?.contract_ref) {
    const one = await req(`/api/contracts/${encodeURIComponent(create.json.contract_ref)}`);
    if (one.status !== 200 || !one.json.contract) failures.push('GET /api/contracts/:ref failed');
    else console.log('✅ GET /api/contracts/:ref');

    const page = await fetch(`${BASE}/contracts/${encodeURIComponent(create.json.contract_ref)}`);
    if (!page.ok) failures.push(`GET /contracts/:ref page => ${page.status}`);
    else console.log('✅ GET /contracts/:ref page');
  }

  const moto = await fetch(`${BASE}/pages/motorcycle-rental-agreement`);
  if (!moto.ok) failures.push(`GET motorcycle agreement => ${moto.status}`);
  else console.log('✅ GET /pages/motorcycle-rental-agreement');

  if (failures.length) {
    console.error('\n❌ Failures:');
    failures.forEach((f) => console.error(' -', f));
    process.exit(1);
  }

  console.log('\nAll API tests passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
