<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 13/08/2017
 * Time: 23:06
 */



include_once("../base/config.php");
include_once("../base/user.php");
include_once("../base/log.php");

$pathToLibs = goToBaseTarget(SYSTEM_PAGE_REGISTER_KEY, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$pathToWelcome = goToRootTarget(SYSTEM_PAGE_REGISTER_KEY, PAGE_WELCOME_KEY);
$pathToDashboard = goToRootTarget(SYSTEM_PAGE_REGISTER_KEY, PAGE_DASHBOARD_KEY);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require '../support/PHP-Mailer/src/SMTP.php';
require '../support/PHP-Mailer/src/PHPMailer.php';
require '../support/PHP-Mailer/src/Exception.php';
require '../support/PHP-Mailer/src/POP3.php';
require '../support/PHP-Mailer/src/OAuth.php';


session_set_cookie_params(3600 * 24 * 30); //30 days
session_start();

$conn = CSCore::credentialAccess();

if(!isset($_POST['email']) || $_POST['email'] === null) exit(exitWithNegative("Email was not sent."));
if(!isset($_POST['username']) || $_POST['username'] === null) exit(exitWithNegative("Username was not sent."));
if(!isset($_POST['firstname']) || $_POST['firstname'] === null) exit(exitWithNegative("Firstname was not sent."));
if(!isset($_POST['lastname']) || $_POST['lastname'] === null) exit(exitWithNegative("Lastname was not sent."));
if(!isset($_POST['password']) || $_POST['password'] === null) exit(exitWithNegative("Password was not sent."));

$email = $_POST['email'];
$username = secureString($_POST['username']);
$lastname = secureString($_POST['lastname']);
$firstname = secureString($_POST['firstname']);
$password = secureString($_POST['password']);
$fullname = $firstname." ".$lastname;

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) exit(exitWithNegative("Incorrect Email."));
$email = secureString($email);




/**
 * Check if the email is not taken
 */
$SQL_EMAIL = "SELECT email FROM user WHERE email = '".$email."' ";
$results = $conn->query($SQL_EMAIL);
if($results->num_rows > 0) exit(exitWithEmail("This email is already in use."));

/**
 * Check if the username is not taken
 */
$SQL_USERNAME = "SELECT username
                 FROM user 
                 WHERE username = '".$username."'
                 UNION
                 SELECT username
                 FROM user_alias 
                 WHERE username = '".$username."'
                 ";
$results = $conn->query($SQL_USERNAME);
if($results->num_rows > 0) exit(exitWithUsername("This username is already in use."));


for($x = 0 ; $x < count(USERNAME_BLACKLIST); $x++)
    if(USERNAME_BLACKLIST[$x] == $username) exit(exitWithUsername("This username is already in use."));


if(preg_match('/[#$%^&*()+=\-\[\]\';,\/{}|":<>?~\\\\]/', $username))
    exit(exitWithNegative("Username special characters."));



/**
 * Everything is ok, so insert the new user!
 */


$SQL_INSERT = "INSERT INTO user SET 
               username = '".$username."',
               firstname = '".$firstname."',
               lastname = '".$lastname."',
               name = '".$fullname."',
               email = '".$email."'
               ";
$results = $conn->query($SQL_INSERT);
if($results){ //the insert was successful
    $ID =  $conn->insert_id;

    $password = md5($ID .$password);
    $SQL_PASS = "UPDATE user SET password = '".$password."' WHERE ID = '".$ID."' ";
    $results_password = $conn->query($SQL_PASS);
    if(!$results_password) exit(exitWithNegative("Error on password"));

    /**
     * Get the entire data and bind it to SESSION
     */
    $SQL_USER = "SELECT * FROM user WHERE ID = '".$ID."' AND password='" . $password . "' AND email='" . $email . "' LIMIT 1";
    $results_user = $conn->query($SQL_USER);

    if ($results_user->num_rows > 0) {
        $row = $results_user->fetch_assoc();
        $user = new User();
        $user->set(
            $row['ID'],
            $row['username'],
            $row['name'],
            $row['firstname'],
            $row['lastname'],
            $row['email'],
            $row['phone'],
            $row['instantiated'],
            $row['version'],
            0,
            null,
            null,
            $row['visible']
        );

        $ADD_EMAIL = $row['email'];


        $tokenDevice = session_id();
        $tokenValue = md5($tokenDevice.$row['ID']);

        /**
         * DELETE OLD TOKENS WITH SAME SESSION_ID
         */
        $SQL_OLD_TOKENS = " DELETE FROM token WHERE  device = '". $tokenDevice ."' AND userID ='" . $row['ID'] . "'";
        $results_old = $conn->query($SQL_OLD_TOKENS);

        /**
         * INSERT NEW TOKEN
         */

        $SQL = " INSERT INTO token SET value='" . $tokenValue . "' , device = '". $tokenDevice ."', userID ='" . $row['ID'] . "'";
        $results = $conn->query($SQL);


        if ($results) { //the INSERT was successful
            $token = new Token();
            $token->set($conn->insert_id,$tokenValue,$tokenDevice);
            $user->token = $token;
            $_SESSION['user'] = json_encode($user);

            //SESSION IS NOW SET

            /**
             * Create First Network
             */

            $SQL_NET = "INSERT INTO network SET 
                     userID = '".$row['ID']."',
                     networkID =  24,
                     username = '".$ADD_EMAIL."',
                     custom = '0',
                     visible = '1',
                     description = 'This is my email account on Connsuite!',
                     position = 1
                    ";
            $conn->query($SQL_NET);


            /**
             * Create First Business Connection
             */

            $SQL_CONN = "INSERT INTO business_connect SET
                             sourceID = '".$user->ID."',
                             targetID = '".CONNSUITE_OFFICIAL_USERID."' ";
            $conn->query($SQL_CONN);


            /**
             * Send me an email
             */
            try {
                $mail = new PHPMailer(true);
                $emailBody = "";
                if($user && $user->getUsername() && $user->getName() && $user->getID() && $user->getInstantiated()){
                    $emailBody.=$user->getName()." has just (simple) registered his account on ConnSuite!<br><br>";
                    $emailBody.="The new user will go by @".$user->getUsername()." with the userID ".$user->getID().".<br><br>";
                    $emailBody.="Go check him/her out at https://www.connsuite.com/".$user->getUsername();
                }

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
                $mail->addAddress('razvan.gabriel.apostu@gmail.com', 'ConnSuite');     // Add a recipient

                //Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = "We have a NEW ConnSuite user!";
                $mail->Body    = $emailBody;

                $mail->send();



            } catch (Exception $e) {}


            try{
                addConnLog(LOG_TYPE_USER_SIGN_UP,$row['ID'],null,null);
            }catch (Exception $e){}

            /**
             * Now finally exit
             */

            exit (json_encode(array(
                "response"=>kCSResponseOk,
                "result"=>"We did it!"
            )));
        }
        else exit(exitWithNegative("Token was not inserted."));
    }
    else{
        exit(exitWithNegative("Something went wrong with the user-insert."));
    }

}



?>
