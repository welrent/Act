<?php
class Language {
    private $translations = [];
    private $currentLang = 'en';

    public function __construct() {
        $allowedLangs = ['en', 'fr', 'nl', 'es'];
        
        // Handle URL lang switch
        if (isset($_GET['lang']) && in_array(strtolower($_GET['lang']), $allowedLangs)) {
            $_SESSION['lang'] = strtolower($_GET['lang']);
        }
        
        // Get current lang from session
        if (isset($_SESSION['lang']) && in_array($_SESSION['lang'], $allowedLangs)) {
            $this->currentLang = $_SESSION['lang'];
        } else {
            $this->currentLang = 'en';
            $_SESSION['lang'] = 'en';
        }

        // Load translations from DB natively
        try {
            require_once __DIR__ . '/Database.php';
            $pdo = Database::getInstance()->getConnection();
            $stmt = $pdo->prepare("SELECT trans_key, trans_value FROM ui_translations WHERE lang_code = ?");
            $stmt->execute([$this->currentLang]);
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $this->translations[$row['trans_key']] = $row['trans_value'];
            }
        } catch (Exception $e) { /* ignore db errors transparently falling back */ }
    }

    public function get($key, $default = null) {
        return $this->translations[$key] ?? $default;
    }
    
    public function current() {
        return $this->currentLang;
    }
}
