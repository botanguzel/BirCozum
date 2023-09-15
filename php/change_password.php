<?php
session_start();

require_once "../php/connect.php";

$oldpasswrd = $_POST['oldpasswrd'];
$newpasswrd = $_POST['newpasswrd'];
$newpasswrdConfirm = $_POST['newpasswrdConfirm'];

if (empty($oldpasswrd) || empty($newpasswrd) || empty($newpasswrdConfirm)) {
    // Data is not submitted or required fields are empty
    exit(json_encode('Lütfen bütün bilgileri doldurun!'));
}

// Prepare and execute a SELECT statement to retrieve the stored password
$stmt = $con->prepare("SELECT password FROM accounts WHERE userID = ?");
$stmt->bind_param('s', $_SESSION['id']);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($storedPassword);
    $stmt->fetch();

    // Verify if the old password matches the stored password
    if (md5($oldpasswrd) !== $storedPassword) {
        exit(json_encode('Eski Şifre Yanlış!'));
    }
    else if($newpasswrd !== $newpasswrdConfirm) {
        exit(json_encode('Şifreler uyuşmuyor'));
    }

    // Update the password with the new one
    $newPasswordHash = md5($newpasswrd);
    $updateStmt = $con->prepare("UPDATE accounts SET password = ? WHERE userID = ?");
    $updateStmt->bind_param('ss', $newPasswordHash, $_SESSION['id']);
    $updateStmt->execute();
    exit(json_encode('Şifre başarıyla değiştirildi!'));
} else {
    exit(json_encode('Kullanıcı bulunamadı!'));
}

$stmt->close();
header("location: ../php/change_password.php");
?>
