<div class="container mt-5 pb-5">
    <div class="row align-items-center mb-5">
        <div class="col-md-8">
            <h1 class="display-5 fw-bold mb-2">Blog & Updates</h1>
            <p class="lead text-muted">Latest news, articles, and product updates from Welrent.</p>
        </div>
    </div>

    <div class="row g-5">
        <?php if (!empty($posts)): ?>
            <?php foreach ($posts as $post): ?>
                <div class="col-md-6 mb-4">
                    <div class="card h-100 border-0 shadow-sm border-radius-lg overflow-hidden">
                        <?php if(!empty($post['image_path'])): ?>
                            <img src="<?= htmlspecialchars(APP_URL . '/' . ltrim($post['image_path'], '/')) ?>" class="card-img-top" alt="<?= htmlspecialchars($post['title']) ?>" style="height: 200px; object-fit: cover;">
                        <?php endif; ?>
                        <div class="card-body p-4">
                            <span class="text-primary fw-medium small mb-2 d-block"><?= date('F j, Y', strtotime($post['created_at'])) ?></span>
                            <h3 class="card-title h4 fw-bold mb-3">
                                <a href="<?= APP_URL ?>/post/<?= htmlspecialchars($post['slug']) ?>" class="text-dark text-decoration-none">
                                    <?= htmlspecialchars($post['title']) ?>
                                </a>
                            </h3>
                            <p class="card-text text-muted">
                                <?= htmlspecialchars(substr(strip_tags($post['content']), 0, 150)) ?>...
                            </p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="col-12 text-center text-muted mt-5">
                <h4>No posts published yet.</h4>
            </div>
        <?php endif; ?>
    </div>
</div>
