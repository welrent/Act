import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK if it hasn't been initialized yet
if (!admin.apps.length) {
  try {
    let credential;
    if (process.env.FIREBASE_ADMIN_CREDENTIALS) {
      // Parse service account JSON from environment variable
      credential = admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS));
    } else {
      // Fallback for development if available
      credential = admin.credential.applicationDefault();
    }

    admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const adminAuth = admin.auth();
