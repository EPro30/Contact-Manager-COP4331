<?php
    header("Content-Type: application/json"); 
    header("Access-Control-Allow-Origin: *"); 

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $userId = $data['id'];
    
    // php automatically parses and executes a file
    require "config.php";

    $firstSql = "SELECT * FROM Users WHERE id='{$userId}'";
    $firstResult = mysqli_query($conn, $firstSql) or die("SQL Query Failed");

    if(mysqli_num_rows($firstResult) > 0)
    {
        $secondSql = "DELETE FROM Users WHERE id='{$userId}'";

        if (mysqli_query($conn, $secondSql))
        {
            echo json_encode(array("message"=>"User Deleted", "status"=> TRUE));
        }
        else
        {
            echo json_encode(array("message"=> "User Can't Be Deleted","status"=> FALSE));
        }
    }
    else
    {
        echo json_encode(array("message" => "User does not exist", "status"=>FALSE));
    }
?>