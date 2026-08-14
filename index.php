<?php
/**
 * Simulated Next.js Server Entry Point
 */
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Milkadmin Obfuscation - Block generic /admin attempts unconditionally
if (strpos($uri, '/admin') === 0) {
    http_response_code(404);
    require_once __DIR__ . '/src/pages/404.php';
    exit;
}

// Allow verified Secret Panel traffic unaffected by Next.js routing proxy
if (strpos($uri, '/secret-panel') === 0) {
    return false; // serve native admin resources as-is
}

// Proxies straight into the Next.js styled server core
require_once __DIR__ . '/server.php';
