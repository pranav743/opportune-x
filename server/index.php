<?php
// Allow requests from any origin (not recommended for production)
header("Access-Control-Allow-Origin: *");

// Allow specified HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specified HTTP headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the maximum age for preflight requests (in seconds)
header("Access-Control-Max-Age: 3600"); // Cache preflight requests for 1 hour

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php'; // Autoload FastRoute and other dependencies
require 'controllers/UserController.php';
require 'controllers/InternshipController.php';
require 'controllers/CourseController.php';
require 'routes/user.php';
require './database/db.php';

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Remove query string and trim trailing slash
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode(rtrim($uri, '/'));

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo 'Not Found';
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo 'Method Not Allowed';
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        $controllerName = $handler[0];
        $method = $handler[1];
        $controller = new $controllerName();
        // $controller->$method();
        $controller->$method($request=null, $response=null, $vars);
        break;
}
