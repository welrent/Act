<?php require_once __DIR__ . '/../../Core/Shortcodes.php'; ?>
<div class="container mt-5 mb-5 pb-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-5"><?= htmlspecialchars($page['title']) ?></h1>
            <div class="content fs-5 text-dark" style="line-height: 1.8;">
                <!-- Content mapped via physical shortcode filter mechanism -->
                <?= Shortcodes::parse($page['content']) ?>
            </div>
        </div>
    </div>
</div>
