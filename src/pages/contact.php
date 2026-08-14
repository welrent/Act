<div class="container mt-5 pb-5">
    <div class="row mb-5 text-center justify-content-center">
        <div class="col-lg-6">
            <h1 class="display-5 fw-bold mb-3">Contact Us</h1>
            <p class="lead text-muted">Get in touch with the Welrent team. We're here to help.</p>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card p-5 border-0 shadow-sm">
                <?php if (isset($_GET['success'])): ?>
                    <div class="alert alert-success">
                        Thank you! Your message has been sent successfully.
                    </div>
                <?php endif; ?>

                <form action="<?= APP_URL ?>/contact/submit" method="POST">
                    <div class="mb-4">
                        <label for="name" class="form-label fw-medium">Full Name</label>
                        <input type="text" class="form-control form-control-lg bg-light" id="name" name="name" required placeholder="Jane Doe">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label fw-medium">Email Address</label>
                        <input type="email" class="form-control form-control-lg bg-light" id="email" name="email" required placeholder="name@company.com">
                    </div>
                    <div class="mb-4">
                        <label for="message" class="form-label fw-medium">How can we help?</label>
                        <textarea class="form-control form-control-lg bg-light" id="message" name="message" rows="5" required placeholder="I'd like to learn more about..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg w-100">Send Message</button>
                </form>
            </div>
        </div>
    </div>
</div>
