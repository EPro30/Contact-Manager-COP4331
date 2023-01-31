<?php
    $db_hostName = "localhost";
    $db_userName = "TheBeast";
    $db_password = "WeLoveCOP4331";
    $database = "COP4331";

    $conn = mysqli_connect($db_hostName, $db_userName, $db_password, $database);

    if (mysqli_connect_errno())
    {
        printf("Connect failed: %s\n", mysqli_connect_error);
        exit();
    }

    // echo "Connected successfully";
?>