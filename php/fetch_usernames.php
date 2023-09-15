<?php
    session_start();
    require_once "connect.php";

    $query = 'SELECT e.entryID, e.userID, a.username, a.userID
    FROM entries e
    JOIN accounts a ON e.userID = a.userID';

$result = mysqli_query($con, $query);

$usernames = array();
while ($row = mysqli_fetch_assoc($result)) {
$usernames[] = [$row['username'], $row['userID']];
}

// Close the database connection
mysqli_close($con);

// Set the response headers
header('Content-Type: application/json');

// Construct the response array
$response = array(
'usernames' => $usernames
);

// Send the response as JSON
echo json_encode($response);
?>