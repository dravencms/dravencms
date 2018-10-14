<?php

if (php_sapi_name() == 'cli-server') {
    $_SERVER['SCRIPT_NAME'] = '/index.php';
    $parsedUrl = parse_url($_SERVER["REQUEST_URI"]);
    if (is_file(__DIR__.$parsedUrl['path'])) {
        return false;    // serve the requested resource as-is.
    }
}

// Uncomment this line if you must temporarily take down your site for maintenance.
// require '.maintenance.php';

// Let bootstrap create Dependency Injection container.
$container = require __DIR__ . '/../app/bootstrap.php';

// Run application.
$container->getByType('Nette\Application\Application')->run();
