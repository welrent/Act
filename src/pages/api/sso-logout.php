<?php
/**
 * SSO Logout Endpoint
 * POST /api/sso/logout
 *
 * Destroys the authenticated user's PHP session entry.
 * Called by WelrentAuth.logout() in the JS SDK.
 */
require_once __DIR__ . '/../../../main.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$email = $_SESSION['sso_user']['email'] ?? 'unknown';

// Remove SSO user from session
unset($_SESSION['sso_user']);

Logger::log('SSO logout: ' . $email);

echo json_encode(['success' => true]);
