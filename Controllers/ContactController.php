<?php
class ContactController extends Controller {
    public function index() {
        $this->view('contact', [
            'title' => 'Contact Us - Welrent Act'
        ]);
    }

    public function submit() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Process contact form... this would send an email in production
            $name = htmlspecialchars($_POST['name'] ?? '');
            $email = htmlspecialchars($_POST['email'] ?? '');
            $message = htmlspecialchars($_POST['message'] ?? '');
            
            // For now, redirect back to contact with success parameter
            header("Location: " . APP_URL . "/contact?success=1");
            exit;
        }
    }
}
