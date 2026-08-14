/**
 * Welrent AutoVerhuur – Legal Pages Database Seeder
 * Run: npx ts-node src/lib/seed-legal.ts
 * Or add as npm script: "seed": "ts-node src/lib/seed-legal.ts"
 */

import { db } from './db';

const legalPages = [
  {
    id: 'car-agreement',
    slug: 'car-agreement',
    title: 'Car Rental Agreement',
    content: `<h1>Car Rental Agreement</h1>
<p><strong>Welrent AutoVerhuur</strong><br>
[COMPANY_ADDRESS]<br>
Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
VAT: [VAT_NUMBER]<br>
Email: [EMAIL]<br>
Phone: [PHONE_NUMBER]</p>

<h2>Article 1 – Definitions</h2>
<p><strong>Renter:</strong> The individual or legal entity that enters into this rental agreement with Welrent AutoVerhuur.<br>
<strong>Vehicle:</strong> The motor vehicle made available by Welrent AutoVerhuur under this agreement.<br>
<strong>Rental Period:</strong> The period starting at vehicle handover and ending upon confirmed return.</p>

<h2>Article 2 – Identity Verification</h2>
<p>The Renter must present a valid government-issued photo ID and a valid driving licence at the time of vehicle collection. Welrent AutoVerhuur reserves the right to refuse rental if identification cannot be verified. The minimum age for rental is 21 years. Drivers aged 21–24 may be subject to a Young Driver Surcharge.</p>

<h2>Article 3 – Rental Conditions</h2>
<ul>
<li>The Vehicle may only be operated by the authorised driver(s) listed in this agreement.</li>
<li>The Vehicle must not be used for commercial transport, racing, off-road driving, or any illegal activity.</li>
<li>Smoking, transporting animals, or carrying flammable/dangerous goods is strictly prohibited.</li>
<li>The Renter is responsible for ensuring the Vehicle is securely locked when unattended.</li>
</ul>

<h2>Article 4 – Mileage Policy</h2>
<p>The rental includes a mileage allowance as stated in the booking confirmation. Excess kilometres are charged at the rate specified. Unlimited mileage packages are available upon request and must be booked in advance.</p>

<h2>Article 5 – Fuel Policy</h2>
<p>The Vehicle is provided with a full tank and must be returned with a full tank. Failure to return the vehicle with a full tank will result in a fuel service charge plus the cost of the missing fuel being deducted from the deposit.</p>

<h2>Article 6 – Deposit</h2>
<p>A security deposit is required at the time of vehicle collection. The deposit amount is stated in the booking confirmation and will be held by Welrent AutoVerhuur for the duration of the rental. The deposit will be released within 7 business days of the vehicle being returned undamaged and in compliance with all conditions.</p>

<h2>Article 7 – Insurance & Liability</h2>
<p>The Vehicle is covered by third-party liability insurance as required by Dutch law. The Renter is liable for all damage to the Vehicle up to the value of the excess/deductible stated in the booking. Optional Collision Damage Waiver (CDW) and Super CDW products are available to reduce liability. Insurance does not cover: damage caused by reckless or negligent driving, DUI offences, driving on unpaved roads, or any prohibited use.</p>

<h2>Article 8 – Damage Policy</h2>
<p>Any damage, however minor, must be reported to Welrent AutoVerhuur immediately. Failure to report damage may result in full liability being transferred to the Renter. A damage report must be completed at the time of vehicle collection and return. Welrent AutoVerhuur reserves the right to charge the Renter for all damage costs including administrative fees.</p>

<h2>Article 9 – Late Return & Penalties</h2>
<p>The Vehicle must be returned by the date and time specified in the booking. Late returns will incur an additional daily rate for each commenced day of delay. Failure to return the Vehicle for more than 24 hours beyond the agreed return time may result in the vehicle being reported as stolen to Dutch authorities.</p>

<h2>Article 10 – Cancellation Policy</h2>
<p>Cancellations made more than 48 hours before the start of the rental period are eligible for a full refund. Cancellations made within 48 hours of the rental start will incur a cancellation fee equivalent to one day's rental. No-shows are non-refundable.</p>

<h2>Article 11 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Any disputes shall be submitted exclusively to the competent court in the jurisdiction where Welrent AutoVerhuur is registered.</p>`
  },
  {
    id: 'boat-agreement',
    slug: 'boat-agreement',
    title: 'Boat Rental Agreement',
    content: `<h1>Boat Rental Agreement</h1>
<p><strong>Welrent AutoVerhuur</strong><br>
[COMPANY_ADDRESS]<br>
Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
VAT: [VAT_NUMBER]<br>
Email: [EMAIL]<br>
Phone: [PHONE_NUMBER]</p>

<h2>Article 1 – Definitions</h2>
<p><strong>Renter:</strong> The individual or legal entity entering into this boat rental agreement.<br>
<strong>Vessel:</strong> The watercraft provided by Welrent AutoVerhuur under this agreement.<br>
<strong>Rental Period:</strong> The period from the agreed start time until confirmed return of the Vessel.</p>

<h2>Article 2 – Identity & Licence Verification</h2>
<p>The Renter must present a valid government-issued photo ID. Where Dutch law requires a boating licence (Klein Vaarbewijs or equivalent) for the specific vessel, this must be provided. Welrent AutoVerhuur may require proof of boating experience at its discretion.</p>

<h2>Article 3 – Safety Rules</h2>
<ul>
<li>Life jackets must be worn at all times by all passengers under 12 years of age.</li>
<li>Life jackets must be available for all persons on board.</li>
<li>Maximum passenger capacity as stated on the vessel must never be exceeded.</li>
<li>The Renter must check weather forecasts before departure. Sailing in unsafe conditions is prohibited.</li>
<li>The Renter must carry the vessel documentation on board at all times.</li>
<li>Alcohol consumption while operating the vessel is strictly prohibited.</li>
</ul>

<h2>Article 4 – Permitted Water Areas</h2>
<p>The Vessel may only be operated within the designated waterways and zones specified in the booking. Operating the Vessel in prohibited areas, coastal waters, or international waters without explicit written authorisation is strictly forbidden.</p>

<h2>Article 5 – Weather Conditions</h2>
<p>Welrent AutoVerhuur reserves the right to cancel or postpone any rental due to adverse weather conditions. In such cases, a full refund or rescheduling will be offered. The Renter accepts full responsibility for decisions made after departure regarding weather conditions.</p>

<h2>Article 6 – Deposit</h2>
<p>A security deposit is required prior to the start of the rental. The deposit will be refunded within 7 business days upon safe return of the Vessel with no damage.</p>

<h2>Article 7 – Insurance & Liability</h2>
<p>The Vessel is covered by third-party water liability insurance. The Renter is personally liable for all damage to the Vessel and third-party property up to the deductible amount. Insurance does not cover damage resulting from negligence, prohibited use, or operation outside designated areas.</p>

<h2>Article 8 – Prohibited Activities</h2>
<ul>
<li>Water skiing or towing of persons without prior written consent.</li>
<li>Commercial use or subletting of the Vessel.</li>
<li>Operating the Vessel while under the influence of alcohol or drugs.</li>
<li>Overloading the Vessel beyond its rated capacity.</li>
<li>Any illegal activity on or with the Vessel.</li>
</ul>

<h2>Article 9 – Damage & Loss</h2>
<p>Any damage or loss must be reported to Welrent AutoVerhuur immediately. The Renter is liable for all costs arising from damage, loss, or environmental contamination caused during the rental period.</p>

<h2>Article 10 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Disputes shall be resolved by the competent Dutch court.</p>`
  },
  {
    id: 'equipment-agreement',
    slug: 'equipment-agreement',
    title: 'Equipment Rental Agreement',
    content: `<h1>Equipment Rental Agreement</h1>
<p><strong>Welrent AutoVerhuur</strong><br>
[COMPANY_ADDRESS]<br>
Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
VAT: [VAT_NUMBER]<br>
Email: [EMAIL]<br>
Phone: [PHONE_NUMBER]</p>

<h2>Article 1 – Definitions</h2>
<p><strong>Renter:</strong> The individual or legal entity renting equipment from Welrent AutoVerhuur.<br>
<strong>Equipment:</strong> Tools, machinery, or other items provided under this agreement.<br>
<strong>Rental Period:</strong> The period from collection or delivery until confirmed return.</p>

<h2>Article 2 – Identity Verification</h2>
<p>The Renter must present a valid government-issued photo ID. For high-value equipment, Welrent AutoVerhuur may require a copy of the ID to be retained for the duration of the rental period in accordance with GDPR regulations.</p>

<h2>Article 3 – Usage Conditions</h2>
<ul>
<li>Equipment must only be used for its intended purpose as described by the manufacturer.</li>
<li>Equipment must not be used by persons without appropriate training or certification.</li>
<li>Subletting, lending, or transferring the Equipment to third parties is strictly prohibited.</li>
</ul>

<h2>Article 4 – Damage & Loss Policy</h2>
<p>Any damage, malfunction, or defect must be reported immediately. The Renter is liable for all damage during the rental period. In the event of theft or loss, the Renter must file a police report immediately and inform Welrent AutoVerhuur. The Renter shall be liable for the full replacement value of any lost or stolen Equipment.</p>

<h2>Article 5 – Return Conditions</h2>
<p>All Equipment must be returned by the agreed date and time, clean and in working condition. Late returns incur additional daily charges. Equipment not returned after 5 business days beyond the agreed return date may be reported as stolen.</p>

<h2>Article 6 – Liability Limitation</h2>
<p>Welrent AutoVerhuur is not liable for any indirect or consequential damages arising from the use of the Equipment. The Renter assumes full responsibility for all risks associated with Equipment use during the rental period.</p>

<h2>Article 7 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Any disputes will be submitted to the competent Dutch court.</p>`
  },
  {
    id: 'terms-of-service',
    slug: 'terms',
    title: 'Terms of Service',
    content: `<h1>Terms of Service</h1>
<p><strong>Welrent AutoVerhuur</strong> — [COMPANY_ADDRESS]<br>
Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER] | VAT: [VAT_NUMBER]<br>
Email: [EMAIL] | Phone: [PHONE_NUMBER]<br>Last updated: 2025</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing or using the Welrent AutoVerhuur platform, you agree to be bound by these Terms of Service.</p>

<h2>2. Account Registration</h2>
<p>You agree to provide accurate information during registration and keep your credentials secure. You are solely responsible for all activities under your account.</p>

<h2>3. Payment Conditions</h2>
<p>All prices are in Euros (EUR) including applicable VAT. Payment is due at the time of booking. All transactions are processed securely.</p>

<h2>4. Prohibited Use</h2>
<ul>
<li>Engage in any unlawful, fraudulent, or harmful activity.</li>
<li>Impersonate any person or entity.</li>
<li>Attempt to gain unauthorised access to our systems.</li>
<li>Sublease or resell any rented vehicle, vessel, or equipment.</li>
</ul>

<h2>5. Intellectual Property</h2>
<p>All content on this platform is the property of Welrent AutoVerhuur and is protected by Dutch and international intellectual property laws.</p>

<h2>6. Limitation of Liability</h2>
<p>Welrent AutoVerhuur is not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the specific rental transaction.</p>

<h2>7. Account Termination</h2>
<p>Welrent AutoVerhuur reserves the right to suspend or terminate your account at any time for breach of these Terms or suspected fraud.</p>

<h2>8. Dispute Resolution</h2>
<p>Disputes shall be submitted to the competent court in the Netherlands after attempting direct resolution with us at [EMAIL].</p>

<h2>9. Governing Law</h2>
<p>These Terms are governed by the laws of the Netherlands.</p>`
  },
  {
    id: 'privacy-policy',
    slug: 'privacy',
    title: 'Privacy Policy',
    content: `<h1>Privacy Policy</h1>
<p><strong>Welrent AutoVerhuur</strong> — [COMPANY_ADDRESS]<br>
Email: [EMAIL] | Last updated: 2025</p>

<h2>1. Introduction</h2>
<p>Welrent AutoVerhuur is committed to protecting your personal data in accordance with the GDPR and Dutch UAVG legislation.</p>

<h2>2. Data We Collect</h2>
<ul>
<li><strong>Identity data:</strong> Name, date of birth, ID/passport number, driving licence.</li>
<li><strong>Contact data:</strong> Email, phone number, address.</li>
<li><strong>Financial data:</strong> Payment details (processed by secure third parties).</li>
<li><strong>Technical data:</strong> IP address, browser type, cookies.</li>
</ul>

<h2>3. Why We Collect Your Data</h2>
<ul>
<li>To process and manage rental agreements.</li>
<li>To verify identity as required by law.</li>
<li>To process payments and manage deposits.</li>
<li>To comply with legal obligations.</li>
</ul>

<h2>4. Data Retention</h2>
<p>Financial records are retained for 7 years per Dutch tax law. Identity documents are deleted within 30 days of rental completion unless required by law.</p>

<h2>5. Your Rights</h2>
<p>Under GDPR you have the right to access, rectify, erase, and port your data. To exercise your rights, contact [EMAIL].</p>

<h2>6. Contact</h2>
<p>For privacy enquiries: [EMAIL] | [COMPANY_ADDRESS]</p>`
  },
  {
    id: 'cookie-policy',
    slug: 'cookie',
    title: 'Cookie Policy',
    content: `<h1>Cookie Policy</h1>
<p><strong>Welrent AutoVerhuur</strong> — Email: [EMAIL] | Last updated: 2025</p>

<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files placed on your device when you visit our website to improve functionality and user experience.</p>

<h2>2. Cookies We Use</h2>
<h3>Strictly Necessary Cookies</h3>
<p>Essential for the website to function. Cannot be disabled.</p>

<h3>Functional Cookies</h3>
<p>Remember your preferences such as language and login status (with consent).</p>

<h3>Analytics Cookies</h3>
<p>Help us understand how visitors use our site (e.g., Google Analytics). Data is anonymised where possible.</p>

<h3>Marketing Cookies</h3>
<p>Used only with your explicit consent to display relevant advertisements.</p>

<h2>3. Managing Cookies</h2>
<p>You can manage cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>

<h2>4. Contact</h2>
<p>For cookie-related questions: [EMAIL]</p>`
  }
];

async function seed() {
  console.log('🌱 Seeding legal pages into Turso database...');

  for (const page of legalPages) {
    // Check if the page already exists by slug
    const existing = await db.execute({
      sql: `SELECT id FROM pages WHERE slug = ?`,
      args: [page.slug]
    });

    if (existing.rows.length > 0) {
      // Update existing
      await db.execute({
        sql: `UPDATE pages SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?`,
        args: [page.title, page.content, page.slug]
      });
      console.log(`  🔄 Updated: ${page.title}`);
    } else {
      // Insert new
      await db.execute({
        sql: `INSERT INTO pages (slug, title, content) VALUES (?, ?, ?)`,
        args: [page.slug, page.title, page.content]
      });
      console.log(`  ✅ Inserted: ${page.title}`);
    }
  }

  console.log('\n🎉 All legal pages seeded successfully!');
  console.log('📝 Remember to replace placeholders in the Site Text Editor:');
  console.log('   [COMPANY_ADDRESS], [CHAMBER_OF_COMMERCE_NUMBER], [VAT_NUMBER], [EMAIL], [PHONE_NUMBER]');
}

seed().catch(console.error);
