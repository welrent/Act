/**
 * Welrent AutoVerhuur – Update car/boat/equipment rental agreement pages
 * Run: export $(grep -v '^#' .env.local | xargs) && npx tsx src/lib/seed-agreements.ts
 */

import { db } from './db';

const agreements = [
  {
    slug: 'car-rental-agreement',
    title: 'Car Rental Agreement',
    content: `<article class="legal-document">

<h1>Car Rental Agreement</h1>
<p class="legal-meta">
  <strong>Welrent AutoVerhuur</strong><br>
  [COMPANY_ADDRESS]<br>
  Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
  VAT Number: [VAT_NUMBER]<br>
  Email: <a href="mailto:[EMAIL]">[EMAIL]</a> &nbsp;|&nbsp; Phone: [PHONE_NUMBER]<br>
  <em>Last updated: 2025</em>
</p>

<hr>

<h2>Article 1 – Parties & Definitions</h2>
<p><strong>Lessor:</strong> Welrent AutoVerhuur, registered at [COMPANY_ADDRESS], Chamber of Commerce [CHAMBER_OF_COMMERCE_NUMBER].<br>
<strong>Renter:</strong> The individual or legal entity who enters into this agreement and accepts all terms herein.<br>
<strong>Authorised Driver:</strong> Any person listed on this agreement who is permitted to operate the Vehicle.<br>
<strong>Vehicle:</strong> The motor vehicle described in the booking confirmation provided to the Renter.<br>
<strong>Rental Period:</strong> The period commencing at vehicle handover and ending upon confirmed return to Welrent AutoVerhuur.</p>

<h2>Article 2 – Identity & Driving Licence Verification</h2>
<p>The Renter and all Authorised Drivers must present, at the time of vehicle collection:</p>
<ul>
  <li>A valid government-issued photo identification (passport, national ID card or equivalent).</li>
  <li>A valid full driving licence, held for a minimum of 2 years, appropriate for the category of vehicle rented.</li>
  <li>For non-EU licences: an International Driving Permit (IDP) is required.</li>
</ul>
<p>Welrent AutoVerhuur reserves the right to refuse rental if identification or licence cannot be verified to its satisfaction. The minimum age for renting a vehicle is <strong>21 years</strong>. Renters aged 21–24 are subject to a Young Driver Surcharge as stated in the booking confirmation.</p>

<h2>Article 3 – Permitted & Prohibited Use</h2>
<p>The Vehicle may only be used:</p>
<ul>
  <li>On public roads in the Netherlands and within agreed European territory (if applicable).</li>
  <li>In accordance with all applicable Dutch and European traffic laws.</li>
  <li>By the Authorised Driver(s) named in this agreement only.</li>
</ul>
<p>The following uses are strictly <strong>prohibited</strong>:</p>
<ul>
  <li>Commercial transportation of passengers or goods for reward.</li>
  <li>Racing, rally driving, or participation in any motor sport.</li>
  <li>Off-road or unpaved road driving.</li>
  <li>Towing, pushing, or pulling any vehicle or trailer without prior written consent.</li>
  <li>Operating the Vehicle under the influence of alcohol, drugs, or any substance that impairs judgement.</li>
  <li>Transporting hazardous, flammable, or illegal substances or goods.</li>
  <li>Smoking inside the Vehicle.</li>
  <li>Transporting animals without prior written consent.</li>
  <li>Subletting or lending the Vehicle to any third party.</li>
  <li>Driving outside agreed geographic boundaries without prior written authorisation.</li>
</ul>

<h2>Article 4 – Mileage Policy</h2>
<p>The rental includes the mileage allowance stated in the booking confirmation. Excess kilometres are charged at the rate specified therein. Odometer tampering is a criminal offence and will result in immediate termination of the rental agreement and full legal liability being assigned to the Renter. Unlimited mileage options, where available, must be selected at the time of booking.</p>

<h2>Article 5 – Fuel Policy</h2>
<p>The Vehicle is delivered with a <strong>full fuel tank</strong> and must be returned with a full tank of the correct fuel type. Failure to return the vehicle with a full tank will result in:</p>
<ul>
  <li>A fuel service charge (as stated in the booking confirmation).</li>
  <li>The cost of the missing fuel, calculated at the prevailing pump price plus a handling fee.</li>
</ul>
<p>Misfuelling (using the wrong fuel type) is not covered by insurance. All costs resulting from misfuelling are the sole responsibility of the Renter.</p>

<h2>Article 6 – Security Deposit</h2>
<p>A security deposit as specified in the booking confirmation is required at vehicle collection, payable by credit card. Debit cards may not be accepted for deposit purposes. The deposit covers potential charges including, but not limited to: damage, fuel shortfall, late return, fines, and cleaning fees. The deposit will be released within <strong>7 business days</strong> of the Vehicle being returned in compliance with all conditions, subject to inspection. Welrent AutoVerhuur reserves the right to retain all or part of the deposit where applicable charges arise.</p>

<h2>Article 7 – Insurance Coverage</h2>
<p>The Vehicle is covered by the following as standard:</p>
<ul>
  <li><strong>Third-Party Liability (WA):</strong> As required by Dutch law (WAM).</li>
  <li><strong>Basic Collision Damage Waiver (CDW):</strong> Reduces Renter's liability to the excess amount stated in the booking.</li>
</ul>
<p>The following optional upgrades may be purchased:</p>
<ul>
  <li><strong>Super CDW / Zero Excess:</strong> Reduces Renter's excess liability to €0.</li>
  <li><strong>Tyre & Glass Protection.</strong></li>
  <li><strong>Personal Accident Insurance (PAI).</strong></li>
</ul>
<p><strong>Insurance does not cover:</strong></p>
<ul>
  <li>Damage caused by reckless, negligent, or intoxicated driving.</li>
  <li>Damage to tyres, glass, wheels, or underbody unless separately insured.</li>
  <li>Theft resulting from leaving keys in the vehicle or failing to lock.</li>
  <li>Damage occurring on unpaved roads or during prohibited use.</li>
  <li>Fines, penalties, or tolls incurred during the rental.</li>
</ul>

<h2>Article 8 – Damage Reporting & Assessment</h2>
<p>A condition inspection is conducted at both vehicle handover and return. The Renter must:</p>
<ul>
  <li>Inspect and sign the condition report at collection, noting any pre-existing damage.</li>
  <li>Report any damage, accident, or theft <strong>immediately</strong> by phone to Welrent AutoVerhuur.</li>
  <li>In the event of an accident involving third parties: obtain the other party's details, call Dutch police (112), and complete an accident report (European Accident Statement).</li>
</ul>
<p>Failure to report damage or providing false information may result in the Renter being held fully liable for all repair costs. Welrent AutoVerhuur reserves the right to charge for administrative handling fees, loss of use during repair, and diminished vehicle value where applicable.</p>

<h2>Article 9 – Late Return & Penalties</h2>
<p>The Vehicle must be returned by the exact date and time stated in the booking confirmation. Returns after the agreed time will be charged as follows:</p>
<ul>
  <li>Up to 2 hours late: 25% of the daily rental rate.</li>
  <li>2–4 hours late: 50% of the daily rental rate.</li>
  <li>More than 4 hours late: an additional full day's rental rate.</li>
</ul>
<p>If the Vehicle is not returned within <strong>24 hours</strong> of the agreed return time without prior contact, Welrent AutoVerhuur reserves the right to report the Vehicle as stolen to Dutch police authorities.</p>

<h2>Article 10 – Traffic Fines & Tolls</h2>
<p>The Renter is solely responsible for all fines, tolls, parking charges, congestion charges, and road tax obligations incurred during the Rental Period. An administrative handling fee will be applied to each fine processed by Welrent AutoVerhuur on behalf of the Renter.</p>

<h2>Article 11 – Breakdown & Assistance</h2>
<p>In the event of a mechanical breakdown, the Renter must contact Welrent AutoVerhuur's roadside assistance service using the number provided in the vehicle documents. The Renter must not authorise repairs without prior written approval. Unauthorised repair costs will not be reimbursed.</p>

<h2>Article 12 – Cancellation Policy</h2>
<ul>
  <li><strong>More than 48 hours before pickup:</strong> Full refund.</li>
  <li><strong>24–48 hours before pickup:</strong> 50% of the booking value charged.</li>
  <li><strong>Less than 24 hours before pickup:</strong> One full day's rental charged.</li>
  <li><strong>No-show:</strong> Full booking value charged, no refund.</li>
</ul>

<h2>Article 13 – Limitation of Liability</h2>
<p>Welrent AutoVerhuur's liability is limited to the rental charges paid. We are not responsible for indirect, incidental, or consequential damages, including but not limited to loss of income, loss of data, or personal injury not covered by mandatory Dutch law.</p>

<h2>Article 14 – Fraud & Misuse</h2>
<p>Any attempt to defraud Welrent AutoVerhuur — including but not limited to providing false identification, misrepresenting the purpose of rental, or staging accidents — will result in immediate termination of the rental, full financial liability, and criminal prosecution under Dutch law.</p>

<h2>Article 15 – Governing Law & Dispute Resolution</h2>
<p>This agreement is governed exclusively by the laws of the Netherlands. In the event of a dispute, the parties shall first attempt resolution by direct negotiation. Failing this, disputes shall be submitted to the competent court of the district where Welrent AutoVerhuur is registered. This agreement constitutes the entire understanding between the parties and supersedes all prior communications.</p>

</article>`
  },
  {
    slug: 'boat-rental-agreement',
    title: 'Boat Rental Agreement',
    content: `<article class="legal-document">

<h1>Boat Rental Agreement</h1>
<p class="legal-meta">
  <strong>Welrent AutoVerhuur</strong><br>
  [COMPANY_ADDRESS]<br>
  Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
  VAT Number: [VAT_NUMBER]<br>
  Email: <a href="mailto:[EMAIL]">[EMAIL]</a> &nbsp;|&nbsp; Phone: [PHONE_NUMBER]<br>
  <em>Last updated: 2025</em>
</p>

<hr>

<h2>Article 1 – Parties & Definitions</h2>
<p><strong>Lessor:</strong> Welrent AutoVerhuur, registered at [COMPANY_ADDRESS].<br>
<strong>Renter:</strong> The individual or legal entity entering into this boat rental agreement.<br>
<strong>Vessel:</strong> The watercraft provided by Welrent AutoVerhuur as described in the booking confirmation.<br>
<strong>Skipper:</strong> The authorised person responsible for operating the Vessel during the rental period.<br>
<strong>Rental Period:</strong> The agreed period commencing at vessel handover and ending upon confirmed return.</p>

<h2>Article 2 – Identity & Licence Verification</h2>
<p>The Renter and Skipper must present at handover:</p>
<ul>
  <li>A valid government-issued photo ID.</li>
  <li>A valid boating licence (Klein Vaarbewijs I/II, CWO, or recognised equivalent) where required by Dutch law for the specific vessel.</li>
</ul>
<p>Welrent AutoVerhuur may require proof of practical boating experience at its discretion. The minimum age to rent a vessel is <strong>18 years</strong>. Welrent AutoVerhuur reserves the right to refuse rental if experience is deemed insufficient.</p>

<h2>Article 3 – Safety Rules & Obligations</h2>
<p>The Renter and all passengers are bound by the following safety rules:</p>
<ul>
  <li>Life jackets must be available on board for every passenger and must be worn at all times by children under 12 years of age and by all passengers on open water.</li>
  <li>The maximum passenger capacity stated on the Vessel and in the booking must never be exceeded.</li>
  <li>The Renter must check official Dutch weather forecasts (KNMI) before and during the trip. Sailing in Force 5+ wind conditions is prohibited unless the Vessel is specifically rated for such conditions.</li>
  <li>All vessel documentation must be kept on board at all times.</li>
  <li>Operating the Vessel under the influence of alcohol, drugs, or any impairing substance is strictly prohibited.</li>
  <li>The Vessel must not be left unattended unless securely moored.</li>
  <li>Navigation lights must be used after dusk and in conditions of poor visibility.</li>
</ul>

<h2>Article 4 – Permitted Water Areas</h2>
<p>The Vessel may only be operated within the waterways, lakes, and zones specified in the booking confirmation. Operation in:</p>
<ul>
  <li>Open sea or coastal waters beyond designated areas.</li>
  <li>Areas with restricted access (nature reserves, military zones).</li>
  <li>Foreign waters without prior written authorisation.</li>
</ul>
<p>...is strictly prohibited. Violations may result in immediate recall of the Vessel and full liability for any resulting fines or damage.</p>

<h2>Article 5 – Weather Conditions & Cancellation</h2>
<p>Welrent AutoVerhuur reserves the right to cancel or postpone any rental due to adverse weather conditions (code orange or red KNMI warnings). In such cases, a full refund or rescheduling will be offered at the Renter's choice. Once the Vessel has departed, the Renter assumes full responsibility for weather-related decisions and Welrent AutoVerhuur bears no liability for decisions taken on the water.</p>

<h2>Article 6 – Security Deposit</h2>
<p>A security deposit as stated in the booking confirmation is required prior to vessel handover. The deposit will be refunded within <strong>7 business days</strong> upon return of the Vessel in its original condition. Welrent AutoVerhuur reserves the right to retain all or part of the deposit for damage, excessive cleaning, or late return charges.</p>

<h2>Article 7 – Insurance & Liability</h2>
<p>The Vessel is insured for:</p>
<ul>
  <li><strong>Third-party water liability (WA):</strong> Coverage for damage caused to other vessels or third parties.</li>
  <li><strong>Casco (hull) damage:</strong> Subject to the excess/deductible amount stated in the booking.</li>
</ul>
<p>The Renter is personally liable for all damage up to the deductible amount. Insurance does not cover:</p>
<ul>
  <li>Damage caused by operating outside permitted areas.</li>
  <li>Damage due to negligence, recklessness, or intoxication.</li>
  <li>Environmental damage (fuel spills, waste discharge).</li>
  <li>Personal belongings of passengers.</li>
</ul>

<h2>Article 8 – Prohibited Activities</h2>
<ul>
  <li>Water skiing, wakeboarding, or towing persons without prior written consent and appropriate insurance.</li>
  <li>Commercial use, charter, or subletting of the Vessel.</li>
  <li>Exceeding the Vessel's rated speed or capacity.</li>
  <li>Mooring in unauthorised locations.</li>
  <li>Discharging waste, oil, or fuel into the water (Dutch law: Article 1a Wvr).</li>
  <li>Any illegal activity on or with the Vessel.</li>
</ul>

<h2>Article 9 – Damage, Breakdown & Loss</h2>
<p>The Renter must immediately report any damage, grounding, collision, or mechanical failure to Welrent AutoVerhuur. In the event of a collision involving third parties, a full written report must be submitted. The Renter is liable for:</p>
<ul>
  <li>All repair costs up to the insurance excess.</li>
  <li>Environmental clean-up costs where applicable.</li>
  <li>Loss of use charges during repair periods.</li>
  <li>Full replacement value in the event of total loss or sinking due to negligence.</li>
</ul>

<h2>Article 10 – Return Conditions</h2>
<p>The Vessel must be returned to the agreed mooring location by the agreed return time with:</p>
<ul>
  <li>Fuel at the level specified at handover.</li>
  <li>All equipment and accessories present and undamaged.</li>
  <li>The interior and deck clean and free of rubbish.</li>
</ul>
<p>Late returns will incur additional hourly or daily charges as specified in the booking.</p>

<h2>Article 11 – Fraud & Misuse</h2>
<p>Any fraudulent activity, including providing false identity, misrepresenting experience, or deliberately damaging the Vessel, will result in immediate legal action under Dutch law and full financial liability.</p>

<h2>Article 12 – Cancellation Policy</h2>
<ul>
  <li><strong>More than 72 hours before:</strong> Full refund.</li>
  <li><strong>24–72 hours before:</strong> 50% of booking value charged.</li>
  <li><strong>Less than 24 hours before:</strong> Full booking value charged.</li>
  <li><strong>Weather cancellation by Welrent AutoVerhuur:</strong> Full refund or reschedule.</li>
</ul>

<h2>Article 13 – Governing Law</h2>
<p>This agreement is governed by Dutch law, including the Binnenvaartpolitiereglement (BPR) and all applicable Dutch waterway regulations. Disputes shall be submitted to the competent Dutch court.</p>

</article>`
  },
  {
    slug: 'motorcycle-rental-agreement',
    title: 'Motorcycle Rental Agreement',
    content: `<article class="legal-document">

<h1>Motorcycle Rental Agreement</h1>
<p class="legal-meta">
  <strong>Welrent AutoVerhuur</strong><br>
  [COMPANY_ADDRESS]<br>
  Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
  VAT Number: [VAT_NUMBER]<br>
  Email: <a href="mailto:[EMAIL]">[EMAIL]</a> &nbsp;|&nbsp; Phone: [PHONE_NUMBER]<br>
  <em>Last updated: 2026</em>
</p>

<hr>

<h2>Article 1 – Parties & Definitions</h2>
<p><strong>Lessor:</strong> Welrent AutoVerhuur, registered at [COMPANY_ADDRESS].<br>
<strong>Renter:</strong> The individual who enters into this motorcycle or scooter rental agreement.<br>
<strong>Motorcycle:</strong> The two-wheeled motor vehicle described in the booking confirmation, including scooters where applicable.<br>
<strong>Rental Period:</strong> The period from handover until confirmed return of the Motorcycle.</p>

<h2>Article 2 – Licence & Age Requirements</h2>
<ul>
  <li>A valid category A / A1 / A2 (or Dutch equivalent) driving licence is required for the Motorcycle class rented.</li>
  <li>Minimum age is <strong>21 years</strong> unless otherwise stated for light scooters.</li>
  <li>An International Driving Permit is required for non-EU licences.</li>
</ul>

<h2>Article 3 – Safety Equipment</h2>
<p>A certified helmet must be worn at all times while riding. Additional protective gear (jacket, gloves) is strongly recommended. Passengers, where permitted, must also wear a helmet.</p>

<h2>Article 4 – Permitted & Prohibited Use</h2>
<p>The Motorcycle may only be used on public roads within the agreed territory and by the named Renter. Racing, off-road use, towing, stunt riding, and riding under the influence of alcohol or drugs are strictly prohibited.</p>

<h2>Article 5 – Insurance & Deposit</h2>
<p>Third-party liability and basic collision cover apply as stated in the booking. A security deposit is required at collection and released within <strong>7 business days</strong> after compliant return.</p>

<h2>Article 6 – Damage, Theft & Return</h2>
<p>Damage and theft must be reported immediately. The Motorcycle must be returned on time, with the agreed fuel level, and locked with the provided security devices.</p>

<h2>Article 7 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Standard Welrent Act terms for motor vehicle rentals apply where not superseded above.</p>

</article>`
  },
  {
    slug: 'equipment-rental-agreement',
    title: 'Equipment Rental Agreement',
    content: `<article class="legal-document">

<h1>Equipment Rental Agreement</h1>
<p class="legal-meta">
  <strong>Welrent AutoVerhuur</strong><br>
  [COMPANY_ADDRESS]<br>
  Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
  VAT Number: [VAT_NUMBER]<br>
  Email: <a href="mailto:[EMAIL]">[EMAIL]</a> &nbsp;|&nbsp; Phone: [PHONE_NUMBER]<br>
  <em>Last updated: 2025</em>
</p>

<hr>

<h2>Article 1 – Parties & Definitions</h2>
<p><strong>Lessor:</strong> Welrent AutoVerhuur, registered at [COMPANY_ADDRESS].<br>
<strong>Renter:</strong> The individual or legal entity that rents equipment under this agreement.<br>
<strong>Equipment:</strong> The tools, machinery, devices, or other items described in the booking confirmation.<br>
<strong>Rental Period:</strong> The agreed period from collection or delivery until confirmed return of all Equipment.</p>

<h2>Article 2 – Identity Verification</h2>
<p>The Renter must present a valid government-issued photo ID at the time of collection. For high-value Equipment (replacement value exceeding €500), Welrent AutoVerhuur may retain a copy of the Renter's ID for the duration of the Rental Period in accordance with applicable GDPR provisions and Dutch identification law.</p>

<h2>Article 3 – Permitted Use</h2>
<p>The Equipment may only be used:</p>
<ul>
  <li>For the purpose stated in the booking and for which the Equipment is designed and intended.</li>
  <li>By persons with appropriate training, certification, or experience for the specific Equipment type.</li>
  <li>In compliance with all applicable Dutch health and safety regulations (Arbowet).</li>
  <li>Within the Netherlands unless prior written authorisation is granted.</li>
</ul>

<h2>Article 4 – Prohibited Use</h2>
<ul>
  <li>Using Equipment for purposes other than those intended by the manufacturer.</li>
  <li>Subletting, lending, or transferring Equipment to any third party.</li>
  <li>Using Equipment in unsafe, hazardous, or extreme environmental conditions (unless Equipment is rated for such use).</li>
  <li>Modifying, dismantling, or tampering with the Equipment in any way.</li>
  <li>Using Equipment in any illegal activity.</li>
</ul>

<h2>Article 5 – Maintenance & Care Responsibilities</h2>
<p>During the Rental Period, the Renter is responsible for:</p>
<ul>
  <li>Keeping the Equipment clean, dry, and securely stored when not in use.</li>
  <li>Following all manufacturer guidelines for operation and storage.</li>
  <li>Using appropriate consumables (correct fuel, lubricants, batteries, etc.).</li>
  <li>Protecting the Equipment from theft, weather damage, and unauthorised access.</li>
</ul>
<p>Welrent AutoVerhuur provides Equipment in good working condition and warrants all Equipment is fit for purpose at the time of handover. Pre-existing defects noted and signed on the condition report at collection are the responsibility of Welrent AutoVerhuur.</p>

<h2>Article 6 – Damage Policy</h2>
<p>The Renter is liable for all damage to the Equipment occurring during the Rental Period, including:</p>
<ul>
  <li>Accidental damage from misuse or negligence.</li>
  <li>Damage from use in prohibited conditions.</li>
  <li>Damage from failure to follow manufacturer guidelines.</li>
</ul>
<p>Any damage or malfunction must be reported to Welrent AutoVerhuur <strong>immediately</strong>. Damage costs will be assessed by Welrent AutoVerhuur based on repair quotations from qualified technicians. The Renter accepts that Welrent AutoVerhuur's damage assessment is final, subject to independent arbitration if formally disputed. Administrative handling fees apply for all damage claims.</p>

<h2>Article 7 – Loss & Theft Policy</h2>
<p>In the event of theft or unexplained loss of Equipment:</p>
<ul>
  <li>The Renter must file a police report immediately and provide Welrent AutoVerhuur with the report number within 24 hours.</li>
  <li>The Renter shall be liable for the <strong>full replacement value</strong> of lost or stolen Equipment at current market prices.</li>
  <li>Partial theft (loss of accessories, attachments, or components) is charged at replacement cost.</li>
</ul>

<h2>Article 8 – Security Deposit</h2>
<p>A security deposit equal to or proportionate to the Equipment's replacement value is required before release of Equipment. The deposit is refunded within <strong>7 business days</strong> of Equipment return, subject to inspection and absence of damage, loss, or outstanding charges.</p>

<h2>Article 9 – Return Conditions</h2>
<p>All Equipment must be returned by the agreed date and time in:</p>
<ul>
  <li>Clean condition, free from dirt, grease, and debris.</li>
  <li>Full working order, with all accessories, attachments, cases, and documentation.</li>
  <li>Original packaging where applicable.</li>
</ul>
<p>Late return charges apply per commenced day beyond the agreed return date. Equipment not returned within <strong>5 business days</strong> after the agreed return date, without prior communication, may be reported as stolen to Dutch police authorities.</p>

<h2>Article 10 – Cleaning Charges</h2>
<p>If Equipment is returned in an excessively dirty or unhygienic condition, a professional cleaning charge will be applied at the standard Welrent AutoVerhuur rate.</p>

<h2>Article 11 – Limitation of Liability</h2>
<p>Welrent AutoVerhuur is not liable for:</p>
<ul>
  <li>Any indirect, consequential, or economic loss arising from Equipment use, failure, or unavailability.</li>
  <li>Personal injury arising from improper or unsafe use of Equipment.</li>
  <li>Any third-party claims arising from the Renter's use of Equipment.</li>
</ul>
<p>The Renter assumes full legal responsibility for all risks associated with Equipment use during the Rental Period and indemnifies Welrent AutoVerhuur against all third-party claims arising from such use.</p>

<h2>Article 12 – Cancellation Policy</h2>
<ul>
  <li><strong>More than 48 hours before collection:</strong> Full refund.</li>
  <li><strong>24–48 hours before collection:</strong> 50% of booking value charged.</li>
  <li><strong>Less than 24 hours before collection:</strong> Full day's rental charged.</li>
  <li><strong>No-show:</strong> Full booking value charged, no refund.</li>
</ul>

<h2>Article 13 – Fraud & Misuse</h2>
<p>Any fraudulent activity — including providing false identity, misrepresenting intended use, or deliberately damaging Equipment — will result in immediate legal prosecution under Dutch criminal law and full financial liability for all costs incurred by Welrent AutoVerhuur.</p>

<h2>Article 14 – Governing Law & Dispute Resolution</h2>
<p>This agreement is governed exclusively by Dutch law. In the event of a dispute, the parties shall first attempt resolution through direct negotiation. Failing this, disputes shall be submitted to the competent court of the jurisdiction where Welrent AutoVerhuur is registered. This agreement constitutes the entire understanding between the parties.</p>

</article>`
  }
];

async function updateAgreements() {
  console.log('📝 Updating rental agreement pages in Turso...\n');

  for (const page of agreements) {
    const existing = await db.execute({
      sql: `SELECT id FROM pages WHERE slug = ?`,
      args: [page.slug]
    });

    if (existing.rows.length > 0) {
      await db.execute({
        sql: `UPDATE pages SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?`,
        args: [page.title, page.content, page.slug]
      });
      console.log(`  ✅ Updated: ${page.title} (slug: ${page.slug})`);
    } else {
      await db.execute({
        sql: `INSERT INTO pages (slug, title, content) VALUES (?, ?, ?)`,
        args: [page.slug, page.title, page.content]
      });
      console.log(`  ✅ Inserted: ${page.title} (slug: ${page.slug})`);
    }
  }

  console.log('\n🎉 All agreement pages updated successfully!');
  console.log('\n📌 Pages are now live at:');
  console.log('   /pages/car-rental-agreement');
  console.log('   /pages/motorcycle-rental-agreement');
  console.log('   /pages/boat-rental-agreement');
  console.log('   /pages/equipment-rental-agreement');
  console.log('\n📝 Replace placeholders via the Site Text Editor at /secret-panel/editor');
}

updateAgreements().catch(console.error);
