<?php
session_start();
require_once "connect.php";
$allowedOrders = array('asc', 'desc');
$data = [];

// Check if a parameter named "type" is provided
if (isset($_GET['type'])) {
    $type = $_GET['type'];

    // Check if a parameter names "order" is provided
    if (isset($_GET['order'])) {
            $order = $_GET['order'];
            if (in_array($order, $allowedOrders)) {
                if ($type === 'entries') { $stmt = $con->prepare("SELECT * FROM entries ORDER BY createdDate $order"); }
                elseif ($type =='su-entry') { $stmt = $con->prepare("SELECT * FROM entries WHERE entry_type = 'Su' ORDER BY createdDate $order"); }
                elseif ($type =='elektrik-entry') { $stmt = $con->prepare("SELECT * FROM entries WHERE entry_type = 'Elektrik' ORDER BY createdDate $order"); }
                elseif ($type =='hayvan-entry') { $stmt = $con->prepare("SELECT * FROM entries WHERE entry_type = 'Hayvan' ORDER BY createdDate $order"); }
                elseif ($type =='diger-entry') { $stmt = $con->prepare("SELECT * FROM entries WHERE entry_type = 'Diger' ORDER BY createdDate $order"); }
                elseif ($type === 'advices') { $stmt = $con->prepare("SELECT * FROM advices ORDER BY createdDate $order"); }
                elseif ($type =='su-advice') { $stmt = $con->prepare("SELECT * FROM advices WHERE advice_type = 'Su' ORDER BY createdDate $order"); }
                elseif ($type =='elektrik-advice') { $stmt = $con->prepare("SELECT * FROM advices WHERE advice_type = 'Elektrik' ORDER BY createdDate $order"); }
                elseif ($type =='hayvan-advice') { $stmt = $con->prepare("SELECT * FROM advices WHERE advice_type = 'Hayvan' ORDER BY createdDate $order"); }
                elseif ($type =='diger-advice') { $stmt = $con->prepare("SELECT * FROM advices WHERE advice_type = 'Diger' ORDER BY createdDate $order"); }
                else {
                    // Invalid type parameter provided
                    $data = [
                        'error' => 'Invalid type parameter'
                    ];
                    exit('Invalid type');
                }
            }
            else {
                $data = [
                    'error' => 'Deneme bile'
                ];
                exit('Deneme bile');
            }
              
    } else {
        if ($type === 'user') {
            // Fetch advices from the database
            $stmt = $con->prepare("SELECT username, firstName, lastName, email FROM accounts WHERE userID = ?");
            $uid = $_SESSION['id'];
            $stmt->bind_param('s', $uid);
        } elseif ($type === 'username') {
            $stmt = $con->prepare("SELECT userID, username FROM accounts");
        } elseif ($type === 'userEntries') {
            $stmt = $con->prepare("SELECT * FROM entries WHERE userID = ?");
            $uid = $_SESSION['id'];
            $stmt->bind_param("i", $uid);
        } elseif ($type === 'userAdvices') {
            $stmt = $con->prepare("SELECT * FROM advices WHERE userID = ?");
            $uid = $_SESSION['id'];
            $stmt->bind_param("i", $uid);
        } elseif ($type === 'entryRemove') {
                $eid = $_GET['entryID'];
                $stmt = $con->prepare("DELETE FROM entries WHERE entryID = ?");
                $stmt->bind_param("i", $eid);
                $stmt->execute();
                exit('Şikayet Başarıyla Silindi!');
        } elseif ($type === 'entryEdit') {
            $eid = $_GET['entryID'];
            $newTitle = $_POST['newtitle'];
            $newDesc = $_POST['newdesc'];
            $status = $_POST['status'];
            $stmt = $con->prepare("UPDATE entries
                SET entry_title = ?,
                    entry_desc = ?,
                    `status` = ?
                WHERE entryID = ?");
            $stmt->bind_param("ssii", $newTitle, $newDesc, $status, $eid);
            $stmt->execute();
            exit('Şikayet Başarıyla Güncellendi!');
        } elseif ($type === 'adviceRemove') {
            $eid = $_GET['entryID'];
            $stmt = $con->prepare("DELETE FROM advices WHERE adviceID = ?");
            $stmt->bind_param("i", $eid);
            $stmt->execute();
            exit('Öneri Başarıyla silindi!');
        } elseif ($type === 'adviceEdit') {
            $eid = $_GET['entryID'];
            $newTitle = $_POST['newtitle'];
            $newDesc = $_POST['newdesc'];
            $status = $_POST['status'];
            $stmt = $con->prepare("UPDATE advices
                SET advice_title = ?,
                    advice_desc = ?,
                    `status` = ?
                WHERE adviceID = ?");
            $stmt->bind_param("ssii", $newTitle, $newDesc, $status, $eid);
            $stmt->execute();
            exit('Öneri Başarıyla güncellendi!');
        } elseif ($type === 'line') {
            $stmt = $con->prepare("SELECT e.entry_type, d.date, COALESCE(t.count, 0) AS count
            FROM (
              SELECT DISTINCT DATE(createdDate) AS date
              FROM entries
              WHERE createdDate >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
            ) AS d
            CROSS JOIN (
              SELECT DISTINCT entry_type
              FROM entries
            ) AS e
            LEFT JOIN (
              SELECT entry_type, DATE(createdDate) AS date, COUNT(*) AS count
              FROM entries
              WHERE createdDate >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
              GROUP BY entry_type, date
            ) AS t
            ON e.entry_type = t.entry_type AND d.date = t.date
            ORDER BY d.date ASC, e.entry_type ASC");
        } elseif ($type === 'pie') {
            $stmt = $con->prepare("SELECT e.entry_type, COUNT(*) AS count
            FROM entries e
            WHERE createdDate >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)
            GROUP BY e.entry_type");
        } elseif ($type === 'worst') {
            $stmt = $con->prepare("SELECT street_name, COUNT(*) AS count 
            FROM entries 
            GROUP BY street_name 
            ORDER BY count DESC
            limit 5");
        } elseif ($type === 'worstAlt') {
            $street_name = $_GET['street_name'];
            $stmt = $con->prepare("SELECT et.entry_type, COUNT(e.entry_type) AS count
            FROM (
              SELECT 'Su' AS entry_type
              UNION ALL SELECT 'Elektrik'
              UNION ALL SELECT 'Hayvan'
              UNION ALL SELECT 'Diger'
            ) AS et
            LEFT JOIN entries e ON et.entry_type = e.entry_type AND e.street_name = ?
            GROUP BY et.entry_type
            ORDER BY count DESC");
            $stmt->bind_param('s', $street_name);
        } elseif ($type === 'best') {
            $stmt = $con->prepare("SELECT street_name, COUNT(*) AS count 
            FROM entries 
            GROUP BY street_name 
            ORDER BY count ASC
            limit 5");
        } elseif ($type === 'bestAlt') {
            $street_name = $_GET['street_name'];
            $stmt = $con->prepare("SELECT et.entry_type, COUNT(e.entry_type) AS count
            FROM (
              SELECT 'Su' AS entry_type
              UNION ALL SELECT 'Elektrik'
              UNION ALL SELECT 'Hayvan'
              UNION ALL SELECT 'Diger'
            ) AS et
            LEFT JOIN entries e ON et.entry_type = e.entry_type AND e.street_name = ?
            GROUP BY et.entry_type
            ORDER BY count DESC");
            $stmt->bind_param('s', $street_name);
        } elseif ($type === 'mahalle') {
            $mahalle = $_GET['street_name'];
            $stmt = $con->prepare("SELECT et.entry_type, COUNT(e.entry_type) AS count
            FROM (
              SELECT 'Su' AS entry_type
              UNION ALL SELECT 'Elektrik'
              UNION ALL SELECT 'Hayvan'
              UNION ALL SELECT 'Diger'
            ) AS et
            LEFT JOIN entries e ON et.entry_type = e.entry_type AND e.mahalle = ?
            GROUP BY et.entry_type");
            $stmt->bind_param('s', $mahalle);
        } elseif ($type === 'duyurular') {
            $stmt = $con->prepare("SELECT * from duyurular");
        } elseif ($type === 'elektrik_duyurular') {
            $stmt = $con->prepare("SELECT * from elektrik_duyurular");
        } else {
            $data = [
                'error' => 'No order parameter provided'
            ];
            exit('No order');
        }
    }
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    // No type parameter provided
    $data = [
        'error' => 'No type parameter provided'
    ];
    exit('No type');
}

// Return data as JSON response
header('Content-Type: application/json');
echo json_encode($data);
exit;
?>