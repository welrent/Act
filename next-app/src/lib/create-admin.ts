import { adminAuth } from './firebase/admin';
import { db } from './db';

// Generate a random secure password
const generatePassword = (length = 16) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => chars[x % chars.length])
    .join('');
};

async function setupDefaultAdmin() {
  const email = 'admin@id.welrent.com';
  const password = generatePassword(16);

  console.log('🌱 Setting up default admin account...');

  try {
    // 1. Create or update user in Firebase Auth
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      console.log('Firebase user already exists. Updating password...');
      await adminAuth.updateUser(userRecord.uid, { password });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await adminAuth.createUser({
          email,
          password,
          emailVerified: true,
          displayName: 'System Admin',
        });
        console.log('Created new Firebase user.');
      } else {
        throw error;
      }
    }

    // 2. Ensure user is in Turso admins table
    const existing = await db.execute({
      sql: `SELECT id FROM admins WHERE email = ?`,
      args: [email],
    });

    if (existing.rows.length === 0) {
      await db.execute({
        sql: `INSERT INTO admins (email, firebase_uid, role) VALUES (?, ?, 'superadmin')`,
        args: [email, userRecord.uid],
      });
      console.log('Added admin to Turso database.');
    } else {
      console.log('Admin already exists in Turso database.');
    }

    // 3. Write credentials to admin.md
    const fs = require('fs');
    const content = `# Welrent Admin Credentials

> **⚠️ SECURITY WARNING**: Do not commit this file to version control. Store these credentials securely and delete this file.

## Default Admin Account
- **Email:** \`${email}\`
- **Temporary Password:** \`${password}\`

### Login Instructions
1. Navigate to the website.
2. Click on the "User Avatar" in the top right, or click "You are not logged in".
3. The Login Modal will appear.
4. Enter the email and password provided above.
5. You will automatically be granted Admin access because your email ends with \`@id.welrent.com\`.
6. Once logged in, navigate to \`/secret-panel\` to manage the site.

### Password Reset
To change this password, log in with these credentials and use the standard Firebase password reset flow, or manage the user in the Firebase Console.
`;

    fs.writeFileSync('admin.md', content);
    console.log('✅ Wrote credentials to admin.md');
    
  } catch (error) {
    console.error('Failed to setup default admin:', error);
  }
}

setupDefaultAdmin().catch(console.error);
