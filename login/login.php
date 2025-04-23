<?php
// Initialize the session
session_start();

// Include config file - update path
require_once "../config.php";

// Define response array
$response = array('success' => false, 'message' => '', 'username' => '');

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Get JSON data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Check if email and password are set
    if(isset($data["email"]) && isset($data["password"])){
        
        // Prepare a select statement
        $sql = "SELECT id, username, email, password FROM users WHERE email = ?";
        
        if($stmt = mysqli_prepare($conn, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            
            // Set parameters
            $param_email = $data["email"];
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if email exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $email, $password);
                    if(mysqli_stmt_fetch($stmt)){
                        // Verifikasi password tanpa enkripsi (langsung membandingkan string)
                        if($data["password"] === $password){
                            // Password is correct, start a new session
                            session_regenerate_id();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;
                            $_SESSION["email"] = $email;
                            
                            // Set response
                            $response['success'] = true;
                            $response['message'] = 'Login successful';
                            $response['username'] = $username;
                        } else{
                            // Password is not valid
                            $response['message'] = "Password yang Anda masukkan tidak valid.";
                        }
                    }
                } else{
                    // Email doesn't exist
                    $response['message'] = "Email tidak ditemukan.";
                }
            } else{
                $response['message'] = "Oops! Terjadi kesalahan. Silakan coba lagi nanti.";
            }

            // Close statement
            mysqli_stmt_close($stmt);
        }
    } else {
        $response['message'] = "Email dan password diperlukan.";
    }
    
    // Close connection
    mysqli_close($conn);
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>