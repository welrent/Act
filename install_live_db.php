<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Core/Database.php';

try {
    $pdo = Database::getInstance()->getConnection();
    
    $sql = "CREATE TABLE IF NOT EXISTS ui_translations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lang_code VARCHAR(10) NOT NULL,
        trans_key VARCHAR(100) NOT NULL,
        trans_value TEXT NOT NULL,
        UNIQUE KEY lang_key (lang_code, trans_key)
    )";
    $pdo->exec($sql);
    
    $default_data = [
        'en' => [
            'back_to_home' => 'Back to Home',
            'not_logged_in' => 'You are not logged in',
            'search_placeholder' => 'Search...',
            'search_shortcut' => 'K',
            'terms_of_use' => 'Terms of Use',
            'terms_desc' => 'Review the rules and guidelines for using the platform.',
            'accessibility' => 'Accessibility Statement',
            'accessibility_desc' => 'Our ongoing commitment to digital accessibility for all users.',
            'privacy' => 'Privacy Statement',
            'privacy_desc' => 'Information on how we collect, use, and protect your data.',
            'cookie' => 'Cookie Statement',
            'cookie_desc' => 'Details regarding our use of cookies and tracking tech.',
            'car_rental' => 'Car Rental Agreement',
            'boat_rental' => 'Boat Rental Agreement',
            'equip_rental' => 'Equipment Rental Agreement',
            'welcome_msg' => 'Welcome',
            'welcome_bio' => 'Manage all your rental agreements safely and securely.'
        ],
        'fr' => [
            'back_to_home' => 'Retour à l\'accueil',
            'not_logged_in' => 'Vous n\'êtes pas connecté',
            'search_placeholder' => 'Recherche...',
            'search_shortcut' => 'K',
            'terms_of_use' => 'Conditions d\'utilisation',
            'terms_desc' => 'Consultez les règles et directives d\'utilisation de la plateforme.',
            'accessibility' => 'Déclaration d\'accessibilité',
            'accessibility_desc' => 'Notre engagement continu envers l\'accessibilité numérique.',
            'privacy' => 'Déclaration de confidentialité',
            'privacy_desc' => 'Informations sur la collecte, l\'utilisation et la protection de vos données.',
            'cookie' => 'Déclaration sur les cookies',
            'cookie_desc' => 'Détails concernant notre utilisation des cookies et technologies de suivi.',
            'car_rental' => 'Contrat de location de voiture',
            'boat_rental' => 'Contrat de location de bateau',
            'equip_rental' => 'Contrat de location d\'équipement',
            'welcome_msg' => 'Bienvenue',
            'welcome_bio' => 'Gérez tous vos contrats de location rapidement et en toute simplicité.'
        ],
        'es' => [
            'back_to_home' => 'Volver atrás',
            'not_logged_in' => 'No has iniciado sesión',
            'search_placeholder' => 'Buscar...',
            'search_shortcut' => 'K',
            'terms_of_use' => 'Términos de servicio',
            'terms_desc' => 'Revise las reglas y pautas para usar la plataforma.',
            'accessibility' => 'Declaración de accesibilidad',
            'accessibility_desc' => 'Nuestro compromiso continuo con la accesibilidad digital para todos los usuarios.',
            'privacy' => 'Declaración de privacidad',
            'privacy_desc' => 'Información sobre cómo recopilamos, usamos y protegemos sus datos.',
            'cookie' => 'Declaración de cookies',
            'cookie_desc' => 'Detalles sobre nuestro uso de cookies y tecnología de seguimiento.',
            'car_rental' => 'Contrato de alquiler de coches',
            'boat_rental' => 'Contrato de alquiler de barcos',
            'equip_rental' => 'Contrato de alquiler de equipos',
            'welcome_msg' => 'Bienvenido',
            'welcome_bio' => 'Gestione todos sus contratos de forma segura y sencilla.'
        ],
        'nl' => [
            'back_to_home' => 'Terug naar start',
            'not_logged_in' => 'U bent niet ingelogd',
            'search_placeholder' => 'Zoeken...',
            'search_shortcut' => 'K',
            'terms_of_use' => 'Gebruiksvoorwaarden',
            'terms_desc' => 'Bekijk de regels en richtlijnen voor het gebruik van de site.',
            'accessibility' => 'Toegankelijkheidsverklaring',
            'accessibility_desc' => 'Onze toewijding aan digitale toegankelijkheid voor alle gebruikers.',
            'privacy' => 'Privacyverklaring',
            'privacy_desc' => 'Informatie over hoe we uw gegevens verzamelen en beschermen.',
            'cookie' => 'Cookieverklaring',
            'cookie_desc' => 'Details over ons gebruik van cookies en trackingtechnologie.',
            'car_rental' => 'Autohuur Overeenkomst',
            'boat_rental' => 'Boothuur Overeenkomst',
            'equip_rental' => 'Materiaalhuur Overeenkomst',
            'welcome_msg' => 'Welkom',
            'welcome_bio' => 'Beheer al uw huurovereenkomsten veilig en eenvoudig.'
        ]
    ];
    
    foreach($default_data as $code => $data) {
        foreach($data as $k => $v) {
            $stmt = $pdo->prepare("INSERT IGNORE INTO ui_translations (lang_code, trans_key, trans_value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE trans_value = VALUES(trans_value)");
            $stmt->execute([$code, $k, $v]);
        }
    }
    echo "<div style='font-family:sans-serif; text-align:center; margin-top:50px;'>";
    echo "<h2 style='color:green;'>SUCCESS: UI Translations Table Installed!</h2>";
    echo "<p>Please delete this file from your live server now.</p>";
    echo "</div>";
} catch (Exception $e) {
    echo "<h2 style='color:red;'>ERROR: " . $e->getMessage() . "</h2>";
}
