<?php
session_start();
require_once '../req/vendor/autoload.php';
require_once "../php/connect.php";

use Firebase\JWT\JWT;

//check if data from form is submitted to php
if ( isset($_POST['username'], $_POST['password']) ) {
    //preparing the SQL statement will prevent SQL injection
    if ($stmt = $con->prepare('SELECT userID, username, `password` FROM accounts WHERE username = ?')) {
        $stmt->bind_param('s', $_POST['username']);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($userID, $username, $password);
            $stmt->fetch();
            // Account exists, now we verify the password
            $hash = md5($_POST['password']);
            if ($password === $hash) {
                // Password verification success
                // Generate a unique token (JWT)
                $secretKey = 'f5be979e0e7bc578395b89b47a2423b44033912ee4aa8a2c799afd791f8cfbd1896f5aab7057a3b53e21952bb300e4ce8111c24d648075d517c6c3e728f6aa43'; // Replace with your own secret key
                $payload = array(
                    'userID' => $userID,
                    'username' => $username
                    // You can include additional data in the payload as needed
                );

                $jwt = JWT::encode($payload, $secretKey, 'HS256'); // Generate JWT

                // Store the JWT in the session or send it to the client-side for storage
                $_SESSION['loggedin'] = true;
                $_SESSION['token'] = $jwt;
                $_SESSION['name'] = $_POST['username'];
                $_SESSION['id'] = $userID;

                header("Location: ../index.php");
            } else {
            // Incorrect username
            echo 'Geçersiz kullanıcı adı';
            }
            $stmt->close();
        }
    }
}
?>