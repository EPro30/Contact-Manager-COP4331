<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    $data = json_decode(file_get_contents("php://input"), TRUE);

    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $phoneNumber = $data['phoneNumber'];
    $emailAddress = $data['emailAddress'];
    $userId = $data['userId'];

    require "config.php";

    $sql = "SELECT * FROM Contact WHERE phonenumber='{$phoneNumber}'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0)
    {
        echo json_encode(array("message"=>"Contact phone number already exists", "status"=>FALSE));
    }
    else 
    {

        $sql = "INSERT INTO Contact(firstname, lastname, phonenumber, emailaddress, userid)
            VALUES ('{$firstName}', '{$lastName}', '{$phoneNumber}','{$emailAddress}','{$userId}')";


        if(mysqli_query($conn,$sql)){
            echo json_encode(array("message"=> "Student Record Inserted","status"=> TRUE));
        }else{
            echo json_encode(array("message"=> "Student Record Can't Inserted","status"=> FALSE));
        }
    }
?>