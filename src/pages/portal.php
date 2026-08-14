<?php
/**
 * Portal page — /portal/{username}
 * Rendered by server.php when route matches /portal/*
 * 
 * $portalUser is populated by server.php from localStorage via SDK
 * before the layout is rendered. Since user data is client-side only
 * (SSO via Firebase), we render a shell here and hydrate via JS.
 */

// $portalSlug is set by server.php
$portalSlug = $portalSlug ?? '';
?>

<style>
/* ── Portal Hero ─────────────────────────────────────────────── */
.portal-hero {
    background: linear-gradient(135deg, #2F214B 0%, #1a1130 100%);
    border-radius: 12px;
    padding: 40px 36px;
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
}
.portal-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: rgba(142,185,255,0.07);
    pointer-events: none;
}
.portal-hero::after {
    content: '';
    position: absolute;
    bottom: -60px; left: 30%;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: rgba(142,185,255,0.04);
    pointer-events: none;
}

.portal-avatar-wrap {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid rgba(142,185,255,0.35);
    overflow: hidden;
    background: #3e2d63;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 800;
    color: #8EB9FF;
    position: relative;
    z-index: 1;
}
.portal-avatar-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.portal-hero-info { position: relative; z-index: 1; }
.portal-name {
    font-size: 26px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
    margin: 0 0 4px 0;
}
.portal-email {
    font-size: 14px;
    color: #8EB9FF;
    font-weight: 500;
    margin: 0;
}
.portal-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(142,185,255,0.12);
    border: 1px solid rgba(142,185,255,0.2);
    color: #8EB9FF;
    border-radius: 20px;
    padding: 3px 12px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 10px;
}

/* ── Info Cards Grid ─────────────────────────────────────────── */
.portal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 2rem;
}
.portal-card {
    background: #F9FAFB;
    border-radius: 12px;
    padding: 22px 24px;
    border: 1px solid #F0F0F4;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.portal-card:hover {
    border-color: #D0C8E0;
    box-shadow: 0 4px 16px rgba(47,33,75,0.06);
}
.portal-card-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #C0BDC8;
    margin-bottom: 8px;
}
.portal-card-value {
    font-size: 16px;
    font-weight: 600;
    color: #2F214B;
    word-break: break-all;
}
.portal-card-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #EEE9F8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
}
.portal-card-icon svg { width: 18px; height: 18px; stroke: #7C5DC7; }

/* ── Sign-out row ────────────────────────────────────────────── */
.portal-actions {
    display: flex;
    gap: 12px;
    margin-top: 2rem;
    flex-wrap: wrap;
}
.portal-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    font-family: inherit;
    transition: all 0.2s;
    text-decoration: none;
}
.portal-btn-outline {
    background: transparent;
    border: 1.5px solid #EAECF0;
    color: #2F214B;
}
.portal-btn-outline:hover {
    background: #F9FAFB;
    border-color: #D0C8E0;
}
.portal-btn-danger {
    background: #FFF5F5;
    color: #EF4135;
    border: 1.5px solid #FDDCDA;
}
.portal-btn-danger:hover {
    background: #FDDCDA;
}

/* ── Access Denied state ─────────────────────────────────────── */
.portal-locked {
    background: #F9FAFB;
    border-radius: 12px;
    padding: 60px 24px;
    text-align: center;
    border: 1px dashed #E2E2E6;
}
.portal-locked svg {
    width: 44px; height: 44px;
    stroke: #C0BDC8;
    margin-bottom: 16px;
}
.portal-locked h2 {
    font-size: 20px;
    font-weight: 700;
    color: #2F214B;
    margin-bottom: 8px;
}
.portal-locked p {
    font-size: 14px;
    color: #8C8C91;
    margin-bottom: 20px;
}
</style>

<!-- Shell rendered immediately; JS hydrates with real user data -->
<div id="portal-loading" style="text-align:center;padding:60px 0;color:#C0BDC8;">
    <div style="width:44px;height:44px;border:3px solid #F0F0F4;border-top-color:#2F214B;border-radius:50%;animation:welrent-pulse 0.8s linear infinite;display:inline-block;margin-bottom:12px;"></div>
    <p style="font-size:14px;margin:0;">Loading profile…</p>
</div>

