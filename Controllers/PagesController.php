<?php
class PagesController extends Controller {
    public function show($slug) {
        $db = Database::getInstance()->getConnection();
        
        $stmt = $db->prepare("SELECT * FROM pages WHERE slug = :slug LIMIT 1");
        $stmt->execute(['slug' => $slug]);
        $page = $stmt->fetch();

        if (!$page) {
            $this->notFound();
            return;
        }

        $this->view('page', [
            'title' => $page['title'],
            'page' => $page
        ]);
    }

    public function notFound() {
        http_response_code(404);
        $this->view('404', [
            'title' => 'Page Not Found'
        ]);
    }
}
