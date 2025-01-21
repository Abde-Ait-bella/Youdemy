<?php

namespace App\Core;

use App\Controllers\CourseController;
use App\Controllers\CategoryController;
use App\Controllers\TagController;
use App\Controllers\UserController;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

class Routes
{
    private array $routes = [
        "POST" => [
            "/tags" => [TagController::class, "create"],
            "/categories" => [CategoryController::class, "create"],
            "/courses" => [CourseController::class, "create"],
            "/users" => [UserController::class, "create"],
            "/users/login" => [UserController::class, "login"],
        ],
        "GET" => [
            "/tags" => [TagController::class, "index"],
            "/categories" => [CategoryController::class, "index"],
            "/courses" => [CourseController::class, "index"],
            "/users" => [UserController::class, "index"],
        ],
        "PUT" => [
            "/tags" => [TagController::class, "update"],
            "/categories" => [CategoryController::class, "update"],
            "/courses" => [CourseController::class, "update"],
            "/users" => [UserController::class, "update"],
        ],
        "DELETE" => [
            "/tags" => [TagController::class, "delete"],
            "/categories" => [CategoryController::class, "delete"],
            "/courses" => [CourseController::class, "delete"],
            "/users" => [UserController::class, "delete"],
        ],
    ];

    public function dispatch($method, $uri)
    {
        // Handle OPTIONS preflight requests
        if ($method === 'OPTIONS') {
            http_response_code(204); // No Content
            exit;
        }

        $path = parse_url($uri, PHP_URL_PATH);
        $queryParams = [];
        $queryString = parse_url($uri, PHP_URL_QUERY);

        if (!is_null($queryString)) {
            parse_str($queryString, $queryParams);
        }

        $bodyParams = [];
        if (in_array($method, ['POST', 'PUT'])) {
            $bodyParams = json_decode(file_get_contents('php://input'), true) ?? [];
        }

        $request = array_merge($queryParams, $bodyParams);

        if (isset($this->routes[$method][$path])) {
            [$class, $method] = $this->routes[$method][$path];
            $controller = new $class();
            $controller->$method($request);
        }
    }
}
