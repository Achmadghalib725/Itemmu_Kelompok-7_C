<?php

// Database configuration
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root'); // Ganti dengan username MySQL Anda
define('DB_PASSWORD', ''); // Ganti dengan password MySQL Anda
define('DB_NAME', 'itemmu_db');

// Attempt to connect to MySQL database
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>