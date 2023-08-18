<?php
$request_uri = $_SERVER['REQUEST_URI'];

switch ($request_uri) {
    case '/':
        include('./api/routes/home.php');
        echo json_encode(array("route" => $request_uri));
        break;
    case '/about':
        include('./api/routes/about.php');
        break;
    default:
        include('./api/routes/error.php');
        break;
}
?>
