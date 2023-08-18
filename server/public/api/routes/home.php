<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Check if it's a preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$jsonInput = file_get_contents('php://input');
$data = json_decode($jsonInput, true);

if (isset($data['username'])) {
    $username = $data['username'];
    $response = "Your username is $username";

    // Set the Content-Type header to indicate JSON response
    header('Content-Type: application/json');

    // Encode the response as JSON and echo it
    echo json_encode(array("message" => $response));
}
else {
    echo json_encode(array("success" => false, "msg" => "This is a post Route"));
}
?>

