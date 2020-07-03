<?php
/**
 * Created by PhpStorm.
 * User: razvan
 * Date: 11/11/2017
 * Time: 15:22
 */



include_once("../../../../base/config.php");
$pathToLibs = goToBaseTarget(CORE_DO_PASSWORD_FORGOT_CHANGE, $pathFromRoot[SYSTEM_PAGE_LIBS_CORE]);include_once($pathToLibs);
$conn = CSCore::credentialAccess();
if(!$conn) exit(exitWithNegative("Error|Conn"));



if(!isset($_POST['token'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['email'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['newPassword'])) exit(exitWithNegative("Data missing"));
if(!isset($_POST['newPassword2'])) exit(exitWithNegative("Data missing"));



$token = secureString($_POST['token']);
$email = secureString($_POST['email']);
$newPassword = secureString($_POST['newPassword']);
$newPassword2 = secureString($_POST['newPassword2']);

if($newPassword != $newPassword2) exit(exitWithNegative("Data entered is wrong."));


$SQL_USER_ID = "SELECT userID FROM token_password WHERE email = '".$email."' AND token = '".$token."'";
$result = $conn->query($SQL_USER_ID);

if($result){
    $result = $result->fetch_assoc();
    $userID = $result['userID'];

    $password = md5($userID.$newPassword);
    /**
     * Update user table with new password
     */
    $SQL_UPDATE = "UPDATE user SET password = '".$password."' WHERE ID ='".$userID."' AND email = '".$email."' ";
    $result_update = $conn->query($SQL_UPDATE);
    if($result_update){
        /**
         * Remove tokens from token (session) and token_password
         */

        $SQL_REMOVE_SESSION = "DELETE FROM token WHERE userID = '".$userID."' ";
        $conn->query($SQL_REMOVE_SESSION);

        $SQL_REMOVE_TOKEN_PASS = "DELETE FROM token_password WHERE userID = '".$userID."' ";
        $conn->query($SQL_REMOVE_TOKEN_PASS);


        exit(exitWithOk("Success"));

    }





}

exit(exitWithNegative("Error"));



?>

