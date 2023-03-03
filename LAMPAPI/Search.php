<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    
    $data = json_decode(file_get_contents("php://input"), TRUE);
    $userId = $data['UserId'];
    $wildCard = $data['SearchFor'];

    require "config.php";

    $sql = "SELECT * FROM Contact
    WHERE userId = '{$userId}'
    AND CONCAT(firstname, lastname, phonenumber, emailaddress) LIKE '%{$wildCard}%'";

    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0) 
    {
        $output = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(array("status"=>TRUE, "response"=>$output));
    }
    else 
    {
        echo json_encode(array("status"=> FALSE));
    }
?>