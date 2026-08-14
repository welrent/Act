<?php
if (!defined('MILK_DIR')) {
    define('MILK_DIR', realpath(__DIR__ . '/../milkadmin'));
}
if (!defined('BASE_URL')) {
    $scheme = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    define('BASE_URL', $scheme . '://' . $host . '/secret-panel/public_html/');
}
if (!defined('LOCAL_DIR')) {
    define('LOCAL_DIR', realpath(__DIR__ . '/../milkadmin_local'));
}
