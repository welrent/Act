<?php
/**
 * Database and App configuration wrapper reading natively from the hidden .ini vault
 */
$vaultConfigPath = __DIR__.'/config.vault.ini';
if(!file_exists($vaultConfigPath)) { 
    die('Critical Error: Vault configuration missing or unreadable.'); 
}

$vault = parse_ini_file($vaultConfigPath, true);

// Database configuration
define('DB_HOST', $vault['database']['DB_HOST']);
define('DB_NAME', $vault['database']['DB_NAME']); 
define('DB_USER', $vault['database']['DB_USER']);        
define('DB_PASS', $vault['database']['DB_PASS']);            

// App configuration
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
define('APP_URL', $protocol . $host); 
define('APP_NAME', $vault['app']['APP_NAME']);
