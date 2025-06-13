<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Load credentials from config.php
$config = require dirname(__DIR__) . '/private/config.php';


// Get form values
$name = htmlspecialchars(trim($_POST['name']));
$email = htmlspecialchars(trim($_POST['email']));
$phone = htmlspecialchars(trim($_POST['phone']));
$message = htmlspecialchars(trim($_POST['message']));

// Validation
if (empty($name) || empty($email) || empty($message)) {
    die("Please fill in all required fields.");
}

// Setup PHPMailer
$mail = new PHPMailer(true);
try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Or PHPMailer:ENCRYPTION_STARTTLS
    $mail->Port = $config['smtp_port'];
    // Recipients
    $mail->setFrom($config['smtp_user'], 'Vera Language Services');
    $mail->addReplyTo($email, $name);
    $mail->addAddress($config['recipient_email']);
    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Message from Contact Form';
    $mail->Body    = "
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Phone:</strong> {$phone}</p>
      <p><strong>Message:</strong><br>{$message}</p>
    ";

    $mail->send();
     // Redirect on success
    header("Location: success.html");
    exit;
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
