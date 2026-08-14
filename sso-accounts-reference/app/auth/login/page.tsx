'use client';

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   accounts.welrent.com — /auth/login                            ║
 * ║   SSO Login Page — opened as a popup by welrent-sdk.js          ║
 * ║                                                                  ║
 * ║   Deploy this file to your accounts.welrent.com Next.js app at: ║
 * ║   app/auth/login/page.tsx                                        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Flow:
 *  1. act.welrent.com opens this page in a popup via WelrentAuth.login()
 *  2. User signs in with Google or email/password (Firebase)
 *  3. This page calls window.opener.postMessage({ type, token, ... }, returnTo)
 *  4. Popup closes itself — act.welrent.com header updates automatically
 */

import { useEffect, useState, useRef } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    Auth,
    User,
} from 'firebase/auth';

// ─── Firebase Config ────────────────────────────────────────────────────────
// Replace these with your actual Firebase project credentials.
const firebaseConfig = {
    apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// ─── Allowed origins that can receive the SSO token ─────────────────────────
const ALLOWED_ORIGINS = [
    'https://act.welrent.com',
    'http://localhost',         // local dev
    'http://localhost:8080',
    'http://127.0.0.1',
];

function initFirebase(): { app: FirebaseApp; auth: Auth } {
    const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const auth = getAuth(app);
    return { app, auth };
}

function isAllowedOrigin(origin: string): boolean {
    return ALLOWED_ORIGINS.some(
        (allowed) => origin === allowed || origin.startsWith(allowed)
    );
}

async function sendTokenToOpener(user: User, returnTo: string) {
    const targetOrigin = returnTo || 'https://act.welrent.com';
    if (!isAllowedOrigin(targetOrigin)) {
        console.error('[SSO] Rejected suspicious return_to origin:', targetOrigin);
        return;
    }

    const idToken = await user.getIdToken();

    const payload = {
        type:        'WELRENT_SSO_TOKEN',
        token:       idToken,
        displayName: user.displayName  ?? '',
        email:       user.email        ?? '',
        photoUrl:    user.photoURL     ?? '',
        uid:         user.uid,
    };

    if (window.opener && !window.opener.closed) {
        window.opener.postMessage(payload, targetOrigin);
        // Small delay so the message is sent before the popup closes
        setTimeout(() => window.close(), 400);
    } else {
        // Opened via redirect fallback — pass via URL fragment to return page
        const encoded = encodeURIComponent(JSON.stringify(payload));
        window.location.href = targetOrigin + '/auth/callback?sso=' + encoded;
    }
}

// ─── Component ───────────────────────────────────────────────────────────────

type AuthView = 'idle' | 'loading' | 'email' | 'success' | 'error';

export default function SSOLoginPage() {
    const [view,       setView]       = useState<AuthView>('idle');
    const [email,      setEmail]      = useState('');
    const [password,   setPassword]   = useState('');
    const [errorMsg,   setErrorMsg]   = useState('');
    const [returnTo,   setReturnTo]   = useState('https://act.welrent.com');
    const authRef = useRef<Auth | null>(null);

    useEffect(() => {
        // Parse ?return_to= from URL
        const params = new URLSearchParams(window.location.search);
        const rt = params.get('return_to');
        if (rt && isAllowedOrigin(decodeURIComponent(rt))) {
            setReturnTo(decodeURIComponent(rt));
        }

        // Init Firebase
        const { auth } = initFirebase();
        authRef.current = auth;

        // If already signed in, immediately transmit
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setView('success');
                await sendTokenToOpener(user, returnTo);
            }
        });
        return () => unsub();
    }, []);

    async function handleGoogle() {
        if (!authRef.current) return;
        setView('loading');
        setErrorMsg('');
        try {
            const provider = new GoogleAuthProvider();
            const result   = await signInWithPopup(authRef.current, provider);
            setView('success');
            await sendTokenToOpener(result.user, returnTo);
        } catch (err: any) {
            setView('error');
            setErrorMsg(err?.message ?? 'Google sign-in failed.');
        }
    }

    async function handleEmail(e: React.FormEvent) {
        e.preventDefault();
        if (!authRef.current) return;
        setView('loading');
        setErrorMsg('');
        try {
            const result = await signInWithEmailAndPassword(authRef.current, email, password);
            setView('success');
            await sendTokenToOpener(result.user, returnTo);
        } catch (err: any) {
            setView('error');
            setErrorMsg(err?.message ?? 'Sign in failed. Check your email and password.');
        }
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #0f0a1e;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .sso-card {
                    background: #1a1130;
                    border: 1px solid rgba(142,185,255,0.12);
                    border-radius: 20px;
                    padding: 40px 36px;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(142,185,255,0.05);
                }
                .sso-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 28px;
                }
                .sso-logo img { height: 28px; }
                .sso-logo-text {
                    font-size: 22px;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.5px;
                }
                .sso-logo-text span { color: #8EB9FF; }
                h1 {
                    font-size: 22px;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 6px;
                }
                .sso-subtitle {
                    font-size: 14px;
                    color: #8C8C91;
                    margin-bottom: 28px;
                    line-height: 1.5;
                }
                .sso-origin {
                    display: inline-block;
                    background: rgba(142,185,255,0.1);
                    color: #8EB9FF;
                    border-radius: 4px;
                    padding: 1px 6px;
                    font-size: 12px;
                    font-weight: 600;
                }
                .sso-btn {
                    width: 100%;
                    padding: 13px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s;
                    border: none;
                    font-family: inherit;
                }
                .sso-btn-google {
                    background: #fff;
                    color: #111;
                    margin-bottom: 12px;
                }
                .sso-btn-google:hover { background: #f0f0f0; transform: translateY(-1px); }
                .sso-btn-primary {
                    background: #2F214B;
                    color: #fff;
                    margin-top: 4px;
                }
                .sso-btn-primary:hover { background: #3e2d63; transform: translateY(-1px); }
                .sso-btn:active { transform: scale(0.98) !important; }
                .sso-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 16px 0;
                    color: #3d3353;
                    font-size: 13px;
                }
                .sso-divider::before,
                .sso-divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #2a2040;
                }
                .sso-field {
                    background: #120d24;
                    border: 1px solid #2a2040;
                    border-radius: 10px;
                    padding: 12px 14px;
                    width: 100%;
                    color: #fff;
                    font-size: 14px;
                    font-family: inherit;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    margin-bottom: 10px;
                }
                .sso-field:focus {
                    border-color: #8EB9FF;
                    box-shadow: 0 0 0 3px rgba(142,185,255,0.15);
                }
                .sso-field::placeholder { color: #4a4060; }
                .sso-toggle {
                    background: none;
                    border: none;
                    color: #8EB9FF;
                    font-size: 13px;
                    cursor: pointer;
                    padding: 0;
                    font-family: inherit;
                    margin-bottom: 16px;
                    display: block;
                }
                .sso-error {
                    background: rgba(239,65,53,0.1);
                    border: 1px solid rgba(239,65,53,0.3);
                    border-radius: 8px;
                    color: #ff6b6b;
                    padding: 10px 14px;
                    font-size: 13px;
                    margin-bottom: 14px;
                }
                .sso-success-icon {
                    text-align: center;
                    padding: 20px 0;
                }
                .sso-success-icon svg { margin-bottom: 12px; }
                .sso-loading { opacity: 0.6; pointer-events: none; }
                .spinner {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="sso-card">
                {/* Logo */}
                <div className="sso-logo">
                    <img src="https://act.welrent.com/img/WR.svg" alt="Welrent" />
                    <div className="sso-logo-text">Welrent <span>Accounts</span></div>
                </div>

                {view === 'success' ? (
                    <div className="sso-success-icon">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                            <circle cx="26" cy="26" r="26" fill="rgba(142,185,255,0.12)" />
                            <path d="M16 26l8 8 12-14" stroke="#8EB9FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 style={{ fontSize: '18px' }}>Signed in!</h1>
                        <p className="sso-subtitle">Returning you to <span className="sso-origin">{returnTo}</span>…</p>
                    </div>
                ) : (
                    <>
                        <h1>Sign in</h1>
                        <p className="sso-subtitle">
                            Signing in to <span className="sso-origin">{returnTo.replace('https://', '').replace('http://', '')}</span> via Welrent Accounts
                        </p>

                        {errorMsg && (
                            <div className="sso-error">{errorMsg}</div>
                        )}

                        <div className={view === 'loading' ? 'sso-loading' : ''}>
                            {/* Google */}
                            <button className="sso-btn sso-btn-google" onClick={handleGoogle} disabled={view === 'loading'}>
                                {view === 'loading' ? <span className="spinner" /> : (
                                    <svg width="18" height="18" viewBox="0 0 48 48">
                                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                                    </svg>
                                )}
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="sso-divider">or</div>

                            {/* Email form toggle */}
                            {view !== 'email' ? (
                                <button className="sso-toggle" onClick={() => setView('email')}>
                                    Sign in with email →
                                </button>
                            ) : (
                                <form onSubmit={handleEmail}>
                                    <input
                                        type="email"
                                        className="sso-field"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <input
                                        type="password"
                                        className="sso-field"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="sso-btn sso-btn-primary"
                                        disabled={view === 'loading'}
                                    >
                                        {view === 'loading' ? <span className="spinner" /> : 'Sign In'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
