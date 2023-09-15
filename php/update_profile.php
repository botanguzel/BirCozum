<?php
session_start();

require_once "../php/connect.php";

$fname = $_POST['firstName'];
$lname = $_POST['lastName'];
$email = $_POST['email'];

if ( !isset($fname, $lname, $email) ) {
	//data is not submitted
	exit(json_encode('Lütfen bütün bilgieri doldurun!'));
}

$sql = "UPDATE accounts SET firstName=?, lastName=?, email=? WHERE userID=?";
$stmt = $con->prepare($sql);

// Assuming $fname, $lname, $email, and $_SESSION['id'] contain the appropriate values

$stmt->bind_param("sssi", $fname, $lname, $email, $_SESSION['id']);

if ($stmt->execute()) {
    exit(json_encode('Profiliniz başarıyla güncellendi'));
} else {
    exit(json_encode('Profili güncellerken hata oluştu'. $stmt->error));
}

$stmt->close();
$con->close();
header("location: ../php/hesabim.php");
?>