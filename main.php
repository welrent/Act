<?php
/**
 * Simulated Next.js Global Main/App context Wrapper
 */
session_start();
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Core/Database.php';
require_once __DIR__ . '/Core/Language.php';
require_once __DIR__ . '/Core/Logger.php';

Logger::log("System Access: " . ($_SERVER['REQUEST_URI'] ?? 'CLI'));

// Instantiate Global Language
global $lang;
$lang = new Language();

// Integrate core Security Plugin as requested
$securityPlugin = __DIR__ . '/Core/SecurityPlugin/BandiSecurity.php';
if (file_exists($securityPlugin)) {
    require_once $securityPlugin;
}

function render_component($component, $props = []) {
    global $lang;
    extract($props);
    $path = __DIR__ . '/src/components/' . $component . '.php';
    if(file_exists($path)) {
        require $path;
    }
}
