<?php

require_once '../vendor/autoload.php';

use App\Core\Routes;

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

$routes = new Routes();
$routes->Dispatch($requestMethod, $requestUri);
