<?php

// Required Header - Make sure not to delete it.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST) {
    $recipient = "yeomsydney@gmail.com";
    $subject = "Knock knock! Email arrived from your portfolio website.";
    $visitor_name = "";
    $visitor_email = "";
    $message = "Client Name: " . $visitor_name . "\n" .
                "Client Email: " . $visitor_email . "";
    $fail = array();

    if (isset($_POST['firstname']) && !empty($_POST['firstname'])) {
        $visitor_name = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
    }else{
        array_push($fail, "firstname");
    }

    if (isset($_POST['lastname']) && !empty($_POST['lastname'])) {
        $visitor_name .= " ".filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
    }else{
        array_push($fail, "lastname");
    }

    if (isset($_POST['email']) && !empty($_POST['email'])) {
        $email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $visitor_email = filter_var($email, FILTER_VALIDATE_EMAIL);
    }else{
        array_push($fail, "email");
    }

    if (isset($_POST['message']) && !empty($_POST['message'])) {
        $clean = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
        $message = htmlspecialchars($clean);
    }else{
        array_push($fail, "message");
    }

    // $headers = 'From: '.$visitor_email."\r\n".'Reply-To: '.$visitor_email."\r\n".'X-Mailer: PHP/'.phpversion();
    $headers =  'From: '.$visitor_email."\r\n".
                'Reply-To: '.$visitor_name.' <'.$visitor_email.'>'."\r\n".
                'X-Mailer: PHP/'.phpversion();
    
    // $message =  "Client Name: " . $visitor_name . "\n" .
    //             "Client Email: " . $visitor_email . "\n" .
    //             "Message: " . $message;
    
    if (count($fail) == 0) {
        $subject = $subject."\r\n"." From ".$visitor_name;

        // mail($recipient, $subject, $message, $headers);
        mail($recipient, $subject, $message, $visitor_email, $visitor_name);
        $results['message'] = sprintf("Thank you for contacting us, ".$visitor_name.". We will respond you within 24hours.");
    } else {
        header('HTTP/1.1 488 You Did NOT fill out the form correctly');
        die(json_encode(['message' => "Please make sure to fill up all the blanks!"]));
    }
} else {
    $results['message'] = "Please make sure to fill up all the blanks!";
}

echo json_encode($results);
?>