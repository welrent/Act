<?php
/**
 * Simulated Next.js Route Server
 */
require_once __DIR__ . '/main.php';
require_once __DIR__ . '/Core/Controller.php'; // Keep for backwards compat methods? No, rewrite.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Strip application base if needed (e.g. localhost/)
$base = str_replace('/index.php', '', $_SERVER['SCRIPT_NAME']);
$route = str_replace($base, '', $uri);

if ($route == '' || $route == '/') {
    $route = '/index';
}

// ── SSO & API Route Dispatcher ─────────────────────────────────────────────
// Any route matching /api/* is dispatched directly to src/pages/api/{name}.php
// This keeps Next.js-style API route conventions intact.
if (strpos($route, '/api/') === 0) {
    // Normalise nested routes: /api/sso/verify → api-sso-verify.php fallback
    // First try exact: /api/sso/verify → src/pages/api/sso/verify.php
    $apiPath = __DIR__ . '/src/pages' . $route . '.php';

    // If not found, try a flat slug: /api/sso/verify → src/pages/api/sso-verify.php
    if (!file_exists($apiPath)) {
        $apiSlug = ltrim(str_replace('/api/', '', $route), '/');
        $apiSlug = str_replace('/', '-', $apiSlug);
        $apiPath = __DIR__ . '/src/pages/api/' . $apiSlug . '.php';
    }

    if (file_exists($apiPath)) {
        require_once $apiPath;
    } else {
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint not found', 'route' => $route]);
    }
    exit;
}
// ─────────────────────────────────────────────────────────────────────────────

$pagePath = __DIR__ . '/src/pages' . $route . '.php';

// Dynamic route: /portal/{username} → src/pages/portal.php
if (strpos($route, '/portal/') === 0 || $route === '/portal') {
    $portalSlug = trim(str_replace('/portal/', '', $route), '/');
    $_GET['username'] = $portalSlug;
    $pagePath = __DIR__ . '/src/pages/portal.php';
}

// Dynamic route matching for /page/slug
if (strpos($route, '/page/') === 0) {
    $slug = str_replace('/page/', '', $route);
    $_GET['slug'] = $slug; 
    $pagePath = __DIR__ . '/src/pages/page.php';
}

// NextJS-style routing simulation
if (file_exists($pagePath)) {
    if ($pagePath === __DIR__ . '/src/pages/index.php') {
        require_once 'Controllers/HomeController.php';
        $controller = new HomeController();
        $controller->index();
        exit;
    } else if ($pagePath === __DIR__ . '/src/pages/page.php') {
        require_once 'Controllers/PagesController.php';
        $controller = new PagesController();
        $controller->show($_GET['slug']);
        exit;
    } else if ($pagePath === __DIR__ . '/src/pages/portal.php') {
        // Portal profile page — render with full layout
        require_once 'Core/Controller.php';
        $portalSlug = $_GET['username'] ?? '';
        $controller = new Controller();
        $controller->view('portal', [
            'title'      => 'My Profile',
            'portalSlug' => $portalSlug,
        ]);
        exit;
    } else if (file_exists('Controllers/' . ucfirst(trim($route, '/')) . 'Controller.php')) {
        $cName = ucfirst(trim($route, '/')) . 'Controller';
        require_once 'Controllers/' . $cName . '.php';
        $controller = new $cName();
        $controller->index();
        exit;
    } else {
        // Fallback to static render or 404
        require_once 'Controllers/PagesController.php';
        $fallback = new PagesController();
        $fallback->notFound();
    }
} else {
    // Route not found
    require_once 'Controllers/PagesController.php';
    $fallback = new PagesController();
    $fallback->notFound();
}
