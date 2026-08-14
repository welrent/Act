<?php
require_once __DIR__ . '/../../Core/Database.php';
require_once __DIR__ . '/../../Core/Language.php';
$searchQuery = $_GET['q'] ?? '';
$results = [];

if (strlen($searchQuery) > 1) {
    try {
        $pdo = Database::getInstance()->getConnection();
        $stmt = $pdo->prepare("SELECT title, slug, content FROM pages WHERE title LIKE :q OR content LIKE :q LIMIT 20");
        $stmt->execute(['q' => '%' . $searchQuery . '%']);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {}
}
?>
        <div style="background-color: #2A303C; border-radius: 8px; padding: 40px; margin-bottom: 2rem; color: #FFF;">
            <h1 style="font-weight: 800; font-size: 32px; margin:0;">Search Results</h1>
            <p style="color: #8EB9FF; margin-top: 8px; margin-bottom: 0;">Showing matches for: <strong><?= htmlspecialchars($searchQuery) ?></strong></p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
            <?php if(empty($results) && !empty($searchQuery)): ?>
                <div class="design-message interactive" style="text-align: center; padding: 40px;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🔍</div>
                    <strong style="color: #8C8C91; font-size: 18px; display:block;">No records matched your search.</strong>
                    <span style="font-size: 14px; color: #BDBDBD;">Double check your spelling or try broader terms!</span>
                </div>
            <?php elseif(empty($searchQuery)): ?>
                 <div class="design-message" style="color: #8C8C91;">Type a query in the top search bar to begin.</div>
            <?php else: ?>
                <?php foreach($results as $r): ?>
                    <a href="<?= APP_URL ?? '' ?>/page/<?= $r['slug'] ?>" class="design-message interactive" style="text-decoration: none; display: flex; flex-direction: column;">
                        <strong style="color: #2F214B; font-size: 18px; margin-bottom: 6px;"><?= htmlspecialchars($r['title']) ?></strong>
                        <span style="font-size: 14px; color: #8C8C91;">
                            <?= htmlspecialchars(substr(strip_tags($r['content']), 0, 180)) ?>...
                        </span>
                        <div style="margin-top: 12px; font-size: 12px; font-weight: 600; color: #EF4135;">Read Document &rarr;</div>
                    </a>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
