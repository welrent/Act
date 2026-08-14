<?php global $lang; ?>
<!-- Footer -->
<div class="design-footer">
    <div style="display: flex; gap: 15px; align-items: center;">
        <a href="<?= APP_URL ?? 'https://welrent.com' ?>" target="_blank" style="color: inherit; text-decoration: none;">Welrent Europa B.V.</a>
        <div style="display: flex; gap: 10px; font-size: 18px;">
            <a href="?lang=fr" style="text-decoration: none; opacity: <?= $lang->current() == 'fr' ? '1' : '0.4' ?>; filter: <?= $lang->current() == 'fr' ? 'none' : 'grayscale(100%)' ?>; transition: all 0.2s;" title="Français">🇫🇷</a>
            <a href="?lang=nl" style="text-decoration: none; opacity: <?= $lang->current() == 'nl' ? '1' : '0.4' ?>; filter: <?= $lang->current() == 'nl' ? 'none' : 'grayscale(100%)' ?>; transition: all 0.2s;" title="Nederlands">🇳🇱</a>
            <a href="?lang=en" style="text-decoration: none; opacity: <?= $lang->current() == 'en' ? '1' : '0.4' ?>; filter: <?= $lang->current() == 'en' ? 'none' : 'grayscale(100%)' ?>; transition: all 0.2s;" title="English">🇬🇧</a>
            <a href="?lang=es" style="text-decoration: none; opacity: <?= $lang->current() == 'es' ? '1' : '0.4' ?>; filter: <?= $lang->current() == 'es' ? 'none' : 'grayscale(100%)' ?>; transition: all 0.2s;" title="Español">🇪🇸</a>
        </div>
    </div>
    <div>&copy; <?= date('Y') ?></div>
</div>

<!-- Strict GDPR Cookie Memory Banner -->
<div id="gdpr-cookie-banner" style="display:none; position:fixed; bottom:0; left:0; right:0; background-color:#2A303C; color:#C0BDC8; padding:20px; z-index:9999; box-shadow:0 -10px 30px rgba(0,0,0,0.5); border-top:1px solid #8EB9FF; font-family:-apple-system, BlinkMacSystemFont, Arial, sans-serif;">
    <div style="max-width:1050px; margin:0 auto; display:flex; flex-direction:row; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:15px;">
        <div style="flex:1; min-width:300px; font-size:14px; line-height:1.6;">
            <strong style="color: #FFF; font-size:16px;">We value your privacy.</strong><br>
            Our infrastructure uses tracking cookies to structurally enhance your browsing layout patterns and optimize backend tracking parameters. Clicking "Yes, Accept" confirms your alignment.
        </div>
        <div style="display:flex; gap:10px;">
            <button onclick="acceptCookies()" style="background-color:#8EB9FF; color:#2F214B; border:none; padding:10px 24px; border-radius:6px; font-weight:700; cursor:pointer; font-size: 15px; box-shadow: 0 4px 10px rgba(142,185,255,0.2);">Yes, Accept</button>
        </div>
    </div>
</div>
<script>
function acceptCookies() {
    document.cookie = "cookieConsentAct=true; max-age=31536000; path=/";
    document.getElementById('gdpr-cookie-banner').style.display = 'none';
}
window.addEventListener('DOMContentLoaded', () => {
    if (document.cookie.indexOf("cookieConsentAct=true") === -1) {
        document.getElementById('gdpr-cookie-banner').style.display = 'block';
    }
});
</script>
