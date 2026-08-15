# Welrent Act ↔ wr-frontend integration

Welrent Act automatically creates a rental contract when the main site
([wr-frontend](https://github.com/welrent/wr-frontend)) records a booking.

## Files in this folder

| File | Purpose |
|------|---------|
| `act_contract.php` | PHP helper used by the main site API |
| `rentals.php` | Drop-in replacement for `wr-frontend/api/rentals.php` |
| `act-contracts.ts` | Next.js helper for `wr-frontend/next-web` |

## Install on wr-frontend (PHP API)

1. Copy `act_contract.php` into `wr-frontend/api/` (or `lib/`).
2. Replace `wr-frontend/api/rentals.php` with the patched `rentals.php` from this folder
   (or `require_once` the helper and call `welrent_act_create_contract` after insert).
3. Optional env: `ACT_API_URL=https://act.welrent.com` (defaults to production Act).

## Install on wr-frontend (Next.js)

```ts
import { createActContract } from "./act-contracts";

const act = await createActContract({
  uid: user.uid,
  booking_ref: booking.booking_ref,
  vehicle_type: "motorcycle", // or "car"
  car_name: "Yamaha MT-07",
  start_date: "2026-09-01",
  end_date: "2026-09-03",
  days: 2,
  price: 160,
  location: "Rotterdam Centrum",
});

// act.contract_url → https://act.welrent.com/contracts/ACT-...
```

## Browser SDK (any site)

```html
<script src="https://act.welrent.com/js/sdk/welrent-sdk.js"></script>
<script>
  WelrentContracts.create({
    uid: "firebase-uid",
    vehicle_type: "car",
    vehicle_name: "Audi RS6 Avant",
    start_date: "2026-08-20",
    end_date: "2026-08-22",
    days: 2,
    price: 380,
    booking_ref: "WLR-2026-ABCDE",
  }).then(console.log);
</script>
```

## Contract visibility

- Act profile: `/profile` (signed-in user)
- Direct contract page: `/contracts/{contract_ref}`
- API list: `GET /api/contracts?uid={firebaseUid}`
