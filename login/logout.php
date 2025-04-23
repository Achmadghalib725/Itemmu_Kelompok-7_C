<?php
// Initialize the session
session_start();

// Define response array
$response = array('success' => false);

// Unset all of the session variables
$_SESSION = array();

// Destroy the session
if (session_destroy()) {
    $response['success'] = true;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>