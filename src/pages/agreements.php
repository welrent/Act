<div class="container mt-5 pb-5">
    <div class="row mb-5">
        <div class="col-lg-8">
            <h1 class="display-5 fw-bold mb-3">All Agreements</h1>
            <p class="lead text-muted">A comprehensive directory of our standard forms and contracts.</p>
        </div>
    </div>

    <div class="row g-4">
        <?php if (!empty($agreements)): ?>
            <?php foreach ($agreements as $agreement): ?>
                <div class="col-md-6">
                    <div class="card p-4 border-0 shadow-sm h-100">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h4 class="card-title fw-semibold mb-0"><?= htmlspecialchars($agreement['title']) ?></h4>
                        </div>
                        <p class="text-muted"><?= htmlspecialchars($agreement['description'] ?? '') ?></p>
                        <!-- In the future, link to full agreement content view -->
                        <div class="mt-auto">
                            <button class="btn btn-outline-primary btn-sm">Read Agreement</button>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <div class="col-12 text-center mt-5">
                <h5 class="text-muted">No agreements found. Check back later or create some from the Admin Panel.</h5>
            </div>
        <?php endif; ?>
    </div>
</div>
