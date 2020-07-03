<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 12/09/2017
 * Time: 14:56
 */


include_once("../../base/config.php");

if(!isset($_POST['name'])) exit(exitWithNegative("No name provided"));
if(!isset($_POST['message'])) exit(exitWithNegative("No message provided"));
if(!isset($_POST['email'])) exit(exitWithNegative("No email  provided"));
if(!isset($_POST['reason'])) exit(exitWithNegative("No reason provided"));
$pathToLibs = goToBaseTarget(CORE_DO_SEND_INTRO_MESSAGE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();

$name = secureString($_POST['name']);
$message = secureString($_POST['message']);
$email = secureString($_POST['email']);
$reason = secureString($_POST['reason']);

$SQL_INSERT = "INSERT INTO contact SET 
               subject = '".$reason."',
               name = '".$name."',
               email = '".$email."',
               message = '".$message."'
               ";

$result = $conn->query($SQL_INSERT);
if(!$result) exit(exitWithNegative("Error on insert message."));

$content = $reason .
    "<br><br><br><br>".
    "Name: ".$name.
    "<br><br>".
    "Email: ".$email.
    "<br><br>".
    "Message: ".$message;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require '../../support/PHP-Mailer/src/SMTP.php';
require '../../support/PHP-Mailer/src/PHPMailer.php';
require '../../support/PHP-Mailer/src/Exception.php';
require '../../support/PHP-Mailer/src/POP3.php';
require '../../support/PHP-Mailer/src/OAuth.php';





$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'connsuite.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'self@connsuite.com';                 // SMTP username
    $mail->Password = 'uH1qICacdX';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('self@connsuite.com', 'ConnSuite');
    $mail->addAddress('razvan.gabriel.apostu@gmail.com', 'ConnSuite Intro');     // Add a recipient


    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $reason;
    $mail->Body    = $content;

    $mail->send();


    exit(exitWithSomething(kCSResponseOk,"Message successfully inserted"));



} catch (Exception $e) {
    exit(exitWithSomething(kCSResponseOk,"Message successfully inserted but not sent"."Mailer Error: ". $mail->ErrorInfo));

}





exit(exitWithNegative("Error on insert message."))


?>