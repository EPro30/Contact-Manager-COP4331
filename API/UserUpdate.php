<?php

    header("Content-Type: application/json"); 
    header("Access-Control-Allow-Origin: *"); 
    //json format data converted to associative array
    $data=json_decode(file_get_contents("php://input"),TRUE); 

    $userId = $data['id'];
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $login = $data['login'];
    $password = $data['password'];

    require "config.php";

    $sql="UPDATE Users SET 
    firstname='{$firstName}',
    lastName='{$lastName}',
    login='{$login}', 
    password='{$password}' 
    WHERE id={$userId} ";


    if(mysqli_query($conn,$sql)){
        echo json_encode(array("message"=> "Student Record Updated","status"=> TRUE));
    }else{
        echo json_encode(array("message"=> "Student Record Can't Updated","status"=> FALSE));
    }
?>