<?php
    header("Content-Type: application/json"); 
    header("Access-Control-Allow-Origin: *"); 

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $phoneNumber = $data['phoneNumber'];
    
    // php automatically parses and executes a file
    require "config.php";

    $firstSql = "SELECT * FROM Contact WHERE phonenumber='{$phoneNumber}'";
    $firstResult = mysqli_query($conn, $firstSql) or die("SQL Query Failed");

    if(mysqli_num_rows($firstResult) > 0)
    {
        $secondSql = "DELETE FROM Contact WHERE phonenumber='{$phoneNumber}'";

        if (mysqli_query($conn, $secondSql))
        {
            echo json_encode(array("message"=>"Contact Deleted", "status"=> TRUE));
        }
        else
        {
            echo json_encode(array("message"=> "Contact Can't Be Deleted","status"=> FALSE));
        }
    }
    else
    {
        echo json_encode(array("message" => "Contact does not exist", "status"=>FALSE));
    }
?>