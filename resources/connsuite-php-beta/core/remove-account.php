<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 12/09/2017
 * Time: 14:56
 */


include_once("../base/config.php");
include_once("../base/user.php");
include_once("../libs/connsuite-core.php");

$conn = CSCore::credentialAccess();


if(!$conn) exit(exitWithNegative("Error|Connection"));

$user = (new User())->mapUser($_SESSION['user']);
if(!$user || !($user->isSessionWithServerValid()) )  exit(exitWithNegative("Invalid|Connection"));



$userID = $user->getID();

$content = "The user with the userID=".$userID." wants his account to be removed.";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require '../support/PHP-Mailer/src/SMTP.php';
require '../support/PHP-Mailer/src/PHPMailer.php';
require '../support/PHP-Mailer/src/Exception.php';
require '../support/PHP-Mailer/src/POP3.php';
require '../support/PHP-Mailer/src/OAuth.php';





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
    $mail->Subject = "Connsuite | Remove Account";
    $mail->Body  = $content;

    $mail->send();


    exit(exitWithSomething(kCSResponseOk,"Message successfully inserted"));



} catch (Exception $e) {
    exit(exitWithSomething(kCSResponseOk,"Message successfully inserted but not sent"."Mailer Error: ". $mail->ErrorInfo));

}





exit(exitWithNegative("Error on insert message."));




?>