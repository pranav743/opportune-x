<?php
use FastRoute\RouteCollector;

$dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
    $r->addRoute('GET', '/route1', ['UserController', 'route1']);
    $r->addRoute('GET', '/route2', ['UserController', 'route2']);
    $r->addRoute('POST', '/register', ['UserController','register']);
    $r->addRoute('POST', '/login', ['UserController','login']);
    $r->addRoute('POST', '/authorization', ['UserController','authorization']);


});
