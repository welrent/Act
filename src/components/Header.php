<?php global $lang; ?>
<!-- Header -->
<div class="design-header">
    <div class="design-logo">
        <a href="<?= APP_URL ?? '/' ?>">
            <img src="<?= APP_URL ?? '' ?>/img/WR.svg" alt="WR Logo" style="height: 24px;">
        </a>
        <span class="pipe">|</span>
        <span class="act">Act</span>
    </div>
    
    <!-- Search Bar -->
    <div class="search-container" style="position: relative;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0AABF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="tech-search" class="search-input" placeholder="<?= $lang->get('search_placeholder') ?>" autocomplete="off">
        <span class="search-shortcut">⌘ <?= $lang->get('search_shortcut') ?></span>
        
        <!-- Live Search Dropdown UI -->
        <div id="search-results-box" style="display:none; position:absolute; top:calc(100% + 5px); left:0; background:#fff; border:1px solid #EAECF0; border-radius:8px; width:280px; z-index:100; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:8px 0; font-size:14px; max-height:250px; overflow-y:auto;">
            <div id="search-results-content" style="padding: 0 12px;"></div>
        </div>
    </div>

    <!-- Welrent SSO SDK (includes backwards-compat ApiClient) -->
    <script src="<?= APP_URL ?? '' ?>/js/sdk/welrent-sdk.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        // ── Search Bar ──────────────────────────────────────────────────────
        const input = document.getElementById('tech-search');
        const box = document.getElementById('search-results-box');
        const content = document.getElementById('search-results-content');
        let timeout = null;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q = e.target.value.trim();
                if (q.length > 0) window.location.href = '<?= APP_URL ?? "" ?>/search?q=' + encodeURIComponent(q);
            }
        });

        input.addEventListener('input', (e) => {
            clearTimeout(timeout);
            const q = e.target.value.trim();
            
            if(q.length < 2) {
                box.style.display = 'none';
                return;
            }

            timeout = setTimeout(async () => {
                const results = await window.WelrentAPI.search(q);
                content.innerHTML = '';
                
                if(results.length === 0) {
                    content.innerHTML = '<div style="padding:10px 0; color:#B0AABF;">No results found.</div>';
                } else {
                    results.forEach(r => {
                        const div = document.createElement('div');
                        div.innerHTML = `<a href="${r.url}" style="display:block; padding:8px 0; text-decoration:none; color:#2F214B; border-bottom:1px solid #F4F5F6;">
                            <strong style="display:block; font-size:14px;">${r.title}</strong>
                            <span style="font-size:12px; color:#8C8C91;">${r.type}</span>
                        </a>`;
                        content.appendChild(div);
                    });
                }
                box.style.display = 'block';
            }, 300);
        });
        
        document.addEventListener('click', (e) => {
            if(!e.target.closest('.search-container')) {
                box.style.display = 'none';
            }
        });

        // ── SSO Auth State ──────────────────────────────────────────────────
        WelrentAuth.onAuthStateChanged((user) => {
            const stateEl = document.getElementById('welrent-user-state');
            if (!stateEl) return;

            if (user) {
                // Build URL-safe username slug from displayName or email prefix
                const rawName    = (user.displayName || user.email || 'user').trim();
                const userSlug   = rawName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
                const profileUrl = '/portal/' + encodeURIComponent(userSlug);

                // Avatar: real photo or initial-letter circle
                const avatar = user.photoUrl
                    ? `<img src="${user.photoUrl}" alt="${rawName}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid #F4F5F6;">`
                    : `<div class="user-avatar" style="background:#2F214B;flex-shrink:0;"><span style="color:#fff;font-size:13px;font-weight:700;">${rawName.charAt(0).toUpperCase()}</span></div>`;

                // Clicking the name → go to portal; avatar wraps both
                stateEl.innerHTML = `
                    <a href="${profileUrl}" style="display:flex;align-items:center;gap:10px;text-decoration:none;transition:opacity 0.15s;" onmouseover="this.style.opacity='0.75'" onmouseout="this.style.opacity='1'">
                        <span style="color:#2F214B;font-weight:600;font-size:14px;white-space:nowrap;">${rawName}</span>
                        ${avatar}
                    </a>`;

                // Reset any onclick from the logged-out state
                stateEl.style.cursor = 'default';
                stateEl.title = '';
                stateEl.onclick = null;

            } else {
                // Signed-out state: original "not logged in" look — fully clickable
                stateEl.innerHTML = `
                    <span style="color:#8C8C91;font-size:14px;font-weight:500;"><?= $lang->get('not_logged_in') ?? 'You are not logged in' ?></span>
                    <div class="user-avatar" style="cursor:pointer;">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>`;

                // Make the whole area clickable to trigger login
                stateEl.style.cursor = 'pointer';
                stateEl.title = 'Click to sign in';
                stateEl.onclick = () => WelrentAuth.login();
            }
        });
    });
    </script>

    <div class="header-right" style="margin-left: auto;">
        <a href="https://welrent.com" class="header-link" style="display: flex; align-items: center; gap: 6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="home-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span class="home-text"><?= $lang->get('back_to_home') ?></span>
        </a>

        <!-- Dynamic SSO user state injected by WelrentAuth SDK -->
        <div id="welrent-user-state" class="header-user" style="display:flex;align-items:center;gap:10px;">
            <!-- Initial render matches the logged-out look to avoid layout shift -->
            <span style="color:#8C8C91;font-size:14px;font-weight:500;"><?= $lang->get('not_logged_in') ?? 'You are not logged in' ?></span>
            <div class="user-avatar">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
        </div>
    </div>
</div>

<style>
@keyframes welrent-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
}
</style>
