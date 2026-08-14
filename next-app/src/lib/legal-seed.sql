-- ============================================================
-- Welrent AutoVerhuur – Legal Pages Database Seed
-- Table: legal_pages
-- ============================================================

CREATE TABLE IF NOT EXISTS legal_pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ============================================================
-- 1. CAR RENTAL AGREEMENT
-- ============================================================
INSERT OR REPLACE INTO legal_pages (id, slug, title, content) VALUES (
'car-agreement',
'car-agreement',
'Car Rental Agreement',
'<h1>Car Rental Agreement</h1>
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
<p>Cancellations made more than 48 hours before the start of the rental period are eligible for a full refund. Cancellations made within 48 hours of the rental start will incur a cancellation fee equivalent to one day''s rental. No-shows are non-refundable.</p>

<h2>Article 11 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Any disputes shall be submitted exclusively to the competent court in the jurisdiction where Welrent AutoVerhuur is registered.</p>'
);

-- ============================================================
-- 2. BOAT RENTAL AGREEMENT
-- ============================================================
INSERT OR REPLACE INTO legal_pages (id, slug, title, content) VALUES (
'boat-agreement',
'boat-agreement',
'Boat Rental Agreement',
'<h1>Boat Rental Agreement</h1>
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
<p>Any damage or loss must be reported to Welrent AutoVerhuur immediately. The Renter is liable for all costs arising from damage, loss, or environmental contamination caused during the rental period. Welrent AutoVerhuur reserves the right to charge for administrative costs in addition to repair costs.</p>

<h2>Article 10 – Return Conditions</h2>
<p>The Vessel must be returned to the agreed location, on time, clean, and with fuel at the level specified. Late returns are subject to additional charges.</p>

<h2>Article 11 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Disputes shall be resolved by the competent Dutch court.</p>'
);

-- ============================================================
-- 3. EQUIPMENT RENTAL AGREEMENT
-- ============================================================
INSERT OR REPLACE INTO legal_pages (id, slug, title, content) VALUES (
'equipment-agreement',
'equipment-agreement',
'Equipment Rental Agreement',
'<h1>Equipment Rental Agreement</h1>
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
<li>Equipment must not be used in hazardous conditions or environments unless specifically designed for such use.</li>
<li>Subletting, lending, or transferring the Equipment to third parties is strictly prohibited.</li>
</ul>

<h2>Article 4 – Maintenance Responsibilities</h2>
<p>The Renter is responsible for the proper care and maintenance of the Equipment during the rental period, including keeping it clean and dry, storing it securely, and following all manufacturer guidelines. Welrent AutoVerhuur will provide Equipment in good working order and is responsible for pre-existing defects reported at the time of collection.</p>

<h2>Article 5 – Damage Policy</h2>
<p>Any damage, malfunction, or defect must be reported to Welrent AutoVerhuur immediately. The Renter is liable for all damage occurring during the rental period, including accidental damage, misuse, and theft. Damage costs will be assessed by Welrent AutoVerhuur and deducted from the security deposit or invoiced separately.</p>

<h2>Article 6 – Loss Policy</h2>
<p>In the event of loss or theft of the Equipment, the Renter must immediately report this to Welrent AutoVerhuur and file a police report. The Renter shall be liable for the full replacement value of any lost or stolen Equipment.</p>

<h2>Article 7 – Deposit</h2>
<p>A security deposit is required before Equipment is released. The deposit amount reflects the value of the Equipment and will be refunded upon return of the Equipment in its original condition.</p>

<h2>Article 8 – Return Conditions</h2>
<p>All Equipment must be returned by the agreed date and time, clean, in working condition, and with all accessories and documentation included. Late returns will incur additional daily charges. Equipment not returned after 5 business days beyond the agreed return date may be reported as stolen.</p>

<h2>Article 9 – Liability Limitation</h2>
<p>Welrent AutoVerhuur is not liable for any direct or indirect damages, including loss of profit, arising from the use of the Equipment. The Renter assumes full responsibility for all risks associated with the use of the Equipment during the rental period.</p>

<h2>Article 10 – Governing Law</h2>
<p>This agreement is governed by Dutch law. Any disputes will be submitted to the competent Dutch court.</p>'
);

