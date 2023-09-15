<?php
    session_start();
    require_once "connect.php";
    $formType = $_POST['form_type'];
    $date = date("Y-m-d H:i:s");
    $currentUserID = $_SESSION['id'];

    if ($formType === 'entry') {
        $type = $_POST['entry_type'];
        $title = $_POST['entry_title'];
        $desc = $_POST['entry_desc'];
        $lat = $_POST['lat'];
        $lng = $_POST['lng'];
        $mahalle = $_POST['mahalle'];
        $street = $_POST['street_name_entry'];
        $esql = "INSERT INTO entries(userID, entry_type, entry_title, entry_desc, lat, lng, street_name, mahalle, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $con->prepare($esql);
        $stmt->bind_param("issssssss", $currentUserID, $type, $title, $desc, $lat, $lng, $street, $mahalle, $date);

        if (!$stmt->execute()) {
            echo "ERROR: Hush! Sorry $esql. " . $stmt->error;
        } else { header("location: ../php/sikayetler.php"); }
    }
    else{
        $type = $_POST['advice_type'];
        $title = $_POST['advice_title'];
        $desc = $_POST['advice_desc'];
        $lat = $_POST['lat1'];
        $lng = $_POST['lng1'];
        $street = $_POST['street_name_advice'];
        $esql = "INSERT INTO advices(userID, advice_type, advice_title, advice_desc, lat, lng, street_name, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $con->prepare($esql);
        $stmt->bind_param("isssssss", $currentUserID, $type, $title, $desc, $lat, $lng, $street, $date);
        if (!$stmt->execute()) {
            echo "ERROR: Hush! Sorry $esql. " . $stmt->error;
        } else { header("location: ../php/öneriler.php"); }
    }

?>