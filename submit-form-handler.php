<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


// DEBUGGING
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// var_dump($_POST);
// exit; 

// Load credentials from config.php
$config = require dirname(__DIR__) . '/private/config.php';

// Fallback if config file is not loaded properly
if (!$config || !is_array($config)) {
    die("Configuration file is missing or invalid.");
}

// Get form values
$honeypot = trim($_POST['website']); 
$formType = $_POST['form_type'] ?? '';

// Honeypot spam check
if (!empty($honeypot)) {
    die("Spam detected.");
}

// reCaptcha
$recaptchaToken = $_POST['g-recaptcha-response'] ?? '';
$recaptchaSecret = $config['recaptcha_secret']; 

if (empty($recaptchaToken)) {
    die('reCAPTCHA token missing.');
}

// Verify the token with Google's API
$recaptchaResponse = file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}"
);
$recaptchaData = json_decode($recaptchaResponse);

if (!$recaptchaData->success || $recaptchaData->score < 0.3) {
    die('reCAPTCHA verification failed. Please try again.');
}

if ($formType === 'contact') {
    // Process contact form
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = nl2br(htmlspecialchars(trim($_POST['message'])));

    if (empty($name) || empty($email) || empty($message)) {
        die("Please fill in all required fields.");
    }

    $subject = "New Contact Form Submission";
    $body = "
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Phone:</strong> {$phone}</p>
      <p><strong>Message:</strong><br>{$message}</p>
    ";
}
elseif ($formType === 'quote') {
    // Process quote form
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $duration = htmlspecialchars(trim($_POST['duration'] ?? ''));
    $dueDate = htmlspecialchars(trim($_POST['due-date'] ?? ''));
    $languages = htmlspecialchars(trim($_POST['languages']));
    $details = nl2br(htmlspecialchars(trim($_POST['details'] ?? '')));

    $services = isset($_POST['services']) ? (array)$_POST['services'] : [];
    $jobTypes = isset($_POST['jobType']) ? (array)$_POST['jobType'] : [];

    if (empty($name) || empty($email) || empty($languages)) {
        die("Please fill in all required fields.");
    }

    $subject = "New Quote Request";
    $body = "
      <h3>Quote Request Form Submission</h3>
      <p><strong>Name:</strong> {$name}</p>
      <p><strong>Email:</strong> {$email}</p>
      <p><strong>Phone:</strong> {$phone}</p>
      <p><strong>Duration:</strong> {$duration}</p>
      <p><strong>Due Date:</strong> {$dueDate}</p>
      <p><strong>Languages:</strong> {$languages}</p>
      <p><strong>Services:</strong> " . implode(', ', $services) . "</p>
      <p><strong>Job Types:</strong> " . implode(', ', $jobTypes) . "</p>
      <p><strong>Additional Details:</strong><br>{$details}</p>
    ";
}
else {
    die("Invalid form submission.");
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
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Or PHPMailer:ENCRYPTION_STARTTLS;
    $mail->Port = $config['smtp_port'];
    // Recipients
    $mail->setFrom($config['smtp_user'], 'Vera Language Services');
    $mail->addReplyTo($email, $name);
    $mail->addAddress($config['recipient_email']);
    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
     // Redirect on success
    header("Location: success.html");
    exit;
    // fallback incase header fails
    echo "Thank you for your submission."; 
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

    // Log error to a file
    error_log(
        date('[Y-m-d H:i:s] ') . "Mailer Error: {$mail->ErrorInfo}\n",
        3,
        __DIR__ . '/mail_error.log' // Save to same directory as the PHP script
    );

    echo "Message could not be sent. Please try again later.";
}
?>
