<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $phoneNumber = $data['phoneNumber'];

    require "config.php";

    $sql = "SELECT * FROM Contact WHERE phonenumber='{$phoneNumber}'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0)
    {
        $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($output);
    }
    else
    {
        echo json_encode(array("message"=> "No Records Found", "status"=> FALSE));
    }
?>