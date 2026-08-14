<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="mb-5 text-center">
                <span class="text-primary fw-medium mb-3 d-inline-block"><?= date('F j, Y', strtotime($post['created_at'])) ?></span>
                <h1 class="display-4 fw-bold mb-4"><?= htmlspecialchars($post['title']) ?></h1>
            </div>
            
            <?php if(!empty($post['image_path'])): ?>
                <img src="<?= htmlspecialchars(APP_URL . '/' . ltrim($post['image_path'], '/')) ?>" class="img-fluid rounded mb-5 w-100" alt="<?= htmlspecialchars($post['title']) ?>" style="max-height: 400px; object-fit: cover;">
            <?php endif; ?>
            
            <div class="content fs-5 text-dark" style="line-height: 1.8;">
                <!-- Content is assumed to be raw HTML from MilkAdmin's rich text editor -->
                <?= $post['content'] ?>
            </div>

            <div class="mt-5 pt-4 border-top">
                <a href="<?= APP_URL ?>/posts" class="btn btn-outline-secondary">&larr; Back to all posts</a>
            </div>
        </div>
    </div>
</div>
