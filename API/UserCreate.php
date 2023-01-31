<?php

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");


    //json format data converted to associative array
    $data = json_decode(file_get_contents("php://input"),TRUE); 

    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $login = $data['login'];
    $password = $data['password'];

    require "config.php";

    // check if user exists
    $sql = "SELECT * FROM Users WHERE login='{$login}'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0)
    {
        echo json_encode(array("message" => "User already exsits", "status"=>FALSE));
    }
    else
    {
        $sql="INSERT INTO Users(firstname,lastname,login,password) VALUES('{$firstName}','{$lastName}','{$login}','{$password}')";
        if(mysqli_query($conn,$sql)){
            echo json_encode(array("message"=> "Student Record Inserted","status"=> TRUE));
        }else{
            echo json_encode(array("message"=> "Student Record Can't Inserted","status"=> FALSE));
        }
    }
?>