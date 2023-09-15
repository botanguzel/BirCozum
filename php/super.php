<?php
    session_start();
    require_once "connect.php";
    if (isset($_SESSION['loggedin'], $_SESSION['token'])) {
        if ($_SESSION['name'] === 'xwede') {
            $type = $_GET['type'];
            $db = $_GET['db'];
            if ($type === 'del') {
                if ($db === 'duyurular') {
                    $command = "python ../scripts/py.py";
                    shell_exec($command);
                    exit("Duyurular database güncellenmiştir!");
                }
                else if ($db === 'elektrik_duyurular') {
                    $command = "python ../scripts/elUpd.py";
                    shell_exec($command);
                    exit("Elektrik Duyurular database güncellenmiştir!");
                }
                else {exit("SQL INJECTION DETECTED!");}
            } else {exit("SQL INJECTION DETECTED!");}
        }
        else {exit("!UNAUTHORIZED TRY DETECTED!");}
    }