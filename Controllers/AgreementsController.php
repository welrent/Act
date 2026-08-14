<?php
class AgreementsController extends Controller {
    public function index() {
        $db = Database::getInstance()->getConnection();
        
        $stmt = $db->query("SELECT * FROM agreements ORDER BY title ASC");
        $agreements = $stmt->fetchAll();

        $this->view('agreements', [
            'title' => 'Agreements - Welrent Act',
            'agreements' => $agreements
        ]);
    }
}
