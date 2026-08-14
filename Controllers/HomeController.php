<?php
class HomeController extends Controller {
    public function index() {
        $db = Database::getInstance()->getConnection();
        
        // Let's fetch some recent agreements for the homepage
        $stmt = $db->query("SELECT * FROM agreements ORDER BY created_at DESC LIMIT 3");
        $recentAgreements = $stmt->fetchAll();

        $this->view('home', [
            'title' => 'Welrent Act - Smart Agreements',
            'recentAgreements' => $recentAgreements
        ]);
    }
}
