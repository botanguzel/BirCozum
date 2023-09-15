<?php
require_once "../php/connect.php";
require_once '../req/vendor/autoload.php';

use Firebase\JWT\JWT;
use Google\Client;

$idToken = $_POST['id_token'];
$client = new Client(['client_id' => '420101599386-73tan2h8tqm7lkpuimvv591ogikkbu7a.apps.googleusercontent.com']);
$payload = $client->verifyIdToken($idToken);
if ($payload) {
    $userID = $payload['sub'];
    echo ($userID);
    // Additional user data can be extracted from the $payload variable if needed
    
    // Perform necessary actions like checking/updating user records in the database
    // ...
    
    // Generate a unique token (JWT)
    $secretKey = 'YOUR_SECRET_KEY';
    $username = '...'; // Extracted from $payload or your database
    // ...
    
    // Store the JWT in the session or send it to the client-side for storage
    $_SESSION['loggedin'] = true;
    $_SESSION['token'] = $jwt;
    $_SESSION['name'] = $username;
    $_SESSION['id'] = $userID;
    
    // Redirect the user after successful login
    //header("Location: ../index.php");
} else {
    // Handle login failure
    echo 'Google login failed. Please try again.';
}
?>
