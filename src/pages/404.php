<style>
/* Clean 404 Styling */
.not-found-wrapper {
    max-width: 800px;
    margin: 100px auto;
    text-align: center;
    font-family: inherit;
}
.not-found-title {
    font-size: 80px;
    font-weight: 800;
    color: #2F214B;
    margin-bottom: 20px;
}
.not-found-desc {
    font-size: 18px;
    color: #8C8C91;
    margin-bottom: 40px;
}
.btn-back-home {
    background-color: #F4F5F6;
    color: #2F214B;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    display: inline-block;
    transition: background-color 0.2s;
}
.btn-back-home:hover {
    background-color: #E2E2E6;
}
</style>

<div class="not-found-wrapper">
    <div class="not-found-title">404</div>
    <div class="not-found-desc">The page you are looking for does not exist.</div>
    <a href="<?= APP_URL ?? '/' ?>" class="btn-back-home">Go Back Home</a>
</div>