-- ============================================================
-- 4. TERMS OF SERVICE
-- ============================================================
INSERT OR REPLACE INTO legal_pages (id, slug, title, content) VALUES (
'terms-of-service',
'terms',
'Terms of Service',
'<h1>Terms of Service</h1>
<p><strong>Welrent AutoVerhuur</strong><br>
[COMPANY_ADDRESS]<br>
Chamber of Commerce: [CHAMBER_OF_COMMERCE_NUMBER]<br>
VAT: [VAT_NUMBER]<br>
Email: [EMAIL] | Phone: [PHONE_NUMBER]<br>
Last updated: 2025</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing or using the Welrent AutoVerhuur platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.</p>

<h2>2. Account Registration</h2>
<p>To access certain features, you must create an account. You agree to provide accurate and complete information during registration and to keep your credentials secure. You are solely responsible for all activities that occur under your account. Welrent AutoVerhuur reserves the right to suspend or terminate accounts that violate these Terms.</p>

<h2>3. Payment Conditions</h2>
<p>All prices are listed in Euros (EUR) and include applicable VAT unless stated otherwise. Payment is due at the time of booking or at vehicle/equipment collection, as specified. Welrent AutoVerhuur accepts major credit cards, debit cards, and bank transfers. All transactions are processed securely. Invoices will be provided upon request.</p>

<h2>4. Prohibited Use</h2>
<p>You agree not to use the Service to:</p>
<ul>
<li>Engage in any unlawful, fraudulent, or harmful activity.</li>
<li>Impersonate any person or entity.</li>
<li>Transmit spam, malware, or disruptive content.</li>
<li>Attempt to gain unauthorised access to our systems.</li>
<li>Sublease or resell any rented vehicle, vessel, or equipment.</li>
</ul>

<h2>5. Intellectual Property</h2>
<p>All content on this platform, including text, logos, images, and software, is the property of Welrent AutoVerhuur and is protected by Dutch and international intellectual property laws. Reproduction, distribution, or modification without prior written consent is prohibited.</p>

<h2>6. Limitation of Liability</h2>
<p>Welrent AutoVerhuur is not liable for indirect, incidental, special, or consequential damages arising from the use of the Service. Our total liability shall not exceed the amount paid for the specific rental transaction giving rise to the claim.</p>

<h2>7. Account Termination</h2>
<p>Welrent AutoVerhuur reserves the right to suspend or permanently terminate your account at any time for breach of these Terms, suspected fraud, or any other reason deemed necessary. Outstanding payments remain due upon termination.</p>

<h2>8. Amendments</h2>
<p>Welrent AutoVerhuur reserves the right to modify these Terms at any time. Users will be notified of significant changes. Continued use of the Service constitutes acceptance of updated Terms.</p>

<h2>9. Dispute Resolution</h2>
<p>In the event of a dispute, we encourage you to contact us first at [EMAIL]. If no resolution is reached, disputes shall be submitted to the competent court in the Netherlands.</p>

<h2>10. Governing Law</h2>
<p>These Terms are governed by and construed in accordance with the laws of the Netherlands.</p>'
);

