import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { idToken, email, uid } = await request.json();

    if (!email || !uid) {
      return NextResponse.json({ error: 'Missing email or uid' }, { status: 400 });
    }

    // Auto-promote @id.welrent.com emails OR welrent.business@gmail.com to admin
    if (email.endsWith('@id.welrent.com') || email === 'welrent.business@gmail.com') {
      const existing = await db.execute({
        sql: `SELECT id FROM admins WHERE email = ?`,
        args: [email]
      });

      if (existing.rows.length === 0) {
        await db.execute({
          sql: `INSERT INTO admins (email, firebase_uid, role) VALUES (?, ?, 'admin')`,
          args: [email, uid]
        });
        console.log(`Auto-promoted ${email} to admin.`);
      }
    }

    // Determine user role
    let role = 'user';
    const adminCheck = await db.execute({ sql: `SELECT id FROM admins WHERE email = ?`, args: [email] });
    if (adminCheck.rows.length > 0) {
      role = 'admin';
    } else {
      const workerCheck = await db.execute({ sql: `SELECT id FROM workers WHERE email = ?`, args: [email] });
      if (workerCheck.rows.length > 0) {
        role = 'worker';
      }
    }

    // Log the login
    await db.execute({
      sql: `INSERT INTO login_logs (email, ip_address, status) VALUES (?, ?, 'success')`,
      args: [email, request.headers.get('x-forwarded-for') || 'unknown']
    });

    // Create a simple session cookie for development/staging without needing Admin SDK
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const cookieStore = await cookies();
    cookieStore.set('session', idToken, { // Using the client token as session for now
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ status: 'success', role });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return NextResponse.json({ status: 'success' });
}
