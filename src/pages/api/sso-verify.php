<?php
/**
 * SSO Verify Endpoint
 * POST /api/sso/verify
 *
 * Receives a Firebase ID token from the WelrentAuth SDK,
 * validates it against Firebase REST API, and starts a PHP session
 * with the authenticated user's data.
 */
require_once __DIR__ . '/../../../main.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://accounts.welrent.com');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['valid' => false, 'error' => 'Method not allowed']);
    exit;
}

// Read JSON body
$body = json_decode(file_get_contents('php://input'), true);
$idToken = $body['token'] ?? '';

if (empty($idToken)) {
    http_response_code(400);
    echo json_encode(['valid' => false, 'error' => 'Missing token']);
    exit;
}

// Load Firebase credentials from vault
$vault = parse_ini_file(__DIR__ . '/../../../config.vault.ini', true);
$firebaseApiKey = $vault['firebase']['FIREBASE_API_KEY'] ?? '';

if (empty($firebaseApiKey)) {
    http_response_code(500);
    echo json_encode(['valid' => false, 'error' => 'Firebase not configured']);
    exit;
}

// Verify the ID token using Firebase REST API
$verifyUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' . urlencode($firebaseApiKey);

$ch = curl_init($verifyUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode(['idToken' => $idToken]),
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    Logger::log('SSO verify failed — Firebase API error. HTTP: ' . $httpCode);
    http_response_code(401);
    echo json_encode(['valid' => false, 'error' => 'Token verification failed']);
    exit;
}

$firebaseData = json_decode($response, true);
$users = $firebaseData['users'] ?? [];

if (empty($users)) {
    Logger::log('SSO verify failed — no user in Firebase response');
    http_response_code(401);
    echo json_encode(['valid' => false, 'error' => 'Invalid token']);
    exit;
}

$firebaseUser = $users[0];

// Check email verification (optional — remove if you allow unverified)
if (!($firebaseUser['emailVerified'] ?? false)) {
    http_response_code(403);
    echo json_encode(['valid' => false, 'error' => 'Email not verified']);
    exit;
}

// Build the SSO user record
$ssoUser = [
    'uid'         => $firebaseUser['localId']      ?? '',
    'email'       => $firebaseUser['email']         ?? '',
    'displayName' => $firebaseUser['displayName']   ?? '',
    'photoUrl'    => $firebaseUser['photoUrl']       ?? '',
    'provider'    => $firebaseUser['providerUserInfo'][0]['providerId'] ?? 'password',
    'loginAt'     => time(),
];

// Persist in PHP session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$_SESSION['sso_user'] = $ssoUser;

Logger::log('SSO login success: ' . $ssoUser['email']);

echo json_encode([
    'valid'       => true,
    'uid'         => $ssoUser['uid'],
    'email'       => $ssoUser['email'],
    'displayName' => $ssoUser['displayName'],
    'photoUrl'    => $ssoUser['photoUrl'],
]);
