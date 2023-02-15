<?php

    header("Content-Type: application/json"); 
    header("Access-Control-Allow-Origin: *"); 
    //json format data converted to associative array
    $data=json_decode(file_get_contents("php://input"),TRUE); 

    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $phoneNumber = $data['phoneNumber'];
    $emailAddress = $data['emailAddress'];
    $userId = $data['userId'];

    require "config.php";

    $sql="UPDATE Contact SET 
        firstname='{$firstName}',
        lastName='{$lastName}',
        emailAddress='{$emailAddress}',
        userid='{$userId}' 
        WHERE phonenumber='{$phoneNumber}'";


    if(mysqli_query($conn,$sql)){
        echo json_encode(array("message"=> "Student Record Updated","status"=> TRUE));
    }else{
        echo json_encode(array("message"=> "Student Record Can't Updated","status"=> FALSE));
    }
?>