-- ============================================================
-- 5. PRIVACY POLICY
-- ============================================================
INSERT OR REPLACE INTO legal_pages (id, slug, title, content) VALUES (
'privacy-policy',
'privacy',
'Privacy Policy',
'<h1>Privacy Policy</h1>
<p><strong>Welrent AutoVerhuur</strong><br>
[COMPANY_ADDRESS]<br>
Email: [EMAIL]<br>
Last updated: 2025</p>

<h2>1. Introduction</h2>
<p>Welrent AutoVerhuur ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information in accordance with the General Data Protection Regulation (GDPR) and the Dutch Implementation Act (UAVG).</p>

<h2>2. Data We Collect</h2>
<ul>
<li><strong>Identity data:</strong> Name, date of birth, passport/ID number, driving licence details.</li>
<li><strong>Contact data:</strong> Email address, phone number, postal address.</li>
<li><strong>Financial data:</strong> Payment card details (processed by secure third-party providers), bank account information for deposit refunds.</li>
<li><strong>Transaction data:</strong> Rental history, booking details, invoice records.</li>
<li><strong>Technical data:</strong> IP address, browser type, device information, cookies.</li>
<li><strong>Usage data:</strong> How you use our website and services.</li>
</ul>

<h2>3. Why We Collect Your Data</h2>
<ul>
<li>To process and manage rental agreements (legal obligation & contractual necessity).</li>
<li>To verify your identity as required by law.</li>
<li>To process payments and manage deposits.</li>
<li>To communicate with you about your booking.</li>
<li>To comply with legal and regulatory obligations.</li>
<li>To improve our services through analytics (with consent).</li>
</ul>

<h2>4. Legal Basis for Processing</h2>
<p>We process your personal data on the following legal bases: performance of a contract, compliance with a legal obligation, and our legitimate interests. Where processing is based on consent, you may withdraw your consent at any time.</p>

<h2>5. Data Retention</h2>
<p>We retain personal data for as long as necessary to fulfil the purposes for which it was collected. Financial records are retained for 7 years as required by Dutch tax law. Identity documents are deleted within 30 days of the end of the rental unless required by law.</p>

<h2>6. Data Sharing</h2>
<p>We do not sell your personal data. We may share data with: payment processors, insurance providers, legal authorities (when required by law), and IT service providers (under data processing agreements).</p>

<h2>7. Your Rights</h2>
<p>Under GDPR, you have the right to:</p>
<ul>
<li>Access your personal data.</li>
<li>Rectify inaccurate data.</li>
<li>Request erasure ("right to be forgotten").</li>
<li>Object to processing.</li>
<li>Request data portability.</li>
<li>Lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</li>
</ul>
<p>To exercise your rights, contact us at [EMAIL].</p>

<h2>8. Security</h2>
<p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or destruction.</p>

<h2>9. Contact</h2>
<p>For privacy-related enquiries, contact us at [EMAIL] or [COMPANY_ADDRESS].</p>'
);

-- ============================================================
-- 6. COOKIE POLICY
-- ============================================================
INSERT OR REPLACE INTO legal_pages (id, slug, title, content) VALUES (
'cookie-policy',
'cookie',
'Cookie Policy',
'<h1>Cookie Policy</h1>
<p><strong>Welrent AutoVerhuur</strong><br>
Email: [EMAIL]<br>
Last updated: 2025</p>

<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files placed on your device when you visit our website. They help us provide a better, more personalised experience and allow us to understand how our site is used.</p>

<h2>2. Cookies We Use</h2>

<h3>2.1 Strictly Necessary Cookies</h3>
<p>These cookies are essential for the website to function correctly. They enable core features such as session management, security, and accessibility. These cookies cannot be disabled.</p>

<h3>2.2 Functional Cookies</h3>
<p>Functional cookies remember your preferences such as language, region, and login status to provide a more personalised experience. These are set only with your consent.</p>

<h3>2.3 Analytics Cookies</h3>
<p>We use analytics cookies (e.g., Google Analytics) to understand how visitors interact with our site. This helps us improve the content and structure of our platform. Data collected is anonymised where possible.</p>

<h3>2.4 Marketing Cookies</h3>
<p>Marketing cookies track your browsing behaviour to display relevant advertisements. We use these only with your explicit consent. You may opt out at any time.</p>

<h2>3. Cookie Consent</h2>
<p>When you first visit our website, you will be shown a cookie consent banner. You can choose to accept all cookies, reject non-essential cookies, or customise your preferences. Your choice will be stored for 12 months.</p>

<h2>4. Managing Cookies</h2>
<p>You can manage or delete cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of our website. For more information on managing cookies:</p>
<ul>
<li><a href="https://support.google.com/chrome/answer/95647" target="_blank">Google Chrome</a></li>
<li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank">Mozilla Firefox</a></li>
<li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank">Apple Safari</a></li>
</ul>

<h2>5. Third-Party Cookies</h2>
<p>Some cookies are set by third-party services that appear on our pages, such as payment processors and social media platforms. These are governed by the privacy policies of those respective third parties.</p>

<h2>6. Updates to This Policy</h2>
<p>We may update this Cookie Policy from time to time. We will notify you of significant changes via a notice on our website.</p>

<h2>7. Contact</h2>
<p>For questions about our use of cookies, contact us at [EMAIL].</p>'
);
