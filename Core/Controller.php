<?php
class Controller {
    public function view($view, $data = []) {
        global $lang;
        
        // Extract data to variables
        extract($data);
        
        // Next.js style layout handling
        if ($view === 'home') $view = 'index';

        $contentView = 'src/pages/' . $view . '.php';
        if (file_exists($contentView)) {
            require_once 'src/pages/layout.php';
        } else {
            die("View does not exist: " . $view);
        }
    }
}

