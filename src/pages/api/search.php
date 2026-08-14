<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../../config.php';
require_once __DIR__ . '/../../../Core/Database.php';
require_once __DIR__ . '/../../../Core/Logger.php'; // Will create this next

$q = $_GET['q'] ?? '';
if (strlen($q) < 2) {
    echo json_encode(['results' => []]);
    exit;
}

Logger::log("Search API Query: " . $q);

$pdo = Database::getInstance()->getConnection();
$wildcard = "%{$q}%";

$results = [];

// Search Pages table
try {
    $stmt = $pdo->prepare("SELECT title, slug FROM pages WHERE title LIKE :q OR content LIKE :q LIMIT 5");
    $stmt->execute(['q' => $wildcard]);
    $pages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($pages as $p) {
        $results[] = [
            'title' => $p['title'],
            'url' => (defined('APP_URL') ? APP_URL : '') . '/page/' . $p['slug'],
            'type' => 'Page'
        ];
    }
} catch (Exception $e) {}

// Log search footprint globally into SQL
try {
    if(strlen($q) >= 2) {
        $logger = $pdo->prepare("INSERT INTO search_logs (query, ip_address, results_count) VALUES (:q, :ip, :rc)");
        $logger->execute([
            'q' => trim($q), 
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN',
            'rc' => count($results)
        ]);
    }
} catch (Exception $e) {}

// Return array structure properly formatted
echo json_encode(['results' => $results]);
