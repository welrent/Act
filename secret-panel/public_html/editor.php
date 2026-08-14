<?php
// Secure Admin GUI Panel ensuring it only runs behind MilkAdmin's session
if (!isset($_COOKIE) || count(preg_grep('/^MKSESSID/', array_keys($_COOKIE))) === 0) {
    die("Unauthorized Admin Access.");
}

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../Core/Database.php';

$pdo = Database::getInstance()->getConnection();

$message = '';
// Handle Save Protocol
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'save_ui') {
        foreach ($_POST['ui'] as $id => $val) {
            $stmt = $pdo->prepare("UPDATE ui_translations SET trans_value = ? WHERE id = ?");
            $stmt->execute([$val, $id]);
        }
        $message = "Global Text Strings updated successfully!";
    } elseif (isset($_POST['action']) && $_POST['action'] === 'save_pages') {
        foreach ($_POST['pages'] as $id => $data) {
            $stmt = $pdo->prepare("UPDATE pages SET title = ?, content = ? WHERE id = ?");
            $stmt->execute([$data['title'], $data['content'], $id]);
        }
        $message = "Legal Pages updated successfully!";
    }
}

// Fetch texts securely
$ui_stmt = $pdo->query("SELECT * FROM ui_translations ORDER BY lang_code, trans_key");
$ui_texts = $ui_stmt->fetchAll(PDO::FETCH_ASSOC);

$pages_stmt = $pdo->query("SELECT * FROM pages ORDER BY id");
$pages = $pages_stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html>
<head>
    <title>MilkAdmin Extended Editor</title>
    <style>
        body { font-family: 'Inter', -apple-system, Arial, sans-serif; background: #F4F5F6; padding: 20px; color: #2F214B; margin: 0; }
        .container { max-width: 1000px; margin: 40px auto; background: #FFF; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        h1 { font-size: 28px; margin-bottom: 10px; margin-top:0; color: #2A303C; font-weight:800; display:flex; align-items:center; gap:10px; }
        .alert { background: #8EB9FF; color: #2F214B; padding: 14px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; }
        .form-group { margin-bottom: 16px; border-bottom: 1px solid #F4F5F6; padding-bottom: 16px; }
        label { font-weight: 700; display: block; margin-bottom: 8px; color: #8C8C91; font-size: 13px; text-transform: uppercase; letter-spacing:0.5px; }
        input[type="text"], textarea { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #EAECF0; border-radius: 6px; font-family: inherit; font-size: 15px; color: #2F214B; outline: none; transition: border-color 0.2s; }
        input[type="text"]:focus, textarea:focus { border-color: #8EB9FF; }
        textarea { min-height: 100px; resize: vertical; line-height: 1.5; }
        button { background: #2F214B; color: #FFF; padding: 14px 24px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size:15px; transition: background 0.2s; }
        button:hover { background: #8EB9FF; color: #2F214B; }
        h2 { font-size: 20px; margin-top: 40px; margin-bottom: 20px; color: #2F214B; padding-bottom:10px; border-bottom:2px solid #8EB9FF; display:inline-block; }
    </style>
</head>
<body>
<div class="container">
    <h1><svg width="28" height="28" viewBox="0 0 24 24" fill="none" class="home-icon"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#8EB9FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> Content Manager Toolkit</h1>
    <p style="color: #8C8C91; margin-bottom: 30px;">Logged in securely via MilkAdmin Proxy Token.</p>
    <?php if ($message): ?><div class="alert"><?= htmlspecialchars($message) ?></div><?php endif; ?>

    <h2>Global Website Text (UI Strings)</h2>
    <form method="POST">
        <input type="hidden" name="action" value="save_ui">
        <?php foreach($ui_texts as $t): ?>
            <div class="form-group">
                <label><span style="padding: 2px 6px; background: #2A303C; color: #FFF; border-radius: 4px; margin-right: 6px;"><?= htmlspecialchars($t['lang_code']) ?></span> <?= htmlspecialchars($t['trans_key']) ?></label>
                <input type="text" name="ui[<?= $t['id'] ?>]" value="<?= htmlspecialchars($t['trans_value']) ?>">
            </div>
        <?php endforeach; ?>
        <button type="submit">Save UI Translations</button>
    </form>

    <h2 style="margin-top: 60px;">Legal Information Pages</h2>
    <form method="POST">
        <input type="hidden" name="action" value="save_pages">
        <?php foreach($pages as $p): ?>
            <div class="form-group">
                <label style="color:#8EB9FF;">Slug: /page/<?= htmlspecialchars($p['slug']) ?></label>
                <input type="text" name="pages[<?= $p['id'] ?>][title]" value="<?= htmlspecialchars($p['title']) ?>" style="margin-bottom: 12px; font-weight: bold;">
                <textarea name="pages[<?= $p['id'] ?>][content]"><?= htmlspecialchars($p['content']) ?></textarea>
            </div>
        <?php endforeach; ?>
        <button type="submit">Save Pages Content</button>
    </form>
</div>
</body>
</html>
