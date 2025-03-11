<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = htmlspecialchars($_POST['message']);
    $email = htmlspecialchars($_POST['email']);
    $paypal = htmlspecialchars($_POST['paypal']);

    $to = "0dxp.inc@gmail.com";
    $subject = "New Submission from FREE MONEY FORM";
    $body = "Message: $message\nEmail: $email\nPayPal: $paypal";

    $headers = "From: 0dxp.inc@gmail.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Success! Your submission has been sent.";
    } else {
        echo "Error: Something went wrong. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
