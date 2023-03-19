<?php

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    // json format data converted to associative array
    $data = json_decode(file_get_contents("php://input"), TRUE);
    
    $contactId = $data['ID'];
    $firstName = $data['FirstName'];
    $lastName = $data['LastName'];
    $phoneNumber = $data['PhoneNumber'];
    $emailAddress = $data['EmailAddress'];
    $userId = $data['UserID'];
    
    require "config.php";
    
    // Check if the phone number already exists in the Contact table for a different contact ID
    $sql = "SELECT * FROM Contact WHERE phoneNumber='{$phoneNumber}' AND ID != '{$contactId}'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        // Phone number already exists for a different contact ID
        echo json_encode(array("message" => "Phone number already exists for another contact", "status" => FALSE));
    } else {
        // Check if the email already exists in the Contact table for a different contact ID
        $sql = "SELECT * FROM Contact WHERE emailAddress='{$emailAddress}' AND ID != '{$contactId}'";
        $result = mysqli_query($conn, $sql);
    
        if (mysqli_num_rows($result) > 0) {
            // Email already exists for a different contact ID
            echo json_encode(array("message" => "Email already exists for another contact", "status" => FALSE));
        } else {
            // Phone number and email don't exist or exist for the same contact ID, update the Contact table
            $sql = "UPDATE Contact SET 
                firstname = '{$firstName}',
                lastName = '{$lastName}',
                emailAddress = '{$emailAddress}',
                userid = '{$userId}'
                WHERE ID = '{$contactId}' AND phonenumber = '{$phoneNumber}'";
           
            if (mysqli_query($conn, $sql)) {
                echo json_encode(array("message" => "Contact information updated", "status" => TRUE));
            } else {
                echo json_encode(array("message" => "Contact information couldn't be updated", "status" => FALSE));
            }
        }
    }
?>
