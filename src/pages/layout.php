<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welrent | <?= htmlspecialchars($title ?? APP_NAME) ?></title>
    <link rel="icon" type="image/x-icon" href="<?= APP_URL ?? '' ?>/favicon.ico">
    <!-- Custom CSS Base -->
    <style>
/* Hide the default layout elements to provide a clean slate for the 1:1 design */
.navbar, .footer { display: none !important; }
body { 
    background-color: #ffffff; 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
*, *:before, *:after { box-sizing: inherit; }


/* Search Bar */
.search-container {
    display: flex;
    align-items: center;
    background-color: #F4F5F6;
    border-radius: 6px;
    padding: 4px 10px;
    margin-left: 20px;
    border: 1px solid transparent;
    transition: all 0.2s;
}
.search-container:focus-within {
    border-color: #8EB9FF;
    background-color: #FFF;
    box-shadow: 0 0 0 3px rgba(142,185,255,0.2);
}
.search-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 13px;
    color: #2F214B;
    width: 100px;
}
.search-input::placeholder {
    color: #B0AABF;
}
.search-shortcut {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #8C8C91;
    background-color: #E2E2E6;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
}

/* 1:1 Copy Layout Container */
.design-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem 1rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Header / Logo Match */
.design-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
    padding-left: 0.2rem;
}
.header-right {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 14px;
    color: #8C8C91;
    font-weight: 500;
}
.header-link {
    color: #8C8C91;
    text-decoration: none;
    transition: color 0.2s;
}
.header-link:hover {
    color: #2F214B;
}
.header-user {
    display: flex;
    align-items: center;
    gap: 10px;
}
.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #F4F5F6;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.user-avatar svg {
    width: 18px;
    height: 18px;
    fill: #C0BDC8;
}
.design-logo {
    display: flex;
    align-items: center;
    font-size: 28px;
    letter-spacing: -0.5px;
}
.design-logo strong.wr {
    font-weight: 800;
    color: #2F214B;
}
.design-logo span.pipe {
    font-weight: 300;
    color: #D6D6DD;
    margin: 0 10px;
    font-size: 26px;
}
.design-logo span.act {
    font-weight: 400;
    color: #C0BDC8;
}

/* Car Feature Hero */
.design-graphic {
    background-color: #2A303C;
    border-radius: 8px;
    height: 180px;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    display: flex;
    width: 100%;
}
.graphic-bar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
    background-color: #8EB9FF;
    width: 100%;
}
.graphic-divider {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;   
    height: 100%;
    background-color: #2A303C;
    border-left: 4px solid #8EB9FF;
    border-right: 4px solid #8EB9FF;
    z-index: 2;
}
.graphic-curve-left {
    position: absolute;
    left: 25%;
    width: 20px;
    height: 100%;
    border-left: 4px solid #8EB9FF;
    border-radius: 50%;
    transform: scaleX(0.5);
}
.graphic-curve-right {
    position: absolute;
    right: 25%;
    width: 20px;
    height: 100%;
    border-right: 4px solid #8EB9FF;
    border-radius: 50%;
    transform: scaleX(0.5);
}

/* pill Tag */
.design-pill {
    display: inline-block;
    background-color: #F4F5F6;
    color: #CBCBCF;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 4px;
}

/* Message/Card Box */
.design-message {
    background-color: #F9FAFB;
    border-radius: 12px;
    padding: 24px;
    color: #BDBDBD;
    line-height: 1.6;
    font-size: 16px;
    font-weight: 400;
    transition: all 0.2s ease;
}
.design-message.interactive:hover {
    background-color: #F4F5F6;
    color: #8C8C91;
}

/* Footer Spacer */
.design-footer-space {
    flex-grow: 1;
}

/* Design Footer */
.design-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #CBCBCF;
    font-size: 15px;
    padding-top: 2rem;
}
/* Support CSS Grid for Mobile UI & Sidebar Links */
.site-layout {
    display: flex;
    flex-direction: row;
    max-width: 1050px;
    margin: 0 auto;
    min-height: 100vh;
}
@media (max-width: 768px) {
    .site-layout {
        flex-direction: column;
    }
    .design-header {
        flex-wrap: wrap;
        gap: 12px;
    }
    .search-container {
        width: 100%;
        margin-left: 0 !important;
        margin-top: 10px;
        order: 3;
    }
    .search-input { width: 100%; }
    .header-right { order: 2; margin-left: auto; }
    .home-text { display: none; }
    .home-icon { display: block !important; }
}
.home-icon { display: none; }
    </style>
</head>
<body>

<div class="site-layout">
    <?php render_component('Sidebar'); ?>
    <div class="design-wrapper flex-grow-1" style="width: 100%;">
        <?php render_component('Header'); ?>
        
        <main>
            <?php require_once $contentView; ?>
        </main>
        
        <div class="design-footer-space"></div>
        <?php render_component('Footer'); ?>
    </div>
</div>

<script>
// Search Bar Shortcut (Cmd/Ctrl + K)
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('tech-search');
        if(searchInput) searchInput.focus();
    }
});
</script>
</body>
</html>
