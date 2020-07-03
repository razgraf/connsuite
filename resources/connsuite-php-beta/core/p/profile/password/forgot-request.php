<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 11/11/2017
 * Time: 14:12
 */



include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_PASSWORD_FORGOT_REQUEST, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);

$pathToForgot = ROOT.$pathFromRoot[PAGE_PASSWORD_FORGOT_KEY];



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once ('../../../../support/PHP-Mailer/src/SMTP.php');
require_once ('../../../../support/PHP-Mailer/src/PHPMailer.php');
require_once ('../../../../support/PHP-Mailer/src/Exception.php');
require_once ('../../../../support/PHP-Mailer/src/POP3.php');
require_once ('../../../../support/PHP-Mailer/src/OAuth.php');

$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));

if(!isset($_POST['email'])) exit(exitWithNegative("Data missing"));

/**
 * Step 1 : Check if email exists and if so, retrieve the userID
 * Step 2 : Insert a token in the table and send the email with the token
 */
$email = secureString($_POST['email']);
$SQL_SELECT = "SELECT ID, email, firstname FROM user WHERE email = '".$email."' LIMIT 1";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) exit(exitWithNegative("Incorrect Email."));

$result_select = $conn->query($SQL_SELECT);
if($result_select->num_rows > 0){
    $result_select = $result_select->fetch_assoc();
    $userID = $result_select['ID'];
    $firstname = $result_select['firstname'];
    $token = md5(date("Y-m-d h:i:sa").$userID);
    /**
     * Delete old tokens
     */
    $SQL_DELETE_TOKENS = "DELETE FROM token_password WHERE userID = '".$userID."' ";
    $conn->query($SQL_DELETE_TOKENS);

    /**
     * Add new token
     */
    $SQL_INSERT = "INSERT INTO token_password SET userID = '".$userID."', token = '".$token."', email = '".$email."' ";
    $result_insert = $conn->query($SQL_INSERT);
    if(!$result_insert) exit(exitWithNegative("Error on Insert"));
    $insertID = $conn->insert_id;


    /**
     * Send email
     */


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
        $mail->setFrom('contact@connsuite.com', 'ConnSuite');
        $mail->addAddress($email, $firstname);     // Add a recipient


        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = "Forgot Password Request | ConnSuite";
        $mail->Body    =  buildContent($firstname, $email, $token,$insertID,$pathToForgot);

        $mail->send();


        exit(exitWithSomething(kCSResponseOk,"Message successfully inserted"));



    } catch (Exception $e) {
        exit(exitWithSomething(kCSResponseOk,"Message successfully inserted but not sent"."Mailer Error: ". $mail->ErrorInfo));

    }



}

exit(exitWithEmail("Error"));


function buildContent($firstname,$email,$token,$insertID,$pathToForgot){

    $pathToForgot.="?e=".$email."&t=".$token."&i=".$insertID;

    $content = "";
    $content.= "<h2 style='color: #04befe'>Hi, ".$firstname." !</h2><br><br><br>"
        ."We have received your request regarding your forgotten password. Have no worries, we can fix it together!<br><br>"
        ."Please access the link below in order to create a new password for your account: <br><br>"
        ."<a href='".$pathToForgot."'>".$pathToForgot."</a> <br><br><br><br><br><br><br><br>"
        ."If you did not request a password change, please write us an email at contact@connsuite.com or go to the link below and fill in the form at the bottom of the page"
        ."<a href = 'https://www.connsuite.com/intro/index.php'>https://www.connsuite.com/intro/index.php</a>";

    return $content;
}




?>