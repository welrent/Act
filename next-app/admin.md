# Welrent Admin Credentials

> **⚠️ SECURITY WARNING**: Do not commit this file to version control. Store these credentials securely and delete this file.

## Default Admin Account
- **Email:** `admin@id.welrent.com`
- **Temporary Password:** `WelrentAdmin2026!#`

### Setup Required
Since the Firebase Admin SDK requires a Service Account Key to verify tokens and create users programmatically, you need to:
1. Go to your Firebase Console -> Project Settings -> Service Accounts.
2. Click "Generate new private key".
3. Save the JSON file.
4. Copy the entire JSON content, remove line breaks to make it a single line string, and paste it into `.env.local` as `FIREBASE_ADMIN_CREDENTIALS='{...}'`.
5. Run `npx tsx src/lib/create-admin.ts` to actually create this user in Firebase and Turso.
*(Alternatively, create the user manually in the Firebase Authentication console and set their password to the one above).*

### Login Instructions
1. Navigate to the website.
2. Click on the "User Avatar" in the top right, or click "You are not logged in".
3. The Login Modal will appear.
4. Enter the email and password provided above.
5. You will automatically be granted Admin access because your email ends with `@id.welrent.com`.
6. Once logged in, navigate to `/secret-panel` to manage the site.

### Password Reset
To change this password, use the standard Firebase password reset flow, or manage the user directly in the Firebase Console.
