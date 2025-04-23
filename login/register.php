<?php
// Include config file
require_once "../config.php";

// Define response array
$response = array('success' => false, 'message' => '');

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Get JSON data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validate username, email, and password
    if(empty($data["username"])){
        $response['message'] = "Silakan masukkan username.";
    } elseif(empty($data["email"])){
        $response['message'] = "Silakan masukkan email.";
    } elseif(empty($data["password"])){
        $response['message'] = "Silakan masukkan password.";
    } elseif(strlen($data["password"]) < 6){
        $response['message'] = "Password harus minimal 6 karakter.";
    } else{
        
        // Check if email already exists
        $sql = "SELECT id FROM users WHERE email = ?";
        
        if($stmt = mysqli_prepare($conn, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            $param_email = $data["email"];
            
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $response['message'] = "Email ini sudah terdaftar.";
                } else{
                    // Check if username already exists
                    $sql = "SELECT id FROM users WHERE username = ?";
                    
                    if($stmt = mysqli_prepare($conn, $sql)){
                        mysqli_stmt_bind_param($stmt, "s", $param_username);
                        $param_username = $data["username"];
                        
                        if(mysqli_stmt_execute($stmt)){
                            mysqli_stmt_store_result($stmt);
                            
                            if(mysqli_stmt_num_rows($stmt) == 1){
                                $response['message'] = "Username ini sudah digunakan.";
                            } else{
                                // Email and username are available, insert new user
                                $sql = "INSERT INTO users (username, email, password, newsletter) VALUES (?, ?, ?, ?)";
                                
                                if($stmt = mysqli_prepare($conn, $sql)){
                                    mysqli_stmt_bind_param($stmt, "sssi", $param_username, $param_email, $param_password, $param_newsletter);
                                    
                                    // Set parameters
                                    $param_username = $data["username"];
                                    $param_email = $data["email"];
                                    $param_password = $data["password"]; // Tanpa enkripsi sesuai permintaan
                                    $param_newsletter = isset($data["newsletter"]) && $data["newsletter"] ? 1 : 0;
                                    
                                    if(mysqli_stmt_execute($stmt)){
                                        $response['success'] = true;
                                        $response['message'] = "Pendaftaran berhasil! Silakan login.";
                                    } else{
                                        $response['message'] = "Oops! Terjadi kesalahan. Silakan coba lagi nanti.";
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            mysqli_stmt_close($stmt);
        }
    }
    
    // Close connection
    mysqli_close($conn);
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>