<div id="portal-content" style="display:none;">
    <!-- Hero -->
    <div class="portal-hero">
        <div class="portal-avatar-wrap" id="p-avatar-wrap">
            <span id="p-initial">?</span>
        </div>
        <div class="portal-hero-info">
            <h1 class="portal-name" id="p-name">—</h1>
            <p class="portal-email" id="p-email">—</p>
            <div class="portal-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Verified Member
            </div>
        </div>
    </div>

    <!-- Info grid -->
    <div class="portal-grid">
        <!-- First Name -->
        <div class="portal-card">
            <div class="portal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
            </div>
            <div class="portal-card-label">First Name</div>
            <div class="portal-card-value" id="p-firstname">—</div>
        </div>

        <!-- Last Name -->
        <div class="portal-card">
            <div class="portal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
            </div>
            <div class="portal-card-label">Last Name</div>
            <div class="portal-card-value" id="p-lastname">—</div>
        </div>

        <!-- Email -->
        <div class="portal-card">
            <div class="portal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
            </div>
            <div class="portal-card-label">Email Address</div>
            <div class="portal-card-value" id="p-email-card">—</div>
        </div>

        <!-- Account ID -->
        <div class="portal-card">
            <div class="portal-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="8" height="4" rx="1"/><rect x="14" y="4" width="8" height="4" rx="1"/><rect x="2" y="16" width="8" height="4" rx="1"/><rect x="14" y="16" width="8" height="4" rx="1"/>
                </svg>
            </div>
            <div class="portal-card-label">Account ID</div>
            <div class="portal-card-value" id="p-uid" style="font-size:12px;font-family:monospace;color:#8C8C91;">—</div>
        </div>
    </div>

    <!-- Actions -->
    <div class="portal-actions">
        <a href="/" class="portal-btn portal-btn-outline">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
        </a>
        <button class="portal-btn portal-btn-danger" onclick="WelrentAuth.logout(); window.location.href='/';">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
        </button>
    </div>
</div>

<!-- Shown if user is not authenticated -->
<div id="portal-locked" style="display:none;">
    <div class="portal-locked">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h2>Sign in to view your profile</h2>
        <p>This page is only visible to authenticated Welrent members.</p>
        <button class="portal-btn portal-btn-outline" style="margin:0 auto;" onclick="WelrentAuth.login()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Sign In
        </button>
    </div>
</div>

<script>
(function () {
    function splitName(displayName) {
        const parts = (displayName || '').trim().split(/\s+/);
        return {
            first: parts[0] || '—',
            last:  parts.slice(1).join(' ') || '—',
        };
    }

    function hydrate(user) {
        document.getElementById('portal-loading').style.display = 'none';

        if (!user) {
            document.getElementById('portal-locked').style.display = 'block';
            return;
        }

        const name  = splitName(user.displayName);
        const email = user.email || '—';
        const uid   = user.uid   || '—';

        // Hero
        document.getElementById('p-name').textContent  = user.displayName || email;
        document.getElementById('p-email').textContent = email;
        document.title = (user.displayName || 'Profile') + ' | Welrent Act';

        // Avatar
        const wrap = document.getElementById('p-avatar-wrap');
        if (user.photoUrl) {
            wrap.innerHTML = `<img src="${user.photoUrl}" alt="${user.displayName}">`;
        } else {
            document.getElementById('p-initial').textContent = (user.displayName || email).charAt(0).toUpperCase();
        }

        // Cards
        document.getElementById('p-firstname').textContent   = name.first;
        document.getElementById('p-lastname').textContent    = name.last;
        document.getElementById('p-email-card').textContent  = email;
        document.getElementById('p-uid').textContent         = uid;

        document.getElementById('portal-content').style.display = 'block';
    }

    // Wait for SDK to be ready (it's already loaded in the header)
    if (window.WelrentAuth) {
        WelrentAuth.onAuthStateChanged(hydrate);
    } else {
        // Fallback: SDK not yet loaded
        window.addEventListener('load', function () {
            if (window.WelrentAuth) {
                WelrentAuth.onAuthStateChanged(hydrate);
            } else {
                document.getElementById('portal-loading').style.display = 'none';
                document.getElementById('portal-locked').style.display  = 'block';
            }
        });
    }
})();
</script>
