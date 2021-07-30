<?php

$hostname = "localhost";
$username = "root";
$password = "";
$database = "covid";
$filename = "caso.csv";

$mysqli = new mysqli($hostname, $username, $password, $database);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$mysqli->set_charset("utf8");
?>