<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 01/09/2017
 * Time: 18:03
 */


include_once("../base/config.php");
include_once("../base/user.php");
$pathToLibs = goToBaseTarget(SYSTEM_PAGE_FACEBOOK_KEY, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$pathToIR = goToBaseTarget(SYSTEM_PAGE_FACEBOOK_KEY, $pathFromRoot[SYSTEM_PAGE_LIBS_IMAGE_RESIZE]);include_once($pathToIR);
use \Eventviva\ImageResize;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../support/PHP-Mailer/src/SMTP.php';
require '../support/PHP-Mailer/src/PHPMailer.php';
require '../support/PHP-Mailer/src/Exception.php';
require '../support/PHP-Mailer/src/POP3.php';
require '../support/PHP-Mailer/src/OAuth.php';


$conn = CSCore::credentialAccess();
startSecureSession();


const STATUS_CONNECTED = 'connected';

if(!isset($_POST['facebookResponse'])) exit(exitWithNegative("facebookResponse missing."));
$facebookResponse = $_POST['facebookResponse'];
$status = $facebookResponse['status'];
$authResponse = $facebookResponse['authResponse'];
if($status == STATUS_CONNECTED ){
    /**
     * Facebook connect was successful! Now check if the user is new.
     */
    $facebookID = $authResponse['userID'];

    $SQL = "SELECT * FROM user WHERE facebookID ='" . $facebookID . "' LIMIT 1";
    $results = $conn->query($SQL);

        $new = false; // if the user will be new, then insert the first network also.
        if (!$results || $results->num_rows == 0) {
            $new = true;

            //Insert new user & update session (below)
            if(!isset($_POST['name']) || !isset($_POST['firstname']) || !isset($_POST['facebookID'])) exit(exitWithNegative("Not enough data!"));
            $name = secureString($_POST['name']);
            $firstname =  secureString($_POST['firstname']);
            $lastname =  secureString($_POST['lastname']); if(!$lastname || strlen($lastname) == 0) $lastname="";
            $picture = $_POST['picture'];
            $facebookID =  secureString($_POST['facebookID']);
            $username = ($lastname && strlen($lastname)>0) ? strtolower($firstname).".".strtolower($lastname) : strtolower($firstname);
            str_replace(" ","",$username);
            $testUsername = $username;
            /**
             * ----------------------------
             * Check if username is unique
             */
            $used = true; $i=1;
            while($used) {
                $used = false;
                $SQL_USER_CHECK = "SELECT username
                 FROM user 
                 WHERE username = '".$testUsername."'
                 UNION
                 SELECT username
                 FROM user_alias 
                 WHERE username = '".$testUsername."'
                 ";

                if (($conn->query($SQL_USER_CHECK))->num_rows > 0) {
                    $used = true;
                    $testUsername = $username.$i;
                    $i++;
                }
            }
            /**
             * -----------------------------
             */

            $emailFB = (
                isset($_POST['email']) &&
                $_POST['email'] !=null  &&
                $_POST['email'] !="null" &&
                count($_POST['email']) > 0  &&
                $_POST['email'] !=" " ) ? secureString($_POST['email']) : "";


            $username = $testUsername;
            $SQL_INSERT = "INSERT INTO user SET 
               username = '".$username."',
               email = '".$emailFB."',
               firstname = '".$firstname."',
               lastname = '".$lastname."',
               facebookID = '".$facebookID."',
               name = '".$name."'
               ";
            $insert_results = $conn->query($SQL_INSERT);
            if($insert_results) { //the insert was successful
                $ID = $conn->insert_id;

                $img = file_get_contents('https://graph.facebook.com/'.$facebookID.'/picture?width=1400');
                $imageName =  $ID."-1".PROFILE_PICTURE_TYPE;
                $normalPathPng = "../data/user/profile/".$imageName;
                $thumbnailPathPng = "../data/user/thumbnail/".$imageName;

                if(file_put_contents($normalPathPng, $img)){
                    /**
                     * First we upload the picture as is, so we can have a reference to it.
                     * Second thing we do is use the ImageResize library to resize the image and re-upload it in place
                     */

                    list($originalWidth, $originalHeight) = getimagesize($normalPathPng);

                    $dimen = getNewDimensions($originalWidth,$originalHeight,PROFILE_PICTURE_NORMAL_SIZE);
                    $newWidth = $dimen[0];
                    $newHeight = $dimen[1];

                    $resizer = new ImageResize($normalPathPng);
                    $path = $normalPathPng;
                    $resizer->resize($newWidth, $newHeight);
                    $resizer->save($path);

                    /**
                     * Thumbnail
                     */

                    //thumbnail
                    $dimen = getNewDimensions($originalWidth,$originalHeight,PROFILE_PICTURE_THUMBNAIL_SIZE);
                    $newWidth = $dimen[0];
                    $newHeight = $dimen[1];

                    $resizer = new ImageResize($normalPathPng);
                    $path = $thumbnailPathPng;
                    $resizer->resize($newWidth, $newHeight);
                    $resizer->save($path);

                    $SQL_UPDATE = "UPDATE user SET version = '1' WHERE ID = '".$ID."'";
                    $conn->query($SQL_UPDATE);

                }



                /**
                 * Send me an email
                 */

                try {
                    $mail = new PHPMailer(true);
                    $emailBody = "";
                    if($username && $name && $ID){
                        $emailBody.=$name." has just (facebook) registered his account on ConnSuite!<br><br>";
                        $emailBody.="The new user will go by @".$username." with the userID ".$ID.".<br><br>";
                        $emailBody.="Go check him/her out at https://www.connsuite.com/".$username;
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
                    $mail->Body  = $emailBody;

                    $mail->send();



                } catch (Exception $e) {}


                try{
                    addConnLog(LOG_TYPE_USER_SIGN_UP,$ID,null,null);
                }catch (Exception $e){}



            }

            else exit(exitWithNegative("Error on insert"));

        }
        else{
            $new = false;
            $results = $results->fetch_assoc();
            $ID = $results['ID'];  /** if num_rows > 0, the query found a user, so it has content. Just update the session. */
            try{
                addConnLog(LOG_TYPE_USER_SIGN_IN,$ID,null,array("content"=>"Facebook"));
            }catch (Exception $e){}
        }


        /**
         * This function will happen no matter what, if there are is no error on the way.
         */
        saveToSession($conn, $ID,$new);


}

//status is != connected

exit(exitWithNegative("Error on facebook connect"));



function saveToSession($conn, $ID,$new){
    /**
     * Get the entire data and bind it to SESSION
     */
    $SQL_USER = "SELECT * FROM user WHERE ID = '".$ID."' LIMIT 1";
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
        $user->setFacebookID($row['facebookID']);


        if(!$user->isVisible()){
            exit(exitWithSomething(kCSResponseVisible,"Invisible/banned"));
        }


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
            if($new) {
                $SQL_NET = "INSERT INTO network SET 
                     userID = '" . $user->getID() . "',
                     networkID =  1,
                     username = '" . $user->getFacebookID() . "',
                     custom = '0',
                     visible = '1',
                     description = 'This is my facebook account on Connsuite!',
                     click = 0,
                     position = 1
                    ";
                $conn->query($SQL_NET);


                /**
                 * Create First Business Connection
                 */

                $SQL_CONN = "INSERT INTO business_connect SET
                             sourceID = '".$user->getID()."',
                             targetID = '".CONNSUITE_OFFICIAL_USERID."' ";
                $conn->query($SQL_CONN);


            }

            exit(exitWithSomething(kCSResponseOk,"Success"));
        }
        else exit(exitWithNegative("Token was not inserted."));
    }
    else{
        exit(exitWithNegative("Something went wrong with the user-insert."));
    }
}