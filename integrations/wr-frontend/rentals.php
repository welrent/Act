<?php
/**
 * PATCHED wr-frontend/api/rentals.php
 * Copy over the main site rental API so every booking auto-creates an Act contract.
 *
 * GET  /api/rentals?uid=<firebase-uid>   → list user's rentals
 * POST /api/rentals                       → create a rental + Act contract
 */
require_once __DIR__ . '/../lib/db.php';
require_once __DIR__ . '/act_contract.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db = new Database();
$pdo = $db->getPDO();

if (!$pdo) {
    echo json_encode(['rentals' => [], 'note' => 'database offline']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $uid = $_GET['uid'] ?? '';
    if (!$uid) {
        http_response_code(400);
        echo json_encode(['error' => 'uid required']);
        exit();
    }

    $stmt = $pdo->prepare(
        'SELECT booking_ref, car_name, car_image, start_date, end_date, days, price, status, location, created_at
         FROM rentals
         WHERE user_uid = ?
         ORDER BY created_at DESC'
    );
    $stmt->execute([$uid]);
    $rows = $stmt->fetchAll();

    echo json_encode(['rentals' => $rows]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $required = ['uid', 'car_name', 'start_date', 'end_date', 'days', 'price'];

    foreach ($required as $field) {
        if (empty($body[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing field: $field"]);
            exit();
        }
    }

    $ref = 'WLR-' . date('Y') . '-' . strtoupper(substr(uniqid(), -5));

    $stmt = $pdo->prepare(
        'INSERT INTO rentals (booking_ref, user_uid, car_name, car_image, start_date, end_date, days, price, status, location)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $ref,
        $body['uid'],
        $body['car_name'],
        $body['car_image'] ?? null,
        $body['start_date'],
        $body['end_date'],
        (int)$body['days'],
        (float)$body['price'],
        $body['status'] ?? 'upcoming',
        $body['location'] ?? null,
    ]);

    $act = welrent_act_create_contract([
        'uid'           => $body['uid'],
        'user_email'    => $body['user_email'] ?? ($body['email'] ?? null),
        'user_name'     => $body['user_name'] ?? ($body['displayName'] ?? null),
        'booking_ref'   => $ref,
        'vehicle_type'  => $body['vehicle_type'] ?? ($body['type'] ?? 'car'),
        'car_name'      => $body['car_name'],
        'car_image'     => $body['car_image'] ?? null,
        'start_date'    => $body['start_date'],
        'end_date'      => $body['end_date'],
        'days'          => (int)$body['days'],
        'price'         => (float)$body['price'],
        'location'      => $body['location'] ?? null,
        'status'        => 'active',
        'source'        => 'wr-frontend',
    ]);

    echo json_encode([
        'booking_ref'  => $ref,
        'id'           => $pdo->lastInsertId(),
        'contract_ref' => $act['contract_ref'] ?? null,
        'contract_url' => $act['contract_url'] ?? null,
        'act'          => $act,
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
