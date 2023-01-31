<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *"); //For requests without credentials

    $data = json_decode(file_get_contents("php://input"), TRUE);
    $userLogin = $data['login'];
    $userPassword = $data['password'];
    

    require "config.php";

    $sql = "SELECT * FROM Users WHERE login='{$userLogin}' AND password='{$userPassword}'";
    $result = mysqli_query($conn, $sql);
    

    if ($result == false) {
        printf("Error: %s\n", mysqli_error($mysqli));
    }
    
    if(mysqli_num_rows($result) > 0){
        $output= mysqli_fetch_all($result ,MYSQLI_ASSOC);
        echo json_encode(array("message"=> "Login Successful", "status"=>TRUE));
        // echo json_encode($output);
    }
    else
    {
        echo json_encode(array("message"=> "Login Unsuccessful","status"=> FALSE));
    }

?>