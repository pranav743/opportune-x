<?php

    require 'vendor/autoload.php';
    require_once 'config.php';
    $user = DB_USER;
    $pass = DB_PASS;
    function getDatabase() {
        global $user, $pass;
        $client = new MongoDB\Client("mongodb+srv://$user:$pass@php-project-opportune.vxme9xr.mongodb.net/?retryWrites=true&w=majority");
        return $client->selectDatabase("basic1");
    }

?>

