<?php global $lang; ?>
<style>
.design-sidebar {
    width: 220px;
    padding: 2.2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-right: 1px solid #F4F5F6;
    background-color: #FFF;
}
.sidebar-section-title {
    font-size: 11px;
    font-weight: 700;
    color: #C0BDC8;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 12px;
}
.sidebar-link {
    color: #8C8C91;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
    display: block;
    margin-bottom: 8px;
}
.sidebar-link:hover { color: #2F214B; }
@media (max-width: 768px) {
    .design-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #EAECF0;
        padding: 1.5rem 1rem;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        gap: 20px;
        background-color: #F9FAFB;
        white-space: nowrap;
    }
    .design-sidebar::-webkit-scrollbar {
        display: none;
    }
    .design-sidebar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .sidebar-section { 
        flex: 0 0 auto;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }
    .sidebar-section-title {
        margin-bottom: 0;
        margin-right: 8px;
    }
    .sidebar-link {
        font-size: 15px; 
        padding: 4px 6px;
        display: inline-block;
        margin-bottom: 0;
    }
}
</style>
<div class="design-sidebar">
    <div class="sidebar-section">
        <div class="sidebar-section-title">Navigation</div>
        <a href="<?= APP_URL ?? '/' ?>" class="sidebar-link"><?= $lang->get('back_to_home') ?? 'Dashboard' ?></a>
        <a href="<?= APP_URL ?? '' ?>/page/car-rental-agreement" class="sidebar-link"><?= $lang->get('car_rental') ?? 'Car Agreements' ?></a>
    </div>
    <div class="sidebar-section">
        <div class="sidebar-section-title">Legal Hub</div>
        <a href="<?= APP_URL ?? '' ?>/page/terms" class="sidebar-link"><?= $lang->get('terms_of_use') ?? 'Terms of Service' ?></a>
        <a href="<?= APP_URL ?? '' ?>/page/privacy" class="sidebar-link"><?= $lang->get('privacy') ?? 'Privacy Policy' ?></a>
        <a href="<?= APP_URL ?? '' ?>/page/cookie" class="sidebar-link"><?= $lang->get('cookie') ?? 'Cookie Rules' ?></a>
    </div>
    <?php if (isset($_COOKIE) && count(preg_grep('/^MKSESSID/', array_keys($_COOKIE))) > 0): ?>
    <div class="sidebar-section">
        <div class="sidebar-section-title">Admin Core</div>
        <a href="<?= APP_URL ?? '' ?>/secret-panel/public_html" class="sidebar-link">Control Panel</a>
        <a href="<?= APP_URL ?? '' ?>/secret-panel/public_html/editor.php" class="sidebar-link">Site Text Editor</a>
        <a href="<?= APP_URL ?? '' ?>/secret-panel/public_html/logs.php" class="sidebar-link">Security Logs</a>
    </div>
    <?php endif; ?>
</div>
