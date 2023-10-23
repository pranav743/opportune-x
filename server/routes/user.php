<?php
use FastRoute\RouteCollector;

$dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {

    // User
    $r->addRoute('GET', '/route1', ['UserController', 'route1']);
    $r->addRoute('GET', '/route2', ['UserController', 'route2']);
    $r->addRoute('POST', '/register', ['UserController','register']);
    $r->addRoute('POST', '/login', ['UserController','login']);
    $r->addRoute('POST', '/authorization', ['UserController','authorization']);
    
    // Internship 
    $r->addRoute('GET', '/internship', ['InternshipController','route1']);
    $r->addRoute('GET', '/internship/search/{search}', ['InternshipController','searchInternshipsByTitle']);
    $r->addRoute('GET', '/internship/{id}', ['InternshipController','getInternshipById']);
    $r->addRoute('POST', '/apply/internship', ['InternshipController','applyForInternship']);





    // Courses
    $r->addRoute('GET', '/courses/all', ['CourseController','getAllCourses']);
    $r->addRoute('GET', '/courses/category/{category}', ['CourseController','getCoursesByCategory']);
    $r->addRoute('GET', '/courses/search/{search}', ['CourseController','searchCoursesByTitle']);
    $r->addRoute('GET', '/courses/{id}', ['CourseController','getCourseById']);







});
