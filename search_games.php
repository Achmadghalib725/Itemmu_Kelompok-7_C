<?php
// Include config file
require_once "config.php";

// Set header untuk JSON response
header('Content-Type: application/json');

// Cek apakah ada parameter query
if(isset($_GET['query']) && !empty($_GET['query'])) {
    $query = $_GET['query'];
    
    // Siapkan query SQL dengan pencarian
    $sql = "SELECT * FROM games WHERE name LIKE ? OR publisher LIKE ? ORDER BY name ASC LIMIT 10";
    
    if($stmt = mysqli_prepare($conn, $sql)) {
        // Bind parameter
        $searchParam = "%" . $query . "%";
        mysqli_stmt_bind_param($stmt, "ss", $searchParam, $searchParam);
        
        // Execute query
        if(mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            
            // Ambil hasil pencarian
            $games = array();
            while($row = mysqli_fetch_assoc($result)) {
                $games[] = array(
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'publisher' => $row['publisher'],
                    'logo_url' => $row['logo_url']
                );
            }
            
            // Return hasil pencarian
            echo json_encode(array('success' => true, 'games' => $games));
        } else {
            echo json_encode(array('success' => false, 'message' => 'Terjadi kesalahan saat mencari game.'));
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(array('success' => false, 'message' => 'Terjadi kesalahan dalam persiapan query.'));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Parameter pencarian tidak ditemukan.'));
}

// Close connection
mysqli_close($conn);
?>