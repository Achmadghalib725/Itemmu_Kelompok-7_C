<?php
// Initialize the session
session_start();

// Define response array
$response = array('loggedin' => false, 'username' => '', 'email' => '');

// Check if the user is logged in
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    $response['loggedin'] = true;
    $response['username'] = $_SESSION["username"];
    $response['email'] = $_SESSION["email"];
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>  