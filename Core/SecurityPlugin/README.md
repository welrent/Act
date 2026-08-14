# php-security-plugin

[![made-with-PHP](https://img.shields.io/badge/made%20with-PHP-blue.svg)](https://www.php.net/)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![issues](https://img.shields.io/github/issues/putunebandi/php-security-plugin?color=blue)](https://github.com/putunebandi/php-security-plugin/issues)

<p align="center">
  <img src="https://gist.githubusercontent.com/putunebandi/7bafeac9025f05612c54fd4698f26226/raw/6170bbca395bedcfd8ca5bc4d768b0392f5b3302/picture_BandiSecurity.png" alt="BandiSecurity Logo" width="40%">
</p>

This project is a simple implementation to improve security in PHP applications. The Security class provides several basic security features, including setting security headers and filtering parameters to protect against potential attacks.

---

| :exclamation:  **Disclaimer**  |
|---------------------------------|
| This plugin is created solely for educational purposes and to provide an additional layer of security against cyber attacks. While it can help reduce risks, **it is highly recommended to continue using a comprehensive Security Information and Event Management (SIEM) system for optimal protection.** We explicitly state that we are not responsible for any illegal actions taken through the use of this plugin." |

## Resources

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Thanks](#thanks)

## Installation

You can use this security plugin easily by simply copying or download the code from the [BandiSecurity.php](BandiSecurity.php) and including the script into the main configuration or header file.

## Usage

You can enhance the security layer of your PHP project by utilizing the 'Security' class. It offers easy integration and can be customized to meet your specific needs. Here's an example code snippet for implementation.

1. Using .htaccess
```text
php_value auto_prepend_file '/home/putunebandi/php-security-plugin/BandiSecurity.php'
```
2. Using include_once() or require_once()
```php
<?php
// ...
include_once('BandiSecurity.php');
// or use
require_once('BandiSecurity.php');
// ...
?>
```
3. Adding Code to Main Configuration or Header
```php
<?php

// Simple PHP Security Plugin
// Coded by Rizki Wahyu Pratama
// Thanks to Afrizal F.A, incrustwerush.org, @dwisiswant0, noobsec.org

if (!class_exists('Security')) {
    class Security
    {
        // ...
        // ...
    }

    Security::setHeaders();
    Security::applySecurity();
}
?>
<?php
// Your config or header here
?>
```

## License

Please see the [LICENSE file](LICENSE) for more information.

## Thanks
Thanks for some references and ideas for making this tool

- [In Crust We Rush - PHP Security Plugin](https://github.com/ICWR-TECH/PHP-Security-Plugin)
- [noobSecurity - AntiScanScanClub](https://github.com/noobsec/AntiScanScanClub-laravel)
